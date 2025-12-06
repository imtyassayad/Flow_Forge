
import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Transaction, Subscription

class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Assume single company for User for simplicity, or get from header/param
        companymember = request.user.company_members.first()
        if not companymember:
             return Response({"error": "User does not belong to a company"}, status=400)
             
        company = companymember.company
            
        plan = request.data.get('plan', 'pro')
        amount = 99900 if plan == 'pro' else 499900 # 999 or 4999 INR
        
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        order_data = {
            "amount": amount,
            "currency": "INR",
            "receipt": f"order_{company.id}_{plan}",
            "payment_capture": 1
        }
        
        try:
            order = client.order.create(data=order_data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
        
        Transaction.objects.create(
            company=company,
            amount=amount/100,
            razorpay_order_id=order['id'],
            status='pending'
        )
        
        return Response({
            "order_id": order['id'],
            "key": settings.RAZORPAY_KEY_ID,
            "amount": amount,
            "currency": "INR",
            "name": "FlowForge Pro",
            "description": f"Subscription for {plan} plan"
        })

class VerifyPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        
        try:
            client.utility.verify_payment_signature({
                'razorpay_order_id': data.get('razorpay_order_id'),
                'razorpay_payment_id': data.get('razorpay_payment_id'),
                'razorpay_signature': data.get('razorpay_signature')
            })
        except razorpay.errors.SignatureVerificationError:
            return Response({"error": "Invalid signature"}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
            
        # Update Transaction
        try:
            txn = Transaction.objects.get(razorpay_order_id=data.get('razorpay_order_id'))
            txn.razorpay_payment_id = data.get('razorpay_payment_id')
            txn.status = 'success'
            txn.save()
            
            # Update Subscription
            sub, _ = Subscription.objects.get_or_create(company=txn.company)
            sub.is_active = True
            sub.plan = 'pro' # Dynamic based on txn amount ideally
            sub.save()
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=404)
        
        return Response({"status": "success"})

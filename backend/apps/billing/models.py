
from django.db import models
from apps.core.models import TimeStampedModel
from apps.companies.models import Company

class Subscription(TimeStampedModel):
    company = models.OneToOneField(Company, on_delete=models.CASCADE, related_name='subscription')
    plan = models.CharField(max_length=50, default='free')
    is_active = models.BooleanField(default=False)
    razorpay_subscription_id = models.CharField(max_length=100, blank=True, null=True)
    expiry_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.company.name} - {self.plan}"

class Transaction(TimeStampedModel):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='INR')
    razorpay_order_id = models.CharField(max_length=100)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, default='pending') # pending, success, failed

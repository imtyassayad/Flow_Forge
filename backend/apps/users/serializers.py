from django.utils.text import slugify
import uuid

class CustomRegisterSerializer(RegisterSerializer):
    company_name = serializers.CharField(required=True, max_length=255)

    def custom_signup(self, request, user):
        company_name = self.validated_data.get('company_name', '')
        if company_name:
            # Generate unique slug (simple version)
            base_slug = slugify(company_name)
            slug = base_slug
            if not slug:
                slug = str(uuid.uuid4())[:8] # Fallback
            
            # Ensure uniqueness
            while Company.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{str(uuid.uuid4())[:4]}"

            company = Company.objects.create(name=company_name, slug=slug)
            user.company = company
            user.save()

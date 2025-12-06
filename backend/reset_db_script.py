import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
django.setup()

from django.contrib.auth import get_user_model
from apps.companies.models import Company

User = get_user_model()

# User.objects.all().delete()
# Company.objects.all().delete()

print("Creating Company 'Zia Innovation'...")
company = Company.objects.create(name="Zia Innovation", slug="zia-innovation")

print("Creating Superuser 'imtyas'...")
user = User.objects.create_superuser(
    username='imtyas',
    email='imtyas.sayad@gmail.com', # Corrected gmai.com
    password='admin@123#'
)
user.company = company
user.save()

print(f"User {user.username} created with Company {user.company.name}.")

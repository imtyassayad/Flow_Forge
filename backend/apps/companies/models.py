
from django.db import models
from django.conf import settings
from apps.core.models import UUIDModel, TimeStampedModel

class Company(UUIDModel, TimeStampedModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    start_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class CompanyMember(UUIDModel, TimeStampedModel):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('member', 'Member'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='memberships')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='members')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user} - {self.company} ({self.role})"

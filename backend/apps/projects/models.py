
from django.db import models
from django.conf import settings
from apps.core.models import UUIDModel, TimeStampedModel
from apps.companies.models import Company

class Project(UUIDModel, TimeStampedModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='projects')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_projects')

    def __str__(self):
        return self.name


from django.contrib.auth.models import AbstractUser
from apps.core.models import UUIDModel, TimeStampedModel

from django.db import models

class User(AbstractUser, UUIDModel, TimeStampedModel):
    company = models.ForeignKey(
        'companies.Company',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )

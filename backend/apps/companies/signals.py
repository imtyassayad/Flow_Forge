# Signal disabled in favor of Custom Serializer
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth import get_user_model
# from .models import Company

# User = get_user_model()

# @receiver(post_save, sender=User)
# def create_company_for_new_user(sender, instance, created, **kwargs):
#     pass

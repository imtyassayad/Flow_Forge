
from django.contrib import admin
from .models import Workflow

@admin.register(Workflow)
class WorkflowAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'is_active', 'updated_at')

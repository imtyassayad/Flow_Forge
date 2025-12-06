
from django.db import models
from apps.core.models import UUIDModel, TimeStampedModel
from apps.projects.models import Project

class Workflow(UUIDModel, TimeStampedModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='workflows')
    langgraph_json = models.JSONField(default=dict, blank=True)
    reactflow_json = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

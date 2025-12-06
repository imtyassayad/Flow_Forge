
from rest_framework import routers
from django.urls import path, include
from apps.projects.views import ProjectViewSet
from apps.workflows.views import WorkflowViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'workflows', WorkflowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

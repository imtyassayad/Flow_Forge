
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/workflow/(?P<workflow_id>\w+)/$', consumers.WorkflowConsumer.as_asgi()),
]

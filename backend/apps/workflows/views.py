
from rest_framework import viewsets, permissions
from .models import Workflow
from .serializers import WorkflowSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from apps.execution.services import WorkflowExecutor

class WorkflowViewSet(viewsets.ModelViewSet):
    queryset = Workflow.objects.all()
    serializer_class = WorkflowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Workflow.objects.filter(project__company__members__user=user).distinct()
        
        project_id = self.request.query_params.get('project')
        if project_id:
            queryset = queryset.filter(project_id=project_id)
            
        return queryset

    @action(detail=True, methods=['post'])
    def run(self, request, pk=None):
        workflow = self.get_object()
        json_data = workflow.reactflow_json or {}
        
        try:
            executor = WorkflowExecutor(json_data, workflow_id=str(workflow.id))
            result = executor.run(request.data.get('input', {}))
            return Response(result)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    def get_queryset(self):
        user = self.request.user
        # Assuming user has 'memberships' to companies
        # Or simple: filter where user is member of company.
        # But for now, returning all projects user created or belongs to company of. 
        # A Project belongs to a Company. A User belongs to a Company.
        # So: Project.company in User.companies
        return Project.objects.filter(company__members__user=user).distinct()


"use client"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"
import { WorkflowList } from "@/components/workflows/workflow-list"
import { CreateWorkflowDialog } from "@/components/workflows/create-workflow-dialog"

interface Project {
    id: string;
    name: string;
    description: string;
}

export function ProjectDetail({ projectId }: { projectId: string }) {
    const { data: project, isLoading } = useQuery<Project>({
        queryKey: ['project', projectId],
        queryFn: async () => (await api.get(`/projects/${projectId}/`)).data
    })

    if (isLoading) return <div>Loading project...</div>

    return (
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
             <div className="flex items-center justify-between">
                <div>
                     <h2 className="text-2xl font-bold tracking-tight">{project?.name || 'Project'}</h2>
                     <p className="text-muted-foreground">{project?.description}</p>
                </div>
                <CreateWorkflowDialog projectId={projectId} />
             </div>
             
             <div className="space-y-4">
                <h3 className="text-xl font-semibold">Workflows</h3>
                <WorkflowList projectId={projectId} />
             </div>
        </div>
    )
}

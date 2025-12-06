
import WorkflowEditor from "@/components/canvas/workflow-editor"

export default async function WorkflowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <WorkflowEditor workflowId={id} />
}

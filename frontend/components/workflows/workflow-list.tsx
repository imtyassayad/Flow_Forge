
"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import api from "@/lib/api"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge" // shadcn add badge? I'll skip badge if missing

interface Workflow {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    updated_at: string;
}

export function WorkflowList({ projectId }: { projectId: string }) {
  const { data: workflows, isLoading } = useQuery<Workflow[]>({
    queryKey: ['workflows', projectId],
    queryFn: async () => {
        const res = await api.get(`/workflows/?project=${projectId}`);
        return res.data.results ? res.data.results : res.data;
    }
  })

  if (isLoading) return <div>Loading workflows...</div>
  
  if (!workflows || workflows.length === 0) {
      return (
          <div className="flex h-[200px] shrink-0 items-center justify-center rounded-md border border-dashed text-muted-foreground border-muted">
              No workflows found.
          </div>
      )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
            <Link key={workflow.id} href={`/workflow/${workflow.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-base">{workflow.name}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-1">{workflow.description}</CardDescription>
                             </div>
                             {/* <Badge variant={workflow.is_active ? "default" : "secondary"}>{workflow.is_active ? 'Active' : 'Inactive'}</Badge> */}
                        </div>
                        <div className="text-xs text-muted-foreground mt-4">
                            Updated {formatDistanceToNow(new Date(workflow.updated_at), { addSuffix: true })}
                        </div>
                    </CardHeader>
                </Card>
            </Link>
        ))}
    </div>
  )
}


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

interface Project {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

export function ProjectList() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
        const res = await api.get('/projects/');
        return res.data.results ? res.data.results : res.data; // Handle pagination vs list
    }
  })

  if (isLoading) return <div>Loading projects...</div>
  if (error) return <div>Error loading projects.</div>
  
  if (!projects || projects.length === 0) {
      return (
          <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h3 className="mt-4 text-lg font-semibold">No projects added</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You have not created any projects yet.
              </p>
            </div>
          </div>
      )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description || "No description"}</CardDescription>
                        <div className="text-xs text-muted-foreground mt-2">
                            Created {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
                        </div>
                    </CardHeader>
                </Card>
            </Link>
        ))}
    </div>
  )
}

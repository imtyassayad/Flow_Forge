
import { Metadata } from "next"
import { ProjectList } from "@/components/projects/project-list"
import { CreateProjectDialog } from "@/components/projects/create-project-dialog"

export const metadata: Metadata = {
  title: "Dashboard - FlowForge",
  description: "Manage your projects",
}

export default function DashboardPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your automation projects.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <CreateProjectDialog />
        </div>
      </div>
      <ProjectList />
    </div>
  )
}

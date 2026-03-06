import { Link, useParams } from 'react-router-dom'
import { useWorkspace } from '@/features/workspace/hooks/useWorkspace'
import { useProjects } from '../hooks/useProjects'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpen } from 'lucide-react'

export function ProjectList() {
  const { workspaceSlug } = useParams()
  const { data: workspace } = useWorkspace(workspaceSlug)
  const { data: projects, isLoading } = useProjects(workspace?.id)

  if (isLoading) {
    return <div className="animate-pulse p-8 text-muted-foreground">Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link to={`/${workspaceSlug}/projects/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New project
          </Button>
        </Link>
      </div>

      {!projects?.length ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No projects yet. Create your first project to get started.</p>
            <Link to={`/${workspaceSlug}/projects/new`}>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} to={`/${workspaceSlug}/projects/${project.id}`}>
              <Card className="transition-colors hover:bg-accent">
                <CardHeader>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                    {project.knowledge_bank && (
                      <Badge variant="outline">{project.knowledge_bank.name}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

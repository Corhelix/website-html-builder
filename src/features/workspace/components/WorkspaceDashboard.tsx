import { useParams, Link } from 'react-router-dom'
import { useWorkspace } from '../hooks/useWorkspace'
import { useWorkspaceMembers } from '../hooks/useWorkspaceMembers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FolderOpen, BookOpen, Users } from 'lucide-react'

export function WorkspaceDashboard() {
  const { workspaceSlug } = useParams()
  const { data: workspace, isLoading } = useWorkspace(workspaceSlug)
  const { data: members } = useWorkspaceMembers(workspace?.id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-muted-foreground">Loading workspace...</div>
      </div>
    )
  }

  if (!workspace) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Workspace not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{workspace.name}</h1>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="secondary">{workspace.plan}</Badge>
          <span className="text-sm text-muted-foreground">
            {workspace.generation_count_current_period} generations this period
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link to={`/${workspaceSlug}/projects`}>
          <Card className="transition-colors hover:bg-accent">
            <CardHeader className="flex flex-row items-center gap-2">
              <FolderOpen className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage your web build projects</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link to={`/${workspaceSlug}/knowledge-banks`}>
          <Card className="transition-colors hover:bg-accent">
            <CardHeader className="flex flex-row items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Knowledge Banks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Brand tokens, ICP, tone of voice</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link to={`/${workspaceSlug}/members`}>
          <Card className="transition-colors hover:bg-accent">
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Team</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {members?.length ?? 0} member{members?.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

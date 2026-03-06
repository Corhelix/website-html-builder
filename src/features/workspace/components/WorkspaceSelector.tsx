import { useNavigate } from 'react-router-dom'
import { useWorkspaces } from '../hooks/useWorkspace'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function WorkspaceSelector() {
  const navigate = useNavigate()
  const { data: workspaces, isLoading } = useWorkspaces()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading workspaces...</div>
      </div>
    )
  }

  if (!workspaces?.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Create your first workspace to get started.</p>
            <Button onClick={() => navigate('/workspace/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Create workspace
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If user has exactly one workspace, redirect to it
  if (workspaces.length === 1) {
    navigate(`/${workspaces[0].slug}`, { replace: true })
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Select a workspace</h1>
        {workspaces.map((ws) => (
          <Card
            key={ws.id}
            className="cursor-pointer transition-colors hover:bg-accent"
            onClick={() => navigate(`/${ws.slug}`)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{ws.name}</p>
                <p className="text-sm text-muted-foreground">/{ws.slug}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button variant="outline" className="w-full" onClick={() => navigate('/workspace/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New workspace
        </Button>
      </div>
    </div>
  )
}

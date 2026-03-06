import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateWorkspace } from '../hooks/useCreateWorkspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function CreateWorkspaceForm() {
  const navigate = useNavigate()
  const createWorkspace = useCreateWorkspace()
  const [name, setName] = useState('')

  const slug = slugify(name)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const workspace = await createWorkspace.mutateAsync({ name: name.trim() })
    navigate(`/${workspace.slug}`)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create workspace</CardTitle>
        <CardDescription>A workspace holds your projects, knowledge banks, and team</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Workspace name</Label>
            <Input
              id="name"
              type="text"
              placeholder="My Agency"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {name && (
              <p className="text-xs text-muted-foreground">
                URL: /{slug}
              </p>
            )}
          </div>
          {createWorkspace.error && (
            <p className="text-sm text-destructive">
              {createWorkspace.error instanceof Error
                ? createWorkspace.error.message
                : 'Failed to create workspace'}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={createWorkspace.isPending}>
            {createWorkspace.isPending ? 'Creating...' : 'Create workspace'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

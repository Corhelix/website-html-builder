import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWorkspace } from '@/features/workspace/hooks/useWorkspace'
import { useCreateProject } from '../hooks/useProjects'
import { useKnowledgeBanks } from '@/features/knowledge-bank/hooks/useKnowledgeBanks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function CreateProjectForm() {
  const { workspaceSlug } = useParams()
  const navigate = useNavigate()
  const { data: workspace } = useWorkspace(workspaceSlug)
  const { data: knowledgeBanks } = useKnowledgeBanks(workspace?.id)
  const createProject = useCreateProject(workspace?.id ?? '')

  const [name, setName] = useState('')
  const [kbId, setKbId] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const project = await createProject.mutateAsync({
      name: name.trim(),
      kb_id: kbId || undefined,
    })
    navigate(`/${workspaceSlug}/projects/${project.id}`)
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">New project</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project details</CardTitle>
          <CardDescription>A project holds pages and blocks for a single web build</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project name</Label>
              <Input
                id="name"
                placeholder="Landing Page Redesign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kb">Knowledge Bank (optional)</Label>
              <Select value={kbId} onValueChange={setKbId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a knowledge bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {knowledgeBanks?.map((kb) => (
                    <SelectItem key={kb.id} value={kb.id}>
                      {kb.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {createProject.error && (
              <p className="text-sm text-destructive">
                {createProject.error instanceof Error ? createProject.error.message : 'Failed to create project'}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={createProject.isPending}>
              {createProject.isPending ? 'Creating...' : 'Create project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

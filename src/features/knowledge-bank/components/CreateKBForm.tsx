import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWorkspace } from '@/features/workspace/hooks/useWorkspace'
import { useCreateKB } from '../hooks/useKnowledgeBanks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function CreateKBForm() {
  const { workspaceSlug } = useParams()
  const navigate = useNavigate()
  const { data: workspace } = useWorkspace(workspaceSlug)
  const createKB = useCreateKB(workspace?.id ?? '')

  const [name, setName] = useState('')
  const [vertical, setVertical] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const kb = await createKB.mutateAsync({
      name: name.trim(),
      vertical_template: vertical || undefined,
    })
    navigate(`/${workspaceSlug}/knowledge-banks/${kb.id}`)
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">New Knowledge Bank</h1>
      <Card>
        <CardHeader>
          <CardTitle>KB details</CardTitle>
          <CardDescription>
            A knowledge bank stores brand tokens, ICP, and tone of voice for consistent generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Client Name KB"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Vertical template (optional)</Label>
              <Select value={vertical} onValueChange={setVertical}>
                <SelectTrigger>
                  <SelectValue placeholder="Start blank or choose a vertical" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Blank</SelectItem>
                  <SelectItem value="schools">Schools</SelectItem>
                  <SelectItem value="nonprofits">Nonprofits</SelectItem>
                  <SelectItem value="smb_services">SMB Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={createKB.isPending}>
              {createKB.isPending ? 'Creating...' : 'Create knowledge bank'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

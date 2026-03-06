import { useState } from 'react'
import { z } from 'zod/v4'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { WorkspaceRole } from '../types'

const inviteSchema = z.object({
  email: z.email(),
  role: z.enum(['builder', 'reviewer', 'client', 'developer']),
})

interface InviteMemberFormProps {
  workspaceId: string
}

export function InviteMemberForm({ workspaceId }: InviteMemberFormProps) {
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<WorkspaceRole>('reviewer')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const invite = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: WorkspaceRole }) => {
      const { data, error } = await supabase.functions.invoke('invite-member', {
        body: { workspace_id: workspaceId, email, role },
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] })
      setEmail('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = inviteSchema.safeParse({ email, role })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    invite.mutate({ email, role })
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1 space-y-2">
        <Label htmlFor="invite-email">Email</Label>
        <Input
          id="invite-email"
          type="email"
          placeholder="colleague@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="w-40 space-y-2">
        <Label>Role</Label>
        <Select value={role} onValueChange={(v) => setRole(v as WorkspaceRole)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="builder">Builder</SelectItem>
            <SelectItem value="reviewer">Reviewer</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={invite.isPending}>
        {invite.isPending ? 'Inviting...' : 'Invite'}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-green-600">Invite sent!</p>}
    </form>
  )
}

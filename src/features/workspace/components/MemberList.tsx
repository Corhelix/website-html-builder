import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/providers/AuthProvider'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { WorkspaceUser, WorkspaceRole } from '../types'

interface MemberListProps {
  members: WorkspaceUser[]
  workspaceId: string
  currentUserRole: WorkspaceRole | undefined
}

const roleBadgeVariant: Record<WorkspaceRole, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  builder: 'default',
  developer: 'default',
  reviewer: 'secondary',
  client: 'outline',
}

export function MemberList({ members, workspaceId, currentUserRole }: MemberListProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const canManage = currentUserRole === 'builder' || currentUserRole === 'developer'

  const updateRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: WorkspaceRole }) => {
      const { error } = await supabase
        .from('workspace_users')
        .update({ role })
        .eq('workspace_id', workspaceId)
        .eq('user_id', userId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', workspaceId] })
    },
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.user_id}>
            <TableCell>
              <div>
                <p className="font-medium">{member.profile?.full_name ?? 'Unnamed'}</p>
                <p className="text-sm text-muted-foreground">{member.profile?.email}</p>
              </div>
            </TableCell>
            <TableCell>
              {canManage && member.user_id !== user?.id ? (
                <Select
                  value={member.role}
                  onValueChange={(v) =>
                    updateRole.mutate({ userId: member.user_id, role: v as WorkspaceRole })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="builder">Builder</SelectItem>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={roleBadgeVariant[member.role]}>{member.role}</Badge>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(member.invited_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

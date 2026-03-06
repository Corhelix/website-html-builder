import { useParams } from 'react-router-dom'
import { useWorkspace } from '../hooks/useWorkspace'
import { useWorkspaceMembers } from '../hooks/useWorkspaceMembers'
import { useWorkspaceRole } from '../hooks/useWorkspaceRole'
import { InviteMemberForm } from './InviteMemberForm'
import { MemberList } from './MemberList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function WorkspaceSettings() {
  const { workspaceSlug } = useParams()
  const { data: workspace, isLoading } = useWorkspace(workspaceSlug)
  const { data: members } = useWorkspaceMembers(workspace?.id)
  const { data: role } = useWorkspaceRole(workspace?.id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!workspace) return null

  const canManage = role === 'builder' || role === 'developer'

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{workspace.name}</p>
              <p className="text-sm text-muted-foreground">/{workspace.slug}</p>
            </div>
            <Badge variant="secondary">{workspace.plan} plan</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {canManage && (
            <>
              <InviteMemberForm workspaceId={workspace.id} />
              <Separator />
            </>
          )}
          {members && (
            <MemberList
              members={members}
              workspaceId={workspace.id}
              currentUserRole={role}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

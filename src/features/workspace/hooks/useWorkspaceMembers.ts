import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { WorkspaceUser } from '../types'

export function useWorkspaceMembers(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['workspace-members', workspaceId],
    queryFn: async (): Promise<WorkspaceUser[]> => {
      const { data, error } = await supabase
        .from('workspace_users')
        .select(`
          workspace_id,
          user_id,
          role,
          invited_at,
          profiles:user_id (
            email,
            full_name,
            avatar_url
          )
        `)
        .eq('workspace_id', workspaceId!)

      if (error) throw error

      return (data ?? []).map((row) => ({
        workspace_id: row.workspace_id,
        user_id: row.user_id,
        role: row.role as WorkspaceUser['role'],
        invited_at: row.invited_at,
        profile: row.profiles as unknown as WorkspaceUser['profile'],
      }))
    },
    enabled: !!workspaceId,
  })
}

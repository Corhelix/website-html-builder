import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/providers/AuthProvider'
import type { WorkspaceRole } from '../types'

export function useWorkspaceRole(workspaceId: string | undefined) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['workspace-role', workspaceId, user?.id],
    queryFn: async (): Promise<WorkspaceRole> => {
      const { data, error } = await supabase
        .from('workspace_users')
        .select('role')
        .eq('workspace_id', workspaceId!)
        .eq('user_id', user!.id)
        .single()

      if (error) throw error
      return data.role as WorkspaceRole
    },
    enabled: !!workspaceId && !!user,
  })
}

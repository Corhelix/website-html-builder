import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/app/providers/AuthProvider'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

interface CreateWorkspaceInput {
  name: string
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ name }: CreateWorkspaceInput) => {
      if (!user) throw new Error('Not authenticated')

      const slug = slugify(name)

      // Create workspace
      const { data: workspace, error: wsError } = await supabase
        .from('workspaces')
        .insert({ name, slug })
        .select()
        .single()

      if (wsError) throw wsError

      // Add creator as builder
      const { error: memberError } = await supabase
        .from('workspace_users')
        .insert({
          workspace_id: workspace.id,
          user_id: user.id,
          role: 'builder',
        })

      if (memberError) throw memberError

      return workspace
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Project } from '../types'

export function useProjects(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('workspace_id', workspaceId!)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data ?? []) as Project[]
    },
    enabled: !!workspaceId,
  })
}

export function useProject(projectId: string | undefined) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async (): Promise<Project> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId!)
        .single()

      if (error) throw error

      // Fetch linked KB name if exists
      let knowledge_bank: Project['knowledge_bank'] = null
      if (data.kb_id) {
        const { data: kb } = await supabase
          .from('knowledge_banks')
          .select('id, name')
          .eq('id', data.kb_id)
          .single()
        knowledge_bank = kb
      }

      return { ...data, knowledge_bank } as Project
    },
    enabled: !!projectId,
  })
}

export function useCreateProject(workspaceId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, kb_id }: { name: string; kb_id?: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({ workspace_id: workspaceId, name, kb_id: kb_id ?? null })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', workspaceId] })
    },
  })
}

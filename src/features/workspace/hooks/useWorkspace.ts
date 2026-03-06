import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Workspace } from '../types'

export function useWorkspace(slug: string | undefined) {
  return useQuery({
    queryKey: ['workspace', slug],
    queryFn: async (): Promise<Workspace> => {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('slug', slug!)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!slug,
  })
}

export function useWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async (): Promise<Workspace[]> => {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })
}

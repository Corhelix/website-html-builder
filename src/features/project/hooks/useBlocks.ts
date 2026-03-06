import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Block, BlockVersion } from '../types'

export function useBlocks(pageId: string | undefined) {
  return useQuery({
    queryKey: ['blocks', pageId],
    queryFn: async (): Promise<Block[]> => {
      const { data: blocks, error } = await supabase
        .from('blocks')
        .select('*')
        .eq('page_id', pageId!)
        .order('sort_order')

      if (error) throw error

      // Fetch current versions for blocks that have one
      const versionIds = (blocks ?? [])
        .map((b) => b.current_version_id)
        .filter((id): id is string => id !== null)

      let versions: Record<string, BlockVersion> = {}
      if (versionIds.length) {
        const { data: versionData } = await supabase
          .from('block_versions')
          .select('*')
          .in('id', versionIds)

        versions = Object.fromEntries(
          (versionData ?? []).map((v) => [v.id, v as BlockVersion])
        )
      }

      return (blocks ?? []).map((block) => ({
        ...block,
        current_version: block.current_version_id
          ? versions[block.current_version_id] ?? null
          : null,
      }))
    },
    enabled: !!pageId,
  })
}

export function useCreateBlock(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const { data: existing } = await supabase
        .from('blocks')
        .select('sort_order')
        .eq('page_id', pageId)
        .order('sort_order', { ascending: false })
        .limit(1)

      const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1

      const { data, error } = await supabase
        .from('blocks')
        .insert({ page_id: pageId, name, sort_order: nextOrder })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks', pageId] })
    },
  })
}

export function useDeleteBlock(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blockId: string) => {
      const { error } = await supabase
        .from('blocks')
        .delete()
        .eq('id', blockId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks', pageId] })
    },
  })
}

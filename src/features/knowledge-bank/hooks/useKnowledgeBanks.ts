import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { KnowledgeBank } from '../types'

export function useKnowledgeBanks(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['knowledge-banks', workspaceId],
    queryFn: async (): Promise<KnowledgeBank[]> => {
      const { data, error } = await supabase
        .from('knowledge_banks')
        .select('*')
        .or(`workspace_id.eq.${workspaceId},is_template.eq.true`)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data ?? []
    },
    enabled: !!workspaceId,
  })
}

export function useKnowledgeBank(kbId: string | undefined) {
  return useQuery({
    queryKey: ['knowledge-bank', kbId],
    queryFn: async () => {
      const [
        { data: kb, error: kbError },
        { data: brandTokens },
        { data: icp },
        { data: tone },
        { data: assets },
      ] = await Promise.all([
        supabase.from('knowledge_banks').select('*').eq('id', kbId!).single(),
        supabase.from('kb_brand_tokens').select('*').eq('kb_id', kbId!).maybeSingle(),
        supabase.from('kb_icp').select('*').eq('kb_id', kbId!).maybeSingle(),
        supabase.from('kb_tone').select('*').eq('kb_id', kbId!).maybeSingle(),
        supabase.from('kb_assets').select('*').eq('kb_id', kbId!),
      ])

      if (kbError) throw kbError

      return {
        ...kb,
        brand_tokens: brandTokens,
        icp,
        tone,
        assets: assets ?? [],
      }
    },
    enabled: !!kbId,
  })
}

export function useCreateKB(workspaceId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, vertical_template }: { name: string; vertical_template?: string }) => {
      const { data, error } = await supabase
        .from('knowledge_banks')
        .insert({
          workspace_id: workspaceId,
          name,
          vertical_template: vertical_template ?? null,
        })
        .select()
        .single()

      if (error) throw error

      // Create empty sub-records
      await Promise.all([
        supabase.from('kb_brand_tokens').insert({ kb_id: data.id }),
        supabase.from('kb_icp').insert({ kb_id: data.id }),
        supabase.from('kb_tone').insert({ kb_id: data.id }),
      ])

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-banks', workspaceId] })
    },
  })
}

export function useCloneKB(workspaceId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sourceKbId: string) => {
      const { data, error } = await supabase.functions.invoke('clone-knowledge-bank', {
        body: { source_kb_id: sourceKbId, workspace_id: workspaceId },
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-banks', workspaceId] })
    },
  })
}

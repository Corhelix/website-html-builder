import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Page } from '../types'

export function usePages(projectId: string | undefined) {
  return useQuery({
    queryKey: ['pages', projectId],
    queryFn: async (): Promise<Page[]> => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('project_id', projectId!)
        .order('sort_order')

      if (error) throw error
      return data ?? []
    },
    enabled: !!projectId,
  })
}

export function useCreatePage(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, conversion_goal }: { name: string; conversion_goal?: string }) => {
      // Get current max sort_order
      const { data: existing } = await supabase
        .from('pages')
        .select('sort_order')
        .eq('project_id', projectId)
        .order('sort_order', { ascending: false })
        .limit(1)

      const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1

      const { data, error } = await supabase
        .from('pages')
        .insert({
          project_id: projectId,
          name,
          conversion_goal: conversion_goal ?? null,
          sort_order: nextOrder,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', projectId] })
    },
  })
}

export function useDeletePage(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (pageId: string) => {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages', projectId] })
    },
  })
}

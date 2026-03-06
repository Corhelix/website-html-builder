import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Json } from '@/integrations/supabase/types'

export function useUpdateBrandTokens(kbId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: {
      colours: Array<{ name: string; hex: string }>
      fonts: { heading: string; body: string; accent?: string }
      spacing_scale: string
      logo_url: string | null
    }) => {
      const { error } = await supabase
        .from('kb_brand_tokens')
        .upsert({
          kb_id: kbId,
          colours: values.colours as unknown as Json,
          fonts: values.fonts as unknown as Json,
          spacing_scale: values.spacing_scale,
          logo_url: values.logo_url,
        })

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-bank', kbId] })
    },
  })
}

export function useUpdateICP(kbId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: {
      definition: string
      pain_points: string[]
      decision_factors: string[]
    }) => {
      const { error } = await supabase
        .from('kb_icp')
        .upsert({
          kb_id: kbId,
          definition: values.definition,
          pain_points: values.pain_points,
          decision_factors: values.decision_factors,
        })

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-bank', kbId] })
    },
  })
}

export function useUpdateTone(kbId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: {
      voice_description: string
      writing_framework: string
      examples: string[]
    }) => {
      const { error } = await supabase
        .from('kb_tone')
        .upsert({
          kb_id: kbId,
          voice_description: values.voice_description,
          writing_framework: values.writing_framework,
          examples: values.examples,
        })

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-bank', kbId] })
    },
  })
}

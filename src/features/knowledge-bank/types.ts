import type { Json } from '@/integrations/supabase/types'

export interface KnowledgeBank {
  id: string
  workspace_id: string | null
  name: string
  vertical_template: string | null
  is_template: boolean
  created_at: string
  updated_at: string
}

export interface BrandTokens {
  id: string
  kb_id: string
  colours: Array<{ name: string; hex: string }>
  fonts: { heading: string; body: string; accent?: string }
  spacing_scale: string
  logo_url: string | null
}

export interface ICP {
  id: string
  kb_id: string
  definition: string
  pain_points: string[]
  decision_factors: string[]
}

export interface Tone {
  id: string
  kb_id: string
  voice_description: string
  writing_framework: string
  examples: string[]
}

export interface KBAsset {
  id: string
  kb_id: string
  file_url: string
  file_type: string
  label: string | null
}

export interface KnowledgeBankFull extends KnowledgeBank {
  brand_tokens: BrandTokens | null
  icp: ICP | null
  tone: Tone | null
  assets: KBAsset[]
}

// Helper to cast Json to typed objects
export function castBrandTokens(raw: { colours: Json; fonts: Json } & Record<string, unknown>): BrandTokens {
  return {
    ...raw,
    colours: (raw.colours ?? []) as BrandTokens['colours'],
    fonts: (raw.fonts ?? {}) as BrandTokens['fonts'],
  } as BrandTokens
}

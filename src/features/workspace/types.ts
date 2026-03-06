export type WorkspaceRole = 'builder' | 'reviewer' | 'client' | 'developer'

export interface Workspace {
  id: string
  name: string
  slug: string
  plan: 'solo' | 'agency' | 'scale'
  generation_count_current_period: number
  billing_period_start: string
  created_at: string
}

export interface WorkspaceUser {
  workspace_id: string
  user_id: string
  role: WorkspaceRole
  invited_at: string
  profile?: {
    email: string
    full_name: string | null
    avatar_url: string | null
  }
}

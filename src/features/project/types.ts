export interface Project {
  id: string
  workspace_id: string
  kb_id: string | null
  name: string
  status: 'active' | 'archived'
  github_repo_url: string | null
  deploy_config: Record<string, unknown>
  created_at: string
  updated_at: string
  knowledge_bank?: {
    id: string
    name: string
  } | null
}

export interface Page {
  id: string
  project_id: string
  name: string
  conversion_goal: string | null
  block_sequence: string[]
  sort_order: number
  created_at: string
}

export interface Block {
  id: string
  page_id: string
  name: string
  current_version_id: string | null
  sort_order: number
  created_at: string
  current_version?: BlockVersion | null
}

export interface BlockVersion {
  id: string
  block_id: string
  html_content: string
  prompt_used: string | null
  generation_metadata: Record<string, unknown>
  status: 'draft' | 'in_review' | 'approved' | 'rejected'
  created_by: string | null
  created_at: string
}

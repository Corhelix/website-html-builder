export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          slug: string
          plan: 'solo' | 'agency' | 'scale'
          generation_count_current_period: number
          billing_period_start: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          plan?: 'solo' | 'agency' | 'scale'
          generation_count_current_period?: number
          billing_period_start?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          plan?: 'solo' | 'agency' | 'scale'
          generation_count_current_period?: number
          billing_period_start?: string
          created_at?: string
        }
      }
      workspace_users: {
        Row: {
          workspace_id: string
          user_id: string
          role: 'builder' | 'reviewer' | 'client' | 'developer'
          invited_at: string
        }
        Insert: {
          workspace_id: string
          user_id: string
          role?: 'builder' | 'reviewer' | 'client' | 'developer'
          invited_at?: string
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: 'builder' | 'reviewer' | 'client' | 'developer'
          invited_at?: string
        }
      }
      knowledge_banks: {
        Row: {
          id: string
          workspace_id: string | null
          name: string
          vertical_template: string | null
          is_template: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id?: string | null
          name: string
          vertical_template?: string | null
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string | null
          name?: string
          vertical_template?: string | null
          is_template?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      kb_brand_tokens: {
        Row: {
          id: string
          kb_id: string
          colours: Json
          fonts: Json
          spacing_scale: string
          logo_url: string | null
        }
        Insert: {
          id?: string
          kb_id: string
          colours?: Json
          fonts?: Json
          spacing_scale?: string
          logo_url?: string | null
        }
        Update: {
          id?: string
          kb_id?: string
          colours?: Json
          fonts?: Json
          spacing_scale?: string
          logo_url?: string | null
        }
      }
      kb_icp: {
        Row: {
          id: string
          kb_id: string
          definition: string
          pain_points: string[]
          decision_factors: string[]
        }
        Insert: {
          id?: string
          kb_id: string
          definition?: string
          pain_points?: string[]
          decision_factors?: string[]
        }
        Update: {
          id?: string
          kb_id?: string
          definition?: string
          pain_points?: string[]
          decision_factors?: string[]
        }
      }
      kb_tone: {
        Row: {
          id: string
          kb_id: string
          voice_description: string
          writing_framework: string
          examples: string[]
        }
        Insert: {
          id?: string
          kb_id: string
          voice_description?: string
          writing_framework?: string
          examples?: string[]
        }
        Update: {
          id?: string
          kb_id?: string
          voice_description?: string
          writing_framework?: string
          examples?: string[]
        }
      }
      kb_assets: {
        Row: {
          id: string
          kb_id: string
          file_url: string
          file_type: string
          label: string | null
        }
        Insert: {
          id?: string
          kb_id: string
          file_url: string
          file_type: string
          label?: string | null
        }
        Update: {
          id?: string
          kb_id?: string
          file_url?: string
          file_type?: string
          label?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          workspace_id: string
          kb_id: string | null
          name: string
          status: 'active' | 'archived'
          github_repo_url: string | null
          deploy_config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          kb_id?: string | null
          name: string
          status?: 'active' | 'archived'
          github_repo_url?: string | null
          deploy_config?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          kb_id?: string | null
          name?: string
          status?: 'active' | 'archived'
          github_repo_url?: string | null
          deploy_config?: Json
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          project_id: string
          name: string
          conversion_goal: string | null
          block_sequence: string[]
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          conversion_goal?: string | null
          block_sequence?: string[]
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          conversion_goal?: string | null
          block_sequence?: string[]
          sort_order?: number
          created_at?: string
        }
      }
      blocks: {
        Row: {
          id: string
          page_id: string
          name: string
          current_version_id: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          page_id: string
          name: string
          current_version_id?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          page_id?: string
          name?: string
          current_version_id?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      block_versions: {
        Row: {
          id: string
          block_id: string
          html_content: string
          prompt_used: string | null
          generation_metadata: Json
          status: 'draft' | 'in_review' | 'approved' | 'rejected'
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          block_id: string
          html_content?: string
          prompt_used?: string | null
          generation_metadata?: Json
          status?: 'draft' | 'in_review' | 'approved' | 'rejected'
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          block_id?: string
          html_content?: string
          prompt_used?: string | null
          generation_metadata?: Json
          status?: 'draft' | 'in_review' | 'approved' | 'rejected'
          created_by?: string | null
          created_at?: string
        }
      }
      change_requests: {
        Row: {
          id: string
          block_id: string
          requested_by: string
          description: string
          status: 'pending' | 'in_progress' | 'resolved'
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          block_id: string
          requested_by: string
          description: string
          status?: 'pending' | 'in_progress' | 'resolved'
          resolved_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          block_id?: string
          requested_by?: string
          description?: string
          status?: 'pending' | 'in_progress' | 'resolved'
          resolved_at?: string | null
          created_at?: string
        }
      }
      generation_runs: {
        Row: {
          id: string
          project_id: string | null
          page_id: string | null
          block_id: string | null
          prompt: string
          model: string
          status: 'pending' | 'running' | 'completed' | 'failed'
          started_at: string | null
          completed_at: string | null
          tokens_used: number
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          page_id?: string | null
          block_id?: string | null
          prompt: string
          model?: string
          status?: 'pending' | 'running' | 'completed' | 'failed'
          started_at?: string | null
          completed_at?: string | null
          tokens_used?: number
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          page_id?: string | null
          block_id?: string | null
          prompt?: string
          model?: string
          status?: 'pending' | 'running' | 'completed' | 'failed'
          started_at?: string | null
          completed_at?: string | null
          tokens_used?: number
          error_message?: string | null
          created_at?: string
        }
      }
      git_commits: {
        Row: {
          id: string
          project_id: string
          block_version_id: string | null
          commit_sha: string
          committed_at: string
        }
        Insert: {
          id?: string
          project_id: string
          block_version_id?: string | null
          commit_sha: string
          committed_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          block_version_id?: string | null
          commit_sha?: string
          committed_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      user_has_workspace_access: {
        Args: { ws_id: string }
        Returns: boolean
      }
      user_workspace_role: {
        Args: { ws_id: string }
        Returns: string
      }
    }
    Enums: Record<string, never>
  }
}

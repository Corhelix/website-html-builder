-- Migration: Project hierarchy and knowledge bank tables
-- Sprint 2: Project Hierarchy & Knowledge Bank

-- Knowledge Banks
create table public.knowledge_banks (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces on delete cascade,
  name text not null,
  vertical_template text,
  is_template boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- KB Brand Tokens
create table public.kb_brand_tokens (
  id uuid default uuid_generate_v4() primary key,
  kb_id uuid references public.knowledge_banks on delete cascade not null unique,
  colours jsonb not null default '[]',
  fonts jsonb not null default '{}',
  spacing_scale text default 'default',
  logo_url text
);

-- KB Ideal Customer Profile
create table public.kb_icp (
  id uuid default uuid_generate_v4() primary key,
  kb_id uuid references public.knowledge_banks on delete cascade not null unique,
  definition text not null default '',
  pain_points text[] default '{}',
  decision_factors text[] default '{}'
);

-- KB Tone of Voice
create table public.kb_tone (
  id uuid default uuid_generate_v4() primary key,
  kb_id uuid references public.knowledge_banks on delete cascade not null unique,
  voice_description text not null default '',
  writing_framework text default '',
  examples text[] default '{}'
);

-- KB Assets (logos, images)
create table public.kb_assets (
  id uuid default uuid_generate_v4() primary key,
  kb_id uuid references public.knowledge_banks on delete cascade not null,
  file_url text not null,
  file_type text not null,
  label text
);

-- Projects
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  kb_id uuid references public.knowledge_banks on delete set null,
  name text not null,
  status text not null default 'active' check (status in ('active', 'archived')),
  github_repo_url text,
  deploy_config jsonb default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Pages
create table public.pages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade not null,
  name text not null,
  conversion_goal text,
  block_sequence text[] default '{}',
  sort_order integer default 0 not null,
  created_at timestamptz default now() not null
);

-- Blocks
create table public.blocks (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references public.pages on delete cascade not null,
  name text not null,
  current_version_id uuid,
  sort_order integer default 0 not null,
  created_at timestamptz default now() not null
);

-- Block Versions
create table public.block_versions (
  id uuid default uuid_generate_v4() primary key,
  block_id uuid references public.blocks on delete cascade not null,
  html_content text not null default '',
  prompt_used text,
  generation_metadata jsonb default '{}',
  status text not null default 'draft' check (status in ('draft', 'in_review', 'approved', 'rejected')),
  created_by uuid references public.profiles,
  created_at timestamptz default now() not null
);

-- Add FK for current_version_id now that block_versions exists
alter table public.blocks
  add constraint fk_current_version
  foreign key (current_version_id)
  references public.block_versions(id)
  on delete set null;

-- Change Requests
create table public.change_requests (
  id uuid default uuid_generate_v4() primary key,
  block_id uuid references public.blocks on delete cascade not null,
  requested_by uuid references public.profiles not null,
  description text not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'resolved')),
  resolved_at timestamptz,
  created_at timestamptz default now() not null
);

-- Generation Runs
create table public.generation_runs (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade,
  page_id uuid references public.pages on delete cascade,
  block_id uuid references public.blocks on delete cascade,
  prompt text not null,
  model text not null default 'claude-sonnet-4-20250514',
  status text not null default 'pending' check (status in ('pending', 'running', 'completed', 'failed')),
  started_at timestamptz,
  completed_at timestamptz,
  tokens_used integer default 0,
  error_message text,
  created_at timestamptz default now() not null
);

-- Git Commits
create table public.git_commits (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade not null,
  block_version_id uuid references public.block_versions,
  commit_sha text not null,
  committed_at timestamptz default now() not null
);

-- Indexes
create index idx_kb_workspace on public.knowledge_banks(workspace_id);
create index idx_projects_workspace on public.projects(workspace_id);
create index idx_pages_project on public.pages(project_id);
create index idx_blocks_page on public.blocks(page_id);
create index idx_block_versions_block on public.block_versions(block_id);
create index idx_change_requests_block on public.change_requests(block_id);
create index idx_generation_runs_block on public.generation_runs(block_id);

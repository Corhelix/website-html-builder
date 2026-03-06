-- Migration: RLS policies for project hierarchy tables
-- Sprint 2: Project Hierarchy & Knowledge Bank

-- Enable RLS on all tables
alter table public.knowledge_banks enable row level security;
alter table public.kb_brand_tokens enable row level security;
alter table public.kb_icp enable row level security;
alter table public.kb_tone enable row level security;
alter table public.kb_assets enable row level security;
alter table public.projects enable row level security;
alter table public.pages enable row level security;
alter table public.blocks enable row level security;
alter table public.block_versions enable row level security;
alter table public.change_requests enable row level security;
alter table public.generation_runs enable row level security;
alter table public.git_commits enable row level security;

-- Helper function: check workspace membership
create or replace function public.user_has_workspace_access(ws_id uuid)
returns boolean as $$
  select exists(
    select 1 from public.workspace_users
    where workspace_id = ws_id and user_id = auth.uid()
  );
$$ language sql security definer stable;

-- Helper: check workspace role
create or replace function public.user_workspace_role(ws_id uuid)
returns text as $$
  select role from public.workspace_users
  where workspace_id = ws_id and user_id = auth.uid()
  limit 1;
$$ language sql security definer stable;

-- Helper: get workspace_id from project
create or replace function public.project_workspace_id(proj_id uuid)
returns uuid as $$
  select workspace_id from public.projects where id = proj_id limit 1;
$$ language sql security definer stable;

-- Helper: get workspace_id from page (via project)
create or replace function public.page_workspace_id(pg_id uuid)
returns uuid as $$
  select pr.workspace_id from public.pages p
  join public.projects pr on p.project_id = pr.id
  where p.id = pg_id limit 1;
$$ language sql security definer stable;

-- Helper: get workspace_id from block (via page -> project)
create or replace function public.block_workspace_id(blk_id uuid)
returns uuid as $$
  select pr.workspace_id from public.blocks b
  join public.pages p on b.page_id = p.id
  join public.projects pr on p.project_id = pr.id
  where b.id = blk_id limit 1;
$$ language sql security definer stable;

-- Helper: get workspace_id from KB
create or replace function public.kb_workspace_id(kb uuid)
returns uuid as $$
  select workspace_id from public.knowledge_banks where id = kb limit 1;
$$ language sql security definer stable;

---
--- Knowledge Banks
---

-- Anyone can view templates
create policy "Anyone can view templates" on public.knowledge_banks
  for select using (is_template = true);

-- Members can view their workspace KBs
create policy "Members can view workspace KB" on public.knowledge_banks
  for select using (
    workspace_id is not null and public.user_has_workspace_access(workspace_id)
  );

-- Builders/developers can manage KBs
create policy "Builders can insert KB" on public.knowledge_banks
  for insert with check (
    workspace_id is not null
    and public.user_workspace_role(workspace_id) in ('builder', 'developer')
  );

create policy "Builders can update KB" on public.knowledge_banks
  for update using (
    workspace_id is not null
    and public.user_workspace_role(workspace_id) in ('builder', 'developer')
  );

create policy "Builders can delete KB" on public.knowledge_banks
  for delete using (
    workspace_id is not null
    and public.user_workspace_role(workspace_id) in ('builder', 'developer')
  );

---
--- KB Sub-tables (brand tokens, ICP, tone, assets)
---

-- KB Brand Tokens
create policy "Members can view brand tokens" on public.kb_brand_tokens
  for select using (public.user_has_workspace_access(public.kb_workspace_id(kb_id)));

create policy "Builders can manage brand tokens" on public.kb_brand_tokens
  for all using (
    public.user_workspace_role(public.kb_workspace_id(kb_id)) in ('builder', 'developer')
  );

-- KB ICP
create policy "Members can view ICP" on public.kb_icp
  for select using (public.user_has_workspace_access(public.kb_workspace_id(kb_id)));

create policy "Builders can manage ICP" on public.kb_icp
  for all using (
    public.user_workspace_role(public.kb_workspace_id(kb_id)) in ('builder', 'developer')
  );

-- KB Tone
create policy "Members can view tone" on public.kb_tone
  for select using (public.user_has_workspace_access(public.kb_workspace_id(kb_id)));

create policy "Builders can manage tone" on public.kb_tone
  for all using (
    public.user_workspace_role(public.kb_workspace_id(kb_id)) in ('builder', 'developer')
  );

-- KB Assets
create policy "Members can view assets" on public.kb_assets
  for select using (public.user_has_workspace_access(public.kb_workspace_id(kb_id)));

create policy "Builders can manage assets" on public.kb_assets
  for all using (
    public.user_workspace_role(public.kb_workspace_id(kb_id)) in ('builder', 'developer')
  );

---
--- Projects
---

create policy "Members can view projects" on public.projects
  for select using (public.user_has_workspace_access(workspace_id));

create policy "Builders can insert projects" on public.projects
  for insert with check (
    public.user_workspace_role(workspace_id) in ('builder', 'developer')
  );

create policy "Builders can update projects" on public.projects
  for update using (
    public.user_workspace_role(workspace_id) in ('builder', 'developer')
  );

create policy "Builders can delete projects" on public.projects
  for delete using (
    public.user_workspace_role(workspace_id) in ('builder', 'developer')
  );

---
--- Pages
---

create policy "Members can view pages" on public.pages
  for select using (
    public.user_has_workspace_access(public.project_workspace_id(project_id))
  );

create policy "Builders can manage pages" on public.pages
  for all using (
    public.user_workspace_role(public.project_workspace_id(project_id)) in ('builder', 'developer')
  );

---
--- Blocks
---

create policy "Members can view blocks" on public.blocks
  for select using (
    public.user_has_workspace_access(public.page_workspace_id(page_id))
  );

create policy "Builders can manage blocks" on public.blocks
  for all using (
    public.user_workspace_role(public.page_workspace_id(page_id)) in ('builder', 'developer')
  );

---
--- Block Versions
---

-- Non-client members see all versions
create policy "Team members can view all versions" on public.block_versions
  for select using (
    public.user_workspace_role(public.block_workspace_id(block_id)) in ('builder', 'reviewer', 'developer')
  );

-- Clients see approved versions only
create policy "Clients see approved versions only" on public.block_versions
  for select using (
    status = 'approved'
    and public.user_workspace_role(public.block_workspace_id(block_id)) = 'client'
  );

-- Builders/developers can manage versions
create policy "Builders can manage versions" on public.block_versions
  for all using (
    public.user_workspace_role(public.block_workspace_id(block_id)) in ('builder', 'developer')
  );

-- Reviewers can update version status (approve/reject)
create policy "Reviewers can update version status" on public.block_versions
  for update using (
    public.user_workspace_role(public.block_workspace_id(block_id)) = 'reviewer'
  );

---
--- Change Requests
---

create policy "Members can view change requests" on public.change_requests
  for select using (
    public.user_has_workspace_access(public.block_workspace_id(block_id))
  );

-- Clients can submit change requests
create policy "Clients can submit change requests" on public.change_requests
  for insert with check (
    requested_by = auth.uid()
    and public.user_workspace_role(public.block_workspace_id(block_id)) = 'client'
  );

-- Builders can manage change requests
create policy "Builders can manage change requests" on public.change_requests
  for all using (
    public.user_workspace_role(public.block_workspace_id(block_id)) in ('builder', 'developer')
  );

---
--- Generation Runs
---

create policy "Members can view generation runs" on public.generation_runs
  for select using (
    project_id is not null
    and public.user_has_workspace_access(public.project_workspace_id(project_id))
  );

create policy "Builders can manage generation runs" on public.generation_runs
  for all using (
    project_id is not null
    and public.user_workspace_role(public.project_workspace_id(project_id)) in ('builder', 'developer')
  );

---
--- Git Commits
---

create policy "Members can view git commits" on public.git_commits
  for select using (
    public.user_has_workspace_access(public.project_workspace_id(project_id))
  );

create policy "Developers can manage git commits" on public.git_commits
  for all using (
    public.user_workspace_role(public.project_workspace_id(project_id)) in ('builder', 'developer')
  );

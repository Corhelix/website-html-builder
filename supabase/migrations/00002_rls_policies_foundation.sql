-- Migration: RLS policies for profiles, workspaces, workspace_users
-- Sprint 1: Auth & Workspace

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_users enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup (trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Workspaces: members can view their workspaces
create policy "Members can view workspace" on public.workspaces
  for select using (
    id in (select workspace_id from public.workspace_users where user_id = auth.uid())
  );

-- Workspaces: builders/developers can update workspace settings
create policy "Builders can update workspace" on public.workspaces
  for update using (
    id in (
      select workspace_id from public.workspace_users
      where user_id = auth.uid() and role in ('builder', 'developer')
    )
  );

-- Workspaces: any authenticated user can create a workspace
create policy "Authenticated users can create workspace" on public.workspaces
  for insert with check (auth.uid() is not null);

-- Workspace users: members can view other members in their workspace
create policy "Members can view workspace members" on public.workspace_users
  for select using (
    workspace_id in (select workspace_id from public.workspace_users where user_id = auth.uid())
  );

-- Workspace users: builders/developers can invite (insert) new members
create policy "Builders can invite members" on public.workspace_users
  for insert with check (
    workspace_id in (
      select workspace_id from public.workspace_users
      where user_id = auth.uid() and role in ('builder', 'developer')
    )
  );

-- Workspace users: builders/developers can update roles
create policy "Builders can update roles" on public.workspace_users
  for update using (
    workspace_id in (
      select workspace_id from public.workspace_users
      where user_id = auth.uid() and role in ('builder', 'developer')
    )
  );

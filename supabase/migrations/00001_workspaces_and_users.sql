-- Migration: Foundation tables for auth, profiles, workspaces, and workspace membership
-- Sprint 1: Auth & Workspace

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (mirrors auth.users for RLS joins)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- Workspaces
create table public.workspaces (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  plan text not null default 'solo' check (plan in ('solo', 'agency', 'scale')),
  generation_count_current_period integer default 0 not null,
  billing_period_start timestamptz default now() not null,
  created_at timestamptz default now() not null
);

-- Workspace membership (junction table with role)
create table public.workspace_users (
  workspace_id uuid references public.workspaces on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  role text not null default 'builder' check (role in ('builder', 'reviewer', 'client', 'developer')),
  invited_at timestamptz default now() not null,
  primary key (workspace_id, user_id)
);

-- Indexes
create index idx_workspace_users_user on public.workspace_users(user_id);
create index idx_workspace_users_workspace on public.workspace_users(workspace_id);
create index idx_workspaces_slug on public.workspaces(slug);

-- Run once in the Supabase SQL editor.
-- The public site never uses the anon key. The server uses the secret key, which bypasses row security.
-- Email is not stored as a sender here. Resend can be added later against the applications table.

create table if not exists public.site_content (
  key text primary key,
  body jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bucket text not null,
  path text not null,
  content_type text not null,
  kind text not null check (kind in ('image', 'document')),
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('application', 'note')),
  parent_name text not null,
  student_name text not null,
  class_name text not null default '',
  email text not null,
  phone text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.documents enable row level security;
alter table public.applications enable row level security;

revoke all on table public.site_content from anon, authenticated;
revoke all on table public.documents from anon, authenticated;
revoke all on table public.applications from anon, authenticated;

grant select, insert, update, delete on table public.site_content to service_role;
grant select, insert, update, delete on table public.documents to service_role;
grant select, insert, update, delete on table public.applications to service_role;

insert into storage.buckets (id, name, public)
values ('media', 'media', true), ('documents', 'documents', true)
on conflict (id) do nothing;

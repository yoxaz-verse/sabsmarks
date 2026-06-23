create table if not exists public.senior_management_team (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  designation text not null,
  photo_url text,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists senior_management_team_status_order_idx
on public.senior_management_team (status, display_order);

create extension if not exists "pgcrypto";

create table if not exists user_roles (
  user_id uuid primary key,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamptz default now()
);

create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  template_type text not null,
  excerpt text,
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  featured boolean not null default false,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages(id) on delete cascade,
  section_type text not null,
  variant text not null default 'default',
  payload jsonb not null default '{}'::jsonb,
  order_index integer not null default 0,
  is_enabled boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null,
  logo_url text,
  primary_email text,
  primary_phone text,
  social_links jsonb not null default '{}'::jsonb,
  footer_text text,
  disclaimers text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  public_id text unique not null,
  url text not null,
  resource_type text not null default 'image',
  used_in_table text,
  used_in_id uuid,
  created_by uuid,
  created_at timestamptz default now()
);

create table if not exists practice_areas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  excerpt text,
  body text,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table if not exists industry_solutions (like practice_areas including all);
create table if not exists publications (like practice_areas including all);
create table if not exists careers (like practice_areas including all);
create table if not exists offices (like practice_areas including all);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  designation text not null,
  credentials text,
  bio text,
  photo_url text,
  display_order integer not null default 0,
  featured boolean not null default false,
  excerpt text,
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table if not exists insight_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists insight_tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  city text not null,
  office_name text not null,
  address text not null,
  phone text,
  email text,
  map_url text,
  contact_person text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references menu_items(id) on delete set null,
  label text not null,
  href text not null,
  group_name text not null,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  source text not null default 'footer',
  created_at timestamptz default now()
);

create or replace function public.user_role() returns text language sql stable as $$
  select role from user_roles where user_id = auth.uid();
$$;

create or replace function public.can_edit() returns boolean language sql stable as $$
  select public.user_role() in ('admin', 'editor');
$$;

alter table pages enable row level security;
alter table user_roles enable row level security;
alter table sections enable row level security;
alter table site_settings enable row level security;
alter table media_assets enable row level security;
alter table practice_areas enable row level security;
alter table industry_solutions enable row level security;
alter table publications enable row level security;
alter table careers enable row level security;
alter table offices enable row level security;
alter table team_members enable row level security;
alter table insight_categories enable row level security;
alter table insight_tags enable row level security;
alter table locations enable row level security;
alter table menu_items enable row level security;
alter table newsletter_subscribers enable row level security;

drop policy if exists "published pages are public" on pages;
create policy "published pages are public" on pages for select using (status = 'published');

drop policy if exists "public sections read" on sections;
create policy "public sections read" on sections for select using (is_enabled = true);

drop policy if exists "public settings read" on site_settings;
create policy "public settings read" on site_settings for select using (true);

create policy "published entries public practice" on practice_areas for select using (status = 'published');
create policy "published entries public industry" on industry_solutions for select using (status = 'published');
create policy "published entries public publications" on publications for select using (status = 'published');
create policy "published entries public careers" on careers for select using (status = 'published');
create policy "published entries public offices" on offices for select using (status = 'published');
create policy "published team public" on team_members for select using (status = 'published');
create policy "published categories public" on insight_categories for select using (status = 'published');
create policy "published tags public" on insight_tags for select using (status = 'published');
create policy "published locations public" on locations for select using (status = 'published');
create policy "published menu public" on menu_items for select using (status = 'published');
create policy "public newsletter subscribe" on newsletter_subscribers for insert with check (true);
drop policy if exists "user can read own role" on user_roles;
create policy "user can read own role" on user_roles
for select
to authenticated
using (user_id = auth.uid());

create policy "editor pages write" on pages for all using (public.can_edit()) with check (public.can_edit());
create policy "editor sections write" on sections for all using (public.can_edit()) with check (public.can_edit());
create policy "editor settings write" on site_settings for all using (public.can_edit()) with check (public.can_edit());
create policy "editor media write" on media_assets for all using (public.can_edit()) with check (public.can_edit());
create policy "editor practice write" on practice_areas for all using (public.can_edit()) with check (public.can_edit());
create policy "editor industry write" on industry_solutions for all using (public.can_edit()) with check (public.can_edit());
create policy "editor publications write" on publications for all using (public.can_edit()) with check (public.can_edit());
create policy "editor careers write" on careers for all using (public.can_edit()) with check (public.can_edit());
create policy "editor offices write" on offices for all using (public.can_edit()) with check (public.can_edit());
create policy "editor team write" on team_members for all using (public.can_edit()) with check (public.can_edit());
create policy "editor categories write" on insight_categories for all using (public.can_edit()) with check (public.can_edit());
create policy "editor tags write" on insight_tags for all using (public.can_edit()) with check (public.can_edit());
create policy "editor locations write" on locations for all using (public.can_edit()) with check (public.can_edit());
create policy "editor menu write" on menu_items for all using (public.can_edit()) with check (public.can_edit());
create policy "editor newsletter read" on newsletter_subscribers for select using (public.can_edit());

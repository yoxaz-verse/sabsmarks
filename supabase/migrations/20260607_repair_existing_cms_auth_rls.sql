-- Repair auth/RLS drift for an existing CMS database.
-- Safe to run on a live project where tables already exist and data must be preserved.
-- Safe to run multiple times.

begin;

create extension if not exists "pgcrypto";

alter table if exists public.user_roles enable row level security;
alter table if exists public.pages enable row level security;
alter table if exists public.sections enable row level security;
alter table if exists public.site_settings enable row level security;
alter table if exists public.media_assets enable row level security;
alter table if exists public.practice_areas enable row level security;
alter table if exists public.industry_solutions enable row level security;
alter table if exists public.publications enable row level security;
alter table if exists public.careers enable row level security;
alter table if exists public.offices enable row level security;
alter table if exists public.team_members enable row level security;
alter table if exists public.insight_categories enable row level security;
alter table if exists public.insight_tags enable row level security;
alter table if exists public.locations enable row level security;
alter table if exists public.menu_items enable row level security;
alter table if exists public.newsletter_subscribers enable row level security;

create or replace function public.user_role() returns text language sql stable as $$
  select role from public.user_roles where user_id = auth.uid();
$$;

create or replace function public.can_edit() returns boolean language sql stable as $$
  select public.user_role() in ('admin', 'editor');
$$;

drop policy if exists "user can read own role" on public.user_roles;
drop policy if exists "Users can read own role" on public.user_roles;
drop policy if exists "read own role" on public.user_roles;
drop policy if exists "authenticated can read role" on public.user_roles;

create policy "user can read own role"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "editor pages write" on public.pages;
create policy "editor pages write" on public.pages for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor sections write" on public.sections;
create policy "editor sections write" on public.sections for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor settings write" on public.site_settings;
create policy "editor settings write" on public.site_settings for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor media write" on public.media_assets;
create policy "editor media write" on public.media_assets for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor practice write" on public.practice_areas;
create policy "editor practice write" on public.practice_areas for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor industry write" on public.industry_solutions;
create policy "editor industry write" on public.industry_solutions for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor publications write" on public.publications;
create policy "editor publications write" on public.publications for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor careers write" on public.careers;
create policy "editor careers write" on public.careers for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor offices write" on public.offices;
create policy "editor offices write" on public.offices for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor team write" on public.team_members;
create policy "editor team write" on public.team_members for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor categories write" on public.insight_categories;
create policy "editor categories write" on public.insight_categories for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor tags write" on public.insight_tags;
create policy "editor tags write" on public.insight_tags for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor locations write" on public.locations;
create policy "editor locations write" on public.locations for all using (public.can_edit()) with check (public.can_edit());

drop policy if exists "editor menu write" on public.menu_items;
create policy "editor menu write" on public.menu_items for all using (public.can_edit()) with check (public.can_edit());

commit;

-- Verification queries
-- 1) Inspect canonical auth and team write policies.
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and (
    (tablename = 'user_roles' and policyname = 'user can read own role')
    or (tablename = 'team_members' and policyname = 'editor team write')
  )
order by tablename, policyname;

-- 2) Inspect all editor write policies if needed.
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and policyname like 'editor % write'
order by tablename, policyname;

-- 3) Ensure the intended auth user has a role row.
-- replace with your auth user id
-- select * from public.user_roles where user_id = '<AUTH_USER_ID>';

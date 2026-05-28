-- One-time repair: normalize user_roles RLS to canonical policy.
-- Safe to run multiple times.

begin;

alter table if exists public.user_roles enable row level security;

-- Drop legacy/conflicting policies on user_roles.
drop policy if exists "user can read own role" on public.user_roles;
drop policy if exists "Users can read own role" on public.user_roles;
drop policy if exists "read own role" on public.user_roles;
drop policy if exists "authenticated can read role" on public.user_roles;

-- Canonical policy required by the app.
create policy "user can read own role"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());

commit;

-- Verification queries
-- 1) Inspect active policies
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'user_roles'
order by policyname;

-- 2) Ensure row exists for expected auth user id
-- replace with your id
-- select * from public.user_roles where user_id = '<AUTH_USER_ID>';

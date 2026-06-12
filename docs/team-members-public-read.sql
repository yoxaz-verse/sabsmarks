-- Repair public visibility for published leadership profiles.
-- Run in Supabase SQL Editor for the connected project.

grant select on public.team_members to anon, authenticated;

drop policy if exists "published team members are publicly readable" on public.team_members;

create policy "published team members are publicly readable"
on public.team_members
for select
to anon, authenticated
using (status = 'published');

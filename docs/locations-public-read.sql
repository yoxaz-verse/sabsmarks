-- Repair public visibility for published branch locations.
-- Run in Supabase SQL Editor for the connected project.

grant select on public.locations to anon, authenticated;

drop policy if exists "published locations are publicly readable" on public.locations;

create policy "published locations are publicly readable"
on public.locations
for select
to anon, authenticated
using (status = 'published');

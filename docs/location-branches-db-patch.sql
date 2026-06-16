-- Non-destructive patch for supporting branches under a location.
-- Run this once in the Supabase SQL Editor before saving location branches in the CMS.

alter table public.locations
  add column if not exists branches jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'locations_branches_is_array'
      and conrelid = 'public.locations'::regclass
  ) then
    alter table public.locations
      add constraint locations_branches_is_array
      check (jsonb_typeof(branches) = 'array');
  end if;
end $$;

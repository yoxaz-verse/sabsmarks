-- Patch for an existing CMS database.
-- Safe to run on a live project where tables already exist and data must be preserved.

begin;

alter table public.team_members
  add column if not exists location text,
  add column if not exists linkedin_url text;

alter table public.site_settings
  add column if not exists head_office_label text,
  add column if not exists head_office_address text,
  add column if not exists service_locations jsonb not null default '[]'::jsonb;

commit;

-- Non-destructive patch for flat location map pins and photos.
-- Run this once in the Supabase SQL Editor before saving latitude, longitude, or branch photos in the CMS.

alter table public.locations
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists photo_url text;

-- Legacy nested location flattening helper.
-- The CMS now treats every row in public.locations as one real branch/location.
-- Before removing the old nested JSON usage, run this once if existing rows have
-- non-empty public.locations.branches arrays.
--
-- Review the generated rows after running. The script keeps the old branches
-- JSON column for compatibility, but the application no longer reads or writes it.

insert into public.locations (
  slug,
  city,
  office_name,
  address,
  phone,
  email,
  map_url,
  contact_person,
  latitude,
  longitude,
  photo_url,
  featured,
  status,
  updated_at
)
select
  left(parent.slug || '-' || lower(regexp_replace(coalesce(branch->>'name', 'branch-location'), '[^a-zA-Z0-9]+', '-', 'g')), 96) as slug,
  coalesce(nullif(branch->>'name', ''), parent.city) as city,
  parent.office_name,
  nullif(branch->>'address', '') as address,
  nullif(branch->>'phone', '') as phone,
  nullif(branch->>'email', '') as email,
  nullif(branch->>'map_url', '') as map_url,
  nullif(branch->>'contact_person', '') as contact_person,
  nullif(branch->>'latitude', '')::double precision as latitude,
  nullif(branch->>'longitude', '')::double precision as longitude,
  nullif(branch->>'photo_url', '') as photo_url,
  false as featured,
  parent.status,
  now() as updated_at
from public.locations parent
cross join lateral jsonb_array_elements(parent.branches) as branch
where jsonb_typeof(parent.branches) = 'array'
  and jsonb_array_length(parent.branches) > 0;

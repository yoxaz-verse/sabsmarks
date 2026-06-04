alter table public.site_settings
  add column if not exists head_office_label text,
  add column if not exists head_office_address text,
  add column if not exists service_locations jsonb not null default '[]'::jsonb;

update public.site_settings
set
  primary_email = 'info@sabsmarksjvs.com',
  primary_phone = '8943115500',
  head_office_label = 'H.O',
  head_office_address = 'Oonukallel Arcade, M C Road, Ettumanoor, Kottayam, 686632, Kerala',
  social_links = coalesce(social_links, '{}'::jsonb) || jsonb_build_object(
    'linkedin', 'https://www.linkedin.com/company/sabs-marks-jvs-co/',
    'instagram', 'https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ=='
  ),
  service_locations = '["Kochi","Angamaly","Thrissur","Bengaluru","Chennai","Tirupati","Gurgaon","Ettumanoor","Kottayam","Chengannur","Hyderabad","Dubai"]'::jsonb,
  updated_at = now();

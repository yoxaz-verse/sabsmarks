create table if not exists public.appointment_slots (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.team_members(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  notes text,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index if not exists appointment_slots_public_lookup_idx
on public.appointment_slots (status, appointment_date, start_time);

create index if not exists appointment_slots_partner_location_idx
on public.appointment_slots (partner_id, location_id);

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.appointment_slots(id) on delete cascade,
  visitor_name text not null,
  visitor_email text not null,
  visitor_phone text not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointment_requests_slot_status_idx
on public.appointment_requests (slot_id, status);

create index if not exists appointment_requests_created_at_idx
on public.appointment_requests (created_at desc);

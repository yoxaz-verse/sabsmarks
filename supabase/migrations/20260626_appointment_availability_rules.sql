create table if not exists public.appointment_availability_rules (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.team_members(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  enabled_weekdays integer[] not null default '{1,2,3,4,5}',
  start_time time not null default '10:00',
  end_time time not null default '17:00',
  slot_duration_minutes integer not null default 30 check (slot_duration_minutes between 5 and 480),
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index if not exists appointment_availability_rules_status_idx
on public.appointment_availability_rules (status, partner_id, location_id);

create table if not exists public.appointment_blocks (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.team_members(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  block_date date not null,
  start_time time,
  end_time time,
  note text,
  status text not null default 'published' check (status in ('draft', 'review', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((start_time is null and end_time is null) or (start_time is not null and end_time is not null and end_time > start_time))
);

create index if not exists appointment_blocks_lookup_idx
on public.appointment_blocks (status, partner_id, location_id, block_date);

alter table public.appointment_requests
alter column slot_id drop not null;

alter table public.appointment_requests
add column if not exists partner_id uuid references public.team_members(id) on delete set null,
add column if not exists location_id uuid references public.locations(id) on delete set null,
add column if not exists appointment_date date,
add column if not exists start_time time,
add column if not exists end_time time,
add column if not exists source text not null default 'manual' check (source in ('manual', 'generated'));

create index if not exists appointment_requests_generated_lookup_idx
on public.appointment_requests (partner_id, location_id, appointment_date, start_time, end_time, status);

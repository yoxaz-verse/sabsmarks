alter table public.locations 
add column if not exists display_order integer not null default 0;

create index if not exists locations_status_order_idx
on public.locations (status, display_order);

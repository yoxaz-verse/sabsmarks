-- Non-destructive patch for the on-site career application workflow.
-- Run this in Supabase SQL Editor before testing the public Apply form.

create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  career_id uuid not null references public.careers(id) on delete cascade,
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text not null,
  message text,
  resume_bucket text not null default 'career-resumes',
  resume_path text not null,
  resume_filename text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint career_applications_status_check check (status in ('new', 'reviewed', 'shortlisted', 'rejected', 'archived'))
);

create index if not exists career_applications_career_id_idx on public.career_applications(career_id);
create index if not exists career_applications_created_at_idx on public.career_applications(created_at desc);

alter table public.career_applications enable row level security;

drop policy if exists "editor career applications read" on public.career_applications;
create policy "editor career applications read"
on public.career_applications
for select
to authenticated
using (public.can_edit());

drop policy if exists "editor career applications update" on public.career_applications;
create policy "editor career applications update"
on public.career_applications
for update
to authenticated
using (public.can_edit())
with check (public.can_edit());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'career-resumes',
  'career-resumes',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

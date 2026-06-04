-- Sabs Marks JVS PVT LTD CMS - Full Reset Bootstrap
-- Run this whole script in Supabase SQL Editor (same project as .env.local)
-- WARNING: This resets CMS tables/data.

begin;

create extension if not exists "pgcrypto";

-- Drop policies (safe)
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'pages','user_roles','sections','site_settings','media_assets','practice_areas',
        'industry_solutions','publications','careers','offices','team_members',
        'insight_categories','insight_tags','locations','menu_items','newsletter_subscribers'
      )
  loop
    execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- Drop dependent functions first
drop function if exists public.can_edit();
drop function if exists public.user_role();

-- Drop tables in dependency-safe order
drop table if exists sections cascade;
drop table if exists newsletter_subscribers cascade;
drop table if exists menu_items cascade;
drop table if exists locations cascade;
drop table if exists insight_tags cascade;
drop table if exists insight_categories cascade;
drop table if exists team_members cascade;
drop table if exists offices cascade;
drop table if exists careers cascade;
drop table if exists publications cascade;
drop table if exists industry_solutions cascade;
drop table if exists practice_areas cascade;
drop table if exists media_assets cascade;
drop table if exists site_settings cascade;
drop table if exists pages cascade;
drop table if exists user_roles cascade;

-- Core tables
create table user_roles (
  user_id uuid primary key,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamptz default now()
);

create table pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  template_type text not null,
  excerpt text,
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  featured boolean not null default false,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages(id) on delete cascade,
  section_type text not null,
  variant text not null default 'default',
  payload jsonb not null default '{}'::jsonb,
  order_index integer not null default 0,
  is_enabled boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table site_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null,
  logo_url text,
  primary_email text,
  primary_phone text,
  head_office_label text,
  head_office_address text,
  social_links jsonb not null default '{}'::jsonb,
  service_locations jsonb not null default '[]'::jsonb,
  footer_text text,
  disclaimers text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  public_id text unique not null,
  url text not null,
  resource_type text not null default 'image',
  used_in_table text,
  used_in_id uuid,
  created_by uuid,
  created_at timestamptz default now()
);

create table practice_areas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  excerpt text,
  body text,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table industry_solutions (like practice_areas including all);
create table publications (like practice_areas including all);
create table careers (like practice_areas including all);
create table offices (like practice_areas including all);

create table team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  designation text not null,
  location text,
  linkedin_url text,
  credentials text,
  bio text,
  photo_url text,
  display_order integer not null default 0,
  featured boolean not null default false,
  excerpt text,
  seo_title text,
  seo_description text,
  og_image_url text,
  canonical_url text,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table insight_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table insight_tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  city text not null,
  office_name text not null,
  address text not null,
  phone text,
  email text,
  map_url text,
  contact_person text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid,
  updated_by uuid
);

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references menu_items(id) on delete set null,
  label text not null,
  href text not null,
  group_name text not null,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  source text not null default 'footer',
  created_at timestamptz default now()
);

create or replace function public.user_role() returns text language sql stable as $$
  select role from user_roles where user_id = auth.uid();
$$;

create or replace function public.can_edit() returns boolean language sql stable as $$
  select public.user_role() in ('admin', 'editor');
$$;

-- RLS
alter table pages enable row level security;
alter table user_roles enable row level security;
alter table sections enable row level security;
alter table site_settings enable row level security;
alter table media_assets enable row level security;
alter table practice_areas enable row level security;
alter table industry_solutions enable row level security;
alter table publications enable row level security;
alter table careers enable row level security;
alter table offices enable row level security;
alter table team_members enable row level security;
alter table insight_categories enable row level security;
alter table insight_tags enable row level security;
alter table locations enable row level security;
alter table menu_items enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public read policies
create policy "published pages are public" on pages for select using (status = 'published');
create policy "public sections read" on sections for select using (is_enabled = true);
create policy "public settings read" on site_settings for select using (true);
create policy "published entries public practice" on practice_areas for select using (status = 'published');
create policy "published entries public industry" on industry_solutions for select using (status = 'published');
create policy "published entries public publications" on publications for select using (status = 'published');
create policy "published entries public careers" on careers for select using (status = 'published');
create policy "published entries public offices" on offices for select using (status = 'published');
create policy "published team public" on team_members for select using (status = 'published');
create policy "published categories public" on insight_categories for select using (status = 'published');
create policy "published tags public" on insight_tags for select using (status = 'published');
create policy "published locations public" on locations for select using (status = 'published');
create policy "published menu public" on menu_items for select using (status = 'published');
create policy "public newsletter subscribe" on newsletter_subscribers for insert with check (true);

-- Role + editor policies
create policy "user can read own role" on user_roles
for select to authenticated using (user_id = auth.uid());

create policy "editor pages write" on pages for all using (public.can_edit()) with check (public.can_edit());
create policy "editor sections write" on sections for all using (public.can_edit()) with check (public.can_edit());
create policy "editor settings write" on site_settings for all using (public.can_edit()) with check (public.can_edit());
create policy "editor media write" on media_assets for all using (public.can_edit()) with check (public.can_edit());
create policy "editor practice write" on practice_areas for all using (public.can_edit()) with check (public.can_edit());
create policy "editor industry write" on industry_solutions for all using (public.can_edit()) with check (public.can_edit());
create policy "editor publications write" on publications for all using (public.can_edit()) with check (public.can_edit());
create policy "editor careers write" on careers for all using (public.can_edit()) with check (public.can_edit());
create policy "editor offices write" on offices for all using (public.can_edit()) with check (public.can_edit());
create policy "editor team write" on team_members for all using (public.can_edit()) with check (public.can_edit());
create policy "editor categories write" on insight_categories for all using (public.can_edit()) with check (public.can_edit());
create policy "editor tags write" on insight_tags for all using (public.can_edit()) with check (public.can_edit());
create policy "editor locations write" on locations for all using (public.can_edit()) with check (public.can_edit());
create policy "editor menu write" on menu_items for all using (public.can_edit()) with check (public.can_edit());
create policy "editor newsletter read" on newsletter_subscribers for select using (public.can_edit());

-- Seed: global
insert into site_settings (id, brand_name, primary_email, primary_phone, head_office_label, head_office_address, footer_text, social_links, service_locations)
values (
  '00000000-0000-0000-0000-000000000001',
  'Sabs Marks JVS PVT LTD',
  'info@sabsmarksjvs.com',
  '8943115500',
  'H.O',
  'Oonukallel Arcade, M C Road, Ettumanoor, Kottayam, 686632, Kerala',
  'Copyright © 2026 Sabs Marks JVS PVT LTD. All rights reserved.',
  '{"linkedin":"https://www.linkedin.com/company/sabs-marks-jvs-co/","instagram":"https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ=="}'::jsonb,
  '["Kochi","Angamaly","Thrissur","Bengaluru","Chennai","Tirupati","Gurgaon","Ettumanoor","Kottayam","Chengannur","Hyderabad","Dubai"]'::jsonb
);

-- Seed: pages
insert into pages (slug, title, template_type, status, published_at)
values
('home', 'Home', 'home', 'published', now()),
('about', 'The Firm', 'about', 'published', now()),
('about/legacy', 'Legacy', 'about', 'published', now()),
('about/team', 'Leadership', 'about', 'published', now()),
('about/locations', 'Our Services', 'about', 'published', now()),
('expertise/ifsc', 'Services in IFSC (GIFT City)', 'generic', 'published', now()),
('expertise/uae', 'Services in UAE', 'generic', 'published', now()),
('expertise/our-approach', 'Our Approach', 'generic', 'published', now()),
('careers/philosophy', 'Philosophy', 'generic', 'published', now()),
('careers/alumni', 'Alumni', 'generic', 'published', now()),
('contact', 'Contact Us', 'contact', 'published', now());

-- Seed: sections (home)
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object(
  'kicker','Sabs Marks JVS PVT LTD',
  'headline','Where knowledge meets experience',
  'subtext','Partner-led assurance, tax, and advisory services for domestic and multinational businesses.'
), 0, true from pages where slug='home';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'stats', jsonb_build_object('items', jsonb_build_array(
  jsonb_build_object('label','Established','value','1936'),
  jsonb_build_object('label','People','value','1000+'),
  jsonb_build_object('label','Locations','value','13')
)), 1, true from pages where slug='home';

-- Seed: About / Expertise / Career content pages
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','The Firm','subtext','A full-service professional firm with deep-rooted client relationships and practical advisory expertise.'), 0, true
from pages where slug='about';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','Overview','content','Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.'), 1, true
from pages where slug='about';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','Legacy','subtext','Our journey is built through decades of professional excellence.'), 0, true
from pages where slug='about/legacy';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','Milestones','content','Legacy content can now be fully managed from Admin > Pages.'), 1, true
from pages where slug='about/legacy';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','Leadership','subtext','Partner-led teams with deep domain expertise.'), 0, true
from pages where slug='about/team';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','Our Services','subtext','Structured support across finance, governance, compliance, and execution.'), 0, true
from pages where slug='about/locations';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Expertise','headline','Services in IFSC (GIFT City)','subtext','Specialized support for IFSC entities and regulatory frameworks.'), 0, true
from pages where slug='expertise/ifsc';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','IFSC Services','content','Editable content seeded from bootstrap script.'), 1, true
from pages where slug='expertise/ifsc';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Expertise','headline','Services in UAE','subtext','Cross-border and regional support for UAE business requirements.'), 0, true
from pages where slug='expertise/uae';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','UAE Services','content','Editable content seeded from bootstrap script.'), 1, true
from pages where slug='expertise/uae';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Expertise','headline','Our Approach','subtext','A structured, partner-led method tailored to each client context.'), 0, true
from pages where slug='expertise/our-approach';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','Approach','content','Editable content seeded from bootstrap script.'), 1, true
from pages where slug='expertise/our-approach';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Career','headline','Philosophy','subtext','Built on quality, ethics, and integrity.'), 0, true
from pages where slug='careers/philosophy';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','Our People','content','We believe complex challenges are best solved together.'), 1, true
from pages where slug='careers/philosophy';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Career','headline','Alumni','subtext','Stay connected with the Sabs Marks JVS PVT LTD alumni network.'), 0, true
from pages where slug='careers/alumni';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'contact_form', jsonb_build_object('title','Alumni Connect','content','Name, contact number and email form managed by CMS.'), 1, true
from pages where slug='careers/alumni';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Contact','headline','Contact Us','subtext','Reach our offices across locations.'), 0, true
from pages where slug='contact';

-- Seed: collections
insert into practice_areas (slug, title, summary, excerpt, body, status, published_at)
values
('tax-regulatory-services', 'Tax & Regulatory Services', 'Comprehensive tax, regulatory and compliance support.', 'Strategic and compliance-focused tax advisory.', 'End-to-end support for direct, indirect and regulatory compliance.', 'published', now()),
('corporate-finance-advisory-services', 'Corporate Finance Advisory Services', 'Strategic corporate finance and transaction support.', 'Deal-ready finance strategy and execution.', 'Support across M&A readiness, valuation, due diligence and finance transformation.', 'published', now());

insert into industry_solutions (slug, title, summary, body, status, published_at)
values
('msme', 'MSME Sector', 'Advisory solutions tailored for MSME businesses.', 'Specialized compliance and growth advisory for MSMEs.', 'published', now());

insert into publications (slug, title, summary, excerpt, body, metadata, status, published_at)
values
('finance-bill-highlights-2026', 'Finance Bill Highlights 2026', 'Key updates for CFOs and finance leaders.', 'Tax, compliance and strategic implications from the new bill.', 'Long-form insight content placeholder for migration.', '{"category":"direct-tax","tag":"finance-bill"}', 'published', now());

insert into careers (slug, title, summary, body, status, published_at)
values
('senior-audit-associate', 'Senior Audit Associate', 'Join our assurance team.', 'Role details and requirements.', 'published', now()),
('tax-manager', 'Tax Manager', 'Lead tax advisory assignments and reviews.', 'Role details and requirements.', 'published', now());

insert into locations (slug, city, office_name, address, phone, email, status)
values
('chennai', 'Chennai', 'Sabs Marks JVS PVT LTD Chennai', 'New No. 57, Kochu Bhavan, Ground Floor, McNicholas Road, Chetpet, Chennai 600 031', '+91 44 3500 3458', 'chennai@sabsmarksjvs.com', 'published'),
('mumbai', 'Mumbai', 'Sabs Marks JVS PVT LTD Mumbai', 'Mistry Bhavan, 3rd Floor, Dinshaw Vachha Road, Churchgate, Mumbai 400020', '+91 22 6623 0600', 'mumbai@sabsmarksjvs.com', 'published'),
('dubai', 'Dubai', 'Sabs Marks JVS PVT LTD Dubai', 'UAE associate office address placeholder', '+971 00 000 0000', 'dubai@sabsmarksjvs.com', 'published');

insert into team_members (slug, name, designation, credentials, bio, display_order, featured, status, published_at)
values
('ca-sabu-thomas', 'CA. Sabu Thomas', 'Founder & Senior Partner', 'FCA', 'Founding partner with multi-decade advisory and assurance leadership.', 1, true, 'published', now()),
('ca-salim-a', 'CA. Salim A', 'Senior Partner', 'FCA', 'Senior partner focusing on strategic finance and compliance advisory.', 2, true, 'published', now());

insert into insight_categories (slug, title, description, display_order, status)
values
('direct-tax', 'Direct Tax', 'Direct tax analysis and updates.', 1, 'published'),
('audit', 'Audit', 'Audit and assurance insights.', 2, 'published');

insert into insight_tags (slug, title, status)
values
('finance-bill', 'Finance Bill', 'published'),
('regulatory', 'Regulatory', 'published');

-- Seed: nav with required subcategories
insert into menu_items (label, href, group_name, display_order, status)
values
('Home', '/', 'Home', 1, 'published'),
('The Firm', '/about', 'About', 1, 'published'),
('Leadership', '/about/team', 'About', 3, 'published'),
('Our Services', '/about/locations', 'About', 4, 'published'),
('Services', '/practice-areas', 'Expertise', 1, 'published'),
('Our Approach', '/expertise/our-approach', 'Expertise', 5, 'published'),
('Insights', '/insights', 'Insights', 1, 'published'),
('Philosophy', '/careers/philosophy', 'Career', 1, 'published'),
('Join Us', '/careers', 'Career', 2, 'published'),
('Contact', '/contact', 'Contact', 1, 'published');

commit;

-- ---------------------------------------------------------
-- Post-run verification (run after commit)
-- ---------------------------------------------------------
-- 1) Must include key tables
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'user_roles','pages','sections','site_settings','media_assets','menu_items',
    'practice_areas','industry_solutions','publications','careers','offices',
    'locations','team_members','insight_categories','insight_tags','newsletter_subscribers'
  )
order by table_name;

-- 2) Basic row checks
select
  (select count(*) from pages) as pages_count,
  (select count(*) from sections) as sections_count,
  (select count(*) from menu_items) as menu_count,
  (select count(*) from careers) as careers_count;

-- 3) Verify Career submenu rows
select label, href, display_order
from menu_items
where group_name = 'Career'
order by display_order;

-- 4) Admin role assignment (replace UUID from Authentication > Users)
-- insert into user_roles (user_id, role)
-- values ('<USER_UUID>', 'admin')
-- on conflict (user_id) do update set role = excluded.role;

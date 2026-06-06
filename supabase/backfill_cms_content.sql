-- One-time safe content backfill for informational CMS pages
-- Run after schema.sql in the same Supabase project.

create extension if not exists "pgcrypto";

insert into site_settings (
  id,
  brand_name,
  primary_email,
  primary_phone,
  head_office_label,
  head_office_address,
  social_links,
  service_locations,
  footer_text
)
values (
  '00000000-0000-0000-0000-000000000001',
  'Sabs Marks JVS PVT LTD',
  'info@sabsmarksjvs.com',
  '8943115500',
  'H.O',
  'Oonukallel Arcade, M C Road, Ettumanoor, Kottayam, 686632, Kerala',
  '{"linkedin":"https://www.linkedin.com/company/sabs-marks-jvs-co/","instagram":"https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ=="}'::jsonb,
  '["Kochi","Angamaly","Thrissur","Bengaluru","Chennai","Tirupati","Gurgaon","Ettumanoor","Kottayam","Chengannur","Hyderabad","Dubai"]'::jsonb,
  'Sabs Marks JVS PVT LTD. All rights reserved.'
)
on conflict (id) do update set
  brand_name = excluded.brand_name,
  primary_email = excluded.primary_email,
  primary_phone = excluded.primary_phone,
  head_office_label = excluded.head_office_label,
  head_office_address = excluded.head_office_address,
  social_links = excluded.social_links,
  service_locations = excluded.service_locations,
  footer_text = excluded.footer_text,
  updated_at = now();

-- 1) Pages
insert into pages (slug, title, template_type, status, published_at)
values
('about', 'The Firm', 'about', 'published', now()),
('about/legacy', 'Legacy', 'about', 'published', now()),
('about/locations', 'Locations', 'about', 'published', now()),
('about/team', 'Leadership', 'about', 'published', now()),
('careers/philosophy', 'Philosophy', 'generic', 'published', now()),
('careers/alumni', 'Alumni', 'generic', 'published', now()),
('expertise/ifsc', 'Services in IFSC', 'generic', 'published', now()),
('expertise/uae', 'Services in UAE', 'generic', 'published', now()),
('expertise/our-approach', 'Our Approach', 'generic', 'published', now())
on conflict (slug) do update set
  title = excluded.title,
  template_type = excluded.template_type,
  status = excluded.status,
  published_at = excluded.published_at,
  updated_at = now();

-- 2) Sections refresh for those slugs
with target_pages as (
  select id, slug from pages where slug in (
    'about', 'about/legacy', 'about/locations', 'about/team',
    'careers/philosophy', 'careers/alumni',
    'expertise/ifsc', 'expertise/uae', 'expertise/our-approach'
  )
)
delete from sections s
using target_pages p
where s.page_id = p.id;

-- About / The Firm
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero',
jsonb_build_object('kicker','About','headline','The Firm','subtext','A full-service professional firm with deep-rooted client relationships and practical advisory expertise.'),
0, true
from pages where slug='about';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text',
jsonb_build_object(
  'title','Overview',
  'content','Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.\n\nEstablished in 1936, Sabs Marks JVS PVT LTD serves diverse businesses with emphasis on the MSME sector.\n\nWith a wide network of people and locations, Sabs Marks JVS PVT LTD and its associate firms collaborate across service lines and geographies to deliver legally sound and practical solutions.'
),
1, true
from pages where slug='about';

-- Legacy
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','Legacy','subtext','Our journey has been shaped by multiple professional legacies integrated into one organization.'), 0, true
from pages where slug='about/legacy';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'stats',
jsonb_build_object('items', jsonb_build_array(
  jsonb_build_object('label','1936','value','H.M Contractor & Co.'),
  jsonb_build_object('label','1949','value','R.B. Patel & Co.'),
  jsonb_build_object('label','1951','value','S.S. Nayak & Co.')
)),
1, true
from pages where slug='about/legacy';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text',
jsonb_build_object('title','Milestones','content','2007: Merger of Maniar and Maniar and M.P Sampat & Co.\n2009: Established presence in Vadodara\n2011: Expanded strategic consulting operations globally'),
2, true
from pages where slug='about/legacy';

-- Locations
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','Locations','subtext','Browse our offices and connect with the location most relevant to you.'), 0, true
from pages where slug='about/locations';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text',
jsonb_build_object(
  'title','Locations',
  'content','This route is rendered through a custom frontend page that presents all published office locations and links through to each office detail page.'
),
1, true
from pages where slug='about/locations';

-- Team
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','About','headline','Leadership','subtext','Partner-led teams with deep domain expertise across assurance, tax, and advisory.'), 0, true
from pages where slug='about/team';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'leadership_grid',
jsonb_build_object('members', jsonb_build_array(
  jsonb_build_object('name','CA. Sabu Thomas','role','Founder & Senior Partner','href','/about/team'),
  jsonb_build_object('name','CA. Salim A','role','Senior Partner','href','/about/team'),
  jsonb_build_object('name','CA. Rahul Varma','role','Partner','href','/about/team')
)),
1, true
from pages where slug='about/team';

-- Careers / Philosophy
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Career','headline','Philosophy','subtext','Built on quality, ethics, and integrity.'), 0, true
from pages where slug='careers/philosophy';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text',
jsonb_build_object('title','Our People & Support','content','We believe complex challenges are best solved together. Our people are central to our identity and success.\n\nWe nurture a high-performance culture through continuous training, mentorship, and learning opportunities.'),
1, true
from pages where slug='careers/philosophy';

-- Careers / Alumni
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Career','headline','Alumni','subtext','We would love to stay connected with our alumni network.'), 0, true
from pages where slug='careers/alumni';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'contact_form',
jsonb_build_object('title','Alumni Connect','content','Name, Contact Number, and Email form can be configured via admin workflows.'),
1, true
from pages where slug='careers/alumni';

-- Expertise pages
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Expertise','headline','Services in IFSC (GIFT City)','subtext','Specialized support for IFSC entities and regulatory frameworks.'), 0, true
from pages where slug='expertise/ifsc';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','IFSC Services','content','Content migrated and editable from admin.'), 1, true
from pages where slug='expertise/ifsc';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Expertise','headline','Services in UAE','subtext','Cross-border and regional support across key UAE business requirements.'), 0, true
from pages where slug='expertise/uae';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','UAE Services','content','Content migrated and editable from admin.'), 1, true
from pages where slug='expertise/uae';

insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'hero', jsonb_build_object('kicker','Expertise','headline','Our Approach','subtext','A structured, partner-led method tailored to each client context.'), 0, true
from pages where slug='expertise/our-approach';
insert into sections (page_id, section_type, payload, order_index, is_enabled)
select id, 'rich_text', jsonb_build_object('title','Approach','content','Content migrated and editable from admin.'), 1, true
from pages where slug='expertise/our-approach';

-- Navigation
insert into menu_items (label, href, group_name, display_order, status)
values
('Home', '/', 'Home', 1, 'published'),
('The Firm', '/about', 'About', 1, 'published'),
('Locations', '/about/locations', 'About', 2, 'published'),
('Leadership', '/about/team', 'About', 3, 'published'),
('Services', '/practice-areas', 'Expertise', 1, 'published'),
('Our Approach', '/expertise/our-approach', 'Expertise', 5, 'published'),
('Insights', '/insights', 'Insights', 1, 'published'),
('Philosophy', '/careers/philosophy', 'Career', 1, 'published'),
('Join Us', '/careers', 'Career', 2, 'published'),
('Contact', '/contact', 'Contact', 1, 'published')
on conflict (href) do update set
  label = excluded.label,
  group_name = excluded.group_name,
  display_order = excluded.display_order,
  status = excluded.status,
  updated_at = now();

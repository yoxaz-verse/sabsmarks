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
('careers/alumni', 'Alumni', 'generic', 'published', now())
on conflict (slug) do update set title=excluded.title;

insert into sections (page_id, section_type, payload, order_index)
select id, 'hero', jsonb_build_object(
  'kicker', 'Sabs Marks JVS PVT LTD',
  'headline', 'Where knowledge meets experience',
  'subtext', 'Partner-led assurance, tax, and advisory services for domestic and multinational businesses.'
), 0 from pages where slug='home';

insert into sections (page_id, section_type, payload, order_index)
select id, 'stats', jsonb_build_object('items', jsonb_build_array(
  jsonb_build_object('label','Established','value','1985'),
  jsonb_build_object('label','Partners','value','35+'),
  jsonb_build_object('label','Offices','value','10+')
)), 1 from pages where slug='home';

insert into practice_areas (slug, title, summary, excerpt, body, status, published_at)
values
('tax-regulatory-services', 'Tax & Regulatory Services', 'Comprehensive tax, regulatory and compliance support.', 'Strategic and compliance-focused tax advisory.', 'End-to-end support for direct, indirect and regulatory compliance with practical implementation support.', 'published', now()),
('corporate-finance-advisory-services', 'Corporate Finance Advisory Services', 'Strategic corporate finance and transaction support.', 'Deal-ready finance strategy and execution.', 'Support across M&A readiness, valuation, due diligence and finance transformation.', 'published', now())
on conflict (slug) do update set title=excluded.title;

insert into industry_solutions (slug, title, summary, body, status, published_at)
values ('msme', 'MSME Sector', 'Advisory solutions tailored for MSME businesses.', 'Specialized compliance and growth advisory for MSMEs.', 'published', now())
on conflict (slug) do update set title=excluded.title;

insert into publications (slug, title, summary, excerpt, body, metadata, status, published_at)
values ('finance-bill-highlights-2026', 'Finance Bill Highlights 2026', 'Key updates for CFOs and finance leaders.', 'Tax, compliance and strategic implications from the new bill.', 'Long-form insight content placeholder for migration.', '{"category":"direct-tax","tag":"finance-bill"}', 'published', now())
on conflict (slug) do update set title=excluded.title;

insert into careers (slug, title, summary, body, status, published_at)
values ('senior-audit-associate', 'Senior Audit Associate', 'Join our assurance team.', 'Role details and requirements.', 'published', now())
on conflict (slug) do update set title=excluded.title;

insert into locations (slug, city, office_name, address, phone, email, status)
values
('chennai', 'Chennai', 'Sabs Marks JVS PVT LTD Chennai', 'New No. 57, Kochu Bhavan, Ground Floor, McNicholas Road, Chetpet, Chennai 600 031', '+91 44 3500 3458', 'chennai@sabsmarksjvs.com', 'published'),
('mumbai', 'Mumbai', 'Sabs Marks JVS PVT LTD Mumbai', 'Business district office address placeholder for migration', '+91 22 0000 0000', 'mumbai@sabsmarksjvs.com', 'published')
on conflict (slug) do update set city=excluded.city;

insert into team_members (slug, name, designation, credentials, bio, display_order, featured, status, published_at)
values
('ca-sabu-thomas', 'CA. Sabu Thomas', 'Founder & Senior Partner', 'FCA', 'Founding partner with multi-decade advisory and assurance leadership.', 1, true, 'published', now()),
('ca-salim-a', 'CA. Salim A', 'Senior Partner', 'FCA', 'Senior partner focusing on strategic finance and compliance advisory.', 2, true, 'published', now())
on conflict (slug) do update set name=excluded.name;

insert into insight_categories (slug, title, description, display_order, status)
values
('direct-tax', 'Direct Tax', 'Direct tax analysis and updates.', 1, 'published'),
('audit', 'Audit', 'Audit and assurance insights.', 2, 'published')
on conflict (slug) do update set title=excluded.title;

insert into insight_tags (slug, title, status)
values
('finance-bill', 'Finance Bill', 'published'),
('regulatory', 'Regulatory', 'published')
on conflict (slug) do update set title=excluded.title;

insert into menu_items (label, href, group_name, display_order, status)
values
('Home', '/', 'Home', 1, 'published'),
('The Firm', '/about', 'About', 1, 'published'),
('Leadership', '/about/team', 'About', 3, 'published'),
('Services', '/practice-areas', 'Expertise', 1, 'published'),
('Our Approach', '/expertise/our-approach', 'Expertise', 5, 'published'),
('Insights', '/insights', 'Insights', 1, 'published'),
('Philosophy', '/careers/philosophy', 'Career', 1, 'published'),
('Join Us', '/careers', 'Career', 2, 'published'),
('Contact', '/contact', 'Contact', 1, 'published');

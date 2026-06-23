export type PublishStatus = "draft" | "review" | "published";

export type TemplateType =
  | "home"
  | "about"
  | "practice-area-list"
  | "industry-list"
  | "publication-list"
  | "career-list"
  | "contact-list"
  | "insight-list"
  | "generic";

export type SectionType =
  | "hero"
  | "rich_text"
  | "card_grid"
  | "cta"
  | "stats"
  | "contact_form"
  | "leadership_grid"
  | "office_cards"
  | "category_tabs"
  | "newsletter_cta";

export interface SeoFields {
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
}

export interface PageRecord extends SeoFields {
  id: string;
  slug: string;
  title: string;
  template_type: TemplateType;
  excerpt: string | null;
  featured: boolean;
  published_at: string | null;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface SectionRecord {
  id: string;
  page_id: string;
  section_type: SectionType;
  variant: string;
  payload: Record<string, unknown>;
  order_index: number;
  is_enabled: boolean;
}

export interface EntryRecord extends SeoFields {
  id: string;
  type: "practice_areas" | "industry_solutions" | "publications" | "careers" | "offices";
  slug: string;
  title: string;
  summary: string | null;
  excerpt: string | null;
  body: string | null;
  image_url: string | null;
  metadata: Record<string, unknown>;
  featured: boolean;
  published_at: string | null;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface TeamMember extends SeoFields {
  id: string;
  slug: string;
  name: string;
  designation: string;
  location: string | null;
  linkedin_url: string | null;
  credentials: string | null;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
  featured: boolean;
  excerpt: string | null;
  status: PublishStatus;
  published_at: string | null;
}

export interface SeniorManagementTeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  photo_url: string | null;
  display_order: number;
  status: PublishStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InsightCategory {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  display_order: number;
  status: PublishStatus;
}

export interface InsightTag {
  id: string;
  slug: string;
  title: string;
  status: PublishStatus;
}

export interface Location {
  id: string;
  slug: string;
  city: string;
  office_name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  map_url: string | null;
  contact_person: string | null;
  latitude: number | null;
  longitude: number | null;
  photo_url: string | null;
  featured: boolean;
  status: PublishStatus;
}

export interface MenuItem {
  id: string;
  parent_id: string | null;
  label: string;
  href: string;
  group_name: string;
  display_order: number;
  status: PublishStatus;
}

export interface SiteSettings {
  id: string;
  brand_name: string;
  logo_url: string | null;
  primary_email: string | null;
  primary_phone: string | null;
  head_office_label: string | null;
  head_office_address: string | null;
  social_links: Record<string, string>;
  service_locations: string[];
  footer_text: string | null;
  disclaimers: string | null;
}

export interface AdminUserView {
  email: string | null;
  role: "admin" | "editor" | null;
  isAuthenticated: boolean;
}

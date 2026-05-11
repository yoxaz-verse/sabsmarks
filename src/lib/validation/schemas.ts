import { z } from "zod";

export const pageSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: z.string().min(2),
  template_type: z.string().min(1),
  seo_title: z.string().nullable().optional(),
  seo_description: z.string().nullable().optional(),
  og_image_url: z.string().url().nullable().optional(),
  status: z.enum(["draft", "review", "published"]).default("draft"),
});

export const sectionSchema = z.object({
  id: z.string().optional(),
  page_id: z.string().uuid(),
  section_type: z.string().min(1),
  variant: z.string().default("default"),
  payload: z.record(z.string(), z.unknown()),
  order_index: z.number().int(),
  is_enabled: z.boolean().default(true),
});

export const entrySchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: z.string().min(2),
  summary: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  status: z.enum(["draft", "review", "published"]).default("draft"),
});

export const siteSettingsSchema = z.object({
  brand_name: z.string().min(2),
  logo_url: z.string().url().nullable().optional(),
  primary_email: z.string().email().nullable().optional(),
  primary_phone: z.string().nullable().optional(),
  social_links: z.record(z.string(), z.string()).default({}),
  footer_text: z.string().nullable().optional(),
  disclaimers: z.string().nullable().optional(),
});

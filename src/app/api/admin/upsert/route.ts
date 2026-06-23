import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { normalizeSlug } from "@/lib/slug";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const payloadSchema = z.object({
  table: z.string().min(1),
  payload: z.record(z.string(), z.unknown()),
});

const writeableTables = new Set([
  "pages",
  "practice_areas",
  "industry_solutions",
  "publications",
  "careers",
  "offices",
  "locations",
  "team_members",
  "senior_management_team",
  "insight_categories",
  "insight_tags",
  "menu_items",
  "site_settings",
]);

const tablesWithStatus = new Set([
  "pages",
  "practice_areas",
  "industry_solutions",
  "publications",
  "careers",
  "offices",
  "locations",
  "team_members",
  "senior_management_team",
  "insight_categories",
  "insight_tags",
  "menu_items",
]);

const statusSchema = z.enum(["draft", "review", "published"]);
const contentEntitySchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  title: z.string().min(2),
  summary: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  featured: z.boolean().optional(),
  published_at: z.string().optional().nullable(),
  status: statusSchema,
});
const careersMetadataSchema = z
  .object({
    show_apply_cta: z.boolean().optional(),
    apply_url: z.string().url().optional().nullable(),
  })
  .catchall(z.unknown());

function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [] as string[];
}

function nullableString(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function nullableNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

const tableSchemas: Record<string, z.ZodTypeAny> = {
  pages: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    title: z.string().min(2),
    template_type: z.string().min(1),
    excerpt: z.string().optional().nullable(),
    status: statusSchema,
  }),
  practice_areas: contentEntitySchema,
  industry_solutions: contentEntitySchema,
  publications: contentEntitySchema,
  careers: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    title: z.string().min(2),
    summary: z.string().optional().nullable(),
    excerpt: z.string().optional().nullable(),
    body: z.string().optional().nullable(),
    image_url: z.string().optional().nullable(),
    metadata: careersMetadataSchema.optional(),
    featured: z.boolean().optional(),
    status: statusSchema,
    published_at: z.string().optional().nullable(),
  }),
  offices: contentEntitySchema,
  locations: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    city: z.string().min(2),
    office_name: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    map_url: z.string().optional().nullable(),
    contact_person: z.string().optional().nullable(),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    photo_url: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    status: statusSchema,
  }),
  team_members: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    name: z.string().min(2),
    designation: z.string().min(2),
    location: z.string().optional().nullable(),
    linkedin_url: z.string().url().optional().nullable(),
    credentials: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    photo_url: z.string().url().optional().nullable(),
    display_order: z.number().int().optional(),
    featured: z.boolean().optional(),
    status: statusSchema,
    published_at: z.string().optional().nullable(),
  }),
  senior_management_team: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    name: z.string().min(2),
    designation: z.string().min(2),
    photo_url: z.string().url().optional().nullable(),
    display_order: z.number().int().optional(),
    status: statusSchema,
    published_at: z.string().optional().nullable(),
  }),
  insight_categories: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    title: z.string().min(2),
    description: z.string().optional().nullable(),
    display_order: z.number().int().optional(),
    status: statusSchema,
  }),
  insight_tags: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    title: z.string().min(2),
    status: statusSchema,
  }),
  menu_items: z.object({
    id: z.string().uuid().optional(),
    label: z.string().min(1),
    href: z.string().min(1),
    group_name: z.string().min(1),
    display_order: z.number().int().optional(),
    status: statusSchema,
  }),
  site_settings: z.object({
    id: z.string().uuid().optional(),
    brand_name: z.string().min(1),
    logo_url: z.string().optional().nullable(),
    primary_email: z.string().optional().nullable(),
    primary_phone: z.string().optional().nullable(),
    head_office_label: z.string().optional().nullable(),
    head_office_address: z.string().optional().nullable(),
    social_links: z.record(z.string(), z.string()).default({}),
    service_locations: z.array(z.string()).default([]),
    footer_text: z.string().optional().nullable(),
    disclaimers: z.string().optional().nullable(),
  }),
};

export async function POST(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const parsed = payloadSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const supabase = await createServerSupabaseClient();

  const { table, payload } = parsed.data;
  if (!writeableTables.has(table)) return NextResponse.json({ error: "Table not allowed for writes." }, { status: 400 });

  const normalized: Record<string, unknown> = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  if (tablesWithStatus.has(table)) {
    normalized.status = payload.status === "published" || payload.status === "review" ? payload.status : "draft";
  }

  if (typeof normalized.featured === "string") normalized.featured = normalized.featured === "true";
  if (typeof normalized.display_order === "string") normalized.display_order = Number(normalized.display_order || 0);
  if (typeof normalized.published_at === "string" && normalized.published_at.trim() === "") normalized.published_at = null;
  if (typeof normalized.linkedin_url === "string" && normalized.linkedin_url.trim() === "") normalized.linkedin_url = null;
  if (typeof normalized.photo_url === "string" && normalized.photo_url.trim() === "") normalized.photo_url = null;
  if (typeof normalized.image_url === "string" && normalized.image_url.trim() === "") normalized.image_url = null;
  if (typeof normalized.excerpt === "string" && normalized.excerpt.trim() === "") normalized.excerpt = null;
  if (typeof normalized.summary === "string" && normalized.summary.trim() === "") normalized.summary = null;
  if (typeof normalized.body === "string" && normalized.body.trim() === "") normalized.body = null;
  if (table === "locations") {
    normalized.office_name = nullableString(normalized.office_name);
    normalized.address = nullableString(normalized.address);
    normalized.phone = nullableString(normalized.phone);
    normalized.email = nullableString(normalized.email);
    normalized.map_url = nullableString(normalized.map_url);
    normalized.contact_person = nullableString(normalized.contact_person);
    normalized.latitude = nullableNumber(normalized.latitude);
    normalized.longitude = nullableNumber(normalized.longitude);
    normalized.photo_url = nullableString(normalized.photo_url);
    delete normalized.branches;
    delete normalized.location_picker;
  }
  if (table === "team_members" || table === "senior_management_team") {
    if (typeof normalized.name === "string") normalized.name = normalized.name.trim();
    if (typeof normalized.designation === "string") normalized.designation = normalized.designation.trim();
    normalized.slug = normalizeSlug(
      typeof normalized.slug === "string" && normalized.slug.trim().length > 0
        ? normalized.slug
        : typeof normalized.name === "string"
          ? normalized.name
          : ""
    );
    normalized.location = nullableString(normalized.location);
    normalized.credentials = nullableString(normalized.credentials);
    normalized.bio = nullableString(normalized.bio);
  }
  if (table === "senior_management_team") {
    delete normalized.location;
    delete normalized.linkedin_url;
    delete normalized.credentials;
    delete normalized.bio;
    delete normalized.excerpt;
    delete normalized.featured;
  }
  if (table === "site_settings") {
    normalized.logo_url = nullableString(normalized.logo_url);
    normalized.primary_email = nullableString(normalized.primary_email);
    normalized.primary_phone = nullableString(normalized.primary_phone);
    normalized.head_office_label = nullableString(normalized.head_office_label);
    normalized.head_office_address = nullableString(normalized.head_office_address);
    normalized.footer_text = nullableString(normalized.footer_text);
    normalized.disclaimers = nullableString(normalized.disclaimers);
    normalized.service_locations = normalizeStringArray(normalized.service_locations);

    const socialLinks = isStringRecord(normalized.social_links) ? normalized.social_links : {};
    normalized.social_links = Object.fromEntries(
      Object.entries(socialLinks)
        .map(([key, value]) => [key, value.trim()])
        .filter(([, value]) => value.length > 0)
    );
  }
  if (typeof normalized.created_at === "string") delete normalized.created_at;
  if (typeof normalized.created_by === "string") delete normalized.created_by;

  const schema = tableSchemas[table];
  let sanitized = normalized;
  if (schema) {
    const result = schema.safeParse(normalized);
    if (!result.success) {
      const issue = result.error.issues[0];
      return NextResponse.json({ error: `Validation failed: ${issue.path.join(".") || "payload"} - ${issue.message}` }, { status: 400 });
    }
    sanitized = { ...(result.data as Record<string, unknown>), updated_at: normalized.updated_at };
  }

  if (table === "careers") {
    const metadata = isRecord(sanitized.metadata) ? sanitized.metadata : {};
    if (metadata.show_apply_cta === true && (typeof metadata.apply_url !== "string" || metadata.apply_url.trim().length === 0)) {
      return NextResponse.json({ error: "Validation failed: apply_url - Apply URL is required when the Apply button is enabled." }, { status: 400 });
    }
  }

  let query;
  if (typeof sanitized.id === "string" && sanitized.id.length > 0) {
    const id = sanitized.id;
    const withoutId = { ...sanitized };
    delete withoutId.id;
    query = supabase.from(table).update(withoutId).eq("id", id);
  } else {
    query = supabase.from(table).insert(sanitized);
  }

  const { error } = await query;
  if (error) return NextResponse.json({ error: `DB error: ${error.message}` }, { status: 400 });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { z } from "zod";
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
  "insight_categories",
  "insight_tags",
  "menu_items",
  "site_settings",
]);

const statusSchema = z.enum(["draft", "review", "published"]);
const contentEntitySchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  title: z.string().min(2),
  summary: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  published_at: z.string().optional().nullable(),
  status: statusSchema,
});

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
    body: z.string().optional().nullable(),
    status: statusSchema,
    published_at: z.string().optional().nullable(),
  }),
  offices: contentEntitySchema,
  locations: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    city: z.string().min(2),
    office_name: z.string().min(2),
    address: z.string().min(4),
    phone: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    map_url: z.string().optional().nullable(),
    contact_person: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    status: statusSchema,
  }),
  team_members: z.object({
    id: z.string().uuid().optional(),
    slug: z.string().min(1),
    name: z.string().min(2),
    designation: z.string().min(2),
    credentials: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    display_order: z.number().int().optional(),
    featured: z.boolean().optional(),
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
    footer_text: z.string().optional().nullable(),
    disclaimers: z.string().optional().nullable(),
  }),
};

export async function POST(req: Request) {
  const parsed = payloadSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const supabase = await createServerSupabaseClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { table, payload } = parsed.data;
  if (!writeableTables.has(table)) return NextResponse.json({ error: "Table not allowed for writes." }, { status: 400 });

  const normalized: Record<string, unknown> = {
    ...payload,
    updated_at: new Date().toISOString(),
    status: payload.status === "published" || payload.status === "review" ? payload.status : "draft",
  };

  if (typeof normalized.featured === "string") normalized.featured = normalized.featured === "true";
  if (typeof normalized.display_order === "string") normalized.display_order = Number(normalized.display_order || 0);
  if (typeof normalized.published_at === "string" && normalized.published_at.trim() === "") normalized.published_at = null;
  if (typeof normalized.created_at === "string") delete normalized.created_at;
  if (typeof normalized.created_by === "string") delete normalized.created_by;

  const schema = tableSchemas[table];
  if (schema) {
    const result = schema.safeParse(normalized);
    if (!result.success) {
      const issue = result.error.issues[0];
      return NextResponse.json({ error: `Validation failed: ${issue.path.join(".") || "payload"} - ${issue.message}` }, { status: 400 });
    }
  }

  let query;
  if (typeof normalized.id === "string" && normalized.id.length > 0) {
    const id = normalized.id;
    const withoutId = { ...normalized };
    delete withoutId.id;
    query = supabase.from(table).update(withoutId).eq("id", id);
  } else {
    query = supabase.from(table).insert(normalized);
  }

  const { error } = await query;
  if (error) return NextResponse.json({ error: `DB error: ${error.message}` }, { status: 400 });
  return NextResponse.json({ ok: true });
}

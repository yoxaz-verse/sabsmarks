import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { PageRecord, SectionRecord } from "@/types/cms";

const sectionTypeSchema = z.enum([
  "hero",
  "rich_text",
  "card_grid",
  "cta",
  "stats",
  "contact_form",
  "leadership_grid",
  "office_cards",
  "category_tabs",
  "newsletter_cta",
]);

const pageSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  title: z.string().min(2),
  template_type: z.string().min(1),
  excerpt: z.string().optional().nullable(),
  status: z.enum(["draft", "review", "published"]),
  published_at: z.string().optional().nullable(),
});

const sectionSchema = z.object({
  id: z.string().uuid().optional(),
  section_type: sectionTypeSchema,
  variant: z.string().min(1).default("default"),
  payload: z.record(z.string(), z.unknown()),
  order_index: z.number().int().min(0),
  is_enabled: z.boolean(),
});

const saveSchema = z.object({
  page: pageSchema,
  sections: z.array(sectionSchema),
});

function nullableString(value: unknown) {
  if (typeof value !== "string") return value ?? null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function GET(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const supabase = await createServerSupabaseClient();

  if (!slug) {
    const { data, error } = await supabase
      .from("pages")
      .select("id, slug, title, template_type, excerpt, status, published_at, updated_at")
      .order("updated_at", { ascending: false })
      .returns<Array<Pick<PageRecord, "id" | "slug" | "title" | "template_type" | "excerpt" | "status" | "published_at" | "updated_at">>>();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ pages: data ?? [] });
  }

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single<PageRecord>();
  if (pageError) return NextResponse.json({ error: pageError.message }, { status: 400 });

  const { data: sections, error: sectionsError } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .order("order_index", { ascending: true })
    .returns<SectionRecord[]>();
  if (sectionsError) return NextResponse.json({ error: sectionsError.message }, { status: 400 });

  return NextResponse.json({ page, sections: sections ?? [] });
}

export async function POST(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const parsed = saveSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const supabase = await createServerSupabaseClient();
  const now = new Date().toISOString();
  const incomingPage = parsed.data.page;
  const normalizedPage = {
    ...incomingPage,
    excerpt: nullableString(incomingPage.excerpt),
    published_at: incomingPage.published_at && incomingPage.published_at.trim().length > 0 ? incomingPage.published_at : incomingPage.status === "published" ? now : null,
    updated_at: now,
  };

  if (incomingPage.id) {
    const { error } = await supabase.from("pages").update(normalizedPage).eq("id", incomingPage.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  } else {
    const { error } = await supabase.from("pages").insert(normalizedPage);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: savedPage, error: savedPageError } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", incomingPage.slug)
    .single<PageRecord>();
  if (savedPageError) return NextResponse.json({ error: savedPageError.message }, { status: 400 });

  const { data: existingSections, error: existingSectionsError } = await supabase
    .from("sections")
    .select("id")
    .eq("page_id", savedPage.id)
    .returns<Array<Pick<SectionRecord, "id">>>();
  if (existingSectionsError) return NextResponse.json({ error: existingSectionsError.message }, { status: 400 });

  const incomingSections = parsed.data.sections.map((section, index) => ({
    ...section,
    variant: section.variant.trim() || "default",
    order_index: index,
    page_id: savedPage.id,
    updated_at: now,
  }));

  const keptIds = incomingSections
    .map((section) => section.id)
    .filter((value): value is string => typeof value === "string" && value.length > 0);
  const deleteIds = (existingSections ?? []).map((section) => section.id).filter((id) => !keptIds.includes(id));

  if (deleteIds.length > 0) {
    const { error } = await supabase.from("sections").delete().in("id", deleteIds);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }

  for (const section of incomingSections) {
    if (section.id) {
      const { id, ...payload } = section;
      const { error } = await supabase.from("sections").update(payload).eq("id", id);
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      continue;
    }

    const { error } = await supabase.from("sections").insert(section);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

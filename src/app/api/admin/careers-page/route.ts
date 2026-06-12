import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const pageSlug = "careers";

const formSchema = z.object({
  heroEyebrow: z.string().min(1),
  heroTitle: z.string().min(1),
  heroDescription: z.string().min(1),
  introTitle: z.string().min(1),
  introBody: z.string().min(1),
});

const fallbackContent = {
  heroEyebrow: "Career",
  heroTitle: "Join Us",
  heroDescription: "Join a firm where values matter, people come first, and excellence is a way of life.",
  introTitle: "Build your career with SABS Marks JVS & Co.",
  introBody:
    "At SABS Marks JVS & Co., we believe that professional success is built on a foundation of ethics, integrity, teamwork, and continuous learning. We foster a supportive work environment where every team member is respected, encouraged to grow, and empowered to make a meaningful contribution.\n\nWhether you are a Chartered Accountant, Article Assistant, HR Professional, or a young graduate starting your career, you will find opportunities to learn, develop, and excel alongside experienced professionals.\n\nJoin a firm where values matter, people come first, and excellence is a way of life.",
};

async function requireEditor() {
  const { error } = await requireAdminApiSession();
  const supabase = await createServerSupabaseClient();
  if (error) return { supabase, error };
  return { supabase, error: null };
}

export async function GET() {
  const { supabase, error } = await requireEditor();
  if (error) return error;

  const { data: page, error: pageError } = await supabase.from("pages").select("id").eq("slug", pageSlug).maybeSingle<{ id: string }>();
  if (pageError) return NextResponse.json({ error: pageError.message }, { status: 400 });
  if (!page) return NextResponse.json({ data: fallbackContent });

  const { data: sections, error: sectionError } = await supabase
    .from("sections")
    .select("section_type,payload")
    .eq("page_id", page.id)
    .order("order_index", { ascending: true });

  if (sectionError) return NextResponse.json({ error: sectionError.message }, { status: 400 });

  const hero = sections?.find((section) => section.section_type === "hero")?.payload as Record<string, unknown> | undefined;
  const intro = sections?.find((section) => section.section_type === "rich_text")?.payload as Record<string, unknown> | undefined;

  return NextResponse.json({
    data: {
      heroEyebrow: typeof hero?.kicker === "string" ? hero.kicker : fallbackContent.heroEyebrow,
      heroTitle: typeof hero?.headline === "string" ? hero.headline : fallbackContent.heroTitle,
      heroDescription: typeof hero?.subtext === "string" ? hero.subtext : fallbackContent.heroDescription,
      introTitle: typeof intro?.title === "string" ? intro.title : fallbackContent.introTitle,
      introBody: typeof intro?.content === "string" ? intro.content : fallbackContent.introBody,
    },
  });
}

export async function POST(req: Request) {
  const parsed = formSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload." }, { status: 400 });

  const { supabase, error } = await requireEditor();
  if (error) return error;

  const now = new Date().toISOString();
  const { data: existingPage, error: pageLookupError } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", pageSlug)
    .maybeSingle<{ id: string }>();

  if (pageLookupError) return NextResponse.json({ error: pageLookupError.message }, { status: 400 });

  let pageId = existingPage?.id;

  if (!pageId) {
    const { data: insertedPage, error: insertError } = await supabase
      .from("pages")
      .insert({
        slug: pageSlug,
        title: "Careers",
        template_type: "career-list",
        excerpt: fallbackContent.heroDescription,
        status: "published",
        published_at: now,
        updated_at: now,
      })
      .select("id")
      .single<{ id: string }>();

    if (insertError || !insertedPage) {
      return NextResponse.json({ error: insertError?.message ?? "Failed to create careers page." }, { status: 400 });
    }

    pageId = insertedPage.id;
  } else {
    const { error: updatePageError } = await supabase
      .from("pages")
      .update({
        title: "Careers",
        template_type: "career-list",
        excerpt: fallbackContent.heroDescription,
        updated_at: now,
      })
      .eq("id", pageId);

    if (updatePageError) return NextResponse.json({ error: updatePageError.message }, { status: 400 });
  }

  const { data: existingSections, error: sectionsError } = await supabase.from("sections").select("id,section_type").eq("page_id", pageId);
  if (sectionsError) return NextResponse.json({ error: sectionsError.message }, { status: 400 });

  const heroSection = existingSections?.find((section) => section.section_type === "hero");
  const introSection = existingSections?.find((section) => section.section_type === "rich_text");

  const heroPayload = {
    kicker: parsed.data.heroEyebrow,
    headline: parsed.data.heroTitle,
    subtext: parsed.data.heroDescription,
  };
  const introPayload = {
    title: parsed.data.introTitle,
    content: parsed.data.introBody,
  };

  if (heroSection) {
    const { error: updateHeroError } = await supabase
      .from("sections")
      .update({ payload: heroPayload, order_index: 0, is_enabled: true, updated_at: now })
      .eq("id", heroSection.id);
    if (updateHeroError) return NextResponse.json({ error: updateHeroError.message }, { status: 400 });
  } else {
    const { error: insertHeroError } = await supabase
      .from("sections")
      .insert({ page_id: pageId, section_type: "hero", variant: "default", payload: heroPayload, order_index: 0, is_enabled: true, updated_at: now });
    if (insertHeroError) return NextResponse.json({ error: insertHeroError.message }, { status: 400 });
  }

  if (introSection) {
    const { error: updateIntroError } = await supabase
      .from("sections")
      .update({ payload: introPayload, order_index: 1, is_enabled: true, updated_at: now })
      .eq("id", introSection.id);
    if (updateIntroError) return NextResponse.json({ error: updateIntroError.message }, { status: 400 });
  } else {
    const { error: insertIntroError } = await supabase
      .from("sections")
      .insert({ page_id: pageId, section_type: "rich_text", variant: "default", payload: introPayload, order_index: 1, is_enabled: true, updated_at: now });
    if (insertIntroError) return NextResponse.json({ error: insertIntroError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

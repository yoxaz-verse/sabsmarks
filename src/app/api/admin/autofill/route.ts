import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getRoleForUser } from "@/lib/supabase/roles";

type Row = { id: string; slug: string };

const pagesSeed = [
  { slug: "about", title: "The Firm", template_type: "about" },
  { slug: "about/legacy", title: "Legacy", template_type: "about" },
  { slug: "about/locations", title: "Our Services", template_type: "about" },
  { slug: "about/team", title: "Leadership", template_type: "about" },
  { slug: "careers/philosophy", title: "Philosophy", template_type: "generic" },
  { slug: "careers/alumni", title: "Alumni", template_type: "generic" },
  { slug: "expertise/ifsc", title: "Services in IFSC", template_type: "generic" },
  { slug: "expertise/uae", title: "Services in UAE", template_type: "generic" },
  { slug: "expertise/our-approach", title: "Our Approach", template_type: "generic" },
] as const;

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const roleLookup = await getRoleForUser(auth.user.id);
    if (roleLookup.error) return NextResponse.json({ error: roleLookup.error }, { status: 400 });
    if (roleLookup.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const now = new Date().toISOString();

    const must = async <T>(op: { then: (onfulfilled: (value: { data: T; error: { message: string } | null }) => unknown) => unknown }, step: string) => {
      const { data, error } = (await op) as { data: T; error: { message: string } | null };
      if (error) throw new Error(`${step}: ${error.message}`);
      return data;
    };

    await must(
      supabase.from("site_settings").upsert({
        id: "00000000-0000-0000-0000-000000000001",
        brand_name: "Sabs Marks JVS PVT LTD",
        primary_email: "info@sabsmarksjvs.com",
        primary_phone: "8943115500",
        head_office_label: "H.O",
        head_office_address: "Oonukallel Arcade, M C Road, Ettumanoor, Kottayam, 686632, Kerala",
        social_links: {
          linkedin: "https://www.linkedin.com/company/sabs-marks-jvs-co/",
          instagram: "https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ==",
        },
        service_locations: [
          "Kochi",
          "Angamaly",
          "Thrissur",
          "Bengaluru",
          "Chennai",
          "Tirupati",
          "Gurgaon",
          "Ettumanoor",
          "Kottayam",
          "Chengannur",
          "Hyderabad",
          "Dubai",
        ],
        footer_text: "Sabs Marks JVS PVT LTD. All rights reserved.",
        updated_at: now,
      }),
      "site_settings upsert"
    );

    await must(
      supabase.from("pages").upsert(
        pagesSeed.map((p) => ({ ...p, status: "published", published_at: now, updated_at: now })),
        { onConflict: "slug" }
      ),
      "pages upsert"
    );

    const pages = await must(
      supabase.from("pages").select("id,slug").in("slug", pagesSeed.map((p) => p.slug)).returns<Row[]>(),
      "pages fetch"
    );

    const bySlug = new Map((pages ?? []).map((p) => [p.slug, p.id]));

    if (pages?.length) {
      await must(supabase.from("sections").delete().in("page_id", pages.map((p) => p.id)), "sections delete");
    }

    const sectionRows = [
      ["about", "hero", { kicker: "About", headline: "The Firm", subtext: "A full-service professional firm with deep-rooted client relationships and practical advisory expertise." }, 0],
      ["about", "rich_text", { title: "Overview", content: "Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.\n\nEstablished in 1936, Sabs Marks JVS PVT LTD serves diverse businesses with emphasis on the MSME sector." }, 1],
      ["about/legacy", "hero", { kicker: "About", headline: "Legacy", subtext: "Our journey has been shaped by multiple professional legacies integrated into one organization." }, 0],
      ["about/legacy", "stats", { items: [{ label: "1936", value: "H.M Contractor & Co." }, { label: "1949", value: "R.B. Patel & Co." }, { label: "1951", value: "S.S. Nayak & Co." }] }, 1],
      ["about/locations", "hero", { kicker: "About", headline: "Our Services", subtext: "Structured support across finance, governance, compliance, and execution." }, 0],
      ["about/team", "hero", { kicker: "About", headline: "Leadership", subtext: "Partner-led teams with deep domain expertise." }, 0],
      ["careers/philosophy", "hero", { kicker: "Career", headline: "Philosophy", subtext: "Built on quality, ethics, and integrity." }, 0],
      ["careers/philosophy", "rich_text", { title: "Our People", content: "We provide an extensive range of services and believe difficult problems are solved together. Our success depends upon the quality of our people." }, 1],
      ["careers/philosophy", "rich_text", { title: "Our Support", content: "We balance experience and youth, constantly training teams to deliver excellent outcomes in challenging situations." }, 2],
      ["careers/alumni", "hero", { kicker: "Career", headline: "Alumni", subtext: "We would love to stay connected with our alumni network." }, 0],
      ["careers/alumni", "contact_form", { title: "Alumni Connect", content: "Name, Contact Number, and Email form can be configured via admin workflows." }, 1],
      ["expertise/ifsc", "hero", { kicker: "Expertise", headline: "Services in IFSC (GIFT City)", subtext: "Specialized support for IFSC entities and regulatory frameworks." }, 0],
      ["expertise/uae", "hero", { kicker: "Expertise", headline: "Services in UAE", subtext: "Cross-border and regional support across key UAE requirements." }, 0],
      ["expertise/our-approach", "hero", { kicker: "Expertise", headline: "Our Approach", subtext: "A structured, partner-led method tailored to each client context." }, 0],
    ] as const;

    const sectionsToInsert = sectionRows
      .map(([slug, section_type, payload, order_index]) => {
        const page_id = bySlug.get(slug);
        if (!page_id) return null;
        return { page_id, section_type, payload, order_index, is_enabled: true, variant: "default", updated_at: now };
      })
      .filter((x): x is NonNullable<typeof x> => !!x);

    if (sectionsToInsert.length) {
      await must(supabase.from("sections").insert(sectionsToInsert), "sections insert");
    }

    await must(
      supabase.from("careers").upsert(
        [{ slug: "senior-audit-associate", title: "Senior Audit Associate", summary: "Join our assurance team.", body: "Role details and requirements.", status: "published", published_at: now, updated_at: now }],
        { onConflict: "slug" }
      ),
      "careers upsert"
    );

    await must(
      supabase.from("menu_items").upsert([
        { label: "Home", href: "/", group_name: "Home", display_order: 1, status: "published" },
        { label: "The Firm", href: "/about", group_name: "About", display_order: 1, status: "published" },
        { label: "Leadership", href: "/about/team", group_name: "About", display_order: 3, status: "published" },
        { label: "Services", href: "/practice-areas", group_name: "Expertise", display_order: 1, status: "published" },
        { label: "Our Approach", href: "/expertise/our-approach", group_name: "Expertise", display_order: 4, status: "published" },
        { label: "Insights", href: "/insights", group_name: "Insights", display_order: 1, status: "published" },
        { label: "Philosophy", href: "/careers/philosophy", group_name: "Career", display_order: 1, status: "published" },
        { label: "Join Us", href: "/careers", group_name: "Career", display_order: 2, status: "published" },
        { label: "Contact Us", href: "/contact", group_name: "Contact", display_order: 1, status: "published" },
      ], { onConflict: "href" }),
      "menu_items upsert"
    );

    return NextResponse.json({ ok: true, message: "Auto-fill completed successfully with CMS content in place." });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown autofill failure";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  EntryRecord,
  InsightCategory,
  InsightTag,
  Location,
  MenuItem,
  PageRecord,
  SectionRecord,
  SiteSettings,
  TeamMember,
} from "@/types/cms";

export async function getPageBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data: page } = await supabase.from("pages").select("*").eq("slug", slug).eq("status", "published").single<PageRecord>();
  if (!page) return null;

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .eq("is_enabled", true)
    .order("order_index", { ascending: true })
    .returns<SectionRecord[]>();

  return { page, sections: sections ?? [] };
}

export async function getCollection(type: EntryRecord["type"], limit = 12) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from(type)
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false })
    .limit(limit)
    .returns<EntryRecord[]>();
  return data ?? [];
}

export async function getEntry(type: EntryRecord["type"], slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from(type).select("*").eq("slug", slug).eq("status", "published").single<EntryRecord>();
  return data;
}

export async function getSiteSettings() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single<SiteSettings>();
  return data;
}

export async function getMegaNav() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("menu_items")
    .select("*")
    .eq("status", "published")
    .order("group_name", { ascending: true })
    .order("display_order", { ascending: true })
    .returns<MenuItem[]>();
  const items = (data ?? []) satisfies MenuItem[];
  const groups = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.group_name]) acc[item.group_name] = [];
    acc[item.group_name].push(item);
    return acc;
  }, {});

  return groups;
}

export async function getTeamMembers({ featured }: { featured?: boolean } = {}) {
  const supabase = await createServerSupabaseClient();
  let q = supabase.from("team_members").select("*").eq("status", "published").order("display_order", { ascending: true });
  if (featured !== undefined) q = q.eq("featured", featured);
  const { data } = await q.returns<TeamMember[]>();
  return data ?? [];
}

export async function getTeamMemberBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("team_members").select("*").eq("slug", slug).eq("status", "published").single<TeamMember>();
  return data;
}

export async function getInsights({ category, tag, page = 1 }: { category?: string; tag?: string; page?: number }) {
  const supabase = await createServerSupabaseClient();
  const pageSize = 9;
  let query = supabase
    .from("publications")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (category) query = query.contains("metadata", { category });
  if (tag) query = query.contains("metadata", { tag });

  const { data, count } = await query.returns<EntryRecord[]>();
  return { data: data ?? [], count: count ?? 0, pageSize };
}

export async function getLocationBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("locations").select("*").eq("slug", slug).eq("status", "published").single<Location>();
  return data;
}

export async function getLocations() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("locations").select("*").eq("status", "published").order("city", { ascending: true }).returns<Location[]>();
  return data ?? [];
}

export async function getInsightCategories() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("insight_categories")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .returns<InsightCategory[]>();
  return data ?? [];
}

export async function getInsightTags() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("insight_tags").select("*").eq("status", "published").order("title", { ascending: true }).returns<InsightTag[]>();
  return data ?? [];
}

export async function getPublishedSlugs(type: EntryRecord["type"]) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from(type).select("slug, updated_at").eq("status", "published");
  return (data ?? []) as Array<{ slug: string; updated_at?: string | null }>;
}

export async function getPublishedTeamMemberSlugs() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("team_members").select("slug, updated_at").eq("status", "published");
  return (data ?? []) as Array<{ slug: string; updated_at?: string | null }>;
}

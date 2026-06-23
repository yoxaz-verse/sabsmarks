import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { decodeRouteSegment, normalizeSlug } from "@/lib/slug";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  EntryRecord,
  InsightCategory,
  InsightTag,
  Location,
  MenuItem,
  PageRecord,
  SectionRecord,
  SeniorManagementTeamMember,
  SiteSettings,
  TeamMember,
} from "@/types/cms";

async function queryPublishedTeamMembers(client: SupabaseClient, featured?: boolean) {
  let query = client.from("team_members").select("*").eq("status", "published").order("display_order", { ascending: true });
  if (featured !== undefined) query = query.eq("featured", featured);
  const { data } = await query.returns<TeamMember[]>();
  return data ?? [];
}

async function queryPublishedSeniorManagementTeam(client: SupabaseClient) {
  const { data } = await client
    .from("senior_management_team")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false })
    .returns<SeniorManagementTeamMember[]>();
  return data ?? [];
}

async function findPublishedTeamMember(client: SupabaseClient, entry: string, normalizedEntry: string) {
  const { data: exact } = await client
    .from("team_members")
    .select("*")
    .eq("slug", entry)
    .eq("status", "published")
    .maybeSingle<TeamMember>();
  if (exact) return exact;

  const { data: normalized } = await client
    .from("team_members")
    .select("*")
    .eq("slug", normalizedEntry)
    .eq("status", "published")
    .maybeSingle<TeamMember>();
  if (normalized) return normalized;

  const team = await queryPublishedTeamMembers(client);
  return team.find((member) => normalizeSlug(member.slug) === normalizedEntry || normalizeSlug(member.name) === normalizedEntry) ?? null;
}

async function queryPublishedPageWithSections(client: SupabaseClient, slug: string) {
  const { data: page } = await client.from("pages").select("*").eq("slug", slug).eq("status", "published").maybeSingle<PageRecord>();
  if (!page) return null;

  const { data: sections } = await client
    .from("sections")
    .select("*")
    .eq("page_id", page.id)
    .eq("is_enabled", true)
    .order("order_index", { ascending: true })
    .returns<SectionRecord[]>();

  return { page, sections: sections ?? [] };
}

async function queryPublishedCollection(client: SupabaseClient, type: EntryRecord["type"], limit = 12) {
  const { data } = await client
    .from(type)
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false })
    .limit(limit)
    .returns<EntryRecord[]>();
  return data ?? [];
}

async function queryPublishedEntry(client: SupabaseClient, type: EntryRecord["type"], slug: string) {
  const { data } = await client.from(type).select("*").eq("slug", slug).eq("status", "published").maybeSingle<EntryRecord>();
  return data;
}

async function queryPublishedSlugs(client: SupabaseClient, type: EntryRecord["type"]) {
  const { data } = await client.from(type).select("slug, updated_at").eq("status", "published");
  return (data ?? []) as Array<{ slug: string; updated_at?: string | null }>;
}

async function queryPublishedInsights(
  client: SupabaseClient,
  { category, tag, page = 1 }: { category?: string; tag?: string; page?: number },
) {
  const pageSize = 9;
  let query = client
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

async function queryPublishedLocationBySlug(client: SupabaseClient, slug: string) {
  const entry = decodeRouteSegment(slug);
  const normalizedEntry = normalizeSlug(entry);
  const candidates = Array.from(new Set([slug, entry, normalizedEntry].filter(Boolean)));

  for (const candidate of candidates) {
    const { data } = await client.from("locations").select("*").eq("slug", candidate).eq("status", "published").maybeSingle<Location>();
    if (data) return data;
  }

  const locations = await queryPublishedLocations(client);
  return locations.find((location) => normalizeSlug(location.slug) === normalizedEntry || normalizeSlug(location.city) === normalizedEntry) ?? null;
}

async function queryPublishedLocations(client: SupabaseClient) {
  const { data } = await client.from("locations").select("*").eq("status", "published").order("city", { ascending: true }).returns<Location[]>();
  return data ?? [];
}

export async function getPageBySlug(slug: string) {
  const page = await queryPublishedPageWithSections(await createServerSupabaseClient(), slug);
  if (page?.sections.length) return page;

  try {
    return (await queryPublishedPageWithSections(createAdminSupabaseClient(), slug)) ?? page;
  } catch {
    return page;
  }
}

export async function getCollection(type: EntryRecord["type"], limit = 12) {
  const entries = await queryPublishedCollection(await createServerSupabaseClient(), type, limit);
  if (entries.length > 0) return entries;

  try {
    return await queryPublishedCollection(createAdminSupabaseClient(), type, limit);
  } catch {
    return entries;
  }
}

export async function getEntry(type: EntryRecord["type"], slug: string) {
  const entry = await queryPublishedEntry(await createServerSupabaseClient(), type, slug);
  if (entry) return entry;

  try {
    return await queryPublishedEntry(createAdminSupabaseClient(), type, slug);
  } catch {
    return entry;
  }
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
  const team = await queryPublishedTeamMembers(supabase, featured);
  if (team.length > 0) return team;

  try {
    return await queryPublishedTeamMembers(createAdminSupabaseClient(), featured);
  } catch {
    return team;
  }
}

export async function getSeniorManagementTeam() {
  const supabase = await createServerSupabaseClient();
  const team = await queryPublishedSeniorManagementTeam(supabase);
  if (team.length > 0) return team;

  try {
    return await queryPublishedSeniorManagementTeam(createAdminSupabaseClient());
  } catch {
    return team;
  }
}

export async function getTeamMemberBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const entry = decodeRouteSegment(slug);
  const normalizedEntry = normalizeSlug(entry);

  const member = await findPublishedTeamMember(supabase, entry, normalizedEntry);
  if (member) return member;

  try {
    return await findPublishedTeamMember(createAdminSupabaseClient(), entry, normalizedEntry);
  } catch {
    return null;
  }
}

export async function getInsights({ category, tag, page = 1 }: { category?: string; tag?: string; page?: number }) {
  const insights = await queryPublishedInsights(await createServerSupabaseClient(), { category, tag, page });
  if (insights.data.length > 0) return insights;

  try {
    return await queryPublishedInsights(createAdminSupabaseClient(), { category, tag, page });
  } catch {
    return insights;
  }
}

export async function getLocationBySlug(slug: string) {
  const location = await queryPublishedLocationBySlug(createPublicSupabaseClient(), slug);
  if (location) return location;

  try {
    return await queryPublishedLocationBySlug(createAdminSupabaseClient(), slug);
  } catch {
    return location;
  }
}

export async function getLocations() {
  const locations = await queryPublishedLocations(createPublicSupabaseClient());
  if (locations.length > 0) return locations;

  try {
    return await queryPublishedLocations(createAdminSupabaseClient());
  } catch {
    return locations;
  }
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
  const slugs = await queryPublishedSlugs(await createServerSupabaseClient(), type);
  if (slugs.length > 0) return slugs;

  try {
    return await queryPublishedSlugs(createAdminSupabaseClient(), type);
  } catch {
    return slugs;
  }
}

export async function getPublishedTeamMemberSlugs() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("team_members").select("slug, updated_at").eq("status", "published");
  return (data ?? []) as Array<{ slug: string; updated_at?: string | null }>;
}

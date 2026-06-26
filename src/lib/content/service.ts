import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { decodeRouteSegment, normalizeSlug } from "@/lib/slug";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  EntryRecord,
  AppointmentAvailabilityRule,
  AppointmentBlock,
  AppointmentRequest,
  AppointmentSlot,
  AvailableAppointmentSlot,
  InsightCategory,
  InsightTag,
  Location,
  MenuItem,
  PageRecord,
  PublishStatus,
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
  const { data } = await client.from("locations").select("*").eq("status", "published").order("display_order", { ascending: true }).order("city", { ascending: true }).returns<Location[]>();
  return data ?? [];
}

function timeToMinutes(value: string | null | undefined) {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  return hours * 60 + minutes;
}

function minutesToTime(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

function localDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function overlaps(start: string, end: string, blockStart: string | null, blockEnd: string | null) {
  if (!blockStart || !blockEnd) return true;
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const blockStartMinutes = timeToMinutes(blockStart);
  const blockEndMinutes = timeToMinutes(blockEnd);
  if (startMinutes === null || endMinutes === null || blockStartMinutes === null || blockEndMinutes === null) return false;
  return startMinutes < blockEndMinutes && endMinutes > blockStartMinutes;
}

function partnerLocationKey(partnerId: string, locationId: string, date: string) {
  return `${partnerId}:${locationId}:${date}`;
}

function generatedSlotId(ruleId: string, date: string, start: string, end: string) {
  return `rule:${ruleId}:${date}:${start.slice(0, 5)}:${end.slice(0, 5)}`;
}

async function queryAvailableAppointmentSlots(client: SupabaseClient) {
  const todayDate = new Date();
  const today = localDateKey(todayDate);
  const horizonDays = 90;

  const [{ data: slots }, { data: rules }, { data: blocks }] = await Promise.all([
    client
    .from("appointment_slots")
    .select("*")
    .eq("status", "published")
    .gte("appointment_date", today)
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true })
      .returns<AppointmentSlot[]>(),
    client
      .from("appointment_availability_rules")
      .select("*")
      .eq("status", "published")
      .returns<AppointmentAvailabilityRule[]>(),
    client
      .from("appointment_blocks")
      .select("*")
      .eq("status", "published")
      .gte("block_date", today)
      .returns<AppointmentBlock[]>(),
  ]);

  const publishedSlots = slots ?? [];
  const publishedRules = rules ?? [];
  const publishedBlocks = blocks ?? [];
  if (publishedSlots.length === 0 && publishedRules.length === 0) return [] as AvailableAppointmentSlot[];

  const partnerIds = Array.from(new Set([...publishedSlots.map((slot) => slot.partner_id), ...publishedRules.map((rule) => rule.partner_id)]));
  const locationIds = Array.from(new Set([...publishedSlots.map((slot) => slot.location_id), ...publishedRules.map((rule) => rule.location_id)]));

  const [{ data: requests }, { data: partners }, { data: locations }] = await Promise.all([
    client
      .from("appointment_requests")
      .select("slot_id, partner_id, location_id, appointment_date, start_time, end_time, status")
      .in("status", ["pending", "confirmed"])
      .returns<Pick<AppointmentRequest, "slot_id" | "partner_id" | "location_id" | "appointment_date" | "start_time" | "end_time" | "status">[]>(),
    client.from("team_members").select("id, name, designation, location, status").in("id", partnerIds).eq("status", "published").returns<Array<TeamMember & { status: PublishStatus }>>(),
    client
      .from("locations")
      .select("id, city, office_name, address, map_url, phone, email, status")
      .in("id", locationIds)
      .eq("status", "published")
      .returns<Array<Location & { status: PublishStatus }>>(),
  ]);

  const activeRequests = requests ?? [];
  const blockedSlotIds = new Set(activeRequests.map((request) => request.slot_id).filter(Boolean));
  const partnerMap = new Map((partners ?? []).map((partner) => [partner.id, partner]));
  const locationMap = new Map((locations ?? []).map((location) => [location.id, location]));
  const now = new Date();
  const blocksByDate = new Map<string, AppointmentBlock[]>();
  const generatedRequestKeys = new Set(
    activeRequests
      .filter((request) => request.partner_id && request.location_id && request.appointment_date && request.start_time && request.end_time)
      .map((request) => `${request.partner_id}:${request.location_id}:${request.appointment_date}:${String(request.start_time).slice(0, 5)}:${String(request.end_time).slice(0, 5)}`)
  );

  for (const block of publishedBlocks) {
    const key = partnerLocationKey(block.partner_id, block.location_id, block.block_date);
    const dateBlocks = blocksByDate.get(key) ?? [];
    dateBlocks.push(block);
    blocksByDate.set(key, dateBlocks);
  }

  const manualSlots = publishedSlots
    .filter((slot) => {
      if (blockedSlotIds.has(slot.id)) return false;
      const startsAt = new Date(`${slot.appointment_date}T${slot.start_time}`);
      if (Number.isNaN(startsAt.getTime()) || startsAt <= now) return false;
      const dayBlocks = blocksByDate.get(partnerLocationKey(slot.partner_id, slot.location_id, slot.appointment_date)) ?? [];
      if (dayBlocks.some((block) => overlaps(slot.start_time, slot.end_time, block.start_time, block.end_time))) return false;
      return partnerMap.has(slot.partner_id) && locationMap.has(slot.location_id);
    })
    .map((slot) => {
      const partner = partnerMap.get(slot.partner_id);
      const location = locationMap.get(slot.location_id);

      return {
        id: slot.id,
        source: "manual",
        rule_id: null,
        appointment_date: slot.appointment_date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        notes: slot.notes,
        partner: {
          id: partner?.id ?? "",
          name: partner?.name ?? "",
          designation: partner?.designation ?? "",
          location: partner?.location ?? null,
        },
        location: {
          id: location?.id ?? "",
          city: location?.city ?? "",
          office_name: location?.office_name ?? null,
          address: location?.address ?? null,
          map_url: location?.map_url ?? null,
          phone: location?.phone ?? null,
          email: location?.email ?? null,
        },
      } satisfies AvailableAppointmentSlot;
    });

  const generatedSlots: AvailableAppointmentSlot[] = [];

  for (const rule of publishedRules) {
    const partner = partnerMap.get(rule.partner_id);
    const location = locationMap.get(rule.location_id);
    const startMinutes = timeToMinutes(rule.start_time);
    const endMinutes = timeToMinutes(rule.end_time);
    const duration = rule.slot_duration_minutes || 30;

    if (!partner || !location || startMinutes === null || endMinutes === null || endMinutes <= startMinutes) continue;

    const enabledWeekdays = new Set(rule.enabled_weekdays ?? []);
    for (let dayOffset = 0; dayOffset <= horizonDays; dayOffset += 1) {
      const date = addDays(todayDate, dayOffset);
      if (!enabledWeekdays.has(date.getDay())) continue;

      const appointmentDate = localDateKey(date);
      const dayBlocks = blocksByDate.get(partnerLocationKey(rule.partner_id, rule.location_id, appointmentDate)) ?? [];
      if (dayBlocks.some((block) => !block.start_time && !block.end_time)) continue;

      for (let start = startMinutes; start + duration <= endMinutes; start += duration) {
        const end = start + duration;
        const startTime = minutesToTime(start);
        const endTime = minutesToTime(end);
        const startsAt = new Date(`${appointmentDate}T${startTime}`);
        if (startsAt <= now) continue;
        if (dayBlocks.some((block) => overlaps(startTime, endTime, block.start_time, block.end_time))) continue;
        if (generatedRequestKeys.has(`${rule.partner_id}:${rule.location_id}:${appointmentDate}:${startTime.slice(0, 5)}:${endTime.slice(0, 5)}`)) continue;

        generatedSlots.push({
          id: generatedSlotId(rule.id, appointmentDate, startTime, endTime),
          source: "generated",
          rule_id: rule.id,
          appointment_date: appointmentDate,
          start_time: startTime,
          end_time: endTime,
          notes: null,
          partner: {
            id: partner.id,
            name: partner.name,
            designation: partner.designation,
            location: partner.location,
          },
          location: {
            id: location.id,
            city: location.city,
            office_name: location.office_name,
            address: location.address,
            map_url: location.map_url,
            phone: location.phone,
            email: location.email,
          },
        });
      }
    }
  }

  return [...generatedSlots, ...manualSlots].sort((a, b) => `${a.appointment_date}T${a.start_time}`.localeCompare(`${b.appointment_date}T${b.start_time}`));
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

export async function getAvailableAppointmentSlots() {
  const slots = await queryAvailableAppointmentSlots(createPublicSupabaseClient());
  if (slots.length > 0) return slots;

  try {
    return await queryAvailableAppointmentSlots(createAdminSupabaseClient());
  } catch {
    return slots;
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

import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const allowed = new Set([
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
  "newsletter_subscribers",
  "career_applications",
  "appointment_slots",
  "appointment_requests",
  "appointment_availability_rules",
  "appointment_blocks",
]);

const tableOrderColumn: Record<string, string> = {
  newsletter_subscribers: "created_at",
  career_applications: "created_at",
  appointment_requests: "created_at",
  appointment_slots: "appointment_date",
  appointment_availability_rules: "updated_at",
  appointment_blocks: "block_date",
};

const querySchema = z.object({ table: z.string().min(1) });
const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function locationLabel(location: { city: string; office_name?: string | null }) {
  return location.office_name ? `${location.city} - ${location.office_name}` : location.city;
}

async function labelMaps(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
  records: Array<{ partner_id?: string | null; location_id?: string | null }>
) {
  const partnerIds = Array.from(new Set(records.map((record) => record.partner_id).filter(Boolean)));
  const locationIds = Array.from(new Set(records.map((record) => record.location_id).filter(Boolean)));
  const [{ data: partners }, { data: locations }] = await Promise.all([
    partnerIds.length > 0 ? supabase.from("team_members").select("id, name").in("id", partnerIds) : Promise.resolve({ data: [] }),
    locationIds.length > 0 ? supabase.from("locations").select("id, city, office_name").in("id", locationIds) : Promise.resolve({ data: [] }),
  ]);

  return {
    partnerMap: new Map((partners ?? []).map((partner) => [partner.id, partner.name])),
    locationMap: new Map((locations ?? []).map((location) => [location.id, locationLabel(location)])),
  };
}

export async function GET(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const url = new URL(req.url);
  const parsed = querySchema.safeParse({ table: url.searchParams.get("table") ?? "" });
  if (!parsed.success) return NextResponse.json({ error: "Missing table parameter." }, { status: 400 });

  const table = parsed.data.table;
  if (!allowed.has(table)) return NextResponse.json({ error: "Table not allowed." }, { status: 400 });

  const supabase = await createServerSupabaseClient();

  if (table === "appointment_slots") {
    const { data, error } = await supabase.from(table).select("*").order("appointment_date", { ascending: true }).order("start_time", { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const slots = data ?? [];
    const { partnerMap, locationMap } = await labelMaps(supabase, slots);

    return NextResponse.json({
      data: slots.map((slot) => ({
        ...slot,
        partner_name: partnerMap.get(slot.partner_id) ?? slot.partner_id,
        location_name: locationMap.get(slot.location_id) ?? slot.location_id,
      })),
    });
  }

  if (table === "appointment_availability_rules") {
    const { data, error } = await supabase.from(table).select("*").order("updated_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const rules = data ?? [];
    const { partnerMap, locationMap } = await labelMaps(supabase, rules);

    return NextResponse.json({
      data: rules.map((rule) => ({
        ...rule,
        partner_name: partnerMap.get(rule.partner_id) ?? rule.partner_id,
        location_name: locationMap.get(rule.location_id) ?? rule.location_id,
        weekday_labels: Array.isArray(rule.enabled_weekdays)
          ? rule.enabled_weekdays.map((day: unknown) => weekdayLabels[Number(day)]).filter(Boolean).join(", ")
          : "-",
        hours_label: `${String(rule.start_time).slice(0, 5)}-${String(rule.end_time).slice(0, 5)} / ${rule.slot_duration_minutes} min`,
      })),
    });
  }

  if (table === "appointment_blocks") {
    const { data, error } = await supabase.from(table).select("*").order("block_date", { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const blocks = data ?? [];
    const { partnerMap, locationMap } = await labelMaps(supabase, blocks);

    return NextResponse.json({
      data: blocks.map((block) => ({
        ...block,
        full_day: !block.start_time && !block.end_time,
        partner_name: partnerMap.get(block.partner_id) ?? block.partner_id,
        location_name: locationMap.get(block.location_id) ?? block.location_id,
        block_label: block.start_time && block.end_time ? `${String(block.start_time).slice(0, 5)}-${String(block.end_time).slice(0, 5)}` : "Full day",
      })),
    });
  }

  if (table === "appointment_requests") {
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const requests = data ?? [];
    const slotIds = Array.from(new Set(requests.map((request) => request.slot_id).filter(Boolean)));
    const { data: slots } = slotIds.length > 0 ? await supabase.from("appointment_slots").select("*").in("id", slotIds) : { data: [] };
    const labelRecords = [
      ...requests.map((request) => ({ partner_id: request.partner_id, location_id: request.location_id })),
      ...(slots ?? []).map((slot) => ({ partner_id: slot.partner_id, location_id: slot.location_id })),
    ];
    const { partnerMap, locationMap } = await labelMaps(supabase, labelRecords);

    const slotMap = new Map((slots ?? []).map((slot) => [slot.id, slot]));

    return NextResponse.json({
      data: requests.map((request) => {
        const slot = slotMap.get(request.slot_id);
        const partnerId = slot?.partner_id ?? request.partner_id;
        const locationId = slot?.location_id ?? request.location_id;
        const date = slot?.appointment_date ?? request.appointment_date;
        const start = slot?.start_time ?? request.start_time;
        const end = slot?.end_time ?? request.end_time;
        return {
          ...request,
          partner_name: partnerId ? (partnerMap.get(partnerId) ?? partnerId) : "-",
          location_name: locationId ? (locationMap.get(locationId) ?? locationId) : "-",
          slot_label: date && start && end ? `${date} ${String(start).slice(0, 5)}-${String(end).slice(0, 5)}` : request.slot_id,
        };
      }),
    });
  }

  const orderColumn = tableOrderColumn[table] ?? "updated_at";
  const { data, error } = await supabase.from(table).select("*").order(orderColumn, { ascending: table === "appointment_slots" });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data: data ?? [] });
}

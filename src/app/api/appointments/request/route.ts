import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getAvailableAppointmentSlots } from "@/lib/content/service";
import type { AppointmentRequest, AppointmentSlot, Location, TeamMember } from "@/types/cms";

const requestSchema = z.object({
  slotId: z.string().min(1),
  visitorName: z.string().trim().min(2).max(120),
  visitorEmail: z.string().email().max(180),
  visitorPhone: z.string().trim().min(6).max(40),
  message: z.string().trim().max(1000).optional().nullable(),
});

export async function POST(req: Request) {
  const parsed = requestSchema.safeParse(await req.json());
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: `Validation failed: ${issue.path.join(".") || "request"} - ${issue.message}` }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const availableSlots = await getAvailableAppointmentSlots();
  const selectedSlot = availableSlots.find((slot) => slot.id === parsed.data.slotId);
  if (!selectedSlot) return NextResponse.json({ error: "This appointment slot is no longer available." }, { status: 409 });

  if (selectedSlot.source === "generated") {
    const { error } = await supabase.from("appointment_requests").insert({
      slot_id: null,
      partner_id: selectedSlot.partner.id,
      location_id: selectedSlot.location.id,
      appointment_date: selectedSlot.appointment_date,
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      source: "generated",
      visitor_name: parsed.data.visitorName.trim(),
      visitor_email: parsed.data.visitorEmail.trim().toLowerCase(),
      visitor_phone: parsed.data.visitorPhone.trim(),
      message: parsed.data.message?.trim() || null,
      status: "pending",
      updated_at: new Date().toISOString(),
    });

    if (error) return NextResponse.json({ error: `DB error: ${error.message}` }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  const { data: slot, error: slotError } = await supabase
    .from("appointment_slots")
    .select("*")
    .eq("id", parsed.data.slotId)
    .eq("status", "published")
    .maybeSingle<AppointmentSlot>();

  if (slotError) return NextResponse.json({ error: slotError.message }, { status: 400 });
  if (!slot) return NextResponse.json({ error: "This appointment slot is no longer available." }, { status: 409 });

  const startsAt = new Date(`${slot.appointment_date}T${slot.start_time}`);
  if (Number.isNaN(startsAt.getTime()) || startsAt <= new Date()) {
    return NextResponse.json({ error: "This appointment slot is no longer available." }, { status: 409 });
  }

  const [{ data: partner }, { data: location }, { data: existing }] = await Promise.all([
    supabase.from("team_members").select("id, status").eq("id", slot.partner_id).eq("status", "published").maybeSingle<Pick<TeamMember, "id" | "status">>(),
    supabase.from("locations").select("id, status").eq("id", slot.location_id).eq("status", "published").maybeSingle<Pick<Location, "id" | "status">>(),
    supabase
      .from("appointment_requests")
      .select("id, status")
      .eq("slot_id", slot.id)
      .in("status", ["pending", "confirmed"])
      .limit(1)
      .returns<Pick<AppointmentRequest, "id" | "status">[]>(),
  ]);

  if (!partner || !location || (existing ?? []).length > 0) {
    return NextResponse.json({ error: "This appointment slot is no longer available." }, { status: 409 });
  }

  const { error } = await supabase.from("appointment_requests").insert({
    slot_id: slot.id,
    partner_id: slot.partner_id,
    location_id: slot.location_id,
    appointment_date: slot.appointment_date,
    start_time: slot.start_time,
    end_time: slot.end_time,
    source: "manual",
    visitor_name: parsed.data.visitorName.trim(),
    visitor_email: parsed.data.visitorEmail.trim().toLowerCase(),
    visitor_phone: parsed.data.visitorPhone.trim(),
    message: parsed.data.message?.trim() || null,
    status: "pending",
    updated_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: `DB error: ${error.message}` }, { status: 400 });
  return NextResponse.json({ ok: true });
}

"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, MapPin, Send } from "lucide-react";
import type { AvailableAppointmentSlot, TeamMember } from "@/types/cms";

type AppointmentBookingProps = {
  slots: AvailableAppointmentSlot[];
  partners: TeamMember[];
};

type PartnerLocationGroup = {
  key: string;
  partner: AvailableAppointmentSlot["partner"];
  location: AvailableAppointmentSlot["location"] | null;
  slots: AvailableAppointmentSlot[];
  fallbackLocationLabel?: string | null;
};

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const emptySlots: AvailableAppointmentSlot[] = [];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(date);
}

function timeLabel(slot: AvailableAppointmentSlot) {
  return `${slot.start_time.slice(0, 5)}-${slot.end_time.slice(0, 5)}`;
}

function dayLabel(dateText: string) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateText;
  return new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

function buildCalendarDays(monthDate: Date) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function sortSlots(slots: AvailableAppointmentSlot[]) {
  return [...slots].sort((a, b) => `${a.appointment_date}T${a.start_time}`.localeCompare(`${b.appointment_date}T${b.start_time}`));
}

function groupSlots(slots: AvailableAppointmentSlot[]) {
  const groups = new Map<string, PartnerLocationGroup>();

  for (const slot of sortSlots(slots)) {
    const key = `${slot.partner.id}:${slot.location.id}`;
    const existing = groups.get(key);

    if (existing) {
      existing.slots.push(slot);
    } else {
      groups.set(key, {
        key,
        partner: slot.partner,
        location: slot.location,
        slots: [slot],
      });
    }
  }

  return Array.from(groups.values());
}

function fallbackPartnerGroups(partners: TeamMember[], existingGroups: PartnerLocationGroup[]) {
  const partnerIdsWithSlots = new Set(existingGroups.map((group) => group.partner.id));

  return partners
    .filter((partner) => !partnerIdsWithSlots.has(partner.id))
    .map((partner) => ({
      key: `${partner.id}:fallback`,
      partner: {
        id: partner.id,
        name: partner.name,
        designation: partner.designation,
        location: partner.location,
      },
      location: null,
      fallbackLocationLabel: partner.location,
      slots: [],
    } satisfies PartnerLocationGroup));
}

export function AppointmentBooking({ slots, partners }: AppointmentBookingProps) {
  const [requestedSlotIds, setRequestedSlotIds] = useState<Set<string>>(() => new Set());
  const availableSlots = useMemo(() => slots.filter((slot) => !requestedSlotIds.has(slot.id)), [requestedSlotIds, slots]);
  const groups = useMemo(() => {
    const slotGroups = groupSlots(availableSlots);
    return [...slotGroups, ...fallbackPartnerGroups(partners, slotGroups)];
  }, [availableSlots, partners]);
  const [selectedGroupKey, setSelectedGroupKey] = useState(groups[0]?.key ?? "");
  const selectedGroup = groups.find((group) => group.key === selectedGroupKey) ?? groups[0] ?? null;
  const selectedGroupSlots = useMemo(() => selectedGroup?.slots ?? emptySlots, [selectedGroup]);
  const [selectedDate, setSelectedDate] = useState(selectedGroupSlots[0]?.appointment_date ?? "");
  const selectedDateSlots = useMemo(
    () => selectedGroupSlots.filter((slot) => slot.appointment_date === selectedDate),
    [selectedDate, selectedGroupSlots]
  );
  const [slotId, setSlotId] = useState(selectedDateSlots[0]?.id ?? "");
  const selectedSlot = selectedDateSlots.find((slot) => slot.id === slotId) ?? selectedDateSlots[0] ?? null;
  const firstSlotDate = selectedGroupSlots[0]?.appointment_date ?? dateKey(new Date());
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(`${firstSlotDate}T00:00:00`));
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const slotsByDate = useMemo(() => {
    const map = new Map<string, AvailableAppointmentSlot[]>();
    for (const slot of selectedGroupSlots) {
      const dateSlots = map.get(slot.appointment_date) ?? [];
      dateSlots.push(slot);
      map.set(slot.appointment_date, sortSlots(dateSlots));
    }
    return map;
  }, [selectedGroupSlots]);

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);

  function selectGroup(group: PartnerLocationGroup) {
    const firstSlot = group.slots[0];
    setSelectedGroupKey(group.key);
    setSelectedDate(firstSlot?.appointment_date ?? "");
    setSlotId(firstSlot?.id ?? "");
    if (firstSlot) setVisibleMonth(new Date(`${firstSlot.appointment_date}T00:00:00`));
    setStatus(null);
  }

  function selectDate(nextDate: string) {
    const dateSlots = slotsByDate.get(nextDate) ?? [];
    if (dateSlots.length === 0) return;
    setSelectedDate(nextDate);
    setSlotId(dateSlots[0]?.id ?? "");
    setStatus(null);
  }

  function moveMonth(direction: -1 | 1) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) return;

    setStatus(null);
    setSubmitting(true);

    const res = await fetch("/api/appointments/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slotId: selectedSlot.id,
        visitorName: form.name,
        visitorEmail: form.email,
        visitorPhone: form.phone,
        message: form.message,
      }),
    });
    const json = (await res.json()) as { error?: string };

    if (!res.ok) {
      setStatus({ type: "error", text: json.error ?? "We could not submit this appointment request." });
      setSubmitting(false);
      return;
    }

    const remainingSlots = availableSlots.filter((slot) => slot.id !== selectedSlot.id);
    const nextGroup = groupSlots(remainingSlots)[0] ?? null;
    const nextSlot = nextGroup?.slots[0] ?? null;

    setStatus({ type: "success", text: "Appointment request received. Our team will confirm the slot manually." });
    setForm({ name: "", email: "", phone: "", message: "" });
    setRequestedSlotIds((prev) => new Set(prev).add(selectedSlot.id));
    setSelectedGroupKey(nextGroup?.key ?? "");
    setSelectedDate(nextSlot?.appointment_date ?? "");
    setSlotId(nextSlot?.id ?? "");
    if (nextSlot) setVisibleMonth(new Date(`${nextSlot.appointment_date}T00:00:00`));
    setSubmitting(false);
  }

  return (
    <div className="rounded-[2rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_62%,transparent)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Book an appointment</p>
          <h3 className="mt-3 text-2xl font-bold text-ink">Choose a partner and reserve an available calendar slot.</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <CalendarDays className="h-5 w-5" />
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] p-5 text-sm leading-7 text-muted">
          Partner profiles are not published yet. Please call or email the head office and the team will help schedule a suitable time.
        </div>
      ) : (
        <form onSubmit={submitRequest} className="mt-6 grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Partner & location</p>
              <div className="appointment-partner-scroll mt-3 grid max-h-[520px] gap-3 overflow-y-auto pr-2 lg:max-h-[620px]">
                {groups.map((group) => {
                  const isSelected = group.key === selectedGroup?.key;
                  const firstSlot = group.slots[0];
                  return (
                    <button
                      key={group.key}
                      type="button"
                      onClick={() => selectGroup(group)}
                      className={`w-full rounded-[1.25rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-accent/50 bg-accent/10 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                          : "border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-ink">{group.partner.name}</p>
                          <p className="mt-1 truncate text-sm text-muted">{group.partner.designation}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-accent/12 px-3 py-1 text-xs font-bold text-accent">
                          {group.slots.length} slot{group.slots.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <div className="mt-3 flex items-start gap-2 text-sm text-muted">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">
                            {group.location ? (group.location.office_name ?? group.location.city) : (group.fallbackLocationLabel ?? "Location to be assigned")}
                          </p>
                          <p className="mt-1 truncate">
                            {group.location?.city ?? "No slots published"}
                            {firstSlot ? ` - next ${dayLabel(firstSlot.appointment_date)}` : ""}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedGroup ? (
              <div className="rounded-[1.25rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] p-4 text-sm text-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-semibold text-ink">
                      {selectedGroup.location ? (selectedGroup.location.office_name ?? selectedGroup.location.city) : (selectedGroup.fallbackLocationLabel ?? "Location to be assigned")}
                    </p>
                    {selectedGroup.location?.address ? <p className="mt-1 leading-6">{selectedGroup.location.address}</p> : null}
                    {!selectedGroup.location ? <p className="mt-1 leading-6">No appointment slots have been published for this partner yet.</p> : null}
                    {selectedGroup.location?.map_url ? (
                      <a href={selectedGroup.location.map_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.14em] text-accent">
                        Open map
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => moveMonth(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted transition hover:border-accent/40 hover:text-accent" aria-label="Previous month">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-base font-bold text-ink">{monthLabel(visibleMonth)}</p>
                <button type="button" onClick={() => moveMonth(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted transition hover:border-accent/40 hover:text-accent" aria-label="Next month">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                {dayLabels.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {calendarDays.map((date) => {
                  const key = dateKey(date);
                  const dateSlots = slotsByDate.get(key) ?? [];
                  const inMonth = date.getMonth() === visibleMonth.getMonth();
                  const active = dateSlots.length > 0;
                  const selected = key === selectedDate;

                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!active}
                      onClick={() => selectDate(key)}
                      className={`aspect-square min-h-10 rounded-2xl border text-sm font-semibold transition ${
                        selected
                          ? "border-accent bg-accent text-white shadow-[0_12px_28px_rgba(0,117,201,0.24)]"
                          : active
                            ? "border-accent/20 bg-accent/10 text-ink hover:border-accent/50 hover:bg-accent/16"
                            : "border-transparent bg-transparent text-muted/35"
                      } ${inMonth ? "" : "opacity-40"} disabled:cursor-not-allowed`}
                    >
                      <span>{date.getDate()}</span>
                      {active ? <span className={`mx-auto mt-1 block h-1 w-1 rounded-full ${selected ? "bg-white" : "bg-accent"}`} /> : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_65%,transparent)] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  {selectedDate ? dayLabel(selectedDate) : "Select an available date"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedDateSlots.length > 0 ? (
                    selectedDateSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSlotId(slot.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          slot.id === selectedSlot?.id
                            ? "border-accent bg-accent text-white"
                            : "border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_75%,transparent)] text-ink hover:border-accent/40"
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                        {timeLabel(slot)}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-muted">No slots are open on this date.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Name</span>
                  <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required className="mt-2 w-full rounded-2xl border border-[var(--glass-border)] bg-white/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent dark:bg-white/6" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Email</span>
                  <input type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required className="mt-2 w-full rounded-2xl border border-[var(--glass-border)] bg-white/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent dark:bg-white/6" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Phone</span>
                  <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} required className="mt-2 w-full rounded-2xl border border-[var(--glass-border)] bg-white/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent dark:bg-white/6" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Message</span>
                  <textarea value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} rows={3} className="mt-2 w-full rounded-2xl border border-[var(--glass-border)] bg-white/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-accent dark:bg-white/6" />
                </label>
              </div>

              {status ? (
                <p className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm leading-6 ${status.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                  {status.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <Clock className="mt-0.5 h-4 w-4 shrink-0" />}
                  {status.text}
                </p>
              ) : null}

              <button disabled={submitting || !selectedSlot} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-md transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? <Clock className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {submitting ? "Sending request" : "Request appointment"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

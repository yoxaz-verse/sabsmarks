"use client";

import Image from "next/image";
import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { locationRoleLabel } from "@/lib/location-labels";
import { getEmbeddableMapUrl, getPublicMapUrl } from "@/lib/map-utils";
import type { Location, LocationBranch } from "@/types/cms";

type PinItem = {
  key: string;
  label: string;
  city: string;
  type: "office" | "branch";
  latitude: number;
  longitude: number;
  location: Location;
  branch?: LocationBranch;
};

const INDIA_BOUNDS = {
  minLat: 6,
  maxLat: 37.5,
  minLng: 68,
  maxLng: 97.5,
};

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function officeName(location: Location) {
  return location.office_name?.trim() || null;
}

function locationName(location: Location) {
  return location.city;
}

function branchName(branch: LocationBranch, location: Location) {
  return branch.name?.trim() || location.city;
}

function pinPosition(pin: PinItem) {
  const x = ((pin.longitude - INDIA_BOUNDS.minLng) / (INDIA_BOUNDS.maxLng - INDIA_BOUNDS.minLng)) * 100;
  const y = ((INDIA_BOUNDS.maxLat - pin.latitude) / (INDIA_BOUNDS.maxLat - INDIA_BOUNDS.minLat)) * 100;

  return {
    left: `${Math.min(96, Math.max(4, x))}%`,
    top: `${Math.min(96, Math.max(4, y))}%`,
  };
}

function ContactRow({
  href,
  icon,
  label,
  value,
}: {
  href?: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-[1.2rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] px-4 py-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{label}</p>
        <p className="mt-2 break-words text-sm leading-6 text-ink">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block transition hover:-translate-y-0.5 hover:text-accent">
      {content}
    </a>
  );
}

function LocationPhoto({ src, alt }: { src: string | null | undefined; alt: string }) {
  if (!src) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
      <Image src={src} alt={alt} width={1200} height={640} unoptimized className="h-64 w-full object-cover" />
    </div>
  );
}

function BranchCard({
  branch,
  location,
  active,
  onSelect,
}: {
  branch: LocationBranch;
  location: Location;
  active: boolean;
  onSelect: () => void;
}) {
  const publicMapUrl = getPublicMapUrl(branch.map_url);
  const title = branchName(branch, location);

  return (
    <article className={`rounded-[1.35rem] border p-4 transition ${active ? "border-accent bg-accent/8" : "border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_84%,transparent)]"}`}>
      <button type="button" onClick={onSelect} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">Branch</p>
            <h4 className="mt-2 text-base font-bold text-ink">{title}</h4>
          </div>
          <MapPin className={`h-5 w-5 shrink-0 ${active ? "text-accent" : "text-muted"}`} />
        </div>
        {branch.photo_url ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--glass-border)]">
            <Image src={branch.photo_url} alt={`${title} branch`} width={800} height={420} unoptimized className="h-36 w-full object-cover" />
          </div>
        ) : null}
        {branch.address ? <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">{branch.address}</p> : null}
      </button>
      <div className="mt-4 grid gap-2 text-sm text-muted">
        {branch.phone ? (
          <a href={`tel:${sanitizePhone(branch.phone)}`} className="inline-flex items-center gap-2 transition hover:text-accent">
            <Phone className="h-4 w-4" />
            {branch.phone}
          </a>
        ) : null}
        {branch.email ? (
          <a href={`mailto:${branch.email}`} className="inline-flex min-w-0 items-center gap-2 transition hover:text-accent">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{branch.email}</span>
          </a>
        ) : null}
        {branch.contact_person ? (
          <p className="inline-flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {branch.contact_person}
          </p>
        ) : null}
        {publicMapUrl ? (
          <a href={publicMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-accent transition hover:text-ink">
            <ExternalLink className="h-4 w-4" />
            Open map
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function LocationsBrowser({ locations }: { locations: Location[] }) {
  const pins = useMemo(
    () =>
      locations.flatMap((location) => {
        const items: PinItem[] = [];
        const officeLatitude = location.latitude;
        const officeLongitude = location.longitude;
        if (typeof officeLatitude === "number" && Number.isFinite(officeLatitude) && typeof officeLongitude === "number" && Number.isFinite(officeLongitude)) {
          items.push({
            key: `office:${location.slug}`,
            label: locationName(location),
            city: location.city,
            type: "office",
            latitude: officeLatitude,
            longitude: officeLongitude,
            location,
          });
        }

        for (const branch of location.branches ?? []) {
          const branchLatitude = branch.latitude;
          const branchLongitude = branch.longitude;
          if (typeof branchLatitude === "number" && Number.isFinite(branchLatitude) && typeof branchLongitude === "number" && Number.isFinite(branchLongitude)) {
            items.push({
              key: `branch:${location.slug}:${branch.id}`,
              label: branchName(branch, location),
              city: location.city,
              type: "branch",
              latitude: branchLatitude,
              longitude: branchLongitude,
              location,
              branch,
            });
          }
        }

        return items;
      }),
    [locations]
  );

  const [activeKey, setActiveKey] = useState(pins[0]?.key ?? `office:${locations[0]?.slug ?? ""}`);
  const activePin = pins.find((pin) => pin.key === activeKey) ?? null;
  const activeLocation = activePin?.location ?? locations.find((location) => `office:${location.slug}` === activeKey) ?? locations[0] ?? null;
  const activeBranch = activePin?.branch ?? null;

  if (!activeLocation) return null;

  const activeTitle = activeBranch ? branchName(activeBranch, activeLocation) : locationName(activeLocation);
  const activeOfficeName = activeBranch ? null : officeName(activeLocation);
  const activeAddress = activeBranch?.address ?? activeLocation.address;
  const activePhone = activeBranch?.phone ?? activeLocation.phone;
  const activeEmail = activeBranch?.email ?? activeLocation.email;
  const activeContact = activeBranch?.contact_person ?? activeLocation.contact_person;
  const activePhoto = activeBranch?.photo_url ?? activeLocation.photo_url;
  const activeMapUrl = activeBranch?.map_url ?? activeLocation.map_url;
  const publicMapUrl = getPublicMapUrl(activeMapUrl);
  const embeddedMapUrl = getEmbeddableMapUrl(activeMapUrl);
  const hasMap = Boolean(publicMapUrl || embeddedMapUrl);
  const branches = activeLocation.branches ?? [];

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
      <section className="rounded-[2rem] bg-[linear-gradient(135deg,#06121d_0%,#064b77_58%,#063c24_100%)] p-5 text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--accent-secondary)_28%,white)]">Branch Locations</p>
            <h2 className="mt-3 text-2xl font-bold">Switch branch details without leaving the page.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/90">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {locations.map((location) => {
            const locationKey = `office:${location.slug}`;
            const isActive = location.slug === activeLocation.slug && !activeBranch;

            return (
              <button
                key={location.id}
                type="button"
                onClick={() => setActiveKey(locationKey)}
                className={`flex w-full items-center justify-between gap-4 rounded-[1.35rem] border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-accent-secondary bg-accent-secondary text-white shadow-[0_20px_40px_color-mix(in_srgb,var(--accent-secondary)_24%,transparent)]"
                    : "border-white/10 bg-white/6 text-white hover:border-white/18 hover:bg-white/9"
                }`}
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">{locationRoleLabel(location)}</p>
                  <p className="mt-2 text-lg font-semibold leading-tight">{locationName(location)}</p>
                  {officeName(location) ? <p className="mt-1 text-sm text-white/72">{officeName(location)}</p> : null}
                </div>
                <MapPin className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-white/82"}`} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="site-card rounded-[2rem] p-6 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
          <div>
            <LocationPhoto src={activePhoto} alt={`${activeTitle} branch location`} />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{activeBranch ? "Branch" : locationRoleLabel(activeLocation)}</p>
            <h3 className="mt-4 text-3xl font-bold text-ink md:text-[2.35rem]">{activeTitle}</h3>
            {activeOfficeName ? <p className="mt-2 text-base font-medium text-muted">{activeOfficeName}</p> : null}
            {activeAddress ? <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-muted">{activeAddress}</p> : null}

            <div className="mt-6 grid gap-3">
              {activePhone ? (
                <ContactRow href={`tel:${activePhone.replace(/[^\d+]/g, "")}`} icon={<Phone className="h-4 w-4" />} label="Phone" value={activePhone} />
              ) : null}
              {activeEmail ? <ContactRow href={`mailto:${activeEmail}`} icon={<Mail className="h-4 w-4" />} label="Email" value={activeEmail} /> : null}
              {activeContact ? <ContactRow icon={<Building2 className="h-4 w-4" />} label="Contact Person" value={activeContact} /> : null}
            </div>

            {branches.length > 0 ? (
              <div className="mt-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Branches</p>
                <div className="mt-3 grid gap-3">
                  {branches.map((branch) => {
                    const key = `branch:${activeLocation.slug}:${branch.id}`;
                    return <BranchCard key={branch.id} branch={branch} location={activeLocation} active={activeKey === key} onSelect={() => setActiveKey(key)} />;
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact/${activeLocation.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_color-mix(in_srgb,var(--accent)_24%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
              >
                View branch details
                <ExternalLink className="h-4 w-4" />
              </Link>
              {publicMapUrl ? (
                <a
                  href={publicMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-5 py-3 text-sm font-semibold text-accent transition hover:border-accent/30 hover:bg-white/70"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Maps
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--glass-border)] px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">India Map</p>
                <p className="mt-1 text-sm font-medium text-ink">{pins.length ? "Select a branch pin" : "Add coordinates in the CMS"}</p>
              </div>
              {publicMapUrl ? (
                <a
                  href={publicMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/30"
                >
                  Open map
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className="relative h-[22rem] overflow-hidden bg-[linear-gradient(145deg,#eef7f4_0%,#dfeefa_52%,#f5f0e6_100%)]">
              <div className="absolute inset-[9%] rounded-[42%_58%_45%_55%/56%_38%_62%_44%] border border-accent/20 bg-white/52 shadow-inner" />
              <div className="absolute left-[40%] top-[15%] h-[68%] w-[34%] rotate-[-8deg] rounded-[48%_44%_58%_40%/30%_52%_48%_68%] bg-[color-mix(in_srgb,var(--accent)_12%,white)]" />
              <div className="absolute left-[30%] top-[20%] h-[52%] w-[30%] rotate-[10deg] rounded-[55%_35%_42%_58%/45%_38%_62%_48%] bg-[color-mix(in_srgb,var(--accent-secondary)_16%,white)]" />
              {pins.map((pin) => {
                const position = pinPosition(pin);
                const isActive = pin.key === activeKey;
                return (
                  <button
                    key={pin.key}
                    type="button"
                    onClick={() => setActiveKey(pin.key)}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-1.5 shadow-lg transition hover:scale-110 ${
                      isActive ? "border-white bg-accent text-white" : pin.type === "branch" ? "border-white bg-accent-secondary text-white" : "border-white bg-accent text-white"
                    }`}
                    style={position}
                    aria-label={`Show ${pin.label}`}
                    title={`${pin.label}, ${pin.city}`}
                  >
                    <MapPin className="h-4 w-4" />
                  </button>
                );
              })}
              {pins.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                  <p className="max-w-sm text-sm leading-7 text-muted">Save latitude and longitude for branch locations in the CMS to show clickable pins here.</p>
                </div>
              ) : null}
            </div>

            {hasMap ? (
              embeddedMapUrl ? (
                <iframe
                  title={`${activeTitle} map`}
                  src={embeddedMapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[18rem] w-full border-0 bg-[color-mix(in_srgb,var(--surface-raised)_84%,white)]"
                />
              ) : (
                <div className="flex h-[18rem] flex-col items-center justify-center gap-4 px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-ink">Open this location in your map app</p>
                    <p className="mt-2 text-sm leading-7 text-muted">This map link cannot be embedded here, but the location is ready to open in a new tab.</p>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

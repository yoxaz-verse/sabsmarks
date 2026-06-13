"use client";

import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { getEmbeddableMapUrl, getPublicMapUrl } from "@/lib/map-utils";
import type { Location, LocationBranch } from "@/types/cms";

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
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

function BranchCard({ branch }: { branch: LocationBranch }) {
  const publicMapUrl = getPublicMapUrl(branch.map_url);

  return (
    <article className="rounded-[1.35rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_84%,transparent)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">Sub Branch</p>
          <h4 className="mt-2 text-base font-bold text-ink">{branch.name}</h4>
        </div>
        {publicMapUrl ? (
          <a href={publicMapUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--glass-border)] px-3 py-1.5 text-xs font-semibold text-accent">
            Map
          </a>
        ) : null}
      </div>
      {branch.address ? <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">{branch.address}</p> : null}
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
      </div>
    </article>
  );
}

export function LocationsBrowser({ locations }: { locations: Location[] }) {
  const [activeSlug, setActiveSlug] = useState(locations[0]?.slug ?? null);
  const activeLocation = locations.find((location) => location.slug === activeSlug) ?? locations[0] ?? null;

  if (!activeLocation) return null;

  const publicMapUrl = getPublicMapUrl(activeLocation.map_url);
  const embeddedMapUrl = getEmbeddableMapUrl(activeLocation.map_url);
  const hasMap = Boolean(publicMapUrl || embeddedMapUrl);
  const branches = activeLocation.branches ?? [];

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
      <section className="rounded-[2rem] bg-[linear-gradient(135deg,#06121d_0%,#064b77_58%,#063c24_100%)] p-5 text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--accent-secondary)_28%,white)]">Office Directory</p>
            <h2 className="mt-3 text-2xl font-bold">Switch offices without leaving the page.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/90">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {locations.map((location) => {
            const isActive = location.slug === activeLocation.slug;

            return (
              <button
                key={location.id}
                type="button"
                onClick={() => setActiveSlug(location.slug)}
                className={`flex w-full items-center justify-between gap-4 rounded-[1.35rem] border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-accent-secondary bg-accent-secondary text-white shadow-[0_20px_40px_color-mix(in_srgb,var(--accent-secondary)_24%,transparent)]"
                    : "border-white/10 bg-white/6 text-white hover:border-white/18 hover:bg-white/9"
                }`}
              >
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${isActive ? "text-white/75" : "text-white/75"}`}>
                    {location.city}
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-tight">{location.office_name}</p>
                </div>
                <MapPin className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-white/82"}`} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="site-card rounded-[2rem] p-6 md:p-7">
        <div className={`grid gap-6 ${hasMap ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start" : ""}`}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{activeLocation.city}</p>
            <h3 className="mt-4 text-3xl font-bold text-ink md:text-[2.35rem]">{activeLocation.office_name}</h3>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-muted">{activeLocation.address}</p>

            <div className="mt-6 grid gap-3">
              {activeLocation.phone ? (
                <ContactRow
                  href={`tel:${activeLocation.phone.replace(/[^\d+]/g, "")}`}
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={activeLocation.phone}
                />
              ) : null}
              {activeLocation.email ? (
                <ContactRow
                  href={`mailto:${activeLocation.email}`}
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={activeLocation.email}
                />
              ) : null}
              {activeLocation.contact_person ? (
                <ContactRow
                  icon={<Building2 className="h-4 w-4" />}
                  label="Contact Person"
                  value={activeLocation.contact_person}
                />
              ) : null}
            </div>

            {branches.length > 0 ? (
              <div className="mt-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Sub Branches</p>
                <div className="mt-3 grid gap-3">
                  {branches.map((branch) => (
                    <BranchCard key={branch.id} branch={branch} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact/${activeLocation.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_color-mix(in_srgb,var(--accent)_24%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
              >
                View office details
                <ExternalLink className="h-4 w-4" />
              </Link>
              {hasMap && publicMapUrl ? (
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

          {hasMap ? (
            <div className="overflow-hidden rounded-[1.7rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--glass-border)] px-5 py-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Map</p>
                  <p className="mt-1 text-sm font-medium text-ink">Locate {activeLocation.city}</p>
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

              {embeddedMapUrl ? (
                <iframe
                  title={`${activeLocation.office_name} map`}
                  src={embeddedMapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[22rem] w-full border-0 bg-[color-mix(in_srgb,var(--surface-raised)_84%,white)]"
                />
              ) : publicMapUrl ? (
                <div className="flex h-[22rem] flex-col items-center justify-center gap-4 px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-ink">Open this office in your map app</p>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      This map link cannot be embedded here, but the office location is ready to open in a new tab.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

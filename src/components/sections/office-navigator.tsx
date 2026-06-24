"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, User, Navigation, Building2 } from "lucide-react";
import { locationRoleLabel } from "@/lib/location-labels";
import type { Location } from "@/types/cms";

interface OfficeNavigatorProps {
  locations: Location[];
}

const FALLBACK_LOCATIONS: Location[] = [
  {
    id: "f1",
    slug: "mumbai-head",
    city: "Ettumanoor",
    office_name: "Sabs Marks JVS Head Office",
    address: "801-804, Raheja Chambers, Free Press Journal Marg, Nariman Point, Mumbai - 400021, Maharashtra, India",
    phone: "+91 22 6633 4400",
    email: "mumbai@sabsmarks.com",
    map_url: "https://maps.google.com/?q=Raheja+Chambers+Nariman+Point+Mumbai",
    contact_person: "Mr. J.V.S. Sabs, Senior Partner",
    latitude: null,
    longitude: null,
    photo_url: null,
    display_order: 0,
    featured: true,
    status: "published",
  },
  {
    id: "f2",
    slug: "bengaluru",
    city: "Bengaluru",
    office_name: "Sabs Marks JVS Bengaluru",
    address: "42, 3rd Floor, Prestige Meridian I, M.G. Road, Bengaluru - 560001, Karnataka, India",
    phone: "+91 80 4488 2211",
    email: "blr@sabsmarks.com",
    map_url: "https://maps.google.com/?q=Prestige+Meridian+MG+Road+Bengaluru",
    contact_person: "Mrs. Meera Marks, Managing Partner",
    latitude: null,
    longitude: null,
    photo_url: null,
    display_order: 0,
    featured: true,
    status: "published",
  },
  {
    id: "f3",
    slug: "dubai",
    city: "Dubai (UAE)",
    office_name: "Sabs Marks JVS Global (UAE Branch)",
    address: "Office 1205, Rolex Tower, Sheikh Zayed Road, Financial District, Dubai, United Arab Emirates",
    phone: "+971 4 388 9900",
    email: "dubai@sabsmarks.com",
    map_url: "https://maps.google.com/?q=Rolex+Tower+Sheikh+Zayed+Road+Dubai",
    contact_person: "Mr. Al-Maktoum JVS, International Director",
    latitude: null,
    longitude: null,
    photo_url: null,
    display_order: 0,
    featured: true,
    status: "published",
  },
  {
    id: "f4",
    slug: "chennai",
    city: "Chennai",
    office_name: "Sabs Marks JVS Chennai",
    address: "10, Khader Nawaz Khan Road, Nungambakkam, Chennai - 600006, Tamil Nadu, India",
    phone: "+91 44 2828 1155",
    email: "chennai@sabsmarks.com",
    map_url: "https://maps.google.com/?q=Khader+Nawaz+Khan+Road+Chennai",
    contact_person: "Mr. R. Sundar, Partner - Direct Tax",
    latitude: null,
    longitude: null,
    photo_url: null,
    display_order: 0,
    featured: false,
    status: "published",
  },
  {
    id: "f5",
    slug: "new-delhi",
    city: "New Delhi",
    office_name: "Sabs Marks JVS Delhi NCR",
    address: "12A, Connaught Place, Inner Circle, New Delhi - 110001, Delhi, India",
    phone: "+91 11 4111 8899",
    email: "delhi@sabsmarks.com",
    map_url: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
    contact_person: "Ms. Shalini Gupta, Lead - Audit & Assurance",
    latitude: null,
    longitude: null,
    photo_url: null,
    display_order: 0,
    featured: false,
    status: "published",
  },
];

export function OfficeNavigator({ locations }: OfficeNavigatorProps) {
  const displayLocations = locations.length > 0 ? locations : FALLBACK_LOCATIONS;
  const [selectedSlug, setSelectedSlug] = useState<string>(displayLocations[0].slug);

  const activeOffice = displayLocations.find((l) => l.slug === selectedSlug) || displayLocations[0];
  const activeOfficeName = activeOffice.city;
  const activeOfficeSecondaryName = activeOffice.office_name?.trim() || null;

  return (
    <div className="w-full">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Side: Branch List */}
        <div className="lg:col-span-5 space-y-3 max-h-[460px] overflow-y-auto pr-2">
          {displayLocations.map((office) => {
            const isSelected = office.slug === selectedSlug;
            return (
              <button
                key={office.id}
                onClick={() => setSelectedSlug(office.slug)}
                className={`w-full text-left p-4.5 rounded-[1.35rem] border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-accent border-accent text-white shadow-[0_12px_28px_color-mix(in_srgb,var(--accent)_24%,transparent)]"
                    : "bg-surface/40 border-[var(--glass-border)] text-ink hover:bg-surface"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? "bg-white/12 text-white"
                        : "bg-accent/8 text-accent group-hover:bg-accent group-hover:text-white"
                    }`}
                  >
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">{office.city}</h4>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? "text-white/78" : "text-muted"}`}>
                      {locationRoleLabel(office)}
                    </p>
                  </div>
                </div>
                <MapPin className={`h-4 w-4 ${isSelected ? "text-white/60" : "text-muted opacity-40 group-hover:opacity-100"}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: Branch Detail Card */}
        <div className="lg:col-span-7">
          <div className="creative-card decorated-panel rounded-[2rem] p-7 md:p-8 overflow-hidden h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-5 mb-6">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-accent px-2.5 py-1 rounded-full bg-accent/8 border border-accent/12 inline-block">
                    {locationRoleLabel(activeOffice)} Details
                  </div>
                  <h3 className="mt-3.5 text-2xl font-extrabold text-ink leading-tight">
                    {activeOfficeName}
                  </h3>
                  {activeOfficeSecondaryName ? <p className="mt-1 text-sm font-medium text-muted">{activeOfficeSecondaryName}</p> : null}
                </div>
              </div>

              <div className="space-y-4.5">
                {activeOffice.address ? (
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-raised border border-[var(--glass-border)] text-accent shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted block">
                        Address
                      </span>
                      <p className="mt-1 text-sm text-ink leading-relaxed font-medium">
                        {activeOffice.address}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Primary Contact Person */}
                {activeOffice.contact_person && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-raised border border-[var(--glass-border)] text-accent shrink-0 mt-0.5">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted block">
                        Lead Representative
                      </span>
                      <p className="mt-1 text-sm text-ink leading-relaxed font-semibold">
                        {activeOffice.contact_person}
                      </p>
                    </div>
                  </div>
                )}

                {/* Phone & Email Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeOffice.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-raised border border-[var(--glass-border)] text-accent shrink-0 mt-0.5">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted block">
                          Phone
                        </span>
                        <a
                          href={`tel:${activeOffice.phone.replace(/\s+/g, "")}`}
                          className="mt-1 text-sm text-ink hover:text-accent font-semibold block transition-colors"
                        >
                          {activeOffice.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {activeOffice.email && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-raised border border-[var(--glass-border)] text-accent shrink-0 mt-0.5">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted block">
                          Email
                        </span>
                        <a
                          href={`mailto:${activeOffice.email}`}
                          className="mt-1 text-sm text-ink hover:text-accent font-semibold block transition-colors"
                        >
                          {activeOffice.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            {activeOffice.map_url && (
              <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
                <a
                  href={activeOffice.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--glass-border)] bg-surface-raised/40 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface-raised hover:text-accent transition-all duration-300"
                >
                  <Navigation className="h-4 w-4 text-accent" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import L from "leaflet";
import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { locationRoleLabel } from "@/lib/location-labels";
import { getPublicMapUrl } from "@/lib/map-utils";
import type { Location } from "@/types/cms";

const INDIA_CENTER: [number, number] = [22.9734, 78.6569];

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function officeName(location: Location) {
  return location.office_name?.trim() || null;
}

function locationName(location: Location) {
  return location.city;
}

function hasPoint(location: Location) {
  return typeof location.latitude === "number" && Number.isFinite(location.latitude) && typeof location.longitude === "number" && Number.isFinite(location.longitude);
}

function fallbackMapUrl(location: Location) {
  if (hasPoint(location)) return `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=18/${location.latitude}/${location.longitude}`;
  const query = [location.office_name, location.address, location.city].filter(Boolean).join(", ");
  return query ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}` : null;
}

function mapUrl(location: Location) {
  return getPublicMapUrl(location.map_url) ?? fallbackMapUrl(location);
}

function LocationPhoto({ src, alt }: { src: string | null | undefined; alt: string }) {
  if (!src) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
      <Image src={src} alt={alt} width={1200} height={640} unoptimized className="h-64 w-full object-cover" />
    </div>
  );
}

function ContactRow({ href, icon, label, value }: { href?: string; icon: React.ReactNode; label: string; value: string }) {
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

export function LocationsBrowser({ locations }: { locations: Location[] }) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const activeLocation = locations.find((location) => location.id === activeId) ?? locations[0];
  const mappedLocations = useMemo(() => locations.filter(hasPoint), [locations]);

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "branch-map-marker",
        html: '<span class="branch-map-marker-dot"></span>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    []
  );
  const activeMarkerIcon = useMemo(
    () =>
      L.divIcon({
        className: "branch-map-marker is-active",
        html: '<span class="branch-map-marker-dot"></span>',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      }),
    []
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(INDIA_CENTER, 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      markerLayerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !markerLayer) return;

    markerLayer.clearLayers();

    for (const location of mappedLocations) {
      const isActive = location.id === activeLocation.id;
      L.marker([location.latitude as number, location.longitude as number], { icon: isActive ? activeMarkerIcon : markerIcon })
        .bindPopup(`<strong>${locationName(location)}</strong>${location.address ? `<br>${location.address}` : ""}`)
        .on("click", () => setActiveId(location.id))
        .addTo(markerLayer);
    }

    if (mappedLocations.length > 0) {
      const bounds = L.latLngBounds(mappedLocations.map((location) => [location.latitude as number, location.longitude as number]));
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 7 });
    }
  }, [activeLocation.id, activeMarkerIcon, mappedLocations, markerIcon]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !hasPoint(activeLocation)) return;
    map.setView([activeLocation.latitude as number, activeLocation.longitude as number], Math.max(map.getZoom(), 8), { animate: true });
  }, [activeLocation]);

  const activeTitle = locationName(activeLocation);
  const activeOfficeName = officeName(activeLocation);
  const activeMapUrl = mapUrl(activeLocation);

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
      <section className="rounded-[2rem] bg-[linear-gradient(135deg,#06121d_0%,#064b77_58%,#063c24_100%)] p-5 text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--accent-secondary)_28%,white)]">Branch Locations</p>
            <h2 className="mt-3 text-2xl font-bold">Select an exact branch point.</h2>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/90">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {locations.map((location) => {
            const isActive = location.id === activeLocation.id;

            return (
              <button
                key={location.id}
                type="button"
                onClick={() => setActiveId(location.id)}
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,1.05fr)] lg:items-start">
          <div>
            <LocationPhoto src={activeLocation.photo_url} alt={`${activeTitle} branch location`} />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{locationRoleLabel(activeLocation)}</p>
            <h3 className="mt-4 text-3xl font-bold text-ink md:text-[2.35rem]">{activeTitle}</h3>
            {activeOfficeName ? <p className="mt-2 text-base font-medium text-muted">{activeOfficeName}</p> : null}
            {activeLocation.address ? <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-muted">{activeLocation.address}</p> : null}

            <div className="mt-6 grid gap-3">
              {activeLocation.phone ? <ContactRow href={`tel:${sanitizePhone(activeLocation.phone)}`} icon={<Phone className="h-4 w-4" />} label="Phone" value={activeLocation.phone} /> : null}
              {activeLocation.email ? <ContactRow href={`mailto:${activeLocation.email}`} icon={<Mail className="h-4 w-4" />} label="Email" value={activeLocation.email} /> : null}
              {activeLocation.contact_person ? <ContactRow icon={<Building2 className="h-4 w-4" />} label="Contact Person" value={activeLocation.contact_person} /> : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact/${activeLocation.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_color-mix(in_srgb,var(--accent)_24%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
              >
                View branch details
                <ExternalLink className="h-4 w-4" />
              </Link>
              {activeMapUrl ? (
                <a
                  href={activeMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-5 py-3 text-sm font-semibold text-accent transition hover:border-accent/30 hover:bg-white/70"
                >
                  <MapPin className="h-4 w-4" />
                  Open exact point
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--glass-border)] px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Interactive Map</p>
                <p className="mt-1 text-sm font-medium text-ink">{mappedLocations.length ? "Click a pin to view branch details" : "Add coordinates in the CMS"}</p>
              </div>
              {activeMapUrl ? (
                <a href={activeMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/30">
                  Open map
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className="relative h-[31rem]">
              <div ref={containerRef} className="h-full w-full" />
              {mappedLocations.length === 0 ? (
                <div className="absolute inset-0 z-[400] flex items-center justify-center bg-white/80 px-8 text-center backdrop-blur-sm">
                  <p className="max-w-sm text-sm leading-7 text-muted">Save latitude and longitude for branch locations in the CMS to show clickable pins here.</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

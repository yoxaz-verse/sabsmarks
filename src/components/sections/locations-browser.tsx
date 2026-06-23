"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { locationRoleLabel } from "@/lib/location-labels";
import { getPublicMapUrl } from "@/lib/map-utils";
import type { Location } from "@/types/cms";
import type { DivIcon, LayerGroup, Map as LeafletMap } from "leaflet";

type LeafletModule = typeof import("leaflet");

type MapPoint = {
  location: Location;
  x: number;
  y: number;
  labelOffsetX: number;
  labelOffsetY: number;
  hasExactPoint: boolean;
};

const INDIA_CENTER: [number, number] = [22.9734, 78.6569];
const INDIA_MAP_VIEWBOX = {
  width: 640,
  height: 720,
  offsetX: 24,
  offsetY: 81.19167796143677,
  scale: 20.255994713732832,
  north: 35.49401,
  west: 68.176645,
};

const CITY_FALLBACK_POINTS: Record<string, { latitude: number; longitude: number }> = {
  angamaly: { latitude: 10.1903, longitude: 76.3869 },
  bangalore: { latitude: 12.9716, longitude: 77.5946 },
  bengaluru: { latitude: 12.9716, longitude: 77.5946 },
  chennai: { latitude: 13.0827, longitude: 80.2707 },
  ettumanoor: { latitude: 9.6705, longitude: 76.5621 },
  gurgaon: { latitude: 28.4595, longitude: 77.0266 },
  gurugram: { latitude: 28.4595, longitude: 77.0266 },
  kochi: { latitude: 9.9312, longitude: 76.2673 },
  kottayam: { latitude: 9.5916, longitude: 76.5222 },
  tirupati: { latitude: 13.6288, longitude: 79.4192 },
};

const LABEL_OFFSETS: Record<string, { x: number; y: number }> = {
  angamaly: { x: 42, y: 46 },
  bangalore: { x: -156, y: -14 },
  bengaluru: { x: -156, y: -14 },
  chennai: { x: 42, y: -16 },
  ettumanoor: { x: 48, y: 76 },
  gurgaon: { x: 36, y: -18 },
  gurugram: { x: 36, y: -18 },
  kochi: { x: -126, y: 50 },
  kottayam: { x: 54, y: 92 },
  tirupati: { x: -132, y: -54 },
};

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function officeName(location: Location) {
  return location.office_name?.trim() || null;
}

function locationName(location: Location) {
  return location.city.trim();
}

function normalizeToken(value: string | null | undefined) {
  return (value ?? "").toLowerCase().replace(/[^a-z]/g, "");
}

function hasPoint(location: Location) {
  return typeof location.latitude === "number" && Number.isFinite(location.latitude) && typeof location.longitude === "number" && Number.isFinite(location.longitude);
}

function coordinateFor(location: Location) {
  if (hasPoint(location)) return { latitude: location.latitude as number, longitude: location.longitude as number };
  return CITY_FALLBACK_POINTS[normalizeToken(location.city)] ?? null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function projectToIndiaMap(latitude: number, longitude: number) {
  const xPx = INDIA_MAP_VIEWBOX.offsetX + (longitude - INDIA_MAP_VIEWBOX.west) * INDIA_MAP_VIEWBOX.scale;
  const yPx = INDIA_MAP_VIEWBOX.offsetY + (INDIA_MAP_VIEWBOX.north - latitude) * INDIA_MAP_VIEWBOX.scale;
  const x = (xPx / INDIA_MAP_VIEWBOX.width) * 100;
  const y = (yPx / INDIA_MAP_VIEWBOX.height) * 100;
  return {
    x: clamp(x, 3.75, 96.25),
    y: clamp(y, 6, 94),
  };
}

function buildMapPoints(locations: Location[]) {
  const cityCounts = new Map<string, number>();

  return locations.reduce<MapPoint[]>((points, location) => {
    const coordinate = coordinateFor(location);
    if (!coordinate) return points;

    const token = normalizeToken(location.city);
    const count = cityCounts.get(token) ?? 0;
    cityCounts.set(token, count + 1);

    const projected = projectToIndiaMap(coordinate.latitude, coordinate.longitude);
    const offset = LABEL_OFFSETS[token] ?? { x: 36, y: -20 };
    const duplicateShift = count * 1.8;

    points.push({
      location,
      x: clamp(projected.x + duplicateShift, 3.75, 96.25),
      y: clamp(projected.y + duplicateShift, 6, 94),
      labelOffsetX: offset.x + count * 12,
      labelOffsetY: offset.y + count * 24,
      hasExactPoint: hasPoint(location),
    });

    return points;
  }, []);
}

function fallbackMapUrl(location: Location) {
  if (hasPoint(location)) return `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=18/${location.latitude}/${location.longitude}`;
  const query = [location.office_name, location.address, location.city].filter(Boolean).join(", ");
  return query ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}` : null;
}

function mapUrl(location: Location) {
  return getPublicMapUrl(location.map_url) ?? fallbackMapUrl(location);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function LocationPhoto({ src, alt }: { src: string | null | undefined; alt: string }) {
  if (!src) return null;

  return (
    <div className="mb-5 overflow-hidden rounded-[1.25rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
      <Image src={src} alt={alt} width={1200} height={640} unoptimized className="h-48 w-full object-cover md:h-56" />
    </div>
  );
}

function ContactRow({ href, icon, label, value }: { href?: string; icon: React.ReactNode; label: string; value: string }) {
  const content = (
    <div className="flex items-start gap-3 rounded-[1rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] px-4 py-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
        <p className="mt-1 break-words text-sm leading-6 text-ink">{value}</p>
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

function IndiaOverviewMap({
  activeId,
  locations,
  mapPoints,
  onSelect,
}: {
  activeId: string;
  locations: Location[];
  mapPoints: MapPoint[];
  onSelect: (id: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#06121d_0%,#064b77_58%,#063c24_100%)] text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)]">
      <div className="grid gap-6 p-5 md:p-7 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[color-mix(in_srgb,var(--accent-secondary)_28%,white)]">Unified Network</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight md:text-4xl">All Sabs Marks JVS branch locations on one India map.</h2>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/90">
              <Navigation className="h-5 w-5" />
            </div>
          </div>

          <div className="relative mt-7 overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-4 md:p-6">
            <div className="relative mx-auto aspect-[8/9] min-h-[27rem] w-full max-w-[42rem]">
              <Image src="/maps/india-outline.svg" alt="" fill unoptimized className="pointer-events-none select-none object-contain" />

              {mapPoints.map((point) => {
                const isActive = point.location.id === activeId;
                const label = locationName(point.location);

                return (
                  <button
                    key={point.location.id}
                    type="button"
                    onClick={() => onSelect(point.location.id)}
                    className="absolute z-10 text-left"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    aria-label={`Select ${label} branch`}
                  >
                    <span
                      className={`absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_12px_28px_rgba(2,6,23,0.32)] ${
                        isActive ? "bg-accent-secondary ring-8 ring-accent-secondary/25" : "bg-white ring-[6px] ring-white/15"
                      }`}
                    />
                    <span
                      className={`absolute min-w-max -translate-y-1/2 rounded-full border px-3 py-1.5 text-xs font-bold shadow-[0_14px_30px_rgba(2,6,23,0.26)] ${
                        isActive ? "border-accent-secondary bg-accent-secondary text-white" : "border-white/15 bg-[#062135]/88 text-white hover:bg-white hover:text-[#062135]"
                      }`}
                      style={{ transform: `translate(${point.labelOffsetX}px, ${point.labelOffsetY}px) translateY(-50%)` }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/12 bg-[#03111f]/76 px-4 py-3 text-xs leading-5 text-white/78 backdrop-blur">
              <span className="font-semibold text-white">{locations.length} published branches</span>
              <span>{mapPoints.filter((point) => point.hasExactPoint).length} exact points available</span>
              {locations.length > mapPoints.length ? <span>{locations.length - mapPoints.length} awaiting coordinates</span> : null}
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-4 xl:max-h-[39.5rem] xl:overflow-y-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/68">Branch Selector</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {locations.map((location) => {
              const isActive = location.id === activeId;

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => onSelect(location.id)}
                  className={`flex min-h-20 w-full items-center justify-between gap-3 rounded-[1rem] border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-accent-secondary bg-accent-secondary text-white shadow-[0_20px_40px_color-mix(in_srgb,var(--accent-secondary)_24%,transparent)]"
                      : "border-white/10 bg-white/6 text-white hover:border-white/18 hover:bg-white/10"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/68">{locationRoleLabel(location)}</span>
                    <span className="mt-1 block text-base font-semibold leading-tight">{locationName(location)}</span>
                    {officeName(location) ? <span className="mt-1 block truncate text-xs text-white/72">{officeName(location)}</span> : null}
                  </span>
                  <MapPin className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-white/78"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationsBrowser({ locations }: { locations: Location[] }) {
  const leafletRef = useRef<LeafletModule | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerLayerRef = useRef<LayerGroup | null>(null);
  const markerIconRef = useRef<DivIcon | null>(null);
  const activeMarkerIconRef = useRef<DivIcon | null>(null);
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const [mapReady, setMapReady] = useState(false);
  const activeLocation = locations.find((location) => location.id === activeId) ?? locations[0];
  const mappedLocations = useMemo(() => locations.filter(hasPoint), [locations]);
  const overviewPoints = useMemo(() => buildMapPoints(locations), [locations]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let isMounted = true;
    let map: LeafletMap | null = null;

    import("leaflet").then((leaflet) => {
      if (!isMounted || !containerRef.current || mapRef.current) return;

      leafletRef.current = leaflet;
      markerIconRef.current = leaflet.divIcon({
        className: "branch-map-marker",
        html: '<span class="branch-map-marker-dot"></span>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      activeMarkerIconRef.current = leaflet.divIcon({
        className: "branch-map-marker is-active",
        html: '<span class="branch-map-marker-dot"></span>',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      map = leaflet.map(containerRef.current, { scrollWheelZoom: false }).setView(INDIA_CENTER, 5);
      leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      markerLayerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);
      setTimeout(() => map?.invalidateSize(), 0);
    });

    return () => {
      isMounted = false;
      markerLayerRef.current = null;
      markerIconRef.current = null;
      activeMarkerIconRef.current = null;
      setMapReady(false);
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;
    const markerIcon = markerIconRef.current;
    const activeMarkerIcon = activeMarkerIconRef.current;
    if (!mapReady || !leaflet || !map || !markerLayer || !markerIcon || !activeMarkerIcon) return;

    markerLayer.clearLayers();

    for (const location of mappedLocations) {
      const isActive = location.id === activeLocation.id;
      const popup = `<strong>${escapeHtml(locationName(location))}</strong>${location.address ? `<br>${escapeHtml(location.address)}` : ""}`;

      leaflet
        .marker([location.latitude as number, location.longitude as number], { icon: isActive ? activeMarkerIcon : markerIcon })
        .bindPopup(popup)
        .on("click", () => setActiveId(location.id))
        .addTo(markerLayer);
    }

    if (mappedLocations.length > 0) {
      const bounds = leaflet.latLngBounds(mappedLocations.map((location) => [location.latitude as number, location.longitude as number]));
      map.fitBounds(bounds, { padding: [42, 42], maxZoom: 7 });
    }
  }, [activeLocation.id, mappedLocations, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !hasPoint(activeLocation)) return;
    map.setView([activeLocation.latitude as number, activeLocation.longitude as number], Math.max(map.getZoom(), 8), { animate: true });
  }, [activeLocation]);

  const activeTitle = locationName(activeLocation);
  const activeOfficeName = officeName(activeLocation);
  const activeMapUrl = mapUrl(activeLocation);
  const activeHasPoint = hasPoint(activeLocation);

  return (
    <div className="mt-12 space-y-6">
      <IndiaOverviewMap activeId={activeLocation.id} locations={locations} mapPoints={overviewPoints} onSelect={setActiveId} />

      <section className="site-card rounded-[2rem] p-5 md:p-7">
        <div className="grid gap-6 xl:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] xl:items-start">
          <div>
            <LocationPhoto src={activeLocation.photo_url} alt={`${activeTitle} branch location`} />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{locationRoleLabel(activeLocation)}</p>
            <h3 className="mt-3 text-3xl font-bold text-ink md:text-[2.35rem]">{activeTitle}</h3>
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
                  {activeHasPoint ? "Open exact point" : "Search on map"}
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--glass-border)] px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Exact Map Points</p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {mappedLocations.length ? "Every saved coordinate is visible here." : "Add coordinates in the CMS."}
                </p>
              </div>
              {activeMapUrl ? (
                <a href={activeMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-white/80 px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/30">
                  Open map
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className="relative h-[32rem]">
              <div ref={containerRef} className="h-full w-full" />
              {mappedLocations.length === 0 ? (
                <div className="absolute inset-0 z-[400] flex items-center justify-center bg-white/80 px-8 text-center backdrop-blur-sm">
                  <p className="max-w-sm text-sm leading-7 text-muted">Save latitude and longitude for branch locations in the CMS to show clickable exact pins here.</p>
                </div>
              ) : null}
              {mappedLocations.length > 0 && !activeHasPoint ? (
                <div className="absolute bottom-4 left-4 right-4 z-[400] rounded-2xl border border-[var(--glass-border)] bg-white/92 px-4 py-3 text-sm leading-6 text-muted shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur">
                  Exact coordinates are not saved for {activeTitle}. The overview uses an approximate city point until the CMS entry is updated.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { locationRoleLabel } from "@/lib/location-labels";
import { getPublicMapUrl } from "@/lib/map-utils";
import type { Location } from "@/types/cms";

type MapPoint = {
  location: Location;
  latitude: number;
  longitude: number;
  displayLatitude: number;
  displayLongitude: number;
};

type LeafletModule = typeof import("leaflet");

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function officeName(location: Location) {
  return location.office_name?.trim() || null;
}

function locationName(location: Location) {
  return location.city.trim();
}

function hasCoordinates(location: Location) {
  return typeof location.latitude === "number" && Number.isFinite(location.latitude) && typeof location.longitude === "number" && Number.isFinite(location.longitude);
}

function buildMapPoints(locations: Location[]) {
  const coordinateCounts = new Map<string, number>();

  return locations.reduce<MapPoint[]>((points, location) => {
    if (!hasCoordinates(location)) return points;

    const latitude = location.latitude as number;
    const longitude = location.longitude as number;
    const key = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const count = coordinateCounts.get(key) ?? 0;
    coordinateCounts.set(key, count + 1);

    const angle = count * 1.45;
    const spread = count === 0 ? 0 : 0.045;
    points.push({
      location,
      latitude,
      longitude,
      displayLatitude: latitude + Math.sin(angle) * spread,
      displayLongitude: longitude + Math.cos(angle) * spread,
    });

    return points;
  }, []);
}

function fallbackMapUrl(location: Location) {
  const hasExactPoint = typeof location.latitude === "number" && Number.isFinite(location.latitude) && typeof location.longitude === "number" && Number.isFinite(location.longitude);
  if (hasExactPoint) return `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=18/${location.latitude}/${location.longitude}`;
  const query = [location.office_name, location.address, location.city].filter(Boolean).join(", ");
  return query ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}` : null;
}

function mapUrl(location: Location) {
  return getPublicMapUrl(location.map_url) ?? fallbackMapUrl(location);
}

function LocationPhoto({ src, alt }: { src: string | null | undefined; alt: string }) {
  if (!src) return null;

  return (
    <div className="mb-5 overflow-hidden rounded-[1.25rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)]">
      <Image src={src} alt={alt} width={1200} height={640} unoptimized className="h-48 w-full object-cover md:h-56" />
    </div>
  );
}

function LocationsMap({
  activeId,
  mapPoints,
  onSelect,
}: {
  activeId: string;
  mapPoints: MapPoint[];
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markerLayerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const fittedRef = useRef(false);
  const skipInitialPanRef = useRef(true);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let disposed = false;

    import("leaflet").then((leaflet) => {
      if (disposed || !containerRef.current) return;

      const map = leaflet
        .map(containerRef.current, {
          attributionControl: false,
          scrollWheelZoom: false,
          zoomControl: true,
        })
        .setView([21.1, 78.6], 5);

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      const tilePane = map.getPane("tilePane");
      if (tilePane) {
        tilePane.style.filter = "grayscale(0.38) saturate(0.92) brightness(0.72) contrast(1.08)";
      }

      leafletRef.current = leaflet;
      markerLayerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      setIsMapReady(true);
      setTimeout(() => map.invalidateSize(), 0);
    });

    return () => {
      disposed = true;
      mapRef.current?.remove();
      leafletRef.current = null;
      markerLayerRef.current = null;
      mapRef.current = null;
      fittedRef.current = false;
      skipInitialPanRef.current = true;
      setIsMapReady(false);
    };
  }, []);

  useEffect(() => {
    const leaflet = leafletRef.current;
    const markerLayer = markerLayerRef.current;
    const map = mapRef.current;
    if (!leaflet || !markerLayer || !map || !isMapReady) return;

    markerLayer.clearLayers();

    mapPoints.forEach((point) => {
      const isActive = point.location.id === activeId;
      const marker = leaflet.marker([point.displayLatitude, point.displayLongitude], {
        icon: leaflet.divIcon({
          className: `branch-map-marker ${isActive ? "is-active" : ""}`,
          html: '<span class="branch-map-marker-dot"></span>',
          iconSize: isActive ? [42, 42] : [34, 34],
          iconAnchor: isActive ? [21, 21] : [17, 17],
        }),
        keyboard: true,
        title: locationName(point.location),
      });

      const office = officeName(point.location);
      marker.bindTooltip(office ? `${locationName(point.location)} · ${office}` : locationName(point.location), {
        direction: "top",
        offset: [0, -14],
        opacity: 0.95,
      });
      marker.on("click", () => onSelect(point.location.id));
      marker.addTo(markerLayer);
    });

    if (!fittedRef.current && mapPoints.length > 0) {
      if (mapPoints.length === 1) {
        map.setView([mapPoints[0].displayLatitude, mapPoints[0].displayLongitude], 11);
      } else {
        map.fitBounds(
          mapPoints.map((point) => [point.displayLatitude, point.displayLongitude] as [number, number]),
          { maxZoom: 6, padding: [42, 42] }
        );
      }
      fittedRef.current = true;
    }
  }, [activeId, isMapReady, mapPoints, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !fittedRef.current) return;

    const activePoint = mapPoints.find((point) => point.location.id === activeId);
    if (!activePoint) return;
    if (skipInitialPanRef.current) {
      skipInitialPanRef.current = false;
      return;
    }

    map.flyTo([activePoint.displayLatitude, activePoint.displayLongitude], Math.max(map.getZoom(), 8), {
      duration: 0.7,
    });
  }, [activeId, mapPoints]);

  return <div ref={containerRef} className="locations-real-map h-[31rem] min-h-[31rem] w-full md:h-[38rem]" />;
}

function LocationsMapExperience({
  activeId,
  activeLocation,
  activeMapUrl,
  locations,
  mapPoints,
  onSelect,
}: {
  activeId: string;
  activeLocation: Location;
  activeMapUrl: string | null;
  locations: Location[];
  mapPoints: MapPoint[];
  onSelect: (id: string) => void;
}) {
  const activeTitle = locationName(activeLocation);
  const activeOfficeName = officeName(activeLocation);
  const activeHasCoordinates = hasCoordinates(activeLocation);
  const missingCoordinateCount = locations.length - mapPoints.length;

  return (
    <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#06121d_0%,#064b77_58%,#063c24_100%)] text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)]">
      <div className="grid gap-6 p-5 md:p-7 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[color-mix(in_srgb,var(--accent-secondary)_28%,white)]">Branch Network</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight md:text-4xl">Select any Sabs Marks JVS branch from the live India map.</h2>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/90">
              <Navigation className="h-5 w-5" />
            </div>
          </div>

          <div className="relative mt-7 overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-2">
            <LocationsMap activeId={activeId} mapPoints={mapPoints} onSelect={onSelect} />

            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/12 bg-[#03111f]/76 px-4 py-3 text-xs leading-5 text-white/78 backdrop-blur">
              <span className="font-semibold text-white">{locations.length} published branches</span>
              <span>{mapPoints.length} map points</span>
              {missingCoordinateCount > 0 ? <span>{missingCoordinateCount} without coordinates</span> : null}
            </div>
          </div>
        </div>

        <aside className="flex min-h-0 flex-col gap-5 self-start xl:max-h-[46rem]">
          <div className="shrink-0 rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-4">
            <LocationPhoto src={activeLocation.photo_url} alt={`${activeTitle} branch location`} />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/68">{locationRoleLabel(activeLocation)}</p>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-white">{activeTitle}</h3>
            {activeOfficeName ? <p className="mt-2 text-sm font-medium text-white/72">{activeOfficeName}</p> : null}
            {activeLocation.address ? <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/76">{activeLocation.address}</p> : null}
            {!activeHasCoordinates ? (
              <p className="mt-4 rounded-2xl border border-amber-200/20 bg-amber-300/10 px-3 py-3 text-sm leading-6 text-amber-50">
                Map point unavailable for this branch. Use the external map search until coordinates are added in the CMS.
              </p>
            ) : null}

            <div className="mt-5 grid gap-2">
              {activeLocation.phone ? (
                <a href={`tel:${sanitizePhone(activeLocation.phone)}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm text-white/82 transition hover:border-white/20 hover:bg-white/10">
                  <Phone className="h-4 w-4 shrink-0 text-[color-mix(in_srgb,var(--accent-secondary)_45%,white)]" />
                  <span className="break-all">{activeLocation.phone}</span>
                </a>
              ) : null}
              {activeLocation.email ? (
                <a href={`mailto:${activeLocation.email}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm text-white/82 transition hover:border-white/20 hover:bg-white/10">
                  <Mail className="h-4 w-4 shrink-0 text-[color-mix(in_srgb,var(--accent-secondary)_45%,white)]" />
                  <span className="break-all">{activeLocation.email}</span>
                </a>
              ) : null}
              {activeLocation.contact_person ? (
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm text-white/82">
                  <Building2 className="h-4 w-4 shrink-0 text-[color-mix(in_srgb,var(--accent-secondary)_45%,white)]" />
                  <span>{activeLocation.contact_person}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-2">
              <Link
                href={`/contact/${activeLocation.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_34px_color-mix(in_srgb,var(--accent-secondary)_24%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--accent-secondary)_88%,black)]"
              >
                View branch
                <ExternalLink className="h-4 w-4" />
              </Link>
              {activeMapUrl ? (
                <a href={activeMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/10">
                  <MapPin className="h-4 w-4" />
                  Open map
                </a>
              ) : null}
            </div>
          </div>

          <div className="min-h-0 rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-4 xl:flex xl:flex-1 xl:flex-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/68">Branch Selector</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:min-h-0 xl:flex-1 xl:grid-cols-1 xl:overflow-y-auto xl:pr-1">
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
                    aria-pressed={isActive}
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/68">{locationRoleLabel(location)}</span>
                      <span className="mt-1 block text-base font-semibold leading-tight">{locationName(location)}</span>
                      {officeName(location) ? <span className="mt-1 block truncate text-xs text-white/72">{officeName(location)}</span> : null}
                      {!hasCoordinates(location) ? <span className="mt-1 block text-xs text-amber-100/80">Map point unavailable</span> : null}
                    </span>
                    <MapPin className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-white/78"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function LocationsBrowser({ locations }: { locations: Location[] }) {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const activeLocation = locations.find((location) => location.id === activeId) ?? locations[0];
  const overviewPoints = useMemo(() => buildMapPoints(locations), [locations]);
  const activeMapUrl = mapUrl(activeLocation);

  return (
    <div className="mt-12 space-y-6">
      <LocationsMapExperience activeId={activeLocation.id} activeLocation={activeLocation} activeMapUrl={activeMapUrl} locations={locations} mapPoints={overviewPoints} onSelect={setActiveId} />
    </div>
  );
}

"use client";

import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, LocateFixed } from "lucide-react";

type LocationMapPickerProps = {
  address: string;
  mapUrl: string;
  latitude: number | null;
  longitude: number | null;
  onChange: (value: { address?: string; map_url?: string; latitude?: number | null; longitude?: number | null }) => void;
};

type GeocodeResponse = {
  result?: {
    label: string;
    latitude: number;
    longitude: number;
  };
  error?: string;
};

const INDIA_CENTER: [number, number] = [22.9734, 78.6569];
const DEFAULT_ZOOM = 5;
const POINT_ZOOM = 15;

function hasPoint(latitude: number | null, longitude: number | null) {
  return typeof latitude === "number" && Number.isFinite(latitude) && typeof longitude === "number" && Number.isFinite(longitude);
}

function formatCoordinate(value: number | null) {
  return typeof value === "number" && Number.isFinite(value) ? value.toFixed(6) : "";
}

function buildMapUrl(latitude: number | null, longitude: number | null, address: string) {
  if (hasPoint(latitude, longitude)) return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const query = address.trim();
  if (!query) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function LocationMapPicker({ address, mapUrl, latitude, longitude, onChange }: LocationMapPickerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draftAddressRef = useRef(address);
  const onChangeRef = useRef(onChange);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [draftAddress, setDraftAddress] = useState(address);

  const pointIcon = useMemo(
    () =>
      L.divIcon({
        className: "branch-map-marker",
        html: '<span class="branch-map-marker-dot"></span>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    []
  );

  const publicMapUrl = mapUrl.trim() || buildMapUrl(latitude, longitude, address);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    draftAddressRef.current = draftAddress;
  }, [draftAddress]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialCenter: [number, number] = hasPoint(latitude, longitude) ? [latitude as number, longitude as number] : INDIA_CENTER;
    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(initialCenter, hasPoint(latitude, longitude) ? POINT_ZOOM : DEFAULT_ZOOM);

    L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
    }).addTo(map);

    map.on("click", (event) => {
      const nextLatitude = Number(event.latlng.lat.toFixed(7));
      const nextLongitude = Number(event.latlng.lng.toFixed(7));
      onChangeRef.current({ latitude: nextLatitude, longitude: nextLongitude, map_url: buildMapUrl(nextLatitude, nextLongitude, draftAddressRef.current) });
    });

    mapRef.current = map;

    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!hasPoint(latitude, longitude)) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    const latLng: [number, number] = [latitude as number, longitude as number];
    if (!markerRef.current) {
      markerRef.current = L.marker(latLng, { draggable: true, icon: pointIcon })
        .on("dragend", (event) => {
          const marker = event.target as L.Marker;
          const next = marker.getLatLng();
          const nextLatitude = Number(next.lat.toFixed(7));
          const nextLongitude = Number(next.lng.toFixed(7));
          onChangeRef.current({ latitude: nextLatitude, longitude: nextLongitude, map_url: buildMapUrl(nextLatitude, nextLongitude, draftAddressRef.current) });
        })
        .addTo(map);
    } else {
      markerRef.current.setLatLng(latLng);
    }
  }, [latitude, longitude, pointIcon]);

  function updateCoordinate(key: "latitude" | "longitude", value: string) {
    const numberValue = value === "" ? null : Number(value);
    if (numberValue !== null && !Number.isFinite(numberValue)) return;
    const nextLatitude = key === "latitude" ? numberValue : latitude;
    const nextLongitude = key === "longitude" ? numberValue : longitude;
    onChange({
      [key]: numberValue,
      map_url: buildMapUrl(nextLatitude, nextLongitude, draftAddress),
    });
  }

  async function findOnMap() {
    const query = draftAddress.trim();
    if (query.length < 3) {
      setMessage("Enter an address before searching.");
      return;
    }

    setSearching(true);
    setMessage("");

    const res = await fetch("/api/admin/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const json = (await res.json()) as GeocodeResponse;

    if (!res.ok || !json.result) {
      setMessage(json.error ?? "No map result found.");
      setSearching(false);
      return;
    }

    const nextUrl = buildMapUrl(json.result.latitude, json.result.longitude, query);
    onChange({
      address: query,
      latitude: json.result.latitude,
      longitude: json.result.longitude,
      map_url: nextUrl,
    });
    mapRef.current?.setView([json.result.latitude, json.result.longitude], POINT_ZOOM);
    setMessage(`Matched: ${json.result.label}`);
    setSearching(false);
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(18rem,1.2fr)]">
        <div className="space-y-4">
          <label className="admin-field">
            <span className="admin-label">Address Search</span>
            <textarea value={draftAddress} onChange={(event) => setDraftAddress(event.target.value)} className="admin-textarea min-h-28" />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void findOnMap()}
              disabled={searching}
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LocateFixed className="h-4 w-4" />
              {searching ? "Searching" : "Find on map"}
            </button>
            {publicMapUrl ? (
              <a href={publicMapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700">
                <ExternalLink className="h-4 w-4" />
                Open in Maps
              </a>
            ) : null}
          </div>

          {message ? <p className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs leading-5 text-stone-600">{message}</p> : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="admin-field">
              <span className="admin-label">Latitude</span>
              <input type="number" step="any" value={formatCoordinate(latitude)} onChange={(event) => updateCoordinate("latitude", event.target.value)} className="admin-input" />
            </label>
            <label className="admin-field">
              <span className="admin-label">Longitude</span>
              <input type="number" step="any" value={formatCoordinate(longitude)} onChange={(event) => updateCoordinate("longitude", event.target.value)} className="admin-input" />
            </label>
          </div>

          <label className="admin-field">
            <span className="admin-label">Map URL</span>
            <input value={mapUrl} onChange={(event) => onChange({ map_url: event.target.value })} className="admin-input" />
          </label>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div ref={containerRef} className="h-[26rem] w-full" />
        </div>
      </div>
    </div>
  );
}

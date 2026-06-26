"use client";

import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";

type LocationPointMapProps = {
  title: string;
  latitude: number;
  longitude: number;
};

export function LocationPointMap({ title, latitude, longitude }: LocationPointMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const markerIcon = useMemo(
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

    const map = L.map(containerRef.current, { scrollWheelZoom: false, attributionControl: false }).setView([latitude, longitude], 16);
    L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
    }).addTo(map);
    L.marker([latitude, longitude], { icon: markerIcon }).bindPopup(title).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, markerIcon, title]);

  return <div ref={containerRef} className="h-[26rem] w-full" />;
}

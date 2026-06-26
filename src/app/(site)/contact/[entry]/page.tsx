import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { formatPhoneWithCountryCode } from "@/lib/phone-utils";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { LocationPointMap } from "@/components/sections/location-point-map";
import { getLocationBySlug } from "@/lib/content/service";
import { locationRoleLabel } from "@/lib/location-labels";
import { getEmbeddableMapUrl, getPublicMapUrl } from "@/lib/map-utils";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

function hasPoint(latitude: number | null, longitude: number | null) {
  return typeof latitude === "number" && Number.isFinite(latitude) && typeof longitude === "number" && Number.isFinite(longitude);
}

function fallbackMapUrl(latitude: number | null, longitude: number | null, address: string | null, title: string) {
  if (hasPoint(latitude, longitude)) return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
  const query = [address, title].filter(Boolean).join(", ");
  return query ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}` : null;
}

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry } = await params;
  const location = await getLocationBySlug(entry);
  if (!location) return { robots: { index: false, follow: false } };
  const title = location.city;
  const roleLabel = locationRoleLabel(location);

  return buildPageMetadata({
    path: `/contact/${location.slug}`,
    title: `${title} | Contact`,
    description: `${title} ${roleLabel.toLowerCase()} details, address, and contact information.`,
  });
}

export default async function OfficeDetail({ params }: { params: Promise<{ entry: string }> }) {
  const location = await getLocationBySlug((await params).entry);
  if (!location) notFound();
  const publicMapUrl = getPublicMapUrl(location.map_url) ?? fallbackMapUrl(location.latitude, location.longitude, location.address, location.city);
  const embeddedMapUrl = getEmbeddableMapUrl(location.map_url);
  const hasExactPoint = hasPoint(location.latitude, location.longitude);
  const title = location.city;
  const secondaryName = location.office_name?.trim() || null;
  const roleLabel = locationRoleLabel(location);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
    { name: location.city, url: `/contact/${location.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <JsonLdScript id={`location-breadcrumb-${location.id}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }, { label: location.city }]} />
      <div className="detail-layout">
        <div className="detail-card p-8 md:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{roleLabel}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{title}</h1>
          {secondaryName ? <p className="mt-2 text-base font-medium text-muted">{secondaryName}</p> : null}
          {location.photo_url ? (
            <div className="mt-6 overflow-hidden rounded-3xl border border-[var(--glass-border)]">
              <Image src={location.photo_url} alt={`${title} branch location`} width={1200} height={640} unoptimized className="h-72 w-full object-cover" />
            </div>
          ) : null}
          {location.address ? <p className="mt-6 whitespace-pre-wrap leading-8 text-muted">{location.address}</p> : null}
          {location.phone ? <p className="mt-4 text-muted">T: {formatPhoneWithCountryCode(location.phone)}</p> : null}
          {location.email ? <p className="mt-1 text-muted">E: {location.email}</p> : null}
          {location.contact_person ? <p className="mt-3 text-sm text-muted">Contact Person: {location.contact_person}</p> : null}

        </div>

        {publicMapUrl || hasExactPoint ? (
          <section className="detail-card detail-map-card">
            <div className="flex items-start justify-between gap-4 p-6 md:p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Map</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Locate this {roleLabel.toLowerCase()}</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  Use the map to confirm the exact branch point, or open it in a new tab for a larger view.
                </p>
              </div>
              {publicMapUrl ? (
                <a
                  href={publicMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/30 hover:bg-white/70"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open map
                </a>
              ) : null}
            </div>

            {hasExactPoint ? (
              <div className="detail-map-frame-wrap">
                <LocationPointMap title={`${title} map point`} latitude={location.latitude as number} longitude={location.longitude as number} />
              </div>
            ) : embeddedMapUrl ? (
              <div className="detail-map-frame-wrap">
                <iframe
                  title={`${title} map`}
                  src={embeddedMapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="detail-map-frame"
                />
              </div>
            ) : (
              <div className="detail-map-fallback">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-accent">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-ink">Open this location in your map app</p>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                    This map link cannot be embedded here, but the location is ready to open in a new tab.
                  </p>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </div>
    </article>
  );
}

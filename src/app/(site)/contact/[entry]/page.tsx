import type { Metadata } from "next";
import { ExternalLink, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getLocationBySlug } from "@/lib/content/service";
import { getEmbeddableMapUrl, getPublicMapUrl } from "@/lib/map-utils";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry } = await params;
  const location = await getLocationBySlug(entry);
  if (!location) return { robots: { index: false, follow: false } };

  return buildPageMetadata({
    path: `/contact/${location.slug}`,
    title: `${location.office_name} | Contact`,
    description: `${location.office_name} office details, address, and contact information.`,
  });
}

export default async function OfficeDetail({ params }: { params: Promise<{ entry: string }> }) {
  const location = await getLocationBySlug((await params).entry);
  if (!location) notFound();
  const publicMapUrl = getPublicMapUrl(location.map_url);
  const embeddedMapUrl = getEmbeddableMapUrl(location.map_url);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
    { name: location.city, url: `/contact/${location.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <JsonLdScript id={`office-breadcrumb-${location.id}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }, { label: location.city }]} />
      <div className="detail-layout">
        <div className="detail-card p-8 md:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Office</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{location.office_name}</h1>
          <p className="mt-6 whitespace-pre-wrap leading-8 text-muted">{location.address}</p>
          {location.phone ? <p className="mt-4 text-muted">T: {location.phone}</p> : null}
          {location.email ? <p className="mt-1 text-muted">E: {location.email}</p> : null}
          {location.contact_person ? <p className="mt-3 text-sm text-muted">Contact Person: {location.contact_person}</p> : null}
        </div>

        {publicMapUrl ? (
          <section className="detail-card detail-map-card">
            <div className="flex items-start justify-between gap-4 p-6 md:p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Map</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Locate this office</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  Use the map for directions and open it in a new tab if you need the full Google Maps experience.
                </p>
              </div>
              <a
                href={publicMapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/30 hover:bg-white/70"
              >
                <ExternalLink className="h-4 w-4" />
                Open map
              </a>
            </div>

            {embeddedMapUrl ? (
              <div className="detail-map-frame-wrap">
                <iframe
                  title={`${location.office_name} map`}
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
                  <p className="text-lg font-semibold text-ink">Open this office in your map app</p>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                    This map link cannot be embedded here, but the office location is ready to open in a new tab.
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

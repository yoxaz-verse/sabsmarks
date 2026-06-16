import type { Metadata } from "next";
import Image from "next/image";
import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getLocationBySlug } from "@/lib/content/service";
import { locationRoleLabel } from "@/lib/location-labels";
import { getEmbeddableMapUrl, getPublicMapUrl } from "@/lib/map-utils";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";
import type { LocationBranch } from "@/types/cms";

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function branchName(branch: LocationBranch) {
  return branch.name?.trim() || "Branch Location";
}

function BranchDetailCard({ branch }: { branch: LocationBranch }) {
  const publicMapUrl = getPublicMapUrl(branch.map_url);
  const title = branchName(branch);

  return (
    <article className="rounded-3xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_74%,transparent)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Branch</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{title}</h3>
        </div>
        {publicMapUrl ? (
          <a
            href={publicMapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent/30 hover:bg-white/70"
          >
            <MapPin className="h-4 w-4" />
            Map
          </a>
        ) : null}
      </div>
      {branch.photo_url ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--glass-border)]">
          <Image src={branch.photo_url} alt={`${title} branch`} width={1000} height={520} unoptimized className="h-56 w-full object-cover" />
        </div>
      ) : null}
      {branch.address ? <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted">{branch.address}</p> : null}
      <div className="mt-5 grid gap-3 text-sm text-muted md:grid-cols-2">
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
          <p className="inline-flex items-center gap-2 md:col-span-2">
            <Building2 className="h-4 w-4" />
            {branch.contact_person}
          </p>
        ) : null}
      </div>
    </article>
  );
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
  const publicMapUrl = getPublicMapUrl(location.map_url);
  const embeddedMapUrl = getEmbeddableMapUrl(location.map_url);
  const branches = location.branches ?? [];
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
          {location.phone ? <p className="mt-4 text-muted">T: {location.phone}</p> : null}
          {location.email ? <p className="mt-1 text-muted">E: {location.email}</p> : null}
          {location.contact_person ? <p className="mt-3 text-sm text-muted">Contact Person: {location.contact_person}</p> : null}

          {branches.length > 0 ? (
            <section className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Branches</p>
              <div className="mt-4 grid gap-4">
                {branches.map((branch) => (
                  <BranchDetailCard key={branch.id} branch={branch} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {publicMapUrl ? (
          <section className="detail-card detail-map-card">
            <div className="flex items-start justify-between gap-4 p-6 md:p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Map</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Locate this {roleLabel.toLowerCase()}</h2>
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

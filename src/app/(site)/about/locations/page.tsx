import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner } from "@/components/layout/page-banner";
import { getLocations } from "@/lib/content/service";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/about/locations",
  title: "Locations",
  description: "Explore all Sabs Marks JVS office locations and reach the office most relevant to you.",
});

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{value}</p>
    </div>
  );
}

export default async function AboutLocationsPage() {
  const locations = await getLocations();

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title="Locations" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised border border-[var(--glass-border)] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="text-xs font-bold text-ink uppercase tracking-wider">About Us</span>
          </div>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
            Find every Sabs Marks JVS office in one place.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            Browse our published office locations and open the office detail page for direct contact information,
            address details, and local points of contact.
          </p>
          <div className="h-[2px] w-24 bg-accent mt-8"></div>
        </div>

        {locations.length ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/contact/${location.slug}`}
                className="group glass-panel rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover-glow bg-surface/70"
              >
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">{location.city}</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-ink group-hover:text-accent transition-colors">{location.office_name}</h3>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-muted">{location.address}</p>

                <div className="mt-6 space-y-5 border-t border-[var(--glass-border)] pt-5">
                  {location.phone ? <DetailRow label="Phone" value={location.phone} /> : null}
                  {location.email ? <DetailRow label="Email" value={location.email} /> : null}
                  {location.contact_person ? <DetailRow label="Contact Person" value={location.contact_person} /> : null}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-transform duration-200 group-hover:translate-x-1">
                  <span>View office details</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-[var(--glass-border)] bg-surface p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-muted">Locations</p>
            <h3 className="mt-4 text-2xl font-bold text-ink">Office details will appear here soon.</h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
              No published locations are available right now. Once office entries are published in the CMS, they will
              automatically appear on this page.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

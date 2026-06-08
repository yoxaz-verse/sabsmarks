import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { LocationsBrowser } from "@/components/sections/locations-browser";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { getLocations } from "@/lib/content/service";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/about/locations",
  title: "Locations",
  description: "Explore all Sabs Marks JVS office locations and reach the office most relevant to you.",
});

export default async function AboutLocationsPage() {
  const locations = await getLocations();

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title="Locations" />

      <InteriorIntroSection
        title="Find every Sabs Marks JVS office in one place."
        description="Browse published offices, switch between branches instantly, and keep the active location map in view while you compare addresses and contact details."
        className="border-b-0"
      />

      <section className="site-section">
        <div className="site-container pb-16 md:pb-20">
          {locations.length ? (
            <LocationsBrowser locations={locations} />
          ) : (
            <div className="site-card mt-12 rounded-[1.75rem] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-muted">Locations</p>
              <h3 className="mt-4 text-2xl font-bold text-ink">Office details will appear here soon.</h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
                No published locations are available right now. Once office entries are published in the CMS, they will
                automatically appear on this page.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

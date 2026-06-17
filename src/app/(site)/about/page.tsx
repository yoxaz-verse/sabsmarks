import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { ImageFeatureCard } from "@/components/media/image-feature-card";
import { SITE_VISUALS } from "@/lib/site-visuals";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: "Learn about Sabs Marks JVS & Co., our legacy, leadership, and advisory philosophy.",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="The Firm" />

      <InteriorIntroSection
        compact
        title="A Legacy of Trust and Excellence."
        description="Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries."
        body={
          <>
            <p>
              Established in 1985, the firm has grown into a trusted third-generation practice built on a legacy of expertise, integrity, and client-centric service. With a strong focus on the MSME sector, we support businesses of all sizes with tailored solutions that address both routine and complex business requirements.
            </p>
            <p>
              Guided by the values of Integrity, Competence, and Professionalism, our experienced team delivers strategic, practical, and legally sound advice to help clients navigate challenges, ensure compliance, and achieve sustainable growth through a personalized approach.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/about/team" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Meet Our Leadership <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_74%,transparent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink hover:border-accent hover:text-accent"
            >
              Explore Our Locations
            </Link>
          </>
        }
        stats={[
          { value: "35+", label: "Years of Trust" },
          { value: "18+", label: "Partners" },
          { value: "250+", label: "Professionals" },
          { value: "10", label: "Global Locations" },
        ]}
      />

      <section className="site-section pt-0 pb-16 md:pb-20">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImageFeatureCard
              src={SITE_VISUALS.about.legacy}
              alt="Professional review meeting with financial documents and planning materials."
              eyebrow="Legacy"
              title="Built over decades, applied to present-day decisions."
              description="The firm’s growth has come from long-term client trust, partner visibility, and advice that remains grounded in execution."
            />
            <ImageFeatureCard
              src={SITE_VISUALS.about.team}
              alt="Leadership team collaborating across a conference table."
              eyebrow="Partner-led"
              title="Senior involvement where judgement matters most."
              description="Our engagement model keeps leadership close to the work, especially when decisions carry regulatory, financial, or governance weight."
              href="/about/team"
              ctaLabel="Meet leadership"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

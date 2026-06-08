import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { buildPageMetadata } from "@/lib/seo";
import { Building2, Factory } from "lucide-react";
import Image from "next/image";
import { SITE_VISUALS } from "@/lib/site-visuals";

export const metadata: Metadata = buildPageMetadata({
  path: "/industry-solutions",
  title: "Industry Solutions",
  description: "Industry-specific financial, compliance, and strategic advisory solutions.",
});

export default function IndustryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Industry Solutions" />

      <InteriorIntroSection
        title="Industry context that makes advisory decisions more actionable."
        description="Sabs Marks JVS PVT LTD has been providing knowledge-based solutions to its clients, helping them better understand the fundamentals and complexity of various issues, thereby enabling them to take strategic, data-driven decisions."
        body={
          <>
            <p>
              In view of our in-house research, close relationships, and constant interactions with clients from diverse industries, we have built a well-developed and fully updated knowledge center. This enables us to cater to demands from diverse industries for a wide range of services across major functional areas.
            </p>
            <p>
              Our solutions are based on our long-drawn research, experience and expertise in specific industries and business environments. Some select sectors and industries serviced by us include:
            </p>
          </>
        }
        align="center"
        className="border-b-0"
      />

      <section className="site-section">
        <div className="site-container pb-16 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="site-card interactive-card group relative flex flex-col overflow-hidden rounded-[1.75rem] p-0">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={SITE_VISUALS.industries.bfsi}
                alt="Financial services professionals reviewing market and compliance materials."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.05),rgba(8,15,30,0.32))]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="h-16 w-16 rounded-2xl bg-surface-raised shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[var(--glass-border)]">
                <Building2 className="w-8 h-8 text-accent drop-shadow-sm" strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-black text-surface-raised group-hover:text-accent/10 transition-colors duration-500">
                01
              </div>
            </div>

            <h3 className="text-3xl font-bold text-ink mb-4 group-hover:text-accent transition-colors duration-300 tracking-tight relative z-10">BFSI</h3>
            <div className="h-px w-full bg-[var(--glass-border)] mb-6 relative z-10"></div>

            <p className="text-muted text-[15px] leading-relaxed relative z-10 flex-grow">
              Banks <span className="text-accent/50 mx-1">•</span> Mutual Funds <span className="text-accent/50 mx-1">•</span> Insurance Companies <span className="text-accent/50 mx-1">•</span> Housing Finance Companies <span className="text-accent/50 mx-1">•</span> Non-Banking Financial Companies <span className="text-accent/50 mx-1">•</span> Venture Capital Funds <span className="text-accent/50 mx-1">•</span> Private Equity Funds <span className="text-accent/50 mx-1">•</span> Pension Funds <span className="text-accent/50 mx-1">•</span> Stock Brokers <span className="text-accent/50 mx-1">•</span> Depository Participants
            </p>
            </div>
          </div>

          <div className="site-card interactive-card group relative flex flex-col overflow-hidden rounded-[1.75rem] p-0 md:translate-y-8">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={SITE_VISUALS.industries.manufacturing}
                alt="Modern manufacturing floor with industrial operations."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.05),rgba(8,15,30,0.32))]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="h-16 w-16 rounded-2xl bg-surface-raised shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[var(--glass-border)]">
                <Factory className="w-8 h-8 text-accent-secondary drop-shadow-sm" strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-black text-surface-raised group-hover:text-accent-secondary/10 transition-colors duration-500">
                02
              </div>
            </div>

            <h3 className="text-3xl font-bold text-ink mb-4 group-hover:text-accent-secondary transition-colors duration-300 tracking-tight relative z-10">Manufacturing</h3>
            <div className="h-px w-full bg-[var(--glass-border)] mb-6 relative z-10"></div>

            <p className="text-muted text-[15px] leading-relaxed relative z-10 flex-grow">
              Chemicals <span className="text-accent-secondary/50 mx-1">•</span> Packaging
            </p>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}

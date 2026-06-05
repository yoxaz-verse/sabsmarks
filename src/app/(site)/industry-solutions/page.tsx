import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";
import { Building2, Factory } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  path: "/industry-solutions",
  title: "Industry Solutions",
  description: "Industry-specific financial, compliance, and strategic advisory solutions.",
});

export default function IndustryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="Industry Solutions" />

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
        <div className="mx-auto mb-20 max-w-4xl space-y-6 text-center text-[16px] leading-relaxed text-muted">
          <p className="brand-kicker inline-flex">Our Expertise</p>
          <p>
            Sabs Marks JVS PVT LTD has been providing knowledge-based solutions to its clients, helping them better understand the fundamentals and complexity of various issues, thereby enabling them to take strategic, data-driven decisions.
          </p>
          <p>
            In view of our in-house research, close relationships, and constant interactions with clients from diverse industries, we have built a well-developed and fully updated knowledge center. This enables us to cater to demands from diverse industries for a wide range of services across major functional areas.
          </p>
          <p className="font-medium text-accent">
            Our solutions are based on our long-drawn research, experience and expertise in specific industries and business environments. Some select sectors/industries serviced by us include:
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="brand-card flex flex-col p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--cloud)]">
                <Building2 className="h-8 w-8 text-accent" strokeWidth={1.5} />
              </div>
              <div className="data-number text-4xl text-[var(--accent-secondary)]">01</div>
            </div>

            <h3 className="text-3xl font-bold text-accent">BFSI</h3>
            <div className="mt-5 h-px w-full bg-[var(--border)]" />

            <p className="mt-6 flex-grow text-[15px] leading-relaxed text-muted">
              Banks <span className="mx-1 text-[var(--accent-secondary)]">•</span> Mutual Funds <span className="mx-1 text-[var(--accent-secondary)]">•</span> Insurance Companies <span className="mx-1 text-[var(--accent-secondary)]">•</span> Housing Finance Companies <span className="mx-1 text-[var(--accent-secondary)]">•</span> Non-Banking Financial Companies <span className="mx-1 text-[var(--accent-secondary)]">•</span> Venture Capital Funds <span className="mx-1 text-[var(--accent-secondary)]">•</span> Private Equity Funds <span className="mx-1 text-[var(--accent-secondary)]">•</span> Pension Funds <span className="mx-1 text-[var(--accent-secondary)]">•</span> Stock Brokers <span className="mx-1 text-[var(--accent-secondary)]">•</span> Depository Participants
            </p>
          </div>

          <div className="brand-card flex flex-col p-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--cloud)]">
                <Factory className="h-8 w-8 text-accent" strokeWidth={1.5} />
              </div>
              <div className="data-number text-4xl text-[var(--accent-secondary)]">02</div>
            </div>

            <h3 className="text-3xl font-bold text-accent">Manufacturing</h3>
            <div className="mt-5 h-px w-full bg-[var(--border)]" />

            <p className="mt-6 flex-grow text-[15px] leading-relaxed text-muted">
              Chemicals <span className="mx-1 text-[var(--accent-secondary)]">•</span> Packaging
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

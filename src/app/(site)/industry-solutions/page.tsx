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
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Industry Solutions" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 w-full relative">
        {/* Subtle ambient orb in the background */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent opacity-[0.03] rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto space-y-6 text-[16px] leading-relaxed text-muted mb-20 text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised border border-[var(--glass-border)] mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-bold text-ink uppercase tracking-wider">Our Expertise</span>
          </div>
          <p>
            Sabs Marks JVS PVT LTD has been providing knowledge-based solutions to its clients, helping them better understand the fundamentals and complexity of various issues, thereby enabling them to take strategic, data-driven decisions.
          </p>
          <p>
            In view of our in-house research, close relationships, and constant interactions with clients from diverse industries, we have built a well-developed and fully updated knowledge center. This enables us to cater to demands from diverse industries for a wide range of services across major functional areas.
          </p>
          <p className="font-medium text-ink">
            Our solutions are based on our long-drawn research, experience and expertise in specific industries and business environments. Some select sectors/industries serviced by us include:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 relative z-10">
          {/* BFSI Card */}
          <div className="glass-panel rounded-3xl p-10 flex flex-col group hover-glow relative overflow-hidden transition-all duration-700 hover:-translate-y-2 bg-surface/50 hover:bg-surface">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            {/* Top border highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
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

          {/* Manufacturing Card */}
          <div className="glass-panel rounded-3xl p-10 flex flex-col group hover-glow relative overflow-hidden transition-all duration-700 hover:-translate-y-2 bg-surface/50 hover:bg-surface md:translate-y-8">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            {/* Top border highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
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
      </section>
    </div>
  );
}

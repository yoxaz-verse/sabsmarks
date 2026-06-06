import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: "Learn about Sabs Marks JVS PVT LTD, our legacy, leadership, and advisory philosophy.",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="The Firm" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent opacity-[0.02] rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised border border-[var(--glass-border)] mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-xs font-bold text-ink uppercase tracking-wider">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 tracking-tight leading-tight">
              A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Trust</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent">Excellence.</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent rounded-full mb-10"></div>

            <div className="space-y-6 text-lg text-muted mb-12 leading-relaxed">
              <p>
                Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
              </p>
              <p>
                Established in 1985, the firm has grown into a trusted third-generation practice built on a legacy of expertise, integrity, and client-centric service. With a strong focus on the MSME sector, we support businesses of all sizes with tailored solutions that address both routine and complex business requirements.
              </p>
              <p>
                Guided by the values of Integrity, Competence, and Professionalism, our experienced team delivers strategic, practical, and legally sound advice to help clients navigate challenges, ensure compliance, and achieve sustainable growth through a personalized approach.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about/team" className="group flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-[#122b48] transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40">
                <span>Meet Our Leadership</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about/locations" className="group flex items-center justify-center gap-2 px-8 py-4 bg-surface-raised border border-[var(--glass-border)] text-ink font-bold rounded-xl hover:bg-surface transition-all shadow-sm hover:shadow-md">
                <span>Explore Our Locations</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:gap-8 relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none rounded-3xl scale-110"></div>

            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">35+</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Years of Trust</span>
            </div>

            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl translate-y-12">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent-secondary mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">15+</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Partners</span>
            </div>

            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent-secondary mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">250+</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Professionals</span>
            </div>

            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl translate-y-12">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">8</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Global Locations</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: "Learn about Sabs Marks JVS & Co., our legacy, leadership, and advisory philosophy.",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="The Firm" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full relative">
        {/* Subtle background element */}
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
                Sabs Marks JVS & Co. LLP is a premier chartered accountancy firm established to provide a comprehensive suite of professional services under one roof. 
              </p>
              <p>
                With a deep understanding of the evolving regulatory landscape, our team of seasoned professionals brings decades of experience to help organizations navigate complex business challenges, ensure compliance, and drive sustainable growth across domestic and multinational sectors.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about/team" className="group flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-[#122b48] transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40">
                <span>Meet Our Leadership</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about/locations" className="group flex items-center justify-center gap-2 px-8 py-4 bg-surface-raised border border-[var(--glass-border)] text-ink font-bold rounded-xl hover:bg-surface transition-all shadow-sm hover:shadow-md">
                <span>View Global Offices</span>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 lg:gap-8 relative">
            {/* Decorative background grid behind stats */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none rounded-3xl scale-110"></div>
            
            {/* Stat Card 1 */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">35+</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Years of Trust</span>
            </div>
            
            {/* Stat Card 2 */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl translate-y-12">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent-secondary mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">15+</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Partners</span>
            </div>
            
            {/* Stat Card 3 */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover-glow relative overflow-hidden transition-all duration-500 bg-surface/80 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-5xl md:text-6xl font-black text-accent-secondary mb-3 drop-shadow-sm group-hover:scale-110 transition-transform duration-500">250+</span>
              <span className="text-sm font-bold text-ink uppercase tracking-widest relative z-10">Professionals</span>
            </div>
            
            {/* Stat Card 4 */}
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

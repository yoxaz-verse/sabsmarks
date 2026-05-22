import Link from "next/link";
import { ArrowRight, BarChart3, Building2, Calculator, FileText, Globe2, Briefcase, Users, ShieldCheck, Database, Network } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[85vh] overflow-hidden bg-[var(--bg)]">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)] z-10" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center" />
          {/* subtle glowing orb effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 py-24 text-center md:text-left md:px-12 w-full flex flex-col items-center md:items-start">
          <div className="max-w-3xl glass-panel p-8 md:p-12 rounded-3xl animate-fade-in border-t border-[var(--accent)]/30 relative overflow-hidden group">
            {/* animated corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--accent)] to-transparent opacity-20" />
            
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-[var(--accent)] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--accent)]"></span>
              Strategic Financial Advisory
              <span className="w-8 h-[1px] bg-[var(--accent)] hidden md:block"></span>
            </p>
            <h1 className="text-4xl md:text-6xl md:leading-[1.1] font-bold tracking-tight text-white mb-6">
              Expert financial & business guidance.
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mb-8 leading-relaxed font-light">
              We provide strategic accounting, taxation, audit, and compliance services engineered to scale your enterprise with absolute precision.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/practice-areas" className="rounded-none bg-[var(--accent)]/10 border border-[var(--accent)] px-8 py-4 text-sm font-bold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.6)] uppercase tracking-widest">
                Initiate Systems
              </Link>
              <Link href="/contact" className="rounded-none border border-white/20 bg-black/40 backdrop-blur-md px-8 py-4 text-sm font-bold text-white hover:bg-white/10 hover:border-white/40 transition-colors uppercase tracking-widest">
                Establish Link
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative border-y border-[var(--glass-border)] bg-[var(--surface-raised)]/50 backdrop-blur-md z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: "35+", label: "Years Experience" },
              { number: "15+", label: "Partners" },
              { number: "250+", label: "Professionals" },
              { number: "08", label: "Global Nodes" },
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <div className="text-4xl md:text-5xl data-number text-white mb-2 group-hover:text-[var(--accent)] transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_var(--accent-glow)]">
                  {stat.number}
                </div>
                <div className="text-[var(--muted)] font-medium uppercase tracking-[0.2em] text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--surface)] to-transparent -z-10" />
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[500px] rounded-sm overflow-hidden glass-panel border border-[var(--glass-border)] group">
              <div className="absolute inset-0 bg-[var(--accent)]/10 z-10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1965&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
              {/* tech scanning line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] z-20 animate-[scanline_4s_linear_infinite]" />
            </div>
            
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-[var(--accent)] h-6 w-6" />
                <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Core Protocols</h2>
              </div>
              <div className="h-[2px] w-20 bg-[var(--accent)] mb-8 shadow-[0_0_8px_var(--accent)]"></div>
              <p className="text-lg text-stone-300 mb-6 leading-relaxed font-light">
                Sabs Marks JVS & Co is a multidisciplinary professional services firm offering a comprehensive suite of solutions under one roof. Established in 1985, our infrastructure has evolved into a trusted third-generation architecture, built on expertise, integrity, and absolute data fidelity.
              </p>
              <p className="text-stone-400 mb-8 leading-relaxed text-sm">
                Driven by Integrity, Competence, and Professionalism, our framework is backed by highly specialized nodes. We deliver strategic, legally sound algorithms designed to help businesses navigate complex regulatory matrices.
              </p>
              <Link href="/about" className="inline-flex items-center text-[var(--accent)] font-semibold hover:text-white transition-colors group tracking-widest uppercase text-sm border-b border-[var(--accent)] pb-1">
                Access Archives <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 relative bg-[var(--surface)]/40 border-y border-[var(--glass-border)]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Service Matrices</h2>
            <div className="h-[2px] w-20 bg-[var(--accent)] mx-auto mt-6 mb-6 shadow-[0_0_8px_var(--accent)]"></div>
            <p className="text-stone-400">Deploying specialized advisory, audit, and tax solutions configured for your enterprise architecture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Audit & Assurance", desc: "Statutory, internal, and management audits ensuring absolute compliance and transparency.", icon: Database },
              { title: "Direct Taxation", desc: "Corporate tax planning, compliance algorithms, and representation protocols.", icon: Calculator },
              { title: "Indirect Taxation", desc: "GST advisory, compliance monitoring, and structuring for optimized tax footprints.", icon: BarChart3 },
              { title: "Corporate Finance", desc: "M&A advisory, valuations, and due diligence frameworks for strategic scaling.", icon: Briefcase },
              { title: "Risk Advisory", desc: "Enterprise risk management, SOP compilation, and deep-level forensic audits.", icon: ShieldCheck },
              { title: "Outsourcing Nodes", desc: "End-to-end accounting, payroll execution, and compliance process outsourcing.", icon: Network },
            ].map((service, i) => (
              <div key={i} className="group glass-panel p-8 rounded-sm hover-glow relative overflow-hidden">
                {/* background glow on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--accent)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-full blur-2xl pointer-events-none" />
                
                <div className="h-12 w-12 rounded-sm border border-[var(--accent)]/30 bg-[var(--surface-raised)] flex items-center justify-center mb-6 group-hover:border-[var(--accent)] transition-colors duration-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                  <service.icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                <p className="text-stone-400 mb-6 line-clamp-2 text-sm font-light">{service.desc}</p>
                <Link href="/practice-areas" className="text-[var(--accent-secondary)] font-semibold text-xs uppercase tracking-widest flex items-center group/link">
                  Execute Query <ArrowRight className="ml-2 h-3 w-3 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase mb-6">Target Sectors</h2>
              <div className="h-[2px] w-20 bg-[var(--accent-secondary)] mb-6 shadow-[0_0_8px_var(--accent-secondary)]"></div>
              <p className="text-stone-400 text-lg">Our industry-focused approach deploys customized solutions that address sector-specific anomalies.</p>
            </div>
            <Link href="/industry-solutions" className="glass-panel text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)] transition-colors whitespace-nowrap">
              Scan All Sectors
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Financial Services", "Manufacturing", "Real Estate & Infra", "IT & ITES", "Healthcare", "Retail & FMCG", "Logistics", "NGOs & Trusts"].map((industry, i) => (
              <div key={i} className="glass-panel p-6 rounded-sm hover:border-[var(--accent-secondary)] transition-colors flex flex-col justify-between h-32 group cursor-crosshair">
                <Building2 className="h-6 w-6 text-stone-500 group-hover:text-[var(--accent-secondary)] transition-colors" />
                <span className="font-semibold text-stone-300 group-hover:text-white text-sm tracking-wide">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

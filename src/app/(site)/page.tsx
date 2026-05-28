import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

import { ArrowRight, BarChart3, Building2, Calculator, Briefcase, ShieldCheck, Database, Network } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  description: "Chartered accounting services across audit, tax, advisory, and compliance for growing businesses.",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center min-h-[90vh] overflow-hidden bg-bg">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/95 to-bg/20 z-10 dark:from-bg dark:via-bg/95 dark:to-bg/50" />
          <div className="absolute inset-0 opacity-70 dark:opacity-50 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 py-24 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-3xl animate-fade-in relative z-20 w-full">
            <div className="inline-flex items-center gap-3 mb-8 border-l-2 border-accent pl-4 bg-accent/5 pr-5 py-2 rounded-r-full backdrop-blur-sm border-y border-r border-[var(--glass-border)]">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <p className="text-xs font-bold tracking-[0.25em] text-accent uppercase">
                Strategic Financial Advisory
              </p>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-ink mb-6 leading-[1.1] drop-shadow-sm pb-2">
              Expert financial &<br /> business guidance.
            </h1>
            
            <p className="text-lg md:text-xl text-ink/80 dark:text-muted mb-12 leading-relaxed font-medium max-w-2xl border-l-2 border-[var(--glass-border)] pl-5 ml-1">
              We provide strategic accounting, taxation, audit, and compliance services engineered to scale your enterprise with absolute precision.
            </p>
            
            <div className="flex flex-wrap gap-5 pl-1">
              <Link href="/practice-areas" className="relative overflow-hidden bg-accent text-white px-8 py-4 text-sm font-semibold hover:bg-accent/90 transition-all duration-300 rounded-sm tracking-wide shadow-sm group flex items-center gap-3 hover:-translate-y-0.5">
                <span className="relative z-10">Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
              <Link href="/contact" className="glass-panel px-8 py-4 text-sm font-semibold text-ink hover:text-accent transition-all duration-300 rounded-sm tracking-wide flex items-center gap-3 group hover:-translate-y-0.5 bg-surface/50">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative border-y border-[var(--glass-border)] bg-surface-raised/80 backdrop-blur-md z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: "35+", label: "Years Experience" },
              { number: "15+", label: "Partners" },
              { number: "250+", label: "Professionals" },
              { number: "08", label: "Global Offices" },
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <div className="text-4xl md:text-5xl data-number text-ink mb-2 group-hover:text-accent transition-colors drop-shadow-sm">
                  <AnimatedNumber text={stat.number} />
                </div>
                <div className="text-muted font-medium uppercase tracking-[0.2em] text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 relative overflow-hidden bg-bg">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--surface)] to-transparent -z-10" />
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[500px] rounded-sm overflow-hidden glass-panel border border-[var(--glass-border)] group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1965&auto=format&fit=crop')] bg-cover bg-center opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
            
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-accent h-6 w-6" />
                <h2 className="text-3xl font-bold text-ink tracking-tight uppercase">Our Values</h2>
              </div>
              <div className="h-[2px] w-20 bg-accent mb-8"></div>
              <p className="text-lg text-muted mb-6 leading-relaxed font-light">
                Sabs Marks JVS & Co is a multidisciplinary professional services firm offering a comprehensive suite of solutions under one roof. Established in 1985, our firm has evolved into a trusted advisory partner, built on expertise, integrity, and absolute professionalism.
              </p>
              <p className="text-muted mb-8 leading-relaxed text-sm opacity-80">
                Driven by Integrity, Competence, and Professionalism, our framework is backed by highly specialized professionals. We deliver strategic, legally sound solutions designed to help businesses navigate complex regulatory environments.
              </p>
              <Link href="/about" className="inline-flex items-center text-accent font-semibold hover:text-ink transition-colors group tracking-widest uppercase text-sm border-b border-accent pb-1">
                Learn About Us <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 relative bg-surface-raised border-y border-[var(--glass-border)]">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-ink tracking-tight uppercase">Our Practice Areas</h2>
            <div className="h-[2px] w-20 bg-accent mx-auto mt-6 mb-6"></div>
            <p className="text-muted">Deploying specialized advisory, audit, and tax solutions configured for your business needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Audit & Assurance", desc: "Statutory, internal, and management audits ensuring absolute compliance and transparency.", icon: Database },
              { title: "Direct Taxation", desc: "Corporate tax planning, compliance structuring, and representation.", icon: Calculator },
              { title: "Indirect Taxation", desc: "GST advisory, compliance monitoring, and structuring for optimized tax footprints.", icon: BarChart3 },
              { title: "Corporate Finance", desc: "M&A advisory, valuations, and due diligence frameworks for strategic scaling.", icon: Briefcase },
              { title: "Risk Advisory", desc: "Enterprise risk management, SOP compilation, and deep-level forensic audits.", icon: ShieldCheck },
              { title: "Outsourcing Services", desc: "End-to-end accounting, payroll execution, and compliance process outsourcing.", icon: Network },
            ].map((service, i) => (
              <div key={i} className="group glass-panel p-8 rounded-sm hover-glow relative overflow-hidden bg-surface">
                <div className="h-12 w-12 rounded-sm border border-accent/30 bg-surface-raised flex items-center justify-center mb-6 group-hover:border-accent transition-colors duration-300">
                  <service.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-ink mb-3 tracking-wide">{service.title}</h3>
                <p className="text-muted mb-6 line-clamp-2 text-sm font-light">{service.desc}</p>
                <Link href="/practice-areas" className="text-accent-secondary font-semibold text-xs uppercase tracking-widest flex items-center group/link">
                  Learn More <ArrowRight className="ml-2 h-3 w-3 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 relative overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-ink uppercase mb-6">Industries We Serve</h2>
              <div className="h-[2px] w-20 bg-accent-secondary mb-6"></div>
              <p className="text-muted text-lg">Our industry-focused approach deploys customized solutions that address sector-specific challenges.</p>
            </div>
            <Link href="/industry-solutions" className="glass-panel text-ink bg-surface px-6 py-3 text-sm font-bold uppercase tracking-widest hover:border-[var(--accent-secondary)] hover:text-accent-secondary transition-colors whitespace-nowrap">
              View All Industries
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Financial Services", "Manufacturing", "Real Estate & Infra", "IT & ITES", "Healthcare", "Retail & FMCG", "Logistics", "NGOs & Trusts"].map((industry, i) => (
              <div key={i} className="glass-panel bg-surface p-6 rounded-sm hover:border-[var(--accent-secondary)] transition-colors flex flex-col justify-between h-32 group">
                <Building2 className="h-6 w-6 text-muted group-hover:text-accent-secondary transition-colors" />
                <span className="font-semibold text-ink text-sm tracking-wide">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

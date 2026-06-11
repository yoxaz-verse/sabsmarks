import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

import { ArrowRight, TrendingUp, Database, Calculator, Scale, Briefcase, RefreshCw, Cpu, ArrowUpRight, ShieldCheck, Building2, Landmark, Factory, HeartPulse, ShoppingBag, Truck, Heart } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ImageFeatureCard } from "@/components/media/image-feature-card";
import { SITE_VISUALS } from "@/lib/site-visuals";
import { SiteOrnament } from "@/components/decorative/site-ornament";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  description: "Chartered accounting services across audit, tax, advisory, and compliance for growing businesses.",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="site-section relative flex min-h-[88vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Creative floating elements (CSS-only for zero performance impact) */}
          <div className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] rounded-full bg-accent/15 mix-blend-multiply blur-[120px] animate-blob dark:mix-blend-screen dark:bg-blue-500/10" />
          <div className="absolute top-[20%] -right-[10%] w-[35rem] h-[35rem] rounded-full bg-blue-400/15 mix-blend-multiply blur-[120px] animate-blob dark:mix-blend-screen dark:bg-indigo-500/10" style={{ animationDelay: "2s" }} />
          <div className="absolute -bottom-[20%] left-[20%] w-[45rem] h-[45rem] rounded-full bg-indigo-500/10 mix-blend-multiply blur-[130px] animate-blob dark:mix-blend-screen dark:bg-purple-500/10" style={{ animationDelay: "4s" }} />

          <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(244,247,251,0.92)_0%,rgba(244,247,251,0.88)_42%,rgba(244,247,251,0.78)_72%,rgba(244,247,251,0.62)_100%)] dark:bg-[linear-gradient(90deg,rgba(9,17,31,0.96)_0%,rgba(9,17,31,0.9)_42%,rgba(9,17,31,0.62)_72%,rgba(9,17,31,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-18 dark:opacity-42 animate-slow-zoom-out" />
        </div>

        {/* Dynamic, interactive grid and orbit ornament */}
        <SiteOrnament mode="hero" interactive className="opacity-70 dark:opacity-55" />

        <div className="site-container relative z-20 w-full py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
            <div className="max-w-3xl relative z-20">
              <div className="section-kicker text-accent animate-hero-kicker">
                Strategic Financial Advisory
              </div>

              <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tighter text-ink dark:text-white md:text-6xl lg:text-[5.15rem] lg:leading-[1.02] animate-hero-title">
                Expert financial & <span className="text-gradient">business guidance.</span>
              </h1>

              <p className="mt-8 max-w-2xl border-l-2 border-black/8 pl-5 text-lg leading-relaxed text-muted dark:border-white/12 dark:text-slate-200 md:text-xl animate-hero-desc">
                We provide strategic accounting, taxation, audit, and compliance services engineered to scale your enterprise with absolute precision.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 animate-hero-ctas">
                <Link href="/practice-areas" className="group inline-flex items-center gap-3 rounded-2xl bg-accent px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_18px_40px_rgba(30,58,138,0.32)]">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/72 px-8 py-4 text-sm font-semibold tracking-wide text-ink backdrop-blur-sm hover:bg-white dark:border-white/12 dark:bg-white/6 dark:text-white dark:hover:bg-white/10">
                  Contact Us
                </Link>
              </div>

              <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 xl:grid-cols-4 animate-hero-stats">
                {[
                  { number: "35+", label: "Years Experience" },
                  { number: "15+", label: "Partners" },
                  { number: "250+", label: "Professionals" },
                  { number: "08", label: "Global Offices" },
                ].map((stat, i) => (
                  <div key={i} className="creative-card decorated-panel group rounded-2xl px-5 py-5 overflow-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
                    <SiteOrnament mode="card" className="opacity-15 group-hover:opacity-30 transition-opacity" />
                    <div className="text-3xl data-number font-black text-gradient bg-gradient-to-r from-accent to-blue-500">
                      <AnimatedNumber text={stat.number} />
                    </div>
                    <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted group-hover:text-ink transition-colors relative z-10">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-hero-aside">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-accent/30 via-blue-400/20 to-transparent blur-2xl opacity-60 animate-blob dark:from-accent/20 dark:via-indigo-500/10 dark:opacity-40" style={{ animationDelay: "1s" }} />
              <GlowCard className="decorated-panel relative rounded-[2rem] overflow-hidden">
                <SiteOrnament mode="card" className="opacity-40" />
                <div className="p-7 md:p-8">
                  <div className="section-kicker">Why Clients Stay</div>
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink md:text-4xl">Institutional discipline, built for high-stakes work.</h2>
                  <div className="section-rule"></div>
                  <p className="section-copy mt-6 max-w-none">
                    Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
                  </p>
                  <p className="site-prose mt-5">
                    We combine advisory depth, execution discipline, and regulator-aware thinking so leadership teams can move with clarity across audit, tax, finance, and governance decisions.
                  </p>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="site-section py-10 md:py-12">
        <div className="site-container">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
            <div className="section-header reveal reveal-left">
              <div className="section-kicker">Our Values</div>
              <h2 className="section-title">Professional judgement presented with <span className="text-gradient">more clarity.</span></h2>
              <div className="section-rule"></div>
              <p className="section-copy">
                Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
              </p>
              <p className="site-prose mt-5 max-w-3xl">
                Driven by Integrity, Competence, and Professionalism, our framework is backed by highly specialized professionals. We deliver strategic, legally sound solutions designed to help businesses navigate complex regulatory environments.
              </p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Learn About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { value: "35+", label: "Years of Trust" },
                { value: "15+", label: "Partners" },
                { value: "250+", label: "Professionals" },
                { value: "08", label: "Global Locations" },
              ].map((item, index) => (
                <div key={item.label} className={`reveal reveal-up ${index % 2 === 1 ? "sm:translate-y-8" : ""}`} style={{ transitionDelay: `${index * 120}ms` }}>
                  <GlowCard className="creative-card decorated-panel group rounded-[1.6rem] overflow-hidden">
                    <div className="p-6">
                      <SiteOrnament mode="card" className="opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="text-4xl font-black text-gradient bg-gradient-to-r from-accent to-blue-500">{item.value}</div>
                      <div className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-ink group-hover:text-accent transition-colors relative z-10">{item.label}</div>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="site-section py-12 md:py-16">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                src: SITE_VISUALS.home.advisory,
                alt: "Finance leaders discussing advisory strategy around a boardroom table.",
                eyebrow: "Advisory",
                title: "Boardroom clarity for complex financial decisions.",
                description: "Partner-led engagements translate audit, tax, and governance complexity into practical decision-making frameworks.",
                href: "/about",
                ctaLabel: "About the firm",
                priority: true,
              },
              {
                src: SITE_VISUALS.home.audit,
                alt: "Professional reviewing audit and compliance documents.",
                eyebrow: "Execution",
                title: "Operational discipline that stands up to scrutiny.",
                description: "Our teams structure reporting, control environments, and compliance execution for high-stakes business contexts.",
                href: "/practice-areas",
                ctaLabel: "View services",
              },
              {
                src: SITE_VISUALS.home.industry,
                alt: "Business professionals reviewing industry reports and strategy documents.",
                eyebrow: "Industry Context",
                title: "Cross-sector perspective that accelerates the right next step.",
                description: "We pair regulatory awareness with commercial context so leadership teams can move faster with fewer blind spots.",
                href: "/industry-solutions",
                ctaLabel: "See industries",
              }
            ].map((card, i) => (
              <div key={i} className="reveal reveal-up" style={{ transitionDelay: `${i * 150}ms` }}>
                <ImageFeatureCard
                  src={card.src}
                  alt={card.alt}
                  eyebrow={card.eyebrow}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  ctaLabel={card.ctaLabel}
                  priority={card.priority}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="site-section py-16 md:py-20">
        <div className="site-container">
          <div className="section-header mx-auto text-center reveal reveal-up">
            <div className="section-kicker mx-auto justify-center">Our Services</div>
            <h2 className="section-title">Specialized capabilities, organized for <span className="text-gradient">faster decision-making.</span></h2>
            <div className="section-rule mx-auto"></div>
            <p className="section-copy mx-auto">Deploying specialized advisory, audit, and tax solutions configured for your business needs.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                id: "corporate-finance-advisory",
                title: "Corporate Finance Advisory",
                desc: "Strategic guidance on fundraising, bank finance, valuations, pre-listing preparedness, and capital structuring.",
                icon: TrendingUp,
              },
              {
                id: "audit-assurance",
                title: "Audit & Assurance",
                desc: "Statutory, internal, tax, concurrent, transfer pricing, and management audits built for regulatory readiness.",
                icon: Database,
              },
              {
                id: "tax-regulatory-services",
                title: "Tax & Regulatory Services",
                desc: "Direct and indirect tax advisory, compliance monitoring, assessments, and structured litigation support.",
                icon: Calculator,
              },
              {
                id: "corporate-other-laws",
                title: "Corporate & Other Laws",
                desc: "Corporate law compliance, secretarial filings, and board governance frameworks to protect growth.",
                icon: Scale,
              },
              {
                id: "cfo-business-advisory",
                title: "CFO & Business Advisory",
                desc: "MIS design, budgeting, forecasting, cash-flow discipline, and data-led strategic decision support.",
                icon: Briefcase,
              },
              {
                id: "business-process-reengineering",
                title: "Business Process Re-Engineering",
                desc: "Reviewing and redesigning critical business processes to eliminate control gaps and bottlenecks.",
                icon: RefreshCw,
              },
              {
                id: "digital-transformation-systems-advisory",
                title: "Digital Transformation & Systems Advisory",
                desc: "System-agnostic advisory on ERP scope, digital workflows, and automation aligned with reporting needs.",
                icon: Cpu,
              },
              {
                id: "business-revival-organisational-revamping",
                title: "Business Revival & Organisational Revamping",
                desc: "Revenue and profit maximisation, operational diagnosis, cost rationalisation, and restructuring support.",
                icon: ArrowUpRight,
              },
              {
                id: "risk-controls-forensics",
                title: "Risk, Controls & Forensics",
                desc: "Enterprise risk management frameworks, information system audits, and forensic investigation assignments.",
                icon: ShieldCheck,
              },
            ].map((service, i) => (
              <div key={i} className="reveal reveal-up" style={{ transitionDelay: `${(i % 3) * 120}ms` }}>
                <GlowCard className="creative-card decorated-panel group rounded-[1.75rem] overflow-hidden h-full">
                  <div className="p-7">
                    <SiteOrnament mode="card" className="opacity-25 group-hover:opacity-45 transition-opacity" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <service.icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-ink group-hover:text-gradient transition-colors">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{service.desc}</p>
                    <Link href={`/practice-areas?tab=${service.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent relative z-10">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="site-section py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between reveal reveal-up">
            <div className="section-header">
              <div className="section-kicker">Industries We Serve</div>
              <h2 className="section-title">Coverage that helps clients find the right <span className="text-gradient">entry point quickly.</span></h2>
              <div className="section-rule"></div>
              <p className="section-copy">Our industry-focused approach deploys customized solutions that address sector-specific challenges.</p>
            </div>

            <Link href="/industry-solutions" className="inline-flex items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_74%,transparent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink hover:border-accent hover:text-accent">
              View All Industries
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Financial Services", icon: Landmark },
              { name: "Manufacturing", icon: Factory },
              { name: "Real Estate & Infra", icon: Building2 },
              { name: "IT & ITES", icon: Cpu },
              { name: "Healthcare", icon: HeartPulse },
              { name: "Retail & FMCG", icon: ShoppingBag },
              { name: "Logistics", icon: Truck },
              { name: "NGOs & Trusts", icon: Heart },
            ].map((industry, i) => (
              <div key={i} className="reveal reveal-up" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                <GlowCard className="creative-card decorated-panel group flex h-36 flex-col justify-between rounded-[1.5rem] overflow-hidden">
                  <div className="p-5 flex flex-col justify-between h-full w-full">
                    <SiteOrnament mode="card" className="opacity-15 group-hover:opacity-35 transition-opacity" />
                    <industry.icon className="h-6 w-6 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="text-sm font-semibold leading-6 text-ink group-hover:text-gradient relative z-10">{industry.name}</span>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

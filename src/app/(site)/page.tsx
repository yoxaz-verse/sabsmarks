import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

import { ArrowRight, BarChart3, Building2, Calculator, Briefcase, ShieldCheck, Database, Network } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ImageFeatureCard } from "@/components/media/image-feature-card";
import { SITE_VISUALS } from "@/lib/site-visuals";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  description: "Chartered accounting services across audit, tax, advisory, and compliance for growing businesses.",
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="site-section relative flex min-h-[88vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(244,247,251,0.92)_0%,rgba(244,247,251,0.88)_42%,rgba(244,247,251,0.78)_72%,rgba(244,247,251,0.62)_100%)] dark:bg-[linear-gradient(90deg,rgba(9,17,31,0.96)_0%,rgba(9,17,31,0.9)_42%,rgba(9,17,31,0.62)_72%,rgba(9,17,31,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-18 dark:opacity-42" />
        </div>

        <div className="site-container relative z-20 w-full py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
            <div className="max-w-3xl animate-fade-in relative z-20">
              <div className="section-kicker text-accent">
                Strategic Financial Advisory
              </div>

              <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tighter text-ink dark:text-white md:text-6xl lg:text-[5.15rem] lg:leading-[1.02]">
                Expert financial & business guidance.
              </h1>

              <p className="mt-8 max-w-2xl border-l-2 border-black/8 pl-5 text-lg leading-relaxed text-muted dark:border-white/12 dark:text-slate-200 md:text-xl">
                We provide strategic accounting, taxation, audit, and compliance services engineered to scale your enterprise with absolute precision.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/practice-areas" className="group inline-flex items-center gap-3 rounded-2xl bg-accent px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_18px_40px_rgba(30,58,138,0.32)]">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/72 px-8 py-4 text-sm font-semibold tracking-wide text-ink backdrop-blur-sm hover:bg-white dark:border-white/12 dark:bg-white/6 dark:text-white dark:hover:bg-white/10">
                  Contact Us
                </Link>
              </div>

              <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { number: "35+", label: "Years Experience" },
                  { number: "15+", label: "Partners" },
                  { number: "250+", label: "Professionals" },
                  { number: "08", label: "Global Offices" },
                ].map((stat, i) => (
                  <div key={i} className="site-card interactive-card rounded-2xl px-5 py-5">
                    <div className="text-3xl data-number text-ink">
                      <AnimatedNumber text={stat.number} />
                    </div>
                    <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="site-card rounded-[2rem] p-7 md:p-8">
              <div className="section-kicker">Why Clients Stay</div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-ink md:text-4xl">Institutional discipline, built for high-stakes work.</h2>
              <div className="section-rule"></div>
              <p className="section-copy mt-6 max-w-none">
                Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
              </p>
              <p className="site-prose mt-5">
                We combine advisory depth, execution discipline, and regulator-aware thinking so leadership teams can move with clarity across audit, tax, finance, and governance decisions.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="site-section py-10 md:py-12">
        <div className="site-container">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
            <div className="section-header">
              <div className="section-kicker">Our Values</div>
              <h2 className="section-title">Professional judgement presented with more clarity.</h2>
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
                <div key={item.label} className={`site-card interactive-card rounded-[1.6rem] p-6 ${index % 2 === 1 ? "sm:translate-y-8" : ""}`}>
                  <div className="text-4xl font-black text-accent">{item.value}</div>
                  <div className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-ink">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section py-12 md:py-16">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-3">
            <ImageFeatureCard
              src={SITE_VISUALS.home.advisory}
              alt="Finance leaders discussing advisory strategy around a boardroom table."
              eyebrow="Advisory"
              title="Boardroom clarity for complex financial decisions."
              description="Partner-led engagements translate audit, tax, and governance complexity into practical decision-making frameworks."
              href="/about"
              ctaLabel="About the firm"
              priority
            />
            <ImageFeatureCard
              src={SITE_VISUALS.home.audit}
              alt="Professional reviewing audit and compliance documents."
              eyebrow="Execution"
              title="Operational discipline that stands up to scrutiny."
              description="Our teams structure reporting, control environments, and compliance execution for high-stakes business contexts."
              href="/practice-areas"
              ctaLabel="View services"
            />
            <ImageFeatureCard
              src={SITE_VISUALS.home.industry}
              alt="Business professionals reviewing industry reports and strategy documents."
              eyebrow="Industry Context"
              title="Cross-sector perspective that accelerates the right next step."
              description="We pair regulatory awareness with commercial context so leadership teams can move faster with fewer blind spots."
              href="/industry-solutions"
              ctaLabel="See industries"
            />
          </div>
        </div>
      </section>

      <section className="site-section py-16 md:py-20">
        <div className="site-container">
          <div className="section-header mx-auto text-center">
            <div className="section-kicker mx-auto justify-center">Our Services</div>
            <h2 className="section-title">Specialized capabilities, organized for faster decision-making.</h2>
            <div className="section-rule mx-auto"></div>
            <p className="section-copy mx-auto">Deploying specialized advisory, audit, and tax solutions configured for your business needs.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              { title: "Audit & Assurance", desc: "Statutory, internal, and management audits ensuring absolute compliance and transparency.", icon: Database },
              { title: "Direct Taxation", desc: "Corporate tax planning, compliance structuring, and representation.", icon: Calculator },
              { title: "Indirect Taxation", desc: "GST advisory, compliance monitoring, and structuring for optimized tax footprints.", icon: BarChart3 },
              { title: "Corporate Finance", desc: "M&A advisory, valuations, and due diligence frameworks for strategic scaling.", icon: Briefcase },
              { title: "Risk Advisory", desc: "Enterprise risk management, SOP compilation, and deep-level forensic audits.", icon: ShieldCheck },
              { title: "Outsourcing Services", desc: "End-to-end accounting, payroll execution, and compliance process outsourcing.", icon: Network },
            ].map((service, i) => (
              <div key={i} className="site-card interactive-card group rounded-[1.75rem] p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{service.desc}</p>
                <Link href="/practice-areas" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section py-16 md:py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="section-header">
              <div className="section-kicker">Industries We Serve</div>
              <h2 className="section-title">Coverage that helps clients find the right entry point quickly.</h2>
              <div className="section-rule"></div>
              <p className="section-copy">Our industry-focused approach deploys customized solutions that address sector-specific challenges.</p>
            </div>

            <Link href="/industry-solutions" className="inline-flex items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_74%,transparent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink hover:border-accent hover:text-accent">
              View All Industries
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Financial Services", "Manufacturing", "Real Estate & Infra", "IT & ITES", "Healthcare", "Retail & FMCG", "Logistics", "NGOs & Trusts"].map((industry, i) => (
              <div key={i} className="site-card-soft interactive-card flex h-36 flex-col justify-between rounded-[1.5rem] p-5">
                <Building2 className="h-6 w-6 text-accent" />
                <span className="text-sm font-semibold leading-6 text-ink">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

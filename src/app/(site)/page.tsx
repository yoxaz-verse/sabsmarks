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
  const heroProofPoints = [
    { number: "35+", label: "Years Experience" },
    { number: "15+", label: "Partners" },
    { number: "250+", label: "Professionals" },
    { number: "08", label: "Global Offices" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20 lg:py-24">
          <div className="hero-frame overflow-hidden rounded-[1rem] bg-[var(--surface)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)]">
              <div className="animate-fade-in px-8 py-10 md:px-12 md:py-14 lg:px-14 lg:py-16">
                <div className="max-w-3xl">
                  <p className="brand-kicker mb-6">Strategic Financial Advisory</p>
                  <h1 className="max-w-[8ch] text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] text-accent md:max-w-[9ch] md:text-6xl lg:text-[6.25rem]">
                    Expert financial &amp; business guidance.
                  </h1>
                  <div className="brand-rule mt-8" />
                  <p className="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl">
                    We provide strategic accounting, taxation, audit, and compliance services engineered to scale your enterprise with absolute precision.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link href="/practice-areas" className="brand-button">
                      <span>Explore Services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href="/contact" className="brand-button brand-button-secondary">
                      Contact Us
                    </Link>
                  </div>
                  <div className="mt-12 max-w-2xl border-t border-[var(--border)] pt-6">
                    <div className="hero-proof-grid md:grid-cols-4">
                      {heroProofPoints.map((stat) => (
                        <div key={stat.label} className="hero-proof-item md:border-t-0 md:pt-0">
                          <div className="data-number text-2xl text-accent md:text-3xl">
                            {stat.number}
                          </div>
                          <div className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted md:text-[0.72rem]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)] bg-[var(--cloud)] lg:border-t-0 lg:border-l">
                <div className="flex h-full flex-col justify-between px-8 py-10 md:px-12 md:py-14 lg:px-12 lg:py-16">
                  <div className="max-w-xl">
                    <p className="brand-kicker mb-4">Considered Judgement</p>
                    <h2 className="text-3xl font-bold leading-tight text-accent md:text-4xl lg:text-[3.1rem]">
                      Institutional Trust.
                    </h2>
                    <div className="hero-panel-divider mt-8" />
                    <p className="mt-8 text-[15px] leading-8 text-muted md:text-base">
                      Sabs Marks JVS &amp; Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
                    </p>
                    <p className="mt-5 text-[15px] leading-8 text-muted md:text-base">
                      We deliver structured, legally sound, and execution-focused solutions for businesses operating in high-stakes regulatory and strategic environments.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
                    {heroProofPoints.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <div className="data-number text-2xl text-accent">
                          {stat.number}
                        </div>
                        <div className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--cloud)] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {heroProofPoints.map((stat) => (
              <div key={stat.label}>
                <div className="data-number text-4xl text-accent md:text-5xl">
                  <AnimatedNumber text={stat.number} />
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-12 lg:grid-cols-2 lg:items-center">
          <div className="brand-card min-h-[26rem] p-8 md:p-10">
            <p className="brand-kicker mb-4">Our Values</p>
            <h2 className="text-3xl font-bold uppercase text-accent">Our Values</h2>
            <div className="brand-rule mt-6" />
            <p className="mt-8 text-lg leading-8 text-muted">
              Sabs Marks JVS &amp; Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted">
              Driven by Integrity, Competence, and Professionalism, our framework is backed by highly specialized professionals. We deliver strategic, legally sound solutions designed to help businesses navigate complex regulatory environments.
            </p>
            <Link href="/about" className="brand-link mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]">
              Learn About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="brand-card grid gap-4 p-8 md:grid-cols-2 md:p-10">
            {[
              "Confidentiality-first engagement culture",
              "Regulator-aware documentation standards",
              "Institutional reporting discipline",
              "Partner-led technical oversight",
            ].map((item) => (
              <div key={item} className="border-b border-[var(--border)] py-5 last:border-b-0 md:last:border-b md:[&:nth-last-child(-n+2)]:border-b-0">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="brand-kicker inline-flex">Practice Areas</p>
            <h2 className="mt-6 text-3xl font-bold uppercase text-accent">Our Services</h2>
            <div className="brand-rule mx-auto mt-6" />
            <p className="mt-6 text-muted">Deploying specialized advisory, audit, and tax solutions configured for your business needs.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Audit & Assurance", desc: "Statutory, internal, and management audits ensuring absolute compliance and transparency.", icon: Database },
              { title: "Direct Taxation", desc: "Corporate tax planning, compliance structuring, and representation.", icon: Calculator },
              { title: "Indirect Taxation", desc: "GST advisory, compliance monitoring, and structuring for optimized tax footprints.", icon: BarChart3 },
              { title: "Corporate Finance", desc: "M&A advisory, valuations, and due diligence frameworks for strategic scaling.", icon: Briefcase },
              { title: "Risk Advisory", desc: "Enterprise risk management, SOP compilation, and deep-level forensic audits.", icon: ShieldCheck },
              { title: "Outsourcing Services", desc: "End-to-end accounting, payroll execution, and compliance process outsourcing.", icon: Network },
            ].map((service) => (
              <div key={service.title} className="brand-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--cloud)]">
                  <service.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-accent">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{service.desc}</p>
                <Link href="/practice-areas" className="brand-link mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                  Learn More <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="brand-kicker mb-4">Industry Coverage</p>
              <h2 className="text-3xl font-bold uppercase text-accent">Industries We Serve</h2>
              <div className="brand-rule mt-6" />
              <p className="mt-6 text-lg text-muted">Our industry-focused approach deploys customized solutions that address sector-specific challenges.</p>
            </div>
            <Link href="/industry-solutions" className="brand-button brand-button-secondary">
              View All Industries
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Financial Services", "Manufacturing", "Real Estate & Infra", "IT & ITES", "Healthcare", "Retail & FMCG", "Logistics", "NGOs & Trusts"].map((industry) => (
              <div key={industry} className="brand-card flex h-32 flex-col justify-between p-6">
                <Building2 className="h-6 w-6 text-accent" />
                <span className="text-sm font-semibold tracking-[0.03em] text-ink">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

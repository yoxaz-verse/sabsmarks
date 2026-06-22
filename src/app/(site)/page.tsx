import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Cpu,
  Database,
  FileSearch,
  GitBranch,
  Handshake,
  Layers3,
  RefreshCw,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

import { CanvasParticles } from "@/components/decorative/canvas-particles";
import { SiteOrnament } from "@/components/decorative/site-ornament";
import { AdvisoryCarousel } from "@/components/media/advisory-carousel";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: "Home",
  description: "Chartered accounting services across audit, tax, advisory, and compliance for growing businesses.",
});

const credibilityItems = [
  { icon: ShieldCheck, label: "Regulator-aware advisory" },
  { icon: ClipboardCheck, label: "Partner-led execution" },
  { icon: GitBranch, label: "Integrated tax, audit, and finance" },
  { icon: Handshake, label: "Long-term client relationships" },
];

const advisoryEntryPoints = [
  { icon: TrendingUp, title: "Growth & Expansion", text: "Advisory support for businesses pursuing sustainable growth and new opportunities." },
  { icon: ShieldCheck, title: "Regulatory Confidence", text: "Proactive compliance and tax solutions to help manage risks effectively." },
  { icon: Calculator, title: "Financial Clarity", text: "Meaningful reporting and performance insights for better business decisions." },
  { icon: ClipboardCheck, title: "Governance Excellence", text: "Robust controls and governance practices that build stakeholder trust." },
];

const advisorySnapshot = [
  { icon: Compass, title: "Strategic Advisory", text: "Helping leadership teams navigate financial, regulatory, and business-critical decisions with clarity and confidence." },
  { icon: ShieldCheck, title: "Integrated Compliance", text: "Seamlessly managing audit, tax, regulatory, and governance requirements through a coordinated service framework." },
  { icon: Target, title: "Outcome-Focused Execution", text: "Delivering practical solutions, structured reporting, and continuous support aligned with your business objectives." },
];

const valueStats = [
  { value: "35+", label: "Years of Trust", text: "A long operating memory across business cycles, sectors, and regulatory change." },
  { value: "18+", label: "Partners", text: "Senior attention for decisions where accuracy, judgement, and timing matter." },
  { value: "250+", label: "Professionals", text: "Specialist depth across tax, assurance, advisory, systems, and controls." },
  { value: "10", label: "Global Locations", text: "Connected presence for domestic, cross-border, and multinational priorities." },
];

const processSteps = [
  {
    step: "01",
    title: "Business and risk diagnosis",
    text: "Understand the commercial priorities, obligations, and risk signals shaping the engagement.",
    icon: FileSearch,
  },
  {
    step: "02",
    title: "Clear scope definition focused on outcomes",
    text: "Define the work clearly around practical deliverables, timelines, and decision needs.",
    icon: Layers3,
  },
  {
    step: "03",
    title: "Execution by domain specialists",
    text: "Bring the right audit, tax, compliance, accounting, and advisory specialists into the work.",
    icon: Target,
  },
  {
    step: "04",
    title: "Senior review and quality control",
    text: "Apply partner-led review discipline so the output is accurate, useful, and professionally controlled.",
    icon: Compass,
  },
  {
    step: "05",
    title: "Ongoing advisory and monitoring support",
    text: "Stay connected after execution with monitoring, guidance, and timely advisory support.",
    icon: RefreshCw,
  },
];

const services = [
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
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="home-hero site-section relative flex min-h-[86vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-[14%] -top-[12%] h-[38rem] w-[38rem] rounded-full bg-accent/14 blur-[118px] mix-blend-multiply dark:bg-accent/10 dark:mix-blend-screen" />
          <div className="absolute -right-[12%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-accent-secondary/14 blur-[120px] mix-blend-multiply dark:bg-accent-secondary/10 dark:mix-blend-screen" />
          <div className="absolute bottom-[-24%] left-[28%] h-[42rem] w-[42rem] rounded-full bg-accent/8 blur-[130px] mix-blend-multiply dark:bg-white/5 dark:mix-blend-screen" />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(244,247,251,0.96)_0%,rgba(244,247,251,0.9)_46%,rgba(244,247,251,0.72)_78%,rgba(244,247,251,0.58)_100%)] dark:bg-[linear-gradient(90deg,rgba(9,17,31,0.98)_0%,rgba(9,17,31,0.91)_48%,rgba(9,17,31,0.66)_78%,rgba(9,17,31,0.44)_100%)]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-14 animate-slow-zoom-out dark:opacity-38" />
          <CanvasParticles />
        </div>

        <SiteOrnament mode="hero" interactive className="opacity-70 dark:opacity-55" />

        <div className="site-container relative z-20 w-full py-16 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)] lg:items-center">
            <div className="relative z-20 max-w-3xl">
              <div className="section-kicker text-accent animate-hero-kicker">Strategic Financial Advisory</div>

              <h1 className="home-hero-title mt-7 max-w-4xl font-extrabold text-ink dark:text-white animate-hero-title">
                Expert financial <span className="home-hero-amp">&</span>{" "}
                <span className="block text-gradient">
                  compliance <span className="home-hero-gradient-break">guidance.</span>
                </span>
              </h1>

              <p className="mt-7 max-w-2xl border-l-2 border-black/8 pl-5 text-lg leading-relaxed text-muted dark:border-white/12 dark:text-slate-200 md:text-xl animate-hero-desc">
                Strategic accounting, taxation, audit, and compliance services built for enterprises that need clarity before they move.
              </p>

              <div className="mt-9 flex flex-wrap gap-4 animate-hero-ctas">
                <Link href="/practice-areas" className="group inline-flex items-center gap-3 rounded-2xl bg-accent px-7 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_18px_40px_color-mix(in_srgb,var(--accent)_32%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_color-mix(in_srgb,var(--accent)_42%,transparent)] active:translate-y-0">
                  <span>Explore Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-white/72 px-7 py-4 text-sm font-semibold tracking-wide text-ink backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg active:translate-y-0 dark:border-white/12 dark:bg-white/6 dark:text-white dark:hover:bg-white/10">
                  Contact Us
                </Link>
              </div>

              <div className="hero-entry-panel mt-10 animate-hero-stats">
                <div className="flex flex-col gap-3 border-b border-[var(--glass-border)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-accent">Client Priorities</div>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                      Supporting leadership teams with integrated financial, compliance, and advisory solutions.
                    </p>
                  </div>
                  <Link href="/practice-areas" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-accent">
                    View capabilities <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {advisoryEntryPoints.map((item, i) => (
                    <div key={item.title} className="hero-entry-item group" style={{ animationDelay: `${760 + i * 90}ms`, transitionDelay: `${i * 80}ms` }}>
                      <span className="hero-entry-icon">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink transition-colors group-hover:text-accent dark:text-white">{item.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted">{item.text}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative animate-hero-aside">
              <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-tr from-accent/22 via-accent-secondary/14 to-transparent opacity-70 blur-3xl dark:from-accent/16 dark:via-accent-secondary/10" />
              <GlowCard className="hero-advisory-card decorated-panel relative overflow-hidden rounded-[2rem]">
                <SiteOrnament mode="card" className="opacity-35" />
                <div className="p-6 md:p-7">
                  <div className="section-kicker">Built for Decision-Makers</div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink md:text-3xl dark:text-white">
                    Integrated Financial, Compliance, and Advisory Solutions for Confident Decision-Making
                  </h2>
                  <div className="section-rule"></div>
                  <p className="section-copy mt-5 max-w-none">
                    We work with founders, boards, promoters, financial institutions, and enterprises to simplify complex financial and regulatory matters. Our integrated approach combines audit, taxation, advisory, compliance, and governance services to support sustainable growth and informed business decisions.
                  </p>
                  <div className="mt-6 grid gap-3">
                    {advisorySnapshot.map((item, i) => (
                      <div key={item.title} className="hero-snapshot-row" style={{ animationDelay: `${780 + i * 120}ms` }}>
                        <span className="hero-snapshot-icon">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-ink dark:text-white">{item.title}</span>
                          <span className="mt-1 block text-xs leading-5 text-muted">{item.text}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section credibility-section py-5">
        <div className="site-container">
          <div className="credibility-strip reveal reveal-up">
            {credibilityItems.map((item) => (
              <div key={item.label} className="credibility-item">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-ink dark:text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section py-14 md:py-18">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="section-header reveal reveal-left">
              <div className="section-kicker">Our Values</div>
              <h2 className="section-title">Rooted in Legacy. Guided by <span className="text-gradient">Excellence.</span></h2>
              <div className="section-rule"></div>
              <p className="section-copy">
                Built on decades of professional experience, Sabs Marks JVS & Co. is committed to integrity, accountability, and client-centric service.
              </p>
              <p className="site-prose mt-5 max-w-3xl">
                We combine partner-led expertise with institutional strength to deliver trusted advice, disciplined execution, and lasting value.
              </p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">
                Learn About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {valueStats.map((item, index) => (
                <div key={item.label} className={`reveal reveal-up ${index % 2 === 1 ? "sm:translate-y-7" : ""}`} style={{ transitionDelay: `${index * 110}ms` }}>
                  <GlowCard className="value-card creative-card decorated-panel group h-full overflow-hidden rounded-[1.35rem]">
                    <div className="p-6">
                      <SiteOrnament mode="card" className="opacity-15 transition-opacity group-hover:opacity-35" />
                      <div className="text-4xl font-black text-gradient">{item.value}</div>
                      <div className="relative z-10 mt-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-accent dark:text-white">{item.label}</div>
                      <p className="relative z-10 mt-4 text-sm leading-6 text-muted">{item.text}</p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section py-14 md:py-18">
        <SiteOrnament mode="section" className="opacity-20" />
        <div className="site-container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <div className="reveal reveal-left">
              <AdvisoryCarousel />
            </div>

            <div className="section-header reveal reveal-right">
              <div className="section-kicker">Integrated Guidance</div>
              <h2 className="section-title">From compliance requirements to confident business decisions.</h2>
              <div className="section-rule"></div>
              <p className="section-copy">
                We help businesses navigate audit, taxation, accounting, and regulatory obligations with clarity, accuracy, and professional guidance.
              </p>
              <div className="mt-8 grid gap-3">
                {["Audit & Assurance Excellence", "Tax & Regulatory Compliance", "Strategic Business Advisory"].map((item) => (
                  <div key={item} className="advisory-proof-row">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section certainty-section overflow-hidden py-16 md:py-20">
        <SiteOrnament mode="section" contrast className="opacity-30" />
        <div className="site-container relative z-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between reveal reveal-up">
            <div className="section-header max-w-3xl">
              <div className="section-kicker">Our Engagement Model</div>
              <h2 className="section-title text-white">Every engagement follows a structured, outcome-driven framework.</h2>
              <div className="section-rule"></div>
            </div>
            <p className="max-w-lg text-base leading-8 text-slate-300 lg:pb-2">
              Our model keeps scope, execution, review, and advisory support aligned from diagnosis through ongoing monitoring.
            </p>
          </div>

          <div className="process-grid mt-14">
            {processSteps.map((step, index) => (
              <div key={step.title} className="reveal reveal-up" style={{ transitionDelay: `${index * 110}ms` }}>
                <GlowCard className="process-card decorated-panel group h-full overflow-hidden rounded-[1.2rem]">
                  <div className="flex h-full flex-col p-6 lg:p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{step.step}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8 text-[color-mix(in_srgb,var(--accent-secondary)_35%,white)]">
                        <step.icon className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                      </span>
                    </div>
                    <h3 className="mt-7 max-w-[17rem] text-xl font-bold leading-snug text-white">{step.title}</h3>
                    <p className="mt-4 max-w-[18rem] text-sm leading-7 text-slate-300">{step.text}</p>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section py-16 md:py-20">
        <div className="site-container">
          <div className="section-header mx-auto text-center reveal reveal-up">
            <div className="section-kicker mx-auto justify-center">Our Services</div>
            <h2 className="section-title">Specialized capabilities, organized for <span className="text-gradient">faster decision-making.</span></h2>
            <div className="section-rule mx-auto"></div>
            <p className="section-copy mx-auto">Deploying specialized advisory, audit, and tax solutions configured for your business needs.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <div key={service.id} className="reveal reveal-up" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                <GlowCard className="service-card creative-card decorated-panel group h-full overflow-hidden rounded-[1.45rem]">
                  <div className="p-6">
                    <SiteOrnament mode="card" className="opacity-15 transition-opacity group-hover:opacity-35" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                      <service.icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    </div>
                    <h3 className="relative z-10 mt-6 text-xl font-bold text-ink transition-colors group-hover:text-accent dark:text-white">{service.title}</h3>
                    <p className="relative z-10 mt-3 text-sm leading-7 text-muted">{service.desc}</p>
                    <Link href={`/practice-areas?tab=${service.id}`} className="relative z-10 mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section pb-16 pt-8 md:pb-24">
        <div className="site-container">
          <div className="final-cta decorated-panel overflow-hidden rounded-[2rem] p-7 md:p-10 lg:p-12 reveal reveal-up">
            <SiteOrnament mode="section" contrast className="opacity-35" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <div className="section-kicker">Start With Clarity</div>
                <h2 className="mt-6 max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">
                  professional clarity begins with the right conversation
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Speak with the Sabs Marks JVS team about audit, tax, CFO advisory, compliance, or governance priorities.
                </p>
              </div>
              <Link href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-950 shadow-[0_18px_44px_rgba(255,255,255,0.16)] hover:-translate-y-0.5">
                Contact Us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

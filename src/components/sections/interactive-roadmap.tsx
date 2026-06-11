"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldAlert, Award, Rocket, TrendingUp, Landmark } from "lucide-react";
import Link from "next/link";

interface RoadmapStep {
  title: string;
  desc: string;
  type: "setup" | "audit" | "compliance" | "strategy";
}

interface Phase {
  id: string;
  name: string;
  kicker: string;
  description: string;
  icon: typeof Rocket;
  stats: { label: string; value: string };
  timeline: RoadmapStep[];
  ctaText: string;
  ctaLink: string;
}

const PHASES: Phase[] = [
  {
    id: "emerging",
    name: "Seed to Scaleup",
    kicker: "Phase 01: Build the Foundation",
    description: "For emerging businesses looking to set up compliant operations, scale with clean reporting systems, and secure institutional-grade governance from day one.",
    icon: Rocket,
    stats: { label: "Tax Risk Reduced", value: "99%" },
    ctaText: "Get Structuring Advice",
    ctaLink: "/contact",
    timeline: [
      { title: "Corporate Entity Structuring", desc: "Setting up optimized share holding, directorships, and regulatory registrations.", type: "setup" },
      { title: "Indirect Tax & GST Registration", desc: "Configuring supply chain flows and automated GST compliance channels.", type: "compliance" },
      { title: "Outsourced Accounting & Payroll", desc: "Setting up real-time bookkeeping, partner reporting dashboards, and compliant payroll.", type: "setup" },
      { title: "Statutory Filing Readiness", desc: "Creating standard control environments to prepare for upcoming statutory audit seasons.", type: "audit" },
    ],
  },
  {
    id: "growth",
    name: "Mid-Market Expansion",
    kicker: "Phase 02: Drive Operational Scale",
    description: "For rapidly growing mid-corporates scaling direct operations, expanding regional offices, optimizing tax footprints, and requiring rigorous risk oversight.",
    icon: TrendingUp,
    stats: { label: "Tax Liability Optimized", value: "15-25%" },
    ctaText: "Optimize Tax Footprint",
    ctaLink: "/contact",
    timeline: [
      { title: "Direct Tax Planning", desc: "Structuring inter-company agreements, transfer pricing mechanisms, and corporate tax benefits.", type: "compliance" },
      { title: "Internal Audit & Risk Controls", desc: "Assessing standard operating procedures (SOPs), leakages, and operational control compliance.", type: "audit" },
      { title: "GST Optimization & Audits", desc: "Detailed reconciliation of input tax credit (ITC) and filing health checks.", type: "compliance" },
      { title: "CFO & Business Advisory", desc: "Evaluating capital efficiency, working capital cycles, and expansion feasibility studies.", type: "strategy" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise & MNCs",
    kicker: "Phase 03: Institutional Discipline",
    description: "For established leaders, multinationals, and institutions demanding rigorous statutory audits, forensic control, boardroom advisory, and complex transaction support.",
    icon: Landmark,
    stats: { label: "Audit Accuracy", value: "100%" },
    ctaText: "Consult a Partner",
    ctaLink: "/contact",
    timeline: [
      { title: "Statutory Audit & Assurance", desc: "High-stakes, partner-led audits conforming to the highest level of regulatory scrutiny.", type: "audit" },
      { title: "Corporate Finance & M&A Support", desc: "Rigorous valuations, due diligence audits, and regulatory clearances for scaling transactions.", type: "strategy" },
      { title: "Forensic Controls & Risk Review", desc: "Deep-dive diagnostic testing of control environments to detect and mitigate insider leaks.", type: "audit" },
      { title: "Digital Systems Transformation", desc: "Re-engineering legacy SAP/ERP finance configurations for global unified compliance.", type: "strategy" },
    ],
  },
];

export function InteractiveRoadmap() {
  const [activeTab, setActiveTab] = useState<string>("emerging");
  const activePhase = PHASES.find((p) => p.id === activeTab) || PHASES[0];
  const ActiveIcon = activePhase.icon;

  return (
    <div className="w-full">
      {/* Tabs Selector */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12">
        {PHASES.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.id === activeTab;
          return (
            <button
              key={phase.id}
              onClick={() => setActiveTab(phase.id)}
              className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-accent border-accent text-white shadow-[0_12px_30px_rgba(30,58,138,0.24)]"
                  : "bg-surface/50 border-[var(--glass-border)] text-muted hover:bg-surface hover:text-ink"
              }`}
            >
              <Icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-accent"}`} />
              <span>{phase.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Content Panel */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start transition-all duration-500 ease-in-out">
        {/* Left column - Phase Info */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-surface/40 backdrop-blur-md border border-[var(--glass-border)] p-6 md:p-8 rounded-[1.85rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ActiveIcon className="w-48 h-48 text-accent" />
          </div>
          <div>
            <div className="section-kicker border-accent/20 bg-accent/5 text-accent">
              {activePhase.kicker}
            </div>

            <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
              Advisory built for{" "}
              <span className="text-gradient">{activePhase.name}</span>
            </h3>

            <p className="mt-5 text-sm md:text-base leading-relaxed text-muted">
              {activePhase.description}
            </p>

            {/* Glowing Metric Box */}
            <div className="mt-8 flex items-center gap-5 bg-gradient-to-r from-accent/5 to-blue-500/5 border border-accent/10 rounded-2xl p-5">
              <div className="text-4xl font-black text-gradient bg-gradient-to-r from-accent to-blue-500">
                {activePhase.stats.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted">
                {activePhase.stats.label}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href={activePhase.ctaLink}
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent hover:text-accent-secondary"
            >
              <span>{activePhase.ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Right column - Vertical Timeline */}
        <div className="lg:col-span-7 relative pl-8 md:pl-0">
          {/* Vertical connecting line */}
          <div className="roadmap-line" />

          <div className="space-y-8 relative z-10">
            {activePhase.timeline.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row md:items-center ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline point */}
                  <div className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full border-2 border-accent bg-bg shadow-sm">
                    {step.type === "audit" ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-accent" />
                    ) : step.type === "compliance" ? (
                      <Award className="h-4.5 w-4.5 text-accent" />
                    ) : step.type === "setup" ? (
                      <Rocket className="h-4.5 w-4.5 text-accent" />
                    ) : (
                      <Landmark className="h-4.5 w-4.5 text-accent" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`w-full md:w-[46%] transition-all-custom border border-[var(--glass-border)] bg-surface/90 hover:bg-surface rounded-2xl p-6 shadow-sm hover:shadow-md ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent px-2.5 py-1 rounded-full bg-accent/8 border border-accent/12">
                        {step.type}
                      </span>
                      <span className="text-xs font-bold text-muted">Step 0{idx + 1}</span>
                    </div>
                    <h4 className="mt-3.5 text-base font-bold text-ink">{step.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

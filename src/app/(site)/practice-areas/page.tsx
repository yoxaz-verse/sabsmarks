"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

type ServiceArea = {
  id: string;
  title: string;
  strapline: string;
  subtitle: string;
  paragraphs: string[];
  bulletsLabel: string;
  bullets: string[];
};

const serviceAreas: ServiceArea[] = [
  {
    id: "corporate-finance-advisory",
    title: "Corporate Finance Advisory",
    strapline: "Structured Capital and Unshaken Confidence",
    subtitle: "Service Scope",
    paragraphs: [
      "We work with leadership teams on key financial and strategic decisions that shape organisational direction. Our role extends beyond transactions to capital structuring, option evaluation, and alignment of financial decisions with business strategy, governance, and long-term objectives.",
      "All decisions are supported by structured analysis and risk awareness, ensuring clarity and discipline in capital outcomes.",
      "As organisations scale, capital decisions require higher standards of governance, valuation discipline, and regulatory preparedness. We support valuation-led decision-making and public issue readiness, working alongside merchant bankers, legal advisors, auditors, and regulators.",
      "Our role is to strengthen financial and governance foundations, enabling confident engagement with public markets.",
    ],
    bulletsLabel: "Our service includes",
    bullets: [
      "Fundraising and bank finance support",
      "Financial modelling, scenario analysis, and projections",
      "Transaction and deal support",
      "Due diligence and transaction readiness",
      "Valuation support for strategic, regulatory, and transaction purposes",
      "Pre-listing and public issue preparedness",
      "Financial, governance, and compliance readiness for IPOs and other public issuances",
      "Coordination with statutory and transaction stakeholders",
    ],
  },
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    strapline: "Audit That Withstands Scrutiny",
    subtitle: "Service Scope",
    paragraphs: [
      "We deliver audits that are structured, risk-focused, and regulator-ready.",
      "Our audits identify control gaps and opportunities for improvement, not merely statutory observations.",
    ],
    bulletsLabel: "Our services include",
    bullets: [
      "Statutory Audit",
      "Internal Audit",
      "Tax Audit",
      "Concurrent Audit",
      "Management & Process Audit",
      "Transfer Pricing Audit",
    ],
  },
  {
    id: "tax-regulatory-services",
    title: "Tax & Regulatory Services",
    strapline: "Tax Positions That Are Unbreakable",
    subtitle: "Service Scope",
    paragraphs: [
      "We assist organisations in managing tax exposure with clarity and discipline.",
      "Tax decisions are evaluated in the context of business structure, risk tolerance, and long-term positioning.",
    ],
    bulletsLabel: "Our service includes",
    bullets: [
      "Direct Tax Advisory & Compliance",
      "GST & Indirect Tax",
      "Assessments & Litigation Support",
      "Representation before authorities",
    ],
  },
  {
    id: "corporate-other-laws",
    title: "Corporate & Other Laws",
    strapline: "Governance Without Gaps",
    subtitle: "Service Scope",
    paragraphs: [
      "Strong governance protects both growth and reputation.",
      "Well-structured governance reduces friction, delays, and execution risk.",
    ],
    bulletsLabel: "Our service includes",
    bullets: [
      "Corporate law compliances",
      "Board and governance frameworks",
      "Restructuring and reorganisations",
      "Secretarial and statutory filings",
    ],
  },
  {
    id: "cfo-business-advisory",
    title: "CFO & Business Advisory",
    strapline: "The Finance Office Behind the Business",
    subtitle: "Service Scope",
    paragraphs: [
      "We support leadership teams not only with financial insights, but with strategic thinking and operational clarity required to run and scale modern organisations. Our advisory extends across finance, management process, and digital enablement, helping organisations transition from intuition-driven operations to structured, data-led decision-making.",
      "Financial discipline, combined with strategic and digital thinking, improves predictability, strengthens management control, and supports sustained organisational success.",
    ],
    bulletsLabel: "Our service includes",
    bullets: [
      "MIS, dashboards, and management reporting frameworks",
      "Budgeting, forecasting, and cash-flow discipline",
      "Internal controls, SOPs, and governance processes",
      "Decision support for management and boards",
    ],
  },
  {
    id: "business-process-reengineering",
    title: "Business Process Re-Engineering",
    strapline: "Structure That Scales",
    subtitle: "Service Scope",
    paragraphs: [
      "As organisations grow, process weaknesses surface as control gaps, inefficiencies, and delayed decisions. Fragmented workflows and unclear accountability dilute execution quality and increase risk.",
      "We support leadership in reviewing and redesigning critical business and finance processes to ensure clarity of roles, strength of controls, and alignment with governance and regulatory expectations. Our approach is finance-led and outcome-driven, focused on improving decision visibility and execution discipline.",
      "Well-structured processes reduce friction, strengthen oversight, and enable consistent execution at scale.",
    ],
    bulletsLabel: "Our service includes",
    bullets: [
      "End-to-end process and workflow review",
      "Identification of control gaps and execution bottlenecks",
      "Redesign of processes aligned with governance needs",
      "SOP and control documentation",
    ],
  },
  {
    id: "digital-transformation-systems-advisory",
    title: "Digital Transformation & Systems Advisory",
    strapline: "Systems That Strengthen Control",
    subtitle: "Service Scope",
    paragraphs: [
      "Automation initiatives require clarity on process ownership, system architecture, and reporting integrity. When automation is introduced without governance and design discipline, it weakens controls, increases rework, and reduces confidence in decision data.",
      "We advise organisations on automation strategy, software scope, and digital system design aligned with finance, compliance, and management reporting needs. Our role is independent and system-agnostic, ensuring automation strengthens governance, data integrity, cost efficiency, and decision reliability.",
      "Well-designed automation improves control, cost efficiency, predictability, and confidence in decisions.",
    ],
    bulletsLabel: "Our work includes",
    bullets: [
      "Automation strategy and scope definition",
      "ERP, finance systems, and workflow automation design",
      "MIS, dashboards, and management reporting frameworks",
      "Data governance, controls, and audit trails",
      "Vendor evaluation and implementation oversight",
    ],
  },
  {
    id: "business-revival-organisational-revamping",
    title: "Business Revival & Organisational Revamping",
    strapline: "Recovery with discipline and direction",
    subtitle: "Service Scope",
    paragraphs: [
      "We have led multiple business revival and organisational revamping engagements, working with promoters, boards, and lenders to restore financial control, operational stability, and stakeholder confidence. Business stress typically reflects weakened controls, cost inefficiencies, and fragmented decision-making, requiring revenue and profit maximisation diagnosis alongside disciplined intervention.",
      "Our approach is reliable, achievable, and target-driven, focused on stabilisation before strengthening cash flows, improving cost efficiency, restoring profitability, and re-establishing governance and execution discipline.",
      "Engagements are conducted with independence, discretion, and regulator-ready documentation, enabling sustainable recovery and durable business confidence.",
    ],
    bulletsLabel: "Our service includes",
    bullets: [
      "Revenue and profit maximisation diagnosis",
      "Financial and operational diagnosis",
      "Review and strengthening of governance and control frameworks",
      "Cash-flow improvement and cost rationalisation",
      "Process and organisational restructuring",
      "Stakeholder and lender coordination support",
    ],
  },
  {
    id: "risk-controls-forensics",
    title: "Risk, Controls & Forensics",
    strapline: "Independent review for sensitive risk",
    subtitle: "Service Scope",
    paragraphs: [
      "Risk rarely announces itself. It escalates quietly through weak controls, governance blind spots, and delayed intervention. We help organisations identify and manage risks before they become exposed.",
      "Our approach prioritises independence, discretion, and documentation that withstands regulatory and legal scrutiny.",
    ],
    bulletsLabel: "Our services include",
    bullets: [
      "Enterprise Risk Management & Control Frameworks",
      "Information Systems & Data Integrity Audits",
      "AML, compliance, and regulatory risk reviews",
      "Forensic, investigative, and sensitive assignments",
    ],
  },
];

export default function PracticeAreasPage() {
  const [activeTab, setActiveTab] = useState(serviceAreas[0].id);

  const activeContent = serviceAreas.find((serviceArea) => serviceArea.id === activeTab) || serviceAreas[0];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Our Services" />

      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent opacity-10 dark:opacity-20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <p className="text-[16px] leading-relaxed text-muted mb-12 max-w-4xl text-center mx-auto relative z-10">
          Our services are designed to strengthen financial decision-making, governance, controls, and execution discipline across every stage of growth. We combine structured analysis, regulatory awareness, and business context to help leadership teams act with clarity and confidence.
        </p>

        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row relative z-10 shadow-2xl border border-[var(--glass-border)] bg-surface/60 backdrop-blur-xl min-h-[750px] md:min-h-[650px]">
          <div className="w-full md:w-[380px] flex flex-col items-stretch gap-2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--glass-border)] bg-surface-raised/30 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-surface/40 to-transparent pointer-events-none"></div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-6 px-4">Our Services</h4>
            {serviceAreas.map((serviceArea) => {
              const isActive = activeTab === serviceArea.id;
              return (
                <div key={serviceArea.id} className="w-full md:w-[320px] md:max-w-[320px] md:min-w-[320px] md:mx-auto">
                  <button
                    onClick={() => setActiveTab(serviceArea.id)}
                    className={`block h-20 w-full min-w-full max-w-full px-6 py-4 text-left font-bold text-[13px] tracking-[0.08em] rounded-2xl transition-all duration-500 relative overflow-hidden group box-border ${
                      isActive
                        ? "bg-surface shadow-lg text-ink border border-[var(--glass-border)]"
                        : "text-muted bg-surface/45 hover:bg-surface/65 hover:text-ink border border-[var(--glass-border)]/70"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent rounded-l-2xl shadow-[0_0_15px_var(--accent-glow)]"></div>
                    )}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-100"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <span className="relative z-10 flex h-full w-full items-center justify-between gap-4">
                      <span className="line-clamp-2 leading-6">{serviceArea.title}</span>
                      <span className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center">
                        <svg
                          className={`h-4 w-4 transition-opacity duration-300 ${isActive ? "text-accent opacity-100 animate-fade-in" : "text-muted opacity-35 group-hover:opacity-60"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div key={activeTab} className="flex-1 p-8 md:p-16 relative overflow-hidden flex flex-col justify-center min-h-[650px] md:min-h-[600px]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent opacity-[0.04] dark:opacity-[0.06] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4 animate-pulse" style={{ animationDuration: "4s" }}></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent opacity-[0.02] dark:opacity-[0.03] rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 max-w-3xl animate-fade-in" style={{ animationDuration: "600ms" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8 backdrop-blur-sm">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent absolute"></div>
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest ml-1">{activeContent.subtitle}</span>
              </div>

              <p className="text-sm md:text-base uppercase tracking-[0.24em] text-accent/85 font-semibold mb-5">
                {activeContent.strapline}
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 tracking-tight">
                {activeContent.title}
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full mb-8"></div>

              <div className="space-y-5 mb-10">
                {activeContent.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink/80 mb-6">
                {activeContent.bulletsLabel}
              </h3>

              <ul className="space-y-6">
                {activeContent.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="flex items-start group animate-fade-in"
                    style={{ animationDelay: `${150 + index * 100}ms`, animationFillMode: "both" }}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-surface-raised border border-[var(--glass-border)] flex items-center justify-center mr-6 flex-shrink-0 group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent/70 group-hover:bg-accent group-hover:scale-150 group-hover:shadow-[0_0_12px_var(--accent-glow)] transition-all duration-500"></span>
                    </div>
                    <span className="text-[17px] leading-relaxed text-muted pt-1.5 group-hover:text-ink transition-colors duration-500">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="Our Services" />

      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
        <p className="mx-auto mb-12 max-w-4xl text-center text-[16px] leading-relaxed text-muted">
          Our services are designed to strengthen financial decision-making, governance, controls, and execution discipline across every stage of growth. We combine structured analysis, regulatory awareness, and business context to help leadership teams act with clarity and confidence.
        </p>

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_40px_rgba(24,57,95,0.06)] md:flex">
          <div className="w-full border-b border-[var(--border)] bg-[var(--cloud)] p-6 md:w-[380px] md:border-b-0 md:border-r md:p-8">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-muted">Our Services</h4>
            <div className="flex flex-col gap-2">
              {serviceAreas.map((serviceArea) => {
                const isActive = activeTab === serviceArea.id;
                return (
                  <button
                    key={serviceArea.id}
                    onClick={() => setActiveTab(serviceArea.id)}
                    className={`w-full rounded-sm border-l-2 px-4 py-4 text-left text-[13px] font-bold tracking-[0.08em] transition-colors ${
                      isActive
                        ? "border-[var(--accent-secondary)] bg-[var(--surface)] text-accent"
                        : "border-transparent bg-transparent text-muted hover:bg-[var(--surface)] hover:text-accent"
                    }`}
                  >
                    {serviceArea.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 p-8 md:p-14">
            <p className="brand-kicker mb-6">{activeContent.subtitle}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-secondary)]">
              {activeContent.strapline}
            </p>
            <h2 className="mt-5 text-4xl font-bold text-accent md:text-5xl">{activeContent.title}</h2>
            <div className="brand-rule mt-6" />

            <div className="mt-8 space-y-5">
              {activeContent.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[17px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              {activeContent.bulletsLabel}
            </h3>

            <ul className="mt-6 space-y-5">
              {activeContent.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="brand-list-dot" />
                  <span className="text-[17px] leading-relaxed text-muted">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

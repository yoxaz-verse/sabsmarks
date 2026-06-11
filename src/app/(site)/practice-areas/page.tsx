"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageBanner } from "@/components/layout/page-banner";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import Image from "next/image";
import { SITE_VISUALS } from "@/lib/site-visuals";

type ServiceArea = {
  id: string;
  title: string;
  strapline: string;
  subtitle: string;
  image: string;
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
    image: SITE_VISUALS.practiceAreas["corporate-finance-advisory"],
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
    image: SITE_VISUALS.practiceAreas["audit-assurance"],
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
    image: SITE_VISUALS.practiceAreas["tax-regulatory-services"],
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
    image: SITE_VISUALS.practiceAreas["corporate-other-laws"],
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
    image: SITE_VISUALS.practiceAreas["cfo-business-advisory"],
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
    image: SITE_VISUALS.practiceAreas["business-process-reengineering"],
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
    image: SITE_VISUALS.practiceAreas["digital-transformation-systems-advisory"],
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
    image: SITE_VISUALS.practiceAreas["business-revival-organisational-revamping"],
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
    image: SITE_VISUALS.practiceAreas["risk-controls-forensics"],
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
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Our Services" />

      <InteriorIntroSection
        title="Specialized capabilities, organized for faster decision-making."
        description="Our services are designed to strengthen financial decision-making, governance, controls, and execution discipline across every stage of growth. We combine structured analysis, regulatory awareness, and business context to help leadership teams act with clarity and confidence."
        align="center"
        className="border-b-0"
      />

      <section className="site-section">
        <div className="site-container pb-16 md:pb-20">
          <Suspense fallback={
            <div className="site-card overflow-hidden rounded-[1.75rem] flex items-center justify-center min-h-[650px] bg-[color-mix(in_srgb,var(--surface-raised)_45%,transparent)] text-muted font-medium">
              Loading services...
            </div>
          }>
            <PracticeAreasTabs />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function PracticeAreasTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeTab = searchParams.get("tab") || serviceAreas[0].id;
  const activeContent = serviceAreas.find((serviceArea) => serviceArea.id === activeTab) || serviceAreas[0];

  const setActiveTab = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.push(`/practice-areas?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="site-card overflow-hidden rounded-[1.75rem] md:flex md:min-h-[650px]">
      <div className="w-full border-b border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_45%,transparent)] p-6 md:w-[380px] md:border-b-0 md:border-r md:p-8">
        <h4 className="text-xs font-bold text-muted uppercase tracking-[0.22em] mb-6 px-4">Our Services</h4>
        {serviceAreas.map((serviceArea) => {
          const isActive = activeTab === serviceArea.id;
          return (
            <div key={serviceArea.id} className="w-full md:w-[320px] md:max-w-[320px] md:min-w-[320px] md:mx-auto">
              <button
                onClick={() => setActiveTab(serviceArea.id)}
                className={`block h-20 w-full min-w-full max-w-full px-6 py-4 text-left font-bold text-[13px] tracking-[0.08em] rounded-2xl transition-all duration-500 relative overflow-hidden group box-border ${
                  isActive
                    ? "bg-surface shadow-lg text-ink border border-[var(--glass-border)]"
                    : "text-muted bg-transparent hover:bg-[color-mix(in_srgb,var(--surface)_65%,transparent)] hover:text-ink border border-[var(--glass-border)]/70"
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

      <div key={activeTab} className="flex min-h-[600px] flex-1 flex-col overflow-hidden p-8 md:px-14 md:pt-10 md:pb-14 lg:px-16 lg:pt-12 lg:pb-16">
        <div className="max-w-[46rem] animate-fade-in" style={{ animationDuration: "600ms" }}>
          <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-[1.6rem]">
            <Image
              src={activeContent.image}
              alt={activeContent.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.06),rgba(8,15,30,0.24))]" />
          </div>
          <div className="section-kicker">{activeContent.subtitle}</div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent/85 md:text-base">
            {activeContent.strapline}
          </p>

          <h2 className="section-title">{activeContent.title}</h2>

          <div className="section-rule"></div>

          <div className="space-y-5 mb-10">
            {activeContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="section-copy mt-0 max-w-none text-[17px]">
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
  );
}

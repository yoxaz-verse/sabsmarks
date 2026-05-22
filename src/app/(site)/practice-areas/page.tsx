"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

type Practice = {
  id: string;
  title: string;
  tagline?: string;
  intro: string[];
  includes?: string[];
  closing?: string;
};

const practices: Practice[] = [
  {
    id: "corporate-finance-advisory",
    title: "CORPORATE FINANCE ADVISORY",
    tagline: "Structured Capital and Unshaken Confidence",
    intro: [
      "We work with leadership teams on key financial and strategic decisions that shape organizational direction. Our role extends beyond transactions to capital structuring, option evaluation, and alignment of financial decisions with business strategy, governance, and long-term objectives.",
      "As organizations scale, capital decisions require higher standards of governance, valuation discipline, and regulatory preparedness. We support valuation-led decision-making and public issue readiness, working alongside merchant bankers, legal advisors, auditors, and regulators.",
    ],
    includes: [
      "Fundraising and bank finance support",
      "Financial modeling, scenario analysis, and projections",
      "Transaction and deal support",
      "Due diligence and transaction readiness",
      "Valuation support for strategic, regulatory, and transaction purposes",
      "Pre-listing and public issue preparedness",
      "Financial, governance, and compliance readiness for IPOs and other public issuances",
      "Coordination with statutory and transaction stakeholders",
    ],
    closing:
      "All decisions are supported by structured analysis and risk awareness to ensure clarity and discipline in capital outcomes. Our role is to strengthen financial and governance foundations, enabling confident engagement with public markets.",
  },
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    tagline: "Audit That Withstands Scrutiny",
    intro: ["We deliver audits that are structured, risk-focused, and regulator-ready."],
    includes: [
      "Statutory Audit",
      "Internal Audit",
      "Tax Audit",
      "Concurrent Audit",
      "Management & Process Audit",
      "Transfer Pricing Audit",
    ],
    closing: "Our audits identify control gaps and opportunities for improvement, not merely statutory observations.",
  },
  {
    id: "tax-regulatory-services",
    title: "Tax & Regulatory Services",
    tagline: "Tax Positions That Are Unbreakable",
    intro: ["We assist organizations in managing tax exposure with clarity and discipline."],
    includes: [
      "Direct Tax Advisory & Compliance",
      "GST & Indirect Tax",
      "Assessments & Litigation Support",
      "Representation before authorities",
    ],
    closing: "Tax decisions are evaluated in the context of business structure, risk tolerance, and long-term positioning.",
  },
  {
    id: "corporate-other-laws",
    title: "Corporate & Other Laws",
    tagline: "Governance Without Gaps",
    intro: ["Strong governance protects both growth and reputation."],
    includes: [
      "Corporate law compliances",
      "Board and governance frameworks",
      "Restructuring and reorganizations",
      "Secretarial and statutory filings",
    ],
    closing: "Well-structured governance reduces friction, delays, and execution risk.",
  },
  {
    id: "cfo-business-advisory",
    title: "CFO & Business Advisory",
    tagline: "The Finance Office Behind the Business",
    intro: [
      "We support leadership teams not only with financial insights, but with strategic thinking and operational clarity required to run and scale modern organizations.",
      "Our advisory extends across finance, management processes, and digital enablement, helping organizations transition from intuition-driven operations to structured, data-led decision-making.",
    ],
    includes: [
      "MIS, dashboards, and management reporting frameworks",
      "Budgeting, forecasting, and cash-flow discipline",
      "Internal controls, SOPs, and governance processes",
      "Decision support for management and boards",
    ],
    closing:
      "Financial discipline, combined with strategic and digital thinking, improves predictability, strengthens management control, and supports sustained organizational success.",
  },
  {
    id: "business-process-reengineering",
    title: "Business Process Re-Engineering",
    tagline: "Structures That Scale",
    intro: [
      "As organizations grow, process weaknesses surface as control gaps, inefficiencies, and delayed decisions. Fragmented workflows and unclear accountability dilute execution quality and increase risk.",
      "We support leadership in reviewing and redesigning critical business and finance processes to ensure clarity of roles, strength of controls, and alignment with governance and regulatory expectations. Our approach is finance-led and outcome-driven, focused on improving decision visibility and execution discipline.",
    ],
    includes: [
      "End-to-end process and workflow review",
      "Identification of control gaps and execution bottlenecks",
      "Redesign of processes aligned with governance needs",
      "SOP and control documentation",
    ],
    closing: "Well-structured processes reduce friction, strengthen oversight, and enable consistent execution at scale.",
  },
  {
    id: "digital-transformation-systems-advisory",
    title: "Digital Transformation & Systems Advisory",
    tagline: "Systems That Strengthen Control",
    intro: [
      "Automation initiatives require clarity on process ownership, system architecture, and reporting integrity. When automation is introduced without governance and design discipline, it weakens controls, increases rework, and reduces confidence in decision data.",
      "We advise organizations on automation strategy, software scope, and digital system design aligned with finance, compliance, and management reporting needs. Our role is independent and system-agnostic, ensuring automation strengthens governance, data integrity, cost efficiency, and decision reliability.",
    ],
    includes: [
      "Automation strategy and scope definition",
      "ERP, finance systems, and workflow automation design",
      "MIS, dashboards, and management reporting frameworks",
      "Data governance, controls, and audit trails",
      "Vendor evaluation and implementation oversight",
    ],
    closing: "Well-designed automation improves control, cost efficiency, predictability, and confidence in decisions.",
  },
  {
    id: "business-revival-organisational-revamping",
    title: "Business Revival & Organisational Revamping",
    intro: [
      "We have led multiple business revival and organizational revamping engagements, working with promoters, boards, and lenders to restore financial control, operational stability, and stakeholder confidence.",
      "Business stress typically reflects weakened controls, cost inefficiencies, and fragmented decision-making, requiring revenue and profit maximization diagnosis alongside disciplined intervention.",
      "Our approach is reliable, achievable, and target-driven, focused on stabilization before strengthening cash flows, improving cost efficiency, restoring profitability, and re-establishing governance and execution discipline.",
    ],
    includes: [
      "Revenue and profit maximization diagnosis",
      "Financial and operational diagnosis",
      "Review and strengthening of governance and control frameworks",
      "Cash-flow improvement and cost rationalization",
      "Process and organizational restructuring",
      "Stakeholder and lender coordination support",
    ],
    closing:
      "Engagements are conducted with independence, discretion, and regulator-ready documentation, enabling sustainable recovery and durable business confidence.",
  },
  {
    id: "risk-controls-forensics",
    title: "Risk, Controls & Forensics",
    intro: [
      "Risk rarely announces itself. It escalates quietly through weak controls, governance blind spots, and delayed intervention. We help organizations identify and manage risks before they become exposed.",
    ],
    includes: [
      "Enterprise Risk Management & Control Frameworks",
      "Information Systems & Data Integrity Audits",
      "AML, compliance, and regulatory risk reviews",
      "Forensic, investigative, and sensitive assignments",
    ],
    closing: "Our approach prioritizes independence, discretion, and documentation that withstands regulatory and legal scrutiny.",
  },
];

export default function PracticeAreasPage() {
  const [activeTab, setActiveTab] = useState(practices[0].id);
  const activeContent = practices.find((p) => p.id === activeTab) || practices[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="Our Services" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <p className="text-[15px] leading-7 text-[#555] mb-16 md:mb-20 max-w-5xl">
          Our services are designed to strengthen governance, improve financial control, and support sustainable growth for businesses across sectors.
        </p>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="w-full md:w-1/3 flex flex-col gap-[2px]">
            {practices.map((practice) => {
              const isActive = activeTab === practice.id;
              return (
                <button
                  key={practice.id}
                  onClick={() => setActiveTab(practice.id)}
                  className={`text-left px-6 py-4 font-bold text-sm tracking-wide transition-colors ${
                    isActive ? "bg-[#df8c20] text-white" : "bg-[#18395f] text-white hover:bg-[#204a7a]"
                  }`}
                >
                  {practice.title}
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-black mb-2">{activeContent.title}</h2>
            {activeContent.tagline ? <h3 className="text-lg font-semibold text-[#18395f] mb-6">{activeContent.tagline}</h3> : null}

            <div className="space-y-4 mb-8">
              {activeContent.intro.map((paragraph, index) => (
                <p key={index} className="text-[15px] leading-7 text-[#555]">
                  {paragraph}
                </p>
              ))}
            </div>

            {activeContent.includes?.length ? (
              <>
                <h4 className="text-sm font-bold text-black mb-4 tracking-wide uppercase">Our service includes:</h4>
                <ul className="space-y-4 mb-8">
                  {activeContent.includes.map((bullet, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#555] mt-2.5 mr-4 flex-shrink-0"></span>
                      <span className="text-[15px] leading-7 text-[#555]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {activeContent.closing ? <p className="text-[15px] leading-7 text-[#555]">{activeContent.closing}</p> : null}
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";

type ServiceSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string[];
  includeLabel: string;
  bullets: string[];
  bridge?: string[];
  secondaryLabel?: string;
  secondaryBullets?: string[];
  closing: string;
};

const serviceSections: ServiceSection[] = [
  {
    id: "corporate-finance-advisory",
    title: "Corporate Finance Advisory",
    tagline: "Structured Capital and Unshaken Confidence",
    intro: [
      "We work with leadership teams on key financial and strategic decisions that shape organisational direction. Our role extends beyond transactions to capital structuring, option evaluation, and alignment of financial decisions with business strategy, governance, and long-term objectives.",
    ],
    includeLabel: "Our service includes",
    bullets: [
      "Fundraising and bank finance support",
      "Financial modelling, scenario analysis, and projections",
      "Transaction and deal support",
      "Due diligence and transaction readiness",
    ],
    bridge: [
      "All decisions are supported by structured analysis and risk awareness, ensuring clarity and discipline in capital outcomes.",
      "As organisations scale, capital decisions require higher standards of governance, valuation discipline, and regulatory preparedness. We support valuation-led decision-making and public issue readiness, working alongside merchant bankers, legal advisors, auditors, and regulators.",
    ],
    secondaryLabel: "This also includes",
    secondaryBullets: [
      "Valuation support for strategic, regulatory, and transaction purposes",
      "Pre-listing and public issue preparedness",
      "Financial, governance, and compliance readiness for IPOs and other public issuances",
      "Coordination with statutory and transaction stakeholders",
    ],
    closing: "Our role is to strengthen financial and governance foundations, enabling confident engagement with public markets.",
  },
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    tagline: "Audit That Withstands Scrutiny",
    intro: [
      "We deliver audits that are structured, risk-focused, and regulator-ready.",
    ],
    includeLabel: "Our services include",
    bullets: [
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
    intro: [
      "We assist organisations in managing tax exposure with clarity and discipline.",
    ],
    includeLabel: "Our service includes",
    bullets: [
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
    intro: [
      "Strong governance protects both growth and reputation.",
    ],
    includeLabel: "Our services include",
    bullets: [
      "Corporate law compliances",
      "Board and governance frameworks",
      "Restructuring and reorganisations",
      "Secretarial and statutory filings",
    ],
    closing: "Well-structured governance reduces friction, delays, and execution risk.",
  },
  {
    id: "cfo-business-advisory",
    title: "CFO & Business Advisory",
    tagline: "The Finance Office Behind the Business",
    intro: [
      "We support leadership teams not only with financial insights, but with strategic thinking and operational clarity required to run and scale modern organisations. Our advisory extends across finance, management process, and digital enablement, helping organisations transition from intuition-driven operations to structured, data-led decision-making.",
    ],
    includeLabel: "Our service includes",
    bullets: [
      "MIS, dashboards, and management reporting frameworks",
      "Budgeting, forecasting, and cash-flow discipline",
      "Internal controls, SOPs, and governance processes",
      "Decision support for management and boards",
    ],
    closing: "Financial discipline, combined with strategic and digital thinking, improves predictability, strengthens management control, and supports sustained organisational success.",
  },
  {
    id: "business-process-reengineering",
    title: "Business Process Re-Engineering",
    tagline: "Structure That Scales",
    intro: [
      "As organisations grow, process weaknesses surface as control gaps, inefficiencies, and delayed decisions. Fragmented workflows and unclear accountability dilute execution quality and increase risk.",
      "We support leadership in reviewing and redesigning critical business and finance processes to ensure clarity of roles, strength of controls, and alignment with governance and regulatory expectations. Our approach is finance-led and outcome-driven, focused on improving decision visibility and execution discipline.",
    ],
    includeLabel: "Our service includes",
    bullets: [
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
      "We advise organisations on automation strategy, software scope, and digital system design aligned with finance, compliance, and management reporting needs. Our role is independent and system-agnostic, ensuring automation strengthens governance, data integrity, cost efficiency, and decision reliability.",
    ],
    includeLabel: "Our work includes",
    bullets: [
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
    tagline: "Stabilisation Before Scale",
    intro: [
      "We have led multiple business revival and organisational revamping engagements, working with promoters, boards, and lenders to restore financial control, operational stability, and stakeholder confidence. Business stress typically reflects weakened controls, cost inefficiencies, and fragmented decision-making, requiring revenue and profit maximisation diagnosis alongside disciplined intervention.",
      "Our approach is reliable, achievable, and target-driven, focused on stabilisation before strengthening cash flows, improving cost efficiency, restoring profitability, and re-establishing governance and execution discipline.",
    ],
    includeLabel: "Our service includes",
    bullets: [
      "Revenue and profit maximisation diagnosis",
      "Financial and operational diagnosis",
      "Review and strengthening of governance and control frameworks",
      "Cash-flow improvement and cost rationalisation",
      "Process and organisational restructuring",
      "Stakeholder and lender coordination support",
    ],
    closing: "Engagements are conducted with independence, discretion, and regulator-ready documentation, enabling sustainable recovery and durable business confidence.",
  },
  {
    id: "risk-controls-forensics",
    title: "Risk, Controls & Forensics",
    tagline: "Independent Review Before Risk Escalates",
    intro: [
      "Risk rarely announces itself. It escalates quietly through weak controls, governance blind spots, and delayed intervention. We help organisations identify and manage risks before they become exposed.",
    ],
    includeLabel: "Our services include",
    bullets: [
      "Enterprise Risk Management & Control Frameworks",
      "Information Systems & Data Integrity Audits",
      "AML, compliance, and regulatory risk reviews",
      "Forensic, investigative, and sensitive assignments",
    ],
    closing: "Our approach prioritises independence, discretion, and documentation that withstands regulatory and legal scrutiny.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  path: "/about/locations",
  title: "Our Services",
  description: "Explore Sabs Marks JVS advisory, audit, tax, governance, risk, and transformation services.",
});

export default function OurServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title="Our Services" />

      <section className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

        <div className="relative z-10 mb-14 grid gap-8 lg:grid-cols-[0.9fr_2.1fr] lg:items-end">
          <div className="max-w-md">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-surface-raised px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-ink">Strategic Capabilities</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Advisory depth across finance, governance, compliance, and execution.
            </h2>
          </div>

          <div className="glass-panel rounded-[2rem] border border-[var(--glass-border)] bg-surface/80 p-6 md:p-8">
            <p className="text-base leading-8 text-muted md:text-lg">
              We partner with leadership teams on the decisions, controls, and systems that determine long-term resilience. Each mandate is approached with structured analysis, commercial judgment, and the discipline required for regulator-ready execution.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-panel rounded-[2rem] border border-[var(--glass-border)] bg-surface/75 p-5 backdrop-blur-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-muted">Service Lines</p>
              <nav className="space-y-2">
                {serviceSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-transparent px-4 py-3 text-sm transition-all duration-300 hover:border-[var(--glass-border)] hover:bg-surface-raised"
                  >
                    <span className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-6 text-ink/85 group-hover:text-ink">{section.title}</span>
                    </span>
                    <span className="pt-1 text-muted transition-transform group-hover:translate-x-1">+</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-8">
            {serviceSections.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="glass-panel scroll-mt-28 rounded-[2rem] border border-[var(--glass-border)] bg-surface/90 p-7 shadow-xl shadow-slate-950/5 md:p-10"
              >
                <div className="mb-8 flex flex-col gap-5 border-b border-[var(--glass-border)] pb-8 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-accent/10 px-4 py-2">
                      <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-secondary">
                        Our Services
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{section.title}</h3>
                    <p className="mt-4 text-lg font-medium text-muted md:text-xl">{section.tagline}</p>
                  </div>

                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-accent via-accent-secondary to-transparent" />
                </div>

                <div className="space-y-6">
                  {section.intro.map((paragraph) => (
                    <p key={paragraph} className="text-[17px] leading-8 text-muted">
                      {paragraph}
                    </p>
                  ))}

                  <div className="rounded-[1.75rem] border border-[var(--glass-border)] bg-surface-raised/70 p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-accent">{section.includeLabel}</p>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 rounded-2xl bg-surface px-4 py-4 text-sm text-ink shadow-sm">
                          <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
                          <span className="leading-6">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {section.bridge?.map((paragraph) => (
                    <p key={paragraph} className="text-[17px] leading-8 text-muted">
                      {paragraph}
                    </p>
                  ))}

                  {section.secondaryBullets ? (
                    <div className="rounded-[1.75rem] border border-[var(--glass-border)] bg-gradient-to-br from-surface to-surface-raised p-6">
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-accent-secondary">
                        {section.secondaryLabel}
                      </p>
                      <ul className="space-y-3">
                        {section.secondaryBullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm text-ink">
                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent-secondary" />
                            <span className="leading-6">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <p className="rounded-[1.5rem] border border-[var(--glass-border)] bg-bg px-5 py-5 text-[16px] font-medium leading-7 text-ink/85">
                    {section.closing}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

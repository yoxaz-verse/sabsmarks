import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/careers",
  title: "Careers",
  description: "Join our teams across audit, tax, and advisory practices.",
});

export default function JoinUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="JOIN US" />

      <section className="mx-auto max-w-7xl px-6 py-16 text-muted md:px-12">
        <div className="mb-16 space-y-6 text-[15px] leading-8">
          <p>
            Due to our ambitious growth plans and rapidly growing practice in different functional areas, we are in constant need of energetic and enthusiastic professionals, who are keen on learning and taking up challenging roles within the organization.
          </p>
          <p>
            We are always on the look-out for bright and passionate professionals with diverse educational qualifications and experience in any of the following categories, who can think &quot;out of the box&quot;, are enthusiastic in learning and love to accept challenges.
          </p>
        </div>

        <div className="brand-card bg-[var(--surface)] p-10 md:p-14">
          <ul className="space-y-4 font-medium text-[15px] leading-7">
            <li className="flex items-start">
              <span className="brand-list-dot mr-4"></span>
              <span className="text-ink">Chartered Accountants</span>
            </li>
            <li className="flex items-start">
              <span className="brand-list-dot mr-4"></span>
              <span className="text-ink">Certified Information System Auditors/Diploma in Information Systems Audit/Certified Internal Auditor/Certified Fraud Examiner</span>
            </li>
            <li className="flex items-start">
              <span className="brand-list-dot mr-4"></span>
              <span className="text-ink">Company Secretaries</span>
            </li>
            <li className="flex items-start">
              <span className="brand-list-dot mr-4"></span>
              <span className="text-ink">Management Trainees (systems, finance or marketing) from reputed Institutes</span>
            </li>
            <li className="flex items-start">
              <span className="brand-list-dot mr-4"></span>
              <span className="text-ink">Articled Trainees</span>
            </li>
            <li className="flex items-start">
              <span className="brand-list-dot mr-4"></span>
              <span className="text-ink">Tax Assistants — Commerce Graduates or Post-Graduates (B. Com., M Com)</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

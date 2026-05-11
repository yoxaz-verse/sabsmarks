import { PageBanner } from "@/components/layout/page-banner";

export default function JoinUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="JOIN US" />
      
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 text-[#555]">
        <div className="space-y-6 text-[15px] leading-8 mb-16">
          <p>
            Due to our ambitious growth plans and rapidly growing practice in different functional areas, we are in constant need of energetic and enthusiastic professionals, who are keen on learning and taking up challenging roles within the organization.
          </p>
          <p>
            We are always on the look-out for bright and passionate professionals with diverse educational qualifications and experience in any of the following categories, who can think &quot;out of the box&quot;, are enthusiastic in learning and love to accept challenges.
          </p>
        </div>

        <div className="bg-[#18395f] text-white p-10 md:p-14 shadow-lg">
          <ul className="space-y-4 font-medium text-[15px] leading-7">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 mr-4 flex-shrink-0"></span>
              <span>Chartered Accountants</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 mr-4 flex-shrink-0"></span>
              <span>Certified Information System Auditors/Diploma in Information Systems Audit/Certified Internal Auditor/Certified Fraud Examiner</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 mr-4 flex-shrink-0"></span>
              <span>Company Secretaries</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 mr-4 flex-shrink-0"></span>
              <span>Management Trainees (systems, finance or marketing) from reputed Institutes</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 mr-4 flex-shrink-0"></span>
              <span>Articled Trainees</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 mr-4 flex-shrink-0"></span>
              <span>Tax Assistants — Commerce Graduates or Post-Graduates (B. Com., M Com)</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

const practices = [
  {
    id: "assurance",
    title: "ASSURANCE",
    subtitle: "NATURE OF SERVICES",
    bullets: [
      "Statutory Audit under various Indian statutes",
      "Advising clients on Foreign Group reporting pack of accounting data and assisting them in complying with requirements from global auditors",
      "Conversion/ Reconciliation from IGAAP to IFRS or US GAAP",
      "Accounting advisory",
      "Special Audits/ Investigations",
      "Attestation work required under different statutes",
    ]
  },
  {
    id: "grc",
    title: "GOVERNANCE RISK AND COMPLIANCE",
    subtitle: "NATURE OF SERVICES",
    bullets: [
      "Internal Audits and Risk Advisory",
      "SOP Development and Implementation",
      "Enterprise Risk Management (ERM)",
      "Information Systems Audit",
      "Regulatory Compliance Reviews"
    ]
  },
  {
    id: "direct-tax",
    title: "DIRECT TAX",
    subtitle: "NATURE OF SERVICES",
    bullets: [
      "Corporate Tax Advisory and Planning",
      "International Taxation and Transfer Pricing",
      "Tax Representation and Litigation Support",
      "Expatriate Taxation",
      "Withholding Tax Advisory"
    ]
  },
  {
    id: "indirect-tax",
    title: "INDIRECT TAX",
    subtitle: "NATURE OF SERVICES",
    bullets: [
      "GST Advisory and Compliance",
      "Customs Duty Advisory",
      "FEMA and Foreign Trade Policy",
      "Representation before Tax Authorities",
      "Indirect Tax Health Checks"
    ]
  },
  {
    id: "business-advisory",
    title: "BUSINESS ADVISORY",
    subtitle: "NATURE OF SERVICES",
    bullets: [
      "Mergers and Acquisitions Advisory",
      "Due Diligence and Valuations",
      "Business Restructuring",
      "Financial Modeling and Strategy",
      "Start-up Advisory and Incubation Support"
    ]
  }
];

export default function PracticeAreasPage() {
  const [activeTab, setActiveTab] = useState(practices[0].id);

  const activeContent = practices.find(p => p.id === activeTab) || practices[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="Practice Areas" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <p className="text-[15px] leading-7 text-[#555] mb-16 md:mb-20 max-w-5xl">
          A wide range of practice areas are covered to help our customers mitigate the risks of an ever-changing business environment. Spearheaded by service and sector specialists, each service vertical is backed by a highly analytical team of driven individuals that ensure clients grow in a competent and unified manner.
        </p>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Vertical Tabs Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-[2px]">
            {practices.map((practice) => {
              const isActive = activeTab === practice.id;
              return (
                <button
                  key={practice.id}
                  onClick={() => setActiveTab(practice.id)}
                  className={`text-left px-6 py-4 font-bold text-sm tracking-wide transition-colors ${
                    isActive
                      ? "bg-[#df8c20] text-white"
                      : "bg-[#18395f] text-white hover:bg-[#204a7a]"
                  }`}
                >
                  {practice.title}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-black mb-8">{activeContent.title}</h2>
            <h3 className="text-sm font-bold text-black mb-6 tracking-wide">{activeContent.subtitle}</h3>
            
            <ul className="space-y-4">
              {activeContent.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#555] mt-2.5 mr-4 flex-shrink-0"></span>
                  <span className="text-[15px] leading-7 text-[#555]">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

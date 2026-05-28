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
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Practice Areas" />

      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 relative">
        {/* Dynamic ambient orb for glass refraction */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent opacity-10 dark:opacity-20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <p className="text-[16px] leading-relaxed text-muted mb-12 max-w-4xl text-center mx-auto relative z-10">
          A wide range of practice areas are covered to help our customers mitigate the risks of an ever-changing business environment. Spearheaded by service and sector specialists, each service vertical is backed by a highly analytical team of driven individuals that ensure clients grow in a competent and unified manner.
        </p>

        {/* Unified Dashboard Window */}
        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row relative z-10 shadow-2xl border border-[var(--glass-border)] bg-surface/60 backdrop-blur-xl min-h-[750px] md:min-h-[650px]">
          
          {/* Left Pane: Navigation Sidebar */}
          <div className="w-full md:w-[380px] flex flex-col items-stretch gap-2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--glass-border)] bg-surface-raised/30 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-surface/40 to-transparent pointer-events-none"></div>
            <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-6 px-4">Service Verticals</h4>
            {practices.map((practice) => {
              const isActive = activeTab === practice.id;
              return (
                <div key={practice.id} className="w-full md:w-[320px] md:max-w-[320px] md:min-w-[320px] md:mx-auto">
                  <button
                    onClick={() => setActiveTab(practice.id)}
                    className={`block h-20 w-full min-w-full max-w-full px-6 py-4 text-left font-bold text-[13px] tracking-[0.08em] rounded-2xl transition-all duration-500 relative overflow-hidden group box-border ${
                      isActive
                        ? "bg-surface shadow-lg text-ink border border-[var(--glass-border)]"
                        : "text-muted bg-surface/45 hover:bg-surface/65 hover:text-ink border border-[var(--glass-border)]/70"
                    }`}
                  >
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent rounded-l-2xl shadow-[0_0_15px_var(--accent-glow)]"></div>
                    )}
                    {/* Active Background Glow */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-100"></div>
                    )}
                    {/* Hover background slide */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <span className="relative z-10 flex h-full w-full items-center justify-between gap-4">
                      <span className="line-clamp-2 leading-6">{practice.title}</span>
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

          {/* Right Pane: Content Area */}
          <div key={activeTab} className="flex-1 p-8 md:p-16 relative overflow-hidden flex flex-col justify-center min-h-[650px] md:min-h-[600px]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent opacity-[0.04] dark:opacity-[0.06] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent opacity-[0.02] dark:opacity-[0.03] rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10 max-w-3xl animate-fade-in" style={{ animationDuration: '600ms' }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8 backdrop-blur-sm">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent absolute"></div>
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest ml-1">{activeContent.subtitle}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-12 tracking-tight">
                {activeContent.title}
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-transparent rounded-full mb-10"></div>
              
              <ul className="space-y-6">
                {activeContent.bullets.map((bullet, index) => (
                  <li 
                    key={index} 
                    className="flex items-start group animate-fade-in"
                    style={{ animationDelay: `${150 + index * 100}ms`, animationFillMode: 'both' }}
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

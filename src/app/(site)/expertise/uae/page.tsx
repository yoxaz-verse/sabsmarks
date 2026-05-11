import { PageBanner } from "@/components/layout/page-banner";

export default function UAEPage() {
  const services = [
    {
      title: "Corporate Structuring & Setup",
      desc: "Advising on optimal corporate structures and assisting with company formation in Mainland, Free Zones, and Offshore jurisdictions across the UAE."
    },
    {
      title: "Tax & VAT Advisory",
      desc: "Comprehensive advisory on UAE Corporate Tax, Value Added Tax (VAT) implementation, compliance, and dispute resolution."
    },
    {
      title: "Audit & Assurance",
      desc: "Statutory audits, internal audits, and specialized financial reviews to ensure compliance with UAE regulations and international standards."
    },
    {
      title: "Economic Substance Regulations (ESR)",
      desc: "Assisting entities in assessing ESR applicability, preparing and filing notifications, and ensuring full compliance with UAE substance requirements."
    },
    {
      title: "Cross-Border Advisory",
      desc: "Strategic guidance on cross-border transactions, transfer pricing, and bilateral tax treaties between the UAE and India/global jurisdictions."
    },
    {
      title: "Outsourced Accounting & Payroll",
      desc: "End-to-end management of accounting, bookkeeping, and payroll functions tailored for UAE-based enterprises."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <PageBanner title="Services in UAE" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#18395f] mb-6">Cross-Border & Regional Support</h2>
          <div className="h-1 w-24 bg-[#df8c20] mb-8"></div>
          <p className="text-lg text-stone-600 max-w-3xl leading-relaxed">
            With a strong footprint in the United Arab Emirates, we provide seamless, integrated advisory and compliance services. We assist clients in navigating the UAE's evolving regulatory landscape, from initial market entry to complex cross-border structuring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:border-[#18395f]/30 transition-all duration-300 group">
              <div className="h-12 w-12 bg-[#18395f]/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#18395f] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#18395f] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#18395f] mb-4">{service.title}</h3>
              <p className="text-[15px] text-stone-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

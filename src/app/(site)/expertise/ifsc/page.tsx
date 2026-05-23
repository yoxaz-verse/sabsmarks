import { PageBanner } from "@/components/layout/page-banner";

export default function IFSCPage() {
  const services = [
    {
      title: "Entity Setup & Licensing",
      desc: "End-to-end assistance in incorporating entities, securing necessary licenses from IFSCA, and establishing operations in GIFT City."
    },
    {
      title: "Fund Management Services",
      desc: "Structuring and registering Alternative Investment Funds (AIFs), Portfolio Management Services (PMS), and other investment vehicles."
    },
    {
      title: "Tax Advisory & Structuring",
      desc: "Optimizing tax footprints under the IFSC framework, navigating tax holidays, and ensuring compliance with domestic and international tax laws."
    },
    {
      title: "Regulatory Compliance",
      desc: "Ongoing compliance support with IFSCA regulations, FEMA, RBI guidelines, and company law requirements specific to GIFT City."
    },
    {
      title: "Banking & Finance Advisory",
      desc: "Advising banking units, finance companies, and fintech entities on establishing and scaling operations within the IFSC ecosystem."
    },
    {
      title: "Aircraft & Ship Leasing",
      desc: "Specialized advisory for setting up and managing aircraft and ship leasing operations under the favorable IFSC regime."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <PageBanner title="Services in IFSC (GIFT City)" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Strategic Presence in India&apos;s Premier Financial Hub</h2>
          <div className="h-1 w-24 bg-accent-secondary mb-8"></div>
          <p className="text-lg text-muted max-w-3xl leading-relaxed">
            Gujarat International Finance Tec-City (GIFT City) is India&apos;s first operational smart city and International Financial Services Centre (IFSC). We provide specialized, end-to-end advisory services to help global and domestic entities capitalize on the unique regulatory and tax benefits offered within the IFSC framework.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="glass-panel p-8 rounded-[24px] hover-glow group relative overflow-hidden transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-500"></div>
              <div className="h-14 w-14 bg-surface-raised border border-[var(--glass-border)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500 relative z-10 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-accent group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ink mb-4 relative z-10">{service.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed relative z-10">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

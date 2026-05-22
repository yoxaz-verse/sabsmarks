import { PageBanner } from "@/components/layout/page-banner";

export default function LegacyPage() {
  const milestones = [
    { year: "1980", title: "Foundation", desc: "The firm was established with a core focus on audit and taxation." },
    { year: "1995", title: "Expansion", desc: "Expanded operations to major metropolitan cities across the country." },
    { year: "2005", title: "Global Reach", desc: "Established international associate networks and opened the first overseas office." },
    { year: "2015", title: "Specialization", desc: "Formed dedicated divisions for corporate finance, risk advisory, and forensic audit." },
    { year: "2023", title: "GIFT City", desc: "Launched specialized services in the IFSC (GIFT City) to serve global financial entities." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <PageBanner title="Legacy" />
      
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-32 w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#18395f] mb-6">Our Journey</h2>
          <div className="h-1 w-24 bg-[#df8c20] mx-auto mb-8"></div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Decades of professional excellence, built on trust, integrity, and an unwavering commitment to our clients&apos; success.
          </p>
        </div>

        <div className="relative border-l-2 border-[#18395f]/20 ml-4 md:ml-1/2">
          {milestones.map((item, i) => (
            <div key={i} className="mb-12 relative pl-8 md:pl-0">
              <div className="absolute w-5 h-5 bg-[#df8c20] rounded-full -left-[11px] top-1 border-4 border-stone-50 md:left-1/2 md:-ml-[10px]" />
              
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                <span className="text-[#df8c20] font-bold text-xl mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold text-[#18395f] mb-3">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

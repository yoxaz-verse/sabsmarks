import { PageBanner } from "@/components/layout/page-banner";

export default function ApproachPage() {
  const steps = [
    {
      num: "01",
      title: "Understanding Context",
      desc: "We begin by developing a deep understanding of your business, industry dynamics, and specific challenges before formulating any strategy."
    },
    {
      num: "02",
      title: "Partner-Led Delivery",
      desc: "Every engagement is spearheaded by a Partner, ensuring that you receive seasoned expertise and authoritative decision-making at every stage."
    },
    {
      num: "03",
      title: "Cross-Functional Integration",
      desc: "We break down silos, bringing together tax, audit, and advisory professionals to provide holistic solutions that address multi-faceted business issues."
    },
    {
      num: "04",
      title: "Actionable Insights",
      desc: "Beyond mere compliance, our focus is on delivering practical, actionable recommendations that add tangible value to your organization's bottom line."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <PageBanner title="Our Approach" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">A Structured, Client-Centric Methodology</h2>
          <div className="h-1 w-24 bg-accent-secondary mx-auto mb-8"></div>
          <p className="text-lg text-muted leading-relaxed">
            Our approach is built on decades of professional experience. We combine technical rigor with practical business acumen to deliver solutions that are not only compliant but highly effective in real-world scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-accent/10 -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="bg-surface p-8 md:p-10 rounded-2xl shadow-sm border border-[var(--glass-border)] relative z-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-6xl font-black text-ink/5 absolute top-6 right-8 select-none pointer-events-none">
                {step.num}
              </div>
              <div className="h-14 w-14 bg-accent-secondary text-white flex items-center justify-center font-bold text-xl rounded-xl mb-6 shadow-md">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold text-ink mb-4 relative z-10">{step.title}</h3>
              <p className="text-[16px] text-muted leading-relaxed relative z-10">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

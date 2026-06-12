import { PageBanner } from "@/components/layout/page-banner";
import { SiteOrnament } from "@/components/decorative/site-ornament";

export default function ApproachPage() {
  const steps = [
    {
      num: "01",
      title: "Precision over assumptions",
      desc: "We work from facts, context, and clear analysis before drawing conclusions."
    },
    {
      num: "02",
      title: "Structure over chaos",
      desc: "We bring disciplined processes to complex matters so decisions stay organized and actionable."
    },
    {
      num: "03",
      title: "Compliance without friction",
      desc: "We make regulatory obligations easier to manage without slowing the business down."
    },
    {
      num: "04",
      title: "Insight before actions",
      desc: "We prioritize understanding the issue fully before recommending the next step."
    },
    {
      num: "05",
      title: "Accountability at every level",
      desc: "We maintain ownership, transparency, and follow-through from strategy to execution."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <PageBanner title="Our Approach" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Our Approach</h2>
          <div className="h-1 w-24 bg-accent-secondary mx-auto mb-8"></div>
          <p className="text-2xl md:text-3xl font-semibold leading-snug text-ink">
            &ldquo;How you do anything is how you do everything&rdquo;
          </p>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Our approach is guided by five operating principles:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-accent/10 -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="decorated-panel bg-surface p-8 md:p-10 rounded-2xl shadow-sm border border-[var(--glass-border)] relative z-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <SiteOrnament mode="card" className="opacity-62" />
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

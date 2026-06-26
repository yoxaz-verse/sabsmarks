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

      <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-14 md:py-16 lg:px-8">
        <div className="mx-auto mb-10 grid max-w-5xl gap-5 text-center md:mb-12">
          <div className="mx-auto h-1 w-20 rounded-full bg-accent-secondary"></div>
          <p className="text-2xl font-semibold leading-tight text-ink text-balance md:text-3xl">
            &ldquo;How you do anything is how you do everything&rdquo;
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Our approach is guided by five operating principles:
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {steps.map((step, i) => (
            <article
              key={step.num}
              className={`decorated-panel min-h-[220px] overflow-hidden rounded-xl border border-[var(--glass-border)] bg-surface p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] sm:p-7 md:min-h-[236px] ${
                i === steps.length - 1 ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]" : ""
              }`}
            >
              <SiteOrnament mode="card" className="opacity-40" />
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-secondary text-base font-bold text-white shadow-[0_12px_28px_var(--accent-secondary-glow)]">
                  {step.num}
                </div>
                <div aria-hidden="true" className="select-none text-5xl font-black leading-none text-ink/[0.04] md:text-6xl">
                  {step.num}
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold leading-tight text-ink md:text-[1.35rem]">{step.title}</h3>
              <p className="max-w-xl text-[15px] leading-7 text-muted md:text-base">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

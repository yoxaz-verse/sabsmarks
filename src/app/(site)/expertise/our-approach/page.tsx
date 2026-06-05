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
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="Our Approach" />

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="brand-kicker inline-flex">Methodology</p>
          <h2 className="mt-6 text-3xl font-bold text-accent md:text-4xl">A Structured, Client-Centric Methodology</h2>
          <div className="brand-rule mx-auto mt-6" />
          <p className="mt-8 text-lg leading-relaxed text-muted">
            Our approach is built on decades of professional experience. We combine technical rigor with practical business acumen to deliver solutions that are not only compliant but highly effective in real-world scenarios.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="brand-card relative p-8 md:p-10">
              <div className="data-number absolute right-8 top-6 text-5xl text-[rgba(24,57,95,0.08)]">
                {step.num}
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-[var(--accent)] text-xl font-bold text-white">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold text-accent">{step.title}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

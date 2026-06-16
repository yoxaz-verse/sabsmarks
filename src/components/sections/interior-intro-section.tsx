import type { ReactNode } from "react";

type IntroStat = {
  value: string;
  label: string;
};

interface InteriorIntroSectionProps {
  kicker?: string;
  title: string;
  description?: string;
  body?: ReactNode;
  actions?: ReactNode;
  stats?: IntroStat[];
  align?: "start" | "center";
  className?: string;
}

export function InteriorIntroSection({
  kicker,
  title,
  description,
  body,
  actions,
  stats,
  align = "start",
  className = "",
}: InteriorIntroSectionProps) {
  const isCentered = align === "center";

  return (
    <section className={`site-section ${className}`.trim()}>
      <div className="site-container py-10 md:py-14">
        <div className="decorated-panel rounded-[1.4rem] px-1 py-1">
          <div className={`grid gap-5 ${stats?.length ? "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start" : ""}`}>
            <div className={`section-header ${isCentered ? "mx-auto text-center" : ""}`}>
              {kicker ? <div className={`section-kicker ${isCentered ? "mx-auto justify-center" : ""}`}>{kicker}</div> : null}
              <h2 className="section-title">{title}</h2>
              <div className={`section-rule ${isCentered ? "mx-auto" : ""}`}></div>
              {description ? (
                <p className={`section-copy ${isCentered ? "mx-auto" : ""}`}>{description}</p>
              ) : null}
              {body ? (
                <div className={`site-prose mt-5 ${isCentered ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>{body}</div>
              ) : null}
              {actions ? <div className={`mt-8 flex flex-wrap gap-4 ${isCentered ? "justify-center" : ""}`}>{actions}</div> : null}
            </div>

            {stats?.length ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {stats.map((item, index) => (
                  <div
                    key={item.label}
                    className={`site-card interactive-card rounded-[1.2rem] p-6 ${index % 2 === 1 ? "sm:translate-y-4" : ""}`}
                  >
                    <div className="text-4xl font-black text-accent">{item.value}</div>
                    <div className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-ink">{item.label}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

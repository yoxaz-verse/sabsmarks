"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Quote, ShieldCheck, TrendingUp, Cpu } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  quoteAuthorTitle: string;
  icon: typeof ShieldCheck;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    category: "GST & Indirect Tax Optimization",
    title: "Uncovering capital leakages for a scaling manufacturing conglomerate.",
    metric: "₹18.4 Cr",
    metricLabel: "Input tax credit recovered",
    description: "Reconciled ledger accounts and aligned vendor uploads across 12 manufacturing units, identifying extensive unclaimed input tax credits and optimizing their tax footprint.",
    quote: "Sabs Marks JVS identified structural tax recoveries that directly improved our quarterly working capital position. Their execution was flawless.",
    quoteAuthor: "Director of Finance",
    quoteAuthorTitle: "Leading Automotive Component Manufacturer",
    icon: TrendingUp,
  },
  {
    id: 2,
    category: "Corporate Finance & M&A Due Diligence",
    title: "Structuring a cross-border acquisition with absolute transaction security.",
    metric: "$48.5M",
    metricLabel: "Transaction Value Advisory",
    description: "Conducted comprehensive enterprise valuations, risk-control assessments, and due diligence reporting to support a mid-market SaaS provider's strategic exit.",
    quote: "The due diligence process was incredibly thorough, giving the acquiring board absolute confidence in the transactional records and scaling forecasts.",
    quoteAuthor: "Chief Executive Officer",
    quoteAuthorTitle: "Global Cloud Services Provider",
    icon: Cpu,
  },
  {
    id: 3,
    category: "Statutory Transition & Controls",
    title: "Transitioning controls to meet top-tier regulatory compliance guidelines.",
    metric: "Zero",
    metricLabel: "Audit Deficiencies over 3 years",
    description: "Implemented standard control frameworks (ICFR) and conducted forensic risk audits for a regional banking network, establishing institutional discipline.",
    quote: "Their team established a rigorous reporting cadence that stands up to regular regulatory inspection without disrupting day-to-day operations.",
    quoteAuthor: "Chief Risk Officer",
    quoteAuthorTitle: "Private Commercial Banking Group",
    icon: ShieldCheck,
  },
];

export function SuccessImpactSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CASE_STUDIES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const activeStudy = CASE_STUDIES[currentIndex];
  const Icon = activeStudy.icon;

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Metric and Details */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between h-full bg-surface/50 border border-[var(--glass-border)] rounded-[2rem] p-7 md:p-10 shadow-soft min-h-[440px]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="type-eyebrow rounded-full border border-accent/12 bg-accent/8 px-2.5 py-1 text-accent">
                {activeStudy.category}
              </span>
            </div>

            <h3 className="type-card-title mt-6 text-2xl text-ink md:text-3xl">
              {activeStudy.title}
            </h3>

            <p className="type-body-sm mt-4 text-muted">
              {activeStudy.description}
            </p>

            <div className="mt-8 border-t border-[var(--glass-border)] pt-6 flex items-start gap-4">
              <Quote className="h-6 w-6 text-accent/30 shrink-0 mt-1" />
              <div>
                <p className="type-body-sm italic text-muted">
                  &ldquo;{activeStudy.quote}&rdquo;
                </p>
                <p className="type-small mt-3 font-semibold text-ink">
                  {activeStudy.quoteAuthor}
                </p>
                <p className="type-eyebrow mt-0.5 text-muted">
                  {activeStudy.quoteAuthorTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Slider controls at the bottom */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[var(--glass-border)]/40">
            <div className="flex gap-1.5">
              {CASE_STUDIES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? "w-8 bg-accent" : "w-2.5 bg-accent/20 hover:bg-accent/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-surface/80 hover:bg-surface text-ink cursor-pointer transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-surface/80 hover:bg-surface text-ink cursor-pointer transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Stats Display Card */}
        <div className="lg:col-span-5">
          <div className="creative-card decorated-panel bg-[linear-gradient(135deg,var(--accent)_0%,#064b77_58%,#063c24_100%)] text-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between h-full min-h-[440px] shadow-strong relative overflow-hidden border-none">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
            <div className="absolute top-[40%] -left-[20%] w-[18rem] h-[18rem] rounded-full bg-accent-secondary/14 blur-[80px]" />
            
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
              <span className="type-eyebrow text-[color-mix(in_srgb,var(--accent-secondary)_25%,white)]">
                Key Performance Impact
              </span>
              <Icon className="h-6 w-6 text-[color-mix(in_srgb,var(--accent-secondary)_35%,white)]" />
            </div>

            <div className="relative z-10 py-8">
              <div className="data-number text-6xl leading-none text-white md:text-7xl">
                {activeStudy.metric}
              </div>
              <div className="type-eyebrow mt-4 max-w-xs text-[color-mix(in_srgb,var(--accent-secondary)_25%,white)]">
                {activeStudy.metricLabel}
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-5 text-xs text-[color-mix(in_srgb,var(--accent-secondary)_25%,white)] leading-relaxed font-semibold">
              Delivering data-backed confidence for corporate auditing and global supply operations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

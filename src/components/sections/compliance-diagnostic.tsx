"use client";

import { useState } from "react";
import { Calculator, ArrowLeft, CheckCircle2, Send, Sparkles } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

const INDUSTRIES: Option[] = [
  { label: "Financial Services & BFSI", value: "bfsi" },
  { label: "Manufacturing & Logistics", value: "mfg" },
  { label: "Real Estate & Infrastructure", value: "re" },
  { label: "IT, Software & ITES", value: "it" },
  { label: "Healthcare & Pharmaceuticals", value: "health" },
  { label: "NGOs, Trusts & Education", value: "ngo" },
];

const SCALES: Option[] = [
  { label: "Emerging Scaleup (Under $2M)", value: "emerging" },
  { label: "Mid-Market Growth ($2M - $10M)", value: "growth" },
  { label: "Corporate Expansion ($10M - $50M)", value: "mid-corp" },
  { label: "Large Enterprise (Over $50M)", value: "enterprise" },
];

const PAIN_POINTS: Option[] = [
  { label: "Statutory Audit Readiness", value: "audit" },
  { label: "GST & Tax Footprint Optimization", value: "tax" },
  { label: "Corporate Finance & Capital Raising", value: "finance" },
  { label: "Risk Management & Internal SOPs", value: "risk" },
];

export function ComplianceDiagnostic() {
  const [step, setStep] = useState<number>(1);
  const [industry, setIndustry] = useState<string>("");
  const [scale, setScale] = useState<string>("");
  const [painPoint, setPainPoint] = useState<string>("");
  
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  function reset() {
    setStep(1);
    setIndustry("");
    setScale("");
    setPainPoint("");
    setEmail("");
    setSubmitted(false);
  }

  // Calculate dynamic results based on selections
  function getScore() {
    let baseScore = 75;
    if (scale === "enterprise") baseScore -= 15; // larger company has more regulatory complexity
    if (scale === "mid-corp") baseScore -= 8;
    if (painPoint === "risk" || painPoint === "audit") baseScore -= 10; // high stakes areas
    return baseScore;
  }

  function getRecommendations() {
    const recs = [];
    if (painPoint === "audit") {
      recs.push("Establish automated Internal Control Financial Reporting (ICFR) systems.");
      recs.push("Execute pre-audit reconciliation scans 30 days before year-end.");
    } else if (painPoint === "tax") {
      recs.push("Review Input Tax Credit (ITC) matching sheets to recover lost GST.");
      recs.push("Establish unified cross-border transfer pricing policies.");
    } else if (painPoint === "finance") {
      recs.push("Conduct mock due diligence audits prior to capital raising rounds.");
      recs.push("Develop a 3-year structured capital-use blueprint for board sign-off.");
    } else {
      recs.push("Conduct segment-level forensic vulnerability testing.");
      recs.push("Standardize SOPs for procurement and asset cycles.");
    }

    if (industry === "bfsi" || industry === "health") {
      recs.push("Implement strict localized compliance logs to track regulatory changes.");
    } else if (industry === "mfg") {
      recs.push("Perform supply chain tax optimization review (GST/Customs structures).");
    }

    return recs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  const score = getScore();
  const recommendations = getRecommendations();

  return (
    <div className="mx-auto max-w-3xl border border-[var(--glass-border)] bg-surface/50 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink">Compliance Diagnostic</h3>
            <p className="text-xs text-muted">Instant assessment & structural recommendations</p>
          </div>
        </div>
        <div className="text-xs font-semibold text-muted bg-surface-raised px-3 py-1.5 rounded-full border border-[var(--glass-border)]">
          {step <= 3 ? `Step ${step} of 3` : "Result Summary"}
        </div>
      </div>

      {/* Steps Content */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h4 className="text-base font-bold text-ink mb-5">Select your industry vertical:</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {INDUSTRIES.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setIndustry(opt.value);
                  setStep(2);
                }}
                className={`text-left p-4.5 rounded-2xl border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  industry === opt.value
                    ? "bg-accent/6 border-accent text-accent shadow-sm"
                    : "bg-surface/40 border-[var(--glass-border)] text-ink hover:bg-surface hover:border-accent/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h4 className="text-base font-bold text-ink mb-5">What is the scaling size of your organization?</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {SCALES.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setScale(opt.value);
                  setStep(3);
                }}
                className={`text-left p-4.5 rounded-2xl border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  scale === opt.value
                    ? "bg-accent/6 border-accent text-accent shadow-sm"
                    : "bg-surface/40 border-[var(--glass-border)] text-ink hover:bg-surface hover:border-accent/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-ink cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h4 className="text-base font-bold text-ink mb-5">Identify your primary compliance/advisory challenge:</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAIN_POINTS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setPainPoint(opt.value);
                  setStep(4);
                }}
                className={`text-left p-4.5 rounded-2xl border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  painPoint === opt.value
                    ? "bg-accent/6 border-accent text-accent shadow-sm"
                    : "bg-surface/40 border-[var(--glass-border)] text-ink hover:bg-surface hover:border-accent/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-ink cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            {/* Score Ring */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4">
              <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-4 border-dashed border-accent/20 score-pulse">
                <div className="absolute inset-2 rounded-full bg-accent/5 flex flex-col items-center justify-center">
                  <span className="data-number bg-gradient-to-r from-accent to-accent-secondary text-3xl text-gradient">
                    {score}%
                  </span>
                  <span className="type-eyebrow mt-1 text-muted">
                    Risk Score
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold text-center text-muted">
                {score > 60 ? "Moderate compliance exposure" : "High structural exposure detected"}
              </p>
            </div>

            {/* Recommendations List */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <Sparkles className="h-4.5 w-4.5 text-accent" />
                <span>Recommended Action Plan</span>
              </div>
              <ul className="space-y-3">
                {recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 bg-surface/30 p-3.5 rounded-xl border border-[var(--glass-border)]">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-ink leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Consultation Lead Form */}
          <div className="mt-8 pt-8 border-t border-[var(--glass-border)]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter email to save diagnostic report"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-surface-raised px-4.5 py-3.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_color-mix(in_srgb,var(--accent)_22%,transparent)] hover:bg-accent/95 transition-all cursor-pointer"
                >
                  <span>Request Full PDF & Consultation</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-green-500/8 border border-green-500/15 rounded-xl p-4.5 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold">
                  Report requested successfully! Sabs Marks partners will contact you shortly at {email}.
                </span>
              </div>
            )}
          </div>

          <button
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-ink cursor-pointer"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

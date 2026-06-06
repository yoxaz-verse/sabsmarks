"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";

interface PageBannerProps {
  title: string;
  eyebrow?: string;
  description?: string;
  variant?: "default" | "contrast";
  actions?: ReactNode;
}

export function PageBanner({
  title,
  eyebrow = "CURRENT VIEW",
  description,
  variant = "default",
  actions,
}: PageBannerProps) {
  const { resolvedTheme } = useTheme();
  const isContrast = variant === "contrast";
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={`group relative w-full overflow-hidden border-b border-[var(--section-border)] transition-colors duration-500 ${
        isContrast
          ? "bg-[linear-gradient(135deg,#0b1220_0%,#101a31_42%,#162a52_100%)] py-14 text-white sm:py-18 md:py-22"
          : "bg-bg py-16 sm:py-18 md:py-24"
      }`}
    >
      <div
        className={`absolute inset-0 z-0 transition-colors duration-500 ${
          isContrast
            ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_18%_30%,rgba(74,137,255,0.28),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(121,167,255,0.16),transparent_24%)]"
            : "bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_38%),linear-gradient(180deg,rgba(30,58,138,0.05),transparent_55%)] dark:bg-[linear-gradient(135deg,rgba(74,137,255,0.08),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.3),transparent_55%)]"
        }`}
      ></div>

      <div
        className={`absolute inset-x-0 bottom-0 z-0 h-full transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black)] ${
          isContrast ? "opacity-[0.12] sm:opacity-[0.16]" : "opacity-[0.08] sm:opacity-[0.1] dark:opacity-[0.14]"
        }`}
        style={{
          backgroundImage: isContrast
            ? "linear-gradient(rgba(148,181,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,181,255,0.18) 1px, transparent 1px)"
            : "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          transform: "perspective(500px) rotateX(60deg) translateY(92px) scale(3)",
          transformOrigin: "bottom",
        }}
      ></div>

      <div
        className={`absolute -left-10 top-0 z-0 h-80 w-80 animate-blob rounded-full blur-[110px] transition-colors duration-500 ${
          isContrast ? "bg-[#5b8dff]/35 opacity-70" : "bg-accent/20 opacity-55 dark:opacity-25"
        }`}
      ></div>
      <div
        className={`animation-delay-2000 absolute -right-16 top-2 z-0 h-96 w-96 animate-blob rounded-full blur-[125px] transition-colors duration-500 ${
          isContrast ? "bg-[#1f3f82]/60 opacity-70" : "bg-accent-secondary/12 opacity-55 dark:bg-accent/16 dark:opacity-24"
        }`}
      ></div>

      <div
        className={`absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent to-transparent transition-colors duration-500 ${
          isContrast ? "from-white/10 opacity-80" : "from-white/30 opacity-60 dark:from-white/5 dark:opacity-40"
        }`}
      ></div>

      <div
        className={`pointer-events-none absolute inset-0 z-0 mix-blend-overlay transition-opacity duration-500 ${
          isContrast ? "opacity-[0.03]" : "opacity-[0.02] dark:opacity-[0.012]"
        }`}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-6 pt-4 md:px-12 md:pt-6 animate-fade-in">
        <div
          className={`mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm backdrop-blur-md transition-colors duration-500 sm:mb-6 ${
            isContrast
              ? "border border-white/12 bg-white/8"
              : "border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_78%,transparent)]"
          }`}
        >
          <div className={`h-2 w-2 rounded-full animate-pulse ${isContrast ? "bg-[#9cc0ff]" : "bg-accent"}`}></div>
          <span
            suppressHydrationWarning
            className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
              isContrast ? "text-white/90" : "text-ink/80 dark:text-white/95"
            }`}
          >
            {eyebrow}
          </span>
        </div>

        <h1
          className={`mb-3 max-w-4xl py-1 text-4xl font-bold tracking-[-0.05em] transition-colors duration-500 sm:text-5xl md:mb-4 md:text-6xl lg:text-[4.5rem] ${
            isContrast
              ? "text-white [text-shadow:0_16px_40px_rgba(2,6,23,0.35)]"
              : "text-ink dark:text-white"
          }`}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={`max-w-3xl text-base leading-8 md:text-lg ${
              isContrast ? "text-blue-50/92" : isDark ? "text-white/78" : "text-muted"
            }`}
          >
            {description}
          </p>
        ) : null}

        {actions ? <div className="mt-8 flex w-full flex-wrap items-center gap-3">{actions}</div> : null}

        <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
          <div className={`h-[3px] w-14 rounded-full transition-shadow duration-500 ${isContrast ? "bg-[#8db3ff] shadow-[0_0_20px_rgba(141,179,255,0.4)]" : "bg-accent shadow-[0_0_10px_var(--accent-glow)]"}`}></div>
          <div className={`h-[3px] w-7 rounded-full transition-colors duration-500 ${isContrast ? "bg-white/35" : "bg-accent/45"}`}></div>
        </div>
      </div>
    </div>
  );
}

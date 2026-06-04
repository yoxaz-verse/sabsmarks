"use client";

import { useTheme } from "next-themes";

interface PageBannerProps {
  title: string;
}

export function PageBanner({ title }: PageBannerProps) {
  const { resolvedTheme } = useTheme();
  const themeLabel = resolvedTheme === "dark" ? "DARK THEME" : "LIGHT THEME";

  return (
    <div className="group relative w-full overflow-hidden border-b border-[var(--glass-border)] bg-bg py-16 transition-colors duration-500 sm:py-20 md:py-32 dark:bg-ink">
      {/* Dynamic Backgrounds for Light/Dark Mode */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/80 via-white to-slate-50/80 transition-colors duration-500 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617]"></div>
      
      {/* 3D Perspective Grid overlay */}
      <div 
        className="absolute inset-x-0 bottom-0 z-0 h-full opacity-[0.08] transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black)] sm:opacity-[0.1] dark:opacity-10 sm:dark:opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(3)',
          transformOrigin: 'bottom'
        }}
      ></div>

      {/* Volumetric Glowing Blobs (Light Mode & Dark Mode) */}
      <div className="absolute -left-4 top-0 z-0 h-80 w-80 animate-blob rounded-full bg-blue-300/40 opacity-55 mix-blend-multiply blur-[90px] filter transition-colors duration-500 sm:h-96 sm:w-96 sm:opacity-70 sm:blur-[100px] dark:bg-accent dark:opacity-20 dark:mix-blend-screen dark:blur-[110px] sm:dark:opacity-40 sm:dark:blur-[128px]"></div>
      <div className="animation-delay-2000 absolute -right-4 top-0 z-0 h-80 w-80 animate-blob rounded-full bg-indigo-300/40 opacity-55 mix-blend-multiply blur-[90px] filter transition-colors duration-500 sm:h-96 sm:w-96 sm:opacity-70 sm:blur-[100px] dark:bg-accent-secondary dark:opacity-18 dark:mix-blend-screen dark:blur-[110px] sm:dark:opacity-40 sm:dark:blur-[128px]"></div>
      <div className="animation-delay-4000 absolute -bottom-8 left-12 z-0 h-72 w-72 animate-blob rounded-full bg-purple-300/40 opacity-50 mix-blend-multiply blur-[90px] filter transition-colors duration-500 sm:left-20 sm:h-96 sm:w-96 sm:opacity-70 sm:blur-[100px] dark:bg-blue-500 dark:opacity-16 dark:mix-blend-screen dark:blur-[110px] sm:dark:opacity-40 sm:dark:blur-[128px]"></div>
      
      {/* Light ray overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-60 transition-colors duration-500 dark:from-white/6 dark:opacity-30 sm:dark:from-white/10 sm:dark:opacity-50"></div>

      {/* Noise texture for premium feel */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay transition-opacity duration-500 dark:opacity-[0.01] sm:dark:opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-6 pt-6 md:px-12 md:pt-10 animate-fade-in">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-surface-raised/85 px-4 py-1.5 shadow-sm backdrop-blur-md transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_0_20px_rgba(15,23,42,0.32)] sm:mb-6">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse"></div>
          <span suppressHydrationWarning className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/80 transition-colors duration-500 dark:text-white/95">{themeLabel}</span>
        </div>
        
        <h1 className="mb-3 py-1 text-4xl font-bold tracking-[-0.05em] text-transparent transition-colors duration-500 bg-clip-text bg-gradient-to-br from-ink via-ink/90 to-ink/60 drop-shadow-sm sm:text-5xl md:mb-4 md:text-6xl lg:text-7xl dark:bg-none dark:text-white dark:[text-shadow:0_6px_22px_rgba(2,6,23,0.65)] sm:dark:text-transparent sm:dark:bg-clip-text sm:dark:bg-gradient-to-br sm:dark:from-white sm:dark:via-white sm:dark:to-slate-300/90 sm:dark:[text-shadow:0_10px_30px_rgba(2,6,23,0.5)]">
          {title}
        </h1>

        <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
          <div className="h-[4px] w-12 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)] transition-shadow duration-500 dark:shadow-[0_0_15px_var(--accent-glow)]"></div>
          <div className="h-[4px] w-2 rounded-full bg-accent/60 transition-colors duration-500 dark:bg-accent-secondary"></div>
          <div className="h-[4px] w-2 rounded-full bg-accent/30 transition-colors duration-500 dark:bg-accent/50"></div>
        </div>
      </div>
    </div>
  );
}

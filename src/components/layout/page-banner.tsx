"use client";

import { useTheme } from "next-themes";

interface PageBannerProps {
  title: string;
}

export function PageBanner({ title }: PageBannerProps) {
  const { resolvedTheme } = useTheme();
  const themeLabel = resolvedTheme === "dark" ? "DARK THEME" : "LIGHT THEME";

  return (
    <div className="relative w-full overflow-hidden py-20 md:py-32 border-b border-[var(--glass-border)] bg-bg dark:bg-ink group transition-colors duration-500">
      {/* Dynamic Backgrounds for Light/Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-slate-50/80 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617] z-0 transition-colors duration-500"></div>
      
      {/* 3D Perspective Grid overlay */}
      <div 
        className="absolute inset-x-0 bottom-0 h-full z-0 opacity-[0.1] dark:opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black)] transition-opacity duration-500" 
        style={{ 
          backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(3)',
          transformOrigin: 'bottom'
        }}
      ></div>

      {/* Volumetric Glowing Blobs (Light Mode & Dark Mode) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300/40 dark:bg-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] dark:blur-[128px] opacity-70 dark:opacity-40 animate-blob z-0 transition-colors duration-500"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-300/40 dark:bg-accent-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] dark:blur-[128px] opacity-70 dark:opacity-40 animate-blob animation-delay-2000 z-0 transition-colors duration-500"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-300/40 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] dark:blur-[128px] opacity-70 dark:opacity-40 animate-blob animation-delay-4000 z-0 transition-colors duration-500"></div>
      
      {/* Light ray overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/80 dark:from-white/10 via-transparent to-transparent opacity-60 dark:opacity-50 transition-colors duration-500"></div>

      {/* Noise texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] z-0 mix-blend-overlay pointer-events-none transition-opacity duration-500" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 flex flex-col items-start animate-fade-in pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-raised/80 dark:bg-white/5 border border-[var(--glass-border)] dark:border-white/10 backdrop-blur-md mb-6 shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-colors duration-500">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span suppressHydrationWarning className="text-xs font-semibold text-ink/80 dark:text-white/90 tracking-[0.2em] uppercase transition-colors duration-500">{themeLabel}</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter drop-shadow-sm dark:drop-shadow-2xl mb-4 py-2 text-transparent bg-clip-text bg-gradient-to-br from-ink via-ink/90 to-ink/60 dark:from-white dark:via-white/90 dark:to-white/60 transition-colors duration-500">
          {title}
        </h1>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[4px] w-12 bg-accent rounded-full shadow-[0_0_10px_var(--accent-glow)] dark:shadow-[0_0_15px_var(--accent-glow)] transition-shadow duration-500"></div>
          <div className="h-[4px] w-2 bg-accent/60 dark:bg-accent-secondary rounded-full transition-colors duration-500"></div>
          <div className="h-[4px] w-2 bg-accent/30 dark:bg-accent/50 rounded-full transition-colors duration-500"></div>
        </div>
      </div>
    </div>
  );
}

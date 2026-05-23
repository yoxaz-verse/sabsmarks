"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Only run on initial load
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200); // 1.2s loading screen

    const timer2 = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // remove from DOM after fade out completes (600ms fade)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg)] transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Cinematic logo reveal */}
        <div className="animate-fade-in mb-10 scale-110">
          <Logo />
        </div>
        
        {/* Loading line */}
        <div className="w-64 h-[2px] bg-gray-200 dark:bg-gray-800 overflow-hidden relative rounded-full opacity-80">
          <div className="absolute top-0 left-0 h-full bg-[#20a447] rounded-full animate-loader-progress"></div>
        </div>
        
        <div className="mt-6 text-xs font-semibold tracking-[0.3em] text-[#6d6e71] dark:text-stone-400 animate-pulse">
          INITIALIZING SECURE CONNECTION
        </div>
      </div>
    </div>
  );
}

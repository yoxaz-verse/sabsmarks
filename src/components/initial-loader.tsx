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
        <div className="animate-fade-in mb-10 scale-105">
          <Logo />
        </div>

        <div className="relative h-[2px] w-64 overflow-hidden rounded-full bg-[var(--mist-grey)] opacity-90">
          <div className="animate-loader-progress absolute top-0 left-0 h-full bg-[var(--accent-secondary)] rounded-full"></div>
        </div>

        <div className="mt-6 text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
          INITIALIZING SECURE CONNECTION
        </div>
      </div>
    </div>
  );
}

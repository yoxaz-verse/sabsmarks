"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";

const LOADER_SESSION_KEY = "smjvs-initial-loader-complete";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem(LOADER_SESSION_KEY) === "1") {
      setIsLoading(false);
      document.documentElement.classList.add("loader-complete");
      return;
    }

    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
      document.documentElement.classList.add("loader-complete");
    }, 1200);

    const timer2 = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
      }
      setIsLoading(false);
    }, 1800);

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
        <div className="animate-fade-in mb-10">
          <Logo className="w-[300px] sm:w-[360px]" />
        </div>

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

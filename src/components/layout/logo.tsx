import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center font-sans ${className || ""}`}>
      {/* Top Row: Sabs Marks JVS */}
      <div className="flex items-center gap-2 text-3xl md:text-4xl font-bold tracking-tight leading-none drop-shadow-sm">
        <span className="text-[var(--logo-text)] transition-colors">Sabs</span>
        <span className="text-[#20a447]">Marks</span>
        <span className="text-[var(--logo-text)] transition-colors">JVS</span>
      </div>
      
      {/* Middle Row: & Co. with lines */}
      <div className="flex items-center gap-3 w-full mt-2 px-1">
        <div className="h-[2px] flex-1 bg-[#20a447]"></div>
        <span className="text-[var(--logo-text)] font-bold text-lg md:text-xl whitespace-nowrap leading-none pb-1 transition-colors">
          & Co.
        </span>
        <div className="h-[2px] flex-1 bg-[#20a447]"></div>
      </div>
      
      {/* Bottom Row: Chartered Accountants */}
      <div className="text-[#6d6e71] dark:text-stone-400 text-sm md:text-base tracking-[0.15em] mt-1 font-medium leading-none transition-colors">
        Chartered Accountants
      </div>
    </div>
  );
}

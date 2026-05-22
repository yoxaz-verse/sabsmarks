import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center font-sans ${className || ""}`}>
      {/* Top Row: Sabs Marks JVS */}
      <div className="flex items-center gap-2 text-3xl md:text-4xl font-bold tracking-tight leading-none drop-shadow-md">
        <span className="text-white">Sabs</span>
        <span className="text-[#0ea5e9]">Marks</span>
        <span className="text-white">JVS</span>
      </div>
      
      {/* Middle Row: & Co. with lines */}
      <div className="flex items-center gap-3 w-full mt-2 px-1">
        <div className="h-[2px] flex-1 bg-[#0ea5e9] opacity-70 shadow-[0_0_8px_#0ea5e9]"></div>
        <span className="text-white font-bold text-lg md:text-xl whitespace-nowrap leading-none pb-1">
          & Co.
        </span>
        <div className="h-[2px] flex-1 bg-[#0ea5e9] opacity-70 shadow-[0_0_8px_#0ea5e9]"></div>
      </div>
      
      {/* Bottom Row: Chartered Accountants */}
      <div className="text-stone-300 text-sm md:text-base tracking-[0.15em] mt-1 font-medium leading-none">
        Chartered Accountants
      </div>
    </div>
  );
}

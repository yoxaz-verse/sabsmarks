import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className || ""}`}>
      <div className="font-sans text-[1.8rem] font-extrabold leading-none tracking-[-0.05em] md:text-[2.35rem]">
        <span className="text-[#1773bb]">Sabs </span>
        <span className="text-[#2cb34a]">Marks </span>
        <span className="text-[#1773bb]">JVS</span>
      </div>

      <div className="mt-2 flex w-full min-w-[13rem] items-center gap-3 md:min-w-[16rem] md:gap-4">
        <div className="h-[2px] flex-1 bg-[#2cb34a]" />
        <span className="whitespace-nowrap font-sans text-[0.95rem] font-extrabold leading-none tracking-[-0.03em] text-[#1773bb] md:text-[1.2rem]">
          &amp; Co.
        </span>
        <div className="h-[2px] flex-1 bg-[#2cb34a]" />
      </div>

      <div className="mt-2 font-[Georgia] text-[0.78rem] font-medium leading-none tracking-[0.34em] text-[#4f5257] md:text-[1rem]">
        Chartered Accountants
      </div>
    </div>
  );
}

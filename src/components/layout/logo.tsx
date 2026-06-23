import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`logo-lockup flex shrink-0 items-center gap-3 ${className || ""}`}>
      <span className="logo-lockup-bg" aria-hidden="true" />
      <div className="relative z-[1] w-[25%] shrink-0">
        <Image
          src="/ca-india-logo.png"
          alt="CA India"
          width={520}
          height={350}
          priority
          sizes="(max-width: 640px) 72px, 88px"
          className="h-auto w-full object-contain logo-image"
        />
      </div>
      <Image
        src="/logo-primary.png"
        alt="Sabs Marks JVS & Co. Chartered Accountants"
        width={948}
        height={232}
        priority
        sizes="(max-width: 640px) 205px, 250px"
        className="relative z-[1] h-auto min-w-0 flex-1 object-contain logo-image"
      />
    </div>
  );
}

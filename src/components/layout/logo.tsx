import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`w-[220px] shrink-0 sm:w-[260px] ${className || ""}`}>
      <Image
        src="/logo-primary.png"
        alt="Sabs Marks JVS & Co. Chartered Accountants"
        width={948}
        height={232}
        priority
        sizes="(max-width: 640px) 220px, 260px"
        className="h-auto w-full object-contain logo-image"
      />
    </div>
  );
}

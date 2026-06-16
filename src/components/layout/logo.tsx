import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex w-[290px] shrink-0 items-center gap-3 sm:w-[350px] ${className || ""}`}>
      <div className="w-[72px] shrink-0 sm:w-[88px]">
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
        className="h-auto min-w-0 flex-1 object-contain logo-image"
      />
    </div>
  );
}

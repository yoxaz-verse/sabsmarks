import React from "react";

interface PageBannerProps {
  title: string;
}

export function PageBanner({ title }: PageBannerProps) {
  return (
    <div className="relative w-full bg-[#18395f] text-white overflow-hidden py-16 md:py-24">
      {/* Geometric pattern on the right */}
      <div className="absolute top-0 right-0 h-full w-1/2 md:w-1/3 opacity-40 pointer-events-none">
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 h-full object-cover translate-x-1/4 scale-150"
        >
          <path
            d="M200 50L300 100v100L200 250l-100-50V100l100-50z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M300 100l100-50v100l-100 50M200 250l100 50v-100M100 200l-100 50M100 100L0 50"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M200 50v100M100 100l100 50M300 100l-100 50M200 150v100M300 200l-100-50M100 200l100-50"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">
          {title}
        </h1>
        <div className="mt-6 h-[4px] w-24 bg-[#df8c20]"></div>
      </div>
    </div>
  );
}

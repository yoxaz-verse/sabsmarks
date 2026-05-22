"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { MenuItem } from "@/types/cms";
import { useState } from "react";

export function MegaNav({ groups }: { groups: Record<string, MenuItem[]> }) {
  const pathname = usePathname();
  const ordered = ["About", "Services", "Leadership", "Location", "Contact"];
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  return (
    <nav className="hidden xl:block">
      <div className="flex items-center gap-8">
        {ordered.map((group) => {
          const items = groups[group] ?? [];
          if (!items.length) return null;

          const isSingleLink = items.length === 1;
          const isActive = items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
          const isHovered = hoveredGroup === group;

          if (isSingleLink) {
            const item = items[0];
            return (
              <Link
                key={group}
                href={item.href}
                className={`flex items-center text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-200 ${
                  isActive ? "text-[#df8c20]" : "text-[#222] hover:text-[#df8c20]"
                }`}
              >
                {group}
              </Link>
            );
          }

          return (
            <div
              key={group}
              className="group relative py-4"
              onMouseEnter={() => setHoveredGroup(group)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <button
                className={`flex items-center gap-1 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-200 cursor-default ${
                  isActive || isHovered ? "text-[#df8c20]" : "text-[#222] hover:text-[#df8c20]"
                }`}
              >
                {group}
                {isHovered ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} /> : <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={3} />}
              </button>

              <div
                className={`absolute left-0 top-[100%] z-50 min-w-[240px] pt-2 transition-all duration-200 ease-out origin-top-left ${
                  isHovered ? "pointer-events-auto translate-y-0 opacity-100 scale-100" : "pointer-events-none -translate-y-2 opacity-0 scale-95"
                }`}
              >
                <div className="rounded bg-white p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                  <div className="flex flex-col gap-1">
                    {items.map((item, index) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        style={{
                          transitionDelay: isHovered ? `${index * 75 + 100}ms` : "0ms",
                        }}
                        className={`block rounded px-4 py-2.5 text-[14px] font-semibold text-[#333] hover:bg-stone-50 hover:text-[#df8c20] transition-all duration-300 ease-out ${
                          isHovered ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { MenuItem } from "@/types/cms";
import { useState } from "react";

export function MegaNav({ groups }: { groups: Record<string, MenuItem[]> }) {
  const pathname = usePathname();
  const ordered = ["Home", "About", "Expertise", "Insights", "Career", "Contact"];
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
                className={`flex items-center text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-ink hover:text-accent-secondary"
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
                className={`flex cursor-default items-center gap-1 text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 ${
                  isActive || isHovered ? "text-accent" : "text-ink hover:text-accent-secondary"
                }`}
              >
                {group}
                {isHovered ? (
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={3} />
                )}
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-[100%] z-50 min-w-[240px] pt-2 transition-all duration-200 ease-out origin-top-left ${
                  isHovered
                    ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                    : "pointer-events-none -translate-y-2 opacity-0 scale-95"
                }`}
              >
                <div className="min-w-[16rem] rounded-md border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_14px_32px_rgba(24,57,95,0.08)]">
                  <div className="flex flex-col gap-1">
                    {items.map((item, index) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        style={{
                          transitionDelay: isHovered ? `${index * 75 + 100}ms` : "0ms",
                        }}
                        className={`block rounded-sm border-l-2 border-transparent px-4 py-2.5 text-[14px] font-semibold text-ink transition-all duration-300 ease-out hover:border-[var(--accent-secondary)] hover:bg-[var(--surface-raised)] hover:text-accent ${
                          isHovered
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-4 opacity-0"
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { MenuItem } from "@/types/cms";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MegaNav({ groups }: { groups: Record<string, MenuItem[]> }) {
  const pathname = usePathname();
  const ordered = ["Home", "About", "Expertise", "Blog", "Career", "Contact"];
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  return (
    <nav className="hidden xl:block">
      <div className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_58%,transparent)] px-3 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl">
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
                className={`rounded-full px-3 py-2 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${
                  isActive ? "bg-accent/10 text-accent" : "text-ink hover:text-accent"
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
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 cursor-default ${
                  isActive || isHovered ? "bg-accent/10 text-accent" : "text-ink hover:text-accent"
                }`}
              >
                {group}
                {isHovered ? (
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={3} />
                )}
              </button>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-[100%] z-50 min-w-[240px] pt-2 pointer-events-auto origin-top-left"
                  >
                    <div className="rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
                      <div className="flex flex-col gap-1">
                        {items.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className="block rounded-xl px-4 py-3 text-[14px] font-semibold text-ink hover:bg-surface-raised hover:text-accent transition-all duration-300 ease-out"
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

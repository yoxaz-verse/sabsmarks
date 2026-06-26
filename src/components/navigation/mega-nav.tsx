"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { MenuItem } from "@/types/cms";
import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ActiveNavGroup = {
  group: string;
  pathname: string;
};

export function MegaNav({ groups }: { groups: Record<string, MenuItem[]> }) {
  const pathname = usePathname();
  const ordered = ["Home", "About", "Expertise", "Blog", "Career", "Contact"];
  const navRef = useRef<HTMLElement | null>(null);
  const ignoreNextClickRef = useRef(false);
  const menuIdPrefix = useId();
  const [hoverGroup, setHoverGroup] = useState<ActiveNavGroup | null>(null);
  const [pinnedGroup, setPinnedGroup] = useState<ActiveNavGroup | null>(null);
  const activeGroup = pinnedGroup?.pathname === pathname
    ? pinnedGroup.group
    : hoverGroup?.pathname === pathname
      ? hoverGroup.group
      : null;

  useEffect(() => {
    if (!activeGroup) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || navRef.current?.contains(target)) return;
      setHoverGroup(null);
      setPinnedGroup(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHoverGroup(null);
        setPinnedGroup(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGroup]);

  return (
    <nav ref={navRef} className="hidden xl:block">
      <div className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_58%,transparent)] px-3 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        {ordered.map((group) => {
          const items = groups[group] ?? [];
          if (!items.length) return null;

          const isSingleLink = items.length === 1;
          const isActive = items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
          const isOpen = activeGroup === group;
          const menuId = `${menuIdPrefix}-${group.toLowerCase()}-menu`;

          if (isSingleLink) {
            const item = items[0];
            return (
              <Link
                key={group}
                href={item.href}
                onClick={() => {
                  setHoverGroup(null);
                  setPinnedGroup(null);
                }}
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
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHoverGroup({ group, pathname });
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") setHoverGroup(null);
              }}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={menuId}
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${
                  isActive || isOpen ? "bg-accent/10 text-accent" : "text-ink hover:text-accent"
                }`}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse") return;

                  ignoreNextClickRef.current = true;
                  setHoverGroup(null);
                  setPinnedGroup((current) => (current?.group === group && current.pathname === pathname ? null : { group, pathname }));
                }}
                onClick={() => {
                  if (ignoreNextClickRef.current) {
                    ignoreNextClickRef.current = false;
                    return;
                  }

                  setHoverGroup(null);
                  setPinnedGroup((current) => (current?.group === group && current.pathname === pathname ? null : { group, pathname }));
                }}
              >
                {group}
                {isOpen ? (
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={3} />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={3} />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={menuId}
                    role="menu"
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
                              role="menuitem"
                              onClick={() => {
                                setHoverGroup(null);
                                setPinnedGroup(null);
                              }}
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

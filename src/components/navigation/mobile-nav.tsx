"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/layout/logo";
import type { MenuItem } from "@/types/cms";
import { motion, AnimatePresence } from "framer-motion";

const ORDERED_GROUPS = ["Home", "About", "Expertise", "Blog", "Career", "Contact"] as const;
const EDGE_SWIPE_ZONE_PX = 32;
const SWIPE_DISTANCE_PX = 56;
const VERTICAL_GESTURE_TOLERANCE_PX = 42;

export function MobileNav({ groups }: { groups: Record<string, MenuItem[]> }) {
  const pathname = usePathname();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const navGroups = useMemo(
    () =>
      ORDERED_GROUPS.map((group) => ({
        group,
        items: groups[group] ?? [],
      })).filter((entry) => entry.items.length > 0),
    [groups]
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      const canStartOpeningSwipe = !isOpen && touch.clientX <= EDGE_SWIPE_ZONE_PX;
      if (!isOpen && !canStartOpeningSwipe) {
        touchStart.current = null;
        return;
      }

      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current;
      const touch = event.changedTouches[0];
      touchStart.current = null;

      if (!start || !touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = Math.abs(touch.clientY - start.y);
      if (deltaY > VERTICAL_GESTURE_TOLERANCE_PX || Math.abs(deltaX) < SWIPE_DISTANCE_PX) return;

      if (!isOpen && deltaX > 0) {
        setIsOpen(true);
      }

      if (isOpen && deltaX < 0) {
        setIsOpen(false);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen]);

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-[99980] overflow-hidden"
          aria-hidden={!isOpen}
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-black/45"
            onClick={() => setIsOpen(false)}
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            id="mobile-nav-drawer"
            className="absolute left-0 top-0 h-full w-[86%] max-w-sm border-r border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--bg)_96%,transparent)] shadow-[24px_0_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl"
          >
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo className="w-[145px] sm:w-[165px]" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-ink shadow-[0_12px_28px_rgba(15,23,42,0.12)] hover:border-accent/35 hover:text-accent"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="h-[calc(100%-77px)] overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            {navGroups.map(({ group, items }) => {
              const isSingleLink = items.length === 1;
              const isGroupActive = items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

              if (isSingleLink) {
                const item = items[0];
                return (
                  <Link
                    key={group}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-md px-3 py-3 text-sm font-semibold tracking-[0.04em] transition-colors ${
                      isGroupActive ? "bg-surface-raised text-accent" : "text-ink hover:bg-surface-raised hover:text-accent"
                    }`}
                  >
                    {group}
                  </Link>
                );
              }

              const isExpanded = expandedGroup === group;

              return (
                <div key={group} className="rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_76%,transparent)]">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-group-${group}`}
                    className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold tracking-[0.04em] transition-colors ${
                      isGroupActive ? "text-accent" : "text-ink hover:text-accent"
                    }`}
                    onClick={() => setExpandedGroup((prev) => (prev === group ? null : group))}
                  >
                    <span>{group}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        id={`mobile-group-${group}`}
                        className="overflow-hidden"
                      >
                        <div className="min-h-0 border-t border-[var(--glass-border)]">
                      <div className="flex flex-col p-2">
                        {items.map((item) => {
                          const isItemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                                isItemActive
                                  ? "bg-surface text-accent"
                                  : "text-ink/90 hover:bg-surface hover:text-accent"
                              }`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
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
  </motion.aside>
</div>
)}
</AnimatePresence>
);

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_72%,transparent)] text-ink shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-colors hover:text-accent"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMounted ? createPortal(drawer, document.body) : null}
    </>
  );
}

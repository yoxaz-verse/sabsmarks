"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { MenuItem } from "@/types/cms";

const ORDERED_GROUPS = ["Home", "About", "Expertise", "Blog", "Career", "Contact"] as const;

export function MobileNav({ groups }: { groups: Record<string, MenuItem[]> }) {
  const pathname = usePathname();
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

      <div
        className={`xl:hidden fixed inset-0 z-[120] overflow-hidden transition-opacity duration-200 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        />

        <aside
          id="mobile-nav-drawer"
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink">Menu</p>
            <button
              type="button"
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] text-ink hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="h-[calc(100%-65px)] overflow-y-auto px-4 py-4">
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

                    <div
                      id={`mobile-group-${group}`}
                      className={`grid overflow-hidden transition-all duration-200 ${
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}

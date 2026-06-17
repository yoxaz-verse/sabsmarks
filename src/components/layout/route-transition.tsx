"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

const EXIT_DELAY_MS = 190;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isModifiedClick(event: MouseEvent | ReactMouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function getPageLabel(anchor: HTMLAnchorElement, url: URL) {
  const ariaLabel = anchor.getAttribute("aria-label")?.trim();
  if (ariaLabel) return ariaLabel;

  const textLabel = anchor.textContent?.replace(/\s+/g, " ").trim();
  if (textLabel) return textLabel;

  const segment = url.pathname.split("/").filter(Boolean).at(-1);
  if (!segment) return "Home";

  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function shouldHandleNavigation(anchor: HTMLAnchorElement, event: MouseEvent, currentUrl: URL) {
  if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download") || anchor.dataset.noTransition === "true") return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return false;
  if (/^(mailto|tel|sms):/i.test(href)) return false;

  const nextUrl = new URL(href, currentUrl.href);
  if (nextUrl.origin !== currentUrl.origin) return false;

  const samePathAndSearch = nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search;
  if (samePathAndSearch) return false;

  return true;
}

export function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("next page");
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetTimer = setTimeout(() => setIsExiting(false), 0);
    return () => clearTimeout(resetTimer);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const currentUrl = new URL(window.location.href);
      if (!shouldHandleNavigation(anchor, event, currentUrl)) return;

      const nextUrl = new URL(anchor.href, currentUrl.href);
      event.preventDefault();

      if (prefersReducedMotion()) {
        router.push(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
        return;
      }

      setTransitionLabel(getPageLabel(anchor, nextUrl));
      setIsExiting(true);

      if (exitTimer.current) clearTimeout(exitTimer.current);
      exitTimer.current = setTimeout(() => {
        router.push(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
      }, EXIT_DELAY_MS);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [router]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`route-transition-overlay ${isExiting ? "is-active" : ""}`}
    >
      <div className="route-transition-card">
        <div className="route-transition-line">
          <span></span>
        </div>
        <p>Opening {transitionLabel}</p>
      </div>
    </div>
  );
}

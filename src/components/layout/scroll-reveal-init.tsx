"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Run observer setup after Next.js finishes DOM render
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll(".reveal");

      const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly inside the viewport for better UX
        threshold: 0.05, // Trigger when 5% of the element is visible
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      revealElements.forEach((el) => {
        if (!el.classList.contains("active")) {
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

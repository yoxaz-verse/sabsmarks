"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const SEGMENT_LABELS: Record<string, string> = {
  about: "About",
  locations: "Locations",
  team: "Leadership",
  legacy: "Legacy",
  expertise: "Expertise",
  uae: "UAE",
  ifsc: "IFSC",
  "our-approach": "Our Approach",
  careers: "Careers",
  philosophy: "Philosophy",
  alumni: "Alumni",
  publications: "Publications",
  blog: "Blog",
  contact: "Contact",
  "practice-areas": "Services",
  "terms-and-conditions": "Terms & Conditions",
  "privacy-policy": "Privacy Policy",
  "industry-solutions": "Industry Solutions",
};

function getSegmentLabel(segment: string): string {
  if (SEGMENT_LABELS[segment]) {
    return SEGMENT_LABELS[segment];
  }
  // Fallback: capitalize and replace dashes with spaces
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // If we are on the homepage, we don't need breadcrumbs in a banner (homepage usually has a custom hero)
  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav flex items-center">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium uppercase tracking-[0.14em] text-white/60 hover:text-white transition-colors duration-200"
          >
            <Home className="mr-1.5 h-3.5 w-3.5 opacity-80" />
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = getSegmentLabel(segment);

          return (
            <li key={segment} className="inline-flex items-center">
              <ChevronRight className="mx-1 h-3 w-3 text-white/30" />
              {isLast ? (
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/95" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-xs font-medium uppercase tracking-[0.14em] text-white/60 hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

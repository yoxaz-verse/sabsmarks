import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/practice-areas",
  title: "Services",
  description: "Comprehensive corporate finance, audit, tax, governance, risk, and business advisory services.",
});

export default function PracticeAreasLayout({ children }: { children: React.ReactNode }) {
  return children;
}

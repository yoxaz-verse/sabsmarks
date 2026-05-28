import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/practice-areas",
  title: "Practice Areas",
  description: "Comprehensive audit, tax, governance, and advisory service lines.",
});

export default function PracticeAreasLayout({ children }: { children: React.ReactNode }) {
  return children;
}

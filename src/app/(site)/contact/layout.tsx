import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact",
  description: "Contact Sabs Marks JVS & Co. across our office locations.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

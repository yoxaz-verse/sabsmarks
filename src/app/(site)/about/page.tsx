import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: "Learn about Sabs Marks JVS PVT LTD, our legacy, leadership, and advisory philosophy.",
});

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="The Firm" />

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="brand-kicker mb-6">About Us</p>
            <h2 className="text-4xl font-bold leading-tight text-accent md:text-5xl lg:text-6xl">
              A Legacy of Trust and Excellence.
            </h2>
            <div className="brand-rule mt-8" />

            <div className="mt-10 space-y-6 text-lg leading-8 text-muted">
              <p>
                Sabs Marks JVS &amp; Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
              </p>
              <p>
                Established in 1985, the firm has grown into a trusted third-generation practice built on a legacy of expertise, integrity, and client-centric service. With a strong focus on the MSME sector, we support businesses of all sizes with tailored solutions that address both routine and complex business requirements.
              </p>
              <p>
                Guided by the values of Integrity, Competence, and Professionalism, our experienced team delivers strategic, practical, and legally sound advice to help clients navigate challenges, ensure compliance, and achieve sustainable growth through a personalized approach.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/about/team" className="brand-button">
                <span>Meet Our Leadership</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/about/locations" className="brand-button brand-button-secondary">
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { value: "35+", label: "Years of Trust" },
              { value: "15+", label: "Partners" },
              { value: "250+", label: "Professionals" },
              { value: "8", label: "Global Locations" },
            ].map((stat) => (
              <div key={stat.label} className="brand-card flex min-h-[12rem] flex-col items-center justify-center p-8 text-center">
                <span className="data-number text-5xl text-accent md:text-6xl">{stat.value}</span>
                <span className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

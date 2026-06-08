import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { getInsights } from "@/lib/content/service";
import { PageBanner } from "@/components/layout/page-banner";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { SITE_VISUALS } from "@/lib/site-visuals";

export const metadata: Metadata = buildPageMetadata({
  path: "/insights",
  title: "Insights",
  description: "Insights and thought leadership on audit, tax, and business advisory matters.",
});

export default async function InsightsPage() {
  const insights = await getInsights({ page: 1 });

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Insights & Knowledge" />

      <section className="site-section">
        <div className="site-container py-16 md:py-20">
          <div className="section-header">
            <div className="section-kicker">Insights</div>
            <h2 className="section-title">Knowledge presented in a format that is easier to scan and return to.</h2>
            <div className="section-rule"></div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10 animate-fade-in">
          {insights.data.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="site-card interactive-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image_url ?? SITE_VISUALS.insights.fallback}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.06),rgba(8,15,30,0.32))]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/6 via-transparent to-accent-secondary/6 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10 flex h-full flex-col p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-raised shadow-inner transition-transform duration-500 group-hover:scale-110 border border-[var(--glass-border)]">
                    <BookOpen className="w-5 h-5 text-accent drop-shadow-sm" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full border border-[var(--glass-border)] bg-surface-raised px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted group-hover:border-accent/30 transition-colors">
                    Article
                  </span>
                </div>

                <h2 className="mb-4 line-clamp-2 text-2xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h2>

                <div className="mb-4 h-px w-12 bg-accent-secondary/20 transition-all duration-500 group-hover:w-full"></div>

                <p className="mb-8 flex-grow line-clamp-3 text-[15px] leading-7 text-muted">
                  {post.excerpt ?? post.summary}
                </p>

                <div className="mt-auto flex items-center text-sm font-bold text-ink transition-colors duration-300 group-hover:text-accent">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}

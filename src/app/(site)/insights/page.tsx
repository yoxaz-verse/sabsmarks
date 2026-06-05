import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { getInsights } from "@/lib/content/service";
import { PageBanner } from "@/components/layout/page-banner";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  path: "/insights",
  title: "Insights",
  description: "Insights and thought leadership on audit, tax, and business advisory matters.",
});

export default async function InsightsPage() {
  const insights = await getInsights({ page: 1 });

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="Insights & Knowledge" />

      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {insights.data.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="brand-card flex h-full flex-col p-8 transition-colors hover:border-[var(--accent-secondary)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--cloud)]">
                  <BookOpen className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <span className="brand-tag">Article</span>
              </div>

              <h2 className="text-2xl font-bold text-accent line-clamp-2">
                {post.title}
              </h2>

              <div className="brand-rule mt-5" />

              <p className="mb-8 mt-5 flex-grow text-[15px] leading-7 text-muted line-clamp-3">
                {post.excerpt ?? post.summary}
              </p>

              <div className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-[0.14em] text-accent">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { PageBanner } from "@/components/layout/page-banner";
import { buildCmsPageMetadata, buildPageMetadata } from "@/lib/seo";
import { getCollection, getPageBySlug } from "@/lib/content/service";
import { ImageFeatureCard } from "@/components/media/image-feature-card";
import { SITE_VISUALS } from "@/lib/site-visuals";

const fallbackDescription = "Join our teams across audit, tax, and advisory practices.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("careers");
  if (page) return buildCmsPageMetadata(page.page, "/careers", fallbackDescription);

  return buildPageMetadata({
    path: "/careers",
    title: "Careers",
    description: fallbackDescription,
  });
}

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function JoinUsPage() {
  const [page, opportunities] = await Promise.all([getPageBySlug("careers"), getCollection("careers", 24)]);

  const hero = page?.sections.find((section) => section.section_type === "hero")?.payload as Record<string, unknown> | undefined;
  const intro = page?.sections.find((section) => section.section_type === "rich_text")?.payload as Record<string, unknown> | undefined;

  const title = typeof hero?.headline === "string" ? hero.headline : "Join Us";
  const description =
    typeof hero?.subtext === "string"
      ? hero.subtext
      : "Explore opportunities to grow with Sabs Marks JVS across audit, tax, and advisory.";
  const introTitle =
    typeof intro?.title === "string"
      ? intro.title
      : "Build your career with a firm that values curiosity and responsibility.";
  const introBody =
    typeof intro?.content === "string"
      ? intro.content
      : "Due to our ambitious growth plans and rapidly growing practice in different functional areas, we are in constant need of energetic and enthusiastic professionals who are keen on learning and taking up challenging roles within the organization.\n\nWe are always on the look-out for bright and passionate professionals with diverse educational qualifications and experience, who can think outside the box, are enthusiastic about learning, and love to accept challenges.";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title={title} description={description} />

      <section className="site-section">
        <div className="site-container py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <div className="section-header">
                <div className="section-kicker">Careers</div>
                <h2 className="section-title">{introTitle}</h2>
                <div className="section-rule"></div>
              </div>

              <div className="mt-8 space-y-6 text-[15px] leading-8 text-muted">
                {splitParagraphs(introBody).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="site-card rounded-[1.75rem] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Open Roles</p>
              <p className="mt-4 text-4xl font-bold tracking-tight text-ink">{opportunities.length}</p>
              <p className="mt-3 text-[15px] leading-7 text-muted">
                Published opportunities appear below automatically. Add new openings from the Careers module to keep this page current.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container pb-16">
          <ImageFeatureCard
            src={SITE_VISUALS.careers.culture}
            alt="Young professionals collaborating in an office meeting."
            eyebrow="Working Here"
            title="A growth environment built on responsibility, curiosity, and client exposure."
            description="We want people who enjoy learning quickly, solving practical business issues, and working closely with experienced professionals across advisory disciplines."
            className="max-w-5xl"
          />
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container pb-16 md:pb-20">
          <div className="section-header">
            <div className="section-kicker">Openings</div>
            <h2 className="section-title">Current opportunities</h2>
            <div className="section-rule"></div>
          </div>

          {opportunities.length ? (
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {opportunities.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/careers/${entry.slug}`}
                  className="site-card interactive-card group flex h-full flex-col rounded-[1.75rem] p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-surface-raised shadow-inner">
                    <BriefcaseBusiness className="h-5 w-5 text-accent" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-2xl font-bold text-ink transition-colors group-hover:text-accent">{entry.title}</h3>
                  <div className="mt-4 h-px w-14 bg-accent-secondary/25 transition-all duration-500 group-hover:w-full"></div>
                  <p className="mt-5 flex-grow text-[15px] leading-7 text-muted">{entry.excerpt ?? entry.summary ?? "Open the role to view responsibilities and requirements."}</p>
                  <div className="mt-8 flex items-center text-sm font-bold text-ink transition-colors group-hover:text-accent">
                    View opening
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="site-card mt-14 rounded-[1.75rem] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-muted">Careers</p>
              <h3 className="mt-4 text-2xl font-bold text-ink">No openings are published right now.</h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
                As soon as new roles are published in the admin console, they will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

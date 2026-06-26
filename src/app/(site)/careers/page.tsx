import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { PageBanner } from "@/components/layout/page-banner";
import { buildCmsPageMetadata, buildPageMetadata } from "@/lib/seo";
import { getCollection, getPageBySlug } from "@/lib/content/service";
import { SITE_VISUALS } from "@/lib/site-visuals";

const fallbackDescription =
  "Join a firm where values matter, people come first, and excellence is a way of life.";

const opportunitiesAvailable = [
  "Articles & Industrial Trainees",
  "Audit & Tax Trainees",
  "HR & Administration Professionals",
];

const reasonsToJoin = [
  "Ethical and professional work environment",
  "Hands-on learning and mentorship",
  "Exposure to diverse industries and assignments",
  "Continuous professional development",
  "Merit-based career growth",
  "Supportive, family-oriented culture",
];

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
      : fallbackDescription;
  const introTitle =
    typeof intro?.title === "string"
      ? intro.title
      : "Build your career with SABS Marks JVS & Co.";
  const introBody =
    typeof intro?.content === "string"
      ? intro.content
      : "At SABS Marks JVS & Co., we believe that professional success is built on a foundation of ethics, integrity, teamwork, and continuous learning. We foster a supportive work environment where every team member is respected, encouraged to grow, and empowered to make a meaningful contribution.\n\nWhether you are a Chartered Accountant, Article Assistant, HR Professional, or a young graduate starting your career, you will find opportunities to learn, develop, and excel alongside experienced professionals.\n\nJoin a firm where values matter, people come first, and excellence is a way of life.";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title={title} description={description} />

      <section className="site-section">
        <div className="site-container py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
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

            <div className="grid gap-6">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-[var(--glass-border)] shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
                <Image
                  src={SITE_VISUALS.careers.culture}
                  alt="Professional team collaborating and learning together in a modern workplace."
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.02),rgba(8,15,30,0.26))]" />
              </div>
              <div className="site-card rounded-[1.75rem] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Opportunities Available</p>
                <ul className="mt-6 space-y-4">
                  {opportunitiesAvailable.map((opportunity) => (
                    <li key={opportunity} className="flex gap-3 text-[15px] font-semibold leading-7 text-ink">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.8} />
                      <span>{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="site-card rounded-[1.75rem] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Open Roles</p>
                <p className="mt-4 text-4xl font-bold tracking-tight text-ink">{opportunities.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container pb-16">
          <div className="site-card relative overflow-hidden rounded-[1.75rem] p-8 md:p-10">
            <Image
              src={SITE_VISUALS.careers.culture}
              alt="Team members collaborating in a supportive professional environment."
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover opacity-16"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.9)_55%,rgba(255,255,255,0.78)_100%)] dark:bg-[linear-gradient(90deg,rgba(9,17,31,0.96)_0%,rgba(9,17,31,0.9)_55%,rgba(9,17,31,0.76)_100%)]" />
            <div className="section-header relative z-10">
              <div className="section-kicker">Why Join Us?</div>
              <h2 className="section-title">A place to learn, contribute, and grow with purpose.</h2>
              <div className="section-rule"></div>
            </div>

            <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reasonsToJoin.map((reason) => (
                <div key={reason} className="rounded-2xl border border-[var(--glass-border)] bg-surface-raised/92 p-5 backdrop-blur-sm">
                  <CheckCircle2 className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  <p className="mt-4 text-[15px] font-semibold leading-7 text-ink">{reason}</p>
                </div>
              ))}
            </div>
          </div>
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

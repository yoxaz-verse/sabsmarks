import { PageBanner } from "@/components/layout/page-banner";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { getTeamMembers } from "@/lib/content/service";
import { normalizeSlug } from "@/lib/slug";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function getOptimizedPhotoUrl(url: string | null) {
  if (!url) return null;
  if (url.includes("cloudinary.com") && url.includes("/image/upload/")) {
    const pngUrl = url.replace(/\.[a-zA-Z0-9]+$/, ".png");
    return pngUrl.replace("/image/upload/", "/image/upload/e_background_removal/");
  }
  return url;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <PageBanner title="Leadership" />

      <InteriorIntroSection
        compact
        title="Partner-Led Institution-Driven"
        description="With decades of combined experience, our partners provide trusted leadership and strategic guidance, supported by the strength, systems, and excellence of a well-established institution."
        className="border-b-0"
      />

      <section className="relative overflow-hidden bg-bg py-14 text-ink sm:py-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--section-border)] to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_4%,transparent),transparent_24rem)]" />

        <div className="site-container relative">
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent/80">Leadership Profiles</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Meet our partners
              </h2>
            </div>
          </div>

          {team.length === 0 ? (
            <div className="rounded-2xl border border-[var(--section-border)] bg-surface-raised px-6 py-10 text-center shadow-[0_16px_42px_rgba(15,23,42,0.06)]">
              <h3 className="text-xl font-semibold text-ink">Leadership profiles are not available right now.</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
                Published leadership entries will appear here as soon as public CMS access is available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {team.map((member) => {
                const photoUrl = getOptimizedPhotoUrl(member.photo_url);
                const profileSlug = normalizeSlug(member.slug || member.name);
                const cardQuote = member.excerpt?.trim();

                return (
                  <article
                    key={member.id}
                    className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[0.9rem] border border-[rgba(15,23,42,0.06)] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[rgba(0,92,157,0.16)] hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)] dark:border-[var(--section-border)] dark:bg-surface dark:shadow-[0_18px_42px_rgba(2,6,23,0.28)]"
                  >
                    <Link
                      href={`/about/team/${profileSlug}`}
                      aria-label={`Open ${member.name} profile`}
                      className="absolute inset-0 z-10 rounded-[0.9rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                    />

                    <div className="relative aspect-[1.4] overflow-hidden bg-[linear-gradient(145deg,#f8fbff_0%,#edf3fb_42%,#dde7f3_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-24px_42px_rgba(99,116,139,0.08)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.88),transparent_38%),linear-gradient(90deg,rgba(15,23,42,0.045),transparent_16%,transparent_84%,rgba(15,23,42,0.055))] dark:bg-[linear-gradient(145deg,#1b2535_0%,#121c2c_48%,#0b1220_100%)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-24px_42px_rgba(2,6,23,0.38)] dark:before:bg-[radial-gradient(circle_at_50%_18%,rgba(148,163,184,0.22),transparent_40%),linear-gradient(90deg,rgba(255,255,255,0.045),transparent_18%,transparent_82%,rgba(0,0,0,0.16))]">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="relative z-[1] h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.018]"
                        />
                      ) : (
                        <div className="relative z-[1] flex h-full w-full items-center justify-center text-5xl font-semibold text-white/95 dark:text-white/80">
                          {getInitials(member.name)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col px-5 py-4 sm:px-5">
                      <h3 className="text-[1.05rem] font-bold leading-tight tracking-normal text-ink transition-colors group-hover:text-accent">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[0.8rem] font-bold leading-5 text-accent">{member.designation}</p>

                      {cardQuote ? (
                        <p className="mt-2 min-h-[2.75rem] text-[0.82rem] font-medium leading-6 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                          &quot;{cardQuote}&quot;
                        </p>
                      ) : null}

                      <div className="mt-auto pt-3">
                        <span className="relative z-20 inline-flex items-center gap-2 text-[0.8rem] font-bold leading-5 text-accent">
                          <span>Read Bio</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

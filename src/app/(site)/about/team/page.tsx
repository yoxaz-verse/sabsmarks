import { PageBanner } from "@/components/layout/page-banner";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { getTeamMembers } from "@/lib/content/service";
import { normalizeSlug } from "@/lib/slug";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function getOptimizedPhotoUrl(url: string | null) {
  if (!url) return null;
  if (url.includes("cloudinary.com")) {
    if (url.includes("/image/upload/")) {
      // Replace the extension with .png to support transparency
      const pngUrl = url.replace(/\.[a-zA-Z0-9]+$/, ".png");
      // Add AI background removal to accurately cut out the subject and leave the background transparent
      return pngUrl.replace("/image/upload/", "/image/upload/e_background_removal/");
    }
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
        title="Our partners bring deep judgment to every engagement."
        description="Our leadership team brings decades of combined experience across diverse financial and advisory disciplines. Partner-led teams ensure deep domain expertise and exceptional service delivery."
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
                Partners and senior professionals
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted md:text-right">
              Meet the people guiding client engagements across assurance, tax, advisory, compliance, and governance.
            </p>
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

              return (
                <article
                  key={member.id}
                  className="team-profile-card group relative flex min-h-[23rem] flex-col overflow-hidden rounded-2xl border border-[var(--section-border)] bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)] dark:bg-surface dark:shadow-[0_20px_58px_rgba(2,6,23,0.34)]"
                >
                  <Link
                    href={`/about/team/${profileSlug}`}
                    aria-label={`Open ${member.name} profile`}
                    className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                  />

                  <div className="relative aspect-[4/3.35] overflow-hidden bg-[linear-gradient(135deg,#d4d4d4,#747474)]">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#e2e8f0,#94a3b8)] text-5xl font-semibold text-white">
                        {getInitials(member.name)}
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/18 to-transparent" />

                    {member.linkedin_url ? (
                      <div className="absolute right-3 top-3 z-20">
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} LinkedIn profile`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/90 text-[#0a66c2] shadow-sm backdrop-blur-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-white/20 dark:bg-surface/88 dark:text-accent dark:hover:bg-surface-raised"
                        >
                          <span className="text-[13px] font-black leading-none">in</span>
                        </a>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-accent">{member.designation}</p>

                    <div className="mt-auto pt-7">
                      <div className="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                        <span className="underline decoration-[color-mix(in_srgb,var(--ink)_35%,transparent)] decoration-1 underline-offset-8 transition group-hover:decoration-accent">
                          Read Bio
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
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

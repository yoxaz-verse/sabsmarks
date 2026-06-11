import { PageBanner } from "@/components/layout/page-banner";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { getTeamMembers } from "@/lib/content/service";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_TEAM_PHOTO = "/globe.svg";

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

      <section className="site-section">
        <div className="site-container pb-16 md:pb-20">
          <div className="mt-12 md:mt-16">
            <div className="mb-8 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-muted md:mb-10">
              <span className="h-px flex-1 bg-[color:var(--section-border)]" />
              <span>Leadership Profiles</span>
              <span className="h-px flex-1 bg-[color:var(--section-border)]" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article
                  key={member.id}
                  className="team-profile-card interactive-card group relative flex flex-col h-full overflow-hidden rounded-[1.5rem] bg-white dark:bg-surface border border-gray-100 dark:border-gray-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <Link
                    href={`/about/team/${member.slug}`}
                    aria-label={`Open ${member.name} profile`}
                    className="absolute inset-0 z-10 rounded-[1.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  />

                  <div className="relative aspect-square w-full overflow-hidden bg-[#707070] dark:bg-[#52525b]">
                    <Image
                      src={member.photo_url || FALLBACK_TEAM_PHOTO}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />

                    {member.linkedin_url ? (
                      <div className="absolute right-4 top-4 z-20">
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} LinkedIn profile`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/92 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b5c8f] shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 group-hover:border-white/70"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-accent">{member.name}</h3>
                        <p className="mt-1.5 text-sm font-semibold text-accent leading-6">{member.designation}</p>
                      </div>
                    </div>

                    {member.bio ? (
                      <p className="site-prose mt-4 line-clamp-3 text-[14px] leading-relaxed">{member.bio}</p>
                    ) : (
                      <p className="mt-4 text-sm leading-relaxed text-muted/80">
                        Senior leadership profile and advisory focus details will appear here as the team page evolves.
                      </p>
                    )}

                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{member.location ?? "Location unavailable"}</span>
                      </div>
                      
                      <div className="relative z-20 inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-ink">
                        <span className="underline decoration-1 underline-offset-4 decoration-accent group-hover:decoration-ink">Read Bio</span>
                        <span className="ml-1 text-[11px]">↗</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

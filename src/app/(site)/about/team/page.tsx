import { PageBanner } from "@/components/layout/page-banner";
import { getTeamMembers } from "@/lib/content/service";
import Image from "next/image";

const FALLBACK_TEAM_PHOTO = "/globe.svg";

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title="Leadership" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-ink">Our Partners</h2>
          <div className="h-[2px] w-24 bg-accent-secondary"></div>
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-muted">
            Our leadership team brings decades of combined experience across diverse financial and advisory disciplines. Partner-led teams ensure deep domain expertise and exceptional service delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="group overflow-hidden rounded-xl border border-[var(--glass-border)] bg-surface shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.photo_url || FALLBACK_TEAM_PHOTO}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18395f]/90 via-[#18395f]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {member.linkedin_url ? (
                  <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1076b4] text-white shadow-md transition-colors hover:bg-[#0b5c8f]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <p className="text-sm font-medium text-white">LinkedIn Profile</p>
                  </div>
                ) : null}
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-ink transition-colors group-hover:text-accent-secondary">{member.name}</h3>
                <p className="mb-2 text-sm font-medium text-muted">{member.designation}</p>
                {member.bio ? <p className="mb-3 line-clamp-3 text-sm text-stone-600">{member.bio}</p> : null}
                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-stone-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {member.location ?? "Location unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

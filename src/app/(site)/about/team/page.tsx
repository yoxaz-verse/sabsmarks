import { PageBanner } from "@/components/layout/page-banner";
import { getTeamMembers } from "@/lib/content/service";
import Image from "next/image";

const FALLBACK_TEAM_PHOTO = "/globe.svg";

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="Leadership" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <div className="mb-12">
          <p className="brand-kicker mb-4">Our Partners</p>
          <h2 className="mb-4 text-3xl font-bold text-accent">Our Partners</h2>
          <div className="brand-rule" />
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-muted">
            Our leadership team brings decades of combined experience across diverse financial and advisory disciplines. Partner-led teams ensure deep domain expertise and exceptional service delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.id} className="brand-card overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden border-b border-[var(--border)] bg-[var(--cloud)]">
                <Image
                  src={member.photo_url || FALLBACK_TEAM_PHOTO}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-accent">{member.name}</h3>
                <p className="mb-2 text-sm font-medium text-muted">{member.designation}</p>
                {member.bio ? <p className="mb-4 line-clamp-3 text-sm leading-7 text-muted">{member.bio}</p> : null}
                <div className="flex items-center text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-4 w-4 text-[var(--accent-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {member.location ?? "Location unavailable"}
                </div>
                {member.linkedin_url ? (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="brand-link mt-5 inline-flex items-center text-sm font-semibold uppercase tracking-[0.14em]"
                  >
                    LinkedIn Profile
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

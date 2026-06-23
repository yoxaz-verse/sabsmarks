import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/page-banner";
import { getSeniorManagementTeam } from "@/lib/content/service";

export const metadata: Metadata = {
  title: "Senior Management Team | Sabs Marks JVS",
  description: "Meet the senior management team at Sabs Marks JVS.",
};

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

export default async function SeniorManagementTeamPage() {
  const team = await getSeniorManagementTeam();

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <PageBanner title="Team" />

      <section className="relative overflow-hidden bg-bg py-14 text-ink sm:py-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--section-border)] to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_4%,transparent),transparent_24rem)]" />

        <div className="site-container relative">
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent/80">Senior Management Team</p>
            <h1 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Meet our team
            </h1>
          </div>

          {team.length === 0 ? (
            <div className="rounded-2xl border border-[var(--section-border)] bg-surface-raised px-6 py-10 text-center shadow-[0_16px_42px_rgba(15,23,42,0.06)]">
              <h2 className="text-xl font-semibold text-ink">Team members are not available right now.</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
                Published senior management team entries will appear here soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {team.map((member) => {
                const photoUrl = getOptimizedPhotoUrl(member.photo_url);

                return (
                  <article
                    key={member.id}
                    className="group flex min-h-[18rem] flex-col overflow-hidden rounded-[0.9rem] border border-[rgba(15,23,42,0.06)] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:border-[rgba(0,92,157,0.16)] hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)] dark:border-[var(--section-border)] dark:bg-surface dark:shadow-[0_18px_42px_rgba(2,6,23,0.28)]"
                  >
                    <div className="relative aspect-[1.1] overflow-hidden bg-[linear-gradient(145deg,#f8fbff_0%,#edf3fb_42%,#dde7f3_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-24px_42px_rgba(99,116,139,0.08)] dark:bg-[linear-gradient(145deg,#1b2535_0%,#121c2c_48%,#0b1220_100%)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-24px_42px_rgba(2,6,23,0.38)]">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.018]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-white/95 dark:text-white/80">
                          {getInitials(member.name)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col px-5 py-4">
                      <h2 className="text-[1.05rem] font-bold leading-tight tracking-normal text-ink">{member.name}</h2>
                      <p className="mt-1 text-[0.8rem] font-bold leading-5 text-accent">{member.designation}</p>
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

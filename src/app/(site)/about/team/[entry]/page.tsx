import type { Metadata } from "next";
import { ArrowUpRight, Globe, MapPin, MoveLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getTeamMemberBySlug } from "@/lib/content/service";
import { buildAbsoluteUrl, buildTeamMemberMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";
import { SITE_VISUALS } from "@/lib/site-visuals";

const FALLBACK_TEAM_PHOTO = SITE_VISUALS.about.team;

function getSafeExternalUrl(value: string | null | undefined) {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry } = await params;
  const member = await getTeamMemberBySlug(entry);
  if (!member) return { robots: { index: false, follow: false } };

  return buildTeamMemberMetadata(member, `/about/team/${member.slug}`, "Meet the leadership team behind Sabs Marks JVS.");
}

export default async function TeamMemberDetail({ params }: { params: Promise<{ entry: string }> }) {
  const member = await getTeamMemberBySlug((await params).entry);
  if (!member) notFound();
  const biography = (member.bio ?? `${member.name} is part of the Sabs Marks JVS leadership team.`)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const credentialLink = getSafeExternalUrl(member.credentials);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Leadership", url: "/about/team" },
    { name: member.name, url: `/about/team/${member.slug}` },
  ]);

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-12 md:py-20 animate-fade-in">
      <JsonLdScript id={`team-member-breadcrumb-${member.id}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Leadership", href: "/about/team" }, { label: member.name }]} />

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Photo and Meta Info */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-surface-raised shadow-lg shadow-accent/5">
            <Image
              src={member.photo_url || FALLBACK_TEAM_PHOTO}
              alt={member.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 22rem"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {member.location ? (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_72%,transparent)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Location</p>
              <div className="mt-2.5 flex items-center gap-2 text-sm font-semibold text-ink">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                <span>{member.location}</span>
              </div>
            </div>
          ) : null}

          {member.credentials ? (
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_72%,transparent)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Credentials</p>
              {credentialLink ? (
                <Link
                  href={credentialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-secondary transition-colors"
                >
                  <span>Professional Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <p className="mt-2.5 text-sm font-medium leading-relaxed text-ink">{member.credentials}</p>
              )}
            </div>
          ) : null}

          {member.linkedin_url ? (
            <Link
              href={member.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-md shadow-accent/10 hover:bg-accent-secondary hover:shadow-lg transition-all"
            >
              <span>View LinkedIn</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ) : null}
        </div>

        {/* Right Column: Bio and Profile Details */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Leadership
            </span>
            {member.location ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-surface-raised px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                <MapPin className="h-3 w-3" />
                {member.location}
              </span>
            ) : null}
          </div>

          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl lg:text-6xl">
              {member.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-accent md:text-xl">
              {member.designation} at Sabs Marks & Co.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] p-6 md:p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Biography</p>
            <div className="mt-4 space-y-5 text-base leading-8 text-muted">
              {biography.map((paragraph, index) => (
                <p key={`${member.id}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--glass-border)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--surface-raised)_84%,white),color-mix(in_srgb,var(--surface)_96%,transparent))] p-6 md:p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Profile Snapshot</p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted">
              <div className="border-l-2 border-accent/20 pl-4">
                <p className="font-bold text-ink">Role</p>
                <p className="mt-1">{member.designation}</p>
              </div>
              <div className="border-l-2 border-accent/20 pl-4">
                <p className="font-bold text-ink">Base</p>
                <p className="mt-1">{member.location ?? "Shared leadership coverage"}</p>
              </div>
              <div className="sm:col-span-2 border-l-2 border-accent/20 pl-4">
                <p className="font-bold text-ink">Approach</p>
                <p className="mt-1">Disciplined execution, transparent communication, and practical systems that scale with the business.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-6 w-full">
        <Link href="/about/team" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-accent-secondary transition-colors">
          <MoveLeft className="h-4 w-4" />
          <span>Back to leadership</span>
        </Link>
        {member.linkedin_url ? (
          <Link
            href={member.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>External profile</span>
          </Link>
        ) : null}
      </div>

      <JsonLdScript
        id={`team-member-person-${member.id}`}
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: member.name,
          jobTitle: member.designation,
          description: member.bio ?? undefined,
          image: member.photo_url ? [buildAbsoluteUrl(member.photo_url)] : undefined,
          sameAs: member.linkedin_url ? [member.linkedin_url] : undefined,
          url: buildAbsoluteUrl(`/about/team/${member.slug}`),
        }}
      />
    </article>
  );
}

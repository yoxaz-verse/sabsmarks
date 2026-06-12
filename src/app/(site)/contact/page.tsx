import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, AtSign, Building2, ExternalLink, Link2, Mail, MapPin, Phone } from "lucide-react";
import { PageBanner } from "@/components/layout/page-banner";
import { getLocations, getSiteSettings } from "@/lib/content/service";
import { getSiteContact } from "@/lib/site-contact";
import type { Location, LocationBranch } from "@/types/cms";
import Image from "next/image";
import { SITE_VISUALS } from "@/lib/site-visuals";

function sanitizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

function buildGoogleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getSocialHandle(url: string, fallback: string) {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, "");
    const segments = pathname.split("/").filter(Boolean);
    const handle = segments.at(-1);
    if (!handle) return fallback;
    return fallback.startsWith("@") ? `@${handle.replace(/^@/, "")}` : handle;
  } catch {
    return fallback;
  }
}

function orderLocations(locations: Location[], serviceLocations: string[]) {
  if (serviceLocations.length === 0) return locations;

  const orderMap = new Map(serviceLocations.map((city, index) => [city.trim().toLowerCase(), index]));
  return [...locations].sort((a, b) => {
    const aIndex = orderMap.get(a.city.trim().toLowerCase());
    const bIndex = orderMap.get(b.city.trim().toLowerCase());
    if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;
    return a.city.localeCompare(b.city);
  });
}

function QuickAction({
  href,
  label,
  value,
  icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex min-h-24 items-center gap-4 rounded-[1.6rem] border border-white/12 bg-white/10 px-5 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/14"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white shadow-[0_10px_24px_rgba(2,6,23,0.18)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-100">{label}</p>
        <p className="mt-2 truncate text-lg font-semibold text-white">{value}</p>
      </div>
    </a>
  );
}

function SocialLink({
  href,
  label,
  handle,
  icon,
  iconClassName,
}: {
  href: string;
  label: string;
  handle: string;
  icon: ReactNode;
  iconClassName: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-[1.6rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-5 py-4 shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_26px_54px_rgba(15,23,42,0.1)]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ${iconClassName}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">{label}</p>
          <p className="mt-1 truncate text-base font-semibold text-ink">{handle}</p>
        </div>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
    </a>
  );
}

function BranchSummary({ branch }: { branch: LocationBranch }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/70">Sub Branch</p>
          <h4 className="mt-1 text-sm font-bold text-white">{branch.name}</h4>
        </div>
        {branch.map_url ? (
          <a href={branch.map_url} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-blue-100 transition hover:bg-white/10">
            Map
          </a>
        ) : null}
      </div>
      {branch.address ? <p className="mt-3 line-clamp-2 text-xs leading-6 text-blue-50/70">{branch.address}</p> : null}
      <div className="mt-3 space-y-2 text-xs text-blue-50/82">
        {branch.phone ? (
          <a href={`tel:${sanitizePhone(branch.phone)}`} className="flex items-center gap-2 transition hover:text-white">
            <Phone className="h-3.5 w-3.5" />
            <span className="font-medium">{branch.phone}</span>
          </a>
        ) : null}
        {branch.email ? (
          <a href={`mailto:${branch.email}`} className="flex min-w-0 items-center gap-2 transition hover:text-white">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-medium">{branch.email}</span>
          </a>
        ) : null}
        {branch.contact_person ? (
          <p className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5" />
            <span className="font-medium">{branch.contact_person}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

function OfficeCard({ location }: { location: Location }) {
  const branches = location.branches ?? [];

  return (
    <article className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-accent">{location.city}</p>
          <h3 className="mt-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-white/90">{location.office_name}</h3>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-accent transition-all duration-500 group-hover:scale-105 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <Building2 className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-7 text-blue-50/75 min-h-[56px]">{location.address}</p>

      <div className="my-5 border-t border-dashed border-white/10" />

      <div className="space-y-3 text-xs text-blue-50/85">
        {location.phone ? (
          <a href={`tel:${sanitizePhone(location.phone)}`} className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/link">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-blue-100 group-hover/link:border-accent/30 group-hover/link:bg-accent/10 group-hover/link:text-accent transition-all duration-300">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium">{location.phone}</span>
          </a>
        ) : null}
        {location.email ? (
          <a href={`mailto:${location.email}`} className="flex items-center gap-3 transition-colors duration-300 hover:text-white group/link">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-blue-100 group-hover/link:border-accent/30 group-hover/link:bg-accent/10 group-hover/link:text-accent transition-all duration-300">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span className="truncate font-medium">{location.email}</span>
          </a>
        ) : null}
      </div>

      {branches.length > 0 ? (
        <div className="mt-5 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/70">Also at this location</p>
          {branches.map((branch) => (
            <BranchSummary key={branch.id} branch={branch} />
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/contact/${location.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] hover:shadow-lg"
        >
          View office
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        {location.map_url ? (
          <a
            href={location.map_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-blue-100 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <MapPin className="h-3.5 w-3.5" />
            Open map
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const locations = await getLocations();
  const contact = getSiteContact(settings);
  const orderedLocations = orderLocations(locations, contact.serviceLocations);
  const linkedInHandle = getSocialHandle(contact.socialLinks.linkedin, "sabs-marks-jvs-co");
  const instagramHandle = getSocialHandle(contact.socialLinks.instagram, "@sabsmarksjvs");
  const headOfficeMapUrl = buildGoogleMapsUrl(contact.headOfficeAddress);

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner
        title="Contact Us"
        description="Reach our head office quickly, connect with the right branch, and move from search to conversation without hunting through the site."
        variant="contrast"
        actions={
          <>
            <a
              href={`tel:${sanitizePhone(contact.primaryPhone)}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--accent-secondary)] shadow-[0_14px_32px_rgba(2,6,23,0.22)] transition hover:bg-blue-50"
            >
              <Phone className="h-4 w-4" />
              Call head office
            </a>
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/24 hover:bg-white/12"
            >
              <Mail className="h-4 w-4" />
              Email the team
            </a>
            <a
              href="#office-network"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-blue-50 transition hover:border-white/24 hover:bg-white/8"
            >
              <Building2 className="h-4 w-4" />
              View offices
            </a>
          </>
        }
      />

      <section className="site-section">
        <div className="site-container py-10 md:py-14">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#1f3d8d_0%,#244aa9_52%,#173677_100%)] px-6 py-7 text-white shadow-[0_32px_80px_rgba(18,57,95,0.24)] md:px-8 md:py-8">
              <div className="absolute inset-0">
                <Image
                  src={SITE_VISUALS.contact.meeting}
                  alt="Professional meeting room ready for client conversations."
                  fill
                  sizes="(max-width: 1280px) 100vw, 60vw"
                  className="object-cover opacity-18"
                />
              </div>
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-100">Head Office Contact</p>
                  <h2 className="mt-4 text-3xl font-bold leading-tight md:text-[2.4rem]">{contact.brandName}</h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-blue-50/88">
                    Reach our headquarters directly for appointments, engagement enquiries, and help choosing the most relevant office.
                  </p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/10 text-white shadow-[0_18px_40px_rgba(2,6,23,0.2)]">
                  <Building2 className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <QuickAction
                  href={`tel:${sanitizePhone(contact.primaryPhone)}`}
                  label="Call Us"
                  value={contact.primaryPhone}
                  icon={<Phone className="h-5 w-5" />}
                />
                <QuickAction
                  href={`mailto:${contact.primaryEmail}`}
                  label="Mail Us"
                  value={contact.primaryEmail}
                  icon={<Mail className="h-5 w-5" />}
                />
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-100">Registered Address</p>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-blue-50/90">{contact.headOfficeAddress}</p>
                <a
                  href={headOfficeMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/14 px-4 py-2 text-sm font-medium text-white transition hover:border-white/24 hover:bg-white/8"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Social & Routing</p>
              <h3 className="mt-4 text-2xl font-bold text-ink">Choose the fastest way to reach us.</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">
                For firm updates, direct outreach, and office discovery, start with the channel that matches your need.
              </p>

              <div className="mt-7 space-y-4">
                <SocialLink
                  href={contact.socialLinks.linkedin}
                  label="LinkedIn"
                  handle={linkedInHandle}
                  icon={<Link2 className="h-5 w-5" />}
                  iconClassName="bg-[#0A66C2]"
                />
                <SocialLink
                  href={contact.socialLinks.instagram}
                  label="Instagram"
                  handle={instagramHandle}
                  icon={<AtSign className="h-5 w-5" />}
                  iconClassName="bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)]"
                />
              </div>

              <div className="mt-7 rounded-[1.6rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_74%,transparent)] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Best For</p>
                <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-3 xl:grid-cols-1">
                  <div className="rounded-2xl bg-white/65 px-4 py-3 dark:bg-white/4">
                    <p className="font-semibold text-ink">General Enquiries</p>
                    <p className="mt-1 leading-6">Call or email head office for routing support.</p>
                  </div>
                  <div className="rounded-2xl bg-white/65 px-4 py-3 dark:bg-white/4">
                    <p className="font-semibold text-ink">Office Visits</p>
                    <p className="mt-1 leading-6">Open the branch card below for local details and maps.</p>
                  </div>
                  <div className="rounded-2xl bg-white/65 px-4 py-3 dark:bg-white/4">
                    <p className="font-semibold text-ink">Firm Updates</p>
                    <p className="mt-1 leading-6">Use social channels for announcements and latest news.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_45%,transparent)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-md md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Head Office Base</p>
              <div className="mt-6 flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent shadow-sm">
                  <MapPin className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ink">{contact.headOfficeLabel}</h3>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-muted">{contact.headOfficeAddress}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <a
                  href={`tel:${sanitizePhone(contact.primaryPhone)}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_50%,transparent)] p-4 transition-all duration-300 hover:border-accent/40 hover:bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-muted">Call head office</span>
                  </div>
                  <span className="text-base font-bold text-ink">{contact.primaryPhone}</span>
                </a>
                <a
                  href={`mailto:${contact.primaryEmail}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_50%,transparent)] p-4 transition-all duration-300 hover:border-accent/40 hover:bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-muted">Email head office</span>
                  </div>
                  <span className="truncate text-base font-bold text-ink">{contact.primaryEmail}</span>
                </a>
              </div>
            </div>

            <div
              id="office-network"
              className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(12,18,32,0.98),rgba(20,40,82,0.96))] p-6 text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)] md:p-8"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-100">Office Network</p>
                  <h3 className="mt-3 text-2xl font-bold">Find the branch closest to the conversation you need.</h3>
                </div>
                <p className="max-w-md text-sm leading-7 text-blue-50/78">
                  Published office records drive this section, so local contact details and map links stay useful instead of decorative.
                </p>
              </div>

              {orderedLocations.length > 0 ? (
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {orderedLocations.map((location) => (
                    <OfficeCard key={location.id} location={location} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/6 p-6 text-blue-50/88">
                  No published office records are available yet. Once locations are published in the CMS, they will appear here automatically.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

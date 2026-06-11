import type { EntryRecord, PageRecord, TeamMember } from "@/types/cms";
import type { Metadata } from "next";

export const SITE_NAME = "Sabs Marks JVS & Co.";
export const SITE_URL = "https://sabsmarks.com";
export const DEFAULT_OG_IMAGE = "/globe.svg";
const DEFAULT_DESCRIPTION =
  "Sabs Marks JVS & Co. delivering audit, tax, advisory, and compliance services.";

export function buildAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(input: string, maxLength = 160) {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1).trimEnd()}…`;
}

export function resolveSeoDescription({
  seoDescription,
  excerpt,
  summary,
  body,
  fallback,
}: {
  seoDescription?: string | null;
  excerpt?: string | null;
  summary?: string | null;
  body?: string | null;
  fallback?: string;
}) {
  const candidate = seoDescription ?? excerpt ?? summary ?? (body ? truncate(stripHtml(body), 160) : null) ?? fallback ?? DEFAULT_DESCRIPTION;
  return truncate(stripHtml(candidate), 160);
}

export function resolveSeoTitle({
  seoTitle,
  title,
}: {
  seoTitle?: string | null;
  title: string;
}) {
  return seoTitle?.trim() || title;
}

export function resolveCanonical(path: string, canonicalOverride?: string | null) {
  return canonicalOverride?.trim() || buildAbsoluteUrl(path);
}

export function buildOpenGraph({
  title,
  description,
  canonical,
  image,
}: {
  title: string;
  description: string;
  canonical: string;
  image?: string | null;
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url: canonical,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: buildAbsoluteUrl(image || DEFAULT_OG_IMAGE) }],
  };
}

export function buildTwitter({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string | null;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [buildAbsoluteUrl(image || DEFAULT_OG_IMAGE)],
  };
}

export function buildPageMetadata({
  path,
  title,
  description,
  image,
}: {
  path: string;
  title: string;
  description: string;
  image?: string | null;
}): Metadata {
  const canonical = resolveCanonical(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: buildOpenGraph({ title, description, canonical, image }),
    twitter: buildTwitter({ title, description, image }),
  };
}

export function buildCmsPageMetadata(page: PageRecord, path: string, fallbackDescription?: string): Metadata {
  const title = resolveSeoTitle({ seoTitle: page.seo_title, title: page.title });
  const description = resolveSeoDescription({ seoDescription: page.seo_description, excerpt: page.excerpt, fallback: fallbackDescription });
  const canonical = resolveCanonical(path, page.canonical_url);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: buildOpenGraph({ title, description, canonical, image: page.og_image_url }),
    twitter: buildTwitter({ title, description, image: page.og_image_url }),
  };
}

export function buildEntryMetadata(entry: EntryRecord, path: string, fallbackDescription?: string): Metadata {
  const title = resolveSeoTitle({ seoTitle: entry.seo_title, title: entry.title });
  const description = resolveSeoDescription({
    seoDescription: entry.seo_description,
    excerpt: entry.excerpt,
    summary: entry.summary,
    body: entry.body,
    fallback: fallbackDescription,
  });
  const canonical = resolveCanonical(path, entry.canonical_url);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title,
      description,
      canonical,
      image: entry.og_image_url ?? entry.image_url,
    }),
    twitter: buildTwitter({ title, description, image: entry.og_image_url ?? entry.image_url }),
  };
}

export function buildTeamMemberMetadata(member: TeamMember, path: string, fallbackDescription?: string): Metadata {
  const title = resolveSeoTitle({
    seoTitle: member.seo_title,
    title: `${member.name}${member.designation ? ` | ${member.designation}` : ""}`,
  });
  const description = resolveSeoDescription({
    seoDescription: member.seo_description,
    excerpt: member.excerpt,
    body: member.bio,
    fallback: fallbackDescription ?? `${member.name}${member.designation ? `, ${member.designation}` : ""} at ${SITE_NAME}.`,
  });
  const canonical = resolveCanonical(path, member.canonical_url);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: buildOpenGraph({
      title,
      description,
      canonical,
      image: member.og_image_url ?? member.photo_url,
    }),
    twitter: buildTwitter({ title, description, image: member.og_image_url ?? member.photo_url }),
  };
}

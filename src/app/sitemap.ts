import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getLocations, getPublishedSlugs, getPublishedTeamMemberSlugs } from "@/lib/content/service";

const staticRoutes = [
  "",
  "/about",
  "/about/legacy",
  "/about/locations",
  "/about/our-approach",
  "/about/team",
  "/careers",
  "/careers/alumni",
  "/careers/philosophy",
  "/contact",
  "/expertise/ifsc",
  "/expertise/our-approach",
  "/expertise/uae",
  "/industry-solutions",
  "/insights",
  "/practice-areas",
  "/publications",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const publications = await getPublishedSlugs("publications");
  const practiceAreas = await getPublishedSlugs("practice_areas");
  const industries = await getPublishedSlugs("industry_solutions");
  const careers = await getPublishedSlugs("careers");
  const locations = await getLocations();
  const teamMembers = await getPublishedTeamMemberSlugs();

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...publications.flatMap((item) => [
      {
        url: `${SITE_URL}/publications/${item.slug}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/insights/${item.slug}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]),
    ...practiceAreas.map((item) => ({
      url: `${SITE_URL}/practice-areas/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((item) => ({
      url: `${SITE_URL}/industry-solutions/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...careers.map((item) => ({
      url: `${SITE_URL}/careers/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...locations.map((item) => ({
      url: `${SITE_URL}/contact/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...teamMembers.map((item) => ({
      url: `${SITE_URL}/about/team/${item.slug}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}

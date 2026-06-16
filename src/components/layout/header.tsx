import Link from "next/link";
import { MegaNav } from "@/components/navigation/mega-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import type { MenuItem } from "@/types/cms";
import { getMegaNav } from "@/lib/content/service";

const HIDDEN_NAV_HREFS = new Set([
  "/about/legacy",
  "/expertise/ifsc",
  "/expertise/uae",
  "/industry-solutions",
  "/careers/alumni",
]);

const HOME_MENU_ITEM: MenuItem = {
  id: "home-1",
  parent_id: null,
  label: "Home",
  href: "/",
  group_name: "Home",
  display_order: 1,
  status: "published",
};

function ensureHomeGroup(groups: Record<string, MenuItem[]>) {
  if ((groups.Home ?? []).length > 0) return groups;
  return { Home: [HOME_MENU_ITEM], ...groups };
}

const ABOUT_LOCATIONS_ITEM: MenuItem = {
  id: "about-2",
  parent_id: null,
  label: "Locations",
  href: "/about/locations",
  group_name: "About",
  display_order: 2,
  status: "published",
};

function normalizeBlogMenuItem(item: MenuItem): MenuItem {
  const href = item.href === "/insights" ? "/blog" : item.href.replace(/^\/insights\//, "/blog/");
  const isInsightsGroup = item.group_name === "Insights";

  return {
    ...item,
    href,
    label: item.label === "Insights" ? "Blog" : item.label,
    group_name: isInsightsGroup ? "Blog" : item.group_name,
  };
}

function normalizeBlogGroup(groups: Record<string, MenuItem[]>) {
  return Object.values(groups)
    .flat()
    .map(normalizeBlogMenuItem)
    .reduce<Record<string, MenuItem[]>>((acc, item) => {
      if (!acc[item.group_name]) acc[item.group_name] = [];
      if (acc[item.group_name].some((existing) => existing.href === item.href)) return acc;
      acc[item.group_name].push(item);
      return acc;
    }, {});
}

function ensureLocationsItem(groups: Record<string, MenuItem[]>) {
  const aboutItems = groups.About ?? [];
  if (aboutItems.some((item) => item.href === ABOUT_LOCATIONS_ITEM.href)) return groups;

  return {
    ...groups,
    About: [...aboutItems, ABOUT_LOCATIONS_ITEM].sort((a, b) => a.display_order - b.display_order),
  };
}

function filterNavItems(groups: Record<string, MenuItem[]>) {
  return Object.fromEntries(
    Object.entries(groups).map(([group, items]) => [
      group,
      items.filter((item) => !HIDDEN_NAV_HREFS.has(item.href)),
    ])
  ) as Record<string, MenuItem[]>;
}

const fallbackNavGroups: Record<string, MenuItem[]> = {
  Home: [HOME_MENU_ITEM],
  About: [
    { id: "about-1", parent_id: null, label: "The Firm", href: "/about", group_name: "About", display_order: 1, status: "published" },
    { id: "about-2", parent_id: null, label: "Locations", href: "/about/locations", group_name: "About", display_order: 2, status: "published" },
    { id: "about-3", parent_id: null, label: "Leadership", href: "/about/team", group_name: "About", display_order: 3, status: "published" },
  ],
  Expertise: [
    { id: "expertise-1", parent_id: null, label: "Services", href: "/practice-areas", group_name: "Expertise", display_order: 1, status: "published" },
    { id: "expertise-5", parent_id: null, label: "Our Approach", href: "/expertise/our-approach", group_name: "Expertise", display_order: 5, status: "published" },
  ],
  Blog: [{ id: "blog-1", parent_id: null, label: "Blog", href: "/blog", group_name: "Blog", display_order: 1, status: "published" }],
  Career: [
    { id: "career-1", parent_id: null, label: "Philosophy", href: "/careers/philosophy", group_name: "Career", display_order: 1, status: "published" },
    { id: "career-2", parent_id: null, label: "Join Us", href: "/careers", group_name: "Career", display_order: 2, status: "published" },
  ],
  Contact: [{ id: "contact-1", parent_id: null, label: "Contact", href: "/contact", group_name: "Contact", display_order: 1, status: "published" }],
};

export async function Header() {
  const cmsNavGroups = await getMegaNav();
  const hasCmsNav = Object.values(cmsNavGroups).some((items) => items.length > 0);
  const navGroups = normalizeBlogGroup(ensureLocationsItem(ensureHomeGroup(filterNavItems(hasCmsNav ? cmsNavGroups : fallbackNavGroups))));

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--section-border)] bg-[color-mix(in_srgb,var(--bg)_76%,transparent)]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 lg:gap-6">
        <Link href="/" className="min-w-0">
          <Logo className="!w-[248px] sm:!w-[300px] md:!w-[350px]" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <MegaNav groups={navGroups} />
          <MobileNav groups={navGroups} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

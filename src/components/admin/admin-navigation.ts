export type AdminNavItem = {
  label: string;
  href: string;
  description: string;
  featured?: boolean;
};

export const adminNavigation: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    description: "Overview of the CMS workspace.",
    featured: true,
  },
  {
    label: "Leadership",
    href: "/admin/team",
    description: "Manage partners and leadership profiles.",
    featured: true,
  },
  {
    label: "Locations",
    href: "/admin/locations",
    description: "Manage office locations and contact details.",
    featured: true,
  },
  {
    label: "Insights",
    href: "/admin/publications",
    description: "Manage articles, blogs, and insight entries.",
    featured: true,
  },
  {
    label: "Careers",
    href: "/admin/careers",
    description: "Manage Join Us content and openings.",
    featured: true,
  },
  {
    label: "Pages",
    href: "/admin/pages",
    description: "Manage CMS pages and their sections.",
  },
  {
    label: "Insight Categories",
    href: "/admin/insight-categories",
    description: "Organize insights into categories.",
  },
  {
    label: "Insight Tags",
    href: "/admin/insight-tags",
    description: "Maintain insight tag vocabulary.",
  },
  {
    label: "Subscribers",
    href: "/admin/subscribers",
    description: "Review newsletter signups.",
  },
];

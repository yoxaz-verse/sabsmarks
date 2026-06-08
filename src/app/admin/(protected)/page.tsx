import Link from "next/link";
import { adminNavigation } from "@/components/admin/admin-navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type FeaturedCard = {
  label: string;
  href: string;
  description: string;
  table: "team_members" | "locations" | "publications" | "careers" | "pages";
};

const featuredCards: FeaturedCard[] = [
  {
    label: "Leadership",
    href: "/admin/team",
    description: "Partner and leadership profiles for the About page.",
    table: "team_members",
  },
  {
    label: "Locations",
    href: "/admin/locations",
    description: "Published offices and local contact details.",
    table: "locations",
  },
  {
    label: "Insights",
    href: "/admin/publications",
    description: "Articles, blogs, and thought-leadership content.",
    table: "publications",
  },
  {
    label: "Careers",
    href: "/admin/careers",
    description: "Join Us page content and active openings.",
    table: "careers",
  },
  {
    label: "Pages",
    href: "/admin/pages",
    description: "Structured CMS pages and section-driven content.",
    table: "pages",
  },
];

async function getCounts() {
  const supabase = await createServerSupabaseClient();

  return Promise.all(
    featuredCards.map(async (card) => {
      const [{ count: total }, { count: published }] = await Promise.all([
        supabase.from(card.table).select("*", { count: "exact", head: true }),
        supabase.from(card.table).select("*", { count: "exact", head: true }).eq("status", "published"),
      ]);

      return {
        ...card,
        total: total ?? 0,
        published: published ?? 0,
      };
    })
  );
}

export default async function AdminHome() {
  const counts = await getCounts();
  const secondaryModules = adminNavigation.filter((item) => !item.featured && item.href !== "/admin");

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Content Dashboard</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">Everything important is now in one admin workspace.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Manage the four core public-facing content areas here: leadership, locations, insights, and careers. Each module below
          writes directly to the CMS tables already used by the site.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {counts.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">{card.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">{card.total}</p>
            <p className="mt-1 text-sm text-stone-500">{card.published} published</p>
            <p className="mt-4 text-sm leading-6 text-stone-600">{card.description}</p>
            <span className="mt-5 inline-flex rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700">
              Open module
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-stone-900">Supporting Modules</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {secondaryModules.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-stone-200 px-4 py-4 transition hover:bg-stone-50">
              <p className="font-medium text-stone-900">{item.label}</p>
              <p className="mt-1 text-sm text-stone-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

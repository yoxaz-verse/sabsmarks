import Link from "next/link";
import { MegaNav } from "@/components/navigation/mega-nav";
import { Logo } from "@/components/layout/logo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthMenu } from "@/components/auth/auth-menu";
import type { MenuItem } from "@/types/cms";

const staticNavGroups: Record<string, MenuItem[]> = {
  About: [
    { id: "about-1", parent_id: null, label: "The Firm", href: "/about", group_name: "About", display_order: 1, status: "published" },
    { id: "about-2", parent_id: null, label: "Legacy", href: "/about/legacy", group_name: "About", display_order: 2, status: "published" },
    { id: "about-3", parent_id: null, label: "Leadership", href: "/about/team", group_name: "About", display_order: 3, status: "published" },
    { id: "about-4", parent_id: null, label: "Locations", href: "/about/locations", group_name: "About", display_order: 4, status: "published" },
  ],
  Expertise: [
    { id: "expertise-1", parent_id: null, label: "Practice Areas", href: "/practice-areas", group_name: "Expertise", display_order: 1, status: "published" },
    { id: "expertise-2", parent_id: null, label: "Services in IFSC (GIFT City)", href: "/expertise/ifsc", group_name: "Expertise", display_order: 2, status: "published" },
    { id: "expertise-3", parent_id: null, label: "Services in UAE", href: "/expertise/uae", group_name: "Expertise", display_order: 3, status: "published" },
    { id: "expertise-4", parent_id: null, label: "Industry Solutions", href: "/industry-solutions", group_name: "Expertise", display_order: 4, status: "published" },
    { id: "expertise-5", parent_id: null, label: "Our Approach", href: "/expertise/our-approach", group_name: "Expertise", display_order: 5, status: "published" },
  ],
  Insights: [{ id: "insights-1", parent_id: null, label: "Insights", href: "/insights", group_name: "Insights", display_order: 1, status: "published" }],
  Career: [
    { id: "career-1", parent_id: null, label: "Philosophy", href: "/careers/philosophy", group_name: "Career", display_order: 1, status: "published" },
    { id: "career-2", parent_id: null, label: "Join Us", href: "/careers", group_name: "Career", display_order: 2, status: "published" },
    { id: "career-3", parent_id: null, label: "Alumni", href: "/careers/alumni", group_name: "Career", display_order: 3, status: "published" },
  ],
  Contact: [{ id: "contact-1", parent_id: null, label: "Contact", href: "/contact", group_name: "Contact", display_order: 1, status: "published" }],
};

import { ThemeToggle } from "@/components/theme-toggle";

export async function Header() {
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();

  let role: "admin" | "editor" | null = null;
  if (userData.user) {
    const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id).maybeSingle<{ role: "admin" | "editor" }>();
    role = roleRow?.role ?? null;
  }

  return (
    <header className="glass-panel sticky top-0 z-[100] border-b border-[var(--glass-border)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/">
          <Logo className="scale-75 origin-left" />
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          <MegaNav groups={staticNavGroups} />
          <ThemeToggle />
          <AuthMenu isAuthenticated={!!userData.user} email={userData.user?.email ?? null} role={role} />
        </div>
      </div>
    </header>
  );
}

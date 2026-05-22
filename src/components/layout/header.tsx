import Link from "next/link";
import { MegaNav } from "@/components/navigation/mega-nav";
import { Logo } from "@/components/layout/logo";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthMenu } from "@/components/auth/auth-menu";
import type { MenuItem } from "@/types/cms";

const staticNavGroups: Record<string, MenuItem[]> = {
  About: [{ id: "about-1", parent_id: null, label: "About", href: "/about", group_name: "About", display_order: 1, status: "published" }],
  Services: [{ id: "services-1", parent_id: null, label: "Services", href: "/practice-areas", group_name: "Services", display_order: 2, status: "published" }],
  Leadership: [{ id: "leadership-1", parent_id: null, label: "Leadership", href: "/about/team", group_name: "Leadership", display_order: 3, status: "published" }],
  Location: [{ id: "location-1", parent_id: null, label: "Location", href: "/about/locations", group_name: "Location", display_order: 4, status: "published" }],
  Contact: [{ id: "contact-1", parent_id: null, label: "Contact", href: "/contact", group_name: "Contact", display_order: 5, status: "published" }],
};

export async function Header() {
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();

  let role: "admin" | "editor" | null = null;
  if (userData.user) {
    const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id).maybeSingle<{ role: "admin" | "editor" }>();
    role = roleRow?.role ?? null;
  }

  return (
    <header className="relative z-[100] border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/">
          <Logo className="scale-75 origin-left" />
        </Link>
        <MegaNav groups={staticNavGroups} />
        <AuthMenu isAuthenticated={!!userData.user} email={userData.user?.email ?? null} role={role} />
      </div>
    </header>
  );
}

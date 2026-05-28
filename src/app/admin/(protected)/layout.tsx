import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/admin-shell";
import { getRoleForUser } from "@/lib/supabase/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const roleLookup = await getRoleForUser(data.user.id);
  const role = roleLookup.role;

  if (roleLookup.error) redirect("/admin/login?reason=role-query-failed");
  if (!role) redirect("/admin/login?reason=missing-role");
  if (role !== "admin") redirect("/admin/login?reason=unauthorized");

  return <AdminShell email={data.user.email ?? null} role={role}>{children}</AdminShell>;
}

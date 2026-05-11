import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const { data: roleRow, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .maybeSingle<{ role: "admin" | "editor" }>();

  if (roleError || !roleRow) redirect("/admin/login?reason=missing-role");
  if (roleRow.role !== "admin") redirect("/admin/login?reason=unauthorized");

  return <AdminShell email={data.user.email ?? null} role={roleRow.role}>{children}</AdminShell>;
}

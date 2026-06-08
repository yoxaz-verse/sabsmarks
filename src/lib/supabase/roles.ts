import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { AdminUserView } from "@/types/cms";

type AllowedRole = NonNullable<AdminUserView["role"]>;

type RoleLookupResult = {
  role: AllowedRole | null;
  error: string | null;
  errorCode: string | null;
  source: "service_role" | "session_rls" | null;
  serviceKeyPresent: boolean;
};

const allowedRoles = new Set<AllowedRole>(["admin", "editor"]);

export async function getRoleForUser(userId: string): Promise<RoleLookupResult> {
  const serviceKeyPresent = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle<{ role: string }>();

    if (error) {
      return {
        role: null,
        error: error.message,
        errorCode: error.code ?? null,
        source: "service_role",
        serviceKeyPresent,
      };
    }

    const role = data?.role;
    return {
      role: role && allowedRoles.has(role as AllowedRole) ? (role as AllowedRole) : null,
      error: null,
      errorCode: null,
      source: "service_role",
      serviceKeyPresent,
    };
  } catch (error) {
    return {
      role: null,
      error: error instanceof Error ? error.message : "Role lookup failed.",
      errorCode: null,
      source: "service_role",
      serviceKeyPresent,
    };
  }
}

export async function checkRoleRowExistsByService(userId: string) {
  try {
    const supabase = createAdminSupabaseClient();
    const { count, error } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) return null;
    return (count ?? 0) > 0;
  } catch {
    return null;
  }
}

import { createClient } from "@supabase/supabase-js";
import { requireSupabaseEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CmsRole = "admin" | "editor";

type RoleLookupResult = {
  role: CmsRole | null;
  error: string | null;
  errorCode: string | null;
  source: "service_role" | "session_rls";
  serviceKeyPresent: boolean;
};

export async function getRoleForUser(userId: string): Promise<RoleLookupResult> {
  const { NEXT_PUBLIC_SUPABASE_URL } = requireSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    const serviceClient = createClient(NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, { auth: { persistSession: false } });
    const { data, error } = await serviceClient.from("user_roles").select("role").eq("user_id", userId).maybeSingle<{ role: CmsRole }>();
    return {
      role: data?.role ?? null,
      error: error?.message ?? null,
      errorCode: error?.code ?? null,
      source: "service_role",
      serviceKeyPresent: true,
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle<{ role: CmsRole }>();
  return {
    role: data?.role ?? null,
    error: error?.message ?? null,
    errorCode: error?.code ?? null,
    source: "session_rls",
    serviceKeyPresent: false,
  };
}

export async function checkRoleRowExistsByService(userId: string): Promise<boolean | null> {
  const { NEXT_PUBLIC_SUPABASE_URL } = requireSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) return null;

  const serviceClient = createClient(NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, { auth: { persistSession: false } });
  const { data, error } = await serviceClient.from("user_roles").select("user_id").eq("user_id", userId).limit(1);
  if (error) return null;
  return (data?.length ?? 0) > 0;
}

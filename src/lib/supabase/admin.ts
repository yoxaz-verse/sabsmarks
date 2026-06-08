import { createClient } from "@supabase/supabase-js";
import { requireSupabaseEnv } from "@/lib/env";

export function createAdminSupabaseClient() {
  const { NEXT_PUBLIC_SUPABASE_URL } = requireSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("Missing Supabase service role key: set SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

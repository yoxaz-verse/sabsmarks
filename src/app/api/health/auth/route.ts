import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireSupabaseEnv } from "@/lib/env";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const { NEXT_PUBLIC_SUPABASE_URL } = requireSupabaseEnv();
  const supabase = await createServerSupabaseClient();

  const [{ data: userData, error: userError }, { data: sessionData, error: sessionError }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.getSession(),
  ]);

  const userId = userData.user?.id ?? null;

  let role: string | null = null;
  let roleError: string | null = null;

  if (userId) {
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle<{ role: string }>();
    role = data?.role ?? null;
    roleError = error?.message ?? null;
  }

  return NextResponse.json({
    ok: true,
    supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
    auth: {
      hasUser: !!userData.user,
      userId,
      email: userData.user?.email ?? null,
      hasSession: !!sessionData.session,
      userError: userError?.message ?? null,
      sessionError: sessionError?.message ?? null,
    },
    role: {
      value: role,
      isAdmin: role === "admin",
      error: roleError,
    },
  });
}

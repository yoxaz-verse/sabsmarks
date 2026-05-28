import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireSupabaseEnv } from "@/lib/env";
import { checkRoleRowExistsByService, getRoleForUser } from "@/lib/supabase/roles";

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
  let roleErrorCode: string | null = null;
  let roleRowExistsByService: boolean | null = null;
  let roleLookupSource: "service_role" | "session_rls" | null = null;
  let serviceKeyPresent = false;

  if (userId) {
    const roleLookup = await getRoleForUser(userId);
    role = roleLookup.role;
    roleError = roleLookup.error;
    roleErrorCode = roleLookup.errorCode;
    roleLookupSource = roleLookup.source;
    serviceKeyPresent = roleLookup.serviceKeyPresent;
    roleRowExistsByService = await checkRoleRowExistsByService(userId);
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
      errorCode: roleErrorCode,
      rowExistsByService: roleRowExistsByService,
      likelyPolicyFiltered: role === null && roleError === null && roleRowExistsByService === true,
      lookupSource: roleLookupSource,
      serviceKeyPresent,
    },
  });
}

import { NextResponse } from "next/server";
import { getAdminSessionHealth } from "@/lib/admin-auth";
import { requireSupabaseEnv } from "@/lib/env";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const { NEXT_PUBLIC_SUPABASE_URL } = requireSupabaseEnv();
  const session = await getAdminSessionHealth();

  return NextResponse.json({
    ok: true,
    supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
    auth: {
      model: "supabase-auth",
      hasUser: session.hasUser,
      userId: session.userId,
      hasSession: session.hasSession,
      email: session.email,
      role: session.role,
      isAdmin: session.role === "admin",
      isEditor: session.role === "editor",
      roleError: session.roleError,
      roleErrorCode: session.roleErrorCode,
      rowExistsByService: session.roleRowExistsByService,
      lookupSource: session.roleLookupSource,
      serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });
}

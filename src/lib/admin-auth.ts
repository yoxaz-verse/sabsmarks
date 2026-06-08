import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { checkRoleRowExistsByService, getRoleForUser } from "@/lib/supabase/roles";

const editableRoles = new Set(["admin", "editor"]);

export async function getAdminSession() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return {
      user: null,
      role: null,
      roleError: null,
      roleErrorCode: null,
      roleLookupSource: null,
      serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      roleRowExistsByService: null,
    };
  }

  const roleLookup = await getRoleForUser(data.user.id);
  const roleRowExistsByService =
    roleLookup.role === null && !roleLookup.error ? await checkRoleRowExistsByService(data.user.id) : null;

  return {
    user: data.user,
    role: roleLookup.role,
    roleError: roleLookup.error,
    roleErrorCode: roleLookup.errorCode,
    roleLookupSource: roleLookup.source,
    serviceKeyPresent: roleLookup.serviceKeyPresent,
    roleRowExistsByService,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session.user) redirect("/admin/login");
  if (session.roleError) redirect("/admin/login?reason=role-query-failed");
  if (!session.role) redirect("/admin/login?reason=missing-role");
  if (!editableRoles.has(session.role)) redirect("/admin/login?reason=unauthorized");

  return {
    email: session.user.email ?? null,
    role: session.role,
    userId: session.user.id,
  };
}

export async function requireAdminApiSession() {
  const session = await getAdminSession();

  if (!session.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }

  if (session.roleError) {
    return { error: NextResponse.json({ error: "Role lookup failed." }, { status: 403 }), session: null };
  }

  if (!session.role || !editableRoles.has(session.role)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), session: null };
  }

  return {
    error: null,
    session: {
      user: session.user,
      email: session.user.email ?? null,
      role: session.role,
    },
  };
}

export async function getAdminSessionHealth() {
  const session = await getAdminSession();

  return {
    hasUser: !!session.user,
    userId: session.user?.id ?? null,
    email: session.user?.email ?? null,
    hasSession: !!session.user,
    role: session.role,
    roleError: session.roleError,
    roleErrorCode: session.roleErrorCode,
    roleRowExistsByService: session.roleRowExistsByService,
    roleLookupSource: session.roleLookupSource,
    serviceKeyPresent: session.serviceKeyPresent,
  };
}

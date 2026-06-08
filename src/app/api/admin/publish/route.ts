import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({ table: z.string(), id: z.string().uuid(), status: z.enum(["draft", "review", "published"]) });

export async function POST(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const supabase = await createServerSupabaseClient();

  const { table, id, status } = parsed.data;
  const { error } = await supabase.from(table).update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}

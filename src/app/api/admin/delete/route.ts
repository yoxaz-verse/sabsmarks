import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const payloadSchema = z.object({
  table: z.literal("locations"),
  id: z.string().uuid(),
});

export async function POST(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const parsed = payloadSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid delete request." }, { status: 400 });

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from(parsed.data.table).delete().eq("id", parsed.data.id);
  if (error) return NextResponse.json({ error: `DB error: ${error.message}` }, { status: 400 });

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({ public_id: z.string(), secure_url: z.string().url(), resource_type: z.string().default("image") });

export async function POST(req: Request) {
  const { error: authError, session } = await requireAdminApiSession();
  if (authError) return authError;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("media_assets").insert({
    public_id: parsed.data.public_id,
    url: parsed.data.secure_url,
    resource_type: parsed.data.resource_type,
    created_by: session?.user.id ?? null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

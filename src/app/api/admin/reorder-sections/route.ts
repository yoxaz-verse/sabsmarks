import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({
  updates: z.array(z.object({ id: z.string().uuid(), order_index: z.number().int().min(0) })),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const supabase = await createServerSupabaseClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  for (const item of parsed.data.updates) {
    await supabase.from("sections").update({ order_index: item.order_index }).eq("id", item.id);
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const schema = z.object({ email: z.string().trim().toLowerCase().email() });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: parsed.data.email,
      source: "footer",
      status: "active",
    },
    { onConflict: "email", ignoreDuplicates: true }
  );

  if (error) {
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Subscribed successfully." });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const email = parsed.data.email.toLowerCase().trim();

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email,
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

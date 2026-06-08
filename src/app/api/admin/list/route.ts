import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const allowed = new Set([
  "pages",
  "practice_areas",
  "industry_solutions",
  "publications",
  "careers",
  "offices",
  "locations",
  "team_members",
  "insight_categories",
  "insight_tags",
  "menu_items",
  "site_settings",
  "newsletter_subscribers",
]);

const tableOrderColumn: Record<string, string> = {
  newsletter_subscribers: "created_at",
};

const querySchema = z.object({ table: z.string().min(1) });

export async function GET(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const url = new URL(req.url);
  const parsed = querySchema.safeParse({ table: url.searchParams.get("table") ?? "" });
  if (!parsed.success) return NextResponse.json({ error: "Missing table parameter." }, { status: 400 });

  const table = parsed.data.table;
  if (!allowed.has(table)) return NextResponse.json({ error: "Table not allowed." }, { status: 400 });

  const supabase = await createServerSupabaseClient();

  const orderColumn = tableOrderColumn[table] ?? "updated_at";
  const { data, error } = await supabase.from(table).select("*").order(orderColumn, { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data: data ?? [] });
}

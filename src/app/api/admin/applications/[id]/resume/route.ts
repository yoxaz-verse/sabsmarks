import { NextResponse } from "next/server";
import { requireAdminApiSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const { id } = await params;
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("career_applications")
    .select("resume_bucket, resume_path")
    .eq("id", id)
    .single<{ resume_bucket: string; resume_path: string }>();

  if (error || !data?.resume_bucket || !data.resume_path) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  }

  const { data: signed, error: signedError } = await supabase.storage.from(data.resume_bucket).createSignedUrl(data.resume_path, 60);
  if (signedError || !signed?.signedUrl) {
    return NextResponse.json({ error: "Could not create resume download link." }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}

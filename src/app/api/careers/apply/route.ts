import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const maxResumeSize = 5 * 1024 * 1024;
const resumeBucket = "career-resumes";
const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const allowedResumeExtensions = new Set(["pdf", "doc", "docx"]);

const applicationSchema = z.object({
  career_id: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().max(2500).optional(),
});

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function cleanFileName(name: string) {
  const cleaned = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return cleaned || "resume";
}

function extensionFor(file: File) {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts.at(-1)?.toLowerCase() ?? "" : "";
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const parsed = applicationSchema.safeParse({
    career_id: textValue(formData, "career_id"),
    name: textValue(formData, "name"),
    email: textValue(formData, "email"),
    phone: textValue(formData, "phone"),
    message: textValue(formData, "message"),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: issue?.message ?? "Please check the application form." }, { status: 400 });
  }

  const resume = formData.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: "Please upload your resume." }, { status: 400 });
  }

  const resumeExtension = extensionFor(resume);
  if (!allowedResumeExtensions.has(resumeExtension) || !allowedResumeTypes.has(resume.type)) {
    return NextResponse.json({ error: "Resume must be a PDF, DOC, or DOCX file." }, { status: 400 });
  }

  if (resume.size > maxResumeSize) {
    return NextResponse.json({ error: "Resume file size must be 5 MB or less." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const { data: career, error: careerError } = await supabase
    .from("careers")
    .select("id, title, status")
    .eq("id", parsed.data.career_id)
    .eq("status", "published")
    .single();

  if (careerError || !career) {
    return NextResponse.json({ error: "This role is not accepting applications right now." }, { status: 404 });
  }

  const safeName = cleanFileName(resume.name);
  const resumePath = `${parsed.data.career_id}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { error: uploadError } = await supabase.storage.from(resumeBucket).upload(resumePath, resume, {
    contentType: resume.type,
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Resume upload failed. Please try again." }, { status: 500 });
  }

  const { error: insertError } = await supabase.from("career_applications").insert({
    career_id: parsed.data.career_id,
    applicant_name: parsed.data.name,
    applicant_email: parsed.data.email.toLowerCase(),
    applicant_phone: parsed.data.phone,
    message: parsed.data.message || null,
    resume_bucket: resumeBucket,
    resume_path: resumePath,
    resume_filename: resume.name,
    status: "new",
  });

  if (insertError) {
    await supabase.storage.from(resumeBucket).remove([resumePath]);
    return NextResponse.json({ error: "Application could not be saved. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: `Application submitted for ${career.title}.` });
}

import Link from "next/link";
import { Download } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type CareerApplicationRow = {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  message: string | null;
  resume_filename: string | null;
  status: string;
  created_at: string;
  career: { title: string; slug: string } | null;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export async function CareerApplicationsTable() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("career_applications")
    .select("id, applicant_name, applicant_email, applicant_phone, message, resume_filename, status, created_at, career:careers(title, slug)")
    .order("created_at", { ascending: false })
    .returns<CareerApplicationRow[]>();

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">Careers</p>
        <h2 className="mt-2 text-xl font-semibold text-stone-900">Applications</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">Review submitted applications and open private resume links.</p>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error.message}</p> : null}

      <div className="mt-5 overflow-x-auto rounded-xl border border-stone-200">
        <table className="min-w-full text-sm">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Applicant</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Phone</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Submitted</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Resume</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((application) => (
              <tr key={application.id} className="border-t border-stone-200 align-top">
                <td className="px-4 py-4">
                  <p className="font-semibold text-stone-800">{application.applicant_name}</p>
                  <a href={`mailto:${application.applicant_email}`} className="mt-1 block text-xs text-stone-600 hover:text-stone-900">
                    {application.applicant_email}
                  </a>
                  {application.message ? <p className="mt-2 max-w-sm text-xs leading-5 text-stone-500">{application.message}</p> : null}
                </td>
                <td className="px-4 py-4 text-stone-600">
                  {application.career ? (
                    <Link href={`/careers/${application.career.slug}`} className="font-medium text-stone-800 hover:text-stone-950">
                      {application.career.title}
                    </Link>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-4 text-stone-600">{application.applicant_phone}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700">
                    {application.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-stone-600">{formatDate(application.created_at)}</td>
                <td className="px-4 py-4">
                  <Link
                    href={`/api/admin/applications/${application.id}/resume`}
                    target="_blank"
                    className="inline-flex items-center rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-700 transition hover:bg-stone-50"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Resume
                  </Link>
                  {application.resume_filename ? <p className="mt-2 max-w-40 truncate text-xs text-stone-500">{application.resume_filename}</p> : null}
                </td>
              </tr>
            ))}
            {!error && (data ?? []).length === 0 ? (
              <tr className="border-t border-stone-200">
                <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                  No applications submitted yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

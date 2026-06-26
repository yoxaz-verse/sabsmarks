import Link from "next/link";
import { ShieldCheck, LockKeyhole, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f4f7fb] text-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#16233f_46%,#1f3a5f_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(32,164,71,0.18),transparent_25%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="absolute inset-y-0 left-[8%] w-px bg-white/10" />
        <div className="absolute inset-x-0 top-[18%] h-px bg-white/8" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="flex items-center justify-between rounded-[28px] border border-white/12 bg-white/6 px-5 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur md:px-6">
          <Link href="/" className="inline-flex items-center text-white/92 transition hover:text-white">
            <Logo className="w-[188px] rounded-2xl bg-white px-3 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.18)] sm:w-[216px]" />
          </Link>
          <div className="type-eyebrow hidden rounded-full border border-white/12 bg-white/8 px-4 py-2 text-white/72 sm:block">
            CMS Admin Portal
          </div>
        </div>

        <section className="flex flex-1 items-center py-6 md:py-8 lg:py-10">
          <div className="grid w-full items-stretch gap-6 lg:grid-cols-[1.1fr_minmax(420px,520px)] xl:gap-8">
            <aside className="order-2 flex flex-col justify-between rounded-[32px] border border-white/12 bg-white/7 p-6 text-white shadow-[0_28px_100px_rgba(15,23,42,0.24)] backdrop-blur md:p-8 lg:order-1 lg:min-h-[640px] lg:p-10">
              <div>
                <div className="type-eyebrow inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1.5 text-sky-100">
                  <ShieldCheck className="h-4 w-4" />
                  Secure Admin Access
                </div>
                <h1 className="type-page-title mt-6 max-w-lg text-white">
                  Focused access to the Sabs Marks JVS & Co. CMS.
                </h1>
                <p className="type-body mt-5 max-w-xl text-slate-200/88 md:text-lg">
                  Sign in to manage site content, editorial updates, and team information from a single protected workspace built for the internal operations team.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/12 bg-slate-950/26 p-4">
                  <LayoutDashboard className="h-5 w-5 text-sky-200" />
                  <p className="type-card-title mt-3 text-sm text-white">Content control</p>
                  <p className="type-body-sm mt-2 text-slate-300/86">Keep pages, sections, and publishing workflows organized in one place.</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-slate-950/26 p-4">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <p className="type-card-title mt-3 text-sm text-white">Role-protected access</p>
                  <p className="type-body-sm mt-2 text-slate-300/86">Only approved CMS users can reach the protected console after sign-in.</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-slate-950/26 p-4">
                  <LockKeyhole className="h-5 w-5 text-violet-200" />
                  <p className="type-card-title mt-3 text-sm text-white">Reliable workflow</p>
                  <p className="type-body-sm mt-2 text-slate-300/86">A clean login screen that stays readable regardless of the public site theme.</p>
                </div>
              </div>
            </aside>

            <div className="order-1 flex items-center lg:order-2">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}

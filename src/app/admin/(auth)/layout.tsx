import { Logo } from "@/components/layout/logo";
import { Header } from "@/components/layout/header";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-[var(--surface)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-[#20a447]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,58,138,0.06),transparent_42%),radial-gradient(circle_at_85%_30%,rgba(32,164,71,0.08),transparent_36%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-90px)] w-full max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-10">
          <aside className="order-2 rounded-3xl border border-[var(--glass-border)] bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-10 lg:order-1">
            <Logo className="items-start scale-95 origin-left md:scale-100" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Secure Admin Access</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--ink)] md:text-4xl">
              Welcome to the CMS control center.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              Manage pages, team profiles, and firm content in one place with a focused, secure editing experience.
            </p>
          </aside>

          <div className="order-1 lg:order-2">{children}</div>
        </div>
      </section>
    </>
  );
}

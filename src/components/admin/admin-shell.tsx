import Link from "next/link";

const nav = [
  ["Dashboard", "/admin"],
] as const;

export function AdminShell({ children, email, role }: { children: React.ReactNode; email: string | null; role: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
      <aside className="rounded-2xl border border-stone-200 bg-white p-4">
        <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-stone-500">CMS Navigation</h2>
        <nav className="grid gap-1">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-100">
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900">Admin Console</h1>
              <p className="text-sm text-stone-600">Admin editing modules are temporarily disabled.</p>
            </div>
            <div className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700">
              {role} • {email ?? "Unknown User"}
            </div>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}

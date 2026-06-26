"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/components/admin/admin-navigation";

export function AdminShell({ children, email, role }: { children: React.ReactNode; email: string | null; role: string }) {
  const pathname = usePathname();

  return (
    <div className="admin-console grid gap-6 lg:grid-cols-[250px_1fr]">
      <aside className="rounded-2xl border border-stone-200 bg-white p-4">
        <h2 className="type-eyebrow mb-3 px-2 text-stone-500">CMS Navigation</h2>
        <nav className="grid gap-1">
          {adminNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-3 text-sm transition ${
                pathname === item.href ? "bg-stone-900 text-white shadow-sm" : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              <div className="type-label">{item.label}</div>
              <p className={`type-small mt-1 ${pathname === item.href ? "text-stone-200" : "text-stone-500"}`}>{item.description}</p>
            </Link>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="type-card-title text-2xl text-stone-900">Admin Console</h1>
              <p className="type-body-sm text-stone-600">Manage leadership, locations, insights, careers, and newsletter activity from one workspace.</p>
            </div>
            <div className="type-eyebrow rounded-full border border-stone-300 px-4 py-2 text-stone-700">
              {role} • {email ?? "Unknown User"}
            </div>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}

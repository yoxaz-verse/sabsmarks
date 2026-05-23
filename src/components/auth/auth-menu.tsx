"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AdminUserView } from "@/types/cms";

type AuthMenuProps = AdminUserView;

export function AuthMenu({ isAuthenticated, email, role }: AuthMenuProps) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onLogout() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login?reason=signedout");
    router.refresh();
  }

  if (!isAuthenticated) {
    return (
      <Link href="/admin/login" className="rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--surface)] hover-glow transition-all">
        Admin Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/admin" className="rounded-full border border-[var(--glass-border)] bg-surface-raised px-3 py-2 text-xs font-semibold uppercase tracking-wide text-accent hover-glow transition-all">
        {role ?? "user"}
      </Link>
      <span className="hidden max-w-44 truncate text-xs text-muted md:inline">{email}</span>
      <button
        type="button"
        onClick={onLogout}
        disabled={busy}
        className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--bg)] disabled:opacity-60 hover-glow transition-all"
      >
        {busy ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}

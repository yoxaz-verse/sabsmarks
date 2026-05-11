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
      <Link href="/admin/login" className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
        Admin Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/admin" className="rounded-full border border-stone-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700">
        {role ?? "user"}
      </Link>
      <span className="hidden max-w-44 truncate text-xs text-stone-600 md:inline">{email}</span>
      <button
        type="button"
        onClick={onLogout}
        disabled={busy}
        className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-60"
      >
        {busy ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        setMessage("Invalid email or password.");
        return;
      }
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setMessage("Email is not confirmed yet.");
        return;
      }
      setMessage(error.message);
      return;
    }

    if (!data.session || !data.user) {
      setStatus("error");
      setMessage("Sign-in succeeded but session was not established. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function switchAccount() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-stone-200 bg-white px-8 py-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:px-10 md:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Secure Admin Access</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--ink)]">Admin Login</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Sign in to access the CMS dashboard.</p>

      <form action={onSubmit} className="mt-8 grid gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="h-14 rounded-xl border border-stone-300 px-4 text-lg text-[var(--ink)] placeholder:text-stone-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="h-14 rounded-xl border border-stone-300 px-4 text-lg text-[var(--ink)] placeholder:text-stone-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 h-13 rounded-full bg-stone-900 px-6 text-lg font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {reason === "unauthorized" ? <p className="mt-4 text-sm text-amber-700">This account is signed in but does not have admin access.</p> : null}
      {reason === "missing-role" ? <p className="mt-4 text-sm text-amber-700">Your account has no CMS role yet. Ask an admin to assign role in `user_roles`.</p> : null}
      {reason === "role-query-failed" ? <p className="mt-4 text-sm text-amber-700">Signed in, but role lookup failed. Please contact your administrator.</p> : null}
      {reason === "signedout" ? <p className="mt-4 text-sm text-green-700">You have been signed out.</p> : null}
      {(reason === "unauthorized" || reason === "missing-role" || reason === "role-query-failed") ? (
        <button type="button" onClick={switchAccount} className="mt-4 rounded-full border border-stone-300 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700 hover:bg-stone-50">
          Sign out & switch account
        </button>
      ) : null}
      {message ? <p className="mt-2 text-sm text-red-700">{message}</p> : null}
    </div>
  );
}

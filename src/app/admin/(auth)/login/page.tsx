"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminLoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginFallback() {
  return (
    <div className="mx-auto w-full max-w-[520px] rounded-[32px] border border-slate-200 bg-white px-6 py-7 text-slate-950 shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:px-8 sm:py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Secure Admin Access</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Admin Login</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">Loading...</p>
    </div>
  );
}

function AdminLoginForm() {
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

  const roleMessage =
    reason === "unauthorized"
      ? "This account is signed in but does not have admin access."
      : reason === "missing-role"
        ? "Your account has no CMS role yet. Ask an admin to assign role in `user_roles`."
        : reason === "role-query-failed"
          ? "Signed in, but role lookup failed. Please contact your administrator."
          : null;

  return (
    <div className="mx-auto w-full max-w-[520px] rounded-[32px] border border-slate-200 bg-white px-6 py-7 text-slate-950 shadow-[0_32px_90px_rgba(15,23,42,0.18)] sm:px-8 sm:py-8 md:px-10 md:py-10">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Secure Admin Access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Sign in to access the CMS dashboard.</p>
      </div>

      <form action={onSubmit} className="mt-6 grid gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="h-14 rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="h-14 rounded-2xl border border-slate-300 bg-white px-4 text-base text-slate-950 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-6 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-5 space-y-3">
        {roleMessage ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">{roleMessage}</p>
        ) : null}
        {reason === "signedout" ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">You have been signed out.</p>
        ) : null}
        {message ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-900">{message}</p> : null}
      </div>

      {roleMessage ? (
        <button
          type="button"
          onClick={switchAccount}
          className="mt-5 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Sign out & switch account
        </button>
      ) : null}
    </div>
  );
}

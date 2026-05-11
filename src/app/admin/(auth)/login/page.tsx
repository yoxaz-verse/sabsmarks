"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const reason = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("reason") : null;
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
    <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <form action={onSubmit} className="mt-6 grid gap-4">
        <input name="email" type="email" placeholder="Email" className="rounded-lg border border-stone-300 px-3 py-2" required />
        <input name="password" type="password" placeholder="Password" className="rounded-lg border border-stone-300 px-3 py-2" required />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {reason === "unauthorized" ? <p className="mt-3 text-sm text-amber-700">This account is signed in but does not have admin access.</p> : null}
      {reason === "missing-role" ? <p className="mt-3 text-sm text-amber-700">Your account has no CMS role yet. Ask an admin to assign role in `user_roles`.</p> : null}
      {reason === "signedout" ? <p className="mt-3 text-sm text-green-700">You have been signed out.</p> : null}
      {(reason === "unauthorized" || reason === "missing-role") ? (
        <button type="button" onClick={switchAccount} className="mt-3 rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-700">
          Sign out & switch account
        </button>
      ) : null}
      {message ? <p className="mt-2 text-sm text-red-700">{message}</p> : null}
    </div>
  );
}

"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Unable to subscribe right now.");
        return;
      }

      setState("success");
      setMessage(data.message ?? "Thanks for subscribing.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <label htmlFor="newsletter-email" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
        Email Address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="min-h-12 flex-1 rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_84%,transparent)] px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_20%,transparent)]"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="min-h-12 rounded-2xl bg-accent px-5 py-3 text-sm font-bold text-white uppercase tracking-[0.14em] transition hover:bg-accent-secondary disabled:opacity-60"
        >
          {state === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </div>
      {message ? <p className={`mt-2 text-xs font-semibold ${state === "success" ? "text-accent-secondary" : "text-red-500"}`}>{message}</p> : null}
    </form>
  );
}

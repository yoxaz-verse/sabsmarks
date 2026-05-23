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
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full rounded-sm border border-[var(--glass-border)] bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-[var(--accent)]"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-3 w-full bg-accent px-4 py-3 text-sm font-bold text-white uppercase tracking-wider transition hover:bg-accent-secondary disabled:opacity-60 rounded-sm hover-glow"
      >
        {state === "loading" ? "Sending..." : "Subscribe to Newsletter"}
      </button>
      {message ? <p className={`mt-2 text-xs font-semibold ${state === "success" ? "text-accent-secondary" : "text-red-500"}`}>{message}</p> : null}
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AutofillPanel() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function runAutofill() {
    setState("running");
    setMessage("");

    const res = await fetch("/api/admin/autofill", { method: "POST" });
    const json = (await res.json()) as { ok?: boolean; message?: string; error?: string };

    if (!res.ok) {
      setState("error");
      setMessage(json.error ?? "Auto-fill failed.");
      return;
    }

    setState("done");
    setMessage(json.message ?? "Auto-fill completed.");
    router.refresh();
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-stone-900">One-Click Auto Fill</h2>
      <p className="mt-2 text-sm text-stone-600">
        This will overwrite current CMS baseline content and populate all major tables/pages so you do not have to re-enter content manually.
      </p>
      <button
        type="button"
        disabled={state === "running"}
        onClick={runAutofill}
        className="mt-5 rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {state === "running" ? "Running..." : "Run Auto Fill"}
      </button>
      {message ? <p className={`mt-3 text-sm ${state === "error" ? "text-red-700" : "text-green-700"}`}>{message}</p> : null}
    </section>
  );
}

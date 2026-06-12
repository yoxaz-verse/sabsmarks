"use client";

import { useEffect, useState } from "react";

type CareersLandingForm = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  introTitle: string;
  introBody: string;
};

const defaultForm: CareersLandingForm = {
  heroEyebrow: "Career",
  heroTitle: "Join Us",
  heroDescription: "Join a firm where values matter, people come first, and excellence is a way of life.",
  introTitle: "Build your career with SABS Marks JVS & Co.",
  introBody:
    "At SABS Marks JVS & Co., we believe that professional success is built on a foundation of ethics, integrity, teamwork, and continuous learning. We foster a supportive work environment where every team member is respected, encouraged to grow, and empowered to make a meaningful contribution.\n\nWhether you are a Chartered Accountant, Article Assistant, HR Professional, or a young graduate starting your career, you will find opportunities to learn, develop, and excel alongside experienced professionals.\n\nJoin a firm where values matter, people come first, and excellence is a way of life.",
};

export function CareersLandingEditor() {
  const [form, setForm] = useState<CareersLandingForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/careers-page");
      const json = (await res.json()) as { data?: CareersLandingForm; error?: string };

      if (!res.ok) {
        setError(json.error ?? "Failed to load Join Us page content.");
      } else if (json.data) {
        setForm(json.data);
      }

      setLoading(false);
    }

    void load();
  }, []);

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/admin/careers-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };

    if (!res.ok) {
      setError(json.error ?? "Failed to save Join Us page content.");
      setSaving(false);
      return;
    }

    setMessage("Join Us page content saved.");
    setSaving(false);
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Join Us Landing Content</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This edits the public <code>/careers</code> intro using the existing pages and sections CMS model.
        </p>
      </div>

      {loading ? <p className="mt-4 text-sm text-stone-500">Loading page content...</p> : null}

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm text-stone-700">
          Hero Eyebrow
          <input
            value={form.heroEyebrow}
            onChange={(e) => setForm((prev) => ({ ...prev, heroEyebrow: e.target.value }))}
            className="rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2 text-sm text-stone-700">
          Hero Title
          <input
            value={form.heroTitle}
            onChange={(e) => setForm((prev) => ({ ...prev, heroTitle: e.target.value }))}
            className="rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2 text-sm text-stone-700">
          Hero Description
          <textarea
            value={form.heroDescription}
            onChange={(e) => setForm((prev) => ({ ...prev, heroDescription: e.target.value }))}
            className="min-h-24 rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2 text-sm text-stone-700">
          Intro Title
          <input
            value={form.introTitle}
            onChange={(e) => setForm((prev) => ({ ...prev, introTitle: e.target.value }))}
            className="rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2 text-sm text-stone-700">
          Intro Body
          <textarea
            value={form.introBody}
            onChange={(e) => setForm((prev) => ({ ...prev, introBody: e.target.value }))}
            className="min-h-40 rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-green-700">{message}</p> : null}

      <button
        disabled={saving || loading}
        onClick={save}
        className="mt-6 rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Join Us Content"}
      </button>
    </section>
  );
}

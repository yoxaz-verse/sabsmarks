"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminModuleConfig, AdminRecord } from "@/types/admin";

function inputValue(record: AdminRecord, key: string) {
  const value = record[key];
  return value === null || value === undefined ? "" : String(value);
}

function datetimeLocalValue(value: unknown) {
  if (!value) return "";
  const text = String(value);
  if (text.includes("T") && text.length >= 16) return text.slice(0, 16);
  return "";
}

export function ModuleManager({ config }: { config: AdminModuleConfig }) {
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AdminRecord>({ status: "draft" });

  const orderedFields = useMemo(() => config.fields, [config.fields]);

  async function load() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/list?table=${encodeURIComponent(config.table)}`);
    const json = (await res.json()) as { data?: AdminRecord[]; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to load records.");
    } else {
      setRecords(json.data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.table]);

  function openNew() {
    const defaults: AdminRecord = { status: "draft" };
    for (const field of config.fields) {
      if (field.type === "checkbox" && defaults[field.key] === undefined) defaults[field.key] = false;
      if (field.type === "number" && defaults[field.key] === undefined) defaults[field.key] = 0;
    }
    setForm(defaults);
    setMessage("");
    setError("");
    setOpen(true);
  }

  function openEdit(record: AdminRecord) {
    setForm(record);
    setMessage("");
    setError("");
    setOpen(true);
  }

  async function save() {
    setMessage("");
    setError("");
    setSaving(true);
    const res = await fetch("/api/admin/upsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: config.table, payload: form }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };

    if (!res.ok) {
      setError(json.error ?? "Failed to save.");
      setSaving(false);
      return;
    }

    setMessage("Saved");
    await load();
    setOpen(false);
    setSaving(false);
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-stone-900">{config.title}</h2>
        <button onClick={openNew} className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
          Add New
        </button>
      </div>

      {loading ? <p className="mt-4 text-sm text-stone-600">Loading records...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-green-700">{message}</p> : null}

      <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
        <table className="min-w-full text-sm">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Primary</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Slug</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-stone-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={String(record.id ?? record.slug)} className="border-t border-stone-200">
                <td className="px-4 py-3 text-stone-800">{String(record[config.primaryLabel] ?? "-")}</td>
                <td className="px-4 py-3 text-stone-600">{String(record.slug ?? "-")}</td>
                <td className="px-4 py-3 text-stone-600">{String(record.status ?? "-")}</td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(record)} className="rounded-lg border border-stone-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {!loading && records.length === 0 ? (
              <tr className="border-t border-stone-200">
                <td colSpan={4} className="px-4 py-8 text-center text-stone-500">
                  No records yet. Click <span className="font-semibold">Add New</span> to create your first entry.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 md:items-center md:p-8">
          <div className="h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-stone-900">Edit {config.title}</h3>
              <button onClick={() => setOpen(false)} className="text-sm text-stone-600">Close</button>
            </div>

            <div className="mt-5 grid gap-4">
              {orderedFields.map((field) => {
                const value = form[field.key];

                if (field.type === "textarea") {
                  return (
                    <label key={field.key} className="grid gap-2 text-sm text-stone-700">
                      {field.label} {field.required ? <span className="text-red-600">*</span> : null}
                      <textarea
                        value={inputValue(form, field.key)}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="min-h-28 rounded-lg border border-stone-300 px-3 py-2"
                      />
                    </label>
                  );
                }

                if (field.type === "select") {
                  return (
                    <label key={field.key} className="grid gap-2 text-sm text-stone-700">
                      {field.label} {field.required ? <span className="text-red-600">*</span> : null}
                      <select
                        value={inputValue(form, field.key) || "draft"}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="rounded-lg border border-stone-300 px-3 py-2"
                      >
                        {(field.options ?? []).map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (field.type === "checkbox") {
                  return (
                    <label key={field.key} className="flex items-center gap-3 text-sm text-stone-700">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.checked }))}
                        className="h-4 w-4"
                      />
                      {field.label}
                    </label>
                  );
                }

                return (
                  <label key={field.key} className="grid gap-2 text-sm text-stone-700">
                    {field.label} {field.required ? <span className="text-red-600">*</span> : null}
                    <input
                      type={field.type === "datetime" ? "datetime-local" : field.type}
                      required={field.required}
                      value={field.type === "datetime" ? datetimeLocalValue(form[field.key]) : inputValue(form, field.key)}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.key]:
                            field.type === "number"
                              ? Number(e.target.value || 0)
                              : field.type === "datetime"
                                ? (e.target.value ? new Date(e.target.value).toISOString() : null)
                                : e.target.value,
                        }))
                      }
                      className="rounded-lg border border-stone-300 px-3 py-2"
                    />
                  </label>
                );
              })}
            </div>

            {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
            <button disabled={saving} onClick={save} className="mt-6 rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

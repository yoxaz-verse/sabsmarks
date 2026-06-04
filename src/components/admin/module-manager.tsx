"use client";

import { useEffect, useMemo, useState } from "react";
import type { AdminModuleConfig, AdminRecord } from "@/types/admin";

function inputValue(record: AdminRecord, key: string) {
  const value = record[key];
  return value === null || value === undefined ? "" : String(value);
}

function inputText(record: AdminRecord, key: string) {
  const value = record[key];
  if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
    return JSON.stringify(value, null, 2);
  }
  return inputValue(record, key);
}

function datetimeLocalValue(value: unknown) {
  if (!value) return "";
  const text = String(value);
  if (text.includes("T") && text.length >= 16) return text.slice(0, 16);
  return "";
}

function nullableText(value: unknown) {
  if (typeof value !== "string") return value ?? null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeLocationsText(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .join("\n");
  }

  return typeof value === "string" ? value : "";
}

function shapeSiteSettingsForm(record: AdminRecord) {
  const socialLinks = isStringRecord(record.social_links) ? record.social_links : {};

  return {
    ...record,
    head_office_label: typeof record.head_office_label === "string" ? record.head_office_label : "",
    head_office_address: typeof record.head_office_address === "string" ? record.head_office_address : "",
    service_locations_text: normalizeLocationsText(record.service_locations),
    linkedin_url: socialLinks.linkedin ?? "",
    instagram_url: socialLinks.instagram ?? "",
  };
}

function serializeSiteSettingsForm(form: AdminRecord) {
  const existingSocialLinks = isStringRecord(form.social_links) ? { ...form.social_links } : {};
  const linkedin = typeof form.linkedin_url === "string" ? form.linkedin_url.trim() : "";
  const instagram = typeof form.instagram_url === "string" ? form.instagram_url.trim() : "";
  const socialLinks = { ...existingSocialLinks };

  if (linkedin) socialLinks.linkedin = linkedin;
  else delete socialLinks.linkedin;

  if (instagram) socialLinks.instagram = instagram;
  else delete socialLinks.instagram;

  const serviceLocations = normalizeLocationsText(form.service_locations_text)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    id: form.id,
    brand_name: String(form.brand_name ?? ""),
    logo_url: nullableText(form.logo_url),
    primary_email: nullableText(form.primary_email),
    primary_phone: nullableText(form.primary_phone),
    head_office_label: nullableText(form.head_office_label),
    head_office_address: nullableText(form.head_office_address),
    social_links: socialLinks,
    service_locations: serviceLocations,
    footer_text: nullableText(form.footer_text),
    disclaimers: nullableText(form.disclaimers),
  };
}

export function ModuleManager({ config }: { config: AdminModuleConfig }) {
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
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
    setForm(config.table === "site_settings" ? shapeSiteSettingsForm(record) : record);
    setMessage("");
    setError("");
    setOpen(true);
  }

  async function save() {
    setMessage("");
    setError("");
    setSaving(true);
    const payload = config.table === "site_settings" ? serializeSiteSettingsForm(form) : form;
    const res = await fetch("/api/admin/upsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: config.table, payload }),
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

  async function uploadTeamPhoto(file: File) {
    if (!file) return;
    setError("");
    setMessage("");
    setUploadingField("photo_url");
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });
      const signJson = (await signRes.json()) as { signature?: string; apiKey?: string; cloudName?: string; timestamp?: number; error?: string };
      if (!signRes.ok || !signJson.signature || !signJson.apiKey || !signJson.cloudName || !signJson.timestamp) {
        throw new Error(signJson.error ?? "Failed to sign upload.");
      }

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", signJson.apiKey);
      body.append("timestamp", String(signJson.timestamp));
      body.append("signature", signJson.signature);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signJson.cloudName}/image/upload`, {
        method: "POST",
        body,
      });
      const uploadJson = (await uploadRes.json()) as { secure_url?: string; public_id?: string; resource_type?: string; error?: { message?: string } };
      if (!uploadRes.ok || !uploadJson.secure_url || !uploadJson.public_id) {
        throw new Error(uploadJson.error?.message ?? "Cloudinary upload failed.");
      }

      const persistRes = await fetch("/api/admin/upload-asset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_id: uploadJson.public_id,
          secure_url: uploadJson.secure_url,
          resource_type: uploadJson.resource_type ?? "image",
        }),
      });
      const persistJson = (await persistRes.json()) as { error?: string };
      if (!persistRes.ok) throw new Error(persistJson.error ?? "Failed to persist media asset.");

      setForm((prev) => ({ ...prev, photo_url: uploadJson.secure_url }));
      setMessage("Photo uploaded.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploadingField(null);
    }
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
        <div className="fixed inset-0 z-[999] flex items-end justify-end bg-black/20 p-4 md:items-center md:p-8">
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
                        value={inputText(form, field.key)}
                        placeholder={field.placeholder}
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
                      value={field.type === "datetime" ? datetimeLocalValue(form[field.key]) : inputText(form, field.key)}
                      placeholder={field.placeholder}
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
                    {config.table === "team_members" && field.key === "photo_url" ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) void uploadTeamPhoto(file);
                            e.currentTarget.value = "";
                          }}
                          className="block w-full text-xs text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-stone-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                        />
                        {uploadingField === "photo_url" ? <span className="text-xs text-stone-500">Uploading...</span> : null}
                      </div>
                    ) : null}
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

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { AdminFieldConfig, AdminModuleConfig, AdminRecord } from "@/types/admin";
import { SITE_VISUALS } from "@/lib/site-visuals";

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

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function formatDateTime(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
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

function shapeCareersForm(record: AdminRecord) {
  const metadata = isRecord(record.metadata) ? record.metadata : {};

  return {
    ...record,
    show_apply_cta: metadata.show_apply_cta === true,
    apply_url: typeof metadata.apply_url === "string" ? metadata.apply_url : "",
  };
}

function serializeCareersForm(form: AdminRecord) {
  const existingMetadata = isRecord(form.metadata) ? { ...form.metadata } : {};
  const showApplyCta = form.show_apply_cta === true;
  const applyUrl = typeof form.apply_url === "string" ? form.apply_url.trim() : "";

  if (showApplyCta) existingMetadata.show_apply_cta = true;
  else delete existingMetadata.show_apply_cta;

  if (applyUrl) existingMetadata.apply_url = applyUrl;
  else delete existingMetadata.apply_url;

  const serialized: AdminRecord = {
    ...form,
    summary: nullableText(form.summary),
    excerpt: nullableText(form.excerpt),
    body: nullableText(form.body),
    image_url: nullableText(form.image_url),
    metadata: existingMetadata,
  };

  delete serialized.show_apply_cta;
  delete serialized.apply_url;

  return serialized;
}

function resolveFieldWidth(field: AdminFieldConfig) {
  if (field.width) return field.width;
  if (field.type === "textarea" || field.type === "checkbox") return "full";
  return "half";
}

function fieldDescription(configTitle: string) {
  if (configTitle === "Leadership") return "Add profile details, photo, and publishing settings for the leadership page.";
  if (configTitle === "Locations") return "Keep each office profile crisp, complete, and ready for the contact pages.";
  if (configTitle === "Insights") return "Structure article metadata first, then add the content that will appear on the site.";
  if (configTitle === "Careers / Join Us") return "Use this form for individual opportunities that will feed the careers listing.";
  return "Complete the essential details, then review publishing settings before saving.";
}

export function ModuleManager({ config }: { config: AdminModuleConfig }) {
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [insightPreviewFailed, setInsightPreviewFailed] = useState(false);
  const [photoPreviewFailed, setPhotoPreviewFailed] = useState(false);
  const [form, setForm] = useState<AdminRecord>({ status: "draft" });

  const orderedFields = useMemo(() => config.fields, [config.fields]);
  const listColumns = useMemo(
    () =>
      config.listColumns ??
      (config.readOnly
        ? config.fields.map((field) => ({ key: field.key, label: field.label }))
        : [
            { key: config.primaryLabel, label: "Primary" },
            { key: "slug", label: "Slug" },
            { key: "status", label: "Status" },
          ]),
    [config]
  );

  const sections = useMemo(() => {
    const grouped: Array<{ title: string; fields: AdminFieldConfig[] }> = [];

    for (const field of orderedFields) {
      const sectionTitle = field.section ?? "Details";
      const existing = grouped.find((section) => section.title === sectionTitle);
      if (existing) existing.fields.push(field);
      else grouped.push({ title: sectionTitle, fields: [field] });
    }

    return grouped;
  }, [orderedFields]);

  const isEditing = typeof form.id === "string" && form.id.length > 0;

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
    setInsightPreviewFailed(false);
    setPhotoPreviewFailed(false);
    setMessage("");
    setError("");
    setOpen(true);
  }

  function openEdit(record: AdminRecord) {
    setForm(config.table === "site_settings" ? shapeSiteSettingsForm(record) : config.table === "careers" ? shapeCareersForm(record) : record);
    setInsightPreviewFailed(false);
    setPhotoPreviewFailed(false);
    setMessage("");
    setError("");
    setOpen(true);
  }

  async function save() {
    setMessage("");
    setError("");
    if (config.table === "careers" && form.show_apply_cta === true && inputValue(form, "apply_url").trim().length === 0) {
      setError("Add an Apply URL or turn off the Apply button before saving.");
      return;
    }
    setSaving(true);
    const payload =
      config.table === "site_settings" ? serializeSiteSettingsForm(form) : config.table === "careers" ? serializeCareersForm(form) : form;
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

  async function uploadAsset(file: File, fieldKey: string) {
    if (!file) return;
    setError("");
    setMessage("");
    setUploadingField(fieldKey);
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

      setForm((prev) => ({ ...prev, [fieldKey]: uploadJson.secure_url }));
      if (fieldKey === "photo_url") {
        setPhotoPreviewFailed(false);
        setMessage("Photo uploaded.");
      } else if (fieldKey === "image_url") {
        setInsightPreviewFailed(false);
        setMessage("Feature image uploaded.");
      } else {
        setMessage("Asset uploaded.");
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploadingField(null);
    }
  }

  function renderField(field: AdminFieldConfig) {
    const value = form[field.key];
    const width = resolveFieldWidth(field);
    const wrapperClass = width === "full" ? "md:col-span-2" : "";
    const isTeamPhotoField = config.table === "team_members" && field.key === "photo_url";
    const isInsightImageField = config.table === "publications" && field.key === "image_url";
    const isCareerApplyUrlField = config.table === "careers" && field.key === "apply_url";
    const isCareerApplyEnabled = form.show_apply_cta === true;
    const photoUrl = isTeamPhotoField && typeof value === "string" ? value.trim() : "";
    const insightImageUrl = isInsightImageField && typeof value === "string" ? value.trim() : "";
    const showPhotoPreview = isTeamPhotoField && photoUrl.length > 0;
    const showInsightPreview = isInsightImageField && insightImageUrl.length > 0;
    const photoAlt =
      typeof form.name === "string" && form.name.trim().length > 0 ? `${form.name.trim()} photo preview` : "Leadership photo preview";
    const insightAlt =
      typeof form.title === "string" && form.title.trim().length > 0 ? `${form.title.trim()} feature image preview` : "Insight feature image preview";

    if (field.type === "textarea") {
      return (
        <label key={field.key} className={`admin-field ${wrapperClass}`}>
          <span className="admin-label">
            {field.label}
            {field.required ? <span className="text-red-600">*</span> : null}
          </span>
          <textarea
            value={inputText(form, field.key)}
            placeholder={field.placeholder}
            onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
            className="admin-textarea"
          />
        </label>
      );
    }

    if (field.type === "select") {
      return (
        <label key={field.key} className={`admin-field ${wrapperClass}`}>
          <span className="admin-label">
            {field.label}
            {field.required ? <span className="text-red-600">*</span> : null}
          </span>
          <select
            value={inputValue(form, field.key) || "draft"}
            onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
            className="admin-select"
          >
            {(field.options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label key={field.key} className={`admin-checkbox ${wrapperClass}`}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.checked }))}
            className="h-4 w-4 rounded border-stone-300 text-stone-900"
          />
          <span className="text-sm font-medium text-stone-700">{field.label}</span>
        </label>
      );
    }

    return (
      <label key={field.key} className={`admin-field ${wrapperClass}`}>
        <span className="admin-label">
          {field.label}
          {field.required ? <span className="text-red-600">*</span> : null}
        </span>
        <input
          type={field.type === "datetime" ? "datetime-local" : field.type}
          required={field.required}
          disabled={isCareerApplyUrlField && !isCareerApplyEnabled}
          value={field.type === "datetime" ? datetimeLocalValue(form[field.key]) : inputText(form, field.key)}
          placeholder={field.placeholder}
          onChange={(e) =>
            {
              if (isTeamPhotoField) setPhotoPreviewFailed(false);
              if (isInsightImageField) setInsightPreviewFailed(false);
              setForm((prev) => ({
                ...prev,
                [field.key]:
                  field.type === "number"
                    ? Number(e.target.value || 0)
                    : field.type === "datetime"
                      ? e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null
                      : e.target.value,
              }));
            }
          }
          className={`admin-input ${isCareerApplyUrlField && !isCareerApplyEnabled ? "cursor-not-allowed opacity-60" : ""}`}
        />
        {isCareerApplyUrlField ? (
          <p className="mt-2 text-xs leading-5 text-stone-500">
            {isCareerApplyEnabled ? "Applicants will be sent to this external URL when they click Apply." : "Turn on Show Apply Button to use this field."}
          </p>
        ) : null}
        {isTeamPhotoField ? (
          <>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-800">Photo preview</p>
              {showPhotoPreview ? (
                photoPreviewFailed ? (
                  <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                    Preview unavailable for this image URL.
                  </p>
                ) : (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    <Image
                      src={photoUrl}
                      alt={photoAlt}
                      width={1200}
                      height={520}
                      unoptimized
                      onError={() => setPhotoPreviewFailed(true)}
                      className="h-52 w-full object-contain bg-stone-100"
                    />
                  </div>
                )
              ) : (
                <p className="mt-3 text-xs leading-5 text-stone-500">Add or upload a photo URL to preview the leadership image here.</p>
              )}
            </div>
            <div className="admin-upload-panel">
              <div>
                <p className="text-sm font-medium text-stone-800">Upload leadership photo</p>
                <p className="mt-1 text-xs leading-5 text-stone-500">Upload an image to populate the Photo URL field automatically.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="file"
                  accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                    if (file) void uploadAsset(file, "photo_url");
                    e.currentTarget.value = "";
                  }}
                  className="block w-full text-xs text-stone-600 file:mr-3 file:rounded-xl file:border-0 file:bg-stone-900 file:px-3 file:py-2.5 file:text-xs file:font-semibold file:text-white"
                />
                {uploadingField === "photo_url" ? <span className="text-xs font-medium text-stone-500">Uploading...</span> : null}
              </div>
            </div>
          </>
        ) : null}
        {isInsightImageField ? (
          <>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-800">Feature image preview</p>
              {showInsightPreview ? (
                insightPreviewFailed ? (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    <Image
                      src={SITE_VISUALS.insights.fallback}
                      alt="Fallback insight feature image preview"
                      width={1200}
                      height={520}
                      unoptimized
                      className="h-52 w-full object-cover bg-stone-100"
                    />
                  </div>
                ) : (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                    <Image
                      src={insightImageUrl}
                      alt={insightAlt}
                      width={1200}
                      height={520}
                      unoptimized
                      onError={() => setInsightPreviewFailed(true)}
                      className="h-52 w-full object-cover bg-stone-100"
                    />
                  </div>
                )
              ) : (
                <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <Image
                    src={SITE_VISUALS.insights.fallback}
                    alt="Default insight feature image preview"
                    width={1200}
                    height={520}
                    unoptimized
                    className="h-52 w-full object-cover bg-stone-100"
                  />
                </div>
              )}
            </div>
            <div className="admin-upload-panel">
              <div>
                <p className="text-sm font-medium text-stone-800">Upload feature image</p>
                <p className="mt-1 text-xs leading-5 text-stone-500">Upload an image to populate the Feature Image URL field automatically.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadAsset(file, "image_url");
                    e.currentTarget.value = "";
                  }}
                  className="block w-full text-xs text-stone-600 file:mr-3 file:rounded-xl file:border-0 file:bg-stone-900 file:px-3 file:py-2.5 file:text-xs file:font-semibold file:text-white"
                />
                {uploadingField === "image_url" ? <span className="text-xs font-medium text-stone-500">Uploading...</span> : null}
              </div>
            </div>
          </>
        ) : null}
      </label>
    );
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-stone-900">{config.title}</h2>
        {!config.readOnly ? (
          <button onClick={openNew} className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
            Add New
          </button>
        ) : null}
      </div>

      {loading ? <p className="mt-4 text-sm text-stone-600">Loading records...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-green-700">{message}</p> : null}

      <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200">
        <table className="min-w-full text-sm">
          <thead className="bg-stone-50">
            <tr>
              {listColumns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left font-semibold text-stone-700">
                  {column.label}
                </th>
              ))}
              {!config.readOnly ? <th className="px-4 py-3 text-left font-semibold text-stone-700">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={String(record.id ?? record.slug)} className="border-t border-stone-200">
                {listColumns.map((column) => {
                  const fieldConfig = orderedFields.find((field) => field.key === column.key);
                  const value = record[column.key];
                  const content = fieldConfig?.type === "datetime" ? formatDateTime(value) : displayValue(value);

                  return (
                    <td key={column.key} className={`px-4 py-3 ${column.key === config.primaryLabel ? "text-stone-800" : "text-stone-600"}`}>
                      {content}
                    </td>
                  );
                })}
                {!config.readOnly ? (
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(record)} className="rounded-lg border border-stone-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700">
                      Edit
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
            {!loading && records.length === 0 ? (
              <tr className="border-t border-stone-200">
                <td colSpan={listColumns.length + (config.readOnly ? 0 : 1)} className="px-4 py-8 text-center text-stone-500">
                  {config.readOnly ? "No records found yet." : <>No records yet. Click <span className="font-semibold">Add New</span> to create your first entry.</>}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {open && !config.readOnly ? (
        <div className="fixed inset-0 z-[999] bg-[rgba(15,23,42,0.34)] px-4 py-4 backdrop-blur-[2px] md:px-8 md:py-8">
          <div className="flex h-full items-end justify-center md:items-center">
            <div className="admin-dialog">
              <div className="admin-dialog-header">
                <div>
                  <p className="admin-dialog-kicker">{isEditing ? "Edit Entry" : "Create Entry"}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">{isEditing ? `Edit ${config.title}` : `Add ${config.title}`}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{fieldDescription(config.title)}</p>
                </div>
                <button onClick={() => setOpen(false)} className="admin-dialog-close" aria-label="Close editor">
                  Close
                </button>
              </div>

              <div className="admin-dialog-body">
                <div className="space-y-6">
                  {sections.map((section) => (
                    <section key={section.title} className="admin-form-section">
                      <div className="admin-form-section-header">
                        <h4 className="admin-form-section-title">{section.title}</h4>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {section.fields.map((field) => renderField(field))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <div className="admin-dialog-footer">
                <div className="min-h-5 text-sm">
                  {error ? <p className="text-red-700">{error}</p> : null}
                  {!error && message ? <p className="text-green-700">{message}</p> : null}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3">
                  <button onClick={() => setOpen(false)} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">
                    Cancel
                  </button>
                  <button
                    disabled={saving}
                    onClick={save}
                    className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

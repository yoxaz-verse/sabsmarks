"use client";

import { useEffect, useState } from "react";
import type { PageRecord, SectionRecord, SectionType, TemplateType } from "@/types/cms";

type EditablePage = Omit<Pick<PageRecord, "id" | "slug" | "title" | "template_type" | "excerpt" | "status" | "published_at">, "id"> & { id?: string };
type EditableSection = Omit<Pick<SectionRecord, "id" | "section_type" | "variant" | "payload" | "order_index" | "is_enabled">, "id"> & { id?: string };

const templateOptions: TemplateType[] = ["home", "about", "practice-area-list", "industry-list", "publication-list", "career-list", "contact-list", "insight-list", "generic"];
const sectionOptions: SectionType[] = ["hero", "rich_text", "card_grid", "cta", "stats", "contact_form", "leadership_grid", "office_cards", "category_tabs", "newsletter_cta"];
const initialSelectedSlug = "careers/philosophy";

const defaultPage: EditablePage = {
  slug: "",
  title: "",
  template_type: "generic",
  excerpt: "",
  status: "draft",
  published_at: null,
};

function defaultPayload(sectionType: SectionType) {
  if (sectionType === "hero") return { kicker: "", headline: "", subtext: "", image: "", imageAlt: "" };
  if (sectionType === "rich_text") return { title: "", content: "", image: "", imageAlt: "", imageAlign: "right" };
  if (sectionType === "card_grid") {
    return {
      title: "Our Capabilities",
      cards: [
        {
          title: "Capability title",
          text: "Short card description.",
          href: "",
          image: "/featured-advisory.jpg",
          imageAlt: "Professional advisory discussion.",
        },
      ],
    };
  }
  if (sectionType === "cta") {
    return {
      title: "Speak with our advisory team",
      text: "Discuss your strategic and regulatory priorities with our experts.",
      href: "/contact",
      buttonLabel: "Book a consultation",
      image: "/banner-backgrounds/page-contact-us.png",
      imageAlt: "Professional meeting space for advisory conversations.",
    };
  }
  return {};
}

function createSection(sectionType: SectionType): EditableSection {
  return {
    section_type: sectionType,
    variant: "default",
    payload: defaultPayload(sectionType),
    order_index: 0,
    is_enabled: true,
  };
}

function safeJsonParse(value: string) {
  try {
    return { value: JSON.parse(value) as Record<string, unknown>, error: "" };
  } catch (error) {
    return {
      value: null,
      error: error instanceof Error ? error.message : "Invalid JSON payload.",
    };
  }
}

export function PageSectionsEditor() {
  const [pages, setPages] = useState<EditablePage[]>([]);
  const [selectedSlug, setSelectedSlug] = useState(initialSelectedSlug);
  const [page, setPage] = useState<EditablePage>(defaultPage);
  const [sections, setSections] = useState<EditableSection[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPages() {
      setLoadingPages(true);
      const res = await fetch("/api/admin/pages-content");
      const json = (await res.json()) as { pages?: EditablePage[]; error?: string };

      if (!res.ok) {
        setError(json.error ?? "Failed to load pages.");
      } else {
        const nextPages = json.pages ?? [];
        setPages(nextPages);
        if (nextPages.length > 0 && !nextPages.some((item) => item.slug === initialSelectedSlug)) {
          setSelectedSlug(nextPages[0].slug);
        }
      }

      setLoadingPages(false);
    }

    void loadPages();
  }, []);

  useEffect(() => {
    async function loadPageDetail() {
      if (!selectedSlug) return;
      setLoadingDetail(true);
      setError("");

      const res = await fetch(`/api/admin/pages-content?slug=${encodeURIComponent(selectedSlug)}`);
      const json = (await res.json()) as { page?: EditablePage; sections?: EditableSection[]; error?: string };

      if (!res.ok || !json.page) {
        setError(json.error ?? "Failed to load page content.");
      } else {
        setPage({
          ...json.page,
          excerpt: typeof json.page.excerpt === "string" ? json.page.excerpt : "",
        });
        setSections((json.sections ?? []).map((section, index) => ({ ...section, order_index: index })));
      }

      setLoadingDetail(false);
    }

    void loadPageDetail();
  }, [selectedSlug]);

  function updateSection(index: number, nextSection: EditableSection) {
    setSections((prev) => prev.map((section, currentIndex) => (currentIndex === index ? { ...nextSection, order_index: currentIndex } : section)));
  }

  function moveSection(index: number, direction: -1 | 1) {
    setSections((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const next = [...prev];
      const [current] = next.splice(index, 1);
      next.splice(targetIndex, 0, current);
      return next.map((section, currentIndex) => ({ ...section, order_index: currentIndex }));
    });
  }

  function addSection(sectionType: SectionType) {
    setSections((prev) => [...prev, { ...createSection(sectionType), order_index: prev.length }]);
  }

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/admin/pages-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        sections: sections.map((section, index) => ({ ...section, order_index: index })),
      }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };

    if (!res.ok) {
      setError(json.error ?? "Failed to save page content.");
      setSaving(false);
      return;
    }

    setMessage("Page content saved.");
    setSelectedSlug(page.slug);
    setSaving(false);

    const pagesRes = await fetch("/api/admin/pages-content");
    const pagesJson = (await pagesRes.json()) as { pages?: EditablePage[] };
    if (pagesRes.ok) setPages(pagesJson.pages ?? []);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Pages & Sections</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">Manage structured CMS pages without touching code.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Edit page metadata and the section stack that drives public routes like <code>/careers/philosophy</code>. Hero and rich text sections use guided fields, and other section types remain editable as JSON.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <aside className="rounded-2xl border border-stone-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Available Pages</h3>
            {loadingPages ? <span className="text-xs text-stone-400">Loading...</span> : null}
          </div>
          <div className="mt-4 grid gap-2">
            {pages.map((item) => (
              <button
                key={item.id ?? item.slug}
                type="button"
                onClick={() => setSelectedSlug(item.slug)}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  selectedSlug === item.slug ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <div className="font-medium">{item.title}</div>
                <p className={`mt-1 text-xs ${selectedSlug === item.slug ? "text-stone-200" : "text-stone-500"}`}>{item.slug}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-stone-700">
                Slug
                <input value={page.slug} onChange={(e) => setPage((prev) => ({ ...prev, slug: e.target.value }))} className="rounded-lg border border-stone-300 px-3 py-2" />
              </label>

              <label className="grid gap-2 text-sm text-stone-700">
                Title
                <input value={page.title} onChange={(e) => setPage((prev) => ({ ...prev, title: e.target.value }))} className="rounded-lg border border-stone-300 px-3 py-2" />
              </label>

              <label className="grid gap-2 text-sm text-stone-700">
                Template
                <select
                  value={page.template_type}
                  onChange={(e) => setPage((prev) => ({ ...prev, template_type: e.target.value as TemplateType }))}
                  className="rounded-lg border border-stone-300 px-3 py-2"
                >
                  {templateOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm text-stone-700">
                Status
                <select
                  value={page.status}
                  onChange={(e) => setPage((prev) => ({ ...prev, status: e.target.value as EditablePage["status"] }))}
                  className="rounded-lg border border-stone-300 px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="review">Review</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm text-stone-700 md:col-span-2">
                Excerpt
                <textarea
                  value={page.excerpt ?? ""}
                  onChange={(e) => setPage((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="min-h-24 rounded-lg border border-stone-300 px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-stone-900">Sections</h3>
                <p className="mt-1 text-sm text-stone-600">Arrange and edit the section stack shown on the public page.</p>
              </div>
              <select
                defaultValue=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  addSection(e.target.value as SectionType);
                  e.target.value = "";
                }}
                className="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-700"
              >
                <option value="">Add section...</option>
                {sectionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 grid gap-4">
              {loadingDetail ? <p className="text-sm text-stone-500">Loading page sections...</p> : null}
              {!loadingDetail && sections.length === 0 ? <p className="text-sm text-stone-500">No sections yet. Add one above to start composing the page.</p> : null}
              {sections.map((section, index) => (
                <SectionCard
                  key={section.id ?? `${section.section_type}-${index}`}
                  index={index}
                  section={section}
                  onChange={(nextSection) => updateSection(index, nextSection)}
                  onMoveUp={() => moveSection(index, -1)}
                  onMoveDown={() => moveSection(index, 1)}
                  onRemove={() => setSections((prev) => prev.filter((_, currentIndex) => currentIndex !== index).map((item, currentIndex) => ({ ...item, order_index: currentIndex })))}
                />
              ))}
            </div>
          </section>

          {error ? <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
          {message ? <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p> : null}

          <button
            type="button"
            onClick={save}
            disabled={saving || loadingDetail}
            className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Page Content"}
          </button>
        </section>
      </div>
    </div>
  );
}

function SectionCard({
  index,
  section,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  index: number;
  section: EditableSection;
  onChange: (section: EditableSection) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  const [jsonDraft, setJsonDraft] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState("");
  const payload = section.payload as Record<string, unknown>;
  const payloadJson = JSON.stringify(section.payload, null, 2);
  const jsonValue = jsonDraft ?? payloadJson;

  return (
    <article className="rounded-2xl border border-stone-200 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Section {index + 1}</p>
          <h4 className="mt-1 text-lg font-semibold text-stone-900">{section.section_type}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onMoveUp} className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-700">
            Move Up
          </button>
          <button type="button" onClick={onMoveDown} className="rounded-full border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-700">
            Move Down
          </button>
          <button type="button" onClick={onRemove} className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700">
            Remove
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-stone-700">
          Section Type
          <select
            value={section.section_type}
            onChange={(e) => onChange({ ...section, section_type: e.target.value as SectionType, payload: defaultPayload(e.target.value as SectionType) })}
            className="rounded-lg border border-stone-300 px-3 py-2"
          >
            {sectionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm text-stone-700">
          Variant
          <input
            value={section.variant}
            onChange={(e) => onChange({ ...section, variant: e.target.value })}
            className="rounded-lg border border-stone-300 px-3 py-2"
          />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-3 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={section.is_enabled}
          onChange={(e) => onChange({ ...section, is_enabled: e.target.checked })}
          className="h-4 w-4 rounded border-stone-300"
        />
        Section enabled
      </label>

      {section.section_type === "hero" ? (
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm text-stone-700">
            Kicker
            <input
              value={String(payload.kicker ?? "")}
              onChange={(e) => onChange({ ...section, payload: { ...payload, kicker: e.target.value } })}
              className="rounded-lg border border-stone-300 px-3 py-2"
            />
          </label>
          <label className="grid gap-2 text-sm text-stone-700">
            Headline
            <input
              value={String(payload.headline ?? "")}
              onChange={(e) => onChange({ ...section, payload: { ...payload, headline: e.target.value } })}
              className="rounded-lg border border-stone-300 px-3 py-2"
            />
          </label>
          <label className="grid gap-2 text-sm text-stone-700">
            Subtext
            <textarea
              value={String(payload.subtext ?? "")}
              onChange={(e) => onChange({ ...section, payload: { ...payload, subtext: e.target.value } })}
              className="min-h-24 rounded-lg border border-stone-300 px-3 py-2"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-stone-700">
              Image URL
              <input
                value={String(payload.image ?? "")}
                onChange={(e) => onChange({ ...section, payload: { ...payload, image: e.target.value } })}
                placeholder="/featured-advisory.jpg"
                className="rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="grid gap-2 text-sm text-stone-700">
              Image Alt Text
              <input
                value={String(payload.imageAlt ?? "")}
                onChange={(e) => onChange({ ...section, payload: { ...payload, imageAlt: e.target.value } })}
                placeholder="Describe the image for accessibility"
                className="rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
          </div>
        </div>
      ) : null}

      {section.section_type === "rich_text" ? (
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm text-stone-700">
            Title
            <input
              value={String(payload.title ?? "")}
              onChange={(e) => onChange({ ...section, payload: { ...payload, title: e.target.value } })}
              className="rounded-lg border border-stone-300 px-3 py-2"
            />
          </label>
          <label className="grid gap-2 text-sm text-stone-700">
            Content
            <textarea
              value={String(payload.content ?? "")}
              onChange={(e) => onChange({ ...section, payload: { ...payload, content: e.target.value } })}
              className="min-h-32 rounded-lg border border-stone-300 px-3 py-2"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm text-stone-700 md:col-span-1">
              Image Alignment
              <select
                value={String(payload.imageAlign ?? "right")}
                onChange={(e) => onChange({ ...section, payload: { ...payload, imageAlign: e.target.value } })}
                className="rounded-lg border border-stone-300 px-3 py-2"
              >
                <option value="right">Right</option>
                <option value="left">Left</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-stone-700 md:col-span-2">
              Image URL
              <input
                value={String(payload.image ?? "")}
                onChange={(e) => onChange({ ...section, payload: { ...payload, image: e.target.value } })}
                placeholder="/banner-backgrounds/page-the-firm.png"
                className="rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="grid gap-2 text-sm text-stone-700 md:col-span-3">
              Image Alt Text
              <input
                value={String(payload.imageAlt ?? "")}
                onChange={(e) => onChange({ ...section, payload: { ...payload, imageAlt: e.target.value } })}
                placeholder="Describe the image for accessibility"
                className="rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
          </div>
        </div>
      ) : null}

      {section.section_type !== "hero" && section.section_type !== "rich_text" ? (
        <label className="mt-4 grid gap-2 text-sm text-stone-700">
          Payload JSON
          <textarea
            value={jsonValue}
            onChange={(e) => {
              setJsonDraft(e.target.value);
              const parsed = safeJsonParse(e.target.value);
              if (parsed.value) {
                setJsonError("");
                onChange({ ...section, payload: parsed.value });
              } else {
                setJsonError(parsed.error);
              }
            }}
            className="min-h-40 rounded-lg border border-stone-300 px-3 py-2 font-mono text-xs"
          />
          {jsonError ? <span className="text-xs text-red-600">{jsonError}</span> : null}
        </label>
      ) : null}
    </article>
  );
}

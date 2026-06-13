"use client";

import { FormEvent, useRef, useState } from "react";
import { CheckCircle2, Send, UploadCloud } from "lucide-react";

type CareerApplicationFormProps = {
  careerId: string;
  careerTitle: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function CareerApplicationForm({ careerId, careerTitle }: CareerApplicationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    formData.set("career_id", careerId);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const json = (await res.json()) as { message?: string; error?: string };

      if (!res.ok) {
        setState("error");
        setMessage(json.error ?? "Application could not be submitted. Please try again.");
        return;
      }

      setState("success");
      setMessage(json.message ?? "Application submitted successfully.");
      formRef.current?.reset();
    } catch {
      setState("error");
      setMessage("Application could not be submitted. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6 text-green-900 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
            <CheckCircle2 className="h-6 w-6" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-700">Application Submitted</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-green-950">
              Thank you for applying.
            </h3>
            <p className="mt-3 text-sm leading-6 text-green-800">{message || `Application submitted for ${careerTitle}.`}</p>
            <p className="mt-2 text-sm leading-6 text-green-800">
              Our team will review your application and contact you if shortlisted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-8 grid gap-5">
      <input type="hidden" name="career_id" value={careerId} />

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">1. Personal Information</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="admin-field">
          <span className="admin-label">Full Name<span className="text-red-600">*</span></span>
          <input name="name" required minLength={2} className="admin-input" placeholder="Your name" />
        </label>
        <label className="admin-field">
          <span className="admin-label">Date of Birth<span className="text-red-600">*</span></span>
          <input name="date_of_birth" type="date" required className="admin-input" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="admin-field">
          <span className="admin-label">Mobile Number<span className="text-red-600">*</span></span>
          <input name="phone" required minLength={7} className="admin-input" placeholder="+91 ..." />
        </label>
        <label className="admin-field">
          <span className="admin-label">Email Address<span className="text-red-600">*</span></span>
          <input name="email" type="email" required className="admin-input" placeholder="you@example.com" />
        </label>
      </div>

      <fieldset className="admin-field">
        <legend className="admin-label">Gender<span className="text-red-600">*</span></legend>
        <div className="flex flex-wrap gap-4 rounded-2xl border border-[var(--glass-border)] bg-surface-raised px-4 py-3">
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <input name="gender" type="radio" value={gender.toLowerCase()} required className="h-4 w-4 accent-stone-900" />
              {gender}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">4. Position Applied For</p>
        <div className="mt-3 rounded-2xl border border-[var(--glass-border)] bg-surface-raised px-4 py-3 text-sm font-semibold text-ink">
          {careerTitle}
        </div>
      </div>

      <div className="pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">7. Documents to Upload</p>
      </div>

      <label className="admin-field">
        <span className="admin-label">Resume / CV<span className="text-red-600">*</span></span>
        <div className="rounded-2xl border border-dashed border-[var(--glass-border)] bg-surface-raised p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-surface">
              <UploadCloud className="h-5 w-5 text-accent" strokeWidth={1.7} />
            </div>
            <div className="min-w-0 flex-1">
              <input
                name="resume"
                type="file"
                required
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-stone-900 file:px-4 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white"
              />
              <p className="mt-2 text-xs leading-5 text-muted">PDF, DOC, or DOCX. Maximum file size: 5 MB.</p>
            </div>
          </div>
        </div>
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-[var(--glass-border)] bg-surface-raised px-4 py-3 text-sm leading-6 text-ink">
        <input name="declaration" type="checkbox" value="true" required className="mt-1 h-4 w-4 shrink-0 accent-stone-900" />
        <span>I hereby declare that the information furnished above is true and correct to the best of my knowledge.</span>
      </label>

      {message ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {message}
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="mr-2 h-4 w-4" strokeWidth={1.8} />
          {state === "submitting" ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}

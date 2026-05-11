export default function AdminHome() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-stone-900">Admin Temporarily Limited</h2>
      <p className="mt-2 text-sm text-stone-600">
        Content modules are currently disabled. Public pages are running in static mode.
      </p>
      <p className="mt-1 text-sm text-stone-600">
        Login, role validation, and logout remain active.
      </p>
    </section>
  );
}

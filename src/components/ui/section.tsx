export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-ink-900">{title}</h2>
        {description && <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white px-4 py-3.5">
      <p className="text-xs text-ink-500">{label}</p>
      <p className="mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-ink-900">{value}</p>
      {hint && <p className="text-[11px] text-ink-400">{hint}</p>}
    </div>
  );
}
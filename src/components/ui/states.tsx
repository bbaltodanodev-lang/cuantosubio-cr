export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink-100 ${className}`} aria-hidden="true" />;
}

export function LoadingState({ label = "Cargando datos de Costa Rica…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-4">
      <p className="text-sm text-ink-500">{label}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-ink-200 bg-white p-4">
            <Skeleton className="aspect-[4/3] w-full" />
            <Skeleton className="mt-3 h-4 w-2/3" />
            <Skeleton className="mt-2 h-6 w-1/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No encontramos productos confirmados en Costa Rica",
  message = "Aún no contamos con una fuente que confirme la venta o el precio de este producto dentro de Costa Rica.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-ink-300 bg-white px-6 py-14 text-center">
      <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <h3 className="max-w-md text-base font-semibold text-ink-800">{title}</h3>
      <p className="max-w-md text-sm text-ink-500">{message}</p>
    </div>
  );
}

export function ErrorState({
  title = "No pudimos actualizar los datos en este momento",
  message = "El último dato disponible podría estar desactualizado. Intentá de nuevo en unos minutos.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-rise-700/20 bg-rise-50 px-6 py-12 text-center">
      <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-rise-700">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </span>
      <h3 className="max-w-md text-base font-semibold text-ink-800">{title}</h3>
      <p className="max-w-md text-sm text-ink-500">{message}</p>
    </div>
  );
}

export function PinState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-ink-200 bg-white px-6 py-10 text-center">
      <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </span>
      <h3 className="text-sm font-semibold text-ink-800">{title}</h3>
      <p className="max-w-md text-sm text-ink-500">{message}</p>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (p: number) => string;
}) {
  if (totalPages <= 1) return null;
  const pages: (number | "…")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  return (
    <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-1">
      {page > 1 ? (
        <PageLink href={buildHref(page - 1)} label="Anterior" isActive={false}>
          ←
        </PageLink>
      ) : null}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="px-2 text-ink-400" aria-hidden="true">
            …
          </span>
        ) : (
          <PageLink key={p} href={buildHref(p)} label={`Página ${p}`} isActive={p === page}>
            {p}
          </PageLink>
        )
      )}
      {page < totalPages ? (
        <PageLink href={buildHref(page + 1)} label="Siguiente" isActive={false}>
          →
        </PageLink>
      ) : null}
    </nav>
  );
}

function PageLink({ href, children, label, isActive }: { href: string; children: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm transition-colors ${
        isActive
          ? "border-brand-600 bg-brand-600 font-semibold text-white"
          : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:text-brand-600"
      }`}
    >
      {children}
    </a>
  );
}
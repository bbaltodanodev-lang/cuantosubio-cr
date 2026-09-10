interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

export function CostaRicaBadge({ className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 ${className}`}
      title="Precio y disponibilidad confirmados en Costa Rica"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="1.5" fill="#fff" />
        <rect x="2" y="5" width="20" height="14" rx="1.5" stroke="#cbd5e0" strokeWidth="0.75" />
        <rect x="2" y="13.5" width="20" height="4" fill="#ce1126" />
        <rect x="2" y="5" width="20" height="3" fill="#002b7f" />
      </svg>
      Costa Rica
    </span>
  );
}

export function CountryBadge({ className = "" }: BadgeProps) {
  return <CostaRicaBadge className={className} />;
}

export function SourceBadge({ label, className = "" }: BadgeProps & { label?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-600 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15h6" />
        <path d="M12 12v6" />
      </svg>
      {label ?? "Fuente"}
    </span>
  );
}

export function UpdatedAt({ date, className = "", relative = true }: { date: Date | string | null | undefined; className?: string; relative?: boolean }) {
  if (!date) return <span className={`text-xs text-ink-400 ${className}`}>Sin fecha de actualización</span>;
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  let text: string;
  if (relative && mins < 1) text = "ahora mismo";
  else if (relative && mins < 60) text = `hace ${mins} min`;
  else if (relative && hours < 24) text = `hace ${hours} h`;
  else if (relative && days < 30) text = `hace ${days} d`;
  else {
    try {
      text = d.toLocaleDateString("es-CR", { timeZone: "America/Costa_Rica", day: "numeric", month: "long" });
    } catch {
      text = d.toLocaleDateString("es-CR");
    }
  }
  return (
    <time dateTime={d.toISOString()} className={`text-xs text-ink-400 ${className}`} title={d.toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })}>
      {text}
    </time>
  );
}

export function AvailabilityBadge({ status, className = "" }: { status?: string | null; className?: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    AVAILABLE: { label: "Disponible en Costa Rica", cls: "bg-brand-50 text-brand-700 border-brand-200" },
    OUT_OF_STOCK: { label: "Agotado en Costa Rica", cls: "bg-ink-100 text-ink-600 border-ink-200" },
    NOT_FOUND: { label: "No encontrado en Costa Rica", cls: "bg-ink-100 text-ink-500 border-ink-200" },
    UNKNOWN: { label: "Disponibilidad desconocida", cls: "bg-ink-50 text-ink-500 border-ink-200" },
    STORE_ONLY: { label: "Solo en sucursal", cls: "bg-acc-600/10 text-acc-700 border-acc-600/20" },
    ONLINE_ONLY: { label: "Solo en compra en línea", cls: "bg-acc-600/10 text-acc-700 border-acc-600/20" },
  };
  const m = map[status ?? "UNKNOWN"] ?? map.UNKNOWN;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${m.cls} ${className}`}>
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  );
}

export function PromotionBadge({ status, className = "" }: { status?: string | null; className?: string }) {
  const map: Record<string, { label: string }> = {
    NORMAL: { label: "Precio normal en Costa Rica" },
    PROMOTIONAL: { label: "Precio promocional en Costa Rica" },
    MEMBERSHIP: { label: "Precio por membresía" },
    VOLUME: { label: "Precio por volumen" },
    STORE_ONLY: { label: "Precio exclusivo de sucursal" },
  };
  const m = map[status ?? "NORMAL"] ?? map.NORMAL;
  if ((status ?? "NORMAL") === "NORMAL") return null;
  return (
    <span className={`inline-flex items-center rounded-full bg-rise-50 px-2 py-0.5 text-[11px] font-medium text-rise-700 ${className}`}>
      {m.label}
    </span>
  );
}
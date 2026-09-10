import { formatCRC, formatPercent } from "@/lib/format";

export function PriceChange({
  change,
  percent,
  direction,
  className = "",
  size = "sm",
}: {
  change: number | null | undefined;
  percent: number | null | undefined;
  direction: "UP" | "DOWN" | "FLAT" | null | undefined;
  className?: string;
  size?: "sm" | "md";
}) {
  if (change === null || change === undefined || direction === null || direction === undefined) {
    return (
      <span className={`text-xs text-ink-400 ${className}`}>
        Sin historial suficiente en Costa Rica
      </span>
    );
  }

  const isUp = direction === "UP";
  const isDown = direction === "DOWN";
  const arrow = isUp ? "↑" : isDown ? "↓" : "→";
  const absCol = isUp ? "text-rise-600" : isDown ? "text-brand-600" : "text-ink-500";
  const arrowCol = isUp ? "text-rise-600" : isDown ? "text-brand-600" : "text-ink-500";
  const sizeCls = size === "md" ? "text-base" : "text-sm";

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-1 ${sizeCls} ${absCol} ${className}`} aria-label={isUp ? "Subió en Costa Rica" : isDown ? "Bajó en Costa Rica" : "Sin cambio en Costa Rica"}>
      <span aria-hidden="true" className={`font-semibold ${arrowCol}`}>{arrow}</span>
      <span className="font-semibold tabular-nums">
        {isUp ? "+" : isDown ? "" : ""}
        {formatCRC(change)}
      </span>
      <span className="text-xs text-ink-400 tabular-nums" aria-hidden="true">·</span>
      <span className="text-xs tabular-nums">{formatPercent(percent)}</span>
      <span aria-hidden="true" className="text-xs text-ink-400">en Costa Rica</span>
    </span>
  );
}

export function ProductPrice({
  amount,
  size = "md",
  className = "",
  currency = "CRC",
  withUnit = false,
}: {
  amount: number | null | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
  currency?: string;
  withUnit?: boolean;
}) {
  const sizeCls =
    size === "lg" ? "text-4xl md:text-5xl" : size === "md" ? "text-2xl" : "text-xl";
  if (amount === null || amount === undefined) {
    return (
      <span className={`text-ink-400 ${sizeCls} ${className}`}>Precio no confirmado en Costa Rica</span>
    );
  }
  return (
    <span className={`inline-flex items-baseline gap-1 font-semibold tabular-nums tracking-tight ${sizeCls} ${className}`}>
      <span aria-hidden="true" className="text-[0.6em] text-ink-500">₡</span>
      <span className="text-ink-900">
        {Number(amount).toLocaleString("es-CR", { minimumFractionDigits: Number.isInteger(Number(amount)) ? 0 : 2, maximumFractionDigits: 2 })}
      </span>
      {withUnit && <span aria-hidden="true" className="text-xs font-normal text-ink-400">{currency}</span>}
    </span>
  );
}
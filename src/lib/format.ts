export const CRC_SYMBOL = "₡";
export const COUNTRY_CODE = "CR";
export const CURRENCY = "CRC";
export const TIMEZONE = "America/Costa_Rica";

export function formatCRC(amount: number | string | null | undefined, opts?: { decimals?: number; compact?: boolean }): string {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return "—";
  }
  const n = Number(amount);
  const decimals = opts?.decimals ?? (Number.isInteger(n) ? 0 : 2);
  if (opts?.compact && Math.abs(n) >= 1000) {
    const value = n / 1000;
    const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    return `${CRC_SYMBOL}${formatted.replace(".", ",")} mil`;
  }
  const formatted = n.toLocaleString("es-CR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${CRC_SYMBOL}${formatted}`;
}

export function formatPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const n = Number(value);
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toLocaleString("es-CR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}

export function formatDateCR(
  date: Date | string | null | undefined,
  opts?: { withTime?: boolean; relative?: boolean }
): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";

  if (opts?.relative) {
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "ahora mismo";
    if (mins < 60) return `hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `hace ${hours} h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `hace ${days} d`;
    const months = Math.floor(days / 30);
    if (months < 12) return `hace ${months} mes${months > 1 ? "es" : ""}`;
    const years = Math.floor(days / 365);
    return `hace ${years} año${years > 1 ? "s" : ""}`;
  }

  try {
    if (opts?.withTime) {
      return d.toLocaleString("es-CR", {
        timeZone: TIMEZONE,
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    return d.toLocaleDateString("es-CR", {
      timeZone: TIMEZONE,
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d.toLocaleDateString("es-CR");
  }
}

export function formatDateTimeISO(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-+/g, "-");
}

export function displayUnit(quantity: number | null | undefined, unit: string | null | undefined): string {
  if (!unit) return "";
  if (quantity === null || quantity === undefined) return unit;
  const q = Number.isInteger(quantity) ? quantity.toString() : quantity.toLocaleString("es-CR");
  return `${q} ${unit}`;
}

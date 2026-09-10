export const CRC_SYMBOL = "₡";

export function formatCRC(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return "—";
  const n = Number(amount);
  const decimals = Number.isInteger(n) ? 0 : 2;
  const formatted = n.toLocaleString("es-CR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${CRC_SYMBOL}${formatted}`;
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

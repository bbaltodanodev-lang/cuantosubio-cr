import { ProductSummary } from "@/lib/types";

export function ProductPriceByStore({
  amount,
}: {
  amount: number | null | undefined;
}) {
  return (
    <span className="text-3xl font-bold tabular-nums tracking-tight text-ink-900">
      <span className="align-top text-lg text-ink-500">₡</span>
      {amount !== null && amount !== undefined
        ? Number(amount).toLocaleString("es-CR", { maximumFractionDigits: 0 })
        : "—"}
    </span>
  );
}

export function ProductListLabel({ product }: { product: ProductSummary }) {
  return (
    <p className="mt-2 text-xs text-ink-400">
      {product.presentation} · Precio observado en supermercados de Costa Rica en colones (CRC).
    </p>
  );
}

export function ListPageShell({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-ink-300 bg-white p-6 text-sm text-ink-500">
        No encontramos una fuente costarricense que confirme precios para esta consulta.
      </div>
    );
  }
  return (
    <p className="mt-4 text-sm text-ink-500">
      <span className="font-semibold text-ink-800">{products.length}</span> producto{products.length !== 1 ? "s" : ""} con
      precio confirmado en Costa Rica.
    </p>
  );
}
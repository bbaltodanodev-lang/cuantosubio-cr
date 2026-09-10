import { Link } from "react-router-dom";
import { ProductImage } from "@/components/product/product-image";
import { UpdatedAt } from "@/components/ui/badges";
import { formatCRC } from "@/lib/format";

export type ProductCardData = {
  name: string;
  slug: string;
  brand?: string | null;
  category?: string | null;
  presentation: string;
  imageUrl?: string | null;
  price: number | null | undefined;
  amountPerUnit?: number | null;
  unitLabel?: string | null;
  change?: number | null;
  percent?: number | null;
  direction?: "UP" | "DOWN" | "FLAT" | null;
  store: string | null;
  storeLogo?: string | null;
  panelDate: string | Date | null;
  isCanastaBasica?: boolean;
  quantity?: number;
  unit?: string;
};

function formatUnitCalculation(price?: number | null, qty?: number, unit?: string): string | null {
  if (!price || !qty || !unit) return null;
  const u = unit.toLowerCase().trim();
  if (u === "kg") {
    const p = Math.round(price / qty);
    return `${formatCRC(p)} / kg`;
  }
  if (u === "g") {
    const kg = qty / 1000;
    const p = Math.round(price / kg);
    return `${formatCRC(p)} / kg`;
  }
  if (u === "l") {
    const p = Math.round(price / qty);
    return `${formatCRC(p)} / L`;
  }
  if (u === "ml") {
    const l = qty / 1000;
    const p = Math.round(price / l);
    return `${formatCRC(p)} / L`;
  }
  if (u === "und" || u === "unidades") {
    const p = Math.round((price / qty) * 10) / 10;
    return `${formatCRC(p)} / und`;
  }
  if (u === "rol" || u === "rollos") {
    const p = Math.round((price / qty) * 10) / 10;
    return `${formatCRC(p)} / rollo`;
  }
  return null;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const unitPrice =
    product.amountPerUnit && product.unitLabel
      ? `${formatCRC(product.amountPerUnit)} / ${product.unitLabel}`
      : formatUnitCalculation(product.price, product.quantity, product.unit);

  const isUp = product.direction === "UP" || (product.change !== null && product.change !== undefined && product.change > 0);
  const isDown = product.direction === "DOWN" || (product.change !== null && product.change !== undefined && product.change < 0);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5">
      {/* Visual Product Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50/80 p-3">
        <Link to={`/producto/${product.slug}`} className="block h-full w-full" tabIndex={-1}>
          <ProductImage
            slug={product.slug}
            src={product.imageUrl}
            category={product.category ?? undefined}
            alt={`${product.name} - ${product.presentation}`}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Badges de estado discretos */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isCanastaBasica && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              Canasta básica
            </span>
          )}
          {product.price && (
            <span className="inline-flex items-center rounded-md bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-white shadow-xs">
              Mejor precio
            </span>
          )}
        </div>

        {/* Variación de precio */}
        {product.percent !== null && product.percent !== undefined && product.percent !== 0 && (
          <div className="absolute right-3 top-3 pointer-events-none">
            {isDown ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-700 shadow-xs">
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {Math.abs(product.percent).toFixed(1)}%
              </span>
            ) : isUp ? (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[11px] font-bold text-rose-700 shadow-xs">
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                +{Math.abs(product.percent).toFixed(1)}%
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Body Information */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Marca */}
          {product.brand && (
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {product.brand}
            </p>
          )}

          {/* Nombre */}
          <h3 className="mt-0.5 line-clamp-2 text-base font-bold text-slate-900 leading-snug">
            <Link
              to={`/producto/${product.slug}`}
              className="transition-colors hover:text-emerald-600 focus:outline-hidden"
            >
              {product.name}
            </Link>
          </h3>

          {/* Presentación */}
          <p className="mt-1 text-xs font-medium text-slate-500">
            {product.presentation}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-2xl font-extrabold tabular-nums tracking-tight text-slate-950">
                {product.price !== null && product.price !== undefined ? (
                  formatCRC(product.price)
                ) : (
                  <span className="text-sm font-normal text-slate-400">Sin precio registrado</span>
                )}
              </span>
              {unitPrice && (
                <p className="text-[11px] font-medium text-slate-500 tabular-nums">
                  {unitPrice}
                </p>
              )}
            </div>

            {/* Cambio en colones */}
            {product.change !== null && product.change !== undefined && product.change !== 0 && (
              <span
                className={`text-xs font-semibold tabular-nums ${
                  isDown ? "text-emerald-700" : isUp ? "text-rose-600" : "text-slate-500"
                }`}
                title="Variación respecto a la consulta anterior"
              >
                {isDown ? `↓ ${formatCRC(Math.abs(product.change))}` : `↑ +${formatCRC(product.change)}`}
              </span>
            )}
          </div>
        </div>

        {/* Supermercado y Fecha */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100/80 pt-2.5">
          <div className="flex items-center gap-2 min-w-0">
            {product.storeLogo ? (
              <img
                src={product.storeLogo}
                alt={product.store ?? "Supermercado"}
                className="h-4 max-w-[75px] object-contain shrink-0"
                loading="lazy"
              />
            ) : (
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            )}
            <span className="truncate text-xs font-semibold text-slate-700">
              {product.store ?? "Supermercado"}
            </span>
          </div>
          <UpdatedAt date={product.panelDate} className="text-[11px] text-slate-400 shrink-0" />
        </div>
      </div>
    </article>
  );
}

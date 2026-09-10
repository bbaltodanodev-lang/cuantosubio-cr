import { useState } from "react";
import { formatCRC, formatDateCR } from "@/lib/format";
import { getTaxScenario, splitTaxIncludedPrice, TAX_SCENARIOS, type TaxScenarioId } from "@/lib/tax";
import { getStoreLogo } from "@/pages/util";

export type ComparisonRow = {
  store: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    website?: string | null;
  } | string;
  location: { name: string; province: string | null; canton: string | null } | null;
  amount: number;
  amountPerUnit?: number | null;
  unitLabel?: string | null;
  isLowest: boolean;
  isHighest: boolean;
  capturedAt: string | Date;
  availability: string;
  promotionStatus: string;
};

export function StoreComparison({ comparisons }: { comparisons: ComparisonRow[] }) {
  const [scenarioId, setScenarioId] = useState<TaxScenarioId>("general");
  const scenario = getTaxScenario(scenarioId);

  if (comparisons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-slate-50/50">
        <p className="text-sm font-medium text-slate-500">
          No hay precios registrados en otros comercios para esta presentación específica.
        </p>
      </div>
    );
  }

  // Ordenar siempre de menor a mayor precio
  const sorted = [...comparisons].sort((a, b) => a.amount - b.amount);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3.5 sm:flex sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Supermercado y sucursal
          </span>
          <p className="mt-1 text-[11px] text-slate-500">El total publicado incluye los impuestos que muestre cada comercio.</p>
        </div>
        <label className="mt-3 flex items-center gap-2 sm:mt-0">
          <span className="text-[11px] font-semibold text-slate-500">Comparar sin IVA:</span>
          <select
            value={scenarioId}
            onChange={(event) => setScenarioId(event.target.value as TaxScenarioId)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-bold text-slate-700 outline-none focus:border-brand-400"
          >
            {TAX_SCENARIOS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.shortLabel} · {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="divide-y divide-slate-100">
        {sorted.map((c, i) => {
          const storeName = typeof c.store === "string" ? c.store : c.store.name;
          const storeLogo =
            (typeof c.store !== "string" ? c.store.logoUrl : null) ?? getStoreLogo(storeName);
          const isLowest = i === 0;

          return (
            <li
              key={`${storeName}-${i}`}
              className={`flex flex-col gap-3 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                isLowest ? "bg-emerald-50/40" : "hover:bg-slate-50/50"
              }`}
            >
              {/* Info Store */}
              <div className="min-w-0 flex items-start gap-3.5">
                {/* Store logo */}
                <div className="h-10 w-20 shrink-0 rounded-lg border border-slate-200/80 bg-white p-1 flex items-center justify-center shadow-2xs">
                  {storeLogo ? (
                    <img
                      src={storeLogo}
                      alt={storeName}
                      className="max-h-7 max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-700">{storeName.slice(0, 3)}</span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{storeName}</span>
                    {isLowest && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-2xs">
                        Mejor opción
                      </span>
                    )}
                    {c.promotionStatus && c.promotionStatus !== "NORMAL" && (
                      <span className="inline-flex rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                        {c.promotionStatus === "MEMBERSHIP" ? "Membresía" : "Promoción"}
                      </span>
                    )}
                  </div>

                  {/* Sucursal / Ubicación */}
                  <p className="mt-0.5 text-xs text-slate-500">
                    {c.location
                      ? `${c.location.name}${c.location.canton ? ` · ${c.location.canton}` : ""}${c.location.province ? `, ${c.location.province}` : ""}`
                      : "Precio nacional"}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        c.availability === "OUT_OF_STOCK" ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                    />
                    <span>{c.availability === "OUT_OF_STOCK" ? "Agotado" : "Disponible"}</span>
                    <span>·</span>
                    <span>Actualizado {formatDateCR(c.capturedAt, { relative: true })}</span>
                  </div>
                </div>
              </div>

              {/* Price Block */}
              <div className="shrink-0 text-left sm:text-right border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">
                <span className="text-xl font-extrabold tabular-nums tracking-tight text-slate-950">
                  {formatCRC(c.amount)}
                </span>
                {(() => {
                  const split = splitTaxIncludedPrice(c.amount, scenarioId);
                  return (
                    <p className="text-[11px] font-semibold tabular-nums text-sky-700">
                      Sin IVA estimado {formatCRC(split.net)} · {formatCRC(split.tax)} de {scenario.shortLabel}
                    </p>
                  );
                })()}
                {c.amountPerUnit && c.unitLabel && (
                  <p className="text-[11px] font-semibold tabular-nums text-slate-500">
                    {formatCRC(c.amountPerUnit)} / {c.unitLabel}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

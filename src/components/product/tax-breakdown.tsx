import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCRC } from "@/lib/format";
import { getTaxScenario, splitTaxIncludedPrice, TAX_SCENARIOS, type TaxScenarioId } from "@/lib/tax";

type TaxBreakdownProps = {
  amount: number;
  title?: string;
  compact?: boolean;
  defaultScenario?: TaxScenarioId;
};

export function TaxBreakdown({
  amount,
  title = "Comparar con y sin IVA",
  compact = false,
  defaultScenario = "general",
}: TaxBreakdownProps) {
  const [scenarioId, setScenarioId] = useState<TaxScenarioId>(defaultScenario);
  const selected = getTaxScenario(scenarioId);
  const split = splitTaxIncludedPrice(amount, scenarioId);

  return (
    <section className={`rounded-2xl border border-sky-100 bg-sky-50/60 ${compact ? "p-3" : "p-5"}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-extrabold text-slate-900">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            El precio publicado se toma como total. Seleccioná un escenario para estimar cuánto representa el impuesto.
          </p>
        </div>
        <label className="shrink-0">
          <span className="sr-only">Escenario de impuesto</span>
          <select
            value={scenarioId}
            onChange={(event) => setScenarioId(event.target.value as TaxScenarioId)}
            className="rounded-lg border border-sky-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-700 shadow-sm outline-none focus:border-sky-400"
          >
            {TAX_SCENARIOS.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.label} · {scenario.shortLabel}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={`mt-4 grid gap-2 ${compact ? "sm:grid-cols-3" : "sm:grid-cols-3"}`}>
        <div className="rounded-xl border border-white/80 bg-white/80 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Publicado</p>
          <p className="mt-1 text-lg font-black tabular-nums text-slate-950">{formatCRC(split.gross)}</p>
          <p className="text-[11px] text-slate-500">con impuesto incluido</p>
        </div>
        <div className="rounded-xl border border-white/80 bg-white/80 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Sin IVA estimado</p>
          <p className="mt-1 text-lg font-black tabular-nums text-slate-950">{formatCRC(split.net)}</p>
          <p className="text-[11px] text-slate-500">base matemática</p>
        </div>
        <div className="rounded-xl border border-white/80 bg-white/80 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Impuesto estimado</p>
          <p className="mt-1 text-lg font-black tabular-nums text-sky-700">{formatCRC(split.tax)}</p>
          <p className="text-[11px] text-slate-500">{selected.shortLabel} · {selected.label}</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        Es una estimación a partir del total publicado; la tasa legal real depende del producto, su presentación y la lista tributaria vigente. <Link to="/canasta-basica#fuentes-oficiales" className="font-bold text-sky-700 hover:underline">Ver fuentes oficiales en la página de canasta básica.</Link>
      </p>
    </section>
  );
}

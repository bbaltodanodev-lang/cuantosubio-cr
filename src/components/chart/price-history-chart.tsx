import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { HistoryPoint } from "@/lib/types";
import { formatCRC } from "@/lib/format";

const RANGES = [
  { key: "7d", label: "7 días", days: 7 },
  { key: "30d", label: "30 días", days: 30 },
  { key: "3m", label: "3 meses", days: 90 },
  { key: "6m", label: "6 meses", days: 180 },
  { key: "1y", label: "1 año", days: 365 },
  { key: "all", label: "Todo", days: Infinity },
];

function fmtAxisDate(d: Date): string {
  try {
    return d.toLocaleDateString("es-CR", { timeZone: "America/Costa_Rica", day: "numeric", month: "short" });
  } catch {
    return d.toLocaleDateString("es-CR");
  }
}

export function PriceHistoryChart({ points }: { points: HistoryPoint[] }) {
  const [range, setRange] = useState("all");
  const [now] = useState(() => Date.now());

  const sortedPoints = useMemo(() => {
    return [...points].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [points]);

  const r = RANGES.find((x) => x.key === range) ?? RANGES[5];
  const filtered = sortedPoints.filter((p) => now - p.date.getTime() <= r.days * 86400000);

  // Key metrics calculation
  const metrics = useMemo(() => {
    if (sortedPoints.length === 0) return null;
    const current = sortedPoints[sortedPoints.length - 1].amount;
    const allAmounts = sortedPoints.map((p) => p.amount);
    const minRecorded = Math.min(...allAmounts);
    const maxRecorded = Math.max(...allAmounts);

    // Finding price ~30 days ago
    const thirtyDaysAgoTime = now - 30 * 86400000;
    const point30d = sortedPoints.slice().reverse().find((p) => p.date.getTime() <= thirtyDaysAgoTime) ?? sortedPoints[0];
    const prev30dAmount = point30d.amount;
    const diff30d = current - prev30dAmount;
    const pct30d = prev30dAmount > 0 ? (diff30d / prev30dAmount) * 100 : 0;

    return {
      current,
      prev30dAmount,
      diff30d,
      pct30d,
      minRecorded,
      maxRecorded,
    };
  }, [sortedPoints, now]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-slate-50/50">
        <p className="text-sm font-medium text-slate-500">
          Sin historial suficiente registrado para el período seleccionado.
        </p>
      </div>
    );
  }

  const data = filtered.map((p) => ({
    name: fmtAxisDate(p.date),
    fecha: p.date,
    precio: p.amount,
    tienda: p.store,
    label: formatCRC(p.amount),
  }));

  const minVal = Math.min(...data.map((d) => d.precio));
  const maxVal = Math.max(...data.map((d) => d.precio));
  const domainPadding = Math.max(50, Math.round((maxVal - minVal) * 0.15));
  const domainMin = Math.max(0, minVal - domainPadding);
  const domainMax = maxVal + domainPadding;

  return (
    <div className="space-y-4">
      {/* Metric summary bar */}
      {metrics && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Precio actual</p>
            <p className="text-lg font-black text-slate-900 tabular-nums">{formatCRC(metrics.current)}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Hace 30 días</p>
            <p className="text-lg font-black text-slate-900 tabular-nums">{formatCRC(metrics.prev30dAmount)}</p>
            <p className={`text-xs font-semibold tabular-nums ${metrics.diff30d > 0 ? "text-rose-600" : metrics.diff30d < 0 ? "text-emerald-700" : "text-slate-500"}`}>
              {metrics.diff30d > 0 ? `↑ +${formatCRC(metrics.diff30d)} (+${metrics.pct30d.toFixed(1)}%)` : metrics.diff30d < 0 ? `↓ ${formatCRC(Math.abs(metrics.diff30d))} (${metrics.pct30d.toFixed(1)}%)` : "Sin cambio"}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Mínimo registrado</p>
            <p className="text-lg font-black text-emerald-700 tabular-nums">{formatCRC(metrics.minRecorded)}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Máximo registrado</p>
            <p className="text-lg font-black text-slate-900 tabular-nums">{formatCRC(metrics.maxRecorded)}</p>
          </div>
        </div>
      )}

      {/* Range filter buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Período:</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Rango de evolución del precio">
          {RANGES.map((x) => (
            <button
              key={x.key}
              type="button"
              onClick={() => setRange(x.key)}
              aria-pressed={range === x.key}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition-colors ${
                range === x.key
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full md:h-72 rounded-2xl border border-slate-200 bg-white p-3 pt-5" role="img" aria-label="Gráfico de evolución del precio">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tick={{ fontSize: 11, fill: "#64748b" }}
              minTickGap={20}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickFormatter={(v: number) => `₡${v.toLocaleString("es-CR")}`}
              domain={[domainMin, domainMax]}
              width={64}
            />
            <Tooltip
              formatter={(value) => [`${formatCRC(Number(value))}`, "Precio"]}
              labelFormatter={(label) => `Fecha: ${label}`}
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                border: "none",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "600",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Area
              type="monotone"
              dataKey="precio"
              stroke="#059669"
              strokeWidth={2.5}
              fill="url(#priceGradient)"
              activeDot={{ r: 5, fill: "#059669", stroke: "#ffffff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
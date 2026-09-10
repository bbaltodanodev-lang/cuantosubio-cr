import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatCard } from "@/components/ui/section";
import { api, type StoreSummary } from "@/lib/api";
import { formatDateCR } from "@/lib/format";
import { useSeo } from "@/lib/seo";

export function AdminPage() {
  useSeo("/admin", { title: "Panel de administración", robots: "noindex, nofollow", description: "Panel interno de administración de precios en Costa Rica." });
  const [stats, setStats] = useState<{ products: number; prices: number; stores: number; changes: number; lastSync: string | null } | null>(null);
  const [sources, setSources] = useState<StoreSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([api.products({}), api.prices({ limit: 500 }), api.stores(false)])
      .then(([prod, price, store]) => {
        if (!active) return;
        setStats({
          products: prod.total,
          prices: price.prices.filter((p) => p.price !== null).length,
          stores: store.stores.length,
          changes: price.prices.filter((p) => p.direction !== null && p.direction !== "FLAT").length,
          lastSync: new Date().toISOString(),
        });
        setSources(store.stores);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Administración" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Administración</h1>
        <p className="mt-1.5 text-sm text-ink-500">
          Panel de monitoreo exclusivo de datos de Costa Rica (country_code = CR, moneda CRC).
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Resumen</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Productos en Costa Rica" value={String(stats?.products ?? 0)} />
          <StatCard label="Precios registrados (CRC)" value={String(stats?.prices ?? 0)} />
          <StatCard label="Comercios" value={String(stats?.stores ?? 0)} />
          <StatCard label="Cambios detectados en CR" value={String(stats?.changes ?? 0)} />
          <div className="rounded-xl border border-ink-200 bg-white px-4 py-3.5">
            <p className="text-xs text-ink-500">Última sincronización</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-ink-900">
              {stats?.lastSync ? formatDateCR(stats.lastSync, { withTime: true }) : "Sin sincronización registrada"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink-900">Monitor de fuentes</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Fuente</th>
                <th className="px-4 py-3 font-semibold">País</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Moneda</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {!loading &&
                sources.map((s) => (
                  <tr key={s.slug}>
                    <td className="px-4 py-3 font-medium text-ink-800">{s.name}</td>
                    <td className="px-4 py-3 text-ink-600">Costa Rica</td>
                    <td className="px-4 py-3 text-ink-600">{s.isSupermarket ? "Supermercado" : "Comercio local"}</td>
                    <td className="px-4 py-3 tabular-nums text-ink-600">CRC</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Activa
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-ink-900">Validación territorial</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
            Todo precio debe tener <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">country_code = CR</code> y{" "}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">currency = CRC</code>. Los registros sin país asociado o de otros mercados se rechazan antes de indexarse o mostrarse.
          </p>
        </div>
        <div className="rounded-xl border border-ink-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-ink-900">Historial inmutable</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
            El historial costarricense nunca se sobrescribe: cada captura crea un registro histórico con fecha, hora, comercio, sucursal y fuente. La conversión o importación de precios de otros países está prohibida.
          </p>
        </div>
      </section>

      <p className="mt-8 text-sm text-ink-500">
        API pública: <a href="/api/health" className="font-medium text-brand-600 hover:underline">/api/health</a> ·{" "}
        <a href="/api/v1/products" className="font-medium text-brand-600 hover:underline">/api/v1/products</a> ·{" "}
        <a href="/api/v1/prices" className="font-medium text-brand-600 hover:underline">/api/v1/prices</a>
      </p>
    </div>
  );
}
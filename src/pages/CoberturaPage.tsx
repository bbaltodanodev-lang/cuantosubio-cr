import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { api, type ProvinceSummary, type StoreSummary } from "@/lib/api";

export function CoberturaPage() {
  const [provinces, setProvinces] = useState<ProvinceSummary[]>([]);
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [productTotal, setProductTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([api.provinces(), api.stores(true), api.products({})])
      .then(([p, s, pr]) => {
        if (!active) return;
        setProvinces(p.provinces);
        setStores(s.stores);
        setProductTotal(pr.total);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const cantones = provinces.reduce((a, p) => a + p.cantons.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Cobertura territorial" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Cobertura territorial</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
          Esta plataforma opera exclusivamente con datos de Costa Rica. Todos los precios se expresan en colones (CRC) y corresponden a productos, comercios y ubicaciones dentro del país.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-ink-200 bg-white p-4">
          <p className="text-xs text-ink-500">Provincias cubiertas</p>
          <p className="text-2xl font-bold tabular-nums text-ink-900">{loading ? "…" : provinces.length}</p>
        </div>
        <div className="rounded-xl border border-ink-200 bg-white p-4">
          <p className="text-xs text-ink-500">Cantones</p>
          <p className="text-2xl font-bold tabular-nums text-ink-900">{loading ? "…" : cantones}</p>
        </div>
        <div className="rounded-xl border border-ink-200 bg-white p-4">
          <p className="text-xs text-ink-500">Comercios monitoreados</p>
          <p className="text-2xl font-bold tabular-nums text-ink-900">{loading ? "…" : stores.length}</p>
        </div>
        <div className="rounded-xl border border-ink-200 bg-white p-4">
          <p className="text-xs text-ink-500">Productos (CR)</p>
          <p className="text-2xl font-bold tabular-nums text-ink-900">{loading ? "…" : productTotal}</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Provincias de Costa Rica</h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {provinces.map((p) => (
            <li key={p.slug} className="rounded-xl border border-ink-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-ink-800">{p.name}</p>
              <p className="text-xs text-ink-500">{p.cantons.length} cantones</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Frecuencia de actualización</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          La frecuencia depende de cada fuente: algunos supermercados se actualizan varias veces al día y otras fuentes oficiales con menor periodicidad. Cada precio muestra su propia fecha de captura en Costa Rica. No afirmamos cobertura nacional completa si los datos de alguna zona todavía son parciales.
        </p>
      </section>
    </div>
  );
}
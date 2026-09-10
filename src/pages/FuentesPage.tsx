import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { api, type StoreSummary } from "@/lib/api";

const INSTITUTIONS = [
  { name: "INEC — Instituto Nacional de Estadística y Censos", type: "Institución pública de Costa Rica", desc: "Referencia oficial de estadísticas y mediciones del consumidor en Costa Rica." },
  { name: "MEIC — Ministerio de Economía, Industria y Comercio", type: "Institución pública de Costa Rica", desc: "Información de precios y protección al consumidor en el mercado costarricense." },
];

export function FuentesPage() {
  const [stores, setStores] = useState<StoreSummary[]>([]);

  useEffect(() => {
    let active = true;
    api
      .stores(false)
      .then((d) => active && setStores(d.stores))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Fuentes de Costa Rica" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Fuentes de información de Costa Rica</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
          Toda fuente debe confirmar que corresponde a Costa Rica antes de utilizarse. Priorizamos dominios .cr, precios en colones, comercios con sucursales en el país y datos oficiales costarricenses.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Instituciones y datos públicos de Costa Rica</h2>
        <ul className="mt-3 space-y-3">
          {INSTITUTIONS.map((f) => (
            <li key={f.name} className="rounded-xl border border-ink-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{f.name}</p>
                  <p className="mt-0.5 text-xs text-ink-500">{f.type}</p>
                  <p className="mt-1.5 text-sm text-ink-600">{f.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Supermercados y comercios con operación en Costa Rica</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {stores.map((s) => (
            <li key={s.slug} className="rounded-xl border border-ink-200 bg-white p-4">
              <p className="text-sm font-semibold text-ink-900">{s.name}</p>
              <p className="mt-0.5 text-xs text-ink-500">{s.locationCount} ubicación{ s.locationCount !== 1 ? "es" : ""} en Costa Rica</p>
              {s.website && (
                <a href={s.website} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-xs text-brand-600 hover:underline">
                  {s.website}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm leading-relaxed text-ink-600">
        Los nombres comerciales y marcas pertenecen a sus respectivos dueños. Esta plataforma solo registra precios observados en Costa Rica, respeta los términos de uso de cada fuente y enlaza a la fuente original cuando corresponde.
      </p>
    </div>
  );
}
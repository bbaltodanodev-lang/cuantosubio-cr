import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { api, type StoreSummary } from "@/lib/api";
import { getStoreLogo } from "@/pages/util";

export function SupermercadosPage() {
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .stores(true)
      .then((d) => active && setStores(d.stores))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Supermercados" }]} />

      <div className="mt-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Supermercados y Cadenas Monitoreadas
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">
          Comparamos los precios de las principales cadenas y supermercados de Costa Rica. Consulta el catálogo y sucursales de cada comercio.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        </div>
      ) : stores.length ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores.map((s) => {
            const logo = getStoreLogo(s.name);
            return (
              <Link
                key={s.slug}
                to={`/supermercados/${s.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5"
              >
                <div>
                  {/* Logo Container */}
                  <div className="h-16 w-full rounded-xl border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-center mb-4">
                    {logo ? (
                      <img src={logo} alt={s.name} className="max-h-11 max-w-full object-contain" loading="lazy" />
                    ) : (
                      <span className="text-sm font-bold text-slate-700">{s.name}</span>
                    )}
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                    {s.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {s.locationCount} {s.locationCount === 1 ? "sucursal" : "sucursales"} registradas
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {s.productCount} precios activos
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                    Ver catálogo y precios →
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50">
          <p className="text-sm font-medium text-slate-500">No hay supermercados disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
}

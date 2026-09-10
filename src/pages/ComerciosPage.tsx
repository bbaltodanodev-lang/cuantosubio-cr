import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CostaRicaBadge } from "@/components/ui/badges";
import { api, type StoreSummary } from "@/lib/api";

export function ComerciosPage() {
  const [comercios, setComercios] = useState<StoreSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .stores(false)
      .then((d) => active && setComercios(d.stores))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const locales = comercios.filter((s) => !s.isSupermarket);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Comercios de Costa Rica" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Comercios en Costa Rica</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-ink-500">
          Establecimientos costarricenses (que no son supermercados) con presencia y precios confirmados dentro del país.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-sm text-ink-500">Cargando comercios de Costa Rica…</p>
        ) : locales.length ? (
          locales.map((c) => (
            <Link key={c.slug} to={`/supermercados/${c.slug}`} className="group rounded-2xl border border-ink-200 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-ink-900 group-hover:text-brand-600">{c.name}</p>
                <CostaRicaBadge />
              </div>
              <p className="mt-1 text-xs text-ink-500">{c.locationCount} ubicación{ c.locationCount !== 1 ? "es" : ""} en Costa Rica</p>
              <p className="mt-3 border-t border-ink-100 pt-3 text-xs text-ink-400">
                {c.locations.map((l) => l.name).join(" · ")}
              </p>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-sm text-ink-500">Aún no registramos comercios locales con datos confirmados en Costa Rica.</p>
        )}
      </div>
      <p className="mt-6 text-sm text-ink-500">
        Los supermercados se listan en{" "}
        <Link to="/supermercados" className="font-medium text-brand-600 hover:underline">/supermercados</Link>.
      </p>
    </div>
  );
}
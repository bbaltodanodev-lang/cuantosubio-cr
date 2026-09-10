import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { api, type StoreSummary, type ProductSummary } from "@/lib/api";
import { useScore } from "@/lib/use-score";
import { SITE_URL } from "@/lib/site";
import { useSeo, websiteJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { cardFromSummary, getStoreLogo } from "@/pages/util";

export function SupermercadoPage() {
  const { slug = "" } = useParams();
  const { bySlug } = useScore();
  const [store, setStore] = useState<StoreSummary | null | undefined>(undefined);
  const [products, setProducts] = useState<ProductSummary[]>([]);

  useEffect(() => {
    let active = true;
    setStore(undefined);
    setProducts([]);
    Promise.all([api.stores(false), api.products({ tienda: slug, sort: "name-asc" })])
      .then(([s, p]) => {
        if (!active) return;
        setStore(s.stores.find((x) => x.slug === slug) ?? null);
        setProducts(p.products);
      })
      .catch(() => active && setStore(null));
    return () => {
      active = false;
    };
  }, [slug]);

  const logo = store ? getStoreLogo(store.name) : null;

  useSeo(
    `/supermercados/${slug}`,
    store
      ? {
          title: `Precios en ${store.name} · Catálogo y Sucursales | CuántoSubió.cr`,
          description: `Consulta el catálogo de precios, ofertas y sucursales de ${store.name} en Costa Rica en colones (CRC). Comparativa con otros supermercados del país.`,
          robots: "index, follow",
          jsonLd: [
            websiteJsonLd(),
            breadcrumbJsonLd([
              { name: "Inicio", url: SITE_URL },
              { name: "Supermercados", url: `${SITE_URL}/supermercados` },
              { name: store.name, url: `${SITE_URL}/supermercados/${slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "GroceryStore",
              name: store.name,
              url: `${SITE_URL}/supermercados/${slug}`,
              address: { "@type": "PostalAddress", addressCountry: "CR" },
            },
          ],
        }
      : null,
  );

  if (store === undefined) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        <p className="mt-3 text-sm text-slate-500">Consultando información del supermercado…</p>
      </div>
    );
  }

  if (store === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Supermercado no encontrado</h1>
        <p className="mt-2 text-sm text-slate-500">No encontramos información de este supermercado en nuestro registro.</p>
        <Link to="/supermercados" className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          Ver supermercados disponibles
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Supermercados", href: "/supermercados" }, { label: store.name }]} />

      {/* Header with official logo */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-28 shrink-0 rounded-2xl border border-slate-100 bg-slate-50 p-2 flex items-center justify-center shadow-2xs">
              {logo ? (
                <img src={logo} alt={store.name} className="max-h-12 max-w-full object-contain" loading="lazy" />
              ) : (
                <span className="text-base font-bold text-slate-700">{store.name}</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950">{store.name}</h1>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                {store.locationCount} {store.locationCount === 1 ? "sucursal" : "sucursales"} registradas · {store.productCount} precios monitoreados
              </p>
            </div>
          </div>

          {store.website && (
            <a
              href={store.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
            >
              Visitar tienda en línea oficial ↗
            </a>
          )}
        </div>

        {/* Sucursales */}
        {store.locations && store.locations.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Sucursales por provincia y cantón:
            </h2>
            <div className="flex flex-wrap gap-2">
              {store.locations.map((loc, idx) => (
                <span
                  key={`${loc.name}-${idx}`}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {loc.name} {loc.province ? `(${loc.province})` : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Catálogo de Productos */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-slate-900">
            Productos con precios monitoreados en {store.name}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {products.length} productos
          </span>
        </div>

        {products.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => {
              const snap = bySlug.get(p.slug);
              return <ProductCard key={p.slug} product={cardFromSummary(p, snap)} />;
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center bg-slate-50">
            <p className="text-sm font-medium text-slate-500">No hay productos registrados actualmente para esta cadena.</p>
          </div>
        )}
      </section>
    </div>
  );
}

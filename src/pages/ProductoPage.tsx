import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductImage } from "@/components/product/product-image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PriceHistoryChart } from "@/components/chart/price-history-chart";
import { StoreComparison } from "@/components/product/store-comparison";
import { TaxBreakdown } from "@/components/product/tax-breakdown";
import { ProductCard } from "@/components/product/product-card";
import { formatCRC, formatDateCR } from "@/lib/format";
import { api, type ProductDetail, type ProductSummary } from "@/lib/api";
import { useScore } from "@/lib/use-score";
import { SITE_URL } from "@/lib/site";
import { useSeo, websiteJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { geografia } from "@/lib/data/demo-data";
import { getStoreLogo, cardFromSummary } from "@/pages/util";

export function ProductoPage() {
  const { slug = "" } = useParams();
  const { bySlug } = useScore();
  const [p, setP] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState<string>("todas");
  const [selectedCanton, setSelectedCanton] = useState<string>("todos");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .product(slug)
      .then((d) => {
        if (!active) return;
        setP(d.product);
        if (d.product.categorySlug) {
          api.products({ categoria: d.product.categorySlug }).then((res) => {
            if (active) {
              setRelated(res.products.filter((item) => item.slug !== slug).slice(0, 4));
            }
          });
        }
      })
      .catch(() => active && setP(null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  // Cantones disponibles para la provincia seleccionada
  const availableCantons = useMemo(() => {
    if (selectedProvince === "todas") return [];
    const prov = geografia.find((g) => g.nombre.toLowerCase() === selectedProvince.toLowerCase());
    return prov ? prov.cantones : [];
  }, [selectedProvince]);

  // Filtrado de comparaciones según ubicación seleccionada
  const filteredComparisons = useMemo(() => {
    if (!p || !p.comparisons) return [];
    if (selectedProvince === "todas") return p.comparisons;

    return p.comparisons.filter((c) => {
      if (!c.location) return true;
      if (c.location.province && c.location.province.toLowerCase() !== selectedProvince.toLowerCase()) {
        return false;
      }
      if (selectedCanton !== "todos" && c.location.canton) {
        if (c.location.canton.toLowerCase() !== selectedCanton.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }, [p, selectedProvince, selectedCanton]);

  // Convertir historial a fechas válidas
  const historyPoints = useMemo(() => {
    if (!p || !p.history) return [];
    return p.history.map((h) => ({
      ...h,
      date: new Date(h.date),
    }));
  }, [p]);

  // SEO
  useSeo(
    `/producto/${slug}`,
    p
      ? {
          title: `¿Cuánto subió ${p.name} (${p.presentation})? Precios en Costa Rica`,
          description: `Consulta el precio de ${p.name} (${p.presentation}): ${
            p.price?.amount ? formatCRC(p.price.amount) : "precio actualizado"
          } en colones (CRC). Compara en cuál supermercado está más barato y su historial.`,
          robots: "index, follow",
          jsonLd: [
            websiteJsonLd(),
            breadcrumbJsonLd([
              { name: "Inicio", url: SITE_URL },
              { name: "Productos", url: `${SITE_URL}/productos` },
              { name: p.name, url: `${SITE_URL}/producto/${slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${p.name} ${p.presentation}`,
              description: p.description ?? `${p.name} en presentación de ${p.presentation}.`,
              sku: p.code,
              image: [`${SITE_URL}/img/products/${p.slug}.webp`],
              brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
              offers: p.price?.amount
                ? {
                    "@type": "Offer",
                    priceCurrency: "CRC",
                    price: p.price.amount,
                    availability:
                      p.price.availability === "OUT_OF_STOCK"
                        ? "https://schema.org/OutOfStock"
                        : "https://schema.org/InStock",
                    url: `${SITE_URL}/producto/${slug}`,
                    seller: { "@type": "Organization", name: p.price.store ?? "Supermercados de Costa Rica" },
                  }
                : undefined,
            },
          ],
        }
      : null,
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        <p className="mt-3 text-sm font-semibold text-slate-600">Consultando información del producto…</p>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
          🔍
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Producto no encontrado</h1>
        <p className="mt-2 text-sm text-slate-500">
          No encontramos este producto en nuestro catálogo actual. Podés buscar en el catálogo completo.
        </p>
        <Link
          to="/productos"
          className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
        >
          Explorar todos los productos
        </Link>
      </div>
    );
  }

  const cheapestStore =
    p.price?.store ??
    (p.comparisons.length > 0
      ? typeof p.comparisons[0].store === "string"
        ? p.comparisons[0].store
        : p.comparisons[0].store
      : "Supermercado");

  const cheapestStoreLogo = p.price?.storeLogo ?? getStoreLogo(cheapestStore);
  const isUp = p.change?.direction === "UP";
  const isDown = p.change?.direction === "DOWN";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: p.category ?? "Productos", href: `/productos?categoria=${p.categorySlug ?? ""}` },
          { label: `${p.name} (${p.presentation})` },
        ]}
      />

      {/* Main Product Header Card */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Product Photography & Spec Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center">
            <ProductImage
              slug={p.slug}
              src={p.imageUrl}
              category={p.category ?? undefined}
              alt={`${p.name} (${p.presentation})`}
              className="h-full w-full object-contain object-center"
            />

            {p.isCanastaBasica && (
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-xs">
                  Canasta Básica
                </span>
              </div>
            )}
          </div>

          {/* Ficha técnica */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Especificaciones del producto
            </h2>
            <dl className="mt-3 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">Marca</dt>
                <dd className="font-bold text-slate-900">{p.brand ?? "No especificada"}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">Presentación</dt>
                <dd className="font-semibold text-slate-900">{p.presentation}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">Categoría</dt>
                <dd className="font-semibold text-slate-900">{p.category ?? "Abarrotes"}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-slate-500">Código / Barcode</dt>
                <dd className="font-mono text-xs font-semibold text-slate-700 tabular-nums">{p.code}</dd>
              </div>
              {p.brandOrigin && (
                <div className="flex justify-between py-2">
                  <dt className="text-slate-500">Origen</dt>
                  <dd className="font-medium text-slate-700">{p.brandOrigin}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Right Column: Key Price Findings, Comparison & History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Title & Brand */}
          <div>
            {p.brand && (
              <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-700">
                {p.brand}
              </p>
            )}
            <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
              {p.name}
            </h1>
            <p className="mt-1.5 text-base font-medium text-slate-600">{p.presentation}</p>
          </div>

          {/* Pricing Highlight Box */}
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/20 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mejor precio actual
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight text-slate-950">
                    {p.price ? formatCRC(p.price.amount) : "No disponible"}
                  </span>
                </div>
                {p.price?.amountPerUnit && (
                  <p className="mt-1 text-xs font-semibold tabular-nums text-slate-600">
                    Equivalente a {formatCRC(p.price.amountPerUnit)} por unidad de medida
                  </p>
                )}
                {p.price?.source && (
                  <p className="mt-2 text-xs text-slate-500">
                    {p.price.source} · {p.price.capturedAt ? formatDateCR(p.price.capturedAt, { withTime: true }) : "fecha no disponible"}
                  </p>
                )}
              </div>

              {/* Supermercado más barato */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Más barato en
                </p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  {cheapestStoreLogo ? (
                    <img
                      src={cheapestStoreLogo}
                      alt={cheapestStore}
                      className="h-6 max-w-[90px] object-contain shrink-0"
                    />
                  ) : null}
                  <span className="text-sm font-bold text-slate-900">{cheapestStore}</span>
                </div>
              </div>
            </div>

            {/* "¿Cuánto subió?" Variation block */}
            {p.change && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Variación registrada ("¿Cuánto subió?")
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Último cambio respecto al registro previo de esta presentación
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span
                    className={`inline-flex items-center gap-1 text-base font-black tabular-nums ${
                      isDown ? "text-emerald-700" : isUp ? "text-rose-600" : "text-slate-600"
                    }`}
                  >
                    {isDown ? "↓ Bajó" : isUp ? "↑ Subió" : "Sin cambio"}{" "}
                    {formatCRC(Math.abs(p.change.absolute))} ({Math.abs(p.change.percent).toFixed(1)}%)
                  </span>
                </div>
              </div>
            )}
          </div>

          {p.price && (
            <TaxBreakdown amount={p.price.amount} title="Precio publicado: comparación con y sin IVA" />
          )}

          {/* Location Selector (Provincia & Cantón) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>📍</span> Disponibilidad por provincia y cantón
              </h2>
              <span className="text-[11px] text-slate-500">
                Prioriza opciones disponibles en tu zona
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="province-select" className="block text-xs font-semibold text-slate-600 mb-1">
                  Provincia:
                </label>
                <select
                  id="province-select"
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedCanton("todos");
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-2xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="todas">Todas las 7 provincias (Nacional)</option>
                  {geografia.map((g) => (
                    <option key={g.nombre} value={g.nombre}>
                      {g.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="canton-select" className="block text-xs font-semibold text-slate-600 mb-1">
                  Cantón:
                </label>
                <select
                  id="canton-select"
                  value={selectedCanton}
                  disabled={selectedProvince === "todas" || availableCantons.length === 0}
                  onChange={(e) => setSelectedCanton(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-2xs disabled:bg-slate-100 disabled:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="todos">Todos los cantones</option>
                  {availableCantons.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dónde está más barato: Comparativa entre supermercados */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                ¿Dónde está más barato?
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                {filteredComparisons.length} {filteredComparisons.length === 1 ? "opción" : "opciones"} ordenadas
              </span>
            </div>
            <StoreComparison comparisons={filteredComparisons} />
          </div>

          {/* Evolución del precio / Historial */}
          <div className="pt-2">
            <h2 className="text-lg font-black tracking-tight text-slate-900 mb-3">
              Evolución del precio
            </h2>
            <PriceHistoryChart points={historyPoints} />
          </div>

          {/* Transparencia y Aviso de Fuentes */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500 leading-relaxed">
            <p className="font-semibold text-slate-700">Nota de transparencia:</p>
            <p className="mt-1">
              Los precios y la disponibilidad pueden variar por sucursal y cambiar después de la última actualización (
              {p.price?.capturedAt ? formatDateCR(p.price.capturedAt) : "reciente"}). CuántoSubió.cr recopila información de fuentes y catálogos públicos para facilitar la comparación de precios a los consumidores.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-slate-200 pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900">
              Productos relacionados en {p.category ?? "la misma categoría"}
            </h2>
            <Link
              to={`/productos?categoria=${p.categorySlug ?? ""}`}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((rel) => {
              const snap = bySlug.get(rel.slug);
              return <ProductCard key={rel.slug} product={cardFromSummary(rel, snap)} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}

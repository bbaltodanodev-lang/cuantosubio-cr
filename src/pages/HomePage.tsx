import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/ui/search-bar";
import { ProductCard } from "@/components/product/product-card";
import { useScore } from "@/lib/use-score";
import { api, type ProductSummary, type StoreSummary, type CategorySummary } from "@/lib/api";
import { useSeo, websiteJsonLd } from "@/lib/seo";
import { toCard, cardFromSummary, getStoreLogo } from "@/pages/util";
import { UpdatedAt } from "@/components/ui/badges";

const QUICK_LINKS = [
  { label: "Arroz 1.8 kg", href: "/producto/arroz-blanco-1-8-kg" },
  { label: "Huevos 30 uds", href: "/producto/huevos-30-unidades" },
  { label: "Leche 1 L", href: "/producto/leche-entera-1-l" },
  { label: "Frijoles negros", href: "/producto/frijoles-negros-1-kg" },
  { label: "Café 1820", href: "/producto/cafe-clasico-500-g" },
  { label: "Pollo entero", href: "/producto/pollo-entero-1-kg" },
  { label: "Aceite Clover", href: "/producto/aceite-girasol-1-l" },
  { label: "Atún Pronto", href: "/producto/atun-enlatado-140-g" },
  { label: "Salsa Lizano", href: "/producto/salsa-lizano-700-ml" },
  { label: "Papel higiénico", href: "/producto/papel-higienico-12-rollos" },
];

const PROVINCE_LINKS = [
  { name: "San José", slug: "san-jose" },
  { name: "Alajuela", slug: "alajuela" },
  { name: "Cartago", slug: "cartago" },
  { name: "Heredia", slug: "heredia" },
  { name: "Guanacaste", slug: "guanacaste" },
  { name: "Puntarenas", slug: "puntarenas" },
  { name: "Limón", slug: "limon" },
];

export function HomePage() {
  const { tallest, falls, bySlug, market } = useScore();
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [canasta, setCanasta] = useState<ProductSummary[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.categories(),
      api.stores(true),
      api.products({ canasta: 1, sort: "price-asc" }),
    ])
      .then(([cats, storesRes, canastaRes]) => {
        if (!active) return;
        setCategories(cats.categories);
        setStores(storesRes.stores);
        setCanasta(canastaRes.products);
      })
      .catch(() => active && setLoadError(true))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  useSeo("/", {
    title: "¿Cuánto subió? — Compara precios de supermercados en Costa Rica",
    description: "Consulta precios actualizados en colones, compara qué supermercado tiene la mejor opción y descubre cuánto han variado hoy los productos de la canasta básica.",
    jsonLd: [websiteJsonLd()],
  });

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:px-8">
          {/* Official Banner Visual Header */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_55px_-28px_rgba(15,68,92,.45)] sm:rounded-3xl">
            <picture>
              <source srcSet="/img/brand/hero-banner-v2.webp" type="image/webp" />
              <img
                src="/img/brand/hero-banner-v2.png"
                alt="¿Cuánto Subió? Comparación de precios de la canasta básica en Costa Rica"
                className="block h-auto w-full"
                loading="eager"
                width="1800"
                height="720"
              />
            </picture>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              ¿Cuánto subió el súper?
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Consulta precios actualizados en colones, compara qué supermercado tiene la mejor opción y descubre cuánto han variado hoy los productos de la canasta básica.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
              ¿Querés saber cuánto subió la canasta básica o algún producto de ella?
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/canasta-basica"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                Ver canasta básica
              </Link>
              <a
                href="#productos"
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-400 hover:text-emerald-700"
              >
                Ver productos
              </a>
            </div>

            {/* Main Search Bar */}
            <div className="mx-auto mt-6 max-w-2xl">
              <SearchBar size="lg" placeholder="¿Qué producto querés consultar? Ej: arroz, huevos, leche..." />
            </div>

            {/* Quick search tags */}
            <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-1.5">
              <span className="text-xs font-bold text-slate-400">Consultas populares:</span>
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/50 shadow-2xs"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {market && (
              <div title={market.message} className="mx-auto mt-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs shadow-2xs">
                <span className={`h-2 w-2 rounded-full ${market.mode === "live" ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden="true" />
                <span className="font-bold text-slate-700">
                  {market.mode === "live" ? "Datos en vivo" : "Última referencia local"}
                </span>
                <span className="text-slate-500">{market.source ?? "catálogo local"}</span>
                {market.capturedAt && <UpdatedAt date={market.capturedAt} className="text-slate-400" />}
                {market.mode === "live" && market.matchedProducts < market.requestedProducts && (
                  <span className="text-slate-400">· {market.matchedProducts}/{market.requestedProducts} fichas en vivo</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Province Quick Filter Bar */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            📍 Por provincia:
          </span>
          {PROVINCE_LINKS.map((p) => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 shadow-2xs"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Lo que más subió */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Lo que más subió
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Productos con los mayores incrementos de precio registrados recientemente
            </p>
          </div>
          <Link to="/subidas" className="text-xs font-bold text-emerald-700 hover:underline">
            Ver lista completa →
          </Link>
        </div>

        {tallest.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tallest.slice(0, 4).map((e) => (
              <ProductCard key={e.slug} product={toCard(e)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-slate-50">
            <p className="text-sm font-medium text-slate-500">Sin incrementos anómalos detectados hoy.</p>
          </div>
        )}
      </section>

      {/* Lo que más bajó */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Lo que más bajó
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Oportunidades de ahorro y productos con rebajas de precio confirmadas
            </p>
          </div>
          <Link to="/bajadas" className="text-xs font-bold text-emerald-700 hover:underline">
            Ver lista completa →
          </Link>
        </div>

        {falls.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {falls.slice(0, 4).map((e) => (
              <ProductCard key={e.slug} product={toCard(e)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-slate-50">
            <p className="text-sm font-medium text-slate-500">Sin bajas de precio detectadas hoy.</p>
          </div>
        )}
      </section>

      {/* Canasta Básica */}
      <section id="productos" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Productos monitoreados de consumo básico
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Una referencia práctica para comparar precios; revisá el alcance estadístico oficial antes de interpretarla como una canasta familiar completa.
            </p>
          </div>
          <Link to="/canasta-basica" className="text-xs font-bold text-emerald-700 hover:underline">
            Ver el panel completo →
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-500">Consultando la canasta básica…</div>
        ) : canasta.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {canasta.slice(0, 8).map((p) => {
              const snap = bySlug.get(p.slug);
              return <ProductCard key={p.slug} product={cardFromSummary(p, snap)} />;
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            {loadError ? "No fue posible cargar la canasta básica en este momento." : "Aún no hay productos de canasta básica confirmados."}
          </div>
        )}
      </section>

      {/* Supermarkets Quick Access Bar */}
      <section className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Supermercados monitoreados
            </span>
            <Link to="/supermercados" className="text-xs font-bold text-emerald-700 hover:underline">
              {stores.length ? `Ver todos (${stores.length}) →` : "Ver supermercados →"}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {stores.slice(0, 7).map((s) => {
              const logo = getStoreLogo(s.name);
              return (
                <Link
                  key={s.slug}
                  to={`/supermercados/${s.slug}`}
                  className="h-14 rounded-xl border border-slate-200/80 bg-slate-50/60 p-2 flex items-center justify-center hover:border-emerald-300 hover:bg-white transition-all shadow-2xs group"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={s.name}
                      className="max-h-8 max-w-[88%] object-contain group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-bold text-slate-700">{s.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categorías Principales */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-black tracking-tight text-slate-950 mb-4">
          Explorar por categoría
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/productos?categoria=${c.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-emerald-300 hover:shadow-sm"
            >
              <span className="block text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                {c.name}
              </span>
              <span className="mt-1 block text-xs text-slate-400">
                {c.productCount} productos
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

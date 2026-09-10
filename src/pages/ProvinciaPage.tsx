import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { api, type ProductSummary, type StoreSummary } from "@/lib/api";
import { useScore } from "@/lib/use-score";
import { useSeo, websiteJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { geografia } from "@/lib/data/demo-data";
import { getStoreLogo, cardFromSummary } from "@/pages/util";

const PROVINCE_MAP: Record<string, string> = {
  "san-jose": "San José",
  "alajuela": "Alajuela",
  "cartago": "Cartago",
  "heredia": "Heredia",
  "guanacaste": "Guanacaste",
  "puntarenas": "Puntarenas",
  "limon": "Limón",
};

export function ProvinciaPage() {
  const params = useParams();
  const rawSlug = params.slug ?? "";
  const provinceName = PROVINCE_MAP[rawSlug] ?? rawSlug.replace(/-/g, " ");

  const { bySlug } = useScore();
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCanton, setSelectedCanton] = useState<string>("todos");

  const cantons = useMemo(() => {
    const p = geografia.find(
      (g) => g.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
        provinceName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
    return p ? p.cantones : [];
  }, [provinceName]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      api.products({ province: provinceName, sort: "price-asc" }),
      api.stores(true),
    ])
      .then(([prodRes, storeRes]) => {
        if (!active) return;
        setProducts(prodRes.products);
        // Filtrar tiendas que operan en esta provincia
        const operatingStores = storeRes.stores.filter((s) =>
          s.locations.some((l) => l.province?.toLowerCase() === provinceName.toLowerCase())
        );
        setStores(operatingStores);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [provinceName]);

  useSeo(
    `/${rawSlug}`,
    {
      title: `Precios de supermercados en ${provinceName} · CuántoSubió.cr`,
      description: `Consulta y compara precios de la canasta básica y supermercados disponibles en ${provinceName}, Costa Rica. Dónde comprar más barato en tu provincia.`,
      jsonLd: [
        websiteJsonLd(),
        breadcrumbJsonLd([
          { name: "Inicio", url: SITE_URL },
          { name: "Provincias", url: `${SITE_URL}/precios` },
          { name: provinceName, url: `${SITE_URL}/${rawSlug}` },
        ]),
      ],
    }
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Cobertura nacional", href: "/cobertura" },
          { label: provinceName },
        ]}
      />

      {/* Header */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
              Provincia de Costa Rica
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
              Precios en {provinceName}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Monitoreo de precios y disponibilidad en las sucursales de supermercados ubicadas en {provinceName} y sus cantones.
            </p>
          </div>

          {/* Supermercados en la provincia */}
          {stores.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shrink-0 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Cadenas con sucursales aquí:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {stores.map((s) => {
                  const logo = getStoreLogo(s.name);
                  return (
                    <Link
                      key={s.slug}
                      to={`/supermercados/${s.slug}`}
                      title={s.name}
                      className="h-8 px-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center hover:border-emerald-300 transition-colors"
                    >
                      {logo ? (
                        <img src={logo} alt={s.name} className="h-4 max-w-[60px] object-contain" />
                      ) : (
                        <span className="text-xs font-bold text-slate-700">{s.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selector de Cantón */}
        {cantons.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Explorar por cantón de {provinceName}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCanton("todos")}
                className={`rounded-xl px-3 py-1 text-xs font-bold transition-colors ${
                  selectedCanton === "todos"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Todos los cantones
              </button>
              {cantons.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCanton(c)}
                  className={`rounded-xl px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedCanton === c
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid de Productos */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900">
            Productos y mejores precios en {provinceName}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {products.length} productos monitoreados
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50">
            <p className="text-sm font-medium text-slate-500">
              No hay productos con disponibilidad confirmada en este cantón actualmente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => {
              const snap = bySlug.get(p.slug);
              return <ProductCard key={p.slug} product={cardFromSummary(p, snap)} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState, Pagination } from "@/components/ui/states";
import { SortSelect } from "@/components/ui/sort-select";
import { api, type ProductSummary, type CategorySummary, type StoreSummary } from "@/lib/api";
import { PROVINCES } from "@/lib/site";
import { cardFromSummary } from "@/pages/util";
import { useScore } from "@/lib/use-score";

const PAGE_SIZE = 12;

export function ProductosPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { bySlug } = useScore();

  const q = searchParams.get("q") ?? "";
  const categoria = searchParams.get("categoria") ?? "";
  const tienda = searchParams.get("tienda") ?? "";
  const provincia = searchParams.get("provincia") ?? "";
  const canasta = searchParams.get("canasta") === "1";
  const sort = searchParams.get("sort") ?? "name-asc";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const [cats, setCats] = useState<CategorySummary[]>([]);
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.categories().then((d) => setCats(d.categories)).catch(() => {});
    api.stores(true).then((d) => setStores(d.stores)).catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .products({ q, categoria, tienda, provincia, canasta, sort })
      .then((d) => {
        if (!active) return;
        setProducts(d.products);
        setTotal(d.total);
      })
      .catch(() => {
        if (active) {
          setProducts([]);
          setTotal(0);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [q, categoria, tienda, provincia, canasta, sort]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageItems = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function buildHref(next: Record<string, string>) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categoria) params.set("categoria", categoria);
    if (tienda) params.set("tienda", tienda);
    if (provincia) params.set("provincia", provincia);
    if (canasta) params.set("canasta", "1");
    if (sort !== "name-asc") params.set("sort", sort);
    for (const [k, v] of Object.entries(next)) params.set(k, v);
    const qs = params.toString();
    return qs ? `/productos?${qs}` : "/productos";
  }

  function apply(next: Record<string, string>) {
    navigate(`/productos${buildHref(next).replace("/productos", "")}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Productos" }]} />
      <div className="mt-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">Catálogo de Productos</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-slate-600">
          Compara precios actualizados, marcas y presentaciones monitoreadas en los principales supermercados.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          apply({
            q: String(data.get("q") ?? ""),
            categoria: String(data.get("categoria") ?? ""),
            tienda: String(data.get("tienda") ?? ""),
            provincia: String(data.get("provincia") ?? ""),
          });
        }}
        className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-ink-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        <input type="hidden" name="sort" value={sort} />
        <label className="lg:col-span-1">
          <span className="block text-xs font-medium text-ink-500">Buscar</span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Producto, marca…"
            className="mt-1 w-full rounded-lg border border-ink-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </label>
        <label>
          <span className="block text-xs font-medium text-ink-500">Categoría</span>
          <select name="categoria" defaultValue={categoria} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">
            <option value="">Todas</option>
            {cats.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="block text-xs font-medium text-ink-500">Supermercado</span>
          <select name="tienda" defaultValue={tienda} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">
            <option value="">Todos</option>
            {stores.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="block text-xs font-medium text-ink-500">Provincia</span>
          <select name="provincia" defaultValue={provincia} className="mt-1 w-full rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">
            <option value="">Todas</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button type="submit" className="inline-flex flex-1 items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
            Aplicar filtros
          </button>
          <Link to="/productos" className="inline-flex items-center rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600">
            Limpiar
          </Link>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500">
          <span className="font-semibold text-ink-800">{total}</span> producto{total !== 1 ? "s" : ""} confirmado{total !== 1 ? "s" : ""} en Costa Rica
        </p>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-ink-500">Ordenar:</span>
          <SortSelect value={sort} />
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-ink-500">Consultando precios de Costa Rica…</p>
      ) : pageItems.length ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((p) => (
            <ProductCard key={p.slug} product={cardFromSummary(p, bySlug.get(p.slug))} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No encontramos productos que coincidan con esta búsqueda en Costa Rica"
            message="Probá con otro término o quitá filtros. Solo mostramos productos con presencia y precio confirmados dentro de Costa Rica."
          />
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} buildHref={(p) => buildHref({ page: String(p) })} />
    </div>
  );
}

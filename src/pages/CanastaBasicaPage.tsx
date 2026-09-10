import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { TaxBreakdown } from "@/components/product/tax-breakdown";
import { EmptyState } from "@/components/ui/states";
import { UpdatedAt } from "@/components/ui/badges";
import { api, type ProductSummary } from "@/lib/api";
import { useScore } from "@/lib/use-score";
import { cardFromSummary } from "@/pages/util";
import { TAX_SOURCE_LINKS } from "@/lib/tax";
import { formatCRC } from "@/lib/format";

const OFFICIAL_REFERENCES = [
  {
    eyebrow: "INEC",
    title: "Costo oficial de la CBA",
    body: "Serie mensual de la Canasta Básica Alimentaria por subgrupo. Es la referencia estadística para medir el costo de alimentos, no un carrito universal para cada familia.",
    href: "https://admin.inec.cr/node/46208",
    label: "Ver serie INEC",
  },
  {
    eyebrow: "INEC",
    title: "Qué mide la canasta",
    body: "La CBA se construye con alimentos y cantidades que cubren necesidades calóricas promedio; no pretende ser una dieta ideal ni nutricionalmente completa para todas las personas.",
    href: TAX_SOURCE_LINKS.inecMethodology,
    label: "Ver explicación INEC",
  },
  {
    eyebrow: "Hacienda / PGR",
    title: "IVA y canasta tributaria",
    body: "El IVA general es 13%. Los bienes incluidos en la canasta tributaria pueden tener una tarifa reducida de 1%; la tasa real depende de la lista legal y de la presentación.",
    href: TAX_SOURCE_LINKS.hacienda,
    label: "Ver tarifas oficiales",
    secondaryHref: TAX_SOURCE_LINKS.legalList,
    secondaryLabel: "Ver norma jurídica",
  },
];

export function CanastaBasicaPage() {
  const { bySlug, market } = useScore();
  const [items, setItems] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .products({ canasta: 1, sort: "name-asc" })
      .then((d) => active && setItems(d.products))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading || window.location.hash !== "#fuentes-oficiales") return;
    document.getElementById("fuentes-oficiales")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loading]);

  const currentPrices = useMemo(
    () => items.map((item) => bySlug.get(item.slug)?.price).filter((price): price is number => price !== null && price !== undefined),
    [items, bySlug],
  );
  const referenceTotal = currentPrices.reduce((sum, price) => sum + price, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Canasta Básica" }]} />

      {referenceTotal > 0 && (
        <div className="mt-6">
          <TaxBreakdown
            amount={referenceTotal}
            title="Total de referencia de las fichas con precio disponible"
            defaultScenario="general"
          />
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            Este total suma el precio publicado más barato encontrado para cada ficha cargada; no es el costo mensual por persona que publica el INEC ni un presupuesto familiar completo ({currentPrices.length} de {items.length} fichas tienen precio disponible).
          </p>
        </div>
      )}

      {market && (
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs shadow-2xs">
          <span className={`h-2 w-2 rounded-full ${market.mode === "live" ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span className="font-bold text-slate-800">{market.mode === "live" ? "Conexión de catálogo activa" : "Última referencia local"}</span>
          <span className="text-slate-500">{market.source ?? "Fuente local"}</span>
          {market.capturedAt && <UpdatedAt date={market.capturedAt} className="text-slate-400" />}
          {market.mode === "live" && <span className="text-slate-400">· {market.matchedProducts}/{market.requestedProducts} coincidencias en vivo</span>}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Consultando productos de consumo básico en Costa Rica…</p>
      ) : items.length ? (
        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Fichas monitoreadas</h2>
              <p className="mt-1 text-sm text-slate-500">Misma presentación, precio publicado y variación disponible.</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{items.length} productos</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={cardFromSummary(p, bySlug.get(p.slug))} />
            ))}
          </div>
        </section>
      ) : (
        <div className="mt-8">
          <EmptyState title="Sin productos de consumo básico confirmados en Costa Rica" />
        </div>
      )}

      <section className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-emerald-50/50 to-sky-50/60 p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
              Monitoreo de precios · Costa Rica
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Canasta básica: precios comparables en colones
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Esta vista reúne productos de consumo básico que monitoreamos entre supermercados. Te ayuda a comparar opciones y variaciones de hoy, pero no reemplaza la canasta estadística del INEC ni afirma representar el gasto completo de cada hogar.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-700">
              <span className="rounded-xl border border-white bg-white/80 px-3 py-2 shadow-2xs">{items.length || "—"} fichas monitoreadas</span>
              <span className="rounded-xl border border-white bg-white/80 px-3 py-2 shadow-2xs">Precio en CRC</span>
              {market?.mode === "live" && <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">Catálogo conectado</span>}
            </div>
          </div>

          <div className="rounded-2xl border border-white/90 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Lectura correcta</p>
            <p className="mt-2 text-sm font-bold leading-relaxed text-slate-900">
              CBA e IVA son conceptos distintos
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              La CBA del INEC mide un costo alimentario mínimo de referencia. La canasta tributaria define qué bienes pueden pagar 1% de IVA. No se deben mezclar como si fueran la misma lista.
            </p>
            <a href="/metodologia" className="mt-4 inline-flex text-xs font-extrabold text-emerald-700 hover:underline">
              Revisar metodología →
            </a>
          </div>
        </div>
      </section>

      <section id="fuentes-oficiales" className="scroll-mt-24 mt-14 border-t border-slate-200 pt-10">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Investigación y alcance</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Qué es oficial y qué es de esta plataforma</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Consultamos referencias públicas de INEC, Hacienda y la normativa aplicable para separar una comparación de precios de una medición estadística o tributaria. Estas fuentes son las que debés usar para interpretar la cobertura y la tarifa legal.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {OFFICIAL_REFERENCES.map((reference) => (
            <article key={reference.title} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{reference.eyebrow}</p>
              <h3 className="mt-2 text-base font-extrabold text-slate-900">{reference.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{reference.body}</p>
              <a href={reference.href} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs font-extrabold text-emerald-700 hover:underline">
                {reference.label} ↗
              </a>
              {reference.secondaryHref && reference.secondaryLabel && (
                <a href={reference.secondaryHref} target="_blank" rel="noopener noreferrer" className="mt-2 text-xs font-extrabold text-slate-600 hover:text-emerald-700 hover:underline">
                  {reference.secondaryLabel} ↗
                </a>
              )}
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Referencia numérica de esta pantalla: {referenceTotal > 0 ? formatCRC(referenceTotal) : "sin total disponible"} sumando fichas observadas. Los valores pueden cambiar por sucursal, promoción, disponibilidad y hora de captura.
        </p>
      </section>
    </div>
  );
}

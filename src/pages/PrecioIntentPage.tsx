import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { PriceChange } from "@/components/product/price";
import { formatCRC, formatDateCR, slugify } from "@/lib/format";
import { api, type ProductSummary } from "@/lib/api";
import { useScore } from "@/lib/use-score";
import { useSeo, websiteJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { cardFromSummary, provinceSlug } from "@/pages/util";
import { PROVINCES } from "@/lib/site";

const PRODUCT_INTENTS: { slug: string; categoria: string; title: string; description: string }[] = [
  { slug: "arroz-costa-rica", categoria: "Arroz", title: "Precio del arroz en Costa Rica", description: "Consulta cuánto cuesta el arroz en Costa Rica, cuánto ha subido y en cuál supermercado del país está más barato." },
  { slug: "huevos-costa-rica", categoria: "Huevos", title: "Precio de los huevos en Costa Rica", description: "Precio de huevos en Costa Rica en colones (CRC): presentaciones de 12 y 30 unidades, historial y comparación entre comercios del país." },
  { slug: "leche-costa-rica", categoria: "Lácteos", title: "Precio de la leche en Costa Rica", description: "Precio de la leche en Costa Rica, comparado entre supermercados nacionales, con historial en colones (CRC)." },
  { slug: "frijoles-costa-rica", categoria: "Frijoles", title: "Precio de los frijoles en Costa Rica", description: "Precio de los frijoles en Costa Rica en colones (CRC), con historial y comparación entre comercios del país." },
  { slug: "pollo-costa-rica", categoria: "Pollo", title: "Precio del pollo en Costa Rica", description: "Precio del pollo en Costa Rica, presentaciones y comparaciones entre supermercados y comercios del país." },
  { slug: "cafe-costa-rica", categoria: "Café", title: "Precio del café en Costa Rica", description: "Precio del café en Costa Rica en colones (CRC), con marcas y presentaciones vendidas en el país, historial y comparación." },
];

const OTHER_ITEMS = [
  ...PRODUCT_INTENTS.map((x) => ({ title: x.title, slug: x.slug })),
  ...PROVINCES.map((p) => ({ title: `Precios en ${p}, Costa Rica`, slug: provinceSlug(p) })),
];

export function PrecioIntentPage() {
  const { slug = "" } = useParams();
  const { bySlug } = useScore();
  const intent = PRODUCT_INTENTS.find((x) => x.slug === slug);
  const province = PROVINCES.find((p) => provinceSlug(p) === slug);
  const isProvince = Boolean(province);

  const title = intent ? intent.title : province ? `Precios en ${province}, Costa Rica` : "Precios en Costa Rica";
  const description = intent
    ? intent.description
    : province
      ? `Consulta precios de productos en ${province}, Costa Rica, en colones (CRC), comparados entre supermercados del país con sucursal en esa provincia.`
      : "Consulta precios de productos en Costa Rica en colones (CRC).";

  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const params = isProvince ? { provincia: province! } : intent ? { categoria: slugify(intent.categoria) } : {};
    api
      .products({ ...params, sort: "name-asc" })
      .then((d) => active && setProducts(d.products))
      .catch(() => active && setProducts([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useSeo(
    `/precios/${slug}`,
    {
      title,
      description,
      robots: "index, follow",
      jsonLd: [
        websiteJsonLd(),
        breadcrumbJsonLd([
          { name: "Costa Rica", url: SITE_URL },
          { name: "Precios en Costa Rica", url: `${SITE_URL}/precios` },
          { name: title, url: `${SITE_URL}/precios/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `¿Cuánto cuesta ${title.toLowerCase().replace(/^precio (de |del )?/, "el ")}?`,
              acceptedAnswer: { "@type": "Answer", text: `En Costa Rica los precios se publican en colones (CRC) y se comparan entre supermercados del país. Consultá el precio actual y su historial en esta página.` },
            },
            {
              "@type": "Question",
              name: `¿Cuánto subió el precio de esto en Costa Rica?`,
              acceptedAnswer: { "@type": "Answer", text: "La variación se calcula comparando el último precio registrado en Costa Rica contra el precio anterior de la misma presentación y comercio, en colones (CRC)." },
            },
            {
              "@type": "Question",
              name: "¿En qué supermercado está más barato en Costa Rica?",
              acceptedAnswer: { "@type": "Answer", text: "Cada producto muestra la comparación entre los supermercados de Costa Rica con precio confirmado, indicando dónde está más barato." },
            },
          ],
        },
      ],
    },
  );

  if (!intent && !province) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-ink-900">Consulta no disponible</h1>
        <p className="mt-2 text-sm text-ink-500">No publicamos esta consulta hasta confirmar fuentes en Costa Rica.</p>
        <Link to="/precios" className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          Ver páginas de precios
        </Link>
      </div>
    );
  }

  const first = products[0] ? bySlug.get(products[0].slug) : undefined;
  const detail = first ? { name: products[0].name, slug: products[0].slug } : null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Precios en Costa Rica", href: "/precios" }, { label: title }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">{description}</p>
      </div>

      <p className="mt-4 text-sm text-ink-500">
        {loading ? "Consultando productos de Costa Rica…" : (
          <>
            <span className="font-semibold text-ink-800">{products.length}</span> producto{products.length !== 1 ? "s" : ""} con precio confirmado en Costa Rica.
          </>
        )}
      </p>

      {detail && first && (
        <section className="mt-8 rounded-2xl border border-ink-200 bg-white p-6">
          <h2 className="text-base font-semibold text-ink-900">Precio actual de referencia en Costa Rica</h2>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
            <span className="text-3xl font-bold tabular-nums tracking-tight text-ink-900">
              <span className="align-top text-lg text-ink-500">₡</span>
              {first.price !== null && first.price !== undefined ? Number(first.price).toLocaleString("es-CR", { maximumFractionDigits: 0 }) : "—"}
            </span>
            <PriceChange change={first.change} percent={first.percentChange} direction={first.direction} />
          </div>
          <p className="mt-2 text-xs text-ink-400">{first.product} ({first.presentation}) · {formatCRC(first.price ?? undefined)} · {first.store ?? "Costa Rica"}</p>
          <p className="mt-1 text-xs text-ink-400">Registrado {first.panelDate ? formatDateCR(first.panelDate, { withTime: true }) : "—"} · Costa Rica (CRC)</p>
          <Link to={`/productos/${detail.slug}`} className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline">
            Ver detalle y historial del producto →
          </Link>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold tracking-tight text-ink-900">Productos confirmados en Costa Rica</h2>
        {products.length ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={cardFromSummary(p, bySlug.get(p.slug))} />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="mt-4 text-sm text-ink-500">
              Aún no contamos con datos confirmados para esta consulta en Costa Rica. Mientras se confirman fuentes del país, no publicamos precios no verificados.
            </p>
          )
        )}
      </section>

      <section className="mt-10 border-t border-ink-200 pt-6">
        <h2 className="text-sm font-semibold text-ink-700">Otras consultas de precios en Costa Rica</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {OTHER_ITEMS.filter((x) => x.slug !== slug).map((x) => (
            <Link key={x.slug} to={`/precios/${x.slug}`} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600">
              {x.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

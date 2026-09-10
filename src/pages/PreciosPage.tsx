import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { provinceSlug } from "@/pages/util";

const PRODUCTS = [
  { title: "Precio del arroz en Costa Rica", href: "/precios/arroz-costa-rica" },
  { title: "Precio de los huevos en Costa Rica", href: "/precios/huevos-costa-rica" },
  { title: "Precio de la leche en Costa Rica", href: "/precios/leche-costa-rica" },
  { title: "Precio de los frijoles en Costa Rica", href: "/precios/frijoles-costa-rica" },
  { title: "Precio del pollo en Costa Rica", href: "/precios/pollo-costa-rica" },
  { title: "Precio del café en Costa Rica", href: "/precios/cafe-costa-rica" },
];

const PROVINCES = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"].map((p) => ({
  title: `Precios en ${p}, Costa Rica`,
  href: `/precios/${provinceSlug(p)}`,
}));

export function PreciosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Precios en Costa Rica" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Precios en Costa Rica</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
          Páginas con datos reales de precios del mercado costarricense, en colones (CRC). Solo se publican consultas con fuentes confirmadas dentro de Costa Rica.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Por producto</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.href}>
              <Link to={p.href} className="block rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-ink-900">Por provincia de Costa Rica</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROVINCES.map((p) => (
            <li key={p.href}>
              <Link to={p.href} className="block rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
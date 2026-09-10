import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SearchBar } from "@/components/ui/search-bar";

const STEPS = [
  { n: "01", title: "Buscás el producto", body: "Escribís el nombre de un producto, marca, supermercado o provincia de Costa Rica. La búsqueda tolera errores ortográficos y nombres usados en el país." },
  { n: "02", title: "Confirmamos que se vende en Costa Rica", body: "Cada producto debe tener una fuente costarricense que confirme su venta, precio o disponibilidad dentro del país. Nunca mostramos datos de otros mercados." },
  { n: "03", title: "Ves el precio en colones (CRC)", body: "El precio se presenta siempre en colones costarricenses, indicando el comercio, la sucursal y la fecha de captura dentro de Costa Rica." },
  { n: "04", title: "Comparás y revisás el historial", body: "Podés ver cuánto subió o bajó en Costa Rica, comparar entre supermercados del país y revisar el historial de precio en el tiempo." },
];

export function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Cómo funciona" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">¿Cómo funciona?</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
          Somos una plataforma de información sobre precios del mercado costarricense. No vendemos productos ni procesamos pagos: recopilamos, validamos y publicamos precios de productos disponibles en Costa Rica, en colones (CRC).
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {STEPS.map((s) => (
          <div key={s.n} className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 font-bold text-white">{s.n}</span>
            <div>
              <h2 className="text-base font-semibold text-ink-900">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <h2 className="text-lg font-semibold text-ink-900">Probá buscar un producto en Costa Rica</h2>
        <p className="mt-1 text-sm text-ink-600">Por ejemplo: “huevos”, “precio del arroz en San José” o “leche en Automercado”.</p>
        <div className="mt-4"><SearchBar /></div>
      </div>
    </div>
  );
}
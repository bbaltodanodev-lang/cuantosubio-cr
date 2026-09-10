import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const SECTIONS = [
  { title: "Recolección de precios en Costa Rica", body: "Recopilamos precios desde fuentes que operan dentro de Costa Rica: supermercados con sucursales en el país, comercios costarricenses, catálogos en colones, APIs oficiales y datos públicos. Cada captura guarda fecha y hora en zona horaria America/Costa_Rica." },
  { title: "Validación territorial obligatoria", body: "Antes de publicar o indexar un dato se verifica que: el país es Costa Rica, la moneda es CRC, el comercio opera en Costa Rica, la ubicación corresponde a una provincia o cantón del país y la fuente no proviene de otro mercado. Ningún registro se muestra sin país asociado." },
  { title: "Identificación y normalización de productos", body: "Los productos se identifican por nombre normalizado, marca, presentación, cantidad y unidad. Se utiliza GTIN/SKU cuando está disponible. Dos presentaciones distintas (por ejemplo huevos de 12 y de 30 unidades) no se mezclan en una misma comparación." },
  { title: "Cálculo de la variación", body: "El cambio absoluto es precio_actual − precio_anterior, y el porcentaje es ((actual − anterior) / anterior) × 100. Solo se comparan precios observados dentro de Costa Rica para la misma presentación y comercio. Si no hay precio anterior, se indica “sin historial suficiente en Costa Rica” en lugar de mostrar 0%." },
  { title: "Promociones y disponibilidad", body: "Diferenciamos el precio normal del precio promocional, por membresía, por volumen o exclusivo de sucursal, y nunca los comparamos silenciosamente. La disponibilidad se registra como disponible, agotado, no encontrado o desconocido en Costa Rica." },
  { title: "Estados de confianza", body: "Cada dato se clasifica como Verificado, Reciente, Histórico, Anómalo o No confirmado territorialmente. Los datos sin confirmación territorial nunca se muestran como precio válido de Costa Rica." },
  { title: "Exclusión de datos de otros países", body: "Un producto internacional solo se incluye si existe una tienda, sucursal, catálogo o fuente dentro de Costa Rica que confirme su venta en el país. Nunca convertimos precios extranjeros a colones para presentarlos como precios costarricenses." },
  { title: "Control de calidad y anomalías", body: "Se valida que todo precio sea mayor que cero, esté en CRC y corresponda al producto y presentación correctos. Cambios atípicos dentro del historial costarricense se marcan para revisión y no se reportan como verificación definitiva." },
  { title: "Canasta básica: alcance estadístico", body: "La Canasta Básica Alimentaria del INEC es una referencia estadística construida con alimentos y cantidades que cubren necesidades calóricas promedio. No es una lista universal de compras ni una dieta ideal completa para cada hogar. Este sitio presenta fichas monitoreadas para comparación y deja esa diferencia visible." },
  { title: "IVA, canasta tributaria y precios sin impuesto", body: "El total publicado se conserva como referencia principal. Cuando mostramos “sin IVA”, calculamos una base matemática a partir del total usando el escenario seleccionado: 13% general, 1% de canasta tributaria si el bien y su presentación están legalmente incluidos, o 0% exento. No asignamos una tarifa legal definitiva sin verificar la lista vigente." },
];

export function MetodologiaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Metodología" }]} />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Metodología</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
          Así recopilamos y publicamos información de precios del mercado costarricense, con trazabilidad territorial completa.
        </p>
      </div>
      <div className="mt-8 space-y-6">
        {SECTIONS.map((s, i) => (
          <section key={i} className="rounded-2xl border border-ink-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-ink-900">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
          </section>
        ))}
      </div>
      <section className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
        <h2 className="text-lg font-semibold text-ink-900">Fuentes oficiales para revisar la tasa y la canasta</h2>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href="https://www.hacienda.go.cr/docs/TarifasdelIVA.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">Tarifas del IVA · Hacienda ↗</a>
          <a href="https://www.pgrweb.go.cr/DOCS/NORMAS/1/VIGENTE/S/2020-2029/2020-2024/2024/18CE0/1672DD.HTML" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">Normativa de canasta tributaria · PGR ↗</a>
          <a href="https://admin.inec.cr/node/46208" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">Serie CBA · INEC ↗</a>
        </div>
      </section>
    </div>
  );
}

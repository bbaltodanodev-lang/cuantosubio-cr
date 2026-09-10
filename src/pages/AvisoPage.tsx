import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function AvisoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Aviso de datos" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900">Aviso de datos</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-600">
        <p>
          <strong className="text-ink-800">¿Cuánto subió.cr?</strong> es una plataforma de información sobre precios del mercado costarricense. Publicamos precios observados dentro de Costa Rica, expresados en colones (CRC).
        </p>
        <p>
          No recopilamos precios de otros países ni los convertimos a colones para presentarlos como datos costarricenses. Todo dato publicado debe responder de dónde salió, en qué comercio de Costa Rica se encontró, cuándo se capturó y si está expresado en colones.
        </p>
        <p>
          Cuando corresponda, vinculamos a la fuente original. Los nombres comerciales y marcas pertenecen a sus respectivos dueños. No copiamos contenido protegido de forma innecesaria y respetamos los términos de uso de cada fuente.
        </p>
      </div>
    </div>
  );
}
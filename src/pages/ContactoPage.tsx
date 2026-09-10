import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contacto" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900">Contacto</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-600">
        <p>¿Encontraste un error, querés proponer una fuente de Costa Rica o reportar un precio que cambió en tu supermercado?</p>
        <p>Contanos sobre precios de productos en Costa Rica. Toda colaboración debe corresponder a comercios y productos del país, en colones (CRC).</p>
        <p>Correo: <a href="mailto:contacto@cuantosubio.cr" className="font-medium text-brand-600 hover:underline">contacto@cuantosubio.cr</a></p>
      </div>
    </div>
  );
}
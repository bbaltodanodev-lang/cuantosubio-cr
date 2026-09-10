import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Privacidad" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900">Privacidad</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-600">
        <p>Esta plataforma consulta precios de productos en Costa Rica y no requiere registro para su uso principal.</p>
        <p>Si activás la geolocalización para buscar “precios cerca de mí”, se solicita permiso explícito y no se almacena tu ubicación precisa más allá de lo necesario. Si se detecta una ubicación fuera de Costa Rica, no se muestran resultados locales costarricenses como si fueran de otro país.</p>
        <p>No exponemos credenciales, claves ni datos personales. Toda la infraestructura de datos de precios se limita a información de Costa Rica en colones (CRC).</p>
      </div>
    </div>
  );
}
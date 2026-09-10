import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Términos" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900">Términos de uso</h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-600">
        <p>
          <strong className="text-ink-800">¿Cuánto subió.cr?</strong> es una plataforma informativa de precios del mercado costarricense. No vende productos, no procesa pagos y no constituye asesoría financiera ni comercial.
        </p>
        <p>
          Los precios publicados pueden variar según la fecha de captura, la sucursal y el estado de promociones dentro de Costa Rica. La fecha real de cada captura siempre se muestra y nunca se oculta.
        </p>
        <p>
          Al usar la plataforma aceptás que los datos tienen fines informativos y que confirmes el precio final directamente con el comercio en Costa Rica antes de realizar una compra.
        </p>
      </div>
    </div>
  );
}
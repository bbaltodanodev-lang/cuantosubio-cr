import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PAYPAL_DONATE_URL,
  SINPE_PHONE,
  SITE_NAME,
} from "@/lib/site";

function getSafePayPalUrl(value: string | null): string {
  const fallback = "https://www.paypal.me/bernaljbl";
  const candidate = value?.trim() || fallback;
  try {
    const url = new URL(candidate);
    const isPayPalHost = url.hostname === "paypal.com" || url.hostname.endsWith(".paypal.com") || url.hostname === "paypal.me";
    return url.protocol === "https:" && isPayPalHost ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

function MethodLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-flex h-10 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-1.5">
      <img src={src} alt={alt} className="max-h-7 max-w-full object-contain" />
    </span>
  );
}

function formatSinpePhone(value: string): string {
  return value.length === 8 ? `${value.slice(0, 4)} ${value.slice(4)}` : value;
}

const PROVINCES = [
  { name: "San José", href: "/san-jose" },
  { name: "Alajuela", href: "/alajuela" },
  { name: "Cartago", href: "/cartago" },
  { name: "Heredia", href: "/heredia" },
  { name: "Guanacaste", href: "/guanacaste" },
  { name: "Puntarenas", href: "/puntarenas" },
  { name: "Limón", href: "/limon" },
];

const PLATFORM_LINKS = [
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Metodología", href: "/metodologia" },
  { label: "Cobertura nacional", href: "/cobertura" },
  { label: "Supermercados monitoreados", href: "/supermercados" },
  { label: "Fuentes públicas", href: "/fuentes" },
];

const EXPLORE_LINKS = [
  { label: "Catálogo de productos", href: "/productos" },
  { label: "Canasta Básica", href: "/canasta-basica" },
  { label: "Lo que más subió", href: "/subidas" },
  { label: "Lo que más bajó", href: "/bajadas" },
  { label: "Directorio de comercios", href: "/comercios" },
];

export function Footer() {
  const paypalUrl = getSafePayPalUrl(PAYPAL_DONATE_URL);
  const [showSinpe, setShowSinpe] = useState(false);
  const [copied, setCopied] = useState<"sinpe" | null>(null);

  const copySupportValue = async (value: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied("sinpe");
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* El portapapeles puede estar bloqueado por el navegador. */
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/img/brand/logo.webp"
                alt="Logo CuántoSubió.cr"
                className="h-11 w-11 object-contain drop-shadow-xs"
                width="44"
                height="44"
              />
              <span className="text-xl font-black tracking-tight text-slate-950">
                ¿Cuánto<span className="text-emerald-600">Subió</span>
                <span className="text-emerald-700">.cr</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
              Plataforma costarricense de consulta, comparación e historial de precios de supermercados en colones (CRC). Ayudamos a las familias a tomar decisiones informadas sobre dónde comprar más barato.
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Aviso: Los precios y la disponibilidad corresponden a la última captura y pueden variar por sucursal o cambiar en cualquier momento.
            </p>
          </div>

          {/* Provincias */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Provincias
            </p>
            <ul className="mt-3 space-y-2">
              {PROVINCES.map((p) => (
                <li key={p.href}>
                  <Link
                    to={p.href}
                    className="text-xs font-medium text-slate-600 transition-colors hover:text-emerald-600"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explorar */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Explorar
            </p>
            <ul className="mt-3 space-y-2">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-xs font-medium text-slate-600 transition-colors hover:text-emerald-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Plataforma
            </p>
            <ul className="mt-3 space-y-2">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-xs font-medium text-slate-600 transition-colors hover:text-emerald-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section
          aria-labelledby="support-title"
          className="mt-10 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 p-5 sm:p-6"
        >
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                Apoyo voluntario
              </p>
              <h2 id="support-title" className="mt-1 text-xl font-black tracking-tight text-slate-950">
                ¿Querés apoyar CuántoSubió.cr?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                CuántoSubió.cr es un proyecto independiente creado para facilitar el acceso y la comparación de precios en Costa Rica. Si esta herramienta te resulta útil y deseas apoyar su mantenimiento, infraestructura y desarrollo, puedes realizar una contribución voluntaria.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                El acceso a la plataforma no depende de realizar una donación. Las contribuciones son completamente voluntarias.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Opciones de apoyo">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3">
                <MethodLogo src="/img/payment/paypal.svg" alt="Logo de PayPal" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">PayPal</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">Donación segura mediante PayPal</p>
                </div>
                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Donar mediante PayPal"
                  className="shrink-0 rounded-xl bg-[#003087] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#001f5c]"
                >
                  Donar ↗
                </a>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3">
                <MethodLogo src="/img/payment/sinpe-movil-display.png" alt="Logo de SINPE Móvil" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">SINPE Móvil</p>
                  {showSinpe ? (
                    <div className="mt-1 flex flex-wrap items-center gap-1.5" aria-live="polite">
                      <span className="text-[11px] font-semibold text-slate-600">{formatSinpePhone(SINPE_PHONE)}</span>
                      <button
                        type="button"
                        onClick={() => copySupportValue(SINPE_PHONE)}
                        className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700"
                      >
                        {copied === "sinpe" ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                  ) : null}
                </div>
                {!showSinpe ? (
                  <button
                    type="button"
                    onClick={() => setShowSinpe(true)}
                    className="shrink-0 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
                  >
                    Mostrar número
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE_NAME} · Precios en colones (CRC) · Costa Rica
          </p>
          <ul className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
            <li>
              <Link to="/privacidad" className="hover:text-emerald-600">
                Privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" className="hover:text-emerald-600">
                Términos
              </Link>
            </li>
            <li>
              <Link to="/aviso-de-datos" className="hover:text-emerald-600">
                Aviso de datos
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-emerald-600">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

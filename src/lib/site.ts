type EnvLike = Record<string, string | undefined>;

function getEnv(name: string): string | undefined {
  try {
    const meta = (import.meta as unknown as { env?: EnvLike })?.env;
    if (meta && meta[name] !== undefined) return meta[name];
  } catch {
    /* import.meta no disponible fuera del bundle */
  }
  try {
    if (typeof process !== "undefined" && process.env && process.env[name] !== undefined) {
      return process.env[name];
    }
  } catch {
    /* proceso sin accesso a process.env */
  }
  return undefined;
}

export const SITE_NAME = "¿Cuánto subió.cr?";
export const SITE_TAGLINE = "Precios de productos en Costa Rica, comparados y actualizados desde múltiples fuentes del país.";
export const SITE_URL = getEnv("VITE_SITE_URL") ?? getEnv("NEXT_PUBLIC_SITE_URL") ?? "https://www.cuantosubio.cr";
export const CURRENCY = "CRC";
export const CURRENCY_SYMBOL = "₡";
export const COUNTRY = "Costa Rica";
export const COUNTRY_CODE = "CR";

// Apoyo: PayPal solo se muestra como un enlace de donación; no se publica ningún correo personal.
export const PAYPAL_DONATE_URL = getEnv("VITE_PAYPAL_DONATE_URL")?.trim() || getEnv("PAYPAL_DONATE_URL")?.trim() || "https://www.paypal.me/bernaljbl";
export const SINPE_PHONE = getEnv("VITE_SINPE_PHONE")?.replace(/\s+/g, "") || getEnv("SINPE_PHONE")?.replace(/\s+/g, "") || "62037705";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Inicio", href: "/" },
  { label: "Productos en Costa Rica", href: "/productos" },
  { label: "Canasta Básica", href: "/canasta-basica" },
  { label: "Supermercados", href: "/supermercados" },
  { label: "Comercios", href: "/comercios" },
  { label: "Lo que más subió", href: "/subidas" },
  { label: "Lo que más bajó", href: "/bajadas" },
  { label: "Cómo funciona", href: "/como-funciona" },
];

export const PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

export const DEMO_MODE =
  getEnv("VITE_DEMO_MODE") === "true" ||
  getEnv("NEXT_PUBLIC_DEMO_MODE") === "true" ||
  getEnv("DEMO_MODE") === "true";

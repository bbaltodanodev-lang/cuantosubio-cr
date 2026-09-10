import { useState, useMemo } from "react";

const CATEGORY_ICONS: Record<string, string> = {
  Arroz: "🌾",
  Granos: "🌾",
  Frijoles: "🫘",
  Lácteos: "🥛",
  Huevos: "🥚",
  Café: "☕",
  Pollo: "🍗",
  Carnes: "🥩",
  Aceites: "🌻",
  Enlatados: "🐟",
  Pastas: "🍝",
  "Papel higiénico": "🧻",
  Higiene: "🪥",
  "Higiene personal": "🧼",
  Detergentes: "🧺",
  Limpieza: "🧹",
  Frutas: "🍌",
  Verduras: "🍅",
  Condimentos: "🧂",
  Cereales: "🥣",
  Mascotas: "🐕",
  "Alimento para perros": "🐕",
  "Alimento para gatos": "🐈",
};

export function ProductImage({
  alt,
  src,
  slug,
  category,
  className = "",
  sizes,
}: {
  alt: string;
  src?: string | null;
  slug?: string;
  category?: string;
  className?: string;
  sizes?: string;
}) {
  const [error, setError] = useState(false);

  // Determinar la mejor ruta de imagen verificada
  const primarySrc = useMemo(() => {
    if (src && !src.startsWith("data:") && !src.includes("/img/ph/")) return src;
    if (slug) return `/img/products/${slug}.webp`;
    return null;
  }, [src, slug]);

  const catIcon = category ? (CATEGORY_ICONS[category] ?? "🛒") : "🛒";

  if (!primarySrc || error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-50 text-slate-400 select-none ${className}`}
        aria-label={alt}
      >
        <span className="text-4xl filter drop-shadow-sm mb-1">{catIcon}</span>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {category ?? "Abarrotes"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={primarySrc}
      alt={alt}
      sizes={sizes}
      className={`object-contain transition-opacity duration-200 ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      draggable={false}
    />
  );
}

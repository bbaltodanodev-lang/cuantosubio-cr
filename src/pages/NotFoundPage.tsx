import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "@/components/ui/search-bar";
import { useSeo } from "@/lib/seo";

export function NotFoundPage() {
  const { pathname } = useLocation();
  useSeo(pathname, {
    title: "Página no encontrada",
    description: "No encontramos esta página. Buscá un producto disponible en Costa Rica o revisá el catálogo de precios del país.",
    robots: "noindex, follow",
  });
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink-900">Página no encontrada</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">
          No encontramos esta página. Podés buscar un producto disponible en Costa Rica o revisar el catálogo de precios del país.
        </p>
      </div>
      <div className="w-full max-w-md">
        <SearchBar />
      </div>
      <div className="flex gap-3">
        <Link to="/" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
          Ir al inicio
        </Link>
        <Link to="/productos" className="rounded-lg border border-ink-300 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600">
          Ver productos en Costa Rica
        </Link>
      </div>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { normalize } from "@/lib/core/normalize";

type Suggestion = { term: string; type: string; url: string };

const STATIC_EXAMPLES = [
  { term: "Huevos", type: "producto", url: "/productos/huevos-30-unidades" },
  { term: "Arroz", type: "producto", url: "/productos/arroz-blanco-1-8-kg" },
  { term: "Leche entera", type: "producto", url: "/productos/leche-entera-1-l" },
  { term: "Café molido", type: "producto", url: "/productos/cafe-molido-340-g" },
  { term: "Canasta Básica", type: "categoría", url: "/canasta-basica" },
  { term: "Walmart Costa Rica", type: "supermercado", url: "/supermercados/walmart-costa-rica" },
  { term: "Automercado", type: "supermercado", url: "/supermercados/automercado" },
  { term: "MasxMenos", type: "supermercado", url: "/supermercados/masxmenos" },
];

const PLACEHOLDERS = [
  "¿Qué producto querés consultar? Ej: arroz, huevos, leche…",
  "Busca por producto, marca o supermercado…",
];

function typeLabel(t: string): string {
  switch (t) {
    case "producto": return "Producto";
    case "categoría": return "Categoría";
    case "marca": return "Marca";
    case "supermercado": return "Supermercado";
    case "provincia": return "Provincia";
    case "comercio": return "Comercio";
    default: return "Resultado";
  }
}

export function SearchBar({
  size = "lg",
  autoFocus = false,
  defaultValue = "",
  placeholder,
}: {
  size?: "sm" | "lg";
  autoFocus?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (q.trim().length < 2) {
      setSuggestions(q.trim() ? STATIC_EXAMPLES.filter((s) => normalize(s.term).startsWith(normalize(q))) : []);
      return;
    }
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) return;
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
      } catch {
        setSuggestions(STATIC_EXAMPLES);
      }
    }, 120);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [q]);

  function submit(term: string) {
    const t = (term ?? q).trim();
    if (!t) return;
    setOpen(false);
    navigate(`/productos?q=${encodeURIComponent(t)}`);
  }

  const show = open && focused && q.trim().length >= 0;
  const list = q.trim().length >= 2 ? suggestions : suggestions;

  return (
    <div ref={boxRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit(q);
        }}
        className={`flex items-center gap-2 rounded-2xl border border-ink-300 bg-white shadow-sm transition-shadow focus-within:border-brand-500 focus-within:shadow-md ${
          size === "lg" ? "px-4 py-3" : "px-3 py-2"
        }`}
      >
        <svg viewBox="0 0 24 24" className={`shrink-0 text-ink-400 ${size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setFocused(true);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit(q);
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder ?? PLACEHOLDERS[placeholderIdx]}
          autoFocus={autoFocus}
          aria-label="Buscar productos, marcas o supermercados en Costa Rica"
          autoComplete="off"
          className={`w-full bg-transparent text-ink-900 outline-none placeholder:text-ink-400 ${size === "lg" ? "text-base" : "text-sm"}`}
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Buscar
        </button>
      </form>

      {show && (
        <div
          role="listbox"
          aria-label="Resultados de búsqueda en Costa Rica"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[24rem] overflow-auto rounded-xl border border-ink-200 bg-white py-1 shadow-xl"
        >
          {list.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink-500">No encontramos resultados confirmados para Costa Rica.</p>
          ) : (
            list.map((s, i) => (
              <button
                key={`${s.url}-${i}`}
                role="option"
                onMouseDown={(e) => {
                  e.preventDefault();
                  navigate(s.url);
                  setOpen(false);
                }}
                onClick={() => {
                  navigate(s.url);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-brand-50"
              >
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    {s.type === "producto" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h.01" /><path d="M6 5c0-1.7 3-3 6-3s6 1.3 6 3" /><path d="M6 5v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5" /></svg>
                    ) : s.type === "supermercado" || s.type === "comercio" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>
                    ) : s.type === "provincia" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 7h8M12 7v10" /></svg>
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink-800">{s.term}</span>
                    <span className="block text-xs text-ink-400">{typeLabel(s.type)}</span>
                  </span>
                </span>
                <span aria-hidden="true" className="text-ink-300">→</span>
              </button>
            ))
          )}
          {q.trim().length >= 2 && (
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                submit(q);
              }}
              className="flex w-full items-center gap-2 border-t border-ink-100 px-4 py-2.5 text-left text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
            >
              Ver todos los resultados para “{q}” en Costa Rica →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
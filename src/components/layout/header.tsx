import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE_NAME } from "@/lib/site";

const HEADER_LINKS = [
  { href: "/", label: "Hogar" },
  { href: "/productos", label: "Productos" },
  { href: "/canasta-basica", label: "Canasta básica" },
  { href: "/supermercados", label: "Supermercados" },
  { href: "/subidas", label: "Lo que subió" },
  { href: "/bajadas", label: "Lo que bajó" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation().pathname;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-95" aria-label={`${SITE_NAME} — inicio`}>
          <img
            src="/img/brand/logo.webp"
            alt="Logo CuántoSubió.cr"
            className="h-10 w-10 object-contain drop-shadow-xs"
            width="40"
            height="40"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-950 leading-none">
              ¿Cuánto<span className="text-emerald-600">Subió</span>
              <span className="text-emerald-700">.cr</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide">
              Precios de supermercados
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {HEADER_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(l.href)
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <nav aria-label="Menú móvil" className="border-t border-slate-200 bg-white md:hidden animate-in slide-in-from-top-2 duration-200">
          <ul className="mx-auto max-w-7xl px-4 py-3 space-y-1 sm:px-6">
            {HEADER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive(l.href) ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

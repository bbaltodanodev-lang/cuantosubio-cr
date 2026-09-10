import { Link } from "react-router-dom";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: "Inicio", href: "/" }, ...items];
  return (
    <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-1 text-xs text-ink-500">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="text-ink-300">›</span>}
            {c.href && !isLast ? (
              <Link to={c.href} className="transition-colors hover:text-brand-600 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={isLast ? "font-medium text-ink-800" : ""}>
                {c.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
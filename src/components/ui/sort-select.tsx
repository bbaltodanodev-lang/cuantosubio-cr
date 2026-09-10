import { useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const OPTIONS: { value: string; label: string }[] = [
  { value: "name-asc", label: "Alfabético (A–Z)" },
  { value: "name-desc", label: "Alfabético (Z–A)" },
  { value: "price-asc", label: "Menor precio en Costa Rica" },
  { value: "price-desc", label: "Mayor precio en Costa Rica" },
  { value: "rise", label: "Mayor subida en Costa Rica" },
  { value: "drop", label: "Mayor bajada en Costa Rica" },
];

export function SortSelect({ value }: { value: string }) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [searchParams] = useSearchParams();

  const onChange = useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "name-asc") params.delete("sort");
      else params.set("sort", next);
      params.delete("page");
      const qs = params.toString();
      navigate(qs ? `${pathname}?${qs}` : pathname, { replace: true });
    },
    [pathname, searchParams, navigate],
  );

  return (
    <>
      <label className="sr-only" htmlFor="sort">Ordenamiento</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-ink-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-brand-500"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </>
  );
}
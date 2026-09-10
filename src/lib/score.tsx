import { useEffect, useMemo, useState, type ReactNode } from "react";
import { api, type PriceSnapshotEntry } from "@/lib/api";
import { ScoreContext, type ScoreContextValue } from "@/lib/score-context";

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<PriceSnapshotEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [market, setMarket] = useState<Awaited<ReturnType<typeof api.prices>>["market"]>(undefined);

  useEffect(() => {
    let active = true;
    api
      .prices({ limit: 300 })
      .then((data) => {
        if (!active) return;
        setEntries(data.prices);
        setMarket(data.market);
        setError(null);
      })
      .catch(() => {
        if (active) setError("No fue posible cargar los precios de Costa Rica en este momento.");
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<ScoreContextValue>(() => {
    const bySlug = new Map<string, PriceSnapshotEntry>();
    for (const e of entries) bySlug.set(e.slug, e);
    const withPrice = entries.filter((e) => e.price !== null && e.price !== undefined);
    const tallest = withPrice
      .filter((e) => (e.percentChange ?? 0) > 0)
      .sort((a, b) => (b.percentChange ?? 0) - (a.percentChange ?? 0));
    const falls = withPrice
      .filter((e) => (e.percentChange ?? 0) < 0)
      .sort((a, b) => (a.percentChange ?? 0) - (b.percentChange ?? 0));
    return { entries, bySlug, tallest, falls, loading, error, market: market ?? null };
  }, [entries, loading, error, market]);

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}

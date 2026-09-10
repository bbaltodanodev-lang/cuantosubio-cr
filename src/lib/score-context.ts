import { createContext } from "react";
import type { MarketStatus, PriceSnapshotEntry } from "@/lib/api";

export type ScoreContextValue = {
  entries: PriceSnapshotEntry[];
  bySlug: Map<string, PriceSnapshotEntry>;
  tallest: PriceSnapshotEntry[];
  falls: PriceSnapshotEntry[];
  loading: boolean;
  error: string | null;
  market: MarketStatus | null;
};

export const ScoreContext = createContext<ScoreContextValue | null>(null);

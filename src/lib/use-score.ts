import { useContext } from "react";
import { ScoreContext } from "@/lib/score-context";

export function useScore() {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error("useScore debe usarse dentro de <ScoreProvider>");
  return ctx;
}

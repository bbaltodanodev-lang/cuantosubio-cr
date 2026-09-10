import type { PriceSnapshotEntry, ProductSummary } from "@/lib/api";
import type { ProductCardData } from "@/components/product/product-card";

const ORIGINAL_STORE_LOGOS = {
  walmart: "/img/supermercados/originales/walmart-official.png",
  automercado: "/img/supermercados/originales/automercado-display.png",
  masxmenos: "/img/supermercados/originales/masxmenos-display.png",
  maxipali: "/img/supermercados/originales/maxipali-display.png",
  pali: "/img/supermercados/originales/pali-display.png",
  megasuper: "/img/supermercados/originales/megasuper-display.png",
  pricesmart: "/img/supermercados/originales/pricesmart-display.png",
} as const;

export function getStoreLogo(storeName?: string | null): string | null {
  if (!storeName) return null;
  const s = storeName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (s.includes("walmart")) return ORIGINAL_STORE_LOGOS.walmart;
  if (s.includes("auto") || s.includes("automercado")) return ORIGINAL_STORE_LOGOS.automercado;
  if (s.includes("masxmenos") || s.includes("mas x menos")) return ORIGINAL_STORE_LOGOS.masxmenos;
  if (s.includes("maxipali") || s.includes("maxi pali")) return ORIGINAL_STORE_LOGOS.maxipali;
  if (s.includes("pali")) return ORIGINAL_STORE_LOGOS.pali;
  if (s.includes("mega") || s.includes("megasuper")) return ORIGINAL_STORE_LOGOS.megasuper;
  if (s.includes("pricesmart")) return ORIGINAL_STORE_LOGOS.pricesmart;
  return null;
}

export function toCard(e: PriceSnapshotEntry): ProductCardData {
  return {
    name: e.product,
    slug: e.slug,
    brand: null,
    presentation: e.presentation,
    price: e.price,
    change: e.change,
    percent: e.percentChange,
    direction: e.direction,
    store: e.store,
    storeLogo: getStoreLogo(e.store),
    panelDate: e.panelDate,
    imageUrl: e.imageUrl ?? `/img/products/${e.slug}.webp`,
  };
}

export function cardFromSummary(summary: ProductSummary, entry?: PriceSnapshotEntry): ProductCardData {
  const store = entry?.store ?? null;
  return {
    name: summary.name,
    slug: summary.slug,
    brand: summary.brand,
    category: summary.category,
    presentation: summary.presentation,
    price: entry?.price,
    change: entry?.change ?? null,
    percent: entry?.percentChange ?? null,
    direction: entry?.direction ?? null,
    store,
    storeLogo: getStoreLogo(store),
    panelDate: entry?.panelDate ?? null,
    imageUrl: summary.imageUrl ?? `/img/products/${summary.slug}.webp`,
    isCanastaBasica: summary.isCanastaBasica,
    quantity: summary.quantity,
    unit: summary.unit,
  };
}

export function provinceSlug(name: string): string {
  const norm = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return norm;
}

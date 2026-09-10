import { productos } from "./demo-data";
import type { ProductSeed } from "../../../prisma/demo-data";

const WALMART_API = "https://www.walmart.co.cr/api/catalog_system/pub/products/search";
const WALMART_SITE = "https://www.walmart.co.cr";
const SOURCE_NAME = "Walmart Costa Rica";
const CACHE_TTL_MS = Number(process.env.LIVE_MARKET_CACHE_TTL_MS ?? 15 * 60 * 1000);
const ERROR_CACHE_TTL_MS = 2 * 60 * 1000;
const REQUEST_TIMEOUT_MS = Number(process.env.LIVE_MARKET_TIMEOUT_MS ?? 7_000);
const LIVE_ENABLED = process.env.LIVE_MARKET_ENABLED !== "false";

type WalmartOffer = {
  Price?: unknown;
  ListPrice?: unknown;
  PriceWithoutDiscount?: unknown;
  IsAvailable?: unknown;
  AvailableQuantity?: unknown;
};

type WalmartItem = {
  itemId?: string;
  images?: { imageUrl?: string; imageText?: string }[];
  sellers?: { commertialOffer?: WalmartOffer }[];
};

type WalmartProduct = {
  productName?: string;
  brand?: string;
  linkText?: string;
  productReference?: string;
  items?: WalmartItem[];
};

export type LiveMarketProduct = {
  slug: string;
  amount: number;
  listAmount: number | null;
  imageUrl: string | null;
  productName: string;
  externalSku: string | null;
  productUrl: string;
  sourceUrl: string;
  storeName: string;
  storeSlug: string;
  capturedAt: Date;
  availability: "AVAILABLE" | "OUT_OF_STOCK" | "UNKNOWN";
  promotionStatus: "NORMAL" | "PROMOTIONAL";
};

export type LiveMarketStatus = {
  enabled: boolean;
  mode: "live" | "fallback";
  source: string | null;
  sourceUrl: string | null;
  capturedAt: Date | null;
  requestedProducts: number;
  matchedProducts: number;
  failedQueries: number;
  message: string;
};

export type LiveMarketSnapshot = {
  products: Map<string, LiveMarketProduct>;
  status: LiveMarketStatus;
};

const QUERY_OVERRIDES: Record<string, string> = {
  "arroz-blanco-1-8-kg": "arroz tio pelon 99 1.8 kg",
  "arroz-integral-1-kg": "arroz integral tio pelon 1 kg",
  "frijoles-negros-1-kg": "frijoles negros 1 kg",
  "frijoles-rojos-1-kg": "frijoles rojos 1 kg",
  "leche-entera-1-l": "leche entera dos pinos uat 1 litro",
  "leche-semidescremada-1-l": "leche dos pinos semidescremada 1 l",
  "huevos-30-unidades": "huevos 30 unidades",
  "huevos-12-unidades": "huevo gallina 12 unidades",
  "cafe-molido-340-g": "cafe britt gourmet 340 g",
  "cafe-clasico-500-g": "cafe 1820 clasico 500 g",
  "cafe-soluble-170-g": "nescafe clasico 170 g",
  "pollo-entero-1-kg": "pollo entero don cristobal precio kilo",
  "pechuga-pollo-1-kg": "pechuga pollo entera don cristobal precio kilo",
  "aceite-girasol-1-l": "aceite clover girasol 900 ml",
  "aceite-vegetal-900-ml": "aceite capullo 900 ml",
  "atun-enlatado-140-g": "atun pronto 140 g",
  "pasta-spaghetti-500-g": "pasta espagueti roma no 7 500 g",
  "papel-higienico-12-rollos": "papel higienico scott 12 rollos",
  "detergente-polvo-1-2-kg": "detergente ariel polvo 1 kg",
  "queso-crema-250-g": "queso crema dos pinos 250 g",
  "banano-1-kg": "banano kilo",
  "tomate-1-kg": "tomate kilo",
  "sal-mesa-500-g": "sal sol 500 g",
  "azucar-1-kg": "azucar el viejo 1 kg",
  "salsa-lizano-700-ml": "salsa lizano 700 ml",
  "pasta-dental-125-g": "pasta dental colgate triple accion 150 ml",
  "cereal-caja-430-g": "kelloggs corn flakes 500 g",
  "comida-perros-3-kg": "pedigree adulto 3 kg",
};

const STOP_WORDS = new Set([
  "de", "del", "la", "el", "los", "las", "un", "una", "para", "con", "sin", "por",
  "marca", "producto", "fresco", "fresca", "tradicional", "especial", "completo", "adultos",
  "molido",
]);

const EXCLUDED_TERMS: Record<string, string[]> = {
  "arroz-blanco-1-8-kg": ["bio", "precocido"],
  "leche-entera-1-l": ["evaporada", "condensada", "delactomy", "polvo"],
  "azucar-1-kg": ["sin azucar", "yogurt", "yogur"],
  "cafe-soluble-170-g": ["ice", "descafeinado", "3 en 1"],
  "pollo-entero-1-kg": ["partido", "pechuga", "muslo", "alitas", "alas"],
  "pechuga-pollo-1-kg": ["partido", "muslo", "alitas", "nuggets", "empanizado"],
  "cereal-caja-430-g": ["empanizador", "rebozador"],
};

const REQUIRED_TERMS: Record<string, string[]> = {
  "cafe-soluble-170-g": ["clasico", "instantaneo"],
  "pollo-entero-1-kg": ["entero"],
  "pechuga-pollo-1-kg": ["pechuga"],
  "pasta-spaghetti-500-g": ["spaghetti", "espagueti"],
  "huevos-30-unidades": ["feliz"],
  "huevos-12-unidades": ["mediano"],
  "aceite-vegetal-900-ml": ["capullo"],
  "atun-enlatado-140-g": ["pronto"],
  "comida-perros-3-kg": ["pedigree"],
};

let cache: { expiresAt: number; snapshot: LiveMarketSnapshot } | null = null;
let inFlight: Promise<LiveMarketSnapshot> | null = null;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/,/g, ".");
}

function tokens(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9.]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

function numberValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function searchQuery(product: ProductSeed): string {
  return QUERY_OVERRIDES[product.slug] ?? `${product.marca ?? ""} ${product.nombre} ${product.presentacion}`.trim();
}

function expectedQuantity(product: ProductSeed): { value: number; unit: string } | null {
  const match = product.presentacion.match(/([\d.,]+)\s*(kg|g|ml|l|unidades?|rollos?)/i);
  if (!match) return null;
  const value = Number(match[1].replace(",", "."));
  if (!Number.isFinite(value)) return null;
  const unit = match[2].toLowerCase();
  if (unit === "kg") return { value: value * 1000, unit: "g" };
  if (unit === "l") return { value: value * 1000, unit: "ml" };
  if (unit.startsWith("unidad")) return { value, unit: "unidades" };
  if (unit.startsWith("rollo")) return { value, unit: "rollos" };
  return { value, unit };
}

function quantityScore(product: ProductSeed, candidateText: string): number {
  const expected = expectedQuantity(product);
  if (!expected) return 0;
  const text = normalize(candidateText);
  const numberToken = expected.value % 1 === 0 ? String(expected.value) : String(expected.value).replace(/\.0+$/, "");
  const decimalToken = (expected.value / (expected.unit === "g" ? 1000 : expected.unit === "ml" ? 1000 : 1))
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
  if (new RegExp(`(^|[^0-9])${numberToken.replace(".", "\\.")}(?=$|[^0-9])`).test(text)) return 7;
  if (new RegExp(`(^|[^0-9])${decimalToken.replace(".", "\\.")}(?=$|[^0-9])`).test(text)) return 6;
  if (expected.value === 1000 && /\b(kilo|kg)\b/.test(text)) return 4;
  if (expected.value === 1000 && expected.unit === "ml" && /\b(litro|litros|l)\b/.test(text)) return 4;
  return 0;
}

function scoreCandidate(product: ProductSeed, item: WalmartProduct): number {
  const candidateText = `${item.productName ?? ""} ${item.brand ?? ""}`;
  const normalizedCandidate = normalize(candidateText);
  if ((EXCLUDED_TERMS[product.slug] ?? []).some((term) => normalizedCandidate.includes(term))) return -100;
  const candidateTokens = new Set(tokens(candidateText));
  const nameTokens = tokens(`${product.nombre} ${product.subcategoria}`);
  const brandTokens = tokens(product.marca ?? "");
  let score = quantityScore(product, candidateText);

  for (const token of nameTokens) if (candidateTokens.has(token)) score += 2;
  for (const token of brandTokens) if (candidateTokens.has(token)) score += 4;
  if (brandTokens.length > 0 && brandTokens.every((token) => candidateTokens.has(token))) score += 5;
  return score;
}

function getOffer(item: WalmartItem): WalmartOffer | null {
  const offers = (item.sellers ?? []).map((seller) => seller.commertialOffer).filter(Boolean) as WalmartOffer[];
  return offers.find((offer) => offer.IsAvailable === true && (numberValue(offer.Price) ?? 0) > 0)
    ?? offers.find((offer) => (numberValue(offer.Price) ?? numberValue(offer.ListPrice) ?? 0) > 0)
    ?? null;
}

function bestProduct(product: ProductSeed, catalog: WalmartProduct[]): { item: WalmartProduct; offer: WalmartOffer; image: string | null } | null {
  const candidates = catalog
    .map((item) => {
      const offer = (item.items ?? []).map(getOffer).find(Boolean) ?? null;
      const image = item.items?.flatMap((entry) => entry.images ?? []).map((entry) => entry.imageUrl).find(Boolean) ?? null;
      const candidateText = `${item.productName ?? ""} ${item.brand ?? ""}`;
      const candidateTokens = new Set(tokens(candidateText));
      const semanticTokens = tokens(`${product.nombre} ${product.subcategoria}`);
      const requiredTerms = REQUIRED_TERMS[product.slug] ?? [];
      const normalizedCandidate = normalize(candidateText);
      const hasRequiredTerm = requiredTerms.length === 0 || requiredTerms.some((term) => normalizedCandidate.includes(term));
      const hasSemanticMatch = semanticTokens.some((token) => {
        if (candidateTokens.has(token)) return true;
        return token.endsWith("s") && candidateTokens.has(token.slice(0, -1));
      });
      const hasQuantityMatch = quantityScore(product, candidateText) > 0;
      return offer && image && hasSemanticMatch && hasQuantityMatch && hasRequiredTerm ? { item, offer, image, score: scoreCandidate(product, item) } : null;
    })
    .filter((value): value is { item: WalmartProduct; offer: WalmartOffer; image: string; score: number } => Boolean(value))
    .sort((a, b) => b.score - a.score);
  const winner = candidates[0];
  if (!winner || winner.score < 6) return null;
  return winner;
}

async function fetchCatalog(query: string): Promise<WalmartProduct[]> {
  const sourceUrl = `${WALMART_API}?ft=${encodeURIComponent(query)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(sourceUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CuantoSubioCR/1.0 product-price-refresh",
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Walmart respondió ${response.status}`);
    const payload: unknown = await response.json();
    return Array.isArray(payload) ? (payload as WalmartProduct[]) : [];
  } finally {
    clearTimeout(timer);
  }
}

async function refreshLiveMarket(): Promise<LiveMarketSnapshot> {
  if (!LIVE_ENABLED) {
    return {
      products: new Map(),
      status: {
        enabled: false,
        mode: "fallback",
        source: null,
        sourceUrl: null,
        capturedAt: null,
        requestedProducts: productos.length,
        matchedProducts: 0,
        failedQueries: 0,
        message: "La consulta en vivo está desactivada; se muestran referencias locales.",
      },
    };
  }

  const capturedAt = new Date();
  const liveProducts = new Map<string, LiveMarketProduct>();
  let failedQueries = 0;

  for (let index = 0; index < productos.length; index += 8) {
    const batch = productos.slice(index, index + 8);
    const results = await Promise.all(batch.map(async (product) => {
      try {
        const query = searchQuery(product);
        const catalog = await fetchCatalog(query);
        const winner = bestProduct(product, catalog);
        if (!winner) return null;
        const amount = numberValue(winner.offer.Price) ?? numberValue(winner.offer.ListPrice);
        if (!amount || amount <= 0) return null;
        const listAmount = numberValue(winner.offer.ListPrice);
        const productUrl = winner.item.linkText ? `${WALMART_SITE}/${winner.item.linkText}/p` : WALMART_SITE;
        return {
          slug: product.slug,
          amount,
          listAmount: listAmount && listAmount > amount ? listAmount : null,
          imageUrl: winner.image,
          productName: winner.item.productName ?? product.nombre,
          externalSku: winner.item.items?.[0]?.itemId ?? winner.item.productReference ?? null,
          productUrl,
          sourceUrl: `${WALMART_API}?ft=${encodeURIComponent(query)}`,
          storeName: SOURCE_NAME,
          storeSlug: "walmart-costa-rica",
          capturedAt,
          availability: winner.offer.IsAvailable === true ? "AVAILABLE" : "OUT_OF_STOCK",
          promotionStatus: listAmount && listAmount > amount ? "PROMOTIONAL" : "NORMAL",
        } satisfies LiveMarketProduct;
      } catch {
        failedQueries += 1;
        return null;
      }
    }));
    for (const result of results) if (result) liveProducts.set(result.slug, result);
  }

  const matchedProducts = liveProducts.size;
  const mode = matchedProducts > 0 ? "live" : "fallback";
  const message = matchedProducts === productos.length
    ? "Precios e imágenes consultados en vivo desde el catálogo público de Walmart Costa Rica."
    : matchedProducts > 0
      ? `Datos en vivo para ${matchedProducts} de ${productos.length} productos; el resto conserva su última referencia local.`
      : "No fue posible consultar el catálogo en vivo; se muestran referencias locales.";

  return {
    products: liveProducts,
    status: {
      enabled: true,
      mode,
      source: matchedProducts > 0 ? SOURCE_NAME : null,
      sourceUrl: matchedProducts > 0 ? WALMART_SITE : null,
      capturedAt: matchedProducts > 0 ? capturedAt : null,
      requestedProducts: productos.length,
      matchedProducts,
      failedQueries,
      message,
    },
  };
}

export async function getLiveMarketSnapshot(force = false): Promise<LiveMarketSnapshot> {
  if (!force && cache && cache.expiresAt > Date.now()) return cache.snapshot;
  if (inFlight) return inFlight;

  inFlight = refreshLiveMarket()
    .then((snapshot) => {
      cache = {
        snapshot,
        expiresAt: Date.now() + (snapshot.status.mode === "live" ? CACHE_TTL_MS : ERROR_CACHE_TTL_MS),
      };
      return snapshot;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export async function getLiveMarketStatus(force = false): Promise<LiveMarketStatus> {
  return (await getLiveMarketSnapshot(force)).status;
}

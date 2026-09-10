export type MarketStatus = {
  enabled: boolean;
  mode: "live" | "fallback";
  source: string | null;
  sourceUrl: string | null;
  capturedAt: string | null;
  requestedProducts: number;
  matchedProducts: number;
  failedQueries: number;
  message: string;
};

export type PriceSnapshotEntry = {
  product: string;
  slug: string;
  presentation: string;
  brand: string | null;
  imageUrl?: string | null;
  price: number | null;
  change: number | null;
  percentChange: number | null;
  direction: "UP" | "DOWN" | "FLAT" | null;
  store: string | null;
  location: string | null;
  panelDate: string | null;
  url: string;
};

export type ProductSummary = {
  name: string;
  slug: string;
  brand: string | null;
  category: string | null;
  subcategory: string | null;
  presentation: string;
  quantity: number;
  unit: string;
  isCanastaBasica: boolean;
  imageUrl?: string | null;
  url: string;
};

export type Comparison = {
  store: string;
  storeLogo?: string | null;
  location: { name: string; province: string | null; canton: string | null } | null;
  amount: number;
  amountPerUnit?: number | null;
  unitLabel?: string | null;
  isLowest: boolean;
  isHighest: boolean;
  capturedAt: string;
  availability: string;
  promotionStatus: string;
};

export type ProductDetail = {
  name: string;
  slug: string;
  presentation: string;
  brand: string | null;
  brandOrigin?: string | null;
  category?: string | null;
  categorySlug?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  code: string;
  isCanastaBasica: boolean;
  price: {
    amount: number;
    amountPerUnit: number | null;
    currency: string;
    capturedAt: string;
    store: string | null;
    storeLogo?: string | null;
    location: string | null;
    availability: string;
    promotionStatus: string;
    source: string | null;
  } | null;
  change: { absolute: number; percent: number; direction: "UP" | "DOWN" | "FLAT" } | null;
  history: { date: string; amount: number; store: string; change: number | null }[];
  comparisons: Comparison[];
};

export type StoreSummary = {
  name: string;
  slug: string;
  type: string;
  isSupermarket: boolean;
  website: string | null;
  locationCount: number;
  productCount: number;
  locations: { name: string; province: string | null; canton: string | null }[];
};

export type ProvinceSummary = {
  name: string;
  slug: string;
  cantons: string[];
  storeCount: number;
  productCount: number;
};

export type CategorySummary = {
  name: string;
  slug: string;
  group: string;
  productCount: number;
};

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as T;
}

export const api = {
  search: (q: string) =>
    get<{ suggestions: { term: string; type: string; url: string }[] }>(`/api/search?q=${encodeURIComponent(q)}`),
  products: (params: Record<string, string | number | boolean | undefined> = {}) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") sp.set(k, String(v));
    return get<{ total: number; products: ProductSummary[]; market?: MarketStatus }>(`/api/v1/products?${sp.toString()}`);
  },
  product: (slug: string) => get<{ product: ProductDetail; market?: MarketStatus }>(`/api/v1/products/${slug}`),
  prices: (params: Record<string, string | number | boolean | undefined> = {}) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") sp.set(k, String(v));
    return get<{ prices: PriceSnapshotEntry[]; updatedAt: string; market?: MarketStatus }>(`/api/v1/prices?${sp.toString()}`);
  },
  marketStatus: (refresh = false) =>
    get<{ market: MarketStatus }>(`/api/v1/market-status${refresh ? "?refresh=1" : ""}`),
  history: (slug: string) =>
    get<{ history: { date: string; amount: number; store: string; change: number | null }[] }>(
      `/api/v1/history?slug=${encodeURIComponent(slug)}`,
    ),
  stores: (supermarketOnly = false) =>
    get<{ stores: StoreSummary[] }>(`/api/v1/stores${supermarketOnly ? "?supermercados=1" : ""}`),
  provinces: () => get<{ provinces: ProvinceSummary[] }>(`/api/v1/provinces`),
  categories: () => get<{ categories: CategorySummary[] }>(`/api/v1/categories`),
};

export class ApiError extends Error {}

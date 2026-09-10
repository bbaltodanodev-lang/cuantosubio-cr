// Tipos públicos del dominio (no exponen Prisma directamente en componentes)
export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  brandOrigin: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  subcategoryName: string | null;
  presentation: string;
  quantity: number;
  unit: string;
  isCanastaBasica: boolean;
  imageUrl: string | null;
  isCostaRica: boolean;
}

export interface PriceInfo {
  id: string;
  amount: number;
  amountPerUnit: number | null;
  currency: string;
  capturedAt: Date;
  availability: string;
  promotionStatus: string;
  trustStatus: string;
  store: StoreInfo | null;
  location: LocationInfo | null;
  source: SourceInfo | null;
}

export interface StoreInfo {
  id: string;
  name: string;
  slug: string;
  type: string;
  isSupermarket: boolean;
  website: string | null;
  logoUrl?: string | null;
}

export interface LocationInfo {
  id: string;
  name: string;
  province: string | null;
  canton: string | null;
}

export interface SourceInfo {
  id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  website: string | null;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  group: string | null;
  productCount: number;
}

export interface HistoryPoint {
  date: Date;
  amount: number;
  store: string;
  change: number | null;
}

export interface StoreWithStats extends StoreInfo {
  locationCount: number;
  productCount: number;
  latestUpdate: Date | null;
  locations: { id: string; name: string; province: string | null; canton: string | null }[];
}

export interface ProvinceInfo {
  id: string;
  name: string;
  cantons: string[];
  storeCount: number;
  productCount: number;
}

export interface DashboardStats {
  products: number;
  prices: number;
  activeSources: number;
  lastSync: Date | null;
  errors: number;
  changes: number;
  rejectedCountry: number;
  stores: number;
}

export interface ProductDetail extends ProductSummary {
  description: string | null;
  shortDescription: string | null;
  code: string;
  price: PriceInfo | null;
  previousPrice: PriceInfo | null;
  absoluteChange: number | null;
  percentChange: number | null;
  changeDirection: "UP" | "DOWN" | "FLAT" | null;
  history: HistoryPoint[];
  comparisons: {
    store: StoreInfo;
    location: LocationInfo | null;
    amount: number;
    amountPerUnit?: number | null;
    unitLabel?: string | null;
    isLowest: boolean;
    isHighest: boolean;
    capturedAt: Date;
    availability: string;
    promotionStatus: string;
  }[];
  lowest: { amount: number; store: string } | null;
  highest: { amount: number; store: string } | null;
  related: ProductSummary[];
  indexable: boolean;
}

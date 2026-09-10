import { prisma } from "../prisma";
import { slugify } from "./demo-data";
import type {
  ProductSummary,
  ProductDetail,
  PriceInfo,
  StoreWithStats,
  ProvinceInfo,
  DashboardStats,
  CategoryInfo,
  HistoryPoint,
} from "../types";

const COUNTRY = "CR";

function toSummary(row: any): ProductSummary {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    brand: row.brand?.name ?? null,
    brandOrigin: row.brand?.origin ?? null,
    categoryName: row.category?.name ?? null,
    categorySlug: row.category?.slug ?? null,
    subcategoryName: row.subcategory?.name ?? null,
    presentation: row.variants?.[0]?.presentation ?? "",
    quantity: row.variants?.[0]?.quantity ?? 0,
    unit: row.variants?.[0]?.unit ?? "",
    isCanastaBasica: row.isCanastaBasica,
    imageUrl: row.image?.url ?? row.imageUrl,
    isCostaRica: row.country?.code === COUNTRY,
  };
}

export default {
  async listProducts(opts?: any): Promise<{ products: ProductSummary[]; total: number }> {
    const where: any = { country: { code: COUNTRY } };
    if (opts?.canasta) where.isCanastaBasica = true;
    if (opts?.category) where.category = { slug: opts.category };
    const rows = await prisma.product.findMany({
      where,
      include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true },
      orderBy: { name: "asc" },
    });
    return { products: rows.map(toSummary), total: rows.length };
  },

  async searchSuggestions(query: string): Promise<{ term: string; type: string; url: string }[]> {
    const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const products = await prisma.product.findMany({
      where: { country: { code: COUNTRY }, normalizedName: { contains: normalized } },
      take: 5,
      select: { name: true, slug: true, category: { select: { name: true, slug: true } } },
    });
    const out: { term: string; type: string; url: string }[] = products.map((p) => ({ term: p.name, type: "producto", url: `/productos/${p.slug}` }));
    for (const p of products) {
      if (p.category) out.push({ term: p.category.name, type: "categoría", url: `/productos?categoria=${p.category.slug}` });
    }
    return out;
  },

  async getProductDetail(slug: string): Promise<ProductDetail | null> {
    const row = await prisma.product.findFirst({
      where: { slug, country: { code: COUNTRY } },
      include: {
        brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true,
      },
    });
    if (!row) return null;
    const summary = toSummary(row);
    const latest = await prisma.price.findMany({
      where: { productId: row.id, isLatest: true, currency: "CRC" },
      include: { store: true, storeLocation: { include: { province: true, canton: true } }, source: true },
      orderBy: { amount: "asc" },
    });
    const main = latest[0] ?? null;

    const comparisons = latest.map((l: any) => ({
      store: { id: String(l.storeId), name: l.store.name, slug: l.store.slug, type: l.store.type, isSupermarket: l.store.isSupermarket, website: l.store.website, logoUrl: l.store.logoUrl ?? null },
      location: l.storeLocation ? { id: String(l.storeLocation.id), name: l.storeLocation.name, province: l.storeLocation.province?.name ?? null, canton: l.storeLocation.canton?.name ?? null } : null,
      amount: Number(l.amount),
      isLowest: false,
      isHighest: false,
      capturedAt: l.capturedAt,
      availability: l.availability,
      promotionStatus: l.promotionStatus,
    }));
    const amounts = comparisons.map((c: any) => c.amount);
    if (amounts.length) {
      const mn = Math.min(...amounts);
      const mx = Math.max(...amounts);
      comparisons.forEach((c: any) => {
        c.isLowest = c.amount === mn;
        c.isHighest = c.amount === mx;
      });
    }

    const historyRows = await prisma.price.findMany({
      where: { productId: row.id, currency: "CRC" },
      include: { store: true },
      orderBy: { capturedAt: "asc" },
    });
    const history: HistoryPoint[] = historyRows.map((h: any) => ({
      date: h.capturedAt,
      amount: Number(h.amount),
      store: h.store.name,
      change: null,
    }));

    let price: PriceInfo | null = null;
    if (main) {
      price = {
        id: String(main.id),
        amount: Number(main.amount),
        amountPerUnit: main.amountPerUnit ? Number(main.amountPerUnit) : null,
        currency: main.currency,
        capturedAt: main.capturedAt,
        availability: main.availability,
        promotionStatus: main.promotionStatus,
        trustStatus: main.trustStatus,
        store: { id: String(main.storeId), name: main.store.name, slug: main.store.slug, type: main.store.type, isSupermarket: main.store.isSupermarket, website: main.store.website, logoUrl: main.store.logoUrl ?? null },
        location: main.storeLocation ? { id: String(main.storeLocation.id), name: main.storeLocation.name, province: main.storeLocation.province?.name ?? null, canton: main.storeLocation.canton?.name ?? null } : null,
        source: main.source ? { id: String(main.source.id), name: main.source.name, slug: main.source.slug, type: main.source.type, status: main.source.status, website: main.source.website } : null,
      };
    }

    const relatedRows = row.categoryId ? await prisma.product.findMany({
      where: { categoryId: row.categoryId, country: { code: COUNTRY }, slug: { not: slug } },
      include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true },
      take: 4,
    }) : [];

    return {
      ...summary,
      description: row.description,
      shortDescription: row.shortDescription,
      code: `CR-${row.id}`,
      price,
      previousPrice: null,
      absoluteChange: null,
      percentChange: null,
      changeDirection: null,
      history,
      comparisons,
      lowest: amounts.length ? { amount: Math.min(...amounts), store: comparisons.find((c: any) => c.isLowest)?.store.name ?? "" } : null,
      highest: amounts.length ? { amount: Math.max(...amounts), store: comparisons.find((c: any) => c.isHighest)?.store.name ?? "" } : null,
      related: relatedRows.map(toSummary),
      indexable: row.indexable && !!main,
    };
  },

  async listCategories(): Promise<CategoryInfo[]> {
    const rows = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { sort: "asc" },
    });
    return rows.map((c: any) => ({ id: String(c.id), name: c.name, slug: c.slug, group: c.group, productCount: c._count.products }));
  },

  async listStores(supermarketOnly = false): Promise<StoreWithStats[]> {
    const rows = await prisma.store.findMany({
      where: supermarketOnly ? { isSupermarket: true } : {},
      include: {
        country: true,
        _count: { select: { locations: true, prices: true } },
        locations: { include: { province: true, canton: true } },
      },
    });
    return rows.map((s: any) => ({
      id: String(s.id),
      name: s.name,
      slug: s.slug,
      type: s.type,
      isSupermarket: s.isSupermarket,
      website: s.website,
      locationCount: s._count.locations,
      productCount: s._count.prices,
      latestUpdate: null,
      locations: s.locations.map((l: any) => ({ id: String(l.id), name: l.name, province: l.province?.name ?? null, canton: l.canton?.name ?? null })),
    }));
  },

  async getStore(slug: string): Promise<StoreWithStats | null> {
    const s = await prisma.store.findFirst({ where: { slug }, include: { locations: { include: { province: true, canton: true } } } });
    if (!s) return null;
    const count = await prisma.price.count({ where: { storeId: s.id, isLatest: true } });
    return {
      id: String(s.id),
      name: s.name,
      slug: s.slug,
      type: s.type,
      isSupermarket: s.isSupermarket,
      website: s.website,
      locationCount: s.locations.length,
      productCount: count,
      latestUpdate: null,
      locations: s.locations.map((l: any) => ({ id: String(l.id), name: l.name, province: l.province?.name ?? null, canton: l.canton?.name ?? null })),
    };
  },

  async listProvinces(): Promise<ProvinceInfo[]> {
    const rows = await prisma.province.findMany({ include: { cantons: true } });
    return rows.map((p: any) => ({ id: String(p.id), name: p.name, cantons: p.cantons.map((c: any) => c.name), storeCount: 0, productCount: 0 }));
  },

  async listBiggestRises(limit = 8): Promise<any[]> {
    const changes = await prisma.priceChange.findMany({
      where: { currency: "CRC", direction: "UP", period: "MONTH" },
      orderBy: { percentChange: "desc" },
      take: limit,
      include: { product: { include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true } } },
    });
    return changes.map((c: any) => toSummary(c.product));
  },

  async listBiggestDrops(limit = 8): Promise<any[]> {
    const changes = await prisma.priceChange.findMany({
      where: { currency: "CRC", direction: "DOWN", period: "MONTH" },
      orderBy: { percentChange: "asc" },
      take: limit,
      include: { product: { include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true } } },
    });
    return changes.map((c: any) => toSummary(c.product));
  },

  async listPriceSnapshot(opts?: { category?: string; province?: string; limit?: number }): Promise<any[]> {
    const limit = opts?.limit ?? 50;
    const categorySlug = opts?.category ? slugify(opts.category) : undefined;
    const rows = await prisma.price.findMany({
      where: {
        currency: "CRC",
        ...(categorySlug ? { product: { category: { slug: categorySlug } } } : {}),
      },
      orderBy: { capturedAt: "desc" },
      take: limit * 10,
      include: {
        product: { include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true } },
        store: true,
        storeLocation: { include: { province: true } },
      },
    });
    // Reducir a un precio de referencia por producto.
    const seen = new Set<string>();
    const out: any[] = [];
    for (const r of rows) {
      const key = String(r.productId);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        product: toSummary(r.product),
        price: r.amount,
        currency: "CRC",
        panelDate: r.capturedAt,
        store: r.store?.name ?? null,
        location: r.storeLocation ? `${r.storeLocation.name}${r.storeLocation.province ? `, ${r.storeLocation.province.name}` : ""}` : null,
        change: null,
        percent: null,
        direction: null,
      });
      if (out.length >= limit) break;
    }
    return out;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const [products, prices, activeSources, lastRun, errors, agg, stores] = await Promise.all([
      prisma.product.count({ where: { country: { code: COUNTRY } } }),
      prisma.price.count({ where: { currency: "CRC" } }),
      prisma.source.count({ where: { status: "ACTIVE" } }),
      prisma.scrapeRun.findFirst({ orderBy: { startedAt: "desc" }, select: { startedAt: true } }) as Promise<{ startedAt: Date } | null>,
      prisma.scrapeError.count(),
      prisma.scrapeRun.aggregate({ _sum: { productsRejectedCountry: true } }) as Promise<{ _sum: { productsRejectedCountry: number | null } }>,
      prisma.store.count(),
    ]);
    return {
      products,
      prices,
      activeSources,
      lastSync: lastRun?.startedAt ?? null,
      errors,
      changes: 0,
      rejectedCountry: agg._sum?.productsRejectedCountry ?? 0,
      stores,
    };
  },
};

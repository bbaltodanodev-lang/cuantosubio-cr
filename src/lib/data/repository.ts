import {
  productos as demoProductos,
  geografia,
  tiendas,
  categorias,
} from "./demo-data";
import { slugify } from "./demo-data";
import { getLiveMarketSnapshot, getLiveMarketStatus } from "./live-market";
import type {
  ProductSummary,
  PriceInfo,
  CategoryInfo,
  HistoryPoint,
  StoreWithStats,
  ProvinceInfo,
  DashboardStats,
  ProductDetail,
} from "../types";

// Vercel puede ejecutar el frontend sin una base de datos configurada; en ese caso
// usamos el catálogo local para que la web siga siendo navegable y verificable.
const DEMO = process.env.DEMO_MODE === "true" || !process.env.DATABASE_URL;

// ---------------------------------- HELPERS ----------------------------------
const storeBySlug = new Map<
  string,
  {
    name: string;
    slug: string;
    type: string;
    isSupermarket: boolean;
    website: string | null;
    logoUrl: string | null;
    locations: { id: string; name: string; province: string | null; canton: string | null }[];
  }
>();

for (const t of tiendas) {
  storeBySlug.set(t.slug, {
    name: t.nombre,
    slug: t.slug,
    type: t.tipo,
    isSupermarket: t.supermercado,
    website: t.sitio,
    logoUrl: t.logo ?? `/img/supermercados/${t.slug}.svg`,
    locations: t.sucursales.map((s) => ({
      id: s.nombre,
      name: s.nombre,
      province: s.provincia,
      canton: s.canton,
    })),
  });
}

function storeByName(name: string) {
  const t = tiendas.find((x) => x.nombre === name);
  if (!t) return null;
  return storeBySlug.get(t.slug)!;
}

const categoryGroups = ["Alimentación", "Limpieza", "Higiene personal", "Hogar", "Mascotas"];

export function computeAmountPerUnit(amount: number, qty: number, unit: string): { amountPerUnit: number; unitLabel: string } {
  const u = (unit ?? "").toLowerCase().trim();
  if (u === "kg") {
    return { amountPerUnit: Math.round(amount / (qty || 1)), unitLabel: "kg" };
  }
  if (u === "g") {
    const kg = (qty || 1000) / 1000;
    return { amountPerUnit: Math.round(amount / kg), unitLabel: "kg" };
  }
  if (u === "l") {
    return { amountPerUnit: Math.round(amount / (qty || 1)), unitLabel: "L" };
  }
  if (u === "ml") {
    const l = (qty || 1000) / 1000;
    return { amountPerUnit: Math.round(amount / l), unitLabel: "L" };
  }
  if (u === "und" || u === "unidades") {
    return { amountPerUnit: Math.round((amount / (qty || 1)) * 10) / 10, unitLabel: "unidad" };
  }
  if (u === "rol" || u === "rollos") {
    return { amountPerUnit: Math.round((amount / (qty || 1)) * 10) / 10, unitLabel: "rollo" };
  }
  return { amountPerUnit: Math.round(amount / (qty || 1)), unitLabel: unit || "unidad" };
}

function buildSummary(p: {
  nombre: string;
  slug?: string;
  marca?: string;
  marcaOrigen?: string;
  categoria: string;
  subcategoria: string;
  presentacion: string;
  cantidad: number;
  unidad: string;
  canasta: boolean;
  imagen?: string;
}): ProductSummary {
  const slug = p.slug ?? slugify(`${p.nombre} ${p.presentacion}`);
  return {
    id: slug,
    name: p.nombre,
    slug,
    brand: p.marca ?? null,
    brandOrigin: p.marcaOrigen ?? null,
    categoryName: p.categoria,
    categorySlug: slugify(p.categoria),
    subcategoryName: p.subcategoria,
    presentation: p.presentacion,
    quantity: p.cantidad,
    unit: p.unidad,
    isCanastaBasica: p.canasta,
    imageUrl: p.imagen ?? `/img/products/${slug}.webp`,
    isCostaRica: true,
  };
}

function demoProductsRaw() {
  return demoProductos;
}

// ---------------------------------- PRODUCTS ----------------------------------
export async function listProducts(opts?: {
  query?: string;
  category?: string;
  store?: string;
  province?: string;
  sort?: string;
  canasta?: boolean;
}): Promise<{ products: ProductSummary[]; total: number }> {
  if (DEMO) {
    const liveMarket = await getLiveMarketSnapshot();
    let list = demoProductsRaw().map((product) => {
      const summary = buildSummary(product);
      const live = liveMarket.products.get(summary.slug);
      return live?.imageUrl ? { ...summary, imageUrl: live.imageUrl } : summary;
    });
    const q = normalize(opts?.query);
    if (q) {
      list = list.filter((p) => {
        const haystack = normalize(`${p.name} ${p.categoryName} ${p.subcategoryName} ${p.brand ?? ""} ${p.presentation}`);
        return haystack.includes(q);
      });
    }
    if (opts?.category) list = list.filter((p) => p.categorySlug === opts.category || p.categoryName === opts.category);
    if (opts?.canasta) list = list.filter((p) => p.isCanastaBasica);
    if (opts?.store) {
      list = list.filter((p) => {
        const prod = demoProductsRaw().find((x) => buildSummary(x).slug === p.slug);
        return prod?.tiendas.some((t) => storeByName(t.tienda)?.slug === opts.store);
      });
    }
    if (opts?.province) {
      list = list.filter((p) => {
        const prod = demoProductsRaw().find((x) => buildSummary(x).slug === p.slug);
        return prod?.tiendas.some((t) => storeByName(t.tienda)?.locations.some((l) => l.province === opts.province));
      });
    }
    // sort
    if (opts?.sort) {
      const currentPrice = (product: ProductSummary) => liveMarket.products.get(product.slug)?.amount ?? currentPriceOf(product);
      const currentRise = (product: ProductSummary) => {
        const demo = demoProductsRaw().find((item) => buildSummary(item).slug === product.slug);
        if (!demo) return 0;
        return ((currentPrice(product) - demo.precioBase) / demo.precioBase) * 100;
      };
      list = [...list].sort((a, b) => {
        switch (opts.sort) {
          case "name-asc": return a.name.localeCompare(b.name);
          case "name-desc": return b.name.localeCompare(a.name);
          case "price-asc": return currentPrice(a) - currentPrice(b);
          case "price-desc": return currentPrice(b) - currentPrice(a);
          case "rise": return currentRise(b) - currentRise(a);
          case "drop": return currentRise(a) - currentRise(b);
          default: return a.name.localeCompare(b.name);
        }
      });
    }
    return { products: list, total: list.length };
  }
  // Prisma mode
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listProducts(opts);
}

export async function searchSuggestions(query: string): Promise<{ term: string; type: string; url: string }[]> {
  const q = normalize(query);
  const out: { term: string; type: string; url: string }[] = [];
  if (!q) return out;
  if (DEMO) {
    const seen = new Set<string>();
    for (const p of demoProductsRaw()) {
      const s = buildSummary(p);
      if (normalize(p.nombre).includes(q) && !seen.has(`p-${s.slug}`)) {
        seen.add(`p-${s.slug}`);
        out.push({ term: p.nombre, type: "producto", url: `/productos/${s.slug}` });
      }
      if (normalize(p.categoria).includes(q) && !seen.has(`c-${p.categoria}`)) {
        seen.add(`c-${p.categoria}`);
        out.push({ term: p.categoria, type: "categoría", url: `/productos?categoria=${slugify(p.categoria)}` });
      }
      if (p.marca && normalize(p.marca).includes(q) && !seen.has(`m-${p.marca}`)) {
        seen.add(`m-${p.marca}`);
        out.push({ term: p.marca, type: "marca", url: `/productos?q=${encodeURIComponent(p.marca)}` });
      }
    }
    for (const t of tiendas) {
      if (normalize(t.nombre).includes(q) && !seen.has(`s-${t.slug}`)) {
        seen.add(`s-${t.slug}`);
        out.push({ term: t.nombre, type: "supermercado", url: `/supermercados/${t.slug}` });
      }
    }
    for (const g of geografia) {
      if (normalize(g.nombre).includes(q) && !seen.has(`prov-${g.nombre}`)) {
        seen.add(`prov-${g.nombre}`);
        out.push({ term: g.nombre, type: "provincia", url: `/precios/${slugify(g.nombre)}-costa-rica` });
      }
    }
    return out.slice(0, 8);
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.searchSuggestions(query);
}

export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  if (DEMO) {
    const demo = demoProductsRaw().find((x) => buildSummary(x).slug === slug || x.slug === slug);
    if (!demo) return null;
    const liveMarket = await getLiveMarketSnapshot();
    const liveProduct = liveMarket.products.get(demo.slug);
    const baseSummary = buildSummary(demo);
    const summary = liveProduct?.imageUrl ? { ...baseSummary, imageUrl: liveProduct.imageUrl } : baseSummary;
    const now = Date.now();
    const latestPrices = demo.tiendas.map((t) => ({ ...t, daysAgo: 2 as number, capturedAt: undefined as Date | undefined, isLive: false, availability: "AVAILABLE" }));
    if (liveProduct) {
      const existingIndex = latestPrices.findIndex((t) => storeByName(t.tienda)?.slug === liveProduct.storeSlug);
      const liveEntry = {
        tienda: liveProduct.storeName,
        precio: liveProduct.amount,
        promocion: liveProduct.promotionStatus,
        daysAgo: 0,
        capturedAt: liveProduct.capturedAt,
        isLive: true,
        availability: liveProduct.availability,
      };
      if (existingIndex >= 0) latestPrices[existingIndex] = liveEntry;
      else latestPrices.push(liveEntry);
    }

    const comparisons = latestPrices.map((t) => {
      const store = storeByName(t.tienda);
      const loc = store?.locations[0] ?? null;
      const { amountPerUnit, unitLabel } = computeAmountPerUnit(t.precio, demo.cantidad, demo.unidad);
      return {
        store: {
          id: store?.slug ?? t.tienda,
          name: t.tienda,
          slug: store?.slug ?? t.tienda,
          type: store?.type ?? "SUPERMARKET",
          isSupermarket: store?.isSupermarket ?? true,
          website: store?.website ?? null,
          logoUrl: store?.logoUrl ?? `/img/supermercados/${store?.slug ?? "walmart"}.svg`,
        },
        location: loc ? { id: loc.id, name: loc.name, province: loc.province, canton: loc.canton } : null,
        amount: t.precio,
        amountPerUnit,
        unitLabel,
        isLowest: false,
        isHighest: false,
        capturedAt: t.capturedAt ?? new Date(now - t.daysAgo * 86400000),
        availability: t.availability,
        promotionStatus: t.promocion ?? "NORMAL",
      };
    });
    const amounts = comparisons.map((c) => c.amount);
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);
    comparisons.forEach((c) => {
      c.isLowest = c.amount === min;
      c.isHighest = c.amount === max;
    });

    // ordenar comparaciones de menor a mayor precio
    comparisons.sort((a, b) => a.amount - b.amount);

    // precio actual = el más bajo (referencia principal de la presentación)
    const main = comparisons.find((c) => c.isLowest)!;
    const prevAmount = demo.precioBase;
    const absChange = main.amount - prevAmount;
    const pctChange = ((main.amount - prevAmount) / prevAmount) * 100;

    // historial (agregado por punto, basado en el menor precio observado)
    const history: HistoryPoint[] = [];
    for (let i = 0; i < 4; i++) {
      const daysAgo = [40, 28, 14, 2][i];
      const frac = [0, 0.25, 0.6, 1][i];
      const amount = Math.round((prevAmount + (main.amount - prevAmount) * frac) * 100) / 100;
      const prev = history.length ? history[history.length - 1] : null;
      history.push({
        date: new Date(now - daysAgo * 86400000),
        amount,
        store: main.store.name,
        change: prev ? amount - prev.amount : null,
      });
    }

    const mainUnit = computeAmountPerUnit(main.amount, demo.cantidad, demo.unidad);

    const price: PriceInfo = {
      id: `main-${main.amount}`,
      amount: main.amount,
      amountPerUnit: mainUnit.amountPerUnit,
      currency: "CRC",
      capturedAt: main.capturedAt,
      availability: main.availability,
      promotionStatus: main.promotionStatus,
      trustStatus: "VERIFIED",
      store: main.store,
      location: main.location,
      source: {
        id: `src-${main.store.slug}`,
        name: liveProduct && main.store.slug === liveProduct.storeSlug ? `Catálogo en línea de ${main.store.name}` : `Catálogo ${main.store.name}`,
        slug: `catalogo-${main.store.slug}`,
        type: liveProduct && main.store.slug === liveProduct.storeSlug ? "CATALOG_API" : "SCRAPER",
        status: "ACTIVE",
        website: main.store.website,
      },
    };

    const related = demoProductsRaw()
      .filter((x) => x.categoria === demo.categoria && (buildSummary(x).slug !== slug && x.slug !== slug))
      .slice(0, 4)
      .map(buildSummary);

    const desc = demo.descripcion ?? `${demo.nombre}, presentación de ${demo.presentacion}, monitoreado en supermercados de Costa Rica en colones costarricenses (CRC).`;
    const shortDesc = `${demo.nombre} (${demo.presentacion}) con precios actualizados y comparación entre supermercados.`;

    return {
      ...summary,
      description: desc,
      shortDescription: shortDesc,
      code: demo.codigo ?? `CR-${slugify(demo.nombre)}`,
      price,
      previousPrice: { ...price, amount: prevAmount, capturedAt: new Date(now - 40 * 86400000) },
      absoluteChange: absChange,
      percentChange: pctChange,
      changeDirection: absChange > 0 ? "UP" : absChange < 0 ? "DOWN" : "FLAT",
      history,
      comparisons,
      lowest: { amount: min, store: comparisons.find((c) => c.isLowest)!.store.name },
      highest: { amount: max, store: comparisons.find((c) => c.isHighest)!.store.name },
      related,
      indexable: true,
    };
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.getProductDetail(slug);
}

// ---------------------------------- CATEGORIES ----------------------------------
export async function listCategories(): Promise<CategoryInfo[]> {
  if (DEMO) {
    const grouped = new Map<string, CategoryInfo[]>();
    for (const c of categorias) {
      const count = demoProductsRaw().filter((p) => p.categoria === c.nombre).length;
      const entry: CategoryInfo = {
        id: slugify(c.nombre),
        name: c.nombre,
        slug: slugify(c.nombre),
        group: c.grupo,
        productCount: count,
      };
      const arr = grouped.get(c.grupo) ?? [];
      arr.push(entry);
      grouped.set(c.grupo, arr);
    }
    // Preservar orden: primero las 5 grandes, luego las demás
    const ordered: CategoryInfo[] = [];
    for (const g of categoryGroups) ordered.push(...(grouped.get(g) ?? []));
    return ordered;
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listCategories();
}

// ---------------------------------- STORES ----------------------------------
export async function listStores(supermarketOnly = false): Promise<StoreWithStats[]> {
  if (DEMO) {
    return tiendas
      .filter((t) => !supermarketOnly || t.supermercado)
      .map((t) => {
        const matched = demoProductsRaw().filter((p) => p.tiendas.some((x) => x.tienda === t.nombre));
        return {
          id: t.slug,
          name: t.nombre,
          slug: t.slug,
          type: t.tipo,
          isSupermarket: t.supermercado,
          website: t.sitio,
          locationCount: t.sucursales.length,
          productCount: matched.length,
          latestUpdate: matched.length ? new Date(Date.now() - 2 * 86400000) : null,
          locations: t.sucursales.map((s) => ({ id: s.nombre, name: s.nombre, province: s.provincia, canton: s.canton })),
        };
      });
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listStores(supermarketOnly);
}

export async function getStore(slug: string): Promise<StoreWithStats | null> {
  if (DEMO) {
    const t = tiendas.find((x) => x.slug === slug);
    if (!t) return null;
    const matched = demoProductsRaw().filter((p) => p.tiendas.some((x) => x.tienda === t.nombre));
    return {
      id: t.slug,
      name: t.nombre,
      slug: t.slug,
      type: t.tipo,
      isSupermarket: t.supermercado,
      website: t.sitio,
      locationCount: t.sucursales.length,
      productCount: matched.length,
      latestUpdate: matched.length ? new Date(Date.now() - 2 * 86400000) : null,
      locations: t.sucursales.map((s) => ({ id: s.nombre, name: s.nombre, province: s.provincia, canton: s.canton })),
    };
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.getStore(slug);
}

// ---------------------------------- PROVINCES ----------------------------------
export async function listProvinces(): Promise<ProvinceInfo[]> {
  if (DEMO) {
    return geografia.map((g) => {
      const stores = tiendas.filter((t) => t.sucursales.some((s) => s.provincia === g.nombre)).length;
      const products = demoProductsRaw().filter((p) =>
        p.tiendas.some((t) => storeByName(t.tienda)?.locations.some((l) => l.province === g.nombre))
      ).length;
      return {
        id: slugify(g.nombre),
        name: g.nombre,
        cantons: g.cantones,
        storeCount: stores,
        productCount: products,
      };
    });
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listProvinces();
}

// ---------------------------------- MOSTRISES / DROPS ----------------------------------
function currentPriceOf(p: ProductSummary): number {
  const demo = demoProductsRaw().find((x) => buildSummary(x).slug === p.slug);
  if (!demo) return 0;
  return Math.min(...demo.tiendas.map((t) => t.precio));
}

export async function listBiggestRises(limit = 8): Promise<(ProductDetail | ProductSummary)[]> {
  if (DEMO) {
    const items = demoProductsRaw()
      .map((p) => {
        const s = buildSummary(p);
        const current = Math.min(...p.tiendas.map((t) => t.precio));
        return { s, rise: ((current - p.precioBase) / p.precioBase) * 100 };
      })
      .sort((a, b) => b.rise - a.rise)
      .slice(0, limit);
    return items.map((i) => i.s);
  }
const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listBiggestRises(limit);
}

export async function listBiggestDrops(limit = 8): Promise<(ProductDetail | ProductSummary)[]> {
  if (DEMO) {
    const items = demoProductsRaw()
      .map((p) => {
        const s = buildSummary(p);
        const current = Math.min(...p.tiendas.map((t) => t.precio));
        return { s, rise: ((current - p.precioBase) / p.precioBase) * 100 };
      })
      .sort((a, b) => a.rise - b.rise)
      .slice(0, limit);
    return items.map((i) => i.s);
  }
const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listBiggestDrops(limit);
}

// ---------------------------------- PRICE SNAPSHOT ----------------------------------
export type PriceSnapshotEntry = {
  product: ProductSummary;
  imageUrl: string | null;
  price: number | null;
  currency: "CRC";
  panelDate: Date | null;
  store: string | null;
  location: string | null;
  change: number | null;
  percent: number | null;
  direction: "UP" | "DOWN" | "FLAT" | null;
};

export async function listPriceSnapshot(opts?: { category?: string; province?: string; limit?: number }): Promise<PriceSnapshotEntry[]> {
  const limit = opts?.limit ?? 50;
  if (DEMO) {
    const liveMarket = await getLiveMarketSnapshot();
    return demoProductsRaw()
      .filter((p) => !opts?.category || slugify(p.categoria) === slugify(opts.category) || p.categoria === opts.category)
      .filter((p) => !opts?.province || p.tiendas.some((t) => storeByName(t.tienda)?.locations.some((l) => l.province === opts.province)))
      .map((p) => {
        const live = liveMarket.products.get(p.slug);
        const baseSummary = buildSummary(p);
        const s = live?.imageUrl ? { ...baseSummary, imageUrl: live.imageUrl } : baseSummary;
        const prices = p.tiendas.map((t) => t.precio);
        const min = Math.min(...prices);
        const cheapest = p.tiendas.find((t) => t.precio === min)!;
        const liveStore = live ? storeByName(live.storeName) : null;
        const store = liveStore ?? storeByName(cheapest.tienda);
        const loc = store?.locations[0] ?? null;
        const amount = live?.amount ?? min;
        const delta = (amount - p.precioBase) / p.precioBase;
        return {
          product: s,
          imageUrl: s.imageUrl,
          price: amount,
          currency: "CRC" as const,
          panelDate: live?.capturedAt ?? new Date(Date.now() - 2 * 86400000),
          store: store?.name ?? null,
          location: loc ? (loc.province ? `${loc.name}, ${loc.province}` : loc.name) : null,
          change: amount - p.precioBase,
          percent: delta * 100,
          direction: delta > 0 ? ("UP" as const) : delta < 0 ? ("DOWN" as const) : ("FLAT" as const),
        };
      })
      .slice(0, limit);
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.listPriceSnapshot(opts);
}

// ---------------------------------- DASHBOARD ----------------------------------
export async function getDashboardStats(): Promise<DashboardStats> {
  if (DEMO) {
    return {
      products: demoProductsRaw().length,
      prices: demoProductsRaw().reduce((acc, p) => acc + p.tiendas.length, 0),
      activeSources: tiendas.filter((t) => t.supermercado).length + 2,
      lastSync: new Date(Date.now() - 2 * 3600000),
      errors: 0,
      changes: demoProductsRaw().length,
      rejectedCountry: 0,
      stores: tiendas.length,
    };
  }
  const prismaImpl = await import("./prisma-impl");
  return prismaImpl.default.getDashboardStats();
}

// ---------------------------------- UTIL ----------------------------------
export function normalize(s?: string): string {
  return (s ?? "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const isDemo = DEMO;

export { getLiveMarketStatus };


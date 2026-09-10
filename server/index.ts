import "dotenv/config";
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  searchSuggestions,
  listProducts,
  getProductDetail,
  listCategories,
  listStores,
  listProvinces,
  listPriceSnapshot,
  getLiveMarketStatus,
} from "../src/lib/data/repository";
import { productos as demoProductos, geografia, tiendas, slugify } from "../src/lib/data/demo-data";
import { SITE_NAME, SITE_URL } from "../src/lib/site";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const PROD = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT ?? (PROD ? 3000 : 3141));

const app = express();
app.disable("x-powered-by");

function marketStatusJson(status: Awaited<ReturnType<typeof getLiveMarketStatus>>) {
  return {
    enabled: status.enabled,
    mode: status.mode,
    source: status.source,
    sourceUrl: status.sourceUrl,
    capturedAt: status.capturedAt?.toISOString() ?? null,
    requestedProducts: status.requestedProducts,
    matchedProducts: status.matchedProducts,
    failedQueries: status.failedQueries,
    message: status.message,
  };
}

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: SITE_NAME,
    country: "Costa Rica",
    currency: "CRC",
    timezone: "America/Costa_Rica",
    demoMode: process.env.DEMO_MODE === "true" || !process.env.DATABASE_URL,
    liveMarketEnabled: process.env.LIVE_MARKET_ENABLED !== "false",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/v1/market-status", async (req, res) => {
  try {
    const status = await getLiveMarketStatus(req.query.refresh === "1");
    res.json({ country: "Costa Rica", currency: "CRC", market: marketStatusJson(status) });
  } catch {
    res.status(200).json({
      country: "Costa Rica",
      currency: "CRC",
      market: {
        enabled: false,
        mode: "fallback",
        source: null,
        sourceUrl: null,
        capturedAt: null,
        requestedProducts: 0,
        matchedProducts: 0,
        failedQueries: 0,
        message: "No fue posible consultar el estado de la conexión en vivo.",
      },
    });
  }
});

app.get("/api/search", async (req, res) => {
  const q = String(req.query.q ?? "");
  if (q.trim().length < 2) return res.json({ suggestions: [] });
  try {
    const suggestions = await searchSuggestions(q.trim());
    res.json({ suggestions });
  } catch {
    res.status(200).json({ suggestions: [], error: "No fue posible completar la búsqueda en este momento." });
  }
});

app.get("/api/v1/products", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : undefined;
  const categoria = typeof req.query.categoria === "string" ? req.query.categoria : undefined;
  const tienda = typeof req.query.tienda === "string" ? req.query.tienda : undefined;
  const provincia = typeof req.query.provincia === "string" ? req.query.provincia : undefined;
  const canasta = req.query.canasta === "1";
  const sort = typeof req.query.sort === "string" ? req.query.sort : "name-asc";
  try {
    const { products, total } = await listProducts({ query: q, category: categoria, store: tienda, province: provincia, canasta, sort });
    const market = await getLiveMarketStatus();
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      total,
      market: marketStatusJson(market),
      products: products.map((p) => ({
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        category: p.categoryName,
        subcategory: p.subcategoryName,
        presentation: p.presentation,
        quantity: p.quantity,
        unit: p.unit,
        isCanastaBasica: p.isCanastaBasica,
        imageUrl: p.imageUrl,
        country: { code: "CR", name: "Costa Rica" },
        currency: "CRC",
        url: `/productos/${p.slug}`,
      })),
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar los productos en este momento." });
  }
});

app.get("/api/v1/products/:slug", async (req, res) => {
  try {
    const p = await getProductDetail(req.params.slug);
    if (!p) return res.status(404).json({ error: "No encontramos este producto en el mercado costarricense." });
    const market = await getLiveMarketStatus();
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      market: marketStatusJson(market),
      product: {
        name: p.name,
        slug: p.slug,
        presentation: p.presentation,
        brand: p.brand,
        brandOrigin: p.brandOrigin,
        category: p.categoryName,
        categorySlug: p.categorySlug,
        description: p.description,
        imageUrl: p.imageUrl,
        code: p.code,
        isCanastaBasica: p.isCanastaBasica,
        price: p.price
          ? {
              amount: p.price.amount,
              amountPerUnit: p.price.amountPerUnit,
              currency: "CRC",
              capturedAt: p.price.capturedAt,
              store: p.price.store?.name ?? null,
              storeLogo: p.price.store?.logoUrl ?? null,
              location: p.price.location ? `${p.price.location.name}${p.price.location.province ? `, ${p.price.location.province}` : ""}` : null,
              availability: p.price.availability,
              promotionStatus: p.price.promotionStatus,
              source: p.price.source?.name ?? null,
            }
          : null,
        change:
          p.absoluteChange !== null && p.percentChange !== null
            ? { absolute: p.absoluteChange, percent: p.percentChange, direction: p.changeDirection! }
            : null,
        history: p.history.map((h) => ({ date: h.date.toISOString(), amount: h.amount, store: h.store, change: h.change })),
        comparisons: p.comparisons.map((c) => ({
          store: c.store.name,
          storeLogo: c.store.logoUrl ?? null,
          location: c.location ? { name: c.location.name, province: c.location.province, canton: c.location.canton } : null,
          amount: c.amount,
          amountPerUnit: c.amountPerUnit ?? null,
          unitLabel: c.unitLabel ?? null,
          isLowest: c.isLowest,
          isHighest: c.isHighest,
          capturedAt: c.capturedAt.toISOString(),
          availability: c.availability,
          promotionStatus: c.promotionStatus,
        })),
      },
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar el producto en este momento." });
  }
});

app.get("/api/v1/prices", async (req, res) => {
  const categoria = typeof req.query.categoria === "string" ? req.query.categoria : undefined;
  const provincia = typeof req.query.provincia === "string" ? req.query.provincia : undefined;
  const limit = Math.min(200, Math.max(1, Number(req.query.limit ?? "50")));
  try {
    const rows = await listPriceSnapshot({ category: categoria, province: provincia, limit });
    const market = await getLiveMarketStatus();
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      type: "price_snapshot",
      updatedAt: market.capturedAt?.toISOString() ?? new Date(Date.now() - 2 * 86400000).toISOString(),
      market: marketStatusJson(market),
      prices: rows.map((r) => ({
        product: r.product.name,
        slug: r.product.slug,
        presentation: r.product.presentation,
        brand: r.product.brand,
        imageUrl: r.imageUrl,
        price: r.price,
        change: r.change,
        percentChange: r.percent,
        direction: r.direction,
        store: r.store,
        location: r.location,
        panelDate: r.panelDate,
        url: `/productos/${r.product.slug}`,
      })),
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar los precios en este momento." });
  }
});

app.get("/api/v1/history", async (req, res) => {
  const slug = typeof req.query.slug === "string" ? req.query.slug : "";
  if (!slug) return res.status(400).json({ error: 'El parámetro "slug" es obligatorio.' });
  try {
    const p = await getProductDetail(slug);
    if (!p) return res.status(404).json({ error: "No encontramos este producto en el mercado costarricense." });
    res.json({ country: "Costa Rica", currency: "CRC", product: p.name, slug: p.slug, history: p.history });
  } catch {
    res.status(500).json({ error: "No fue posible consultar el historial en este momento." });
  }
});

app.get("/api/v1/categories", async (_req, res) => {
  try {
    const categories = await listCategories();
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      categories: categories.map((c) => ({ name: c.name, slug: c.slug, group: c.group, productCount: c.productCount })),
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar las categorías en este momento." });
  }
});

app.get("/api/v1/stores", async (req, res) => {
  try {
    const stores = await listStores(req.query.supermercados === "1");
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      stores: stores.map((s) => ({
        name: s.name,
        slug: s.slug,
        type: s.type,
        isSupermarket: s.isSupermarket,
        website: s.website,
        locationCount: s.locationCount,
        productCount: s.productCount,
        locations: s.locations.map((l) => ({ name: l.name, province: l.province, canton: l.canton })),
      })),
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar los comercios en este momento." });
  }
});

app.get("/api/v1/provinces", async (_req, res) => {
  try {
    const provinces = await listProvinces();
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      provinces: provinces.map((p) => ({ name: p.name, slug: p.id, cantons: p.cantons, storeCount: p.storeCount, productCount: p.productCount })),
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar las provincias en este momento." });
  }
});

// ---- SEO estático (generado desde datos de Costa Rica) ----
app.get("/sitemap.xml", (_req, res) => {
  const now = new Date().toISOString();
  const urls: string[] = [
    { path: "/", pri: "1.0" },
    { path: "/productos", pri: "0.8" },
    { path: "/canasta-basica", pri: "0.8" },
    { path: "/supermercados", pri: "0.7" },
    { path: "/comercios", pri: "0.7" },
    { path: "/subidas", pri: "0.7" },
    { path: "/bajadas", pri: "0.7" },
    { path: "/precios", pri: "0.8" },
    { path: "/como-funciona", pri: "0.5" },
    { path: "/metodologia", pri: "0.5" },
    { path: "/cobertura", pri: "0.5" },
    { path: "/fuentes", pri: "0.5" },
  ].map((u) => `<url><loc>${SITE_URL}${u.path === "/" ? "" : u.path}</loc><lastmod>${now}</lastmod><priority>${u.pri}</priority></url>`);

  for (const p of demoProductos) {
    urls.push(`<url><loc>${SITE_URL}/productos/${slugify(`${p.nombre} ${p.presentacion}`)}</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>`);
  }
  for (const slug of ["arroz-costa-rica", "huevos-costa-rica", "leche-costa-rica", "frijoles-costa-rica", "pollo-costa-rica", "cafe-costa-rica"]) {
    urls.push(`<url><loc>${SITE_URL}/precios/${slug}</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>`);
  }
  for (const g of geografia) {
    urls.push(`<url><loc>${SITE_URL}/precios/${slugify(g.nombre)}-costa-rica</loc><lastmod>${now}</lastmod><priority>0.6</priority></url>`);
  }
  for (const t of tiendas.filter((x) => x.supermercado)) {
    urls.push(`<url><loc>${SITE_URL}/supermercados/${t.slug}</loc><lastmod>${now}</lastmod><priority>0.6</priority></url>`);
  }

  res.header("Content-Type", "application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`);
});

app.get("/robots.txt", (_req, res) => {
  res
    .header("Content-Type", "text/plain")
    .send(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml`);
});

app.get("/manifest.webmanifest", (_req, res) => {
  res.header("Content-Type", "application/manifest+json").json({
    name: SITE_NAME,
    short_name: "¿Cuánto subió?",
    description: "Precios de productos en Costa Rica, comparados y actualizados desde múltiples fuentes del país.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf9",
    theme_color: "#0c6b3a",
    lang: "es",
  });
});

// ---- SPA estático en producción ----
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
}

export default app;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`✦ ¿Cuánto subió.cr? API/SPA server en http://localhost:${PORT} (${PROD ? "producción" : "desarrollo"})`);
  });
}

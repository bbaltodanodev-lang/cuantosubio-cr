import { PrismaClient } from "@prisma/client";
import { geografia, tiendas, categorias, productos } from "./demo-data";

const prisma = new PrismaClient();
const CRC = "CRC";

async function main() {
  console.log("Iniciando seed de ¿Cuánto subió.cr? (exclusivo de Costa Rica)");

  await prisma.scrapeError.deleteMany();
  await prisma.scrapeRun.deleteMany();
  await prisma.sourceSnapshot.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.priceChange.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.price.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productIdentifier.deleteMany();
  await prisma.connector.deleteMany();
  await prisma.source.deleteMany();
  await prisma.storeLocation.deleteMany();
  await prisma.store.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.district.deleteMany();
  await prisma.canton.deleteMany();
  await prisma.province.deleteMany();
  await prisma.region.deleteMany();
  await prisma.country.deleteMany();

  const cr = await prisma.country.create({
    data: { code: "CR", name: "Costa Rica", currency: "CRC", currencySymbol: "₡", timezone: "America/Costa_Rica", isCostaRica: true },
  });

  const provinciaMap = new Map<string, number>();
  const cantonMap = new Map<string, number>();
  for (const p of geografia) {
    const prov = await prisma.province.create({ data: { code: p.nombre, name: p.nombre, countryId: cr.id } });
    provinciaMap.set(p.nombre, prov.id);
    for (const c of p.cantones) {
      const canton = await prisma.canton.create({ data: { code: c, name: c, provinceId: prov.id } });
      cantonMap.set(`${p.nombre}:${c}`, canton.id);
    }
  }

  const storeMap = new Map<string, number>();
  for (const t of tiendas) {
    const store = await prisma.store.create({
      data: {
        name: t.nombre, slug: t.slug, type: t.tipo, website: t.sitio,
        countryId: cr.id, isSupermarket: t.supermercado, logoUrl: t.logo,
      },
    });
    storeMap.set(t.nombre, store.id);
    for (const s of t.sucursales) {
      await prisma.storeLocation.create({
        data: {
          storeId: store.id, name: s.nombre, countryId: cr.id,
          provinceId: provinciaMap.get(s.provincia), cantonId: cantonMap.get(`${s.provincia}:${s.canton}`),
        },
      });
    }
  }

  for (const t of tiendas.filter((x) => x.supermercado)) {
    await prisma.source.createMany({
      data: [{
        name: `Catálogo ${t.nombre}`, slug: `catalogo-${t.slug}`, countryId: cr.id,
        type: "SCRAPER", website: t.sitio, status: "ACTIVE", detectedCurrency: CRC, detectedLocation: "Costa Rica",
      }],
      skipDuplicates: true,
    });
  }
  await prisma.source.createMany({
    data: [
      { name: "INEC (Instituto Nacional de Estadística y Censos)", slug: "inec", countryId: cr.id, type: "OFFICIAL", website: "https://www.inec.cr", status: "ACTIVE", detectedCurrency: CRC, detectedLocation: "Costa Rica" },
      { name: "MEIC (Ministerio de Economía, Industria y Comercio)", slug: "meic", countryId: cr.id, type: "OFFICIAL", website: "https://www.meic.go.cr", status: "ACTIVE", detectedCurrency: CRC, detectedLocation: "Costa Rica" },
    ],
    skipDuplicates: true,
  });

  const subcategoryMap = new Map<string, number>();
  const categoryMap = new Map<string, number>();
  for (const [i, c] of categorias.entries()) {
    const cat = await prisma.category.create({
      data: { name: c.nombre, slug: c.nombre.toLowerCase().replace(/[^a-z0-9]+/g, "-"), group: c.grupo, sort: i },
    });
    categoryMap.set(c.nombre, cat.id);
    for (const sub of c.subcategorias) {
      const s = await prisma.subcategory.create({
        data: { name: sub, slug: sub.toLowerCase().replace(/[^a-z0-9]+/g, "-"), categoryId: cat.id },
      });
      subcategoryMap.set(`${c.nombre}:${sub}`, s.id);
    }
  }

  const brandMap = new Map<string, number>();
  for (const p of productos) {
    if (p.marca && !brandMap.has(p.marca)) {
      const b = await prisma.brand.create({
        data: { name: p.marca, slug: p.marca.toLowerCase().replace(/[^a-z0-9]+/g, "-"), origin: p.marcaOrigen ?? null },
      });
      brandMap.set(p.marca, b.id);
    }
  }

  const now = new Date();
  let idx = 0;

  for (const p of productos) {
    const catId = categoryMap.get(p.categoria);
    const subId = subcategoryMap.get(`${p.categoria}:${p.subcategoria}`);
    const brandId = p.marca ? brandMap.get(p.marca) : null;
    const slug = `${p.nombre} ${p.presentacion}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const product = await prisma.product.create({
      data: {
        name: p.nombre,
        normalizedName: p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        slug,
        brandId,
        categoryId: catId,
        subcategoryId: subId,
        countryId: cr.id,
        isCanastaBasica: p.canasta,
        presenceStatus: "CONFIRMED",
        indexable: true,
        description: `${p.nombre}, presentación de ${p.presentacion}, comercializado y disponible en Costa Rica. Precio observado en supermercados y comercios del país en colones costarricenses (CRC).`,
        shortDescription: `${p.nombre} (${p.presentacion}) disponible en Costa Rica, con precios monitoreados en CRC en múltiples comercios del país.`,
        metaTitle: `Precio de ${p.nombre} en Costa Rica | ${p.presentacion}`,
        metaDescription: `Precio actual de ${p.nombre} (${p.presentacion}) en Costa Rica, comparado entre supermercados y comercios del país. Consulta cuánto subió o bajó en ₡ y actualizaciones por fuente costarricense.`,
        imageUrl: null,
      },
    });

    await prisma.productIdentifier.create({
      data: { productId: product.id, type: "REF", value: `CR-${String(1000 + idx).padStart(4, "0")}` },
    });

    const variant = await prisma.productVariant.create({
      data: {
        productId: product.id, presentation: p.presentacion,
        quantity: p.cantidad, unit: p.unidad, quantityValue: p.precioBase / p.cantidad, isDefault: true,
      },
    });

    const initials = p.nombre.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
    await prisma.productImage.create({
      data: { productId: product.id, url: `/img/ph/${initials || "P"}.svg?c=2f855a`, alt: `${p.nombre} (${p.presentacion})`, isPrimary: true },
    });

    for (const t of p.tiendas) {
      const storeId = storeMap.get(t.tienda) ?? storeMap.get("MasxMenos");
      if (!storeId) continue;
      const loc = await prisma.storeLocation.findFirst({ where: { storeId } });
      const source = await prisma.source.findFirst({ where: { name: { contains: t.tienda } } });

      const historyPoints = [
        { daysAgo: 40, price: p.precioBase },
        { daysAgo: 28, price: p.precioBase + Math.round((t.precio - p.precioBase) * 0.25) },
        { daysAgo: 14, price: p.precioBase + Math.round((t.precio - p.precioBase) * 0.6) },
        { daysAgo: 2, price: t.precio },
      ];

      let prevAmount: number | null = null;
      for (let hi = 0; hi < historyPoints.length; hi++) {
        const hp = historyPoints[hi];
        const captured = new Date(now.getTime() - hp.daysAgo * 86400000);
        const isLatest = hi === historyPoints.length - 1;

        const price = await prisma.price.create({
          data: {
            productId: product.id, variantId: variant.id, storeId,
            storeLocationId: loc?.id ?? null, countryId: cr.id,
            provinceId: loc?.provinceId ?? null, cantonId: loc?.cantonId ?? null,
            amount: hp.price, amountPerUnit: hp.price / p.cantidad, currency: CRC,
            capturedAt: captured, sourceId: source?.id ?? null, availability: "AVAILABLE",
            promotionStatus: t.promocion ?? "NORMAL",
            trustStatus: isLatest ? "VERIFIED" : "HISTORICAL", isLatest,
          },
        });

        await prisma.priceHistory.create({
          data: { priceId: price.id, productId: product.id, capturedAt: captured, amount: hp.price, currency: CRC, sourceId: source?.id ?? null },
        });

        if (prevAmount !== null) {
          await prisma.priceChange.create({
            data: {
              productId: product.id, variantId: variant.id, storeId, countryId: cr.id,
              fromAmount: prevAmount, toAmount: hp.price, currency: CRC,
              absoluteChange: hp.price - prevAmount, percentChange: ((hp.price - prevAmount) / prevAmount) * 100,
              direction: hp.price > prevAmount ? "UP" : hp.price < prevAmount ? "DOWN" : "FLAT",
              period: "MONTH", capturedAt: captured,
            },
          });
        }
        prevAmount = hp.price;
      }
    }
    idx++;
  }

  console.log(`Seed completado: ${productos.length} productos confirmados en Costa Rica.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

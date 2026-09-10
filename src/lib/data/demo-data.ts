// Dataset de demostración de ¿Cuánto subió.cr?
// Solo se usa cuando DEMO_MODE=true y NO hay base de datos disponible.
// Contiene EXCLUSIVAMENTE datos de Costa Rica (country_code = CR, currency = CRC).
// En producción (DEMO_MODE=false) todas las consultas van a PostgreSQL vía Prisma.

export type DemoPrice = {
  store: string;
  storeSlug: string;
  location: { name: string; province: string; canton: string } | null;
  amount: number;
  prevAmount: number; // precio previo monitoreado en CR
  capturedDaysAgo: number;
  promotion: string;
};

export type DemoProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  brandOrigin: string | null;
  category: string;
  categorySlug: string;
  subcategory: string;
  presentation: string;
  quantity: number;
  unit: string;
  canasta: boolean;
  baseAmount: number;
  prices: DemoPrice[];
  description: string;
  shortDescription: string;
};

import {
  productos as seedProductos,
  geografia,
  tiendas,
  categorias,
  type ProductSeed,
  type StoreSeed,
} from "../../../prisma/demo-data";

export { geografia, tiendas, categorias, type ProductSeed, type StoreSeed };

export const productos = seedProductos;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-+/g, "-");
}

export function initialFor(name: string): string {
  const words = name.split(" ").filter(Boolean).slice(0, 2);
  const letters = words.map((w) => w[0]?.toUpperCase() ?? "").join("");
  const palette = ["2f855a", "2b6cb0", "c05621", "6b46c1", "c53030", "2c7a7b"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const color = palette[hash % palette.length];
  return `/img/ph/${letters || "P"}.svg?c=${color}`;
}

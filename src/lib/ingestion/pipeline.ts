/**
 * Pipeline de Ingestión, Normalización y Validación de Precios — CuántoSubió.cr
 *
 * Flujo desacoplado:
 * Raw Ingestion -> Text & Unit Normalization -> Outlier & Anomaly Validation -> Deduplication -> Storage & History
 */

export interface RawScrapedItem {
  rawTitle: string;
  rawPrice: number;
  rawOldPrice?: number | null;
  rawPresentation?: string | null;
  supermarketSlug: string;
  branchName?: string | null;
  province?: string | null;
  canton?: string | null;
  sourceUrl: string;
  externalSku?: string | null;
  barcode?: string | null;
  timestamp?: Date;
}

export interface NormalizedItem {
  name: string;
  brand: string | null;
  category: string;
  presentation: string;
  quantity: number;
  unit: string;
  baseUnit: "kg" | "l" | "und" | "rollo" | "otro";
  currentPrice: number;
  promotionalPrice: number | null;
  currency: "CRC";
  amountPerUnit: number;
  supermarketSlug: string;
  branchName: string | null;
  province: string | null;
  canton: string | null;
  sourceUrl: string;
  externalSku: string | null;
  barcode: string | null;
  capturedAt: Date;
}

export interface ValidationResult {
  isValid: boolean;
  isAnomaly: boolean;
  anomalyReason?: string;
  confidenceScore: number; // 0.0 a 1.0
}

export interface ProcessedPriceRecord {
  normalized: NormalizedItem;
  validation: ValidationResult;
  action: "INSERT_PRICE" | "UPDATE_LAST_SEEN" | "FLAG_FOR_REVIEW" | "REJECT";
  message: string;
}

// -------------------------------------------------------------
// 1. NORMALIZADOR DE TEXTO Y UNIDADES
// -------------------------------------------------------------

export function normalizeProductName(raw: string): { name: string; brand: string | null; presentation: string } {
  const cleaned = raw
    .replace(/\s+/g, " ")
    .trim();

  // Detectar marcas conocidas en Costa Rica
  const knownBrands = [
    "Tío Pelón", "Tio Pelon", "Don Pedro", "Dos Pinos", "Huevo Feliz",
    "Granja Azul", "Café Britt", "Cafe Britt", "Café 1820", "Cafe 1820",
    "Nescafé", "Pipasa", "Clover", "Capullo", "Pronto", "Pastas Roma",
    "Scott", "Ariel", "Sal Sol", "El Viejo", "Lizano", "Colgate",
    "Kellogg's", "Pedigree"
  ];

  let detectedBrand: string | null = null;
  for (const b of knownBrands) {
    const reg = new RegExp(`\\b${b}\\b`, "i");
    if (reg.test(cleaned)) {
      detectedBrand = b;
      break;
    }
  }

  // Detectar presentación (ej. 1.8 kg, 1L, 30 uds, 500g)
  const presentationMatch = cleaned.match(/(\d+(?:[.,]\d+)?)\s*(kg|kilos|g|gramos|l|litros|ml|mililitros|und|unidades|rollos)\b/i);
  let presentation = "1 unidad";
  if (presentationMatch) {
    const qty = presentationMatch[1].replace(",", ".");
    const unit = presentationMatch[2].toLowerCase();
    presentation = `${qty} ${unit}`;
  }

  return {
    name: cleaned,
    brand: detectedBrand,
    presentation,
  };
}

export function parseUnitAndQuantity(presentation: string): { quantity: number; unit: string; baseUnit: "kg" | "l" | "und" | "rollo" | "otro" } {
  const m = presentation.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)/);
  if (!m) {
    return { quantity: 1, unit: "und", baseUnit: "und" };
  }
  const qty = parseFloat(m[1].replace(",", "."));
  const u = m[2].toLowerCase();

  if (u === "kg" || u === "kilos") return { quantity: qty, unit: "kg", baseUnit: "kg" };
  if (u === "g" || u === "gramos") return { quantity: qty, unit: "g", baseUnit: "kg" };
  if (u === "l" || u === "litro" || u === "litros") return { quantity: qty, unit: "l", baseUnit: "l" };
  if (u === "ml" || u === "mililitros") return { quantity: qty, unit: "ml", baseUnit: "l" };
  if (u === "und" || u === "unidad" || u === "unidades") return { quantity: qty, unit: "und", baseUnit: "und" };
  if (u === "rol" || u === "rollo" || u === "rollos") return { quantity: qty, unit: "rol", baseUnit: "rollo" };

  return { quantity: qty, unit: u, baseUnit: "otro" };
}

// -------------------------------------------------------------
// 2. DETECTOR DE ANOMALÍAS Y OUTLIERS
// -------------------------------------------------------------

export function validatePriceAnomaly(
  currentPrice: number,
  historicalAvgPrice?: number | null,
  minExpected = 50,
  maxExpected = 500000
): ValidationResult {
  // Regla 1: Precios absurdos o negativos
  if (currentPrice <= 0 || isNaN(currentPrice) || !isFinite(currentPrice)) {
    return {
      isValid: false,
      isAnomaly: true,
      anomalyReason: `Precio inválido o nulo: ₡${currentPrice}`,
      confidenceScore: 0,
    };
  }

  if (currentPrice < minExpected) {
    return {
      isValid: false,
      isAnomaly: true,
      anomalyReason: `Precio sospechosamente bajo (< ₡${minExpected}): ₡${currentPrice}`,
      confidenceScore: 0.2,
    };
  }

  if (currentPrice > maxExpected) {
    return {
      isValid: false,
      isAnomaly: true,
      anomalyReason: `Precio sospechosamente alto (> ₡${maxExpected}): ₡${currentPrice}`,
      confidenceScore: 0.1,
    };
  }

  // Regla 2: Variaciones porcentuales desmedidas respecto al histórico (ej. > 100% de subida repentina o < 80% de caída)
  if (historicalAvgPrice && historicalAvgPrice > 0) {
    const ratio = currentPrice / historicalAvgPrice;
    if (ratio > 2.0) {
      return {
        isValid: true,
        isAnomaly: true,
        anomalyReason: `Posible error de digitación: aumento de +${Math.round((ratio - 1) * 100)}% respecto al histórico (₡${historicalAvgPrice} -> ₡${currentPrice})`,
        confidenceScore: 0.4,
      };
    }
    if (ratio < 0.25) {
      return {
        isValid: true,
        isAnomaly: true,
        anomalyReason: `Posible error o promoción extrema: caída del ${Math.round((1 - ratio) * 100)}% respecto al histórico (₡${historicalAvgPrice} -> ₡${currentPrice})`,
        confidenceScore: 0.4,
      };
    }
  }

  return {
    isValid: true,
    isAnomaly: false,
    confidenceScore: 0.95,
  };
}

// -------------------------------------------------------------
// 3. PIPELINE DE PROCESAMIENTO COMPLETO
// -------------------------------------------------------------

export function processScrapedItem(
  item: RawScrapedItem,
  lastKnownPrice?: number | null
): ProcessedPriceRecord {
  const { name, brand, presentation } = normalizeProductName(item.rawTitle);
  const { quantity, unit, baseUnit } = parseUnitAndQuantity(item.rawPresentation ?? presentation);

  // Calcular precio por unidad
  let amountPerUnit = item.rawPrice;
  if (baseUnit === "kg" && unit === "g") {
    amountPerUnit = Math.round(item.rawPrice / (quantity / 1000));
  } else if (baseUnit === "l" && unit === "ml") {
    amountPerUnit = Math.round(item.rawPrice / (quantity / 1000));
  } else if (quantity > 0) {
    amountPerUnit = Math.round(item.rawPrice / quantity);
  }

  const normalized: NormalizedItem = {
    name,
    brand,
    category: "Abarrotes",
    presentation,
    quantity,
    unit,
    baseUnit,
    currentPrice: item.rawPrice,
    promotionalPrice: item.rawOldPrice && item.rawOldPrice > item.rawPrice ? item.rawPrice : null,
    currency: "CRC",
    amountPerUnit,
    supermarketSlug: item.supermarketSlug,
    branchName: item.branchName ?? null,
    province: item.province ?? null,
    canton: item.canton ?? null,
    sourceUrl: item.sourceUrl,
    externalSku: item.externalSku ?? null,
    barcode: item.barcode ?? null,
    capturedAt: item.timestamp ?? new Date(),
  };

  const validation = validatePriceAnomaly(item.rawPrice, lastKnownPrice);

  if (!validation.isValid) {
    return {
      normalized,
      validation,
      action: "REJECT",
      message: validation.anomalyReason ?? "Registro rechazado por datos inválidos.",
    };
  }

  if (validation.isAnomaly) {
    return {
      normalized,
      validation,
      action: "FLAG_FOR_REVIEW",
      message: `Marcado para revisión: ${validation.anomalyReason}`,
    };
  }

  // Deduplicación: Si el precio no cambió respecto al último registrado, solo actualizar timestamp
  if (lastKnownPrice !== undefined && lastKnownPrice !== null && lastKnownPrice === item.rawPrice) {
    return {
      normalized,
      validation,
      action: "UPDATE_LAST_SEEN",
      message: "Precio idéntico al anterior; se actualiza last_seen_at sin generar ruido histórico.",
    };
  }

  return {
    normalized,
    validation,
    action: "INSERT_PRICE",
    message: "Nuevo precio validado y registrado en el historial.",
  };
}

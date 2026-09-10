const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const outputDir = path.resolve("public/img/products");

// Fotos de producto tomadas de los catálogos públicos de supermercados en Costa Rica.
// Se guardan localmente para evitar depender del hotlinking en producción.
const sources = {
  "arroz-blanco-1-8-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1023080/arroz-tio-pelon-99-grano-entero-enriquecido-1-8-kg-7441006022390.webp?v=638991622451700000",
  "arroz-integral-1-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1099220/arroz-bio-integral-tio-pelon-95-grano-entero-1000-g-7441006003610.webp?v=639129243019900000",
  "frijoles-negros-1-kg": "https://ik.imagekit.io/autoenlinea/imgjpg/193905.jpg",
  "frijoles-rojos-1-kg": "https://ik.imagekit.io/autoenlinea/imgjpg/193906.jpg",
  "leche-entera-1-l": "https://walmartcr.vteximg.com.br/arquivos/ids/723240/4306_01.jpg?v=638629891818230000",
  "leche-semidescremada-1-l": "https://walmartcr.vteximg.com.br/arquivos/ids/752338/8969_01.jpg?v=638654984467830000",
  "huevos-30-unidades": "https://walmartcr.vteximg.com.br/arquivos/ids/1113937/M-6_walmartcr_UIUVkxsZxa_65538_01.jpg?v=639153582106470000",
  "huevos-12-unidades": "https://walmartcr.vteximg.com.br/arquivos/ids/469975/Huevo-Gallina-Don-Cristobal-Tama-o-Jumbo-Cart-n-De-12-Unidades-Precio-Indicado-Por-Kilo-1-85789.jpg?v=638339529791870000",
  "cafe-molido-340-g": "https://walmartcr.vteximg.com.br/arquivos/ids/588536/Caf-Britt-Gourmet-Grano-Oscuro-340gr-1-46851.jpg?v=638484147430500000",
  "cafe-clasico-500-g": "https://walmartcr.vteximg.com.br/arquivos/ids/381098/Caf-100-Puro-Arabica-Marca-1820-Molido-Cl-sico-Tueste-Oscuro-500gr-1-31832.jpg?v=638110677765130000",
  "cafe-soluble-170-g": "https://walmartcr.vteximg.com.br/arquivos/ids/1080108/cafe-soluble-nes-cafe-clasico-200-g-7506475111676.webp?v=639088795147230000",
  "pollo-entero-1-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1107083/pollo-entero-sin-menudos-empacado-kg-2655520000009.jpg?v=639142791740070000",
  "pechuga-pollo-1-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1164169/pechuga-de-pollo-entera-don-cristobal-precio-indicado-por-kilo-2690660000007.webp?v=639216540589800000",
  "aceite-girasol-1-l": "https://walmartcr.vteximg.com.br/arquivos/ids/540034/Aceite-Clover-Girasol-900ml-1-86711.jpg?v=638426794870000000",
  "aceite-vegetal-900-ml": "https://walmartcr.vteximg.com.br/arquivos/ids/536614/Aceite-Sabemas-Soya-900ml-1-83559.jpg?v=638422925334970000",
  "atun-enlatado-140-g": "https://walmartcr.vteximg.com.br/arquivos/ids/536123/At-n-Pronto-Trocitos-En-Aceite-140gr-1-34405.jpg?v=638422922509330000",
  "pasta-spaghetti-500-g": "https://walmartcr.vteximg.com.br/arquivos/ids/1085758/pasta-espagueti-roma-no-7-500-g-0731701002047.webp?v=639098745059900000",
  "papel-higienico-12-rollos": "https://walmartcr.vteximg.com.br/arquivos/ids/969329/49660_01.jpg?v=638887911974170000",
  "detergente-polvo-1-2-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1166677/detergente-ariel-en-polvo-poder-y-cuidado-8-lavadas-1-kg-7501007455761.jpg?v=639220633146100000",
  "queso-crema-250-g": "https://walmartcr.vteximg.com.br/arquivos/ids/880677/11491_01.jpg?v=638762145749530000",
  "banano-1-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1066397/banano-criollo-kilo-sf-2674510000003.jpg?v=639064470713370000",
  "tomate-1-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/1176833/tomate-kg-5-a-8-unidades-por-kg-aproximadamente-2646640000000.webp?v=639232071266400000",
  "sal-mesa-500-g": "https://walmartcr.vteximg.com.br/arquivos/ids/536077/Sal-Sol-Refinada-Con-Yodo-y-Fluor-Bolsa-500gr-1-30088.jpg?v=638422922236100000",
  "azucar-1-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/807590/7678_01.jpg?v=638695594865500000",
  "salsa-lizano-700-ml": "https://walmartcr.vteximg.com.br/arquivos/ids/508040/Salsa-Lizano-Criolla-Botella-700ml-1-25828.jpg?v=638416006977900000",
  "pasta-dental-125-g": "https://walmartcr.vteximg.com.br/arquivos/ids/1160500/pasta-dental-colgate-triple-accion-150-ml-7509546000350.webp?v=639213861190400000",
  "cereal-caja-430-g": "https://walmartcr.vteximg.com.br/arquivos/ids/1033448/cereal-kelloggs-corn-flakes-500-g-7501008041000.webp?v=639010695022470000",
  "comida-perros-3-kg": "https://walmartcr.vteximg.com.br/arquivos/ids/921446/3534_01.jpg?v=638826744086170000",
};

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 CuantoSubioCR product image refresh" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function saveProductImage(slug, sourceUrl) {
  const source = await downloadImage(sourceUrl);
  const pipeline = sharp(source)
    .rotate()
    .flatten({ background: "#ffffff" })
    .resize({ width: 800, height: 600, fit: "contain", background: "#ffffff" });

  await Promise.all([
    pipeline.clone().webp({ quality: 90 }).toFile(path.join(outputDir, `${slug}.webp`)),
    pipeline.clone().png().toFile(path.join(outputDir, `${slug}.png`)),
  ]);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const entries = Object.entries(sources);
  for (const [slug, sourceUrl] of entries) {
    await saveProductImage(slug, sourceUrl);
    console.log(`OK ${slug}`);
  }
  console.log(`Downloaded ${entries.length} supermarket product images.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

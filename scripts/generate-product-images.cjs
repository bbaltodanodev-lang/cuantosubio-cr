const { spawnSync } = require("node:child_process");
const path = require("node:path");

// Compatibilidad con el nombre anterior: las imágenes ya no se dibujan como tarjetas.
// Se refrescan desde fotos de producto de catálogos de supermercados.
const script = path.join(__dirname, "fetch-supermarket-images.cjs");
const result = spawnSync(process.execPath, [script], { stdio: "inherit" });
process.exitCode = result.status ?? 1;

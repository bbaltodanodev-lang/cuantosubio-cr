import { build } from "esbuild";

await build({
  entryPoints: ["server/index.ts"],
  outfile: "api/server-bundle.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  packages: "external",
  sourcemap: false,
});

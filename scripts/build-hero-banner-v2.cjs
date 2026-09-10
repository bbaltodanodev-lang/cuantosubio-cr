const sharp = require("sharp");
const path = require("path");

const root = path.resolve(__dirname, "..");
const brandDir = path.join(root, "public", "img", "brand");
const productsDir = path.join(root, "public", "img", "products");

const width = 1800;
const height = 720;

function card(x, y, label, file, accent) {
  const image = path.join(productsDir, file);
  const frame = Buffer.from(`
    <svg width="330" height="292" viewBox="0 0 330 292" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#0b2c4a" flood-opacity=".14"/>
        </filter>
      </defs>
      <rect x="4" y="4" width="322" height="284" rx="28" fill="#ffffff" stroke="#dce8ee" stroke-width="2" filter="url(#shadow)"/>
      <rect x="20" y="20" width="290" height="222" rx="20" fill="#f7fafb"/>
      <rect x="20" y="250" width="290" height="20" rx="10" fill="${accent}" opacity=".14"/>
      <circle cx="38" cy="260" r="5" fill="${accent}"/>
      <text x="53" y="265" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700" fill="#17324d">${label}</text>
    </svg>
  `);
  return { image, frame, left: x, top: y };
}

async function build() {
  const logo = await sharp(path.join(brandDir, "logo.png"))
    .resize(640, 640, { fit: "contain" })
    .png()
    .toBuffer();

  const cards = [
    card(760, 58, "Arroz y granos", "arroz-blanco-1-8-kg.png", "#087443"),
    card(1110, 58, "Huevos y lácteos", "huevos-30-unidades.png", "#1464a0"),
    card(760, 365, "Productos frescos", "tomate-1-kg.png", "#d52d3a"),
    card(1110, 365, "Precios comparables", "leche-entera-1-l.png", "#d68b1b"),
  ];

  const layers = [
    { input: logo, left: 82, top: 42 },
    ...cards.map((c) => ({ input: c.frame, left: c.left, top: c.top })),
    ...await Promise.all(cards.map(async (c) => ({
      input: await sharp(c.image).resize(290, 222, { fit: "contain", background: { r: 247, g: 250, b: 251, alpha: 1 } }).png().toBuffer(),
      left: c.left + 20,
      top: c.top + 20,
    }))),
  ];

  const background = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f8fcff"/>
          <stop offset=".52" stop-color="#eef8f2"/>
          <stop offset="1" stop-color="#e4f1fb"/>
        </linearGradient>
        <radialGradient id="glow" cx=".15" cy=".14" r=".8">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".95"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#0b7a4b" opacity=".08"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#glow)"/>
      <rect width="${width}" height="${height}" fill="url(#dots)"/>
      <path d="M700 0H1800V720H700C850 590 872 420 805 270C765 179 730 84 700 0Z" fill="#ffffff" opacity=".5"/>
      <path d="M0 655C270 610 510 630 760 704H0Z" fill="#087443" opacity=".08"/>
      <text x="770" y="35" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="3" fill="#087443">DATOS PARA DECIDIR MEJOR</text>
      <rect x="1478" y="292" width="252" height="96" rx="22" fill="#ffffff" opacity=".78" stroke="#d7e9e4"/>
      <text x="1502" y="324" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="1.7" fill="#087443">COSTA RICA</text>
      <text x="1502" y="353" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="#17324d">Precios reales</text>
      <text x="1502" y="376" font-family="Inter, Arial, sans-serif" font-size="13" fill="#547082">para decidir mejor</text>
    </svg>
  `);

  const output = sharp({ create: { width, height, channels: 4, background: { r: 247, g: 251, b: 252, alpha: 1 } } })
    .composite([{ input: background }, ...layers])
    .png({ compressionLevel: 9 });

  await output.clone().toFile(path.join(brandDir, "hero-banner-v2.png"));
  await output.webp({ quality: 94, smartSubsample: true }).toFile(path.join(brandDir, "hero-banner-v2.webp"));
  const socialHero = await sharp(path.join(brandDir, "hero-banner-v2.png"))
    .resize(1200, 480, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: { r: 247, g: 251, b: 252 } },
  })
    .composite([{ input: socialHero, left: 0, top: 75 }])
    .jpeg({ quality: 93, chromaSubsampling: "4:4:4" })
    .toFile(path.join(brandDir, "og-image-v2.jpg"));
  console.log(`Generated ${path.join(brandDir, "hero-banner-v2.png")}`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});

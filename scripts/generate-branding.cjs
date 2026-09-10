const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadedDir = 'C:\\Users\\berna\\.gemini\\antigravity-ide\\brain\\7712044e-935c-417c-b3e7-f5877da99db9\\.user_uploaded';
const brandDir = path.resolve('public/img/brand');
const iconsDir = path.resolve('public/icons');
fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(iconsDir, { recursive: true });

async function processAssets() {
  console.log('1. Processing circular badge logo...');
  const badgePath = path.join(uploadedDir, 'media_1788957175245.jpg');
  
  // The badge image is 1024x1024. Circle mask for clean transparent outer area
  const circleMask = Buffer.from(
    `<svg width="1024" height="1024"><circle cx="512" cy="512" r="498" fill="white"/></svg>`
  );

  const logoTransparent = await sharp(badgePath)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandDir, 'logo.png'), logoTransparent);
  
  // WebP and sized versions
  await sharp(logoTransparent).webp({ quality: 95 }).toFile(path.join(brandDir, 'logo.webp'));
  await sharp(logoTransparent).resize(120, 120).webp({ quality: 95 }).toFile(path.join(brandDir, 'logo-badge.webp'));
  await sharp(logoTransparent).resize(64, 64).png().toFile(path.join(brandDir, 'logo-64.png'));

  console.log('2. Generating PWA & Favicon assets...');
  await sharp(logoTransparent).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-512.png'));
  await sharp(logoTransparent).resize(192, 192).png().toFile(path.join(iconsDir, 'icon-192.png'));
  await sharp(logoTransparent).resize(180, 180).png().toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  await sharp(logoTransparent).resize(32, 32).png().toFile(path.resolve('public/favicon-32x32.png'));
  await sharp(logoTransparent).resize(16, 16).png().toFile(path.resolve('public/favicon-16x16.png'));
  await sharp(logoTransparent).resize(48, 48).png().toFile(path.resolve('public/favicon.ico'));

  console.log('3. Processing Banner image...');
  const bannerFile = path.join(uploadedDir, 'media_1788957168024.jpg');
  // Crop coords: top: 436, height: 152, width: 471
  const bannerCropped = await sharp(bannerFile)
    .extract({ left: 0, top: 436, width: 471, height: 152 })
    .toBuffer();

  await sharp(bannerCropped).png().toFile(path.join(brandDir, 'hero-banner.png'));
  await sharp(bannerCropped).webp({ quality: 92 }).toFile(path.join(brandDir, 'hero-banner.webp'));

  console.log('4. Generating Open Graph social share image (1200x630)...');
  const bannerResized = await sharp(bannerCropped).resize(700, 225, { fit: 'contain' }).png().toBuffer();
  const badgeResized = await sharp(logoTransparent).resize(380, 380).png().toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 247, g: 250, b: 248, alpha: 1 }
    }
  })
  .composite([
    { input: badgeResized, left: 70, top: 125 },
    { input: bannerResized, left: 470, top: 200 }
  ])
  .jpeg({ quality: 92 })
  .toFile(path.join(brandDir, 'og-image.jpg'));

  console.log('Brand assets generated successfully!');
}

processAssets().catch(err => {
  console.error(err);
  process.exit(1);
});

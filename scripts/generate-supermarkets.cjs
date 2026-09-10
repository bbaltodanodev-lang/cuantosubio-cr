const fs = require('fs');
const path = require('path');

const dir = path.resolve('public/img/supermercados');
fs.mkdirSync(dir, { recursive: true });

const logos = {
  'walmart.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#ffffff"/>
    <text x="24" y="32" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="24" font-weight="800" fill="#0071ce" letter-spacing="-0.5">Walmart</text>
    <g transform="translate(132, 12)">
      <path d="M12 0v6M12 18v6M0 12h6M18 12h6M3.5 3.5l4.2 4.2M16.3 16.3l4.2 4.2M3.5 20.5l4.2-4.2M16.3 7.7l4.2-4.2" stroke="#ffc220" stroke-width="3.5" stroke-linecap="round"/>
    </g>
  </svg>`,

  'automercado.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#0c4a34"/>
    <text x="100" y="26" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="16" font-weight="800" fill="#ffffff" letter-spacing="1.5">AUTO MERCADO</text>
    <text x="100" y="38" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="8" font-weight="600" fill="#a7f3d0" letter-spacing="2">DESDE 1960</text>
  </svg>`,

  'masxmenos.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#dc2626"/>
    <text x="20" y="32" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="21" font-weight="900" fill="#ffffff" letter-spacing="-0.5">mas</text>
    <rect x="68" y="14" width="22" height="22" rx="4" fill="#16a34a"/>
    <text x="79" y="30" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="18" font-weight="900" fill="#ffffff">x</text>
    <text x="96" y="32" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="21" font-weight="900" fill="#ffffff" letter-spacing="-0.5">menos</text>
  </svg>`,

  'pali.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#facc15"/>
    <path d="M16 8h168c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H16c-4.4 0-8-3.6-8-8V16c0-4.4 3.6-8 8-8z" fill="#dc2626"/>
    <text x="100" y="32" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="24" font-weight="900" fill="#ffffff" font-style="italic" letter-spacing="2">Pali</text>
  </svg>`,

  'maxipali.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#15803d"/>
    <text x="24" y="32" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="22" font-weight="900" fill="#fde047" font-style="italic">MAXI</text>
    <rect x="94" y="10" width="86" height="28" rx="6" fill="#dc2626"/>
    <text x="137" y="30" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="19" font-weight="900" fill="#ffffff" font-style="italic">Pali</text>
  </svg>`,

  'megasuper.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#dc2626"/>
    <path d="M20 12h160v24H20z" fill="#facc15"/>
    <text x="100" y="29" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="17" font-weight="900" fill="#dc2626" letter-spacing="1">MEGASUPER</text>
  </svg>`,

  'pricesmart.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#003566"/>
    <g transform="translate(18, 12)">
      <polygon points="12,0 24,12 12,24 0,12" fill="#dc2626"/>
      <polygon points="12,4 20,12 12,20 4,12" fill="#ffffff"/>
    </g>
    <text x="54" y="31" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="19" font-weight="800" fill="#ffffff" letter-spacing="-0.3">PriceSmart</text>
  </svg>`,

  'super-servicentro.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
    <rect width="200" height="48" rx="8" fill="#1e293b"/>
    <circle cx="28" cy="24" r="12" fill="#2563eb"/>
    <path d="M28 17l4 8h-8z" fill="#ffffff"/>
    <text x="50" y="27" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="14" font-weight="700" fill="#ffffff">Súper Servicentro</text>
    <text x="50" y="38" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="9" font-weight="500" fill="#94a3b8">Tienda de Conveniencia</text>
  </svg>`
};

for (const [file, content] of Object.entries(logos)) {
  fs.writeFileSync(path.join(dir, file), content.trim());
  console.log('Created logo:', file);
}
console.log('All supermarket logos created successfully.');

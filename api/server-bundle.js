var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// prisma/demo-data.ts
var geografia, tiendasCatalogo, tiendas, categorias, productos;
var init_demo_data = __esm({
  "prisma/demo-data.ts"() {
    "use strict";
    geografia = [
      { nombre: "San Jos\xE9", cantones: ["San Jos\xE9", "Escaz\xFA", "Desamparados", "Puriscal", "Tarraz\xFA", "Aserr\xED", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "V\xE1zquez de Coronado", "Acosta", "Tib\xE1s", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "P\xE9rez Zeled\xF3n", "Le\xF3n Cort\xE9s Castro"] },
      { nombre: "Alajuela", cantones: ["Alajuela", "San Ram\xF3n", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Po\xE1s", "Orotina", "San Carlos", "Zarcero", "Sarch\xED", "Upala", "Los Chiles", "Guatuso", "R\xEDo Cuarto"] },
      { nombre: "Cartago", cantones: ["Cartago", "Para\xEDso", "La Uni\xF3n", "Jim\xE9nez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"] },
      { nombre: "Heredia", cantones: ["Heredia", "Barva", "Santo Domingo", "Santa B\xE1rbara", "San Rafael", "San Isidro", "Bel\xE9n", "Flores", "San Pablo", "Sarapiqu\xED"] },
      { nombre: "Guanacaste", cantones: ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Ca\xF1as", "Abangares", "Tilar\xE1n", "Nandayure", "La Cruz", "Hojancha"] },
      { nombre: "Puntarenas", cantones: ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito", "Monteverde", "Puerto Jim\xE9nez"] },
      { nombre: "Lim\xF3n", cantones: ["Lim\xF3n", "Pococ\xED", "Siquirres", "Talamanca", "Matina", "Gu\xE1cimo"] }
    ];
    tiendasCatalogo = [
      {
        nombre: "Walmart Costa Rica",
        slug: "walmart-costa-rica",
        tipo: "SUPERMARKET",
        sitio: "https://www.walmart.co.cr",
        supermercado: true,
        logo: "/img/supermercados/originales/walmart-official.png",
        sucursales: [
          { nombre: "Walmart Curridabat", provincia: "San Jos\xE9", canton: "Curridabat" },
          { nombre: "Walmart Escaz\xFA", provincia: "San Jos\xE9", canton: "Escaz\xFA" },
          { nombre: "Walmart San Sebasti\xE1n", provincia: "San Jos\xE9", canton: "San Jos\xE9" },
          { nombre: "Walmart Alajuela", provincia: "Alajuela", canton: "Alajuela" },
          { nombre: "Walmart Heredia", provincia: "Heredia", canton: "Heredia" },
          { nombre: "Walmart Cartago", provincia: "Cartago", canton: "Cartago" },
          { nombre: "Walmart Liberia", provincia: "Guanacaste", canton: "Liberia" },
          { nombre: "Walmart Puntarenas", provincia: "Puntarenas", canton: "Puntarenas" }
        ]
      },
      {
        nombre: "Automercado",
        slug: "automercado",
        tipo: "SUPERMARKET",
        sitio: "https://www.automercado.cr",
        supermercado: true,
        logo: "/img/supermercados/originales/automercado-display.png",
        sucursales: [
          { nombre: "Automercado San Rafael", provincia: "San Jos\xE9", canton: "Escaz\xFA" },
          { nombre: "Automercado Las Palmas", provincia: "San Jos\xE9", canton: "Santa Ana" },
          { nombre: "Automercado Multiplaza Curridabat", provincia: "San Jos\xE9", canton: "Curridabat" },
          { nombre: "Automercado Los Yoses", provincia: "San Jos\xE9", canton: "Montes de Oca" },
          { nombre: "Automercado Alajuela", provincia: "Alajuela", canton: "Alajuela" },
          { nombre: "Automercado Heredia", provincia: "Heredia", canton: "Heredia" },
          { nombre: "Automercado Playas del Coco", provincia: "Guanacaste", canton: "Carrillo" },
          { nombre: "Automercado Tamarindo", provincia: "Guanacaste", canton: "Santa Cruz" },
          { nombre: "Automercado Herradura", provincia: "Puntarenas", canton: "Garabito" }
        ]
      },
      {
        nombre: "MasxMenos",
        slug: "masxmenos",
        tipo: "SUPERMARKET",
        sitio: "https://www.masxmenos.cr",
        supermercado: true,
        logo: "/img/supermercados/originales/masxmenos-display.png",
        sucursales: [
          { nombre: "MasxMenos Paseo Col\xF3n", provincia: "San Jos\xE9", canton: "San Jos\xE9" },
          { nombre: "MasxMenos Sabana", provincia: "San Jos\xE9", canton: "San Jos\xE9" },
          { nombre: "MasxMenos San Pedro", provincia: "San Jos\xE9", canton: "Montes de Oca" },
          { nombre: "MasxMenos Alajuela", provincia: "Alajuela", canton: "Alajuela" },
          { nombre: "MasxMenos Heredia", provincia: "Heredia", canton: "Heredia" },
          { nombre: "MasxMenos Cartago", provincia: "Cartago", canton: "Cartago" },
          { nombre: "MasxMenos Jac\xF3", provincia: "Puntarenas", canton: "Garabito" },
          { nombre: "MasxMenos Lim\xF3n", provincia: "Lim\xF3n", canton: "Lim\xF3n" }
        ]
      },
      {
        nombre: "Pal\xED",
        slug: "pali",
        tipo: "SUPERMARKET",
        sitio: "https://www.walmart.co.cr",
        supermercado: true,
        logo: "/img/supermercados/originales/pali-display.png",
        sucursales: [
          { nombre: "Pal\xED Desamparados", provincia: "San Jos\xE9", canton: "Desamparados" },
          { nombre: "Pal\xED Alajuela Centro", provincia: "Alajuela", canton: "Alajuela" },
          { nombre: "Pal\xED San Ram\xF3n", provincia: "Alajuela", canton: "San Ram\xF3n" },
          { nombre: "Pal\xED Cartago Centro", provincia: "Cartago", canton: "Cartago" },
          { nombre: "Pal\xED Turrialba", provincia: "Cartago", canton: "Turrialba" },
          { nombre: "Pal\xED Heredia Centro", provincia: "Heredia", canton: "Heredia" },
          { nombre: "Pal\xED Nicoya", provincia: "Guanacaste", canton: "Nicoya" },
          { nombre: "Pal\xED Santa Cruz", provincia: "Guanacaste", canton: "Santa Cruz" },
          { nombre: "Pal\xED Puntarenas Centro", provincia: "Puntarenas", canton: "Puntarenas" },
          { nombre: "Pal\xED Esparza", provincia: "Puntarenas", canton: "Esparza" },
          { nombre: "Pal\xED Lim\xF3n Centro", provincia: "Lim\xF3n", canton: "Lim\xF3n" },
          { nombre: "Pal\xED Gu\xE1piles", provincia: "Lim\xF3n", canton: "Pococ\xED" },
          { nombre: "Pal\xED Siquirres", provincia: "Lim\xF3n", canton: "Siquirres" }
        ]
      },
      {
        nombre: "MaxiPal\xED",
        slug: "maxipali",
        tipo: "SUPERMARKET",
        sitio: "https://www.masxmenos.cr",
        supermercado: true,
        logo: "/img/supermercados/originales/maxipali-display.png",
        sucursales: [
          { nombre: "MaxiPal\xED Santa Ana", provincia: "San Jos\xE9", canton: "Santa Ana" },
          { nombre: "MaxiPal\xED Alajuelita", provincia: "San Jos\xE9", canton: "Alajuelita" },
          { nombre: "MaxiPal\xED Heredia", provincia: "Heredia", canton: "Heredia" },
          { nombre: "MaxiPal\xED El Guarco", provincia: "Cartago", canton: "El Guarco" },
          { nombre: "MaxiPal\xED Liberia", provincia: "Guanacaste", canton: "Liberia" },
          { nombre: "MaxiPal\xED Quepos", provincia: "Puntarenas", canton: "Quepos" },
          { nombre: "MaxiPal\xED Gu\xE1piles", provincia: "Lim\xF3n", canton: "Pococ\xED" }
        ]
      },
      {
        nombre: "PriceSmart Costa Rica",
        slug: "pricesmart-costa-rica",
        tipo: "CLUB",
        sitio: "https://www.pricesmart.com/site/cr/es",
        supermercado: true,
        logo: "/img/supermercados/originales/pricesmart-display.png",
        sucursales: [
          { nombre: "PriceSmart Curridabat", provincia: "San Jos\xE9", canton: "Curridabat" },
          { nombre: "PriceSmart Escaz\xFA", provincia: "San Jos\xE9", canton: "Escaz\xFA" },
          { nombre: "PriceSmart Zapote", provincia: "San Jos\xE9", canton: "San Jos\xE9" },
          { nombre: "PriceSmart Alajuela", provincia: "Alajuela", canton: "Alajuela" },
          { nombre: "PriceSmart Heredia", provincia: "Heredia", canton: "Heredia" },
          { nombre: "PriceSmart Tres R\xEDos", provincia: "Cartago", canton: "La Uni\xF3n" },
          { nombre: "PriceSmart Liberia", provincia: "Guanacaste", canton: "Liberia" }
        ]
      },
      {
        nombre: "Megasuper",
        slug: "megasuper",
        tipo: "SUPERMARKET",
        sitio: "https://www.megasuper.com",
        supermercado: true,
        logo: "/img/supermercados/originales/megasuper-display.png",
        sucursales: [
          { nombre: "Megasuper Barrio La California", provincia: "San Jos\xE9", canton: "San Jos\xE9" },
          { nombre: "Megasuper Tib\xE1s", provincia: "San Jos\xE9", canton: "Tib\xE1s" },
          { nombre: "Megasuper Rohrmoser", provincia: "San Jos\xE9", canton: "San Jos\xE9" },
          { nombre: "Megasuper Alajuela", provincia: "Alajuela", canton: "Alajuela" },
          { nombre: "Megasuper Cartago", provincia: "Cartago", canton: "Cartago" },
          { nombre: "Megasuper Puntarenas", provincia: "Puntarenas", canton: "Puntarenas" }
        ]
      },
      {
        nombre: "S\xFAper Servicentro",
        slug: "super-servicentro",
        tipo: "COMMERCE",
        sitio: null,
        supermercado: true,
        logo: "/img/supermercados/super-servicentro.svg",
        sucursales: [
          { nombre: "S\xFAper Servicentro San Jos\xE9", provincia: "San Jos\xE9", canton: "San Jos\xE9" }
        ]
      },
      {
        nombre: "Peri",
        slug: "peri",
        tipo: "SUPERMARKET",
        sitio: "https://gessa.cr/marcas/peri",
        supermercado: true,
        logo: "/img/supermercados/peri.svg",
        sucursales: [{ nombre: "Peri San Pedro", provincia: "San Jos\xE9", canton: "Montes de Oca" }]
      },
      {
        nombre: "Super Compro",
        slug: "super-compro",
        tipo: "SUPERMARKET",
        sitio: "https://gessa.cr/marcas/super-compro",
        supermercado: true,
        logo: "/img/supermercados/super-compro.svg",
        sucursales: [{ nombre: "Super Compro Liberia", provincia: "Guanacaste", canton: "Liberia" }]
      },
      {
        nombre: "Saretto",
        slug: "saretto",
        tipo: "SUPERMARKET",
        sitio: "https://gessa.cr/marcas/saretto",
        supermercado: true,
        logo: "/img/supermercados/saretto.svg",
        sucursales: [{ nombre: "Saretto Escaz\xFA", provincia: "San Jos\xE9", canton: "Escaz\xFA" }]
      },
      {
        nombre: "S\xFAper V\xEDquez",
        slug: "super-viquez",
        tipo: "SUPERMARKET",
        sitio: "https://gessa.cr/marcas/super-viquez",
        supermercado: true,
        logo: "/img/supermercados/super-viquez.svg",
        sucursales: [{ nombre: "S\xFAper V\xEDquez Heredia", provincia: "Heredia", canton: "Heredia" }]
      },
      {
        nombre: "Vindi",
        slug: "vindi",
        tipo: "CONVENIENCE",
        sitio: "https://www.automercado.cr",
        supermercado: true,
        logo: "/img/supermercados/vindi.svg",
        sucursales: [{ nombre: "Vindi Escaz\xFA", provincia: "San Jos\xE9", canton: "Escaz\xFA" }]
      },
      {
        nombre: "Fresh Market",
        slug: "fresh-market",
        tipo: "CONVENIENCE",
        sitio: "https://www.automercado.cr",
        supermercado: true,
        logo: "/img/supermercados/fresh-market.svg",
        sucursales: [{ nombre: "Fresh Market Santa Ana", provincia: "San Jos\xE9", canton: "Santa Ana" }]
      },
      {
        nombre: "AMPM",
        slug: "ampm",
        tipo: "CONVENIENCE",
        sitio: "https://www.ampm.cr",
        supermercado: true,
        logo: "/img/supermercados/ampm.svg",
        sucursales: [{ nombre: "AMPM San Jos\xE9", provincia: "San Jos\xE9", canton: "San Jos\xE9" }]
      },
      {
        nombre: "Delimart",
        slug: "delimart",
        tipo: "CONVENIENCE",
        sitio: "https://gessa.cr/marcas/delimart",
        supermercado: true,
        logo: "/img/supermercados/delimart.svg",
        sucursales: [{ nombre: "Delimart San Jos\xE9", provincia: "San Jos\xE9", canton: "San Jos\xE9" }]
      },
      {
        nombre: "Mayca",
        slug: "mayca",
        tipo: "WHOLESALE",
        sitio: "https://www.mayca.com",
        supermercado: true,
        logo: "/img/supermercados/mayca.svg",
        sucursales: [{ nombre: "Mayca Heredia", provincia: "Heredia", canton: "Heredia" }]
      },
      {
        nombre: "Peque\xF1o Mundo",
        slug: "pequeno-mundo",
        tipo: "RETAIL",
        sitio: "https://www.pequenomundo.com",
        supermercado: true,
        logo: "/img/supermercados/pequeno-mundo.svg",
        sucursales: [{ nombre: "Peque\xF1o Mundo San Jos\xE9", provincia: "San Jos\xE9", canton: "San Jos\xE9" }]
      },
      {
        nombre: "Maxiconsumo",
        slug: "maxiconsumo",
        tipo: "WHOLESALE",
        sitio: "https://gessa.cr",
        supermercado: true,
        logo: "/img/supermercados/maxiconsumo.svg",
        sucursales: [{ nombre: "Maxiconsumo Alajuela", provincia: "Alajuela", canton: "Alajuela" }]
      },
      {
        nombre: "Super F\xE1cil",
        slug: "super-facil",
        tipo: "SUPERMARKET",
        sitio: "https://gessa.cr",
        supermercado: true,
        logo: "/img/supermercados/super-facil.svg",
        sucursales: [{ nombre: "Super F\xE1cil San Jos\xE9", provincia: "San Jos\xE9", canton: "San Jos\xE9" }]
      }
    ];
    tiendas = tiendasCatalogo.slice(0, 7);
    categorias = [
      { nombre: "Arroz y Granos", grupo: "Alimentaci\xF3n", subcategorias: ["Arroz blanco", "Arroz integral", "Frijoles negros", "Frijoles rojos", "Lentejas", "Garbanzos"] },
      { nombre: "L\xE1cteos y Huevos", grupo: "Alimentaci\xF3n", subcategorias: ["Leche", "Queso", "Huevos", "Yogur", "Mantequilla"] },
      { nombre: "Carnes y Pollo", grupo: "Alimentaci\xF3n", subcategorias: ["Pollo entero", "Pechuga de pollo", "Res", "Cerdo", "Pescado"] },
      { nombre: "Frutas y Verduras", grupo: "Alimentaci\xF3n", subcategorias: ["Frutas frescas", "Verduras frescas", "Tub\xE9rculos"] },
      { nombre: "Aceites y Grasas", grupo: "Alimentaci\xF3n", subcategorias: ["Aceite de girasol", "Aceite vegetal", "Aceite de oliva", "Manteca"] },
      { nombre: "Pastas y Harinas", grupo: "Alimentaci\xF3n", subcategorias: ["Spaghetti", "Macarrones", "Harina de trigo", "Harina de ma\xEDz"] },
      { nombre: "Caf\xE9 y Bebidas", grupo: "Alimentaci\xF3n", subcategorias: ["Caf\xE9 molido", "Caf\xE9 soluble", "T\xE9", "Jugos", "Gaseosas"] },
      { nombre: "Enlatados y Conservas", grupo: "Alimentaci\xF3n", subcategorias: ["At\xFAn", "Sardinas", "Ma\xEDz dulce", "Vegetales mixtos"] },
      { nombre: "Condimentos y Az\xFAcar", grupo: "Alimentaci\xF3n", subcategorias: ["Sal", "Az\xFAcar", "Salsas tradicionales", "Especias"] },
      { nombre: "Cereales y Galletas", grupo: "Alimentaci\xF3n", subcategorias: ["Cereales de ma\xEDz", "Avena", "Galletas soda", "Galletas dulces"] },
      { nombre: "Limpieza del Hogar", grupo: "Limpieza", subcategorias: ["Detergente en polvo", "Detergente l\xEDquido", "Cloro", "Desinfectante", "Suavizante"] },
      { nombre: "Cuidado e Higiene Personal", grupo: "Higiene personal", subcategorias: ["Papel higi\xE9nico", "Pasta dental", "Jab\xF3n de ba\xF1o", "Shampoo", "Desodorante"] },
      { nombre: "Mascotas", grupo: "Mascotas", subcategorias: ["Comida seca perros", "Comida seca gatos", "Arena para gatos"] }
    ];
    productos = [
      {
        nombre: "Arroz 99% Grano Entero",
        slug: "arroz-blanco-1-8-kg",
        marca: "T\xEDo Pel\xF3n",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Arroz y Granos",
        subcategoria: "Arroz blanco",
        presentacion: "1.8 kg",
        cantidad: 1.8,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 1950,
        codigo: "7441001001021",
        descripcion: "Arroz blanco de grano entero 99%, libre de impurezas, cultivado y procesado en Guanacaste y el Pac\xEDfico Central.",
        imagen: "/img/products/arroz-blanco-1-8-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 2050 },
          { tienda: "MaxiPal\xED", precio: 2080 },
          { tienda: "Walmart Costa Rica", precio: 2150 },
          { tienda: "Megasuper", precio: 2220 },
          { tienda: "MasxMenos", precio: 2290 },
          { tienda: "Automercado", precio: 2450 }
        ]
      },
      {
        nombre: "Arroz Integral",
        slug: "arroz-integral-1-kg",
        marca: "T\xEDo Pel\xF3n",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Arroz y Granos",
        subcategoria: "Arroz integral",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: false,
        precioBase: 1490,
        codigo: "7441001001090",
        descripcion: "Arroz integral con salvado intacto rico en fibra, minerales y vitaminas.",
        imagen: "/img/products/arroz-integral-1-kg.webp",
        tiendas: [
          { tienda: "Megasuper", precio: 1580 },
          { tienda: "Walmart Costa Rica", precio: 1620 },
          { tienda: "MasxMenos", precio: 1675 },
          { tienda: "Automercado", precio: 1750 }
        ]
      },
      {
        nombre: "Frijoles Negros",
        slug: "frijoles-negros-1-kg",
        marca: "Don Pedro",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Arroz y Granos",
        subcategoria: "Frijoles negros",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 1720,
        codigo: "7441002002034",
        descripcion: "Frijol negro seleccionado de cocci\xF3n r\xE1pida y caldo espeso, est\xE1ndar en la mesa costarricense.",
        imagen: "/img/products/frijoles-negros-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1790 },
          { tienda: "MaxiPal\xED", precio: 1820 },
          { tienda: "MasxMenos", precio: 1890 },
          { tienda: "Walmart Costa Rica", precio: 1890 },
          { tienda: "Megasuper", precio: 1940 },
          { tienda: "Automercado", precio: 2050 }
        ]
      },
      {
        nombre: "Frijoles Rojos de Seda",
        slug: "frijoles-rojos-1-kg",
        marca: "Don Pedro",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Arroz y Granos",
        subcategoria: "Frijoles rojos",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 1750,
        codigo: "7441002002041",
        descripcion: "Frijol rojo de seda grano suave y brillante, ideal para chifrijo y olla de carne.",
        imagen: "/img/products/frijoles-rojos-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1840 },
          { tienda: "MaxiPal\xED", precio: 1860 },
          { tienda: "MasxMenos", precio: 1920 },
          { tienda: "Walmart Costa Rica", precio: 1940 },
          { tienda: "Automercado", precio: 2100 }
        ]
      },
      {
        nombre: "Leche Entera",
        slug: "leche-entera-1-l",
        marca: "Dos Pinos",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "L\xE1cteos y Huevos",
        subcategoria: "Leche",
        presentacion: "1 L",
        cantidad: 1,
        unidad: "l",
        unidadBase: "l",
        canasta: true,
        precioBase: 1020,
        codigo: "7441003003011",
        descripcion: "Leche entera fluida ultrapasteurizada 100% de vacas de pastoreo de cooperativas costarricenses.",
        imagen: "/img/products/leche-entera-1-l.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1060 },
          { tienda: "MaxiPal\xED", precio: 1070 },
          { tienda: "MasxMenos", precio: 1095 },
          { tienda: "Walmart Costa Rica", precio: 1095 },
          { tienda: "Megasuper", precio: 1140 },
          { tienda: "Automercado", precio: 1250 }
        ]
      },
      {
        nombre: "Leche Semidescremada 2%",
        slug: "leche-semidescremada-1-l",
        marca: "Dos Pinos",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "L\xE1cteos y Huevos",
        subcategoria: "Leche",
        presentacion: "1 L",
        cantidad: 1,
        unidad: "l",
        unidadBase: "l",
        canasta: true,
        precioBase: 1030,
        codigo: "7441003003028",
        descripcion: "Leche semidescremada reducida en grasa al 2%, fortificada con vitamina A y D.",
        imagen: "/img/products/leche-semidescremada-1-l.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1070 },
          { tienda: "Walmart Costa Rica", precio: 1100 },
          { tienda: "MasxMenos", precio: 1100 },
          { tienda: "Megasuper", precio: 1150 },
          { tienda: "Automercado", precio: 1260 }
        ]
      },
      {
        nombre: "Huevos Grandes",
        slug: "huevos-30-unidades",
        marca: "Huevo Feliz",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "L\xE1cteos y Huevos",
        subcategoria: "Huevos",
        presentacion: "30 unidades",
        cantidad: 30,
        unidad: "und",
        unidadBase: "und",
        canasta: true,
        precioBase: 2650,
        codigo: "7441004004015",
        descripcion: "Cart\xF3n con 30 huevos grandes frescos de granjas av\xEDcolas de Alajuela y San Ram\xF3n.",
        imagen: "/img/products/huevos-30-unidades.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 2790 },
          { tienda: "MaxiPal\xED", precio: 2850 },
          { tienda: "MasxMenos", precio: 2950 },
          { tienda: "Walmart Costa Rica", precio: 2990 },
          { tienda: "Megasuper", precio: 3050 },
          { tienda: "Automercado", precio: 3190 }
        ]
      },
      {
        nombre: "Huevos Medianos",
        slug: "huevos-12-unidades",
        marca: "Granja Azul",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "L\xE1cteos y Huevos",
        subcategoria: "Huevos",
        presentacion: "12 unidades",
        cantidad: 12,
        unidad: "und",
        unidadBase: "und",
        canasta: true,
        precioBase: 1350,
        codigo: "7441004004022",
        descripcion: "Empaque de 12 huevos frescos seleccionados.",
        imagen: "/img/products/huevos-12-unidades.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1390 },
          { tienda: "MasxMenos", precio: 1450 },
          { tienda: "Megasuper", precio: 1490 },
          { tienda: "Automercado", precio: 1590 }
        ]
      },
      {
        nombre: "Caf\xE9 Molido Gourmet",
        slug: "cafe-molido-340-g",
        marca: "Caf\xE9 Britt",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Caf\xE9 y Bebidas",
        subcategoria: "Caf\xE9 molido",
        presentacion: "340 g",
        cantidad: 340,
        unidad: "g",
        unidadBase: "kg",
        canasta: false,
        precioBase: 3850,
        codigo: "7441005005019",
        descripcion: "Caf\xE9 ar\xE1bica de estricta altura (SHB), tueste oscuro con notas a chocolate y caramelo.",
        imagen: "/img/products/cafe-molido-340-g.webp",
        tiendas: [
          { tienda: "Walmart Costa Rica", precio: 3990 },
          { tienda: "Megasuper", precio: 4050 },
          { tienda: "MasxMenos", precio: 4090 },
          { tienda: "Automercado", precio: 4150 }
        ]
      },
      {
        nombre: "Caf\xE9 Cl\xE1sico Molido",
        slug: "cafe-clasico-500-g",
        marca: "Caf\xE9 1820",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Caf\xE9 y Bebidas",
        subcategoria: "Caf\xE9 molido",
        presentacion: "500 g",
        cantidad: 500,
        unidad: "g",
        unidadBase: "kg",
        canasta: true,
        precioBase: 3200,
        codigo: "7441005005026",
        descripcion: "El caf\xE9 emblem\xE1tico de los hogares costarricenses, mezcla de alturas balanceada.",
        imagen: "/img/products/cafe-clasico-500-g.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 3350 },
          { tienda: "MaxiPal\xED", precio: 3390 },
          { tienda: "Walmart Costa Rica", precio: 3450 },
          { tienda: "MasxMenos", precio: 3490 },
          { tienda: "Automercado", precio: 3650 }
        ]
      },
      {
        nombre: "Caf\xE9 Soluble Instant\xE1neo",
        slug: "cafe-soluble-170-g",
        marca: "Nescaf\xE9 Cl\xE1sico",
        marcaOrigen: "Distribuido en Costa Rica",
        categoria: "Caf\xE9 y Bebidas",
        subcategoria: "Caf\xE9 soluble",
        presentacion: "170 g",
        cantidad: 170,
        unidad: "g",
        unidadBase: "kg",
        canasta: false,
        precioBase: 4600,
        codigo: "7613035123456",
        descripcion: "Caf\xE9 100% puro soluble de preparaci\xF3n instant\xE1nea.",
        imagen: "/img/products/cafe-soluble-170-g.webp",
        tiendas: [
          { tienda: "MasxMenos", precio: 4890 },
          { tienda: "MaxiPal\xED", precio: 4990 },
          { tienda: "Automercado", precio: 5290 }
        ]
      },
      {
        nombre: "Pollo Entero Limpio",
        slug: "pollo-entero-1-kg",
        marca: "Pipasa",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Carnes y Pollo",
        subcategoria: "Pollo entero",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 2890,
        codigo: "7441006006013",
        descripcion: "Pollo entero fresco sin menudos, criado bajo est\xE1ndares veterinarios de Costa Rica.",
        imagen: "/img/products/pollo-entero-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 3050 },
          { tienda: "MaxiPal\xED", precio: 3090 },
          { tienda: "MasxMenos", precio: 3190 },
          { tienda: "Walmart Costa Rica", precio: 3190 },
          { tienda: "Automercado", precio: 3450 }
        ]
      },
      {
        nombre: "Pechuga Deshuesada",
        slug: "pechuga-pollo-1-kg",
        marca: "Pipasa",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Carnes y Pollo",
        subcategoria: "Pechuga de pollo",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 3890,
        codigo: "7441006006020",
        descripcion: "Pechuga de pollo deshuesada y sin piel, lista para filetear.",
        imagen: "/img/products/pechuga-pollo-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 4050 },
          { tienda: "MasxMenos", precio: 4190 },
          { tienda: "Megasuper", precio: 4250 },
          { tienda: "Automercado", precio: 4490 }
        ]
      },
      {
        nombre: "Aceite de Girasol 100%",
        slug: "aceite-girasol-1-l",
        marca: "Clover",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Aceites y Grasas",
        subcategoria: "Aceite de girasol",
        presentacion: "1 L",
        cantidad: 1,
        unidad: "l",
        unidadBase: "l",
        canasta: true,
        precioBase: 2050,
        codigo: "7441007007017",
        descripcion: "Aceite vegetal 100% puro de girasol, rico en vitamina E.",
        imagen: "/img/products/aceite-girasol-1-l.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 2180 },
          { tienda: "MasxMenos", precio: 2250 },
          { tienda: "MaxiPal\xED", precio: 2260 },
          { tienda: "Walmart Costa Rica", precio: 2280 },
          { tienda: "Automercado", precio: 2490 }
        ]
      },
      {
        nombre: "Aceite Vegetal",
        slug: "aceite-vegetal-900-ml",
        marca: "Capullo",
        marcaOrigen: "Distribuido en Costa Rica",
        categoria: "Aceites y Grasas",
        subcategoria: "Aceite vegetal",
        presentacion: "900 ml",
        cantidad: 900,
        unidad: "ml",
        unidadBase: "l",
        canasta: true,
        precioBase: 1820,
        codigo: "7441007007024",
        descripcion: "Aceite vegetal de uso diario sin colesterol.",
        imagen: "/img/products/aceite-vegetal-900-ml.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1890 },
          { tienda: "MasxMenos", precio: 1950 },
          { tienda: "Megasuper", precio: 1990 }
        ]
      },
      {
        nombre: "At\xFAn Lomitos en Aceite",
        slug: "atun-enlatado-140-g",
        marca: "Pronto",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Enlatados y Conservas",
        subcategoria: "At\xFAn",
        presentacion: "140 g",
        cantidad: 140,
        unidad: "g",
        unidadBase: "kg",
        canasta: true,
        precioBase: 920,
        codigo: "7441008008014",
        descripcion: "Lomitos de at\xFAn en aceite vegetal con trocitos de vegetales, fuente natural de Omega 3.",
        imagen: "/img/products/atun-enlatado-140-g.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 990 },
          { tienda: "Walmart Costa Rica", precio: 1020 },
          { tienda: "MasxMenos", precio: 1050 },
          { tienda: "Megasuper", precio: 1080 }
        ]
      },
      {
        nombre: "Pasta Spaghetti",
        slug: "pasta-spaghetti-500-g",
        marca: "Pastas Roma",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Pastas y Harinas",
        subcategoria: "Spaghetti",
        presentacion: "500 g",
        cantidad: 500,
        unidad: "g",
        unidadBase: "kg",
        canasta: true,
        precioBase: 690,
        codigo: "7441009009011",
        descripcion: "Pasta elaborada con s\xE9mola de trigo durum, consistencia al dente.",
        imagen: "/img/products/pasta-spaghetti-500-g.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 750 },
          { tienda: "Megasuper", precio: 780 },
          { tienda: "MasxMenos", precio: 790 },
          { tienda: "Automercado", precio: 840 }
        ]
      },
      {
        nombre: "Papel Higi\xE9nico Doble Hoja",
        slug: "papel-higienico-12-rollos",
        marca: "Scott RindeM\xE1s",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Cuidado e Higiene Personal",
        subcategoria: "Papel higi\xE9nico",
        presentacion: "12 rollos",
        cantidad: 12,
        unidad: "rol",
        unidadBase: "und",
        canasta: true,
        precioBase: 2600,
        codigo: "7501001112233",
        descripcion: "Papel higi\xE9nico doble hoja con tecnolog\xEDa de m\xE1xima absorci\xF3n y suavidad.",
        imagen: "/img/products/papel-higienico-12-rollos.webp",
        tiendas: [
          { tienda: "PriceSmart Costa Rica", precio: 2690, promocion: "MEMBERSHIP" },
          { tienda: "MaxiPal\xED", precio: 2890 },
          { tienda: "MasxMenos", precio: 2990 },
          { tienda: "Walmart Costa Rica", precio: 2990 },
          { tienda: "Automercado", precio: 3290 }
        ]
      },
      {
        nombre: "Detergente en Polvo Doble Poder",
        slug: "detergente-polvo-1-2-kg",
        marca: "Ariel",
        marcaOrigen: "Distribuido en Costa Rica",
        categoria: "Limpieza del Hogar",
        subcategoria: "Detergente en polvo",
        presentacion: "1.2 kg",
        cantidad: 1.2,
        unidad: "kg",
        unidadBase: "kg",
        canasta: false,
        precioBase: 3290,
        codigo: "7501002223344",
        descripcion: "Detergente de lavado profundo para ropa blanca y de color.",
        imagen: "/img/products/detergente-polvo-1-2-kg.webp",
        tiendas: [
          { tienda: "MasxMenos", precio: 3450 },
          { tienda: "MaxiPal\xED", precio: 3490 },
          { tienda: "Megasuper", precio: 3550 },
          { tienda: "Automercado", precio: 3790 }
        ]
      },
      {
        nombre: "Queso Crema Tradicional",
        slug: "queso-crema-250-g",
        marca: "Dos Pinos",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "L\xE1cteos y Huevos",
        subcategoria: "Queso",
        presentacion: "250 g",
        cantidad: 250,
        unidad: "g",
        unidadBase: "kg",
        canasta: false,
        precioBase: 1820,
        codigo: "7441003003097",
        descripcion: "Queso crema pasteurizado de untar, suave y textura homog\xE9nea.",
        imagen: "/img/products/queso-crema-250-g.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1920 },
          { tienda: "MasxMenos", precio: 1990 },
          { tienda: "Megasuper", precio: 2050 },
          { tienda: "Automercado", precio: 2190 }
        ]
      },
      {
        nombre: "Banano Criollo Fresco",
        slug: "banano-1-kg",
        marca: "Fruta Fresca",
        marcaOrigen: "Cosechado en Costa Rica",
        categoria: "Frutas y Verduras",
        subcategoria: "Frutas frescas",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 570,
        codigo: "2000000000010",
        descripcion: "Banano fresco costarricense de calidad primera.",
        imagen: "/img/products/banano-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 610 },
          { tienda: "MasxMenos", precio: 640 },
          { tienda: "Automercado", precio: 750 }
        ]
      },
      {
        nombre: "Tomate de Mesa",
        slug: "tomate-1-kg",
        marca: "Verduras Frescas",
        marcaOrigen: "Cosechado en Costa Rica",
        categoria: "Frutas y Verduras",
        subcategoria: "Verduras frescas",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 1450,
        codigo: "2000000000027",
        descripcion: "Tomate de mesa firme y maduro, seleccionado para ensaladas y guisos.",
        imagen: "/img/products/tomate-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1550 },
          { tienda: "MasxMenos", precio: 1650 },
          { tienda: "Automercado", precio: 1890 }
        ]
      },
      {
        nombre: "Sal Yodada de Mesa",
        slug: "sal-mesa-500-g",
        marca: "Sal Sol",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Condimentos y Az\xFAcar",
        subcategoria: "Sal",
        presentacion: "500 g",
        cantidad: 500,
        unidad: "g",
        unidadBase: "kg",
        canasta: true,
        precioBase: 340,
        codigo: "7441010010014",
        descripcion: "Sal refinada con yodo y fl\xFAor seg\xFAn la legislaci\xF3n de salud de Costa Rica.",
        imagen: "/img/products/sal-mesa-500-g.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 360 },
          { tienda: "MasxMenos", precio: 380 },
          { tienda: "Automercado", precio: 420 }
        ]
      },
      {
        nombre: "Az\xFAcar Blanco Especial",
        slug: "azucar-1-kg",
        marca: "El Viejo",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Condimentos y Az\xFAcar",
        subcategoria: "Az\xFAcar",
        presentacion: "1 kg",
        cantidad: 1,
        unidad: "kg",
        unidadBase: "kg",
        canasta: true,
        precioBase: 910,
        codigo: "7441011011018",
        descripcion: "Az\xFAcar blanco de ca\xF1a producido en ingenios guanacastecos.",
        imagen: "/img/products/azucar-1-kg.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 950 },
          { tienda: "MasxMenos", precio: 975 },
          { tienda: "Megasuper", precio: 990 },
          { tienda: "Automercado", precio: 1050 }
        ]
      },
      {
        nombre: "Salsa Condimento Lizano",
        slug: "salsa-lizano-700-ml",
        marca: "Lizano",
        marcaOrigen: "Fabricado en Costa Rica",
        categoria: "Condimentos y Az\xFAcar",
        subcategoria: "Salsas tradicionales",
        presentacion: "700 ml",
        cantidad: 700,
        unidad: "ml",
        unidadBase: "l",
        canasta: true,
        precioBase: 2450,
        codigo: "7441012012015",
        descripcion: "La salsa vegetal tradicional indispensable para el gallo pinto y la gastronom\xEDa t\xEDpica tica.",
        imagen: "/img/products/salsa-lizano-700-ml.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 2550 },
          { tienda: "Walmart Costa Rica", precio: 2650 },
          { tienda: "MasxMenos", precio: 2690 },
          { tienda: "Automercado", precio: 2850 }
        ]
      },
      {
        nombre: "Pasta Dental Triple Acci\xF3n",
        slug: "pasta-dental-125-g",
        marca: "Colgate",
        marcaOrigen: "Distribuido en Costa Rica",
        categoria: "Cuidado e Higiene Personal",
        subcategoria: "Pasta dental",
        presentacion: "125 g",
        cantidad: 125,
        unidad: "g",
        unidadBase: "kg",
        canasta: false,
        precioBase: 1250,
        codigo: "7501003334455",
        descripcion: "Protecci\xF3n anticaries, blancura y aliento fresco.",
        imagen: "/img/products/pasta-dental-125-g.webp",
        tiendas: [
          { tienda: "Pal\xED", precio: 1290 },
          { tienda: "MasxMenos", precio: 1350 },
          { tienda: "Megasuper", precio: 1390 },
          { tienda: "Automercado", precio: 1490 }
        ]
      },
      {
        nombre: "Cereal Corn Flakes",
        slug: "cereal-caja-430-g",
        marca: "Kellogg's",
        marcaOrigen: "Distribuido en Costa Rica",
        categoria: "Cereales y Galletas",
        subcategoria: "Cereales de ma\xEDz",
        presentacion: "430 g",
        cantidad: 430,
        unidad: "g",
        unidadBase: "kg",
        canasta: false,
        precioBase: 2390,
        codigo: "7501004445566",
        descripcion: "Hojuelas de ma\xEDz tostadas enriquecidas con vitaminas del complejo B y hierro.",
        imagen: "/img/products/cereal-caja-430-g.webp",
        tiendas: [
          { tienda: "MasxMenos", precio: 2590 },
          { tienda: "Walmart Costa Rica", precio: 2590 },
          { tienda: "Automercado", precio: 2690 }
        ]
      },
      {
        nombre: "Alimento Completo Adultos",
        slug: "comida-perros-3-kg",
        marca: "Pedigree",
        marcaOrigen: "Distribuido en Costa Rica",
        categoria: "Mascotas",
        subcategoria: "Comida seca perros",
        presentacion: "3 kg",
        cantidad: 3,
        unidad: "kg",
        unidadBase: "kg",
        canasta: false,
        precioBase: 14200,
        codigo: "7501005556677",
        descripcion: "Nutrici\xF3n completa para perros adultos de razas medianas y grandes.",
        imagen: "/img/products/comida-perros-3-kg.webp",
        tiendas: [
          { tienda: "PriceSmart Costa Rica", precio: 14800, promocion: "MEMBERSHIP" },
          { tienda: "Megasuper", precio: 15200 },
          { tienda: "Automercado", precio: 15900 }
        ]
      }
    ];
  }
});

// src/lib/data/demo-data.ts
function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").replace(/-+/g, "-");
}
var productos2;
var init_demo_data2 = __esm({
  "src/lib/data/demo-data.ts"() {
    "use strict";
    init_demo_data();
    productos2 = productos;
  }
});

// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
var globalForPrisma, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    "use strict";
    globalForPrisma = globalThis;
    prisma = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  }
});

// src/lib/data/prisma-impl.ts
var prisma_impl_exports = {};
__export(prisma_impl_exports, {
  default: () => prisma_impl_default
});
function toSummary(row) {
  return {
    id: String(row.id),
    name: row.name,
    slug: row.slug,
    brand: row.brand?.name ?? null,
    brandOrigin: row.brand?.origin ?? null,
    categoryName: row.category?.name ?? null,
    categorySlug: row.category?.slug ?? null,
    subcategoryName: row.subcategory?.name ?? null,
    presentation: row.variants?.[0]?.presentation ?? "",
    quantity: row.variants?.[0]?.quantity ?? 0,
    unit: row.variants?.[0]?.unit ?? "",
    isCanastaBasica: row.isCanastaBasica,
    imageUrl: row.image?.url ?? row.imageUrl,
    isCostaRica: row.country?.code === COUNTRY
  };
}
var COUNTRY, prisma_impl_default;
var init_prisma_impl = __esm({
  "src/lib/data/prisma-impl.ts"() {
    "use strict";
    init_prisma();
    init_demo_data2();
    COUNTRY = "CR";
    prisma_impl_default = {
      async listProducts(opts) {
        const where = { country: { code: COUNTRY } };
        if (opts?.canasta) where.isCanastaBasica = true;
        if (opts?.category) where.category = { slug: opts.category };
        const rows = await prisma.product.findMany({
          where,
          include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true },
          orderBy: { name: "asc" }
        });
        return { products: rows.map(toSummary), total: rows.length };
      },
      async searchSuggestions(query) {
        const normalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const products = await prisma.product.findMany({
          where: { country: { code: COUNTRY }, normalizedName: { contains: normalized } },
          take: 5,
          select: { name: true, slug: true, category: { select: { name: true, slug: true } } }
        });
        const out = products.map((p) => ({ term: p.name, type: "producto", url: `/productos/${p.slug}` }));
        for (const p of products) {
          if (p.category) out.push({ term: p.category.name, type: "categor\xEDa", url: `/productos?categoria=${p.category.slug}` });
        }
        return out;
      },
      async getProductDetail(slug) {
        const row = await prisma.product.findFirst({
          where: { slug, country: { code: COUNTRY } },
          include: {
            brand: true,
            category: true,
            subcategory: true,
            variants: { where: { isDefault: true } },
            image: true,
            country: true
          }
        });
        if (!row) return null;
        const summary = toSummary(row);
        const latest = await prisma.price.findMany({
          where: { productId: row.id, isLatest: true, currency: "CRC" },
          include: { store: true, storeLocation: { include: { province: true, canton: true } }, source: true },
          orderBy: { amount: "asc" }
        });
        const main = latest[0] ?? null;
        const comparisons = latest.map((l) => ({
          store: { id: String(l.storeId), name: l.store.name, slug: l.store.slug, type: l.store.type, isSupermarket: l.store.isSupermarket, website: l.store.website, logoUrl: l.store.logoUrl ?? null },
          location: l.storeLocation ? { id: String(l.storeLocation.id), name: l.storeLocation.name, province: l.storeLocation.province?.name ?? null, canton: l.storeLocation.canton?.name ?? null } : null,
          amount: Number(l.amount),
          isLowest: false,
          isHighest: false,
          capturedAt: l.capturedAt,
          availability: l.availability,
          promotionStatus: l.promotionStatus
        }));
        const amounts = comparisons.map((c) => c.amount);
        if (amounts.length) {
          const mn = Math.min(...amounts);
          const mx = Math.max(...amounts);
          comparisons.forEach((c) => {
            c.isLowest = c.amount === mn;
            c.isHighest = c.amount === mx;
          });
        }
        const historyRows = await prisma.price.findMany({
          where: { productId: row.id, currency: "CRC" },
          include: { store: true },
          orderBy: { capturedAt: "asc" }
        });
        const history = historyRows.map((h) => ({
          date: h.capturedAt,
          amount: Number(h.amount),
          store: h.store.name,
          change: null
        }));
        let price = null;
        if (main) {
          price = {
            id: String(main.id),
            amount: Number(main.amount),
            amountPerUnit: main.amountPerUnit ? Number(main.amountPerUnit) : null,
            currency: main.currency,
            capturedAt: main.capturedAt,
            availability: main.availability,
            promotionStatus: main.promotionStatus,
            trustStatus: main.trustStatus,
            store: { id: String(main.storeId), name: main.store.name, slug: main.store.slug, type: main.store.type, isSupermarket: main.store.isSupermarket, website: main.store.website, logoUrl: main.store.logoUrl ?? null },
            location: main.storeLocation ? { id: String(main.storeLocation.id), name: main.storeLocation.name, province: main.storeLocation.province?.name ?? null, canton: main.storeLocation.canton?.name ?? null } : null,
            source: main.source ? { id: String(main.source.id), name: main.source.name, slug: main.source.slug, type: main.source.type, status: main.source.status, website: main.source.website } : null
          };
        }
        const relatedRows = row.categoryId ? await prisma.product.findMany({
          where: { categoryId: row.categoryId, country: { code: COUNTRY }, slug: { not: slug } },
          include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true },
          take: 4
        }) : [];
        return {
          ...summary,
          description: row.description,
          shortDescription: row.shortDescription,
          code: `CR-${row.id}`,
          price,
          previousPrice: null,
          absoluteChange: null,
          percentChange: null,
          changeDirection: null,
          history,
          comparisons,
          lowest: amounts.length ? { amount: Math.min(...amounts), store: comparisons.find((c) => c.isLowest)?.store.name ?? "" } : null,
          highest: amounts.length ? { amount: Math.max(...amounts), store: comparisons.find((c) => c.isHighest)?.store.name ?? "" } : null,
          related: relatedRows.map(toSummary),
          indexable: row.indexable && !!main
        };
      },
      async listCategories() {
        const rows = await prisma.category.findMany({
          include: { _count: { select: { products: true } } },
          orderBy: { sort: "asc" }
        });
        return rows.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug, group: c.group, productCount: c._count.products }));
      },
      async listStores(supermarketOnly = false) {
        const rows = await prisma.store.findMany({
          where: supermarketOnly ? { isSupermarket: true } : {},
          include: {
            country: true,
            _count: { select: { locations: true, prices: true } },
            locations: { include: { province: true, canton: true } }
          }
        });
        return rows.map((s) => ({
          id: String(s.id),
          name: s.name,
          slug: s.slug,
          type: s.type,
          isSupermarket: s.isSupermarket,
          website: s.website,
          locationCount: s._count.locations,
          productCount: s._count.prices,
          latestUpdate: null,
          locations: s.locations.map((l) => ({ id: String(l.id), name: l.name, province: l.province?.name ?? null, canton: l.canton?.name ?? null }))
        }));
      },
      async getStore(slug) {
        const s = await prisma.store.findFirst({ where: { slug }, include: { locations: { include: { province: true, canton: true } } } });
        if (!s) return null;
        const count = await prisma.price.count({ where: { storeId: s.id, isLatest: true } });
        return {
          id: String(s.id),
          name: s.name,
          slug: s.slug,
          type: s.type,
          isSupermarket: s.isSupermarket,
          website: s.website,
          locationCount: s.locations.length,
          productCount: count,
          latestUpdate: null,
          locations: s.locations.map((l) => ({ id: String(l.id), name: l.name, province: l.province?.name ?? null, canton: l.canton?.name ?? null }))
        };
      },
      async listProvinces() {
        const rows = await prisma.province.findMany({ include: { cantons: true } });
        return rows.map((p) => ({ id: String(p.id), name: p.name, cantons: p.cantons.map((c) => c.name), storeCount: 0, productCount: 0 }));
      },
      async listBiggestRises(limit = 8) {
        const changes = await prisma.priceChange.findMany({
          where: { currency: "CRC", direction: "UP", period: "MONTH" },
          orderBy: { percentChange: "desc" },
          take: limit,
          include: { product: { include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true } } }
        });
        return changes.map((c) => toSummary(c.product));
      },
      async listBiggestDrops(limit = 8) {
        const changes = await prisma.priceChange.findMany({
          where: { currency: "CRC", direction: "DOWN", period: "MONTH" },
          orderBy: { percentChange: "asc" },
          take: limit,
          include: { product: { include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true } } }
        });
        return changes.map((c) => toSummary(c.product));
      },
      async listPriceSnapshot(opts) {
        const limit = opts?.limit ?? 50;
        const categorySlug = opts?.category ? slugify(opts.category) : void 0;
        const rows = await prisma.price.findMany({
          where: {
            currency: "CRC",
            ...categorySlug ? { product: { category: { slug: categorySlug } } } : {}
          },
          orderBy: { capturedAt: "desc" },
          take: limit * 10,
          include: {
            product: { include: { brand: true, category: true, subcategory: true, variants: { where: { isDefault: true } }, image: true, country: true } },
            store: true,
            storeLocation: { include: { province: true } }
          }
        });
        const seen = /* @__PURE__ */ new Set();
        const out = [];
        for (const r of rows) {
          const key = String(r.productId);
          if (seen.has(key)) continue;
          seen.add(key);
          out.push({
            product: toSummary(r.product),
            price: r.amount,
            currency: "CRC",
            panelDate: r.capturedAt,
            store: r.store?.name ?? null,
            location: r.storeLocation ? `${r.storeLocation.name}${r.storeLocation.province ? `, ${r.storeLocation.province.name}` : ""}` : null,
            change: null,
            percent: null,
            direction: null
          });
          if (out.length >= limit) break;
        }
        return out;
      },
      async getDashboardStats() {
        const [products, prices, activeSources, lastRun, errors, agg, stores] = await Promise.all([
          prisma.product.count({ where: { country: { code: COUNTRY } } }),
          prisma.price.count({ where: { currency: "CRC" } }),
          prisma.source.count({ where: { status: "ACTIVE" } }),
          prisma.scrapeRun.findFirst({ orderBy: { startedAt: "desc" }, select: { startedAt: true } }),
          prisma.scrapeError.count(),
          prisma.scrapeRun.aggregate({ _sum: { productsRejectedCountry: true } }),
          prisma.store.count()
        ]);
        return {
          products,
          prices,
          activeSources,
          lastSync: lastRun?.startedAt ?? null,
          errors,
          changes: 0,
          rejectedCountry: agg._sum?.productsRejectedCountry ?? 0,
          stores
        };
      }
    };
  }
});

// server/index.ts
import "dotenv/config";
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

// src/lib/data/repository.ts
init_demo_data2();
init_demo_data2();

// src/lib/data/live-market.ts
init_demo_data2();
var WALMART_API = "https://www.walmart.co.cr/api/catalog_system/pub/products/search";
var WALMART_SITE = "https://www.walmart.co.cr";
var SOURCE_NAME = "Walmart Costa Rica";
var CACHE_TTL_MS = Number(process.env.LIVE_MARKET_CACHE_TTL_MS ?? 15 * 60 * 1e3);
var ERROR_CACHE_TTL_MS = 2 * 60 * 1e3;
var REQUEST_TIMEOUT_MS = Number(process.env.LIVE_MARKET_TIMEOUT_MS ?? 7e3);
var LIVE_ENABLED = process.env.LIVE_MARKET_ENABLED !== "false";
var QUERY_OVERRIDES = {
  "arroz-blanco-1-8-kg": "arroz tio pelon 99 1.8 kg",
  "arroz-integral-1-kg": "arroz integral tio pelon 1 kg",
  "frijoles-negros-1-kg": "frijoles negros 1 kg",
  "frijoles-rojos-1-kg": "frijoles rojos 1 kg",
  "leche-entera-1-l": "leche entera dos pinos uat 1 litro",
  "leche-semidescremada-1-l": "leche dos pinos semidescremada 1 l",
  "huevos-30-unidades": "huevos 30 unidades",
  "huevos-12-unidades": "huevo gallina 12 unidades",
  "cafe-molido-340-g": "cafe britt gourmet 340 g",
  "cafe-clasico-500-g": "cafe 1820 clasico 500 g",
  "cafe-soluble-170-g": "nescafe clasico 170 g",
  "pollo-entero-1-kg": "pollo entero don cristobal precio kilo",
  "pechuga-pollo-1-kg": "pechuga pollo entera don cristobal precio kilo",
  "aceite-girasol-1-l": "aceite clover girasol 900 ml",
  "aceite-vegetal-900-ml": "aceite capullo 900 ml",
  "atun-enlatado-140-g": "atun pronto 140 g",
  "pasta-spaghetti-500-g": "pasta espagueti roma no 7 500 g",
  "papel-higienico-12-rollos": "papel higienico scott 12 rollos",
  "detergente-polvo-1-2-kg": "detergente ariel polvo 1 kg",
  "queso-crema-250-g": "queso crema dos pinos 250 g",
  "banano-1-kg": "banano kilo",
  "tomate-1-kg": "tomate kilo",
  "sal-mesa-500-g": "sal sol 500 g",
  "azucar-1-kg": "azucar el viejo 1 kg",
  "salsa-lizano-700-ml": "salsa lizano 700 ml",
  "pasta-dental-125-g": "pasta dental colgate triple accion 150 ml",
  "cereal-caja-430-g": "kelloggs corn flakes 500 g",
  "comida-perros-3-kg": "pedigree adulto 3 kg"
};
var STOP_WORDS = /* @__PURE__ */ new Set([
  "de",
  "del",
  "la",
  "el",
  "los",
  "las",
  "un",
  "una",
  "para",
  "con",
  "sin",
  "por",
  "marca",
  "producto",
  "fresco",
  "fresca",
  "tradicional",
  "especial",
  "completo",
  "adultos",
  "molido"
]);
var EXCLUDED_TERMS = {
  "arroz-blanco-1-8-kg": ["bio", "precocido"],
  "leche-entera-1-l": ["evaporada", "condensada", "delactomy", "polvo"],
  "azucar-1-kg": ["sin azucar", "yogurt", "yogur"],
  "cafe-soluble-170-g": ["ice", "descafeinado", "3 en 1"],
  "pollo-entero-1-kg": ["partido", "pechuga", "muslo", "alitas", "alas"],
  "pechuga-pollo-1-kg": ["partido", "muslo", "alitas", "nuggets", "empanizado"],
  "cereal-caja-430-g": ["empanizador", "rebozador"]
};
var REQUIRED_TERMS = {
  "cafe-soluble-170-g": ["clasico", "instantaneo"],
  "pollo-entero-1-kg": ["entero"],
  "pechuga-pollo-1-kg": ["pechuga"],
  "pasta-spaghetti-500-g": ["spaghetti", "espagueti"],
  "huevos-30-unidades": ["feliz"],
  "huevos-12-unidades": ["mediano"],
  "aceite-vegetal-900-ml": ["capullo"],
  "atun-enlatado-140-g": ["pronto"],
  "comida-perros-3-kg": ["pedigree"]
};
var cache = null;
var inFlight = null;
function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/,/g, ".");
}
function tokens(value) {
  return normalize(value).split(/[^a-z0-9.]+/).map((token) => token.trim()).filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}
function numberValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}
function searchQuery(product) {
  return QUERY_OVERRIDES[product.slug] ?? `${product.marca ?? ""} ${product.nombre} ${product.presentacion}`.trim();
}
function expectedQuantity(product) {
  const match = product.presentacion.match(/([\d.,]+)\s*(kg|g|ml|l|unidades?|rollos?)/i);
  if (!match) return null;
  const value = Number(match[1].replace(",", "."));
  if (!Number.isFinite(value)) return null;
  const unit = match[2].toLowerCase();
  if (unit === "kg") return { value: value * 1e3, unit: "g" };
  if (unit === "l") return { value: value * 1e3, unit: "ml" };
  if (unit.startsWith("unidad")) return { value, unit: "unidades" };
  if (unit.startsWith("rollo")) return { value, unit: "rollos" };
  return { value, unit };
}
function quantityScore(product, candidateText) {
  const expected = expectedQuantity(product);
  if (!expected) return 0;
  const text = normalize(candidateText);
  const numberToken = expected.value % 1 === 0 ? String(expected.value) : String(expected.value).replace(/\.0+$/, "");
  const decimalToken = (expected.value / (expected.unit === "g" ? 1e3 : expected.unit === "ml" ? 1e3 : 1)).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  if (new RegExp(`(^|[^0-9])${numberToken.replace(".", "\\.")}(?=$|[^0-9])`).test(text)) return 7;
  if (new RegExp(`(^|[^0-9])${decimalToken.replace(".", "\\.")}(?=$|[^0-9])`).test(text)) return 6;
  if (expected.value === 1e3 && /\b(kilo|kg)\b/.test(text)) return 4;
  if (expected.value === 1e3 && expected.unit === "ml" && /\b(litro|litros|l)\b/.test(text)) return 4;
  return 0;
}
function scoreCandidate(product, item) {
  const candidateText = `${item.productName ?? ""} ${item.brand ?? ""}`;
  const normalizedCandidate = normalize(candidateText);
  if ((EXCLUDED_TERMS[product.slug] ?? []).some((term) => normalizedCandidate.includes(term))) return -100;
  const candidateTokens = new Set(tokens(candidateText));
  const nameTokens = tokens(`${product.nombre} ${product.subcategoria}`);
  const brandTokens = tokens(product.marca ?? "");
  let score = quantityScore(product, candidateText);
  for (const token of nameTokens) if (candidateTokens.has(token)) score += 2;
  for (const token of brandTokens) if (candidateTokens.has(token)) score += 4;
  if (brandTokens.length > 0 && brandTokens.every((token) => candidateTokens.has(token))) score += 5;
  return score;
}
function getOffer(item) {
  const offers = (item.sellers ?? []).map((seller) => seller.commertialOffer).filter(Boolean);
  return offers.find((offer) => offer.IsAvailable === true && (numberValue(offer.Price) ?? 0) > 0) ?? offers.find((offer) => (numberValue(offer.Price) ?? numberValue(offer.ListPrice) ?? 0) > 0) ?? null;
}
function bestProduct(product, catalog) {
  const candidates = catalog.map((item) => {
    const offer = (item.items ?? []).map(getOffer).find(Boolean) ?? null;
    const image = item.items?.flatMap((entry) => entry.images ?? []).map((entry) => entry.imageUrl).find(Boolean) ?? null;
    const candidateText = `${item.productName ?? ""} ${item.brand ?? ""}`;
    const candidateTokens = new Set(tokens(candidateText));
    const semanticTokens = tokens(`${product.nombre} ${product.subcategoria}`);
    const requiredTerms = REQUIRED_TERMS[product.slug] ?? [];
    const normalizedCandidate = normalize(candidateText);
    const hasRequiredTerm = requiredTerms.length === 0 || requiredTerms.some((term) => normalizedCandidate.includes(term));
    const hasSemanticMatch = semanticTokens.some((token) => {
      if (candidateTokens.has(token)) return true;
      return token.endsWith("s") && candidateTokens.has(token.slice(0, -1));
    });
    const hasQuantityMatch = quantityScore(product, candidateText) > 0;
    return offer && image && hasSemanticMatch && hasQuantityMatch && hasRequiredTerm ? { item, offer, image, score: scoreCandidate(product, item) } : null;
  }).filter((value) => Boolean(value)).sort((a, b) => b.score - a.score);
  const winner = candidates[0];
  if (!winner || winner.score < 6) return null;
  return winner;
}
async function fetchCatalog(query) {
  const sourceUrl = `${WALMART_API}?ft=${encodeURIComponent(query)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(sourceUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CuantoSubioCR/1.0 product-price-refresh"
      },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Walmart respondi\xF3 ${response.status}`);
    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
  } finally {
    clearTimeout(timer);
  }
}
async function refreshLiveMarket() {
  if (!LIVE_ENABLED) {
    return {
      products: /* @__PURE__ */ new Map(),
      status: {
        enabled: false,
        mode: "fallback",
        source: null,
        sourceUrl: null,
        capturedAt: null,
        requestedProducts: productos2.length,
        matchedProducts: 0,
        failedQueries: 0,
        message: "La consulta en vivo est\xE1 desactivada; se muestran referencias locales."
      }
    };
  }
  const capturedAt = /* @__PURE__ */ new Date();
  const liveProducts = /* @__PURE__ */ new Map();
  let failedQueries = 0;
  for (let index = 0; index < productos2.length; index += 8) {
    const batch = productos2.slice(index, index + 8);
    const results = await Promise.all(batch.map(async (product) => {
      try {
        const query = searchQuery(product);
        const catalog = await fetchCatalog(query);
        const winner = bestProduct(product, catalog);
        if (!winner) return null;
        const amount = numberValue(winner.offer.Price) ?? numberValue(winner.offer.ListPrice);
        if (!amount || amount <= 0) return null;
        const listAmount = numberValue(winner.offer.ListPrice);
        const productUrl = winner.item.linkText ? `${WALMART_SITE}/${winner.item.linkText}/p` : WALMART_SITE;
        return {
          slug: product.slug,
          amount,
          listAmount: listAmount && listAmount > amount ? listAmount : null,
          imageUrl: winner.image,
          productName: winner.item.productName ?? product.nombre,
          externalSku: winner.item.items?.[0]?.itemId ?? winner.item.productReference ?? null,
          productUrl,
          sourceUrl: `${WALMART_API}?ft=${encodeURIComponent(query)}`,
          storeName: SOURCE_NAME,
          storeSlug: "walmart-costa-rica",
          capturedAt,
          availability: winner.offer.IsAvailable === true ? "AVAILABLE" : "OUT_OF_STOCK",
          promotionStatus: listAmount && listAmount > amount ? "PROMOTIONAL" : "NORMAL"
        };
      } catch {
        failedQueries += 1;
        return null;
      }
    }));
    for (const result of results) if (result) liveProducts.set(result.slug, result);
  }
  const matchedProducts = liveProducts.size;
  const mode = matchedProducts > 0 ? "live" : "fallback";
  const message = matchedProducts === productos2.length ? "Precios e im\xE1genes consultados en vivo desde el cat\xE1logo p\xFAblico de Walmart Costa Rica." : matchedProducts > 0 ? `Datos en vivo para ${matchedProducts} de ${productos2.length} productos; el resto conserva su \xFAltima referencia local.` : "No fue posible consultar el cat\xE1logo en vivo; se muestran referencias locales.";
  return {
    products: liveProducts,
    status: {
      enabled: true,
      mode,
      source: matchedProducts > 0 ? SOURCE_NAME : null,
      sourceUrl: matchedProducts > 0 ? WALMART_SITE : null,
      capturedAt: matchedProducts > 0 ? capturedAt : null,
      requestedProducts: productos2.length,
      matchedProducts,
      failedQueries,
      message
    }
  };
}
async function getLiveMarketSnapshot(force = false) {
  if (!force && cache && cache.expiresAt > Date.now()) return cache.snapshot;
  if (inFlight) return inFlight;
  inFlight = refreshLiveMarket().then((snapshot) => {
    cache = {
      snapshot,
      expiresAt: Date.now() + (snapshot.status.mode === "live" ? CACHE_TTL_MS : ERROR_CACHE_TTL_MS)
    };
    return snapshot;
  }).finally(() => {
    inFlight = null;
  });
  return inFlight;
}
async function getLiveMarketStatus(force = false) {
  return (await getLiveMarketSnapshot(force)).status;
}

// src/lib/data/repository.ts
var DEMO = process.env.DEMO_MODE === "true" || !process.env.DATABASE_URL;
var storeBySlug = /* @__PURE__ */ new Map();
for (const t of tiendas) {
  storeBySlug.set(t.slug, {
    name: t.nombre,
    slug: t.slug,
    type: t.tipo,
    isSupermarket: t.supermercado,
    website: t.sitio,
    logoUrl: t.logo ?? `/img/supermercados/${t.slug}.svg`,
    locations: t.sucursales.map((s) => ({
      id: s.nombre,
      name: s.nombre,
      province: s.provincia,
      canton: s.canton
    }))
  });
}
function storeByName(name) {
  const t = tiendas.find((x) => x.nombre === name);
  if (!t) return null;
  return storeBySlug.get(t.slug);
}
var categoryGroups = ["Alimentaci\xF3n", "Limpieza", "Higiene personal", "Hogar", "Mascotas"];
function computeAmountPerUnit(amount, qty, unit) {
  const u = (unit ?? "").toLowerCase().trim();
  if (u === "kg") {
    return { amountPerUnit: Math.round(amount / (qty || 1)), unitLabel: "kg" };
  }
  if (u === "g") {
    const kg = (qty || 1e3) / 1e3;
    return { amountPerUnit: Math.round(amount / kg), unitLabel: "kg" };
  }
  if (u === "l") {
    return { amountPerUnit: Math.round(amount / (qty || 1)), unitLabel: "L" };
  }
  if (u === "ml") {
    const l = (qty || 1e3) / 1e3;
    return { amountPerUnit: Math.round(amount / l), unitLabel: "L" };
  }
  if (u === "und" || u === "unidades") {
    return { amountPerUnit: Math.round(amount / (qty || 1) * 10) / 10, unitLabel: "unidad" };
  }
  if (u === "rol" || u === "rollos") {
    return { amountPerUnit: Math.round(amount / (qty || 1) * 10) / 10, unitLabel: "rollo" };
  }
  return { amountPerUnit: Math.round(amount / (qty || 1)), unitLabel: unit || "unidad" };
}
function buildSummary(p) {
  const slug = p.slug ?? slugify(`${p.nombre} ${p.presentacion}`);
  return {
    id: slug,
    name: p.nombre,
    slug,
    brand: p.marca ?? null,
    brandOrigin: p.marcaOrigen ?? null,
    categoryName: p.categoria,
    categorySlug: slugify(p.categoria),
    subcategoryName: p.subcategoria,
    presentation: p.presentacion,
    quantity: p.cantidad,
    unit: p.unidad,
    isCanastaBasica: p.canasta,
    imageUrl: p.imagen ?? `/img/products/${slug}.webp`,
    isCostaRica: true
  };
}
function demoProductsRaw() {
  return productos2;
}
async function listProducts(opts) {
  if (DEMO) {
    const liveMarket = await getLiveMarketSnapshot();
    let list = demoProductsRaw().map((product) => {
      const summary = buildSummary(product);
      const live = liveMarket.products.get(summary.slug);
      return live?.imageUrl ? { ...summary, imageUrl: live.imageUrl } : summary;
    });
    const q = normalize2(opts?.query);
    if (q) {
      list = list.filter((p) => {
        const haystack = normalize2(`${p.name} ${p.categoryName} ${p.subcategoryName} ${p.brand ?? ""} ${p.presentation}`);
        return haystack.includes(q);
      });
    }
    if (opts?.category) list = list.filter((p) => p.categorySlug === opts.category || p.categoryName === opts.category);
    if (opts?.canasta) list = list.filter((p) => p.isCanastaBasica);
    if (opts?.store) {
      list = list.filter((p) => {
        const prod = demoProductsRaw().find((x) => buildSummary(x).slug === p.slug);
        return prod?.tiendas.some((t) => storeByName(t.tienda)?.slug === opts.store);
      });
    }
    if (opts?.province) {
      list = list.filter((p) => {
        const prod = demoProductsRaw().find((x) => buildSummary(x).slug === p.slug);
        return prod?.tiendas.some((t) => storeByName(t.tienda)?.locations.some((l) => l.province === opts.province));
      });
    }
    if (opts?.sort) {
      const currentPrice = (product) => liveMarket.products.get(product.slug)?.amount ?? currentPriceOf(product);
      const currentRise = (product) => {
        const demo = demoProductsRaw().find((item) => buildSummary(item).slug === product.slug);
        if (!demo) return 0;
        return (currentPrice(product) - demo.precioBase) / demo.precioBase * 100;
      };
      list = [...list].sort((a, b) => {
        switch (opts.sort) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return currentPrice(a) - currentPrice(b);
          case "price-desc":
            return currentPrice(b) - currentPrice(a);
          case "rise":
            return currentRise(b) - currentRise(a);
          case "drop":
            return currentRise(a) - currentRise(b);
          default:
            return a.name.localeCompare(b.name);
        }
      });
    }
    return { products: list, total: list.length };
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.listProducts(opts);
}
async function searchSuggestions(query) {
  const q = normalize2(query);
  const out = [];
  if (!q) return out;
  if (DEMO) {
    const seen = /* @__PURE__ */ new Set();
    for (const p of demoProductsRaw()) {
      const s = buildSummary(p);
      if (normalize2(p.nombre).includes(q) && !seen.has(`p-${s.slug}`)) {
        seen.add(`p-${s.slug}`);
        out.push({ term: p.nombre, type: "producto", url: `/productos/${s.slug}` });
      }
      if (normalize2(p.categoria).includes(q) && !seen.has(`c-${p.categoria}`)) {
        seen.add(`c-${p.categoria}`);
        out.push({ term: p.categoria, type: "categor\xEDa", url: `/productos?categoria=${slugify(p.categoria)}` });
      }
      if (p.marca && normalize2(p.marca).includes(q) && !seen.has(`m-${p.marca}`)) {
        seen.add(`m-${p.marca}`);
        out.push({ term: p.marca, type: "marca", url: `/productos?q=${encodeURIComponent(p.marca)}` });
      }
    }
    for (const t of tiendas) {
      if (normalize2(t.nombre).includes(q) && !seen.has(`s-${t.slug}`)) {
        seen.add(`s-${t.slug}`);
        out.push({ term: t.nombre, type: "supermercado", url: `/supermercados/${t.slug}` });
      }
    }
    for (const g of geografia) {
      if (normalize2(g.nombre).includes(q) && !seen.has(`prov-${g.nombre}`)) {
        seen.add(`prov-${g.nombre}`);
        out.push({ term: g.nombre, type: "provincia", url: `/precios/${slugify(g.nombre)}-costa-rica` });
      }
    }
    return out.slice(0, 8);
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.searchSuggestions(query);
}
async function getProductDetail(slug) {
  if (DEMO) {
    const demo = demoProductsRaw().find((x) => buildSummary(x).slug === slug || x.slug === slug);
    if (!demo) return null;
    const liveMarket = await getLiveMarketSnapshot();
    const liveProduct = liveMarket.products.get(demo.slug);
    const baseSummary = buildSummary(demo);
    const summary = liveProduct?.imageUrl ? { ...baseSummary, imageUrl: liveProduct.imageUrl } : baseSummary;
    const now = Date.now();
    const latestPrices = demo.tiendas.map((t) => ({ ...t, daysAgo: 2, capturedAt: void 0, isLive: false, availability: "AVAILABLE" }));
    if (liveProduct) {
      const existingIndex = latestPrices.findIndex((t) => storeByName(t.tienda)?.slug === liveProduct.storeSlug);
      const liveEntry = {
        tienda: liveProduct.storeName,
        precio: liveProduct.amount,
        promocion: liveProduct.promotionStatus,
        daysAgo: 0,
        capturedAt: liveProduct.capturedAt,
        isLive: true,
        availability: liveProduct.availability
      };
      if (existingIndex >= 0) latestPrices[existingIndex] = liveEntry;
      else latestPrices.push(liveEntry);
    }
    const comparisons = latestPrices.map((t) => {
      const store = storeByName(t.tienda);
      const loc = store?.locations[0] ?? null;
      const { amountPerUnit, unitLabel } = computeAmountPerUnit(t.precio, demo.cantidad, demo.unidad);
      return {
        store: {
          id: store?.slug ?? t.tienda,
          name: t.tienda,
          slug: store?.slug ?? t.tienda,
          type: store?.type ?? "SUPERMARKET",
          isSupermarket: store?.isSupermarket ?? true,
          website: store?.website ?? null,
          logoUrl: store?.logoUrl ?? `/img/supermercados/${store?.slug ?? "walmart"}.svg`
        },
        location: loc ? { id: loc.id, name: loc.name, province: loc.province, canton: loc.canton } : null,
        amount: t.precio,
        amountPerUnit,
        unitLabel,
        isLowest: false,
        isHighest: false,
        capturedAt: t.capturedAt ?? new Date(now - t.daysAgo * 864e5),
        availability: t.availability,
        promotionStatus: t.promocion ?? "NORMAL"
      };
    });
    const amounts = comparisons.map((c) => c.amount);
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);
    comparisons.forEach((c) => {
      c.isLowest = c.amount === min;
      c.isHighest = c.amount === max;
    });
    comparisons.sort((a, b) => a.amount - b.amount);
    const main = comparisons.find((c) => c.isLowest);
    const prevAmount = demo.precioBase;
    const absChange = main.amount - prevAmount;
    const pctChange = (main.amount - prevAmount) / prevAmount * 100;
    const history = [];
    for (let i = 0; i < 4; i++) {
      const daysAgo = [40, 28, 14, 2][i];
      const frac = [0, 0.25, 0.6, 1][i];
      const amount = Math.round((prevAmount + (main.amount - prevAmount) * frac) * 100) / 100;
      const prev = history.length ? history[history.length - 1] : null;
      history.push({
        date: new Date(now - daysAgo * 864e5),
        amount,
        store: main.store.name,
        change: prev ? amount - prev.amount : null
      });
    }
    const mainUnit = computeAmountPerUnit(main.amount, demo.cantidad, demo.unidad);
    const price = {
      id: `main-${main.amount}`,
      amount: main.amount,
      amountPerUnit: mainUnit.amountPerUnit,
      currency: "CRC",
      capturedAt: main.capturedAt,
      availability: main.availability,
      promotionStatus: main.promotionStatus,
      trustStatus: "VERIFIED",
      store: main.store,
      location: main.location,
      source: {
        id: `src-${main.store.slug}`,
        name: liveProduct && main.store.slug === liveProduct.storeSlug ? `Cat\xE1logo en l\xEDnea de ${main.store.name}` : `Cat\xE1logo ${main.store.name}`,
        slug: `catalogo-${main.store.slug}`,
        type: liveProduct && main.store.slug === liveProduct.storeSlug ? "CATALOG_API" : "SCRAPER",
        status: "ACTIVE",
        website: main.store.website
      }
    };
    const related = demoProductsRaw().filter((x) => x.categoria === demo.categoria && (buildSummary(x).slug !== slug && x.slug !== slug)).slice(0, 4).map(buildSummary);
    const desc = demo.descripcion ?? `${demo.nombre}, presentaci\xF3n de ${demo.presentacion}, monitoreado en supermercados de Costa Rica en colones costarricenses (CRC).`;
    const shortDesc = `${demo.nombre} (${demo.presentacion}) con precios actualizados y comparaci\xF3n entre supermercados.`;
    return {
      ...summary,
      description: desc,
      shortDescription: shortDesc,
      code: demo.codigo ?? `CR-${slugify(demo.nombre)}`,
      price,
      previousPrice: { ...price, amount: prevAmount, capturedAt: new Date(now - 40 * 864e5) },
      absoluteChange: absChange,
      percentChange: pctChange,
      changeDirection: absChange > 0 ? "UP" : absChange < 0 ? "DOWN" : "FLAT",
      history,
      comparisons,
      lowest: { amount: min, store: comparisons.find((c) => c.isLowest).store.name },
      highest: { amount: max, store: comparisons.find((c) => c.isHighest).store.name },
      related,
      indexable: true
    };
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.getProductDetail(slug);
}
async function listCategories() {
  if (DEMO) {
    const grouped = /* @__PURE__ */ new Map();
    for (const c of categorias) {
      const count = demoProductsRaw().filter((p) => p.categoria === c.nombre).length;
      const entry = {
        id: slugify(c.nombre),
        name: c.nombre,
        slug: slugify(c.nombre),
        group: c.grupo,
        productCount: count
      };
      const arr = grouped.get(c.grupo) ?? [];
      arr.push(entry);
      grouped.set(c.grupo, arr);
    }
    const ordered = [];
    for (const g of categoryGroups) ordered.push(...grouped.get(g) ?? []);
    return ordered;
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.listCategories();
}
async function listStores(supermarketOnly = false) {
  if (DEMO) {
    return tiendas.filter((t) => !supermarketOnly || t.supermercado).map((t) => {
      const matched = demoProductsRaw().filter((p) => p.tiendas.some((x) => x.tienda === t.nombre));
      return {
        id: t.slug,
        name: t.nombre,
        slug: t.slug,
        type: t.tipo,
        isSupermarket: t.supermercado,
        website: t.sitio,
        locationCount: t.sucursales.length,
        productCount: matched.length,
        latestUpdate: matched.length ? new Date(Date.now() - 2 * 864e5) : null,
        locations: t.sucursales.map((s) => ({ id: s.nombre, name: s.nombre, province: s.provincia, canton: s.canton }))
      };
    });
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.listStores(supermarketOnly);
}
async function listProvinces() {
  if (DEMO) {
    return geografia.map((g) => {
      const stores = tiendas.filter((t) => t.sucursales.some((s) => s.provincia === g.nombre)).length;
      const products = demoProductsRaw().filter(
        (p) => p.tiendas.some((t) => storeByName(t.tienda)?.locations.some((l) => l.province === g.nombre))
      ).length;
      return {
        id: slugify(g.nombre),
        name: g.nombre,
        cantons: g.cantones,
        storeCount: stores,
        productCount: products
      };
    });
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.listProvinces();
}
function currentPriceOf(p) {
  const demo = demoProductsRaw().find((x) => buildSummary(x).slug === p.slug);
  if (!demo) return 0;
  return Math.min(...demo.tiendas.map((t) => t.precio));
}
async function listPriceSnapshot(opts) {
  const limit = opts?.limit ?? 50;
  if (DEMO) {
    const liveMarket = await getLiveMarketSnapshot();
    return demoProductsRaw().filter((p) => !opts?.category || slugify(p.categoria) === slugify(opts.category) || p.categoria === opts.category).filter((p) => !opts?.province || p.tiendas.some((t) => storeByName(t.tienda)?.locations.some((l) => l.province === opts.province))).map((p) => {
      const live = liveMarket.products.get(p.slug);
      const baseSummary = buildSummary(p);
      const s = live?.imageUrl ? { ...baseSummary, imageUrl: live.imageUrl } : baseSummary;
      const prices = p.tiendas.map((t) => t.precio);
      const min = Math.min(...prices);
      const cheapest = p.tiendas.find((t) => t.precio === min);
      const liveStore = live ? storeByName(live.storeName) : null;
      const store = liveStore ?? storeByName(cheapest.tienda);
      const loc = store?.locations[0] ?? null;
      const amount = live?.amount ?? min;
      const delta = (amount - p.precioBase) / p.precioBase;
      return {
        product: s,
        imageUrl: s.imageUrl,
        price: amount,
        currency: "CRC",
        panelDate: live?.capturedAt ?? new Date(Date.now() - 2 * 864e5),
        store: store?.name ?? null,
        location: loc ? loc.province ? `${loc.name}, ${loc.province}` : loc.name : null,
        change: amount - p.precioBase,
        percent: delta * 100,
        direction: delta > 0 ? "UP" : delta < 0 ? "DOWN" : "FLAT"
      };
    }).slice(0, limit);
  }
  const prismaImpl = await Promise.resolve().then(() => (init_prisma_impl(), prisma_impl_exports));
  return prismaImpl.default.listPriceSnapshot(opts);
}
function normalize2(s) {
  return (s ?? "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// server/index.ts
init_demo_data2();

// src/lib/site.ts
function getEnv(name) {
  try {
    const meta = import.meta?.env;
    if (meta && meta[name] !== void 0) return meta[name];
  } catch {
  }
  try {
    if (typeof process !== "undefined" && process.env && process.env[name] !== void 0) {
      return process.env[name];
    }
  } catch {
  }
  return void 0;
}
var SITE_NAME = "\xBFCu\xE1nto subi\xF3.cr?";
var SITE_URL = getEnv("VITE_SITE_URL") ?? getEnv("NEXT_PUBLIC_SITE_URL") ?? "https://www.cuantosubio.cr";
var PAYPAL_DONATE_URL = getEnv("VITE_PAYPAL_DONATE_URL")?.trim() || getEnv("PAYPAL_DONATE_URL")?.trim() || "https://www.paypal.me/bernaljbl";
var SINPE_PHONE = getEnv("VITE_SINPE_PHONE")?.replace(/\s+/g, "") || getEnv("SINPE_PHONE")?.replace(/\s+/g, "") || "62037705";
var DEMO_MODE = getEnv("VITE_DEMO_MODE") === "true" || getEnv("NEXT_PUBLIC_DEMO_MODE") === "true" || getEnv("DEMO_MODE") === "true";

// server/index.ts
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var distDir = path.resolve(__dirname, "../dist");
var PROD = process.env.NODE_ENV === "production";
var PORT = Number(process.env.PORT ?? (PROD ? 3e3 : 3141));
var app = express();
app.disable("x-powered-by");
function marketStatusJson(status) {
  return {
    enabled: status.enabled,
    mode: status.mode,
    source: status.source,
    sourceUrl: status.sourceUrl,
    capturedAt: status.capturedAt?.toISOString() ?? null,
    requestedProducts: status.requestedProducts,
    matchedProducts: status.matchedProducts,
    failedQueries: status.failedQueries,
    message: status.message
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
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
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
        message: "No fue posible consultar el estado de la conexi\xF3n en vivo."
      }
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
    res.status(200).json({ suggestions: [], error: "No fue posible completar la b\xFAsqueda en este momento." });
  }
});
app.get("/api/v1/products", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q : void 0;
  const categoria = typeof req.query.categoria === "string" ? req.query.categoria : void 0;
  const tienda = typeof req.query.tienda === "string" ? req.query.tienda : void 0;
  const provincia = typeof req.query.provincia === "string" ? req.query.provincia : void 0;
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
        url: `/productos/${p.slug}`
      }))
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
        price: p.price ? {
          amount: p.price.amount,
          amountPerUnit: p.price.amountPerUnit,
          currency: "CRC",
          capturedAt: p.price.capturedAt,
          store: p.price.store?.name ?? null,
          storeLogo: p.price.store?.logoUrl ?? null,
          location: p.price.location ? `${p.price.location.name}${p.price.location.province ? `, ${p.price.location.province}` : ""}` : null,
          availability: p.price.availability,
          promotionStatus: p.price.promotionStatus,
          source: p.price.source?.name ?? null
        } : null,
        change: p.absoluteChange !== null && p.percentChange !== null ? { absolute: p.absoluteChange, percent: p.percentChange, direction: p.changeDirection } : null,
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
          promotionStatus: c.promotionStatus
        }))
      }
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar el producto en este momento." });
  }
});
app.get("/api/v1/prices", async (req, res) => {
  const categoria = typeof req.query.categoria === "string" ? req.query.categoria : void 0;
  const provincia = typeof req.query.provincia === "string" ? req.query.provincia : void 0;
  const limit = Math.min(200, Math.max(1, Number(req.query.limit ?? "50")));
  try {
    const rows = await listPriceSnapshot({ category: categoria, province: provincia, limit });
    const market = await getLiveMarketStatus();
    res.json({
      country: "Costa Rica",
      currency: "CRC",
      type: "price_snapshot",
      updatedAt: market.capturedAt?.toISOString() ?? new Date(Date.now() - 2 * 864e5).toISOString(),
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
        url: `/productos/${r.product.slug}`
      }))
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar los precios en este momento." });
  }
});
app.get("/api/v1/history", async (req, res) => {
  const slug = typeof req.query.slug === "string" ? req.query.slug : "";
  if (!slug) return res.status(400).json({ error: 'El par\xE1metro "slug" es obligatorio.' });
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
      categories: categories.map((c) => ({ name: c.name, slug: c.slug, group: c.group, productCount: c.productCount }))
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar las categor\xEDas en este momento." });
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
        locations: s.locations.map((l) => ({ name: l.name, province: l.province, canton: l.canton }))
      }))
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
      provinces: provinces.map((p) => ({ name: p.name, slug: p.id, cantons: p.cantons, storeCount: p.storeCount, productCount: p.productCount }))
    });
  } catch {
    res.status(500).json({ error: "No fue posible consultar las provincias en este momento." });
  }
});
app.get("/sitemap.xml", (_req, res) => {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const urls = [
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
    { path: "/fuentes", pri: "0.5" }
  ].map((u) => `<url><loc>${SITE_URL}${u.path === "/" ? "" : u.path}</loc><lastmod>${now}</lastmod><priority>${u.pri}</priority></url>`);
  for (const p of productos2) {
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
  res.header("Content-Type", "text/plain").send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml`);
});
app.get("/manifest.webmanifest", (_req, res) => {
  res.header("Content-Type", "application/manifest+json").json({
    name: SITE_NAME,
    short_name: "\xBFCu\xE1nto subi\xF3?",
    description: "Precios de productos en Costa Rica, comparados y actualizados desde m\xFAltiples fuentes del pa\xEDs.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf9",
    theme_color: "#0c6b3a",
    lang: "es"
  });
});
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
}
var index_default = app;
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`\u2726 \xBFCu\xE1nto subi\xF3.cr? API/SPA server en http://localhost:${PORT} (${PROD ? "producci\xF3n" : "desarrollo"})`);
  });
}
export {
  index_default as default
};

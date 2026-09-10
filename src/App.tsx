import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScoreProvider } from "@/lib/score";
import { SITE_NAME } from "@/lib/site";
import { seoIsSetFor, writeSeo } from "@/lib/seo";

const TITLES: { match: (p: string) => boolean; title: string; description: string }[] = [
  { match: (p) => p === "/", title: `${SITE_NAME} — ¿Cuánto subió en Costa Rica?`, description: "Consulta precios actualizados en colones, compara qué supermercado tiene la mejor opción y descubre cuánto han variado hoy los productos de la canasta básica." },
  { match: (p) => p === "/productos", title: `Productos en Costa Rica | Precios en colones · ${SITE_NAME}`, description: "Catálogo de productos con precio confirmado en Costa Rica, ordenable por subida, bajada y menor precio en colones (CRC)." },
  { match: (p) => p.startsWith("/productos/"), title: `Producto en Costa Rica · ${SITE_NAME}`, description: "Historial de precios en colones de productos en Costa Rica, comparación entre supermercados del país y su variación." },
  { match: (p) => p === "/precios", title: `Precios en Costa Rica · ${SITE_NAME}`, description: "Todas las consultas de precios en Costa Rica: por producto y por provincia, en colones (CRC)." },
  { match: (p) => p.startsWith("/precios/"), title: `Precio en Costa Rica · ${SITE_NAME}`, description: "Consulta precios de productos en Costa Rica en colones (CRC), comparados entre supermercados del país." },
  { match: (p) => p === "/canasta-basica", title: `Precios de la canasta básica en Costa Rica · ${SITE_NAME}`, description: "Compara fichas monitoreadas de consumo básico en Costa Rica, con precios en colones, variación e interpretación separada de la CBA del INEC y el IVA." },
  { match: (p) => p === "/supermercados", title: `Supermercados de Costa Rica · ${SITE_NAME}`, description: "Supermercados y cadenas con precios monitoreados en Costa Rica." },
  { match: (p) => p.startsWith("/supermercados/"), title: `Supermercado en Costa Rica · ${SITE_NAME}`, description: "Precios y catálogo de un supermercado de Costa Rica, en colones (CRC)." },
  { match: (p) => p === "/comercios", title: `Comercios de Costa Rica · ${SITE_NAME}`, description: "Comercios y cadenas que sirven como fuente de precios en Costa Rica." },
  { match: (p) => p === "/subidas", title: `Lo que más subió en Costa Rica · ${SITE_NAME}`, description: "Los productos cuyo precio más subió en Costa Rica, en colones (CRC)." },
  { match: (p) => p === "/bajadas", title: `Lo que más bajó en Costa Rica · ${SITE_NAME}`, description: "Los productos cuyo precio más bajó en Costa Rica, en colones (CRC)." },
  { match: (p) => p === "/metodologia", title: `Metodología · ${SITE_NAME}`, description: "Cómo se capturan, validan y comparan los precios en Costa Rica." },
  { match: (p) => p === "/fuentes", title: `Fuentes de precios · ${SITE_NAME}`, description: "Supermercados y comercios de Costa Rica que son fuentes de los precios publicados." },
  { match: (p) => p === "/cobertura", title: `Cobertura en Costa Rica · ${SITE_NAME}`, description: "Provincias, cantones y supermercados cubiertos por el monitoreo de precios en Costa Rica." },
  { match: (p) => p === "/como-funciona", title: `Cómo funciona · ${SITE_NAME}`, description: "Cómo funciona el monitoreo de precios en Costa Rica y cómo se comparan los supermercados." },
  { match: (p) => p === "/contacto", title: `Contacto · ${SITE_NAME}`, description: "Contactanos sobre precios de productos en Costa Rica." },
];

function genericSeoFor(pathname: string): { title: string; description: string } {
  const hit = TITLES.find((t) => t.match(pathname));
  if (hit) return { title: hit.title, description: hit.description };
  const words = pathname.split("/").filter(Boolean).join(" ").replace(/[-_]/g, " ") || "Costa Rica";
  return {
    title: `${words.charAt(0).toUpperCase()}${words.slice(1)} · ${SITE_NAME}`,
    description: "Precios de productos en Costa Rica, comparados entre supermercados del país.",
  };
}

function ScrollAndTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (seoIsSetFor(pathname)) return;
    const g = genericSeoFor(pathname);
    writeSeo(pathname, { title: g.title, description: g.description });
  }, [pathname]);
  return null;
}

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollAndTitle />
      <ScoreProvider>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </ScoreProvider>
    </div>
  );
}

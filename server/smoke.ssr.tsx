import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ScoreProvider } from "../src/lib/score";
import { HomePage } from "../src/pages/HomePage";
import { ProductosPage } from "../src/pages/ProductosPage";
import { ProductoPage } from "../src/pages/ProductoPage";
import { PreciosPage } from "../src/pages/PreciosPage";
import { PrecioIntentPage } from "../src/pages/PrecioIntentPage";
import { CanastaBasicaPage } from "../src/pages/CanastaBasicaPage";
import { SupermercadosPage } from "../src/pages/SupermercadosPage";
import { SupermercadoPage } from "../src/pages/SupermercadoPage";
import { ComerciosPage } from "../src/pages/ComerciosPage";
import { SubidasPage } from "../src/pages/SubidasPage";
import { BajadasPage } from "../src/pages/BajadasPage";
import { ComoFuncionaPage } from "../src/pages/ComoFuncionaPage";
import { MetodologiaPage } from "../src/pages/MetodologiaPage";
import { CoberturaPage } from "../src/pages/CoberturaPage";
import { FuentesPage } from "../src/pages/FuentesPage";
import { PrivacidadPage } from "../src/pages/PrivacidadPage";
import { TerminosPage } from "../src/pages/TerminosPage";
import { AvisoPage } from "../src/pages/AvisoPage";
import { ContactoPage } from "../src/pages/ContactoPage";
import { AdminPage } from "../src/pages/AdminPage";
import { NotFoundPage } from "../src/pages/NotFoundPage";

const routes = [
  { path: "/", el: <HomePage /> },
  { path: "/productos", el: <ProductosPage /> },
  { path: "/productos/arroz-blanco-1-8-kg", el: <ProductoPage /> },
  { path: "/precios", el: <PreciosPage /> },
  { path: "/precios/arroz-costa-rica", el: <PrecioIntentPage /> },
  { path: "/precios/san-jose-costa-rica", el: <PrecioIntentPage /> },
  { path: "/precios/consulta-inexistente", el: <PrecioIntentPage /> },
  { path: "/canasta-basica", el: <CanastaBasicaPage /> },
  { path: "/supermercados", el: <SupermercadosPage /> },
  { path: "/supermercados/mas-x-menos", el: <SupermercadoPage /> },
  { path: "/supermercados/no-existe", el: <SupermercadoPage /> },
  { path: "/comercios", el: <ComerciosPage /> },
  { path: "/subidas", el: <SubidasPage /> },
  { path: "/bajadas", el: <BajadasPage /> },
  { path: "/como-funciona", el: <ComoFuncionaPage /> },
  { path: "/metodologia", el: <MetodologiaPage /> },
  { path: "/cobertura", el: <CoberturaPage /> },
  { path: "/fuentes", el: <FuentesPage /> },
  { path: "/privacidad", el: <PrivacidadPage /> },
  { path: "/terminos", el: <TerminosPage /> },
  { path: "/aviso", el: <AvisoPage /> },
  { path: "/contacto", el: <ContactoPage /> },
  { path: "/admin", el: <AdminPage /> },
  { path: "/no-existe-404", el: <NotFoundPage /> },
];

let fails = 0;
for (const r of routes) {
  try {
    const html = renderToStaticMarkup(
      React.createElement(ScoreProvider, null,
        React.createElement(MemoryRouter, { initialEntries: [r.path] },
          React.createElement(Routes, null, React.createElement(Route, { path: "*", element: r.el })),
        ),
      ),
    );
    if (!html || html.length < 5) throw new Error("HTML vacío");
    console.log(`OK  ${r.path} (${html.length}b)`);
  } catch (e) {
    fails++;
    console.error(`ERR ${r.path}: ${(e as Error).message}`);
  }
}

console.log(fails ? `\n${fails} FAIL` : "\nALL OK");
process.exit(fails ? 1 : 0);
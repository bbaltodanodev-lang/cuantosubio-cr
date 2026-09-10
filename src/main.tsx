import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import { AppShell } from "@/App";
import { HomePage } from "@/pages/HomePage";
import { ProductosPage } from "@/pages/ProductosPage";
import { ProductoPage } from "@/pages/ProductoPage";
import { PreciosPage } from "@/pages/PreciosPage";
import { PrecioIntentPage } from "@/pages/PrecioIntentPage";
import { CanastaBasicaPage } from "@/pages/CanastaBasicaPage";
import { SupermercadosPage } from "@/pages/SupermercadosPage";
import { SupermercadoPage } from "@/pages/SupermercadoPage";
import { ProvinciaPage } from "@/pages/ProvinciaPage";
import { ComerciosPage } from "@/pages/ComerciosPage";
import { SubidasPage } from "@/pages/SubidasPage";
import { BajadasPage } from "@/pages/BajadasPage";
import { ComoFuncionaPage } from "@/pages/ComoFuncionaPage";
import { MetodologiaPage } from "@/pages/MetodologiaPage";
import { CoberturaPage } from "@/pages/CoberturaPage";
import { FuentesPage } from "@/pages/FuentesPage";
import { PrivacidadPage } from "@/pages/PrivacidadPage";
import { TerminosPage } from "@/pages/TerminosPage";
import { AvisoPage } from "@/pages/AvisoPage";
import { ContactoPage } from "@/pages/ContactoPage";
import { AdminPage } from "@/pages/AdminPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productos/:slug" element={<ProductoPage />} />
        <Route path="/producto/:slug" element={<ProductoPage />} />
        <Route path="/precios" element={<PreciosPage />} />
        <Route path="/precios/:slug" element={<PrecioIntentPage />} />
        <Route path="/san-jose" element={<ProvinciaPage />} />
        <Route path="/alajuela" element={<ProvinciaPage />} />
        <Route path="/cartago" element={<ProvinciaPage />} />
        <Route path="/heredia" element={<ProvinciaPage />} />
        <Route path="/guanacaste" element={<ProvinciaPage />} />
        <Route path="/puntarenas" element={<ProvinciaPage />} />
        <Route path="/limon" element={<ProvinciaPage />} />
        <Route path="/canasta-basica" element={<CanastaBasicaPage />} />
        <Route path="/supermercados" element={<SupermercadosPage />} />
        <Route path="/supermercados/:slug" element={<SupermercadoPage />} />
        <Route path="/comercios" element={<ComerciosPage />} />
        <Route path="/subidas" element={<SubidasPage />} />
        <Route path="/bajadas" element={<BajadasPage />} />
        <Route path="/como-funciona" element={<ComoFuncionaPage />} />
        <Route path="/metodologia" element={<MetodologiaPage />} />
        <Route path="/cobertura" element={<CoberturaPage />} />
        <Route path="/fuentes" element={<FuentesPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="/aviso-de-datos" element={<AvisoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
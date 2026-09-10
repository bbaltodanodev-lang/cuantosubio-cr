import { useEffect } from "react";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export interface SeoMeta {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: object | object[];
}

let lastSeoPath: string | null = null;

function setMeta(name: string, attr: "name" | "property", content: string): void {
  if (typeof document === "undefined") return;
  const selector = `meta[${attr}="${name}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function writeSeo(path: string, meta?: SeoMeta | null): void {
  if (typeof document === "undefined") return;
  lastSeoPath = meta ? path : null;
  const title = meta?.title;
  if (title !== undefined) {
    document.title = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
  }
  setMeta("description", "name", meta?.description ?? SITE_TAGLINE);
  setMeta("robots", "name", meta?.robots ?? "index, follow");
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const href = `${SITE_URL.replace(/\/$/, "")}${path === "/" ? "" : path}`;
  if (!canonical) {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = href;
    document.head.appendChild(link);
  } else {
    canonical.href = href;
  }

  setMeta("og:title", "property", title ?? SITE_NAME);
  setMeta("og:description", "property", meta?.description ?? SITE_TAGLINE);
  setMeta("og:type", "property", "website");
  setMeta("og:locale", "property", "es_CR");
  setMeta("og:site_name", "property", SITE_NAME);
  setMeta("og:url", "property", href);
  setMeta("og:image", "property", `${SITE_URL.replace(/\/$/, "")}/img/brand/og-image-v2.jpg`);
  setMeta("twitter:card", "name", "summary_large_image");
  setMeta("twitter:title", "name", title ?? SITE_NAME);
  setMeta("twitter:description", "name", meta?.description ?? SITE_TAGLINE);
  setMeta("twitter:image", "name", `${SITE_URL.replace(/\/$/, "")}/img/brand/og-image-v2.jpg`);

  let script = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
  if (meta?.jsonLd) {
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    const payload = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
    script.textContent = JSON.stringify(payload);
  } else if (script) {
    script.remove();
  }
}

export function seoIsSetFor(path: string): boolean {
  return lastSeoPath === path;
}

export function useSeo(path: string, meta: SeoMeta | null): void {
  const hasMeta = meta !== null;
  const title = meta?.title;
  const description = meta?.description;
  const canonical = meta?.canonical;
  const robots = meta?.robots;
  const jsonLd = meta?.jsonLd;

  useEffect(() => {
    writeSeo(
      path,
      hasMeta
        ? { title: title ?? "", description, canonical, robots, jsonLd }
        : null,
    );
    return () => {
      if (lastSeoPath === path) lastSeoPath = null;
    };
  }, [path, hasMeta, title, description, canonical, robots, jsonLd]);
}

export function websiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "es-CR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

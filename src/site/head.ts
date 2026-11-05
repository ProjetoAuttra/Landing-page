import { OG_IMAGE, SITE_NAME, absoluteUrl } from "./config";
import type { RouteInfo } from "./routes";
import { buildGraph } from "./schema";

type HeadElement = { type: string; props: Record<string, string>; children?: string };

// Tags de <head> de cada página, injetadas no HTML pré-renderizado pelo build.
export function buildHead(route: RouteInfo) {
  const url = absoluteUrl(route.path);
  const socialTitle = route.socialTitle ?? route.title;
  const socialDescription = route.socialDescription ?? route.description;
  // `<` escapado: o JSON vai dentro de uma tag <script>.
  const jsonLd = JSON.stringify(buildGraph(route)).replace(/</g, "\\u003c");

  const meta = (attr: "name" | "property", key: string, content: string): HeadElement => ({
    type: "meta",
    props: { [attr]: key, content },
  });

  const elements: HeadElement[] = [
    meta("name", "description", route.description),
    meta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
    { type: "link", props: { rel: "canonical", href: url } },
    meta("property", "og:type", route.ogType),
    meta("property", "og:locale", "pt_BR"),
    meta("property", "og:url", url),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:title", socialTitle),
    meta("property", "og:description", socialDescription),
    meta("property", "og:image", OG_IMAGE),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", "Auttra — Direção para a gestão da sua oficina"),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", socialTitle),
    meta("name", "twitter:description", socialDescription),
    meta("name", "twitter:image", OG_IMAGE),
    { type: "script", props: { type: "application/ld+json" }, children: jsonLd },
  ];

  if (route.ogType === "article") {
    if (route.published) elements.push(meta("property", "article:published_time", route.published));
    elements.push(meta("property", "article:modified_time", route.updated));
  }

  return { lang: "pt-BR", title: route.title, elements: new Set(elements) };
}

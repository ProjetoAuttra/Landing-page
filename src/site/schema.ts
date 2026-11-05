// Dados estruturados (schema.org em JSON-LD). Um @graph por página, com ids
// estáveis para Google e IAs entenderem que todas as páginas falam da mesma empresa e do mesmo produto.

import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  LOGO_IMAGE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from "./config";
import { homeFaqs, homeMeta, productFeatures } from "./home";
import { findContentPage, guidePages, guidesHub, type ContentPage, type Faq } from "./pages";
import type { RouteInfo } from "./routes";

type Node = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;

// Remove a marcação de link/negrito dos textos de conteúdo.
export function plainText(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

function organization(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_IMAGE, width: 180, height: 180 },
    image: OG_IMAGE,
    email: CONTACT_EMAIL,
    description: "A Auttra desenvolve um sistema de gestão para oficina mecânica.",
    areaServed: { "@type": "Country", name: "Brasil" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        areaServed: "BR",
        availableLanguage: ["Portuguese"],
      },
    ],
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

function website(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: homeMeta.description,
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

function software(): Node {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: SITE_NAME,
    alternateName: "Auttra – sistema para oficina mecânica",
    url: `${SITE_URL}/`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Sistema de gestão para oficina mecânica",
    operatingSystem: "Web (navegador no computador e no celular)",
    inLanguage: "pt-BR",
    description:
      "Sistema de gestão para oficina mecânica com ordem de serviço, orçamento em PDF pelo WhatsApp, agenda, estoque com entrada pelo XML da nota, financeiro e relatórios. A tela inicial avisa o que precisa de atenção.",
    featureList: productFeatures,
    screenshot: OG_IMAGE,
    audience: { "@type": "BusinessAudience", audienceType: "Oficinas mecânicas" },
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
  };
}

function breadcrumb(url: string, items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function faqPage(url: string, faqs: Faq[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: "pt-BR",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: plainText(faq.answer) },
    })),
  };
}

function webPage(route: RouteInfo, type: string, extra: Node = {}): Node {
  const url = absoluteUrl(route.path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
    dateModified: route.updated,
    ...extra,
  };
}

function article(page: ContentPage): Node {
  const url = absoluteUrl(page.path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: page.h1.replace(/\.$/, ""),
    description: page.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: OG_IMAGE,
    inLanguage: "pt-BR",
    datePublished: page.published,
    dateModified: page.updated,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@id": SOFTWARE_ID },
  };
}

export function buildGraph(route: RouteInfo): Node {
  const url = absoluteUrl(route.path);
  const home = { name: "Início", path: "/" };
  const graph: Node[] = [organization(), website(), software()];

  if (route.path === "/") {
    graph.push(
      webPage(route, "WebPage", { about: { "@id": SOFTWARE_ID }, mainEntity: { "@id": SOFTWARE_ID } }),
      faqPage(url, homeFaqs),
    );
  } else if (route.path === guidesHub.path) {
    graph.push(
      webPage(route, "CollectionPage", {
        breadcrumb: { "@id": `${url}#breadcrumb` },
        hasPart: guidePages.map((page) => ({ "@id": `${absoluteUrl(page.path)}#article` })),
      }),
      breadcrumb(url, [home, { name: guidesHub.name, path: guidesHub.path }]),
    );
  } else {
    const page = findContentPage(route.path);
    if (page) {
      const trail =
        page.kind === "guia"
          ? [home, { name: guidesHub.name, path: guidesHub.path }, { name: page.name, path: page.path }]
          : [home, { name: page.name, path: page.path }];
      graph.push(
        webPage(route, "WebPage", {
          breadcrumb: { "@id": `${url}#breadcrumb` },
          about: { "@id": SOFTWARE_ID },
          ...(page.published ? { datePublished: page.published } : {}),
        }),
        breadcrumb(url, trail),
        faqPage(url, page.faqs),
      );
      if (page.kind === "guia") graph.push(article(page));
    }
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

import { homeMeta } from "./home";
import { featurePages, guidePages, guidesHub } from "./pages";

export type RouteInfo = {
  path: string;
  title: string;
  description: string;
  updated: string;
  priority: number;
  changefreq: "weekly" | "monthly";
  ogType: "website" | "article";
  socialTitle?: string;
  socialDescription?: string;
  published?: string;
};

// Todas as páginas geradas pelo app. O build pré-renderiza cada uma e monta o sitemap e o llms.txt daqui.
export const appRoutes: RouteInfo[] = [
  {
    path: homeMeta.path,
    title: homeMeta.title,
    description: homeMeta.description,
    updated: homeMeta.updated,
    priority: 1,
    changefreq: "weekly",
    ogType: "website",
    socialTitle: homeMeta.socialTitle,
    socialDescription: homeMeta.socialDescription,
  },
  ...featurePages.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.description,
    updated: page.updated,
    published: page.published,
    priority: 0.9,
    changefreq: "monthly" as const,
    ogType: "website" as const,
  })),
  {
    path: guidesHub.path,
    title: guidesHub.title,
    description: guidesHub.description,
    updated: guidesHub.updated,
    priority: 0.6,
    changefreq: "weekly",
    ogType: "website",
  },
  ...guidePages.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.description,
    updated: page.updated,
    published: page.published,
    priority: 0.7,
    changefreq: "monthly" as const,
    ogType: "article" as const,
  })),
];

// Páginas HTML estáticas em public/, fora do app.
export const staticRoutes = [
  { path: "/privacidade/", updated: "2026-10-29", priority: 0.2, changefreq: "monthly" as const },
  { path: "/termos/", updated: "2026-10-29", priority: 0.2, changefreq: "monthly" as const },
];

export function findRoute(path: string) {
  return appRoutes.find((route) => route.path === path);
}

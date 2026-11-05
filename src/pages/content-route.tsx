import { SiteChrome } from "../components/Shared";
import { findContentPage, guidesHub } from "../site/pages";
import { ContentPage, GuidesPage } from "./ContentPage";

// Páginas de recursos e guias. Carregado à parte para a página inicial não baixar esse conteúdo.
export function contentRoute(path: string) {
  if (path === guidesHub.path) return <SiteChrome onHome={false}><GuidesPage /></SiteChrome>;
  const page = findContentPage(path);
  return page ? <SiteChrome onHome={false}><ContentPage page={page} /></SiteChrome> : null;
}

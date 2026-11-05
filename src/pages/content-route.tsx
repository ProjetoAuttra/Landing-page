import { SiteChrome } from "../components/Shared";
import { findContentPage, guidesHub } from "../site/pages";
import { ContentPage, GuidesPage } from "./ContentPage";

// Páginas de recursos e guias. Carregado à parte para a página inicial não baixar esse conteúdo.
export function contentRoute(path: string) {
  if (path === guidesHub.path) {
    return <SiteChrome onHome={false} topic={guidesHub.name} current="guias"><GuidesPage /></SiteChrome>;
  }
  const page = findContentPage(path);
  if (!page) return null;
  return (
    <SiteChrome onHome={false} topic={page.name} current={page.kind === "guia" ? "guias" : "recursos"} hasFaq>
      <ContentPage page={page} />
    </SiteChrome>
  );
}

import { hydrate, render, type VNode } from "preact";
import App from "./App";
import "@fontsource-variable/inter/wght.css";
import "./styles.css";
import "./content.css";

function normalizePath(path: string) {
  const clean = path.split(/[?#]/)[0] || "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

function mount(page: VNode) {
  const root = document.getElementById("root")!;
  // O build já entrega o HTML pronto; aqui só ligamos os eventos por cima dele.
  if (root.firstElementChild) hydrate(page, root);
  else render(page, root);
}

if (typeof window !== "undefined") {
  const path = normalizePath(window.location.pathname);
  if (path === "/") mount(<App />);
  else import("./pages/content-route").then(({ contentRoute }) => mount(contentRoute(path) ?? <App />));
}

// Chamado pelo build para gerar o HTML estático de cada página, com o <head> próprio dela.
export async function prerender(data: { url: string }) {
  const { renderToString } = await import("preact-render-to-string");
  const { appRoutes, findRoute } = await import("./site/routes");
  const { buildHead } = await import("./site/head");
  const { contentRoute } = await import("./pages/content-route");

  const path = normalizePath(data.url);
  const route = findRoute(path) ?? appRoutes[0];
  const page = path === "/" ? <App /> : contentRoute(path) ?? <App />;
  return { html: renderToString(page), head: buildHead(route) };
}

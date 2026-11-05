import { defineConfig, type Plugin } from "vite";
import preact from "@preact/preset-vite";
import { buildLlmsFullTxt, buildLlmsTxt, buildSitemap } from "./src/site/build-files";
import { appRoutes } from "./src/site/routes";

// sitemap.xml, llms.txt e llms-full.txt saem do mesmo conteúdo das páginas,
// então nunca ficam desatualizados em relação ao site.
function seoFiles(): Plugin {
  return {
    name: "auttra-seo-files",
    apply: "build",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap() });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: buildLlmsTxt() });
      this.emitFile({ type: "asset", fileName: "llms-full.txt", source: buildLlmsFullTxt() });
    },
  };
}

// Preact no lugar do React (mesma API via preact/compat, ~10x menor) e
// HTML pré-renderizado no build: cada página chega pronta, com o próprio <head>.
export default defineConfig({
  // Momento do build: o HTML pré-renderizado e a primeira renderização no navegador
  // decidem a oferta de lançamento pela mesma data; depois a página confere a data de hoje.
  define: { __BUILD_TIME__: JSON.stringify(Date.now()) },
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#root",
        additionalPrerenderRoutes: appRoutes.map((route) => route.path),
      },
    }),
    seoFiles(),
  ],
  server: {
    host: "127.0.0.1",
    port: 5176,
  },
});

import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// Preact no lugar do React (mesma API via preact/compat, ~10x menor) e
// HTML pré-renderizado no build: o conteúdo aparece antes de o JS rodar.
export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#root",
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 5176,
  },
});

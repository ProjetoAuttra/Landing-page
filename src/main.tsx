import { hydrate, render } from "preact";
import App from "./App";
import "./styles.css";

if (typeof window !== "undefined") {
  const root = document.getElementById("root")!;
  // O build já entrega o HTML pronto; aqui só ligamos os eventos por cima dele.
  if (root.firstElementChild) hydrate(<App />, root);
  else render(<App />, root);
}

// Chamado pelo build para gerar o HTML estático da página.
export async function prerender() {
  const { renderToString } = await import("preact-render-to-string");
  return { html: renderToString(<App />) };
}

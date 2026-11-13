// Arquivos gerados no build a partir do mesmo conteúdo das páginas:
// sitemap.xml (buscadores), llms.txt e llms-full.txt (assistentes de IA).

import {
  APP_URL_DEFAULT,
  CONTACT_EMAIL,
  PLAN_MONTHLY_PRICE,
  PLAN_SEMIANNUAL_MONTHS,
  PLAN_SEMIANNUAL_PRICE,
  SITE_URL,
  TRIAL_DAYS,
  absoluteUrl,
  formatPrice,
} from "./config";
import { homeFaqs, homeMeta, productFeatures } from "./home";
import { featurePages, guidePages, type ContentPage, type Faq } from "./pages";
import { appRoutes, staticRoutes } from "./routes";

export function buildSitemap() {
  const entries = [...appRoutes, ...staticRoutes].map(
    (route) =>
      `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n    <lastmod>${route.updated}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(1)}</priority>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

// Links internos viram absolutos no Markdown; o negrito é mantido.
function markdown(text: string) {
  return text.replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, (_, label, path) => `[${label}](${SITE_URL}${path})`);
}

const summary = [
  "> A Auttra é um sistema de gestão para oficina mecânica, em português, que funciona no navegador do computador e do celular, sem instalar nada. Reúne ordem de serviço, orçamento em PDF enviado pelo WhatsApp, agenda, estoque com entrada pelo XML da nota fiscal, contas a pagar e receber e 11 relatórios de gestão. A tela inicial avisa o que precisa de atenção: O.S. parada há mais de 5 dias, contas vencidas a receber, orçamentos sem resposta, estoque crítico e contas a pagar no dia seguinte.",
];

const facts = [
  "- Site: https://auttra.com.br/",
  `- Acesso para clientes: ${APP_URL_DEFAULT}`,
  `- Contato comercial: e-mail ${CONTACT_EMAIL}`,
  "- Público: oficinas mecânicas no Brasil",
  `- Preço: dois planos por oficina, com as mesmas funções e usuários ilimitados. Semestral: R$ ${formatPrice(PLAN_SEMIANNUAL_PRICE)} por mês, com contrato de ${PLAN_SEMIANNUAL_MONTHS} meses no cartão de crédito. Mensal: R$ ${formatPrice(PLAN_MONTHLY_PRICE)} por mês, sem contrato`,
  `- Teste grátis: ${TRIAL_DAYS} dias com tudo liberado, sem cartão de crédito e sem pagar nada. Sem assinatura depois do teste, a conta fica só para consulta (vê os dados, não cria nem altera nada). Nada é apagado; ao assinar, tudo volta a funcionar na hora`,
  "- Como começar: teste grátis pelo cadastro do app, ou pedido de demonstração pelo formulário do site",
];

function pageLink(page: ContentPage) {
  return `- [${page.name}](${absoluteUrl(page.path)}): ${page.description}`;
}

export function buildLlmsTxt() {
  return [
    "# Auttra",
    "",
    ...summary,
    "",
    ...facts,
    "",
    "## O que o sistema faz",
    "",
    ...productFeatures.map((feature) => `- ${feature}`),
    "",
    "## Páginas do produto",
    "",
    `- [Página inicial](${SITE_URL}/): ${homeMeta.description}`,
    ...featurePages.map(pageLink),
    "",
    "## Guias",
    "",
    ...guidePages.map(pageLink),
    "",
    "## Opcional",
    "",
    `- [Conteúdo completo em texto](${SITE_URL}/llms-full.txt): todas as páginas acima em Markdown`,
    `- [Política de Privacidade](${SITE_URL}/privacidade/)`,
    `- [Termos de Uso](${SITE_URL}/termos/)`,
    "",
  ].join("\n");
}

function faqMarkdown(faqs: Faq[]) {
  return faqs.flatMap((faq) => [`### ${faq.question}`, "", markdown(faq.answer), ""]);
}

function pageMarkdown(page: ContentPage) {
  const lines = [`## ${page.h1.replace(/\.$/, "")}`, "", `URL: ${absoluteUrl(page.path)}`, "", markdown(page.lead), ""];
  if (page.alert) {
    lines.push(`### Aviso na tela inicial: ${page.alert.title.replace(/\.$/, "")}`, "", page.alert.text, "");
  }
  if (page.flow) {
    lines.push(`### ${page.flow.heading}`, "");
    page.flow.steps.forEach((step, index) => lines.push(`${index + 1}. **${step.title}**: ${markdown(step.text)}`));
    lines.push("");
  }
  if (page.extras) {
    lines.push(`### ${page.extras.heading}`, "");
    page.extras.items.forEach((item) => lines.push(`- **${item.title}**: ${item.text}`));
    lines.push("");
  }
  page.sections.forEach((section) => {
    lines.push(`### ${section.heading}`, "");
    section.paragraphs?.forEach((paragraph) => lines.push(markdown(paragraph), ""));
    if (section.items?.length) {
      section.items.forEach((item, index) => lines.push(`${section.ordered ? `${index + 1}.` : "-"} ${markdown(item)}`));
      lines.push("");
    }
    section.groups?.forEach((group) => {
      lines.push(`**${group.title}**`, "", ...group.items.map((item) => `- ${markdown(item)}`), "");
    });
    section.closing?.forEach((paragraph) => lines.push(markdown(paragraph), ""));
  });
  page.sources?.forEach((source) => lines.push(`Fonte: [${source.label}](${source.href})`, ""));
  lines.push("### Perguntas frequentes", "", ...faqMarkdown(page.faqs));
  return lines;
}

export function buildLlmsFullTxt() {
  return [
    "# Auttra — conteúdo completo do site",
    "",
    ...summary,
    "",
    ...facts,
    "",
    "## O que o sistema faz",
    "",
    ...productFeatures.map((feature) => `- ${feature}`),
    "",
    "## Perguntas frequentes sobre a Auttra",
    "",
    ...faqMarkdown(homeFaqs),
    ...[...featurePages, ...guidePages].flatMap(pageMarkdown),
  ].join("\n");
}

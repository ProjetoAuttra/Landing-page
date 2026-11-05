// Endereço e nome curto de cada página de conteúdo. Fica separado do texto completo
// (pages.ts) para o menu e o rodapé não carregarem todo o conteúdo na página inicial.

export const featureLinks = [
  { path: "/ordem-de-servico-oficina/", name: "Ordem de serviço" },
  { path: "/orcamento-oficina-whatsapp/", name: "Orçamento pelo WhatsApp" },
  { path: "/controle-de-estoque-oficina/", name: "Controle de estoque" },
  { path: "/financeiro-oficina/", name: "Financeiro e relatórios" },
] as const;

export const guideLinks = [
  { path: "/guias/como-escolher-sistema-para-oficina/", name: "Como escolher um sistema para oficina" },
  { path: "/guias/como-fazer-ordem-de-servico-oficina/", name: "Como fazer ordem de serviço" },
] as const;

export const guidesHubLink = { path: "/guias/", name: "Guias" } as const;

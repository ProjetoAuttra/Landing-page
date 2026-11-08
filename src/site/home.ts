import { PLAN_MONTHLY_PRICE, PLAN_SEMIANNUAL_MONTHS, PLAN_SEMIANNUAL_PRICE, TRIAL_DAYS, formatPrice } from "./config";
import type { Faq } from "./pages";

export const homeMeta = {
  path: "/",
  title: "Sistema para oficina mecânica | Auttra",
  description:
    "Sistema para oficina mecânica que mostra o próximo passo: O.S. parada, conta vencida, orçamento sem resposta e estoque crítico na tela inicial. Teste 7 dias grátis, sem cartão.",
  socialTitle: "Auttra | Sistema para oficina mecânica",
  socialDescription: "Você dirige a oficina. A Auttra mostra o caminho.",
  updated: "2026-11-05",
};

// O que o sistema faz, em frases curtas. Vai para o `featureList` do schema e para o llms.txt.
export const productFeatures = [
  "Ordem de serviço com serviços, peças, mecânico responsável e valores, em PDF",
  "Orçamento em PDF enviado pelo WhatsApp do cliente; aprovado, vira ordem de serviço com um clique",
  "Agenda semanal com serviço, cliente e veículo",
  "Estoque com entrada pelo XML da nota fiscal do fornecedor, custo, preço de venda e alerta de estoque baixo",
  "Cadastro de clientes, veículos, serviços e fornecedores",
  "Contas a pagar e a receber com parcelas, desconto, multa e pagamento parcial",
  "Cobrança gerada automaticamente quando a ordem de serviço é concluída",
  "Fluxo de caixa por semana e por forma de pagamento",
  "11 relatórios de gestão: margem por O.S., produtividade por mecânico, inadimplência, orçamentos perdidos, fluxo de caixa, faturamento e outros",
  "Tela inicial com avisos do que precisa de atenção: O.S. parada há mais de 5 dias, contas vencidas a receber, orçamentos sem resposta há mais de 3 dias, estoque crítico e contas a pagar no dia seguinte",
  "Perfis de acesso de Proprietário, Recepção e Mecânico, com permissões ajustáveis",
  "Funciona no navegador do computador e do celular, sem instalar nada",
];

export const homeFaqs: Faq[] = [
  {
    question: "O que é a Auttra?",
    answer:
      "A Auttra é um sistema de gestão para oficina mecânica. Ela reúne ordem de serviço, orçamento, agenda, estoque, financeiro e relatórios, e mostra na tela inicial o que precisa de atenção: carro parado, cliente devendo, orçamento sem resposta e peça acabando.",
  },
  {
    question: "Preciso instalar alguma coisa?",
    answer: "Não. A Auttra funciona no navegador, no computador e no celular. É só entrar com o seu usuário e senha.",
  },
  {
    question: "O que dá para controlar na Auttra?",
    answer:
      "Clientes, veículos, agenda, orçamentos, ordens de serviço, serviços, estoque, fornecedores, contas a pagar e receber e relatórios. Agenda, estoque e fornecedores podem ser ligados ou desligados conforme a rotina da oficina.",
  },
  {
    question: "Consigo mandar o orçamento para o cliente?",
    answer:
      "Sim. O orçamento sai em PDF e vai para o WhatsApp do cliente direto da tela de orçamentos. Quando ele aprova, o orçamento vira ordem de serviço com um clique.",
  },
  {
    question: "Dá para lançar as peças pela nota fiscal?",
    answer: "Sim. Importe o XML da nota do fornecedor e as peças entram no estoque com custo e quantidade.",
  },
  {
    question: "Cada funcionário vê tudo?",
    answer:
      "Não. Cada pessoa tem o próprio acesso, e os perfis de Proprietário, Recepção e Mecânico definem o que cada um pode ver e alterar. As permissões podem ser ajustadas.",
  },
  {
    question: "A Auttra funciona no celular?",
    answer:
      "Sim. Ela abre no navegador do celular com a mesma conta do computador. Dá para consultar o que precisa de atenção, a agenda e as ordens de serviço de onde estiver.",
  },
  {
    question: "Quanto custa e como funciona a contratação?",
    answer: `São dois planos, com as mesmas funções e usuários ilimitados: o semestral, por R$ ${formatPrice(PLAN_SEMIANNUAL_PRICE)} por mês com contrato de ${PLAN_SEMIANNUAL_MONTHS} meses no cartão de crédito, e o mensal, por R$ ${formatPrice(PLAN_MONTHLY_PRICE)} por mês, sem contrato. O valor é por oficina. Antes de assinar, você testa ${TRIAL_DAYS} dias grátis com tudo liberado, sem cartão de crédito.`,
  },
  {
    question: "Como funciona o teste grátis?",
    answer: `Por ${TRIAL_DAYS} dias você usa a Auttra com tudo liberado, sem cartão de crédito e sem pagar nada. Se não assinar depois disso, continua entrando no sistema e vendo os dados que lançou, mas não consegue criar nem alterar nada. Nada é apagado: ao assinar, tudo volta a funcionar na hora.`,
  },
];

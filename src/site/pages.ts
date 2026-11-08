// Conteúdo das páginas de recursos e dos guias. Os textos aceitam duas marcações:
// [texto](/caminho/) vira link e **texto** vira negrito.
// Regra do conteúdo: só afirmar o que o sistema faz de verdade (as mesmas
// informações da página inicial e do PRODUCT.md). O que não for confirmado fica de fora.

import { featureLinks, guideLinks, guidesHubLink } from "./links";

const [osLink, orcamentoLink, estoqueLink, financeiroLink] = featureLinks;
const [escolherLink, fazerOsLink] = guideLinks;

export type Faq = { question: string; answer: string };

export type ScreenKey = "ordens" | "orcamentos" | "estoque" | "financeiro" | "agenda";

/** Recorte ampliado de uma tela real: `x` e `y` em % da imagem, `zoom` em vezes a largura do quadro. */
export type Crop = { x: number; y: number; zoom?: number };

export type FlowStep = { title: string; text: string; screen: ScreenKey; crop: Crop; alt: string };

export type Section = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  ordered?: boolean;
  /** Lista quebrada em blocos curtos (no lugar de `items`). */
  groups?: { title: string; items: string[] }[];
  /** Figura de exemplo desenhada no próprio site. */
  figure?: "os-anatomy";
  closing?: string[];
  /** Chamada discreta para a demonstração logo depois da seção. */
  aside?: { text: string; link: { label: string; href: string } };
};

export type ContentPage = {
  path: string;
  kind: "recurso" | "guia";
  /** Nome curto, usado no breadcrumb, nos links, no rodapé e na mensagem do WhatsApp. */
  name: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** Recursos: o aviso da tela inicial ligado a esta página (linha do quadro "Precisa de atenção"). */
  alert?: { row: 0 | 1 | 2 | 3 | 4; title: string; text: string };
  /** Recursos: o caminho da tarefa no sistema, com recortes das telas reais. */
  flow?: { heading: string; steps: FlowStep[] };
  /** Recursos: fatos que o caminho e o aviso não cobrem. */
  extras?: { heading: string; items: { title: string; text: string }[] };
  sections: Section[];
  faqs: Faq[];
  related: string[];
  sources?: { label: string; href: string }[];
  published: string;
  updated: string;
};

// Perguntas de quem está decidindo, comuns a todas as páginas de recursos.
const buyerFaqs: Faq[] = [
  {
    question: "Quanto custa a Auttra?",
    answer:
      "A Auttra tem dois planos, semestral e mensal, com as mesmas funções e usuários ilimitados, cobrados por mês por oficina. Os valores estão na [seção de preço](/#preco) da página inicial. Antes de assinar, dá para testar 7 dias grátis com tudo liberado, sem cartão de crédito.",
  },
  {
    question: "Como começo a usar?",
    answer:
      "Pelo teste grátis de 7 dias, com tudo liberado e sem cartão de crédito. Você deixa nome, WhatsApp e oficina no formulário e a gente libera o acesso. Se não assinar depois, seus dados continuam guardados. Se preferir ver o sistema antes, dá para pedir uma demonstração pelo WhatsApp.",
  },
];

export const featurePages: ContentPage[] = [
  {
    ...osLink,
    kind: "recurso",
    title: "Ordem de serviço para oficina mecânica | Auttra",
    description:
      "Ordem de serviço para oficina mecânica com serviços, peças, mecânico responsável e valores. O.S. em PDF, aviso de carro parado e cobrança gerada ao concluir.",
    h1: "Ordem de serviço para oficina, do orçamento aprovado ao recebimento.",
    lead:
      "Na Auttra, cada O.S. reúne cliente, veículo, serviços, peças, mecânico responsável e valores. Ela nasce do orçamento aprovado com um clique, sai em PDF para o cliente e, quando é concluída, já vira cobrança no financeiro.",
    alert: {
      row: 0,
      title: "Nenhum carro esquecido no pátio.",
      text: "Abra o sistema e a tela inicial já mostra quantas O.S. estão paradas há mais de 5 dias e há quanto tempo está parada a mais antiga. O aviso abre a lista certa para resolver.",
    },
    flow: {
      heading: "O caminho da O.S. na Auttra",
      steps: [
        {
          title: "O orçamento aprovado vira O.S.",
          text: "Com um clique, sem digitar de novo o que já estava no [orçamento](/orcamento-oficina-whatsapp/).",
          screen: "orcamentos",
          crop: { x: 19, y: 7 },
          alt: "Lista de orçamentos da Auttra com cliente, veículo, descrição e valor",
        },
        {
          title: "A O.S. reúne o serviço inteiro",
          text: "Serviços, peças, mecânico responsável e valores na mesma ordem, pronta em PDF para imprimir ou mandar ao cliente.",
          screen: "ordens",
          crop: { x: 19, y: 7 },
          alt: "Lista de ordens de serviço da Auttra com número, cliente, veículo e mecânico",
        },
        {
          title: "Concluída, vira cobrança",
          text: "A lista mostra status e pagamento de cada O.S., e a concluída gera a conta a receber no [financeiro](/financeiro-oficina/).",
          screen: "ordens",
          crop: { x: 47, y: 47 },
          alt: "Colunas de valor, status e pagamento das ordens de serviço da Auttra",
        },
      ],
    },
    sections: [
      {
        heading: "Por que a ordem de serviço é o centro da oficina",
        paragraphs: [
          "A ordem de serviço é o registro do que foi combinado com o cliente: o que vai ser feito no carro, quais peças entram, quem é o responsável e quanto custa. Quando ela fica no papel ou espalhada em mensagens, a oficina perde o histórico, esquece carro no pátio e cobra tarde.",
          "Num sistema, a O.S. passa a ligar as outras partes da rotina: o orçamento que deu origem a ela, as peças, o mecânico e o recebimento.",
        ],
      },
      {
        heading: "Cada função vê a parte dela",
        paragraphs: [
          "Os perfis de Proprietário, Recepção e Mecânico definem o que cada pessoa pode ver e alterar, e as permissões podem ser ajustadas. Cada funcionário entra com o próprio acesso, então fica claro quem fez o quê.",
        ],
      },
      {
        heading: "O que as ordens mostram para a gestão",
        paragraphs: [
          "Entre os 11 relatórios de gestão da Auttra, a margem por O.S. e a produtividade por mecânico saem direto das ordens de serviço. Você vê quais serviços deixam resultado e como o trabalho está distribuído na equipe.",
          "Ainda está montando o seu modelo de O.S.? Veja o guia [como fazer ordem de serviço de oficina mecânica](/guias/como-fazer-ordem-de-servico-oficina/).",
        ],
      },
    ],
    faqs: [
      {
        question: "Dá para transformar orçamento em ordem de serviço?",
        answer: "Sim. Quando o cliente aprova o orçamento, ele vira ordem de serviço com um clique.",
      },
      {
        question: "O mecânico consegue acessar as ordens de serviço?",
        answer: "Sim. Cada pessoa tem o próprio acesso, e o perfil de Mecânico define o que ele pode ver e alterar. As permissões podem ser ajustadas.",
      },
      {
        question: "A Auttra gera ordem de serviço em PDF?",
        answer: "Sim. A O.S. sai em PDF com serviços, peças, mecânico responsável e valores, pronta para imprimir ou mandar para o cliente.",
      },
      ...buyerFaqs,
    ],
    related: ["/orcamento-oficina-whatsapp/", "/financeiro-oficina/", "/guias/como-fazer-ordem-de-servico-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-05",
  },
  {
    ...orcamentoLink,
    kind: "recurso",
    title: "Orçamento de oficina em PDF pelo WhatsApp | Auttra",
    description:
      "Monte o orçamento da oficina, gere o PDF e envie pelo WhatsApp do cliente sem sair da tela. Acompanhe os que estão sem resposta e transforme o aprovado em O.S.",
    h1: "Orçamento de oficina em PDF, enviado pelo WhatsApp do cliente.",
    lead:
      "Na Auttra, o orçamento sai em PDF e vai para o WhatsApp do cliente direto da tela de orçamentos. Você acompanha o que está em análise, aprovado ou recusado e transforma o aprovado em ordem de serviço com um clique.",
    alert: {
      row: 2,
      title: "Ligue para o cliente na hora certa.",
      text: "A tela inicial separa os orçamentos em análise há mais de 3 dias. É o momento de retomar a conversa, antes de o serviço ir para outra oficina.",
    },
    flow: {
      heading: "O caminho do orçamento na Auttra",
      steps: [
        {
          title: "Monte e mande pelo WhatsApp",
          text: "A recepção monta o orçamento com serviços e peças, e o PDF vai para o WhatsApp do cliente direto da tela.",
          screen: "orcamentos",
          crop: { x: 19, y: 7 },
          alt: "Tela de orçamentos da Auttra com filtros por status e a lista de orçamentos",
        },
        {
          title: "Acompanhe status e validade",
          text: "Em análise, aprovado ou recusado, com a data de validade de cada orçamento na mesma lista.",
          screen: "orcamentos",
          crop: { x: 47, y: 22 },
          alt: "Colunas de valor, data, validade e status dos orçamentos da Auttra",
        },
        {
          title: "Aprovado vira O.S.",
          text: "Com um clique, o orçamento aprovado vira [ordem de serviço](/ordem-de-servico-oficina/). O recusado entra no relatório de orçamentos perdidos.",
          screen: "ordens",
          crop: { x: 19, y: 7 },
          alt: "Lista de ordens de serviço da Auttra",
        },
      ],
    },
    sections: [
      {
        heading: "Por que mandar o orçamento pelo WhatsApp",
        paragraphs: [
          "Boa parte dos clientes de oficina já conversa pelo WhatsApp. Mandar o orçamento ali, em PDF, evita o valor passado por telefone, que o cliente esquece, e deixa registrado o que foi proposto.",
          "O problema aparece quando cada orçamento sai de um celular diferente e ninguém sabe quais ainda estão sem resposta. É aí que o serviço vai para outra oficina.",
        ],
      },
      {
        heading: "O que a lei pede no orçamento",
        paragraphs: [
          "O Código de Defesa do Consumidor (art. 40) obriga o prestador de serviço a entregar um orçamento prévio com o valor da mão de obra, dos materiais e equipamentos, as condições de pagamento e as datas de início e término do serviço.",
          "Salvo combinação diferente, o orçamento vale por 10 dias a partir do recebimento pelo cliente. Depois de aprovado, só pode ser alterado com nova concordância dele.",
          "Com o orçamento registrado no sistema, com validade e status, fica mais fácil seguir essas regras e evitar discussão na entrega do carro.",
        ],
      },
    ],
    faqs: [
      {
        question: "Consigo mandar o orçamento da oficina pelo WhatsApp?",
        answer: "Sim. Na Auttra, o orçamento sai em PDF e vai para o WhatsApp do cliente direto da tela de orçamentos.",
      },
      {
        question: "Por quanto tempo vale um orçamento de oficina?",
        answer:
          "Pelo Código de Defesa do Consumidor (art. 40), o orçamento vale por 10 dias a partir do recebimento pelo cliente, salvo se a oficina e o cliente combinarem outro prazo. Na Auttra, a validade aparece na lista de orçamentos.",
      },
      {
        question: "O orçamento aprovado vira ordem de serviço?",
        answer: "Sim. Quando o cliente aprova, o orçamento vira ordem de serviço com um clique, sem digitar de novo.",
      },
      ...buyerFaqs,
    ],
    related: ["/ordem-de-servico-oficina/", "/financeiro-oficina/", "/guias/como-escolher-sistema-para-oficina/"],
    sources: [{ label: "Código de Defesa do Consumidor (Lei nº 8.078/1990)", href: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" }],
    published: "2026-11-04",
    updated: "2026-11-05",
  },
  {
    ...estoqueLink,
    kind: "recurso",
    title: "Controle de estoque para oficina mecânica | Auttra",
    description:
      "Controle de estoque de peças para oficina: entrada pelo XML da nota fiscal, custo e preço de venda de cada peça e alerta antes de faltar no meio do serviço.",
    h1: "Controle de estoque para oficina, com entrada pelo XML da nota.",
    lead:
      "Na Auttra, as peças entram no estoque pela importação do XML da nota do fornecedor, com custo e quantidade, sem digitar item por item. Cada peça mostra custo, preço de venda e quantidade.",
    alert: {
      row: 3,
      title: "Compre antes de faltar, não depois.",
      text: "Quando uma peça chega a 3 unidades ou menos, a tela inicial avisa. O carro não fica parado no elevador esperando peça.",
    },
    flow: {
      heading: "O caminho da peça na Auttra",
      steps: [
        {
          title: "Importe o XML da nota",
          text: "A nota do fornecedor chega e as peças entram no estoque com custo e quantidade, sem digitar item por item.",
          screen: "estoque",
          crop: { x: 44, y: 7 },
          alt: "Botão Importar XML da nota na tela de estoque da Auttra, acima da lista de peças",
        },
        {
          title: "Custo e venda de cada peça",
          text: "Custo, preço de venda e quantidade lado a lado, para o preço sair do custo real e não de memória.",
          screen: "estoque",
          crop: { x: 20, y: 33, zoom: 1.65 },
          alt: "Lista de peças da Auttra com custo, preço de venda e quantidade em estoque",
        },
        {
          title: "Baixo estoque em destaque",
          text: "As peças com pouca quantidade aparecem marcadas na lista, e o total de itens em baixo estoque fica no topo da tela.",
          screen: "estoque",
          crop: { x: 19, y: 16, zoom: 2.2 },
          alt: "Peças marcadas com alerta de estoque baixo na Auttra",
        },
      ],
    },
    extras: {
      heading: "Também no estoque",
      items: [
        { title: "Fornecedores", text: "Cadastro de fornecedores junto com o estoque." },
        { title: "Só se fizer sentido", text: "Estoque e fornecedores podem ser ligados ou desligados conforme a rotina da oficina." },
      ],
    },
    sections: [
      {
        heading: "O que custa não controlar o estoque",
        paragraphs: [
          "Na oficina, a peça que falta deixa o carro parado no elevador e atrasa a entrega. A peça que sobra prende dinheiro na prateleira. E, sem saber o custo de cada peça, fica difícil dizer se o serviço deu lucro.",
        ],
      },
      {
        heading: "Dicas para organizar o estoque da oficina",
        items: [
          "Comece pelas peças de maior giro, como filtros, óleos, pastilhas e lâmpadas, que costumam concentrar as saídas.",
          "Dê entrada sempre pela nota, para o custo de cada peça ficar certo.",
          "Faça contagens periódicas e corrija as diferenças assim que aparecerem.",
          "Defina o preço de venda a partir do custo real, não do preço de memória.",
        ],
        closing: [
          "Com o custo certo no estoque, os relatórios do [financeiro](/financeiro-oficina/) mostram a margem de cada ordem de serviço.",
        ],
      },
    ],
    faqs: [
      {
        question: "Dá para lançar as peças pela nota fiscal?",
        answer: "Sim. Importe o XML da nota do fornecedor e as peças entram no estoque com custo e quantidade.",
      },
      {
        question: "Sou obrigado a usar o controle de estoque?",
        answer: "Não. Estoque e fornecedores podem ser ligados ou desligados conforme a rotina da oficina.",
      },
      ...buyerFaqs,
    ],
    related: ["/ordem-de-servico-oficina/", "/financeiro-oficina/", "/guias/como-escolher-sistema-para-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-05",
  },
  {
    ...financeiroLink,
    kind: "recurso",
    title: "Controle financeiro para oficina mecânica | Auttra",
    description:
      "Contas a pagar e receber, fluxo de caixa e 11 relatórios de gestão para oficina mecânica, com cobrança gerada pela O.S. e aviso de contas vencidas.",
    h1: "Controle financeiro para oficina, ligado às ordens de serviço.",
    lead:
      "Na Auttra, a O.S. concluída já gera a cobrança em contas a receber. Contas a pagar e receber aceitam parcelas, desconto, multa e pagamento parcial, e o fluxo de caixa mostra o que entrou, saiu e ainda vai entrar.",
    alert: {
      row: 1,
      title: "A cobrança sai antes de o caixa apertar.",
      text: "A tela inicial soma as contas vencidas a receber e lembra as contas a pagar que vencem no dia seguinte, para nada ser pego de surpresa.",
    },
    flow: {
      heading: "O caminho do dinheiro na Auttra",
      steps: [
        {
          title: "A O.S. concluída gera a cobrança",
          text: "Sem lançar de novo: a [ordem de serviço](/ordem-de-servico-oficina/) concluída vira conta a receber, com parcelas, desconto, multa ou pagamento parcial.",
          screen: "ordens",
          crop: { x: 47, y: 47 },
          alt: "Status e pagamento das ordens de serviço na Auttra, com concluídas pagas e pendentes",
        },
        {
          title: "O caixa realizado e o previsto",
          text: "Recebido, pago, saldo, o que ainda vai entrar e o que ainda vai sair, no período que você escolher.",
          screen: "financeiro",
          crop: { x: 17, y: 7 },
          alt: "Fluxo de caixa da Auttra com recebido, pago, saldo realizado, a receber e a pagar",
        },
        {
          title: "Por semana e por forma de pagamento",
          text: "Entradas e saídas por semana e o recebido separado por PIX, cartão, dinheiro e transferência.",
          screen: "financeiro",
          crop: { x: 47, y: 43 },
          alt: "Gráfico do recebido por forma de pagamento na Auttra",
        },
      ],
    },
    extras: {
      heading: "Também no financeiro",
      items: [
        { title: "Faturamento do mês na abertura", text: "A tela inicial mostra o faturamento do mês com gráfico diário e os valores a receber e a pagar." },
        { title: "No celular", text: "O mesmo resumo abre no navegador do celular, com a mesma conta." },
      ],
    },
    sections: [
      {
        heading: "Onde o dinheiro da oficina se perde",
        paragraphs: [
          "Serviço entregue e não cobrado, cliente que ficou de pagar e esqueceu, conta do fornecedor que vence sem ninguém ver. Em muita oficina, o problema não é falta de serviço, é falta de visão do caixa.",
        ],
      },
      {
        heading: "Os relatórios de gestão",
        items: [
          "**Margem por O.S.**: quanto cada serviço deixou de resultado.",
          "**Produtividade por mecânico**: como o trabalho está distribuído na equipe.",
          "**Inadimplência**: o que os clientes ainda devem.",
          "**Orçamentos perdidos**: onde a oficina deixa de fechar serviço.",
          "**Fluxo de caixa**: entradas e saídas, realizadas e previstas.",
          "**Faturamento**: quanto a oficina faturou no período.",
        ],
        closing: [
          "São 11 relatórios no total. Na demonstração, a gente mostra quais fazem mais sentido para o tamanho da sua oficina.",
        ],
      },
    ],
    faqs: [
      {
        question: "A Auttra tem contas a pagar e a receber?",
        answer: "Sim, com parcelas, desconto, multa e pagamento parcial. A O.S. concluída já gera a cobrança em contas a receber.",
      },
      {
        question: "Quais relatórios a Auttra tem?",
        answer:
          "São 11 relatórios de gestão, entre eles margem por O.S., produtividade por mecânico, inadimplência, orçamentos perdidos, fluxo de caixa e faturamento.",
      },
      ...buyerFaqs,
    ],
    related: ["/ordem-de-servico-oficina/", "/orcamento-oficina-whatsapp/", "/controle-de-estoque-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-05",
  },
];

const cdcSource = { label: "Código de Defesa do Consumidor (Lei nº 8.078/1990)", href: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" };

export const guidePages: ContentPage[] = [
  {
    ...escolherLink,
    kind: "guia",
    title: "Como escolher um sistema para oficina mecânica | Auttra",
    description:
      "Checklist para escolher um sistema para oficina mecânica: ordem de serviço, orçamento, estoque, financeiro, acesso da equipe, celular, implantação e contrato.",
    h1: "Como escolher um sistema para oficina mecânica.",
    lead:
      "Um checklist para comparar sistemas de gestão de oficina antes de contratar: o que o sistema precisa fazer, o que perguntar na demonstração e quais sinais indicam que ele não serve para a sua rotina.",
    sections: [
      {
        heading: "Comece pela rotina, não pela lista de funções",
        paragraphs: [
          "Antes de olhar sistemas, anote o caminho do carro na sua oficina: como o cliente chega, quem faz o orçamento, como ele é aprovado, como a peça é comprada, quem executa o serviço e como o pagamento é recebido. O sistema certo acompanha esse caminho sem obrigar a equipe a trabalhar de um jeito que não é o dela.",
          "Anote também onde o controle aperta hoje: carro esquecido no pátio, orçamento sem resposta, peça que falta, cliente que não paga. Essas dores são o critério mais útil para comparar as opções.",
        ],
      },
      {
        heading: "As funções que não podem faltar",
        groups: [
          {
            title: "No atendimento",
            items: [
              "**Clientes e veículos**, com o histórico de serviços de cada carro.",
              "**Orçamento** enviado ao cliente, de preferência pelo WhatsApp, e convertido em O.S. sem redigitar.",
              "**Ordem de serviço** com serviços, peças, mecânico responsável, valores e status.",
              "**Agenda**, se a oficina trabalha com horário marcado.",
            ],
          },
          {
            title: "No controle",
            items: [
              "**Estoque** com entrada pela nota fiscal (XML) e alerta de estoque baixo.",
              "**Contas a pagar e a receber**, com parcelas e pagamento parcial.",
              "**Relatórios** de faturamento, margem e inadimplência, no mínimo.",
            ],
          },
        ],
      },
      {
        heading: "Perguntas para fazer na demonstração",
        groups: [
          {
            title: "Uso no dia a dia",
            items: [
              "Funciona no navegador ou precisa instalar? Funciona no celular?",
              "Cada funcionário tem o próprio acesso? Dá para limitar o que o mecânico e a recepção veem?",
              "O sistema emite nota fiscal de serviço ou se integra a um emissor? Isso importa para a sua oficina?",
            ],
          },
          {
            title: "Contratação",
            items: [
              "Qual é o valor, o que está incluído e como funciona o cancelamento?",
              "Como é a implantação e o treinamento da equipe?",
              "Como é o suporte e por qual canal ele atende?",
            ],
          },
          {
            title: "Seus dados",
            items: [
              "Como os dados que já tenho (clientes, veículos, peças) entram no sistema?",
              "Onde ficam os dados, como é feito o backup e como exporto tudo se quiser sair?",
            ],
          },
        ],
        aside: {
          text: "Quer tirar essas dúvidas com a Auttra? Teste 7 dias grátis com a rotina da sua oficina, sem cartão de crédito. Os preços estão publicados no site.",
          link: { label: "Testar 7 dias grátis", href: "#teste-gratis" },
        },
      },
      {
        heading: "Sinais de alerta",
        items: [
          "A demonstração é genérica e não usa nenhum exemplo da sua rotina.",
          "O valor total e as regras de cancelamento não ficam claros antes de assinar.",
          "A equipe precisa passar por muitas telas para uma tarefa simples, como abrir uma O.S.",
          "Ninguém mostra o sistema funcionando com casos parecidos com os seus.",
        ],
      },
      {
        heading: "Na nuvem ou instalado no computador",
        paragraphs: [
          "Sistemas que funcionam no navegador (na nuvem) dispensam instalação, abrem no computador e no celular e não dependem de uma máquina específica da oficina. Os instalados podem funcionar sem internet, mas exigem cuidado com backup e atualização em cada computador.",
          "Para oficinas que já usam o celular e o WhatsApp no dia a dia, o navegador costuma ser o caminho mais simples.",
        ],
      },
      {
        heading: "Onde a Auttra se encaixa",
        paragraphs: [
          "A Auttra é um sistema para oficina mecânica que funciona no navegador, no computador e no celular. Ela reúne clientes, veículos, agenda, [orçamentos](/orcamento-oficina-whatsapp/), [ordens de serviço](/ordem-de-servico-oficina/), [estoque](/controle-de-estoque-oficina/), fornecedores e [financeiro](/financeiro-oficina/), com perfis de acesso para Proprietário, Recepção e Mecânico.",
          "O diferencial é a tela inicial, que avisa o que precisa de atenção: O.S. parada há mais de 5 dias, conta vencida, orçamento sem resposta, estoque crítico e conta a pagar no dia seguinte.",
          "A Auttra tem dois planos, semestral e mensal, com as mesmas funções e usuários ilimitados, e os [preços publicados no site](/#preco). Dá para testar 7 dias grátis, com tudo liberado e sem cartão de crédito, antes de assinar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qual o melhor sistema para oficina mecânica?",
        answer:
          "Depende da rotina da oficina. O melhor sistema é o que cobre o caminho do carro, do orçamento ao recebimento, sem complicar o trabalho da equipe, e tem valor e contrato claros. Use o checklist deste guia para comparar as opções em uma demonstração.",
      },
      {
        question: "Sistema para oficina precisa ser instalado?",
        answer: "Não necessariamente. Há sistemas que funcionam no navegador, como a Auttra, e dispensam instalação no computador e no celular.",
      },
      {
        question: "Quanto custa um sistema para oficina mecânica?",
        answer:
          "Varia conforme o fornecedor, o número de usuários e os módulos. Antes de decidir, peça o valor total, o que está incluído (implantação, treinamento e suporte) e as regras de cancelamento.",
      },
      {
        question: "Oficina pequena precisa de sistema?",
        answer:
          "Mesmo com um ou dois mecânicos, orçamento sem resposta, cobrança esquecida e peça que falta custam dinheiro. Um sistema simples, que funcione no celular, ajuda a enxergar essas pendências sem aumentar a burocracia.",
      },
    ],
    related: ["/ordem-de-servico-oficina/", "/orcamento-oficina-whatsapp/", "/guias/como-fazer-ordem-de-servico-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-05",
  },
  {
    ...fazerOsLink,
    kind: "guia",
    title: "Como fazer ordem de serviço de oficina mecânica | Auttra",
    description:
      "O que uma ordem de serviço de oficina mecânica precisa ter: dados do cliente e do veículo, serviços, peças, valores, prazos, garantia e a autorização do cliente.",
    h1: "Como fazer ordem de serviço de oficina mecânica.",
    lead:
      "O que colocar na O.S., em que ordem preencher e quais regras do Código de Defesa do Consumidor valem para o serviço no carro do cliente.",
    sections: [
      {
        heading: "O que é a ordem de serviço",
        paragraphs: [
          "A ordem de serviço (O.S.) é o documento que registra o que a oficina vai fazer no veículo, com quais peças, por quem, em quanto tempo e por qual valor. Ela protege a oficina e o cliente: deixa claro o que foi combinado e forma o histórico do carro.",
        ],
      },
      {
        heading: "O que a O.S. precisa ter",
        paragraphs: ["São onze informações, que cabem em quatro blocos. O modelo abaixo mostra cada bloco preenchido, com dados de exemplo."],
        figure: "os-anatomy",
        groups: [
          { title: "1. Quem", items: ["**Cliente**: nome, telefone ou WhatsApp e documento, se a oficina emite nota."] },
          {
            title: "2. O carro",
            items: [
              "**Veículo**: placa, marca, modelo, ano e quilometragem na entrada.",
              "**Relato do cliente**: o problema descrito com as palavras dele.",
              "**Diagnóstico**: o que o mecânico encontrou.",
            ],
          },
          {
            title: "3. O serviço",
            items: [
              "**Serviços**: cada serviço com o valor da mão de obra.",
              "**Peças**: cada peça com quantidade e valor, e se é original, nova ou de outro tipo.",
              "**Responsável e prazos**: o mecânico, a data de entrada e a previsão de entrega.",
            ],
          },
          {
            title: "4. O acordo",
            items: [
              "**Valores e pagamento**: total, desconto, forma e condições de pagamento.",
              "**Garantia**: o prazo e o que ela cobre.",
              "**Autorização**: a aprovação do cliente, por assinatura ou por mensagem registrada.",
            ],
          },
        ],
      },
      {
        heading: "Passo a passo para abrir e fechar uma O.S.",
        ordered: true,
        items: [
          "Receba o carro e registre cliente, veículo, quilometragem e o relato do problema.",
          "Faça o diagnóstico e monte o orçamento com serviços e peças.",
          "Envie o orçamento ao cliente e espere a aprovação antes de começar.",
          "Com a aprovação, abra a O.S. e defina o mecânico responsável e a previsão de entrega.",
          "Atualize o status durante o serviço e avise o cliente se algo mudar.",
          "Ao concluir, revise os itens, registre o pagamento e entregue a O.S. ao cliente.",
        ],
        aside: {
          text: "Na Auttra, esse caminho já vem pronto: o orçamento aprovado vira O.S. com um clique, e a O.S. concluída vira cobrança.",
          link: { label: "Ver a ordem de serviço da Auttra", href: "/ordem-de-servico-oficina/" },
        },
      },
      {
        heading: "O que diz o Código de Defesa do Consumidor",
        paragraphs: [
          "**Orçamento prévio (art. 40)**: o prestador deve entregar orçamento com o valor da mão de obra, dos materiais e equipamentos, as condições de pagamento e as datas de início e término. Salvo combinação diferente, ele vale por 10 dias a partir do recebimento pelo cliente e, depois de aprovado, só muda com nova concordância dele.",
          "**Peças de reposição (art. 21)**: no conserto, a oficina deve usar peças originais, adequadas e novas, ou que mantenham as especificações técnicas do fabricante. Para usar uma peça fora desse padrão, precisa da autorização do cliente.",
          "**Prazo para reclamar (art. 26)**: em serviços em bens duráveis, como o conserto de um carro, o cliente tem 90 dias para reclamar de defeitos aparentes, contados do término do serviço. Uma garantia maior oferecida pela oficina deve ser dada por escrito (art. 50).",
        ],
        closing: [
          "Este guia resume regras gerais. Em casos específicos, consulte um advogado ou o Procon do seu estado.",
        ],
      },
      {
        heading: "Erros comuns",
        items: [
          "Começar o serviço sem a aprovação do cliente registrada.",
          "Não anotar a quilometragem e o estado do carro na entrada.",
          "Juntar peças e mão de obra num valor só, sem discriminar.",
          "Deixar a O.S. aberta depois de entregar o carro e esquecer a cobrança.",
          "Guardar a O.S. só no papel, sem o histórico do veículo.",
        ],
      },
      {
        heading: "No papel, na planilha ou no sistema",
        paragraphs: [
          "Papel e planilha funcionam no começo, mas não avisam nada: o carro parado, o orçamento sem resposta e a cobrança esquecida continuam dependendo da memória de alguém.",
          "Num sistema como a Auttra, a [ordem de serviço](/ordem-de-servico-oficina/) nasce do [orçamento aprovado](/orcamento-oficina-whatsapp/), sai em PDF, tem status e mecânico responsável, avisa quando está parada há mais de 5 dias e gera a cobrança ao ser concluída.",
        ],
      },
    ],
    faqs: [
      {
        question: "O que deve ter numa ordem de serviço de oficina?",
        answer:
          "Dados do cliente e do veículo (placa, modelo, ano e quilometragem), relato do problema, diagnóstico, serviços com o valor da mão de obra, peças com quantidade e valor, prazos, mecânico responsável, valores e forma de pagamento, garantia e a autorização do cliente.",
      },
      {
        question: "Qual a diferença entre orçamento e ordem de serviço?",
        answer:
          "O orçamento é a proposta enviada ao cliente antes do serviço. A ordem de serviço é o registro do serviço aprovado, com o que vai ser feito, quem faz e quanto custa. Em sistemas como a Auttra, o orçamento aprovado vira a O.S. com um clique.",
      },
      {
        question: "Qual é a garantia de um serviço de oficina mecânica?",
        answer:
          "Pelo Código de Defesa do Consumidor (art. 26), o cliente tem 90 dias para reclamar de defeitos aparentes em serviços em bens duráveis, como o conserto de um carro, contados do término do serviço. A oficina pode oferecer uma garantia maior, por escrito.",
      },
      {
        question: "Dá para fazer ordem de serviço pelo celular?",
        answer:
          "Sim, em sistemas que funcionam no navegador. Na Auttra, as ordens de serviço podem ser consultadas no celular com a mesma conta do computador.",
      },
    ],
    related: ["/ordem-de-servico-oficina/", "/orcamento-oficina-whatsapp/", "/guias/como-escolher-sistema-para-oficina/"],
    sources: [cdcSource],
    published: "2026-11-04",
    updated: "2026-11-05",
  },
];

export const guidesHub = {
  ...guidesHubLink,
  title: "Guias de gestão para oficina mecânica | Auttra",
  description:
    "Guias práticos para quem administra oficina mecânica: como escolher um sistema, como fazer ordem de serviço e o que a lei pede no orçamento e na garantia.",
  h1: "Guias para quem administra oficina mecânica.",
  lead: "Conteúdo prático sobre a rotina da oficina: como escolher um sistema, como montar a ordem de serviço e o que a lei pede no orçamento e na garantia.",
  updated: "2026-11-05",
};

export const contentPages = [...featurePages, ...guidePages];

export function findContentPage(path: string) {
  return contentPages.find((page) => page.path === path);
}

/** Âncora estável de uma seção, usada no sumário dos guias. */
export function sectionId(heading: string) {
  return heading
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

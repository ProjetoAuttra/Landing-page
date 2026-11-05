// Conteúdo das páginas de recursos e dos guias. Os textos aceitam duas marcações:
// [texto](/caminho/) vira link e **texto** vira negrito.
// Regra do conteúdo: só afirmar o que o sistema faz de verdade (as mesmas
// informações da página inicial). O que não for confirmado fica de fora.

import { featureLinks, guideLinks, guidesHubLink } from "./links";

const [osLink, orcamentoLink, estoqueLink, financeiroLink] = featureLinks;
const [escolherLink, fazerOsLink] = guideLinks;

export type Faq = { question: string; answer: string };

export type Section = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  ordered?: boolean;
  closing?: string[];
};

export type ScreenKey = "ordens" | "orcamentos" | "estoque" | "financeiro" | "agenda";

export type ContentPage = {
  path: string;
  kind: "recurso" | "guia";
  /** Nome curto, usado no breadcrumb, nos links e no rodapé. */
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  image?: { key: ScreenKey; alt: string };
  highlightsHeading?: string;
  highlights?: { title: string; text: string }[];
  sections: Section[];
  faqs: Faq[];
  related: string[];
  published: string;
  updated: string;
};

export const featurePages: ContentPage[] = [
  {
    ...osLink,
    kind: "recurso",
    title: "Ordem de serviço para oficina mecânica | Auttra",
    description:
      "Ordem de serviço para oficina mecânica com serviços, peças, mecânico responsável e valores. O.S. em PDF, aviso de carro parado e cobrança gerada ao concluir.",
    eyebrow: "Ordem de serviço",
    h1: "Ordem de serviço para oficina, do orçamento aprovado ao recebimento.",
    lead:
      "Na Auttra, cada O.S. reúne cliente, veículo, serviços, peças, mecânico responsável e valores. Ela nasce do orçamento aprovado com um clique, sai em PDF para o cliente e, quando é concluída, já vira cobrança no financeiro.",
    image: {
      key: "ordens",
      alt: "Lista de ordens de serviço da Auttra com cliente, veículo, mecânico, valor, status e pagamento",
    },
    highlightsHeading: "O que a O.S. da Auttra faz",
    highlights: [
      { title: "Nasce do orçamento", text: "O orçamento aprovado vira ordem de serviço com um clique, sem digitar tudo de novo." },
      { title: "Tudo na mesma ordem", text: "Serviços, peças, mecânico responsável e valores no mesmo documento." },
      { title: "PDF para o cliente", text: "A O.S. sai pronta para imprimir ou mandar para o cliente." },
      { title: "Status de cada carro", text: "A lista mostra status, cliente, veículo, mecânico, valor e pagamento de cada O.S." },
      { title: "Aviso de carro parado", text: "A tela inicial avisa quando há O.S. parada há mais de 5 dias e há quanto tempo está parada a mais antiga." },
      { title: "Cobrança ao concluir", text: "A O.S. concluída gera a cobrança em contas a receber." },
    ],
    sections: [
      {
        heading: "Por que a ordem de serviço é o centro da oficina",
        paragraphs: [
          "A ordem de serviço é o registro do que foi combinado com o cliente: o que vai ser feito no carro, quais peças entram, quem é o responsável e quanto custa. Quando ela fica no papel ou espalhada em mensagens, a oficina perde o histórico, esquece carro no pátio e cobra tarde.",
          "Num sistema, a O.S. passa a ligar as outras partes da rotina: o orçamento que deu origem a ela, as peças, o mecânico e o recebimento.",
        ],
      },
      {
        heading: "Como a O.S. funciona na Auttra",
        ordered: true,
        items: [
          "O cliente aprova o [orçamento](/orcamento-oficina-whatsapp/) e ele vira O.S. com um clique.",
          "A O.S. registra os serviços, as peças, o mecânico responsável e os valores.",
          "A equipe acompanha cada ordem na lista, com status, cliente, veículo, valor e pagamento.",
          "Se uma O.S. fica parada por mais de 5 dias, a tela inicial avisa.",
          "Concluída, a O.S. gera a cobrança em contas a receber, no [financeiro](/financeiro-oficina/).",
        ],
      },
      {
        heading: "Cada função vê a parte dela",
        paragraphs: [
          "Os perfis de Proprietário, Recepção e Mecânico definem o que cada pessoa pode ver e alterar, e as permissões podem ser ajustadas. Cada funcionário entra com o próprio acesso, então fica claro quem fez o quê.",
        ],
      },
      {
        heading: "O que as ordens de serviço mostram para a gestão",
        paragraphs: [
          "Entre os 11 relatórios de gestão da Auttra, a margem por O.S. e a produtividade por mecânico saem direto das ordens de serviço. Você vê quais serviços deixam resultado e como o trabalho está distribuído na equipe.",
          "Ainda está montando o seu modelo de O.S.? Veja o guia [como fazer ordem de serviço de oficina mecânica](/guias/como-fazer-ordem-de-servico-oficina/).",
        ],
      },
    ],
    faqs: [
      {
        question: "A Auttra gera ordem de serviço em PDF?",
        answer: "Sim. A O.S. sai em PDF com serviços, peças, mecânico responsável e valores, pronta para imprimir ou mandar para o cliente.",
      },
      {
        question: "Dá para transformar orçamento em ordem de serviço?",
        answer: "Sim. Quando o cliente aprova o orçamento, ele vira ordem de serviço com um clique.",
      },
      {
        question: "Como sei quais carros estão parados na oficina?",
        answer:
          "A tela inicial mostra quantas O.S. estão paradas há mais de 5 dias e há quanto tempo está parada a mais antiga. O aviso abre a lista certa para resolver.",
      },
      {
        question: "O mecânico consegue acessar as ordens de serviço?",
        answer: "Sim. Cada pessoa tem o próprio acesso, e o perfil de Mecânico define o que ele pode ver e alterar. As permissões podem ser ajustadas.",
      },
    ],
    related: ["/orcamento-oficina-whatsapp/", "/financeiro-oficina/", "/guias/como-fazer-ordem-de-servico-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-04",
  },
  {
    ...orcamentoLink,
    kind: "recurso",
    title: "Orçamento de oficina em PDF pelo WhatsApp | Auttra",
    description:
      "Monte o orçamento da oficina, gere o PDF e envie pelo WhatsApp do cliente sem sair da tela. Acompanhe os que estão sem resposta e transforme o aprovado em O.S.",
    eyebrow: "Orçamento",
    h1: "Orçamento de oficina em PDF, enviado pelo WhatsApp do cliente.",
    lead:
      "Na Auttra, o orçamento sai em PDF e vai para o WhatsApp do cliente direto da tela de orçamentos. Você acompanha o que está em análise, aprovado ou recusado, recebe aviso dos que estão sem resposta e transforma o aprovado em ordem de serviço com um clique.",
    image: { key: "orcamentos", alt: "Lista de orçamentos da Auttra com valores, validade e status" },
    highlightsHeading: "O que o orçamento da Auttra faz",
    highlights: [
      { title: "PDF para o cliente", text: "O orçamento sai em PDF, com os serviços e os valores que o cliente precisa aprovar." },
      { title: "Direto no WhatsApp", text: "O envio para o WhatsApp do cliente sai da própria tela de orçamentos." },
      { title: "Status e validade", text: "Em análise, aprovado ou recusado, com valor e validade na mesma lista." },
      { title: "Aviso de sem resposta", text: "A tela inicial separa os orçamentos em análise há mais de 3 dias, na hora certa de ligar." },
      { title: "Aprovado vira O.S.", text: "Com um clique, o orçamento aprovado vira ordem de serviço." },
      { title: "Orçamentos perdidos", text: "Um relatório mostra os orçamentos perdidos, para entender onde a oficina deixa de fechar serviço." },
    ],
    sections: [
      {
        heading: "Por que mandar o orçamento pelo WhatsApp",
        paragraphs: [
          "Boa parte dos clientes de oficina já conversa pelo WhatsApp. Mandar o orçamento ali, em PDF, evita o valor passado por telefone, que o cliente esquece, e deixa registrado o que foi proposto.",
          "O problema aparece quando cada orçamento sai de um celular diferente e ninguém sabe quais ainda estão sem resposta. É aí que o serviço vai para outra oficina.",
        ],
      },
      {
        heading: "Como funciona na Auttra",
        ordered: true,
        items: [
          "A recepção monta o orçamento com os serviços e as peças.",
          "O PDF é gerado e enviado ao WhatsApp do cliente direto da tela.",
          "O orçamento fica em análise até o cliente responder.",
          "Passados 3 dias sem resposta, ele aparece nos avisos da tela inicial.",
          "Aprovado, vira [ordem de serviço](/ordem-de-servico-oficina/) com um clique. Recusado, entra no relatório de orçamentos perdidos.",
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
        question: "O orçamento aprovado vira ordem de serviço?",
        answer: "Sim. Quando o cliente aprova, o orçamento vira ordem de serviço com um clique, sem digitar de novo.",
      },
      {
        question: "Como sei quais orçamentos estão sem resposta?",
        answer: "A tela inicial separa os orçamentos em análise há mais de 3 dias, para a oficina ligar para o cliente na hora certa.",
      },
      {
        question: "Por quanto tempo vale um orçamento de oficina?",
        answer:
          "Pelo Código de Defesa do Consumidor (art. 40), o orçamento vale por 10 dias a partir do recebimento pelo cliente, salvo se a oficina e o cliente combinarem outro prazo. Na Auttra, a validade aparece na lista de orçamentos.",
      },
    ],
    related: ["/ordem-de-servico-oficina/", "/financeiro-oficina/", "/guias/como-escolher-sistema-para-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-04",
  },
  {
    ...estoqueLink,
    kind: "recurso",
    title: "Controle de estoque para oficina mecânica | Auttra",
    description:
      "Controle de estoque de peças para oficina: entrada pelo XML da nota fiscal, custo e preço de venda de cada peça e alerta antes de faltar no meio do serviço.",
    eyebrow: "Estoque",
    h1: "Controle de estoque para oficina, com entrada pelo XML da nota.",
    lead:
      "Na Auttra, as peças entram no estoque pela importação do XML da nota do fornecedor, com custo e quantidade, sem digitar item por item. Cada peça mostra custo, preço de venda e quantidade, e a tela inicial avisa quando ela chega a 3 unidades ou menos.",
    image: { key: "estoque", alt: "Tela de estoque da Auttra com peças, custo, venda e alertas de estoque baixo" },
    highlightsHeading: "O que o estoque da Auttra faz",
    highlights: [
      { title: "Entrada pelo XML", text: "Importe o XML da nota do fornecedor e as peças entram com custo e quantidade." },
      { title: "Custo e preço de venda", text: "Cada peça com custo, preço de venda e quantidade em estoque." },
      { title: "Alerta de estoque crítico", text: "Aviso quando uma peça chega a 3 unidades ou menos, antes de faltar no meio do serviço." },
      { title: "Fornecedores", text: "Cadastro de fornecedores junto com o estoque." },
      { title: "Liga e desliga", text: "Estoque e fornecedores podem ser ligados ou desligados conforme a rotina da oficina." },
    ],
    sections: [
      {
        heading: "O que custa não controlar o estoque",
        paragraphs: [
          "Na oficina, a peça que falta deixa o carro parado no elevador e atrasa a entrega. A peça que sobra prende dinheiro na prateleira. E, sem saber o custo de cada peça, fica difícil dizer se o serviço deu lucro.",
        ],
      },
      {
        heading: "Como funciona na Auttra",
        ordered: true,
        items: [
          "A nota do fornecedor chega e você importa o XML.",
          "As peças entram no estoque com custo e quantidade.",
          "Cada peça fica com custo, preço de venda e quantidade.",
          "Quando uma peça chega a 3 unidades ou menos, a tela inicial avisa.",
        ],
      },
      {
        heading: "Dicas para organizar o estoque da oficina",
        items: [
          "Comece pelas peças de maior giro, como filtros, óleos, pastilhas e lâmpadas, que costumam concentrar as saídas.",
          "Dê entrada sempre pela nota, para o custo de cada peça ficar certo.",
          "Faça contagens periódicas e corrija as diferenças assim que aparecerem.",
          "Defina o preço de venda a partir do custo real, não do preço de memória.",
          "Use o alerta de estoque baixo para comprar antes de faltar, e não depois.",
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
        question: "A Auttra avisa quando uma peça está acabando?",
        answer: "Sim. A tela inicial avisa quando uma peça chega a 3 unidades ou menos, antes de faltar no meio do serviço.",
      },
      {
        question: "Sou obrigado a usar o controle de estoque?",
        answer: "Não. Estoque e fornecedores podem ser ligados ou desligados conforme a rotina da oficina.",
      },
    ],
    related: ["/ordem-de-servico-oficina/", "/financeiro-oficina/", "/guias/como-escolher-sistema-para-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-04",
  },
  {
    ...financeiroLink,
    kind: "recurso",
    title: "Controle financeiro para oficina mecânica | Auttra",
    description:
      "Contas a pagar e receber, fluxo de caixa e 11 relatórios de gestão para oficina mecânica, com cobrança gerada pela O.S. e aviso de contas vencidas.",
    eyebrow: "Financeiro",
    h1: "Controle financeiro para oficina, ligado às ordens de serviço.",
    lead:
      "Na Auttra, a O.S. concluída já gera a cobrança em contas a receber. Contas a pagar e receber aceitam parcelas, desconto, multa e pagamento parcial, o fluxo de caixa mostra o que entrou, saiu e ainda vai entrar, e 11 relatórios mostram margem, produtividade e inadimplência.",
    image: {
      key: "financeiro",
      alt: "Relatório de fluxo de caixa da Auttra com entradas, saídas e recebimentos por forma de pagamento",
    },
    highlightsHeading: "O que o financeiro da Auttra faz",
    highlights: [
      { title: "Contas a pagar e receber", text: "Parcelas, desconto, multa e pagamento parcial." },
      { title: "Cobrança pela O.S.", text: "A O.S. concluída gera a cobrança em contas a receber." },
      { title: "Fluxo de caixa", text: "Recebido, pago, saldo e o que ainda vai entrar e sair, por semana e por forma de pagamento." },
      { title: "Avisos de vencimento", text: "A tela inicial soma as contas vencidas a receber e lembra o que vence amanhã a pagar." },
      { title: "Faturamento do mês", text: "Faturamento do mês com gráfico diário e os valores a receber e a pagar logo na tela inicial." },
      { title: "11 relatórios", text: "Margem por O.S., produtividade por mecânico, inadimplência, orçamentos perdidos, fluxo de caixa, faturamento e mais." },
    ],
    sections: [
      {
        heading: "Onde o dinheiro da oficina se perde",
        paragraphs: [
          "Serviço entregue e não cobrado, cliente que ficou de pagar e esqueceu, conta do fornecedor que vence sem ninguém ver. Em muita oficina, o problema não é falta de serviço, é falta de visão do caixa.",
        ],
      },
      {
        heading: "Como funciona na Auttra",
        ordered: true,
        items: [
          "A [ordem de serviço](/ordem-de-servico-oficina/) é concluída e a cobrança entra em contas a receber.",
          "O recebimento pode ser parcelado, com desconto, multa ou pagamento parcial.",
          "As contas a pagar ficam no mesmo lugar, com aviso do que vence no dia seguinte.",
          "O fluxo de caixa mostra recebido, pago, saldo e o previsto, por semana e por forma de pagamento.",
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
      {
        question: "Consigo ver o financeiro da oficina no celular?",
        answer:
          "Sim. A Auttra abre no navegador do celular com a mesma conta, e a tela inicial mostra o faturamento do mês, os valores a receber e a pagar e as pendências.",
      },
    ],
    related: ["/ordem-de-servico-oficina/", "/orcamento-oficina-whatsapp/", "/controle-de-estoque-oficina/"],
    published: "2026-11-04",
    updated: "2026-11-04",
  },
];

export const guidePages: ContentPage[] = [
  {
    ...escolherLink,
    kind: "guia",
    title: "Como escolher um sistema para oficina mecânica | Auttra",
    description:
      "Checklist para escolher um sistema para oficina mecânica: ordem de serviço, orçamento, estoque, financeiro, acesso da equipe, celular, implantação e contrato.",
    eyebrow: "Guia",
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
        items: [
          "**Clientes e veículos**: cadastro com o histórico de serviços de cada carro.",
          "**Orçamento**: enviado ao cliente, de preferência pelo WhatsApp, e convertido em ordem de serviço sem redigitar.",
          "**Ordem de serviço**: serviços, peças, mecânico responsável, valores e status.",
          "**Estoque**: entrada pela nota fiscal (XML) e alerta de estoque baixo.",
          "**Financeiro**: contas a pagar e a receber, com parcelas e pagamento parcial.",
          "**Relatórios**: faturamento, margem e inadimplência, no mínimo.",
          "**Agenda**: se a oficina trabalha com horário marcado.",
        ],
      },
      {
        heading: "Perguntas para fazer na demonstração",
        items: [
          "Funciona no navegador ou precisa instalar? Funciona no celular?",
          "Cada funcionário tem o próprio acesso? Dá para limitar o que o mecânico e a recepção veem?",
          "Como os dados que já tenho (clientes, veículos, peças) entram no sistema?",
          "Como é a implantação e o treinamento da equipe?",
          "Qual é o valor, o que está incluído e como funciona o cancelamento?",
          "Como é o suporte e por qual canal ele atende?",
          "O sistema emite nota fiscal de serviço ou se integra a um emissor? Isso importa para a sua oficina?",
          "Onde ficam os dados, como é feito o backup e como exporto tudo se quiser sair?",
        ],
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
          "O valor depende do tamanho da oficina e é apresentado na demonstração, junto com a implantação, o treinamento e as regras de contrato.",
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
    updated: "2026-11-04",
  },
  {
    ...fazerOsLink,
    kind: "guia",
    title: "Como fazer ordem de serviço de oficina mecânica | Auttra",
    description:
      "O que uma ordem de serviço de oficina mecânica precisa ter: dados do cliente e do veículo, serviços, peças, valores, prazos, garantia e a autorização do cliente.",
    eyebrow: "Guia",
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
        items: [
          "**Cliente**: nome, telefone ou WhatsApp e documento, se a oficina emite nota.",
          "**Veículo**: placa, marca, modelo, ano e quilometragem na entrada.",
          "**Relato do cliente**: o problema descrito com as palavras dele.",
          "**Diagnóstico**: o que o mecânico encontrou.",
          "**Serviços**: cada serviço com o valor da mão de obra.",
          "**Peças**: cada peça com quantidade e valor, e se é original, nova ou de outro tipo.",
          "**Prazos**: data de entrada e previsão de entrega.",
          "**Responsável**: o mecânico que vai executar o serviço.",
          "**Valores e pagamento**: total, desconto, forma e condições de pagamento.",
          "**Garantia**: o prazo e o que ela cobre.",
          "**Autorização**: a aprovação do cliente, por assinatura ou por mensagem registrada.",
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
    published: "2026-11-04",
    updated: "2026-11-04",
  },
];

export const guidesHub = {
  ...guidesHubLink,
  title: "Guias de gestão para oficina mecânica | Auttra",
  description:
    "Guias práticos para quem administra oficina mecânica: como escolher um sistema, como fazer ordem de serviço e o que a lei pede no orçamento e na garantia.",
  eyebrow: "Guias",
  h1: "Guias para quem administra oficina mecânica.",
  lead: "Conteúdo prático sobre a rotina da oficina: do orçamento à ordem de serviço, do estoque ao caixa.",
  updated: "2026-11-04",
};

export const contentPages = [...featurePages, ...guidePages];

export function findContentPage(path: string) {
  return contentPages.find((page) => page.path === path);
}

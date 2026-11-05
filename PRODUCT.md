# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Donos e equipes de oficinas mecânicas no Brasil, de todos os tamanhos: do mecânico que trabalha sozinho a oficinas com recepção e vários mecânicos. Quem decide a compra é o dono da oficina, normalmente alguém que também está no dia a dia do serviço e tem pouco tempo para burocracia. No sistema, o uso se divide em três funções: Proprietário (acompanha números e pendências), Recepção (abre orçamentos e ordens, atende o cliente) e Mecânico (executa o serviço).

Os visitantes do site chegam buscando "sistema para oficina mecânica" ou um problema específico (ordem de serviço, orçamento, estoque, financeiro), em geral pelo celular, e o próximo passo esperado é pedir uma demonstração, quase sempre pelo WhatsApp.

## Product Purpose

A Auttra é um sistema de gestão para oficina mecânica que reúne, num só lugar, o caminho do carro: orçamento, ordem de serviço, agenda, estoque, contas a pagar e receber e relatórios. Ela existe para que o prejuízo comum de oficina (carro esquecido no pátio, cliente devendo, orçamento sem resposta, peça que acaba no meio do serviço) apareça a tempo de ser resolvido. Sucesso para o cliente é abrir o sistema e saber o que precisa de atenção hoje; para o site, é o dono da oficina pedir uma demonstração.

## Positioning

A tela inicial que avisa o que precisa de atenção: O.S. parada há mais de 5 dias, contas vencidas a receber, orçamentos sem resposta há mais de 3 dias, estoque crítico (3 unidades ou menos) e contas a pagar no dia seguinte, cada aviso abrindo a lista certa para resolver. Somado a isso, a ligação direta entre as etapas: o orçamento sai em PDF pelo WhatsApp, o aprovado vira O.S. com um clique e a O.S. concluída gera a cobrança.

## Operating Context

- A oficina conversa com os clientes pelo WhatsApp; orçamentos e contato comercial passam por ele.
- O sistema roda no navegador, no computador da recepção e no celular do dono, com a mesma conta.
- Notas de fornecedores chegam em XML e alimentam o estoque.
- Contratação: demonstração guiada pela rotina da oficina, com valor definido pelo tamanho da oficina e apresentado na demonstração, junto com implantação, treinamento e regras de contrato.
- Clientes acessam a plataforma em https://app.auttra.com.br; o site comercial é https://auttra.com.br.

## Capabilities and Constraints

Confirmado:
- Clientes, veículos, serviços, fornecedores e agenda semanal (agenda, estoque e fornecedores podem ser ligados ou desligados).
- Orçamento em PDF enviado pelo WhatsApp; status em análise, aprovado ou recusado, com validade; aprovado vira O.S. com um clique.
- Ordem de serviço com serviços, peças, mecânico responsável, valores, status e pagamento, em PDF.
- Estoque com entrada pelo XML da nota, custo, preço de venda e alerta de estoque baixo.
- Contas a pagar e receber com parcelas, desconto, multa e pagamento parcial; O.S. concluída gera conta a receber; fluxo de caixa por semana e por forma de pagamento.
- 11 relatórios, entre eles margem por O.S., produtividade por mecânico, inadimplência, orçamentos perdidos, fluxo de caixa e faturamento.
- Perfis Proprietário, Recepção e Mecânico com permissões ajustáveis; verificação contra robôs no login.
- Funciona no navegador do computador e do celular, sem instalação.

Em aberto (não afirmar no site):
- Emissão de nota fiscal: em desenvolvimento. Não divulgar até existir.
- Preço público: não há; o valor é apresentado na demonstração.

Técnico (site): Vite + Preact com HTML pré-renderizado por rota, hospedado na Vercel; conteúdo das páginas de recursos e guias em `src/site/pages.ts`; leads vão para o WhatsApp comercial (48) 99126-8901.

## Brand Commitments

- Nome: Auttra. Logo em `src/assets/auttra-logo.svg` e símbolo em `public/favicon.svg`; a narrativa da marca parte da flecha do símbolo (direção para a gestão, clareza sobre o próximo passo).
- Voz: português do Brasil, direto e concreto, na linguagem da oficina ("carro parado no pátio", "peça que acabou no meio do serviço"); fala com "você" e evita jargão de software.
- Telas do produto mostradas no site são capturas reais (`src/assets/screens/`) com dados de exemplo da "Oficina Central", sempre identificadas como dados de exemplo.

## Evidence on Hand

- Capturas reais do sistema em `src/assets/screens/` (painel, atenção, ordens, orçamentos, agenda, estoque, financeiro, celular).
- Sem clientes, depoimentos, logos de clientes, números de uso ou avaliações publicáveis. Não inventar nenhum deles.

## Product Principles

1. Mostrar o que precisa de atenção antes de mostrar tudo: a prioridade é a próxima ação do dono da oficina, não o volume de funções.
2. Seguir o caminho real do carro, do orçamento ao recebimento, sem obrigar a oficina a mudar como trabalha.
3. Funcionar onde a oficina já está: no celular, no navegador e no WhatsApp.
4. Só prometer o que o sistema faz hoje; o que está em desenvolvimento fica fora até existir.
5. Servir de quem trabalha sozinho a oficinas com equipe, com cada função vendo só o que precisa.

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
} from "react";
import agendaScreen from "./assets/screens/agenda.webp";
import atencaoScreen from "./assets/screens/atencao.webp";
import estoqueScreen from "./assets/screens/estoque.webp";
import financeiroScreen from "./assets/screens/financeiro.webp";
import mobilePainelScreen from "./assets/screens/mobile-painel.webp";
import orcamentosScreen from "./assets/screens/orcamentos.webp";
import ordensScreen from "./assets/screens/ordens.webp";
import painelScreen from "./assets/screens/painel.webp";
import painelScreen1200 from "./assets/screens/painel-1200.webp";
import painelScreen1800 from "./assets/screens/painel-1800.webp";
import { DemoForm } from "./components/DemoForm";
import { DemoLink, Icon, SiteChrome, WhatsappLink, whatsappUrl, type IconName } from "./components/Shared";
import { homeFaqs as faqs } from "./site/home";

// Os mesmos avisos da tela inicial do sistema (painel.service no backend).
const attentionAlerts = [
  ["O.S. paradas há mais de 5 dias", "Mostra quantas são e há quanto tempo está parada a mais antiga, para nenhum carro ficar esquecido no pátio."],
  ["Contas vencidas a receber", "Soma o que os clientes ainda devem, para a cobrança acontecer antes de virar prejuízo."],
  ["Orçamentos sem resposta", "Separa o que está em análise há mais de 3 dias, na hora certa de ligar para o cliente."],
  ["Estoque crítico", "Avisa quando uma peça chega a 3 unidades ou menos, antes de faltar no meio do serviço."],
  ["Contas a pagar amanhã", "Lembra o que vence no dia seguinte, para o caixa não ser pego de surpresa."],
];

const features: { icon: IconName; title: string; text: string; href?: string; linkLabel?: string }[] = [
  {
    icon: "message",
    title: "Orçamento no WhatsApp do cliente",
    text: "Gere o orçamento em PDF e envie pelo WhatsApp sem sair da tela. Aprovado, ele vira ordem de serviço com um clique.",
    href: "/orcamento-oficina-whatsapp/",
    linkLabel: "Orçamento pelo WhatsApp",
  },
  {
    icon: "package",
    title: "Estoque pela nota fiscal",
    text: "Importe o XML da nota do fornecedor e as peças entram com custo e quantidade, sem digitar item por item.",
    href: "/controle-de-estoque-oficina/",
    linkLabel: "Controle de estoque",
  },
  {
    icon: "clipboard",
    title: "O.S. completa em PDF",
    text: "Serviços, peças, mecânico responsável e valores na mesma ordem, pronta para imprimir ou mandar para o cliente.",
    href: "/ordem-de-servico-oficina/",
    linkLabel: "Ordem de serviço",
  },
  {
    icon: "wallet",
    title: "Contas a pagar e receber",
    text: "Parcelas, desconto, multa e pagamento parcial. A O.S. concluída já gera a cobrança em contas a receber.",
    href: "/financeiro-oficina/",
    linkLabel: "Financeiro",
  },
  {
    icon: "chart",
    title: "11 relatórios de gestão",
    text: "Margem por O.S., produtividade por mecânico, inadimplência, orçamentos perdidos, fluxo de caixa, faturamento e mais.",
  },
  {
    icon: "users",
    title: "Cada função vê o que precisa",
    text: "Perfis de Proprietário, Recepção e Mecânico, com permissões ajustáveis e verificação contra robôs no login.",
  },
];

const moduleScreens = [
  {
    id: "ordens",
    label: "Ordens",
    eyebrow: "Operação",
    title: "Cada serviço com uma direção clara.",
    text: "Status, cliente, veículo, mecânico, valor e pagamento de cada O.S. na mesma lista, sem procurar em mensagens soltas.",
    image: ordensScreen,
    alt: "Lista de ordens de serviço da Auttra com cliente, veículo, mecânico, valor, status e pagamento",
  },
  {
    id: "agenda",
    label: "Agenda",
    eyebrow: "Capacidade",
    title: "A semana da oficina em uma tela.",
    text: "Agendamentos por dia, com serviço, cliente e veículo, para distribuir o trabalho antes de o carro chegar.",
    image: agendaScreen,
    alt: "Agenda semanal da Auttra com os serviços agendados de cada dia",
  },
  {
    id: "financeiro",
    label: "Financeiro",
    eyebrow: "Previsibilidade",
    title: "Entenda o caminho do seu caixa.",
    text: "Recebido, pago, saldo e o que ainda vai entrar e sair, com as entradas por semana e por forma de pagamento.",
    image: financeiroScreen,
    alt: "Relatório de fluxo de caixa da Auttra com entradas, saídas e recebimentos por forma de pagamento",
  },
  {
    id: "estoque",
    label: "Estoque",
    eyebrow: "Antecipação",
    title: "Veja o que falta antes de parar.",
    text: "Custo, preço de venda e quantidade de cada peça, com alerta de estoque baixo e entrada pelo XML da nota.",
    image: estoqueScreen,
    alt: "Tela de estoque da Auttra com peças, custo, venda e alertas de estoque baixo",
  },
  {
    id: "orcamentos",
    label: "Orçamentos",
    eyebrow: "Conversão",
    title: "Nenhum orçamento esquecido.",
    text: "Acompanhe o que está em análise, aprovado ou recusado e transforme o orçamento aprovado em O.S.",
    image: orcamentosScreen,
    alt: "Lista de orçamentos da Auttra com valores, validade e status",
  },
];

const comparisonColumns = [
  {
    tone: "before",
    label: "Como é hoje em muita oficina",
    title: "Você só descobre quando o cliente liga reclamando.",
    items: [
      "O carro fica parado dias e ninguém lembra de avisar o cliente",
      "O cliente deve e a cobrança só sai quando o caixa aperta",
      "O orçamento fica sem resposta e o serviço vai para outra oficina",
      "A peça acaba no meio do serviço e o carro espera",
    ],
  },
  {
    tone: "after",
    label: "Com a Auttra",
    title: "Você abre a tela inicial e já sabe o que resolver.",
    items: [
      "Aviso de O.S. parada há mais de 5 dias",
      "Total que os clientes devem, com as contas vencidas",
      "Orçamentos sem resposta, na hora certa de ligar",
      "Alerta de estoque baixo antes de faltar a peça",
    ],
  },
];

const demoSteps = [
  ["01", "Conte sobre a oficina", "Nome, WhatsApp e quantos mecânicos trabalham com você."],
  ["02", "A gente entende a rotina", "Como os carros entram, como o orçamento é aprovado e onde o controle aperta hoje."],
  ["03", "Você vê a Auttra funcionando", "A demonstração segue o caminho do carro na sua oficina, do orçamento ao recebimento."],
];

function revealDelay(index: number): CSSProperties {
  return { "--reveal-delay": `${index * 90}ms` } as CSSProperties;
}

// Efeitos de mouse: no máximo uma escrita por quadro, e só em quem tem mouse de verdade.
const pendingFrames = new WeakMap<HTMLElement, number>();

function onNextFrame(element: HTMLElement, write: () => void) {
  cancelAnimationFrame(pendingFrames.get(element) ?? 0);
  pendingFrames.set(element, requestAnimationFrame(write));
}

function hasFinePointer(event: PointerEvent<HTMLElement>) {
  return event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function tiltElement(event: PointerEvent<HTMLElement>) {
  if (!hasFinePointer(event)) return;
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  onNextFrame(element, () => {
    element.style.setProperty("--tilt-x", `${y * -4}deg`);
    element.style.setProperty("--tilt-y", `${x * 6}deg`);
  });
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  const element = event.currentTarget;
  onNextFrame(element, () => {
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
  });
}

// Move o brilho com transform (só composição, sem repintar a seção inteira).
function moveSpotlight(event: PointerEvent<HTMLElement>) {
  if (!hasFinePointer(event)) return;
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width * 0.7;
  const y = event.clientY - rect.top - rect.height * 0.2;
  onNextFrame(element, () => {
    element.style.setProperty("--spot-dx", `${x}px`);
    element.style.setProperty("--spot-dy", `${y}px`);
  });
}

function moveTabFocus(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  index: number,
  ids: string[],
  activate: (nextIndex: number) => void,
  prefix: string,
) {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key)) return;

  event.preventDefault();
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? ids.length - 1
      : (index + (event.key === "ArrowRight" ? 1 : -1) + ids.length) % ids.length;

  activate(nextIndex);
  requestAnimationFrame(() => document.getElementById(`${prefix}${ids[nextIndex]}`)?.focus());
}


function MobilePreview() {
  return (
    <div className="phone-shell">
      <div className="phone-frame">
        <div className="phone-speaker" aria-hidden="true" />
        <div className="mobile-screen">
          <img
            src={mobilePainelScreen}
            alt="Tela inicial da Auttra no celular com faturamento do mês, gráfico diário e valores a receber e a pagar"
            width={900}
            height={1948}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="mobile-float-card float-top"><Icon name="check" size={17} /><span><b>Atualização registrada</b><small>O histórico acompanha a rotina.</small></span></div>
      <div className="mobile-float-card float-bottom"><Icon name="phone" size={18} /><span><b>Auttra no celular</b><small>A mesma conta, onde você estiver.</small></span></div>
    </div>
  );
}

function App() {
  const [activeModule, setActiveModule] = useState("ordens");
  const [openFaq, setOpenFaq] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeCopy = moduleScreens.find((item) => item.id === activeModule) ?? moduleScreens[0];

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px" },
    );

    elements.forEach((element) => observer.observe(element));

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? window.scrollY / available : 0;
        progressRef.current?.style.setProperty("--page-progress", `${Math.min(1, progress)}`);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  // Carrega as telas das outras abas só quando a seção de produto se aproxima da tela,
  // para a troca de aba não piscar sem gastar dados de quem nem chega até ela.
  useEffect(() => {
    const section = document.getElementById("produto");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        moduleScreens.forEach(({ image }) => { new Image().src = image; });
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <SiteChrome onHome>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <main id="inicio" tabIndex={-1}>
        <section className="hero">
          <div className="hero-glow glow-one" aria-hidden="true" />
          <div className="hero-glow glow-two" aria-hidden="true" />
          <div className="hero-ribbon" aria-hidden="true"><i /><i /><i /></div>
          <div className="direction-trails" aria-hidden="true"><i /><i /><i /></div>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <h1>Sistema para oficina que avisa <span>o que precisa de atenção.</span></h1>
              <p>
                Carro parado, cliente devendo, peça acabando: a Auttra mostra na tela inicial antes de virar prejuízo. Com ordem de serviço, orçamento, agenda, estoque e financeiro num só lugar, no computador e no celular.
              </p>
              <div className="hero-actions">
                <DemoLink>Quero conhecer a Auttra <Icon name="arrow" size={18} /></DemoLink>
                {whatsappUrl
                  ? <WhatsappLink><Icon name="message" size={18} /> Chamar no WhatsApp</WhatsappLink>
                  : <a className="text-link" href="#produto">Ver a plataforma <span aria-hidden="true">↓</span></a>}
              </div>
              <div className="hero-notes">
                <span><Icon name="check" size={17} /> Orçamento em PDF direto no WhatsApp</span>
                <span><Icon name="check" size={17} /> Avisos do que precisa de atenção</span>
              </div>
            </div>
            <div className="hero-product" onPointerMove={tiltElement} onPointerLeave={resetTilt}>
              <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>app.auttra.com.br</span></div>
              <picture>
                <source media="(max-width: 620px)" srcSet={mobilePainelScreen} />
                <img
                  className="screen-shot hero-shot"
                  src={painelScreen1200}
                  srcSet={`${painelScreen1200} 1200w, ${painelScreen1800} 1800w, ${painelScreen} 2400w`}
                  sizes="(max-width: 860px) calc(100vw - 32px), min(1240px, calc(100vw - 48px))"
                  alt="Tela inicial da Auttra com faturamento do mês, recebimentos, contas a pagar, pendências que precisam de atenção e a agenda do dia"
                  width={2400}
                  height={1500}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </section>

        <section id="comparativo" className="comparison-section section">
          <div className="shell">
            <div className="comparison-heading" data-reveal="up">
              <span className="section-label">Por que mudar</span>
              <h2>Carro esquecido no pátio, cliente devendo, peça que acabou no meio do serviço.</h2>
              <p>Quase todo prejuízo de oficina começa em algo que ninguém viu a tempo. A Auttra põe isso na sua frente assim que você abre o sistema.</p>
            </div>
            <div className="comparison-grid">
              {comparisonColumns.map((column, columnIndex) => (
                <article className={`comparison-card ${column.tone}`} data-reveal="up" style={revealDelay(columnIndex)} key={column.tone}>
                  <span className="comparison-label">{column.label}</span>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => <li key={item}><Icon name={column.tone === "before" ? "close" : "check"} size={17} />{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="atencao" className="attention-section section">
          <div className="shell attention-layout">
            <div className="attention-copy" data-reveal="up">
              <span className="section-label">Como funciona</span>
              <h2>Abra o sistema e veja o que precisa de você hoje.</h2>
              <p>A tela inicial junta os sinais que a oficina já produz e mostra só o que pede ação. Cada aviso abre a lista certa para resolver.</p>
              <DemoLink>Ver funcionando <Icon name="arrow" size={18} /></DemoLink>
            </div>
            <figure className="attention-shot" data-reveal="scale">
              <img
                src={atencaoScreen}
                alt="Quadro Precisa de atenção da Auttra: O.S. paradas, conta vencida, orçamentos sem resposta, estoque crítico e conta a pagar amanhã"
                width={1090}
                height={530}
                loading="lazy"
                decoding="async"
              />
              <figcaption>Tela inicial da Auttra, com dados de exemplo.</figcaption>
            </figure>
          </div>
          <ol className="shell attention-list">
            {attentionAlerts.map(([title, text], index) => (
              <li data-reveal="up" style={revealDelay(index)} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="produto" className="product-section section" onPointerMove={moveSpotlight}>
          <div className="shell">
            <div className="product-heading" data-reveal="up">
              <div>
                <span className="section-label light">O produto em ação</span>
                <h2>As telas que a sua equipe usa todo dia.</h2>
              </div>
              <p>Telas reais da plataforma. Só os dados são de exemplo.</p>
            </div>

            <div className="module-tabs" role="tablist" aria-label="Módulos da plataforma" data-reveal="up">
              {moduleScreens.map((item) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeModule === item.id}
                  aria-controls={`module-panel-${item.id}`}
                  id={`module-tab-${item.id}`}
                  tabIndex={activeModule === item.id ? 0 : -1}
                  className={activeModule === item.id ? "active" : ""}
                  onClick={() => setActiveModule(item.id)}
                  onKeyDown={(event) => moveTabFocus(
                    event,
                    moduleScreens.findIndex((module) => module.id === item.id),
                    moduleScreens.map((module) => module.id),
                    (nextIndex) => setActiveModule(moduleScreens[nextIndex].id),
                    "module-tab-",
                  )}
                  key={item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div
              className="product-stage"
              id={`module-panel-${activeModule}`}
              role="tabpanel"
              aria-labelledby={`module-tab-${activeModule}`}
              data-reveal="scale"
            >
              <div className="product-stage-copy" key={activeCopy.id}>
                <span>{activeCopy.eyebrow}</span>
                <h3>{activeCopy.title}</h3>
                <p>{activeCopy.text}</p>
                <DemoLink className="inline-demo">Ver em uma demonstração <Icon name="arrow" size={17} /></DemoLink>
              </div>
              <div className="product-window" key={`${activeModule}-window`}>
                <div className="window-top" aria-hidden="true"><i /><i /><i /><small>Dados de exemplo</small></div>
                <img
                  className="screen-shot"
                  src={activeCopy.image}
                  alt={activeCopy.alt}
                  width={1800}
                  height={1125}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="recursos" className="features-section section shell">
          <div className="features-heading" data-reveal="up">
            <span className="section-label">Recursos</span>
            <h2>O que a Auttra já faz pela sua oficina.</h2>
          </div>
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li data-reveal="up" style={revealDelay(index % 2)} key={feature.title}>
                <span><Icon name={feature.icon} size={20} /></span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  {feature.href && <a className="feature-more" href={feature.href}>Saiba mais<span className="visually-hidden">: {feature.linkLabel}</span> <Icon name="arrow" size={15} /></a>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="mobile" className="mobile-section section">
          <div className="shell mobile-layout">
            <div className="mobile-copy" data-reveal="up">
              <span className="section-label">No celular</span>
              <h2>A oficina também acompanha você no celular.</h2>
              <p>Consulte o que precisa de atenção, a agenda e as ordens de serviço de onde estiver, ao longo do dia.</p>
              <ul>
                <li><Icon name="check" size={18} /><span><b>Sem instalar nada</b> Abre no navegador do celular, com a mesma conta.</span></li>
                <li><Icon name="check" size={18} /><span><b>Visão rápida</b> Faturamento, contas e pendências logo na primeira tela.</span></li>
                <li><Icon name="check" size={18} /><span><b>Mesmos dados</b> O que a recepção lança no computador aparece na hora.</span></li>
              </ul>
              <DemoLink>Ver no celular na demonstração <Icon name="arrow" size={18} /></DemoLink>
              <small>Tela real da Auttra no navegador do celular, com dados de exemplo.</small>
            </div>
            <div className="mobile-visual" data-reveal="scale"><MobilePreview /></div>
          </div>
        </section>

        <section className="decision-section section shell">
          <div className="decision-heading" data-reveal="up">
            <span className="section-label">Como começar</span>
            <h2>Uma demonstração com a cara da sua oficina.</h2>
            <p>Em vez de uma apresentação genérica, a conversa segue a rotina da sua oficina e termina com valores e próximos passos claros.</p>
          </div>
          <div className="decision-layout">
            <div className="demo-steps" data-reveal="up">
              {demoSteps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
            <aside className="offer-card" data-reveal="scale">
              <span>O que você vê na demonstração</span>
              <h3>Uma conversa guiada pela sua rotina.</h3>
              <ul>
                <li><Icon name="check" size={17} /> O caminho do carro: orçamento, O.S. e recebimento</li>
                <li><Icon name="check" size={17} /> Os avisos de atenção com a sua realidade</li>
                <li><Icon name="check" size={17} /> Os relatórios que fazem sentido para o seu tamanho</li>
                <li><Icon name="check" size={17} /> Como a equipe acessa: proprietário, recepção e mecânico</li>
                <li><Icon name="check" size={17} /> Valores, implantação e regras de contrato</li>
              </ul>
              <DemoLink className="button button-primary">Solicitar demonstração <Icon name="arrow" size={17} /></DemoLink>
              <small>Sem compromisso de contratação.</small>
            </aside>
          </div>
        </section>

        <section id="duvidas" className="section faq-section shell">
          <div className="faq-heading" data-reveal="up">
            <span className="section-label">Dúvidas frequentes</span>
            <h2>O que as oficinas perguntam antes de começar.</h2>
            <p>Ficou alguma dúvida? Fale com o time e veja a Auttra com a rotina da sua oficina.</p>
          </div>
          <div className="faq-list" data-reveal="up">
            {faqs.map((faq, index) => (
              <article className={openFaq === index ? "open" : ""} key={faq.question}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <b aria-hidden="true">{openFaq === index ? "−" : "+"}</b>
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`}><p>{faq.answer}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="demonstracao" className="final-cta lead-section shell" data-reveal="scale">
          <div className="cta-orbit orbit-one" />
          <div className="cta-orbit orbit-two" />
          <div className="lead-copy">
            <span><Icon name="spark" size={16} /> Demonstração</span>
            <h2>Sua oficina já está em movimento. Coloque a gestão na direção certa.</h2>
            <p>Conte um pouco sobre a oficina. Ao enviar, o WhatsApp abre com tudo preenchido para combinar a demonstração.</p>
            <ul>
              <li><Icon name="check" size={17} /> Demonstração com a rotina da sua oficina</li>
              <li><Icon name="check" size={17} /> Sem compromisso de contratação</li>
              <li><Icon name="check" size={17} /> Retorno pelo WhatsApp</li>
            </ul>
            <WhatsappLink className="lead-whatsapp"><Icon name="message" size={17} /> Prefere conversar agora? Chamar no WhatsApp</WhatsappLink>
          </div>
          <DemoForm />
        </section>
      </main>
    </SiteChrome>
  );
}

export default App;

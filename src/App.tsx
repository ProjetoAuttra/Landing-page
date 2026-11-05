import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import agendaScreen from "./assets/screens/agenda.webp";
import estoqueScreen from "./assets/screens/estoque.webp";
import financeiroScreen from "./assets/screens/financeiro.webp";
import mobilePainelScreen from "./assets/screens/mobile-painel.webp";
import orcamentosScreen from "./assets/screens/orcamentos.webp";
import ordensScreen from "./assets/screens/ordens.webp";
import { AlertPanel } from "./components/AlertPanel";
import { DemoForm } from "./components/DemoForm";
import { HeroOffer, PricingSection, useLaunchOffer } from "./components/Pricing";
import { DemoLink, Icon, SiteChrome, WhatsappLink, trackEvent, whatsappAboutHref, whatsappHref, type IconName } from "./components/Shared";
import { homeFaqs as faqs, pricingAnswer, pricingQuestion } from "./site/home";

// Cada dor da oficina ao lado do aviso da tela inicial que a pega (mesma ordem do quadro "Precisa de atenção").
const attentionPairs = [
  {
    pain: "O carro fica parado dias e ninguém lembra de avisar o cliente.",
    alert: "O.S. paradas há mais de 5 dias",
    rule: "Mostra quantas são e há quanto tempo está parada a mais antiga.",
  },
  {
    pain: "O cliente deve e a cobrança só sai quando o caixa aperta.",
    alert: "Contas vencidas a receber",
    rule: "Soma o que os clientes ainda devem, para cobrar antes de virar prejuízo.",
  },
  {
    pain: "O orçamento fica sem resposta e o serviço vai para outra oficina.",
    alert: "Orçamentos sem resposta",
    rule: "Separa o que está em análise há mais de 3 dias, na hora certa de ligar.",
  },
  {
    pain: "A peça acaba no meio do serviço e o carro espera.",
    alert: "Estoque crítico",
    rule: "Avisa quando uma peça chega a 3 unidades ou menos.",
  },
  {
    pain: "A conta do fornecedor vence sem ninguém ver.",
    alert: "Contas a pagar amanhã",
    rule: "Lembra o que vence no dia seguinte, para o caixa não ser pego de surpresa.",
  },
];

const features: { icon: IconName; title: string; text: string; whatsappTopic?: string }[] = [
  {
    icon: "message",
    title: "Orçamento no WhatsApp do cliente",
    text: "Gere o orçamento em PDF e envie pelo WhatsApp sem sair da tela. Aprovado, ele vira ordem de serviço com um clique.",
    whatsappTopic: "o orçamento pelo WhatsApp",
  },
  {
    icon: "package",
    title: "Estoque pelo XML da nota",
    text: "Importe o XML da nota do fornecedor e as peças entram com custo e quantidade, sem digitar item por item.",
    whatsappTopic: "o controle de estoque",
  },
  {
    icon: "clipboard",
    title: "O.S. completa em PDF",
    text: "Serviços, peças, mecânico responsável e valores na mesma ordem, pronta para imprimir ou mandar para o cliente.",
    whatsappTopic: "a ordem de serviço",
  },
  {
    icon: "wallet",
    title: "Contas a pagar e receber",
    text: "Parcelas, desconto, multa e pagamento parcial. A O.S. concluída já gera a cobrança em contas a receber.",
    whatsappTopic: "as contas a pagar e receber",
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

// O tour segue o caminho do carro na oficina: do agendamento ao recebimento.
const moduleScreens = [
  {
    id: "agenda",
    label: "Agenda",
    title: "A semana da oficina em uma tela.",
    text: "Agendamentos por dia, com serviço, cliente e veículo, para distribuir o trabalho antes de o carro chegar.",
    image: agendaScreen,
    alt: "Agenda semanal da Auttra com os serviços agendados de cada dia",
  },
  {
    id: "orcamentos",
    label: "Orçamentos",
    title: "Nenhum orçamento esquecido.",
    text: "Acompanhe o que está em análise, aprovado ou recusado e transforme o orçamento aprovado em O.S.",
    image: orcamentosScreen,
    alt: "Lista de orçamentos da Auttra com valores, validade e status",
  },
  {
    id: "ordens",
    label: "Ordens",
    title: "Cada carro com status, mecânico e valor.",
    text: "Status, cliente, veículo, mecânico, valor e pagamento de cada O.S. na mesma lista, sem procurar em mensagens soltas.",
    image: ordensScreen,
    alt: "Lista de ordens de serviço da Auttra com cliente, veículo, mecânico, valor, status e pagamento",
  },
  {
    id: "estoque",
    label: "Estoque",
    title: "Veja o que falta antes de parar.",
    text: "Custo, preço de venda e quantidade de cada peça, com alerta de estoque baixo e entrada pelo XML da nota.",
    image: estoqueScreen,
    alt: "Tela de estoque da Auttra com peças, custo, venda e alertas de estoque baixo",
  },
  {
    id: "financeiro",
    label: "Financeiro",
    title: "O que entrou, o que saiu e o que vai entrar.",
    text: "Recebido, pago, saldo e o previsto, com as entradas por semana e por forma de pagamento.",
    image: financeiroScreen,
    alt: "Relatório de fluxo de caixa da Auttra com entradas, saídas e recebimentos por forma de pagamento",
  },
];

function revealDelay(index: number): CSSProperties {
  return { "--reveal-delay": `${index * 90}ms` } as CSSProperties;
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

// O destaque do quadro percorre os avisos, um de cada vez (parado para quem pede menos movimento).
function useAlertCycle(count: number) {
  const [row, setRow] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setRow((value) => (value + 1) % count);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [count]);

  return { row };
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
      <div className="mobile-float-card float-top"><Icon name="check" size={17} /><span><b>Precisa de atenção</b><small>2 O.S. paradas há mais de 5 dias</small></span></div>
      <div className="mobile-float-card float-bottom"><Icon name="phone" size={18} /><span><b>Auttra no celular</b><small>A mesma conta, onde você estiver.</small></span></div>
    </div>
  );
}

function App() {
  const [activeModule, setActiveModule] = useState(moduleScreens[0].id);
  const [openFaq, setOpenFaq] = useState(-1);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeCopy = moduleScreens.find((item) => item.id === activeModule) ?? moduleScreens[0];
  const activeIndex = moduleScreens.indexOf(activeCopy);
  const alertCycle = useAlertCycle(attentionPairs.length);
  const activePair = attentionPairs[alertCycle.row];
  const offerActive = useLaunchOffer();

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
          <div className="direction-trails" aria-hidden="true"><i /><i /><i /></div>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <h1>Sistema para oficina que mostra <span>o próximo passo.</span></h1>
              <p>
                Abriu a Auttra, ela já aponta: O.S. parada há mais de 5 dias, cliente com conta vencida, orçamento sem resposta, peça acabando. Cada aviso abre a lista certa para resolver, com ordem de serviço, orçamento, agenda, estoque e financeiro num só lugar.
              </p>
              <div className="hero-actions">
                <DemoLink>Solicitar demonstração <Icon name="arrow" size={18} /></DemoLink>
                <WhatsappLink><Icon name="message" size={18} /> Chamar no WhatsApp</WhatsappLink>
              </div>
              {offerActive && <HeroOffer />}
            </div>
            <div className="hero-alert">
              <AlertPanel row={alertCycle.row} label="Hoje, comece por aqui" />
              <p className="hero-alert-caption" aria-hidden="true" key={alertCycle.row}>
                <b>{activePair.alert}</b> {activePair.rule}
              </p>
            </div>
          </div>
        </section>

        <section id="atencao" className="pairs-section section">
          <div className="shell">
            <div className="pairs-heading" data-reveal="up">
              <h2>Sem aviso, o problema só aparece quando já virou prejuízo.</h2>
              <p>Carro esquecido no pátio, cliente devendo, peça que acabou no meio do serviço. A tela inicial da Auttra mostra cada um desses sinais a tempo, e cada aviso abre a lista certa para resolver.</p>
            </div>
            <div className="pairs-table" data-reveal="up">
              <div className="pairs-head" aria-hidden="true">
                <span>Como é hoje em muita oficina</span>
                <span>O aviso da Auttra</span>
              </div>
              <ul>
                {attentionPairs.map((pair, index) => (
                  <li key={pair.alert} className={alertCycle.row === index ? "is-active" : ""}>
                    <p className="pair-pain"><Icon name="close" size={16} /><span><span className="visually-hidden">Hoje: </span>{pair.pain}</span></p>
                    <span className="pair-arrow" aria-hidden="true" />
                    <p className="pair-alert">
                      <strong><span className="visually-hidden">Aviso da Auttra: </span>{pair.alert}</strong>
                      <span>{pair.rule}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pairs-action" data-reveal="up">
              <DemoLink>Solicitar demonstração <Icon name="arrow" size={18} /></DemoLink>
            </div>
          </div>
        </section>

        <section id="produto" className="product-section section">
          <div className="shell">
            <div className="product-heading" data-reveal="up">
              <h2>Do orçamento ao recebimento, cada etapa aponta a próxima.</h2>
              <p>O caminho do carro, tela por tela. Telas reais da plataforma, só os dados são de exemplo.</p>
            </div>

            <div className="module-tabs" role="tablist" aria-label="Etapas na plataforma" data-reveal="up">
              {moduleScreens.map((item, index) => (
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
                    index,
                    moduleScreens.map((module) => module.id),
                    (nextIndex) => setActiveModule(moduleScreens[nextIndex].id),
                    "module-tab-",
                  )}
                  key={item.id}
                >
                  <small aria-hidden="true">{index + 1}</small>{item.label}
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
                <p className="product-step">Etapa {activeIndex + 1} de {moduleScreens.length}</p>
                <h3>{activeCopy.title}</h3>
                <p>{activeCopy.text}</p>
                {activeIndex < moduleScreens.length - 1 && (
                  <button type="button" className="inline-next" onClick={() => setActiveModule(moduleScreens[activeIndex + 1].id)}>
                    Próxima etapa: {moduleScreens[activeIndex + 1].label} <Icon name="arrow" size={17} />
                  </button>
                )}
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
            <h2>O que a Auttra já faz pela sua oficina.</h2>
          </div>
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li data-reveal="up" style={revealDelay(index % 2)} key={feature.title}>
                <span><Icon name={feature.icon} size={20} /></span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  {feature.whatsappTopic && (
                    <a
                      className="feature-more"
                      href={whatsappAboutHref(feature.whatsappTopic)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { placement: "feature", feature: feature.title })}
                    >
                      <Icon name="message" size={15} /> Perguntar no WhatsApp<span className="visually-hidden"> sobre {feature.whatsappTopic}</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="mobile" className="mobile-section section">
          <div className="shell mobile-layout">
            <div className="mobile-copy" data-reveal="up">
              <h2>Longe da oficina, sem perder o rumo dela.</h2>
              <p>Consulte o que precisa de atenção, a agenda e as ordens de serviço de onde estiver, ao longo do dia.</p>
              <ul>
                <li><Icon name="check" size={18} /><span><b>Sem instalar nada</b> Abre no navegador do celular, com a mesma conta.</span></li>
                <li><Icon name="check" size={18} /><span><b>Visão rápida</b> Faturamento, contas e pendências logo na primeira tela.</span></li>
                <li><Icon name="check" size={18} /><span><b>Mesmos dados</b> O que a recepção lança no computador aparece na hora.</span></li>
              </ul>
              <DemoLink>Solicitar demonstração <Icon name="arrow" size={18} /></DemoLink>
              <small>Tela real da Auttra no navegador do celular, com dados de exemplo.</small>
            </div>
            <div className="mobile-visual" data-reveal="scale"><MobilePreview /></div>
          </div>
        </section>

        <PricingSection offerActive={offerActive} />

        <section id="duvidas" className="section faq-section shell">
          <div className="faq-heading" data-reveal="up">
            <h2>O que as oficinas perguntam antes de começar.</h2>
            <p>
              Ficou alguma dúvida?{" "}
              <a href={whatsappHref()} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click", { placement: "faq" })}>Pergunte no WhatsApp</a>
              {" "}e veja a Auttra com a rotina da sua oficina.
            </p>
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
                <div className="faq-answer" id={`faq-answer-${index}`}><p>{faq.question === pricingQuestion ? pricingAnswer(offerActive) : faq.answer}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="demonstracao" className="final-cta lead-section shell" data-reveal="scale">
          <div className="lead-copy">
            <h2>Veja o caminho da sua oficina dentro da Auttra.</h2>
            <p>Conte um pouco sobre a oficina. Ao enviar, o WhatsApp abre com tudo preenchido para combinar a demonstração.</p>
            <ul>
              <li><Icon name="check" size={17} /> O caminho do carro: orçamento, O.S. e recebimento</li>
              <li><Icon name="check" size={17} /> Os avisos de atenção com a realidade da sua oficina</li>
              <li><Icon name="check" size={17} /> Implantação, treinamento e regras de contrato na conversa</li>
              <li><Icon name="check" size={17} /> Sem compromisso de contratação</li>
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

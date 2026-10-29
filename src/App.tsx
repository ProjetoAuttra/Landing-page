import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import logo from "./assets/auttra-logo.svg";

const demoUrl =
  import.meta.env.VITE_DEMO_URL?.trim() ||
  "mailto:contato@auttra.com.br?subject=Quero%20conhecer%20a%20Auttra";
const appUrl = import.meta.env.VITE_APP_URL?.trim() || "https://app.auttra.com.br";

type IconName =
  | "arrow"
  | "calendar"
  | "chart"
  | "check"
  | "clipboard"
  | "close"
  | "menu"
  | "package"
  | "shield"
  | "spark"
  | "users"
  | "wallet"
  | "wrench";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="m5 12 14 0m-5-5 5 5-5 5" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18m-14 4h3m4 0h3m-10 3h3" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />
        <path d="m4 7 5-3 5 5 6-6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5M9 10h6m-6 4h6m-6 4h4" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    package: (
      <>
        <path d="m4 7 8-4 8 4v10l-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4M12 11v10" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4.5 6v5.5c0 4.8 3 8 7.5 9.5 4.5-1.5 7.5-4.7 7.5-9.5V6Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    spark: <path d="m12 2 1.6 5.3L19 9l-5.4 1.7L12 16l-1.6-5.3L5 9l5.4-1.7Zm7 13 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" />,
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-2.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V20M15 5.2a3 3 0 0 1 0 5.6m2 2.3a4.5 4.5 0 0 1 3.5 4.4V20" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 6.5h14a2 2 0 0 1 2 2V19H4a2 2 0 0 1-2-2V6.5a3 3 0 0 1 3-3h11" />
        <path d="M15 12h5v4h-5a2 2 0 0 1 0-4Z" />
      </>
    ),
    wrench: <path d="M14.5 6.5a4.5 4.5 0 0 0-6 5.8L3 17.8 6.2 21l5.5-5.5a4.5 4.5 0 0 0 5.8-6L15 12l-3-3Z" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const navigation = [
  ["Como funciona", "#direcao"],
  ["Produto", "#produto"],
  ["Dúvidas", "#duvidas"],
];

const directionSteps = [
  {
    id: "enxergar",
    number: "01",
    label: "Enxergue",
    kicker: "Leitura da operação",
    title: "Veja a oficina inteira sem procurar informação.",
    text: "Ordens, agenda, recebimentos e estoque deixam de ser pontos soltos e formam uma visão única do negócio.",
    items: ["Faturamento e recebimentos", "Ordens que pedem atenção", "Agenda e capacidade do dia"],
  },
  {
    id: "priorizar",
    number: "02",
    label: "Priorize",
    kicker: "Próximo passo",
    title: "Saiba o que precisa acontecer agora.",
    text: "A Auttra destaca atrasos, vencimentos e pendências para transformar informação em uma fila clara de ação.",
    items: ["Retomar orçamentos sem resposta", "Agir sobre O.S. paradas", "Antecipar itens em nível crítico"],
  },
  {
    id: "avancar",
    number: "03",
    label: "Avance",
    kicker: "Decisão com contexto",
    title: "Mova a operação com mais segurança.",
    text: "Cada ação preserva o histórico e alimenta relatórios para a próxima decisão nascer com mais contexto.",
    items: ["Acompanhar resultado e caixa", "Comparar produtividade e rentabilidade", "Alinhar responsabilidades da equipe"],
  },
];

const faqs = [
  {
    question: "A Auttra funciona direto no navegador?",
    answer:
      "Sim. A plataforma é acessada pela web, sem a necessidade de instalar um programa no computador da oficina.",
  },
  {
    question: "Quais áreas da oficina posso organizar?",
    answer:
      "Clientes, veículos, agenda, ordens de serviço, orçamentos, serviços, estoque, fornecedores, contas a pagar e receber e relatórios de gestão.",
  },
  {
    question: "Posso controlar o acesso da equipe?",
    answer:
      "Sim. A Auttra trabalha com perfis de acesso, para que cada função consulte e altere somente os módulos necessários à sua rotina.",
  },
  {
    question: "Como conheço a plataforma por dentro?",
    answer:
      "Solicite uma demonstração. O contato comercial serve para entender sua operação e apresentar os fluxos mais relevantes para ela.",
  },
];

const moduleScreens = [
  {
    id: "painel",
    label: "Painel",
    eyebrow: "Ponto de partida",
    title: "Comece o dia sabendo para onde olhar.",
    text: "Um resumo de faturamento, recebimentos, agenda e pontos que precisam de atenção agora.",
  },
  {
    id: "ordens",
    label: "Ordens",
    eyebrow: "Operação",
    title: "Cada serviço com uma direção clara.",
    text: "Consulte status, cliente, veículo, responsável e valor sem procurar em mensagens soltas.",
  },
  {
    id: "financeiro",
    label: "Financeiro",
    eyebrow: "Previsibilidade",
    title: "Entenda o caminho do seu caixa.",
    text: "Contas, recebimentos e vencimentos ficam perto do atendimento que deu origem a eles.",
  },
  {
    id: "estoque",
    label: "Estoque",
    eyebrow: "Antecipação",
    title: "Veja o que falta antes de parar.",
    text: "Itens e fornecedores organizados para apoiar compras e execução dos serviços.",
  },
];

const marqueeItems = ["Atendimento", "Ordens", "Financeiro", "Agenda", "Estoque", "Relatórios"];

function revealDelay(index: number): CSSProperties {
  return { "--reveal-delay": `${index * 90}ms` } as CSSProperties;
}

function tiltElement(event: PointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.setProperty("--tilt-x", `${y * -4}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${x * 6}deg`);
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

function moveSpotlight(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
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

function DemoLink({ children, className = "button button-primary" }: { children: ReactNode; className?: string }) {
  const registerIntent = () => {
    const trackingWindow = window as Window & { dataLayer?: Array<Record<string, string>> };
    trackingWindow.dataLayer?.push({ event: "demo_click", source: "landing_page" });
  };

  return (
    <a href={demoUrl} className={className} onClick={registerIntent}>
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("menu-open", open);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="header-inner shell">
        <a href="#inicio" className="brand" aria-label="Auttra — início" onClick={() => setOpen(false)}>
          <img src={logo} alt="Auttra" />
        </a>

        <nav id="primary-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-login" href={appUrl} target="_blank" rel="noreferrer">
            Acessar plataforma
          </a>
          <DemoLink className="button button-primary nav-cta">Quero conhecer</DemoLink>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={23} />
        </button>
      </div>
    </header>
  );
}

function DashboardPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "dashboard compact" : "dashboard"}>
      <aside className="dashboard-sidebar">
        <div className="mini-mark" aria-hidden="true">A</div>
        {[
          ["Painel", "chart"],
          ["Agenda", "calendar"],
          ["Ordens", "clipboard"],
          ["Financeiro", "wallet"],
          ["Estoque", "package"],
        ].map(([label, icon], index) => (
          <div className={index === 0 ? "side-item active" : "side-item"} key={label}>
            <Icon name={icon as IconName} size={17} />
            <span>{label}</span>
          </div>
        ))}
      </aside>

      <div className="dashboard-main">
        <div className="dash-topline">
          <div>
            <span className="demo-label">Dados ilustrativos</span>
            <h3>Boa tarde, Marina</h3>
            <p>quarta-feira, 28 de outubro · Oficina Central</p>
          </div>
          <button type="button" tabIndex={-1}>+ Novo</button>
        </div>

        <div className="dash-content">
          <div className="revenue-panel">
            <div className="metric-heading">
              <span>Faturamento do mês</span>
              <strong>R$ 42.680</strong>
            </div>
            <div className="chart-bars" aria-hidden="true">
              {[36, 54, 42, 67, 58, 83, 70, 92, 78, 96, 84, 100].map((height, index) => (
                <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="chart-days"><span>01</span><span>07</span><span>14</span><span>21</span><span>28</span></div>
          </div>

          <div className="money-stack">
            <div>
              <span>A receber hoje</span>
              <strong>R$ 3.240</strong>
              <small>2 cobranças pendentes</small>
            </div>
            <div>
              <span>A pagar na semana</span>
              <strong>R$ 1.890</strong>
              <small>3 contas programadas</small>
            </div>
          </div>
        </div>

        <div className="attention-panel">
          <span className="panel-title">Precisa de atenção</span>
          {[
            ["3 O.S. paradas há mais de 5 dias", "Ver ordens"],
            ["2 orçamentos aguardam resposta", "Retomar"],
            ["5 itens chegaram ao estoque crítico", "Conferir"],
          ].map(([title, action]) => (
            <div className="attention-row" key={title}>
              <span><i />{title}</span>
              <b>{action} <Icon name="arrow" size={15} /></b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModulePreview({ module }: { module: string }) {
  if (module === "ordens") {
    return (
      <div className="module-table">
        <div className="module-toolbar"><strong>Ordens de serviço</strong><button type="button" tabIndex={-1}>Nova O.S.</button></div>
        <div className="table-head"><span>O.S.</span><span>Cliente / veículo</span><span>Status</span><span>Valor</span></div>
        {[
          ["#0184", "Carlos · Civic Touring", "Em execução", "R$ 1.840"],
          ["#0183", "Patrícia · Renegade", "Aguardando aprovação", "R$ 920"],
          ["#0182", "Rafael · Corolla", "Em diagnóstico", "—"],
          ["#0181", "Juliana · HB20", "Pronta", "R$ 680"],
        ].map((row) => <div className="table-row" key={row[0]}>{row.map((cell, i) => <span className={i === 2 ? "status-pill" : ""} key={cell}>{cell}</span>)}</div>)}
      </div>
    );
  }

  if (module === "financeiro") {
    return (
      <div className="finance-preview">
        <div className="finance-card"><span>Saldo previsto</span><strong>R$ 28.450</strong><small>Próximos 30 dias</small></div>
        <div className="finance-card"><span>A receber</span><strong>R$ 17.280</strong><small>12 lançamentos</small></div>
        <div className="finance-card"><span>A pagar</span><strong>R$ 8.630</strong><small>9 lançamentos</small></div>
        <div className="cash-flow">
          <span>Fluxo de caixa</span>
          <svg viewBox="0 0 560 170" role="img" aria-label="Gráfico ilustrativo de fluxo de caixa">
            <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d4ed8" stopOpacity=".28"/><stop offset="1" stopColor="#1d4ed8" stopOpacity="0"/></linearGradient></defs>
            <path d="M0 138C48 130 62 85 110 97s67 4 104-22 69 20 108 4 52-60 98-46 70 15 140-22V170H0Z" fill="url(#area)"/>
            <path d="M0 138C48 130 62 85 110 97s67 4 104-22 69 20 108 4 52-60 98-46 70 15 140-22" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    );
  }

  if (module === "estoque") {
    return (
      <div className="stock-preview">
        <div className="module-toolbar"><strong>Estoque</strong><button type="button" tabIndex={-1}>Adicionar item</button></div>
        <div className="stock-stats"><div><span>Itens cadastrados</span><strong>286</strong></div><div><span>Estoque crítico</span><strong>5</strong></div><div><span>Fornecedores</span><strong>18</strong></div></div>
        {[
          ["Filtro de óleo 0W20", "2 un.", "Crítico"],
          ["Pastilha de freio dianteira", "6 un.", "Regular"],
          ["Óleo sintético 5W30", "24 un.", "Disponível"],
        ].map(([name, count, status]) => <div className="stock-row" key={name}><span><i />{name}</span><b>{count}</b><em>{status}</em></div>)}
      </div>
    );
  }

  return <DashboardPreview compact />;
}

function App() {
  const [activeModule, setActiveModule] = useState("painel");
  const [activeDirection, setActiveDirection] = useState(0);
  const [directionPaused, setDirectionPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeCopy = moduleScreens.find((item) => item.id === activeModule) ?? moduleScreens[0];
  const activeStep = directionSteps[activeDirection];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

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
      media.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (directionPaused || reduceMotion) return;
    const interval = window.setInterval(
      () => setActiveDirection((current) => (current + 1) % directionSteps.length),
      5200,
    );
    return () => window.clearInterval(interval);
  }, [activeDirection, directionPaused, reduceMotion]);

  return (
    <>
      <a className="skip-link" href="#inicio">Pular para o conteúdo</a>
      <Header />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <main id="inicio" tabIndex={-1}>
        <section className="hero">
          <div className="hero-glow glow-one" aria-hidden="true" />
          <div className="hero-glow glow-two" aria-hidden="true" />
          <div className="hero-ribbon" aria-hidden="true"><i /><i /><i /></div>
          <div className="direction-trails" aria-hidden="true"><i /><i /><i /></div>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Icon name="spark" size={16} /> A direção certa para a sua oficina</div>
              <h1>Direção para a gestão. <span>Ritmo para a oficina.</span></h1>
              <p>
                A Auttra conecta a rotina inteira para mostrar onde sua operação está, o que pede atenção e qual é o próximo passo.
              </p>
              <div className="hero-actions">
                <DemoLink>Quero conhecer a Auttra <Icon name="arrow" size={18} /></DemoLink>
                <a className="text-link" href="#produto">Ver a plataforma <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-notes">
                <span><Icon name="check" size={17} /> Próximo passo mais claro</span>
                <span><Icon name="check" size={17} /> Todos os setores alinhados</span>
              </div>
            </div>
            <div
              className="hero-product"
              aria-label="Demonstração visual do painel Auttra"
              onPointerMove={tiltElement}
              onPointerLeave={resetTilt}
            >
              <div className="browser-bar"><i /><i /><i /><span>app.auttra.com.br</span></div>
              <DashboardPreview />
            </div>
          </div>
        </section>

        <section className="connected-strip" aria-label="Áreas conectadas pela Auttra">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-group" aria-hidden={group === 1} key={group}>
                <strong>Uma direção. Todos os setores alinhados.</strong>
                {marqueeItems.map((item) => <b key={`${group}-${item}`}><span>→</span>{item}</b>)}
              </div>
            ))}
          </div>
        </section>

        <section className="trust-foundation shell" aria-labelledby="trust-title" data-reveal="up">
          <div className="trust-intro">
            <span className="section-label">Base para operar com confiança</span>
            <h2 id="trust-title">A rotina centralizada, com acesso do jeito certo.</h2>
          </div>
          <div className="trust-points">
            <article>
              <span><Icon name="spark" size={19} /></span>
              <div><h3>Acesso pelo navegador</h3><p>Entre na plataforma sem instalar programas no computador da oficina.</p></div>
            </article>
            <article>
              <span><Icon name="shield" size={19} /></span>
              <div><h3>Perfis de acesso</h3><p>Organize o que cada função pode consultar e alterar na rotina.</p></div>
            </article>
            <article>
              <span><Icon name="chart" size={19} /></span>
              <div><h3>Visão conectada</h3><p>Acompanhe operação e gestão sem espalhar a informação por várias ferramentas.</p></div>
            </article>
          </div>
        </section>

        <section id="direcao" className="direction-system section" onPointerMove={moveSpotlight}>
          <div className="shell">
            <div className="direction-heading" data-reveal="up">
              <span className="section-label">O sistema de direção da Auttra</span>
              <h2>Menos telas para consultar. Mais clareza para agir.</h2>
              <p>Sua oficina já produz os sinais. A Auttra conecta cada um deles e transforma rotina em direção.</p>
            </div>

            <div
              className="direction-experience"
              data-paused={directionPaused}
              data-reveal="scale"
              onMouseEnter={() => setDirectionPaused(true)}
              onMouseLeave={() => setDirectionPaused(false)}
              onFocusCapture={() => setDirectionPaused(true)}
              onBlurCapture={() => setDirectionPaused(false)}
            >
              <div className="direction-tabs" role="tablist" aria-label="Como a Auttra orienta a gestão">
                {directionSteps.map((step, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeDirection === index}
                    aria-controls={`direction-panel-${step.id}`}
                    id={`direction-tab-${step.id}`}
                    tabIndex={activeDirection === index ? 0 : -1}
                    className={activeDirection === index ? "active" : ""}
                    onClick={() => setActiveDirection(index)}
                    onKeyDown={(event) => moveTabFocus(
                      event,
                      index,
                      directionSteps.map((item) => item.id),
                      setActiveDirection,
                      "direction-tab-",
                    )}
                    key={step.id}
                  >
                    <span>{step.number}</span>
                    <b>{step.label}</b>
                    <i aria-hidden="true" />
                  </button>
                ))}
              </div>

              <div
                className="direction-stage"
                id={`direction-panel-${activeStep.id}`}
                role="tabpanel"
                aria-labelledby={`direction-tab-${activeStep.id}`}
              >
                <div className="direction-copy" key={`${activeStep.id}-copy`}>
                  <span>{activeStep.kicker}</span>
                  <h3>{activeStep.title}</h3>
                  <p>{activeStep.text}</p>
                  <DemoLink className="inline-demo dark-link">Ver funcionando <Icon name="arrow" size={17} /></DemoLink>
                </div>

                <div className={`direction-visual step-${activeStep.id}`} key={activeStep.id}>
                  <div className="direction-visual-top">
                    <span>Auttra · Direção do dia</span>
                    <b>Dados ilustrativos</b>
                  </div>
                  <div className="signal-orbit" aria-hidden="true"><i /><i /><i /></div>
                  <div className="direction-core">
                    <div className="core-mark"><Icon name="arrow" size={21} /></div>
                    <span>{activeStep.label}</span>
                  </div>
                  <div className="direction-items">
                    {activeStep.items.map((item, index) => (
                      <div style={revealDelay(index)} key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{item}</p>
                        <Icon name="arrow" size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="produto" className="product-section section" onPointerMove={moveSpotlight}>
          <div className="shell">
            <div className="product-heading" data-reveal="up">
              <div>
                <span className="section-label light">O produto em ação</span>
                <h2>Informação que aponta o próximo passo.</h2>
              </div>
              <p>Explore alguns dos fluxos que já fazem parte da plataforma.</p>
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
                <div className="window-top"><i /><i /><i /><small>Dados ilustrativos</small></div>
                <ModulePreview module={activeModule} />
              </div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="section faq-section shell">
          <div className="faq-heading" data-reveal="up">
            <span className="section-label">Dúvidas frequentes</span>
            <h2>O que você precisa saber para seguir em frente.</h2>
            <p>Ainda ficou alguma dúvida? O time pode apresentar a plataforma considerando a rotina da sua oficina.</p>
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

        <section className="final-cta shell" data-reveal="scale">
          <div className="cta-orbit orbit-one" />
          <div className="cta-orbit orbit-two" />
          <div className="cta-content">
            <span><Icon name="spark" size={16} /> Próximo passo</span>
            <h2>Sua oficina já está em movimento. Coloque a gestão na direção certa.</h2>
            <p>Conheça a Auttra por dentro e veja como dar mais clareza ao próximo passo da sua operação.</p>
            <div>
              <DemoLink className="button button-light">Quero uma demonstração <Icon name="arrow" size={18} /></DemoLink>
              <a className="button button-ghost-light" href={appUrl} target="_blank" rel="noreferrer">Já sou cliente</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-main">
          <div><img src={logo} alt="Auttra" /><p>Direção para a gestão da sua oficina.</p></div>
          <nav aria-label="Navegação do rodapé">
            {navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="footer-action"><DemoLink className="footer-demo">Solicitar demonstração <Icon name="arrow" size={16} /></DemoLink></div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Auttra. Todos os direitos reservados.</span>
          <a href={appUrl} target="_blank" rel="noreferrer">app.auttra.com.br</a>
        </div>
      </footer>
    </>
  );
}

export default App;

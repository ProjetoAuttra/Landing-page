import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import logo from "./assets/auttra-logo.svg";
import agendaScreen from "./assets/screens/agenda.webp";
import atencaoScreen from "./assets/screens/atencao.webp";
import estoqueScreen from "./assets/screens/estoque.webp";
import financeiroScreen from "./assets/screens/financeiro.webp";
import mobilePainelScreen from "./assets/screens/mobile-painel.webp";
import orcamentosScreen from "./assets/screens/orcamentos.webp";
import ordensScreen from "./assets/screens/ordens.webp";
import painelScreen from "./assets/screens/painel.webp";

const appUrl = import.meta.env.VITE_APP_URL?.trim() || "https://app.auttra.com.br";
const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim() || "";
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";
const whatsappUrl =
  import.meta.env.VITE_WHATSAPP_URL?.trim() ||
  `https://wa.me/5548991268901?text=${encodeURIComponent("Olá! Vim pelo site e quero conhecer a Auttra.")}`;
const schedulingUrl = import.meta.env.VITE_SCHEDULING_URL?.trim() || "";

type IconName =
  | "arrow"
  | "calendar"
  | "chart"
  | "check"
  | "clipboard"
  | "close"
  | "menu"
  | "message"
  | "package"
  | "phone"
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
    message: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M8.4 8.4c.5 2.6 2.6 4.7 5.2 5.2" />
      </>
    ),
    package: (
      <>
        <path d="m4 7 8-4 8 4v10l-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4M12 11v10" />
      </>
    ),
    phone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M10 5h4M11 18h2" />
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
  ["Por que mudar", "#comparativo"],
  ["Como funciona", "#atencao"],
  ["Produto", "#produto"],
  ["Recursos", "#recursos"],
  ["Dúvidas", "#duvidas"],
];

// Os mesmos avisos da tela inicial do sistema (painel.service no backend).
const attentionAlerts = [
  ["O.S. paradas há mais de 5 dias", "Mostra quantas são e há quanto tempo está parada a mais antiga, para nenhum carro ficar esquecido no pátio."],
  ["Contas vencidas a receber", "Soma o que os clientes ainda devem, para a cobrança acontecer antes de virar prejuízo."],
  ["Orçamentos sem resposta", "Separa o que está em análise há mais de 3 dias, na hora certa de ligar para o cliente."],
  ["Estoque crítico", "Avisa quando uma peça chega a 3 unidades ou menos, antes de faltar no meio do serviço."],
  ["Contas a pagar amanhã", "Lembra o que vence no dia seguinte, para o caixa não ser pego de surpresa."],
];

const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "message",
    title: "Orçamento no WhatsApp do cliente",
    text: "Gere o orçamento em PDF e envie pelo WhatsApp sem sair da tela. Aprovado, ele vira ordem de serviço com um clique.",
  },
  {
    icon: "package",
    title: "Estoque pela nota fiscal",
    text: "Importe o XML da nota do fornecedor e as peças entram com custo e quantidade, sem digitar item por item.",
  },
  {
    icon: "clipboard",
    title: "O.S. completa em PDF",
    text: "Serviços, peças, mecânico responsável e valores na mesma ordem, pronta para imprimir ou mandar para o cliente.",
  },
  {
    icon: "wallet",
    title: "Contas a pagar e receber",
    text: "Parcelas, desconto, multa e pagamento parcial. A O.S. concluída já gera a cobrança em contas a receber.",
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

const faqs = [
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
    question: "Quanto custa e como funciona a contratação?",
    answer:
      "O valor depende do tamanho da oficina e é apresentado na demonstração, junto com a implantação, o treinamento da equipe e as regras de contrato e cancelamento.",
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
    label: "Quando a informação fica espalhada",
    title: "A equipe trabalha, mas a gestão precisa reconstruir o contexto.",
    items: ["Consultar mensagens e controles separados", "Descobrir atrasos depois que viram urgência", "Tomar decisões com uma visão parcial da operação"],
  },
  {
    tone: "after",
    label: "Com a rotina conectada",
    title: "A operação mostra onde está e o que precisa acontecer agora.",
    items: ["Acompanhar ordens, agenda, estoque e financeiro", "Visualizar pendências que pedem atenção", "Preservar histórico para decidir com mais contexto"],
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

type TrackingWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function trackEvent(name: string, params: Record<string, string> = {}) {
  (window as TrackingWindow).gtag?.("event", name, { source: "landing_page", ...params });
}

function DemoLink({ children, className = "button button-primary" }: { children: ReactNode; className?: string }) {
  return (
    <a href="#demonstracao" className={className} onClick={() => trackEvent("demo_click")}>
      {children}
    </a>
  );
}

function WhatsappLink({ children, className = "button button-whatsapp" }: { children: ReactNode; className?: string }) {
  if (!whatsappUrl) return null;
  return (
    <a href={whatsappUrl} className={className} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click")}>
      {children}
    </a>
  );
}

function enableAnalytics() {
  const trackingWindow = window as TrackingWindow;
  if (!gaMeasurementId || trackingWindow.gtag) return;

  trackingWindow.dataLayer = trackingWindow.dataLayer || [];
  // O gtag.js só reconhece o objeto `arguments`; arrays empurrados no dataLayer são ignorados.
  trackingWindow.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    trackingWindow.dataLayer!.push(arguments);
  };
  trackingWindow.gtag("js", new Date());
  trackingWindow.gtag("config", gaMeasurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
  document.head.appendChild(script);
}

const consentKey = "auttra-cookie-consent";

function readConsent() {
  try {
    return window.localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (!saved) setVisible(true);
    if (saved === "accepted") enableAnalytics();

    const openSettings = () => setVisible(true);
    window.addEventListener("auttra:cookie-settings", openSettings);
    return () => window.removeEventListener("auttra:cookie-settings", openSettings);
  }, []);

  const choose = (choice: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(consentKey, choice);
    } catch {
      // Sem armazenamento a escolha vale só para esta visita.
    }
    if (choice === "accepted") enableAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies">
      <div>
        <strong>Privacidade sob seu controle</strong>
        <p>
          Usamos armazenamento essencial para lembrar suas escolhas. Métricas de acesso só são ativadas com sua autorização. Leia a nossa <a href="/privacidade/">Política de Privacidade</a>.
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-secondary" onClick={() => choose("rejected")}>Somente essenciais</button>
        <button type="button" className="cookie-primary" onClick={() => choose("accepted")}>Aceitar métricas</button>
      </div>
    </aside>
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Origem da campanha, para saber de onde veio cada lead.
function campaignParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]
      .map((key) => [key, params.get(key) || ""])
      .filter(([, value]) => value),
  );
}

function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      nome: String(data.get("nome") || ""),
      whatsapp: String(data.get("whatsapp") || ""),
      oficina: String(data.get("oficina") || ""),
      mecanicos: String(data.get("mecanicos") || ""),
      email: String(data.get("email") || ""),
      origem: "landing_page",
      ...campaignParams(),
    };

    try {
      if (formEndpoint) {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Não foi possível enviar sua solicitação agora.");
      } else {
        // Sem endpoint, o lead chega pelo WhatsApp comercial com os dados já escritos.
        const lines = [
          "Olá! Quero conhecer a Auttra.",
          "",
          `Nome: ${payload.nome}`,
          `Oficina: ${payload.oficina}`,
          `Mecânicos: ${payload.mecanicos}`,
          `WhatsApp: ${payload.whatsapp}`,
        ];
        if (payload.email) lines.push(`E-mail: ${payload.email}`);
        const campaign = [payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(" / ");
        if (campaign) lines.push(`Origem: ${campaign}`);

        const url = `${whatsappUrl.split("?")[0]}?text=${encodeURIComponent(lines.join("\n"))}`;
        // Abre antes de qualquer await para o navegador não bloquear a nova aba.
        const opened = window.open(url, "_blank");
        if (!opened) {
          trackEvent("demo_form_success", { mecanicos: payload.mecanicos, channel: "whatsapp" });
          window.location.href = url;
          return;
        }
        opened.opener = null;
      }

      trackEvent("demo_form_success", { mecanicos: payload.mecanicos, channel: formEndpoint ? "endpoint" : "whatsapp" });
      window.location.assign(formEndpoint ? "/obrigado/" : "/obrigado/?via=whatsapp");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente ou fale por e-mail.");
    }
  };

  return (
    <form className="demo-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Seu nome</span><input name="nome" autoComplete="name" required placeholder="Como podemos chamar você?" /></label>
        <label>
          <span>WhatsApp</span>
          <input
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={14}
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
          />
        </label>
        <label><span>Nome da oficina</span><input name="oficina" autoComplete="organization" required placeholder="Sua oficina" /></label>
        <label>
          <span>Quantos mecânicos?</span>
          <select name="mecanicos" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Só eu</option>
            <option>2 a 3</option>
            <option>4 a 6</option>
            <option>7 ou mais</option>
          </select>
        </label>
        <label className="form-wide"><span>E-mail <small>opcional</small></span><input name="email" type="email" autoComplete="email" placeholder="voce@oficina.com.br" /></label>
      </div>
      <label className="form-consent">
        <input type="checkbox" required />
        <span>Concordo em ser contatado sobre a Auttra e li a <a href="/privacidade/">Política de Privacidade</a>.</span>
      </label>
      <label className="form-honeypot" aria-hidden="true">Site<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {status === "error" && <p className="form-error" role="alert">{errorMessage} <a href="mailto:contato@auttra.com.br">contato@auttra.com.br</a></p>}
      <button className="button button-light form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? <><span className="spinner" /> Enviando...</>
          : formEndpoint
            ? <>Solicitar demonstração <Icon name="arrow" size={18} /></>
            : <><Icon name="message" size={18} /> Enviar pelo WhatsApp</>}
      </button>
      {schedulingUrl && <a className="form-schedule" href={schedulingUrl} target="_blank" rel="noreferrer">Prefere escolher um horário agora? <Icon name="calendar" size={15} /></a>}
      <small className="form-assurance">
        <Icon name="shield" size={15} />
        {formEndpoint
          ? "Seus dados serão usados apenas para responder a esta solicitação."
          : "O WhatsApp abre com sua mensagem pronta. É só tocar em enviar."}
      </small>
    </form>
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

  // Carrega as telas das outras abas depois da página, para a troca de aba não piscar.
  useEffect(() => {
    const preload = () => moduleScreens.forEach(({ image }) => { new Image().src = image; });
    if (document.readyState === "complete") preload();
    else window.addEventListener("load", preload, { once: true });
    return () => window.removeEventListener("load", preload);
  }, []);

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
              <div className="eyebrow"><Icon name="spark" size={16} /> Sistema para oficina mecânica</div>
              <h1>O sistema que mostra <span>o próximo passo.</span></h1>
              <p>
                Ordem de serviço, orçamento, agenda, estoque e financeiro da oficina num só lugar, no computador e no celular, sem instalar nada.
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
                  src={painelScreen}
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
              <span className="section-label">O problema que a Auttra organiza</span>
              <h2>Da informação espalhada para uma rotina sob controle.</h2>
              <p>Não é apenas trocar papel por tela. É deixar de reconstruir a operação toda vez que uma decisão precisa ser tomada.</p>
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

      <footer>
        <div className="shell footer-main">
          <div><img src={logo} alt="Auttra" /><p>Sistema de gestão para oficina mecânica.</p><a className="footer-email" href="mailto:contato@auttra.com.br">contato@auttra.com.br</a></div>
          <nav aria-label="Navegação do rodapé">
            {navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <div className="footer-action"><DemoLink className="footer-demo">Solicitar demonstração <Icon name="arrow" size={16} /></DemoLink></div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Auttra. Todos os direitos reservados.</span>
          <nav aria-label="Links legais">
            <a href="/privacidade/">Privacidade</a>
            <a href="/termos/">Termos de uso</a>
            <button type="button" onClick={() => window.dispatchEvent(new Event("auttra:cookie-settings"))}>Cookies</button>
          </nav>
        </div>
      </footer>
      {whatsappUrl && (
        <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Auttra pelo WhatsApp" onClick={() => trackEvent("whatsapp_click", { placement: "float" })}>
          <Icon name="message" size={24} /><span>Falar no WhatsApp</span>
        </a>
      )}
      <CookieConsent />
    </>
  );
}

export default App;

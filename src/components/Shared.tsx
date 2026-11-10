import { createContext } from "preact";
import { useContext, useEffect, useState, type ReactNode } from "react";
import logo from "../assets/auttra-logo.svg";
import { APP_URL_DEFAULT, CONTACT_EMAIL, TRIAL_DAYS } from "../site/config";
import { featureLinks, guideLinks, guidesHubLink } from "../site/links";

export const appUrl = import.meta.env.VITE_APP_URL?.trim() || APP_URL_DEFAULT;
// Cadastro do teste grátis no app. Sem VITE_SIGNUP_URL, os botões de teste levam à plataforma.
export const signupUrl = import.meta.env.VITE_SIGNUP_URL?.trim() || appUrl;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

type PageContextValue = {
  /** Página inicial: os links de seção são âncoras, para não recarregar nem perder os parâmetros de campanha. */
  onHome: boolean;
  /** Nome da página de conteúdo. */
  topic?: string;
  /** Seção do menu em que a página está. */
  current?: "recursos" | "guias";
  /** A página tem perguntas frequentes próprias (#duvidas). */
  hasFaq?: boolean;
};

const PageContext = createContext<PageContextValue>({ onHome: true });

export function useSectionHref() {
  const { onHome } = useContext(PageContext);
  return (hash: string) => (onHome ? hash : `/${hash}`);
}

export type IconName =
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
  | "wallet";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
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
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path d="M8 10.5h8M8 14h5" />
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

// Converte a marcação dos textos de conteúdo: [texto](/caminho/) e **negrito**.
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(match[1] ? <a href={match[2]} key={match.index}>{match[1]}</a> : <strong key={match.index}>{match[3]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export const navigation = [
  ["Como funciona", "#atencao"],
  ["Recursos", "#recursos"],
  ["Preço", "#preco"],
  ["Dúvidas", "#duvidas"],
];

type TrackingWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function trackEvent(name: string, params: Record<string, string> = {}) {
  (window as TrackingWindow).gtag?.("event", name, { source: "landing_page", page: window.location.pathname, ...params });
}

const UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const CHAVE_UTM = "auttra:utm";

/**
 * UTMs da visita: os da URL de chegada valem e ficam guardados na aba, para continuarem valendo se a pessoa
 * navegar por outras páginas do site antes de clicar em "Testar grátis".
 */
function utmsDaVisita(): Record<string, string> {
  const atuais = new URLSearchParams(window.location.search);
  const daUrl = Object.fromEntries(UTMS.flatMap((k) => (atuais.get(k)?.trim() ? [[k, atuais.get(k)!.trim()]] : [])));
  try {
    if (Object.keys(daUrl).length) sessionStorage.setItem(CHAVE_UTM, JSON.stringify(daUrl));
    return JSON.parse(sessionStorage.getItem(CHAVE_UTM) ?? "{}");
  } catch {
    return daUrl;
  }
}

/** Endereço do cadastro com os UTMs da visita: o app guarda de qual campanha veio cada cadastro. */
export function linkCadastro(base: string, utms: Record<string, string>) {
  try {
    const url = new URL(base);
    for (const [k, v] of Object.entries(utms)) url.searchParams.set(k, v);
    return url.toString();
  } catch {
    return base;
  }
}

// Ação principal do site: começar o teste grátis no cadastro do app, levando os UTMs da visita.
export function TrialLink({
  children,
  className = "button button-primary",
  placement,
}: {
  children: ReactNode;
  className?: string;
  placement: string;
}) {
  // A página sai pré-renderizada do build: os UTMs entram no link só no navegador, depois de carregar.
  const [href, setHref] = useState(signupUrl);
  useEffect(() => {
    setHref(linkCadastro(signupUrl, utmsDaVisita()));
  }, []);

  return (
    <a href={href} className={className} onClick={() => trackEvent("trial_click", { placement })}>
      {children}
    </a>
  );
}

/** Texto padrão dos botões de teste. */
export const trialLabel = `Testar ${TRIAL_DAYS} dias grátis`;

// Demonstração, para quem prefere ver antes de testar: leva ao formulário da própria página (#demonstracao).
export function DemoLink({ children, className, placement }: { children: ReactNode; className?: string; placement?: string }) {
  return (
    <a href="#demonstracao" className={className} onClick={() => trackEvent("demo_click", placement ? { placement } : {})}>
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

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionHref = useSectionHref();
  const { onHome, current, hasFaq } = useContext(PageContext);
  // Fora da página inicial, o menu leva às seções do site, não às da página inicial.
  const items: [string, string, boolean][] = onHome
    ? navigation.map(([label, href]) => [label, href, false])
    : [
        ["Início", "/", false],
        ["Recursos", "/#recursos", current === "recursos"],
        ["Guias", guidesHubLink.path, current === "guias"],
        ["Dúvidas", hasFaq ? "#duvidas" : "/#duvidas", false],
      ];

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
        <a href={onHome ? "#inicio" : "/"} className="brand" aria-label="Auttra — início" onClick={() => setOpen(false)}>
          <img src={logo} alt="Auttra" width={132} height={36} />
        </a>

        <nav id="primary-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
          {items.map(([label, href, active]) => (
            <a href={onHome ? sectionHref(href) : href} key={label} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-login" href={appUrl} target="_blank" rel="noreferrer">
            Acessar plataforma
          </a>
          <TrialLink className="button button-primary nav-cta" placement="header">Testar grátis</TrialLink>
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

function Footer() {
  const sectionHref = useSectionHref();
  return (
    <footer>
      <div className="shell footer-main">
        <div><img src={logo} alt="Auttra" /><p className="footer-tagline">Você dirige a oficina. A Auttra mostra o caminho.</p><p>Sistema de gestão para oficina mecânica.</p><a className="footer-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
        <nav aria-label="Navegação do rodapé">
          {navigation.map(([label, href]) => <a href={sectionHref(href)} key={href}>{label}</a>)}
        </nav>
        <div className="footer-action"><TrialLink className="footer-demo" placement="footer">{trialLabel} <Icon name="arrow" size={16} /></TrialLink></div>
      </div>
      <div className="shell footer-pages">
        <nav aria-label="Recursos do sistema">
          <strong>Recursos</strong>
          {featureLinks.map((page) => <a href={page.path} key={page.path}>{page.name}</a>)}
        </nav>
        <nav aria-label="Guias">
          <strong>Guias</strong>
          {guideLinks.map((page) => <a href={page.path} key={page.path}>{page.name}</a>)}
          <a href={guidesHubLink.path}>Todos os guias</a>
        </nav>
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
  );
}

// Moldura comum a todas as páginas: cabeçalho, rodapé e consentimento.
export function SiteChrome({ children, ...page }: PageContextValue & { children: ReactNode }) {
  return (
    <PageContext.Provider value={page}>
      <a className="skip-link" href="#inicio">Pular para o conteúdo</a>
      <Header />
      {children}
      <Footer />
      <CookieConsent />
    </PageContext.Provider>
  );
}

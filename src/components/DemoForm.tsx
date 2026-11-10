import { useEffect, useRef, useState, type FormEvent } from "react";
import { DEMO_EMAIL } from "../site/config";
import { Icon, trackEvent } from "./Shared";

// Pedido de demonstração chega por e-mail. Sem VITE_FORM_ENDPOINT, usa o FormSubmit, que manda os dados
// para DEMO_EMAIL (o primeiro envio pede uma confirmação única nessa caixa de entrada).
const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim() || `https://formsubmit.co/ajax/${DEMO_EMAIL}`;
const schedulingUrl = import.meta.env.VITE_SCHEDULING_URL?.trim() || "";

// Telefone do Brasil: DDD + 8 dígitos (fixo) ou 9 dígitos (celular). Um +55 colado na frente é descartado.
function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// E-mail: sem espaços e em minúsculas. O padrão exige usuário, domínio e terminação (.com, .com.br...).
const EMAIL_PATTERN = String.raw`[a-z0-9._%+\-]+@[a-z0-9\-]+(\.[a-z0-9\-]+)*\.[a-z]{2,}`;

function cleanEmail(value: string) {
  return value.replace(/\s/g, "").toLowerCase();
}

// Erros de digitação comuns nos provedores mais usados, para sugerir a correção.
const EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "yahoo.com", "icloud.com", "live.com", "bol.com.br", "uol.com.br"];
const EMAIL_TYPOS: Record<string, string> = {
  "gmail.con": "gmail.com", "gmail.co": "gmail.com", "gmail.cm": "gmail.com", "gmail.com.br": "gmail.com",
  "gmal.com": "gmail.com", "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com", "gnail.com": "gmail.com",
  "hotmail.con": "hotmail.com", "hotmail.co": "hotmail.com", "hotmal.com": "hotmail.com", "hotmial.com": "hotmail.com", "hotmil.com": "hotmail.com", "hotamil.com": "hotmail.com",
  "outlook.con": "outlook.com", "outlok.com": "outlook.com", "outllok.com": "outlook.com",
  "yahoo.con.br": "yahoo.com.br", "yaho.com.br": "yahoo.com.br", "yahoo.com.bt": "yahoo.com.br",
  "icloud.con": "icloud.com", "iclod.com": "icloud.com",
};

function emailSuggestion(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain || EMAIL_DOMAINS.includes(domain)) return "";
  const fixed = EMAIL_TYPOS[domain] ?? (domain.endsWith(".con") ? domain.replace(/\.con$/, ".com") : "");
  return fixed ? `${user}@${fixed}` : "";
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

/**
 * Formulário de pedido de demonstração. `source` é o nome da página de conteúdo onde ele está
 * (vai no e-mail para o time saber o que a pessoa estava lendo).
 */
export function DemoForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "sent">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState({ nome: "", email: "", telefone: "" });
  const sentTitle = useRef<HTMLHeadingElement>(null);

  // Confirmação no lugar do formulário: o foco vai para o título, para leitores de tela anunciarem o envio.
  useEffect(() => {
    if (status === "sent") sentTitle.current?.focus();
  }, [status]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      nome: String(data.get("nome") || ""),
      telefone: String(data.get("telefone") || ""),
      email: String(data.get("email") || ""),
      oficina: String(data.get("oficina") || ""),
      mecanicos: String(data.get("mecanicos") || ""),
      interesse: "demonstracao",
      origem: source ? `landing_page: ${source}` : "landing_page",
      ...campaignParams(),
      _subject: `Pedido de demonstração: ${String(data.get("oficina") || "")}`,
      _template: "table",
      _captcha: "false",
      // E-mail automático para quem pediu, confirmando que o pedido chegou.
      _autoresponse: `Olá, ${String(data.get("nome") || "").split(" ")[0]}! Recebemos seu pedido de demonstração da Auttra. Nosso time vai entrar em contato pelo telefone ${String(data.get("telefone") || "")} ou por este e-mail para combinar o melhor horário. Até já!`,
    };

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === "false" || result.success === false) {
        throw new Error("Não foi possível enviar seu pedido agora.");
      }

      trackEvent("demo_form_success", { mecanicos: payload.mecanicos });
      setSent({ nome: payload.nome.split(" ")[0], email: payload.email, telefone: payload.telefone });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente ou fale por e-mail.");
    }
  };

  if (status === "sent") {
    return (
      <div className="demo-form form-sent" role="status">
        <span className="form-sent-icon"><Icon name="check" size={28} /></span>
        <h3 ref={sentTitle} tabIndex={-1}>Pedido enviado{sent.nome ? `, ${sent.nome}` : ""}!</h3>
        <p>
          Recebemos seu pedido de demonstração. Nosso time vai entrar em contato pelo telefone <b>{sent.telefone}</b> ou pelo
          e-mail <b>{sent.email}</b> para combinar o melhor horário.
        </p>
        <p className="form-sent-note">Mandamos uma confirmação para o seu e-mail. Se não aparecer, confira a caixa de spam.</p>
      </div>
    );
  }

  return (
    <form className="demo-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Seu nome</span><input name="nome" autoComplete="name" required placeholder="Como podemos chamar você?" /></label>
        <label><span>Nome da oficina</span><input name="oficina" autoComplete="organization" required placeholder="Sua oficina" /></label>
        <label>
          <span>E-mail</span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellcheck={false}
            required
            maxLength={254}
            pattern={EMAIL_PATTERN}
            title="Informe um e-mail válido, ex.: voce@oficina.com.br"
            placeholder="voce@oficina.com.br"
            value={email}
            onInput={(event) => {
              const input = event.currentTarget;
              const cleaned = cleanEmail(input.value);
              input.value = cleaned;
              setEmail(cleaned);
              setSuggestion("");
            }}
            onBlur={() => setSuggestion(emailSuggestion(email))}
          />
          {suggestion && (
            <button type="button" className="form-hint" onClick={() => { setEmail(suggestion); setSuggestion(""); }}>
              Você quis dizer <b>{suggestion}</b>?
            </button>
          )}
        </label>
        <label>
          <span>Telefone</span>
          <input
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={14}
            pattern={String.raw`\(\d{2}\) (9\d{4}|[2-5]\d{3})-\d{4}`}
            title="Informe DDD e número, ex.: (11) 99999-9999"
            placeholder="(11) 99999-9999"
            value={phone}
            onInput={(event) => {
              // O Preact não redesenha o campo quando o valor formatado não muda, então os dígitos a mais
              // ficariam visíveis: o valor é corrigido direto no campo.
              const input = event.currentTarget;
              const formatted = formatPhone(input.value);
              input.value = formatted;
              setPhone(formatted);
            }}
          />
        </label>
        <label className="form-wide">
          <span>Quantos mecânicos?</span>
          <select name="mecanicos" required>
            <option value="" disabled selected>Selecione</option>
            <option>Só eu</option>
            <option>2 a 3</option>
            <option>4 a 6</option>
            <option>7 ou mais</option>
          </select>
        </label>
      </div>
      <label className="form-consent">
        <input type="checkbox" required />
        <span>Concordo em ser contatado sobre a Auttra e li a <a href="/privacidade/">Política de Privacidade</a>.</span>
      </label>
      <label className="form-honeypot" aria-hidden="true">Site<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {status === "error" && <p className="form-error" role="alert">{errorMessage} <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a></p>}
      <button className="button button-light form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? <><span className="spinner" /> Enviando...</>
          : <>Pedir demonstração <Icon name="arrow" size={18} /></>}
      </button>
      {schedulingUrl && <a className="form-schedule" href={schedulingUrl} target="_blank" rel="noreferrer">Prefere escolher um horário agora? <Icon name="calendar" size={15} /></a>}
      <small className="form-assurance">
        <Icon name="shield" size={15} />
        Seus dados serão usados apenas para combinar a demonstração.
      </small>
    </form>
  );
}

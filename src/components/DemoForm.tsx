import { useState, type FormEvent } from "react";
import { Icon, trackEvent, whatsappUrl } from "./Shared";

const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim() || "";
const schedulingUrl = import.meta.env.VITE_SCHEDULING_URL?.trim() || "";

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

/**
 * Formulário de demonstração. `source` é o nome da página de conteúdo onde ele está
 * (vai na mensagem para o time saber o que a pessoa estava lendo); `compact` tira o e-mail opcional.
 */
export function DemoForm({ source, compact = false }: { source?: string; compact?: boolean }) {
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
      origem: source ? `landing_page: ${source}` : "landing_page",
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
        if (source) lines.push(`Página: ${source}`);
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
            onChange={(event) => setPhone(formatPhone(event.currentTarget.value))}
          />
        </label>
        <label><span>Nome da oficina</span><input name="oficina" autoComplete="organization" required placeholder="Sua oficina" /></label>
        <label>
          <span>Quantos mecânicos?</span>
          <select name="mecanicos" required>
            <option value="" disabled selected>Selecione</option>
            <option>Só eu</option>
            <option>2 a 3</option>
            <option>4 a 6</option>
            <option>7 ou mais</option>
          </select>
        </label>
        {!compact && <label className="form-wide"><span>E-mail <small>opcional</small></span><input name="email" type="email" autoComplete="email" placeholder="voce@oficina.com.br" /></label>}
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

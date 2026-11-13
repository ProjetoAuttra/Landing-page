// Dados fixos da marca, usados nas páginas, nos dados estruturados e no build
// (sitemap e llms.txt). Sem imports de assets: o vite.config também lê este arquivo.

export const SITE_URL = "https://auttra.com.br";
export const SITE_NAME = "Auttra";
export const CONTACT_EMAIL = "auttrasistemas@gmail.com";
/** Caixa que recebe os pedidos de demonstração do formulário do site. */
export const DEMO_EMAIL = "auttrasistemas@gmail.com";
export const APP_URL_DEFAULT = "https://app.auttra.com.br";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

// Perfis oficiais da marca (Instagram, LinkedIn, YouTube...). Entram no `sameAs`
// do schema Organization e ajudam buscadores e IAs a ligar a Auttra a eles.
export const SOCIAL_PROFILES: string[] = ["https://www.instagram.com/auttrasistemas/"];

// Planos (R$ por mês, por oficina). Os dois têm as mesmas funções e usuários ilimitados;
// muda só o prazo do contrato. Para mudar um preço, mude aqui: a seção de preço, o FAQ,
// o schema e o llms.txt leem estes valores.
export const PLAN_SEMIANNUAL_PRICE = 42.9;
/** Prazo do contrato do plano semestral, em meses. */
export const PLAN_SEMIANNUAL_MONTHS = 6;
export const PLAN_MONTHLY_PRICE = 54.9;

/** Dias de teste grátis, com tudo liberado. Depois, sem assinatura, a conta fica só para consulta
 * (vê os dados, não cria nem altera nada). Nada é apagado; ao assinar, tudo volta na hora. */
export const TRIAL_DAYS = 7;

/** Quanto o semestral sai mais barato que o mensal ao longo do contrato (R$ 72,00). */
export const PLAN_SEMIANNUAL_SAVINGS =
  Math.round((PLAN_MONTHLY_PRICE - PLAN_SEMIANNUAL_PRICE) * PLAN_SEMIANNUAL_MONTHS * 100) / 100;

/** 54.9 vira "54,90". */
export function formatPrice(value: number) {
  return value.toFixed(2).replace(".", ",");
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

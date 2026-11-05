// Dados fixos da marca, usados nas páginas, nos dados estruturados e no build
// (sitemap e llms.txt). Sem imports de assets: o vite.config também lê este arquivo.

export const SITE_URL = "https://auttra.com.br";
export const SITE_NAME = "Auttra";
export const CONTACT_EMAIL = "contato@auttra.com.br";
export const CONTACT_PHONE = "+55-48-99126-8901";
export const CONTACT_PHONE_DISPLAY = "(48) 99126-8901";
export const APP_URL_DEFAULT = "https://app.auttra.com.br";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

// Perfis oficiais da marca (Instagram, LinkedIn, YouTube...). Entram no `sameAs`
// do schema Organization e ajudam buscadores e IAs a ligar a Auttra a eles.
export const SOCIAL_PROFILES: string[] = [];

// Preço do plano (R$ por mês, por oficina) e oferta de lançamento. Passado o último dia
// da oferta, a página esconde sozinha o preço riscado e o selo e mostra só o preço normal.
export const PRICE_REGULAR = 89.9;
export const PRICE_LAUNCH = 59.9;
/** Último dia para assinar com o preço de lançamento (vale até 23h59, horário de Brasília). */
export const LAUNCH_OFFER_LAST_DAY = "2026-12-31";
/** Por quantos meses o preço de lançamento fica garantido para quem assinou no prazo. */
export const LAUNCH_OFFER_MONTHS = 12;

const launchOfferEndsAt = Date.parse(`${LAUNCH_OFFER_LAST_DAY}T23:59:59.999-03:00`);

export function isLaunchOfferActive(now: number = Date.now()) {
  return now <= launchOfferEndsAt;
}

/** 31/12/2026 */
export const LAUNCH_OFFER_LAST_DAY_DISPLAY = LAUNCH_OFFER_LAST_DAY.split("-").reverse().join("/");

/** 89.9 vira "89,90". */
export function formatPrice(value: number) {
  return value.toFixed(2).replace(".", ",");
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

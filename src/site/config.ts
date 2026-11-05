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

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

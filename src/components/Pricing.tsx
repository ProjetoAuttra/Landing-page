import { useEffect, useState } from "react";
import {
  LAUNCH_OFFER_LAST_DAY_DISPLAY,
  LAUNCH_OFFER_MONTHS,
  PRICE_LAUNCH,
  PRICE_REGULAR,
  formatPrice,
  isLaunchOfferActive,
} from "../site/config";
import { DemoLink, Icon, trackEvent, whatsappMessageHref } from "./Shared";

// O que vem no plano. Cada item foi conferido no código da plataforma.
const included = [
  "Orçamentos e ordens de serviço",
  "Agenda da semana",
  "Estoque com importação do XML da nota",
  "Financeiro: contas a pagar e a receber",
  "11 relatórios de gestão",
  "Usuários ilimitados, com perfis de acesso",
  "Link para o cliente acompanhar o orçamento e a O.S.",
];

/**
 * A oferta começa com a data do build (igual ao HTML pré-renderizado) e, já no navegador,
 * passa a valer a data de hoje: depois do último dia, o preço riscado e o selo somem sozinhos.
 */
export function useLaunchOffer() {
  const [active, setActive] = useState(() => isLaunchOfferActive(__BUILD_TIME__));
  useEffect(() => setActive(isLaunchOfferActive()), []);
  return active;
}

export function HeroOffer() {
  return (
    <p className="hero-offer">
      <a href="#preco" onClick={() => trackEvent("offer_click", { placement: "hero" })}>
        <b>Oferta de lançamento:</b> R$&nbsp;{formatPrice(PRICE_LAUNCH)}/mês para quem assinar até{" "}
        <span>{LAUNCH_OFFER_LAST_DAY_DISPLAY}&nbsp;<Icon name="arrow" size={16} /></span>
      </a>
    </p>
  );
}

export function PricingSection({ offerActive }: { offerActive: boolean }) {
  const price = offerActive ? PRICE_LAUNCH : PRICE_REGULAR;
  const launchSavings = (PRICE_REGULAR - PRICE_LAUNCH) * LAUNCH_OFFER_MONTHS;
  const whatsappText = offerActive
    ? `Olá! Vim pelo site e quero assinar a Auttra com o preço de lançamento de R$ ${formatPrice(PRICE_LAUNCH)}/mês.`
    : "Olá! Vim pelo site e quero assinar a Auttra.";

  return (
    <section id="preco" className="pricing-section section">
      <div className="shell pricing-layout">
        <div className="pricing-copy" data-reveal="up">
          <h2>Um plano só, com tudo liberado.</h2>
          <p>
            Você, a recepção e os mecânicos entram no mesmo valor: não tem cobrança por usuário nem plano mais caro para liberar relatório ou estoque. Na demonstração, você vê tudo funcionando com a rotina da sua oficina antes de assinar.
          </p>
        </div>

        <div className="price-card" data-reveal="scale">
          <div className="price-main">
            {offerActive && <p className="price-flag">Oferta de lançamento até {LAUNCH_OFFER_LAST_DAY_DISPLAY}</p>}
            {offerActive && (
              <p className="price-was">De <s><span className="visually-hidden">preço normal, riscado: </span>R$&nbsp;{formatPrice(PRICE_REGULAR)}</s></p>
            )}
            <p className="price-now">
              {offerActive && <span className="price-by">Por</span>}
              <span className="price-currency">R$</span>
              <strong>{formatPrice(price)}</strong>
              <span className="price-period" aria-hidden="true">/mês</span>
              <span className="visually-hidden"> por mês</span>
            </p>
            <p className="price-unit">por oficina, com tudo incluso</p>
            {offerActive && (
              <p className="price-save">
                <Icon name="check" size={16} /> R$&nbsp;{formatPrice(launchSavings)} a menos em {LAUNCH_OFFER_MONTHS} meses
              </p>
            )}
            {offerActive && (
              <p className="price-note">
                Valor promocional para assinaturas feitas até {LAUNCH_OFFER_LAST_DAY_DISPLAY}, garantido por {LAUNCH_OFFER_MONTHS} meses. Depois, R$&nbsp;{formatPrice(PRICE_REGULAR)}/mês.
              </p>
            )}
            <div className="price-actions">
              <DemoLink className="button button-light">Solicitar demonstração <Icon name="arrow" size={18} /></DemoLink>
              <a
                className="price-whatsapp"
                href={whatsappMessageHref(whatsappText)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp_click", { placement: "pricing" })}
              >
                <Icon name="message" size={17} /> Quero assinar: chamar no WhatsApp
              </a>
            </div>
          </div>

          <div className="price-includes">
            <h3>O que está incluso</h3>
            <ul>
              {included.map((item) => (
                <li key={item}><Icon name="check" size={18} /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

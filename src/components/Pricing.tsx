import { useState } from "react";
import {
  PLAN_MONTHLY_PRICE,
  PLAN_SEMIANNUAL_MONTHS,
  PLAN_SEMIANNUAL_PRICE,
  PLAN_SEMIANNUAL_SAVINGS,
  TRIAL_DAYS,
  formatPrice,
} from "../site/config";
import { DemoLink, Icon, TrialLink, trackEvent, trialLabel } from "./Shared";

// O que vem nos dois planos. Cada item foi conferido no código da plataforma.
const included = [
  "Orçamentos e ordens de serviço",
  "Agenda da semana",
  "Estoque com importação do XML da nota",
  "Financeiro: contas a pagar e a receber",
  "11 relatórios de gestão",
  "Usuários ilimitados, com perfis de acesso",
  "Link para o cliente acompanhar o orçamento e a O.S.",
];

type PlanId = "semestral" | "mensal";

/** Desconto do semestral sobre o mensal, arredondado para baixo (nunca promete mais do que dá). */
const semiannualDiscount = Math.floor((1 - PLAN_SEMIANNUAL_PRICE / PLAN_MONTHLY_PRICE) * 100);

const plans: Record<PlanId, { name: string; price: number; terms: string }> = {
  semestral: {
    name: "Semestral",
    price: PLAN_SEMIANNUAL_PRICE,
    terms: `por oficina, contrato de ${PLAN_SEMIANNUAL_MONTHS} meses no cartão de crédito`,
  },
  mensal: {
    name: "Mensal",
    price: PLAN_MONTHLY_PRICE,
    terms: "por oficina, sem contrato",
  },
};

export function HeroPrice() {
  return (
    <p className="hero-offer">
      <a href="#preco" onClick={() => trackEvent("offer_click", { placement: "hero" })}>
        <b>Sem cartão de crédito.</b> Depois do teste, planos a partir de{" "}
        <span>R$&nbsp;{formatPrice(PLAN_SEMIANNUAL_PRICE)}/mês&nbsp;<Icon name="arrow" size={16} /></span>
      </a>
    </p>
  );
}

export function PricingSection() {
  const [planId, setPlanId] = useState<PlanId>("semestral");
  const plan = plans[planId];
  const isSemiannual = planId === "semestral";

  function choose(next: PlanId) {
    if (next === planId) return;
    setPlanId(next);
    trackEvent("plan_toggle", { plan: next });
  }

  return (
    <section id="preco" className="pricing-section section">
      <div className="shell">
        <div className="pricing-heading" data-reveal="up">
          <h2>Um preço por oficina, com tudo liberado.</h2>
          <p>Comece com {TRIAL_DAYS} dias grátis, com tudo liberado. Sem cobrança por usuário e sem plano mais caro para liberar relatório ou estoque. Você escolhe só o prazo.</p>
        </div>

        <div className="plan-toggle" role="group" aria-label="Prazo do plano" data-reveal="up">
          {(Object.keys(plans) as PlanId[]).map((id) => (
            <button key={id} type="button" aria-pressed={planId === id} onClick={() => choose(id)}>
              {plans[id].name}
              {id === "semestral" && <span className="plan-toggle-badge">-{semiannualDiscount}%</span>}
            </button>
          ))}
        </div>

        <div className="price-card" data-reveal="scale">
          <div className="price-main" aria-live="polite">
            <p className="price-plan">Plano {plan.name.toLowerCase()}</p>
            <p className="price-was">
              {isSemiannual && (
                <>
                  <s><span className="visually-hidden">no mensal, </span>R$&nbsp;{formatPrice(PLAN_MONTHLY_PRICE)}</s>
                  <span className="price-was-tag">{semiannualDiscount}% mais barato</span>
                </>
              )}
            </p>
            <p className="price-now">
              <span className="price-currency">R$</span>
              <strong>{formatPrice(plan.price)}</strong>
              <span className="price-period" aria-hidden="true">/mês</span>
              <span className="visually-hidden"> por mês</span>
            </p>
            <p className="price-unit">{plan.terms}</p>

            {isSemiannual ? (
              <p className="price-save">
                <Icon name="check" size={16} /> Você economiza R$&nbsp;{formatPrice(PLAN_SEMIANNUAL_SAVINGS)} em {PLAN_SEMIANNUAL_MONTHS} meses
              </p>
            ) : (
              <button type="button" className="price-switch" onClick={() => choose("semestral")}>
                No semestral, sai R$&nbsp;{formatPrice(PLAN_SEMIANNUAL_PRICE)}/mês <Icon name="arrow" size={15} />
              </button>
            )}

            <div className="price-actions">
              <TrialLink className="button button-light" placement="pricing">
                {trialLabel} <Icon name="arrow" size={17} />
              </TrialLink>
              <p className="price-trial-note">Sem cartão de crédito. Você só assina se quiser continuar.</p>
              <DemoLink className="price-demo" placement="pricing">Antes, quero ver uma demonstração</DemoLink>
            </div>
          </div>

          <div className="price-includes">
            <h3>Tudo incluso nos dois planos</h3>
            <ul>
              {included.map((item) => (
                <li key={item}><Icon name="check" size={18} /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="trial-steps" data-reveal="up">
          <h3>Como funciona o teste grátis</h3>
          <ol>
            <li>
              <b>{TRIAL_DAYS} dias com tudo liberado</b>
              <span>Use a Auttra na rotina da oficina, com todas as funções e usuários ilimitados. Sem cartão de crédito e sem pagar nada.</span>
            </li>
            <li>
              <b>Não assinou? Seus dados continuam lá</b>
              <span>Depois dos {TRIAL_DAYS} dias, você segue entrando e vendo tudo o que lançou, mas não cria nem altera nada.</span>
            </li>
            <li>
              <b>Assinou, volta na hora</b>
              <span>Nada é apagado. Ao assinar, tudo volta a funcionar no mesmo momento.</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

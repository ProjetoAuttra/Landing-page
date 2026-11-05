import agendaScreen from "../assets/screens/agenda.webp";
import estoqueScreen from "../assets/screens/estoque.webp";
import financeiroScreen from "../assets/screens/financeiro.webp";
import orcamentosScreen from "../assets/screens/orcamentos.webp";
import ordensScreen from "../assets/screens/ordens.webp";
import { DemoLink, Icon, RichText, WhatsappLink } from "../components/Shared";
import { contentPages, guidePages, guidesHub, type ContentPage as Page, type Faq, type ScreenKey } from "../site/pages";

const screens: Record<ScreenKey, string> = {
  agenda: agendaScreen,
  estoque: estoqueScreen,
  financeiro: financeiroScreen,
  orcamentos: orcamentosScreen,
  ordens: ordensScreen,
};

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${day} de ${months[month - 1]} de ${year}`;
}

function Breadcrumb({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Você está em">
      <ol>
        {items.map((item) => (
          <li key={item.name}>{item.path ? <a href={item.path}>{item.name}</a> : <span aria-current="page">{item.name}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function PageFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="page-faq" aria-labelledby="page-faq-title">
      <h2 id="page-faq-title">Perguntas frequentes</h2>
      {faqs.map((faq, index) => (
        <details key={faq.question} open={index === 0}>
          <summary>{faq.question}<b aria-hidden="true" /></summary>
          <p><RichText text={faq.answer} /></p>
        </details>
      ))}
    </section>
  );
}

export function PageCta() {
  return (
    <section className="page-cta shell">
      <div>
        <span className="section-label light">Demonstração</span>
        <h2>Veja a Auttra com a rotina da sua oficina.</h2>
        <p>A demonstração segue o caminho do carro na sua oficina, do orçamento ao recebimento, e termina com valores e próximos passos claros.</p>
      </div>
      <div className="page-cta-actions">
        <DemoLink className="button button-light">Solicitar demonstração <Icon name="arrow" size={18} /></DemoLink>
        <WhatsappLink><Icon name="message" size={18} /> Chamar no WhatsApp</WhatsappLink>
      </div>
    </section>
  );
}

function RelatedLinks({ paths }: { paths: string[] }) {
  const pages = paths.map((path) => contentPages.find((page) => page.path === path)).filter((page): page is Page => Boolean(page));
  if (!pages.length) return null;
  return (
    <section className="page-related shell" aria-labelledby="page-related-title">
      <h2 id="page-related-title">Continue lendo</h2>
      <ul>
        {pages.map((page) => (
          <li key={page.path}>
            <a href={page.path}>
              <span>{page.kind === "guia" ? "Guia" : "Recurso"}</span>
              <strong>{page.name}</strong>
              <small>{page.description}</small>
              <Icon name="arrow" size={18} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContentPage({ page }: { page: Page }) {
  const trail = page.kind === "guia"
    ? [{ name: "Início", path: "/" }, { name: guidesHub.name, path: guidesHub.path }, { name: page.name }]
    : [{ name: "Início", path: "/" }, { name: page.name }];

  return (
    <main id="inicio" tabIndex={-1} className={`content-page content-${page.kind}`}>
      <header className="page-hero">
        <div className="shell">
          <Breadcrumb items={trail} />
          <span className="section-label">{page.eyebrow}</span>
          <h1>{page.h1}</h1>
          <p className="page-lead">{page.lead}</p>
          {page.kind === "guia"
            ? <p className="page-meta">Por Auttra · Atualizado em <time dateTime={page.updated}>{formatDate(page.updated)}</time></p>
            : (
              <div className="page-actions">
                <DemoLink>Quero conhecer a Auttra <Icon name="arrow" size={18} /></DemoLink>
                <WhatsappLink><Icon name="message" size={18} /> Chamar no WhatsApp</WhatsappLink>
              </div>
            )}
          {page.image && (
            <figure className="page-shot">
              <div className="window-top" aria-hidden="true"><i /><i /><i /></div>
              <img className="screen-shot" src={screens[page.image.key]} alt={page.image.alt} width={1800} height={1125} decoding="async" />
              <figcaption>Tela real da Auttra, com dados de exemplo.</figcaption>
            </figure>
          )}
        </div>
      </header>

      {page.highlights && (
        <section className="page-points shell" aria-labelledby="page-points-title">
          <h2 id="page-points-title">{page.highlightsHeading}</h2>
          <ul>
            {page.highlights.map((item) => (
              <li key={item.title}>
                <Icon name="check" size={18} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="page-body shell">
        <article className="page-article">
          {page.sections.map((section) => {
            const List = section.ordered ? "ol" : "ul";
            return (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((text) => <p key={text}><RichText text={text} /></p>)}
                {section.items && <List>{section.items.map((item) => <li key={item}><RichText text={item} /></li>)}</List>}
                {section.closing?.map((text) => <p key={text}><RichText text={text} /></p>)}
              </section>
            );
          })}
          <PageFaq faqs={page.faqs} />
        </article>
      </div>

      <RelatedLinks paths={page.related} />
      <PageCta />
    </main>
  );
}

export function GuidesPage() {
  return (
    <main id="inicio" tabIndex={-1} className="content-page">
      <header className="page-hero">
        <div className="shell">
          <Breadcrumb items={[{ name: "Início", path: "/" }, { name: guidesHub.name }]} />
          <span className="section-label">{guidesHub.eyebrow}</span>
          <h1>{guidesHub.h1}</h1>
          <p className="page-lead">{guidesHub.lead}</p>
        </div>
      </header>
      <section className="page-related page-guides shell" aria-label="Lista de guias">
        <ul>
          {guidePages.map((page) => (
            <li key={page.path}>
              <a href={page.path}>
                <span>Guia · {formatDate(page.updated)}</span>
                <strong>{page.name}</strong>
                <small>{page.description}</small>
                <Icon name="arrow" size={18} />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <PageCta />
    </main>
  );
}

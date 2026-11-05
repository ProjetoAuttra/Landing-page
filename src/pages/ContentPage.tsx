import { useEffect, useRef, type CSSProperties } from "react";
import agendaScreen from "../assets/screens/agenda.webp";
import atencaoScreen from "../assets/screens/atencao.webp";
import estoqueScreen from "../assets/screens/estoque.webp";
import financeiroScreen from "../assets/screens/financeiro.webp";
import orcamentosScreen from "../assets/screens/orcamentos.webp";
import ordensScreen from "../assets/screens/ordens.webp";
import { DemoForm } from "../components/DemoForm";
import { DemoLink, Icon, RichText, WhatsappLink } from "../components/Shared";
import { featureLinks } from "../site/links";
import {
  contentPages,
  guidePages,
  guidesHub,
  sectionId,
  type ContentPage as Page,
  type Faq,
  type FlowStep,
  type ScreenKey,
  type Section,
} from "../site/pages";

const screens: Record<ScreenKey, string> = {
  agenda: agendaScreen,
  estoque: estoqueScreen,
  financeiro: financeiroScreen,
  orcamentos: orcamentosScreen,
  ordens: ordensScreen,
};

const alertRows = [
  "O.S. paradas há mais de 5 dias",
  "contas vencidas a receber",
  "orçamentos sem resposta",
  "estoque crítico",
  "conta a pagar amanhã",
];

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

// O quadro "Precisa de atenção" da tela inicial, com a linha desta página em destaque.
function AlertPanel({ row }: { row: number }) {
  return (
    <figure className="alert-panel">
      <div className="window-top" aria-hidden="true"><i /><i /><i /><small>Tela inicial</small></div>
      <div className="alert-shot" style={{ "--row": row } as CSSProperties}>
        <img
          src={atencaoScreen}
          alt={`Quadro Precisa de atenção da tela inicial da Auttra, com destaque para ${alertRows[row]}`}
          width={1090}
          height={530}
          fetchPriority="high"
          decoding="async"
        />
        <span className="alert-spot" aria-hidden="true" />
      </div>
      <figcaption>Tela real da Auttra, com dados de exemplo.</figcaption>
    </figure>
  );
}

function FlowShot({ step }: { step: FlowStep }) {
  const style = { "--x": `-${step.crop.x}%`, "--y": `-${step.crop.y}%`, "--zoom": step.crop.zoom ?? 1.9 } as CSSProperties;
  return (
    <div className="flow-shot" style={style}>
      <img src={screens[step.screen]} alt={step.alt} width={1800} height={1125} loading="lazy" decoding="async" />
    </div>
  );
}

function Flow({ flow }: { flow: NonNullable<Page["flow"]> }) {
  return (
    <section className="flow shell" aria-labelledby="flow-title">
      <h2 id="flow-title">{flow.heading}</h2>
      <ol>
        {flow.steps.map((step) => (
          <li key={step.title}>
            <div className="flow-copy">
              <h3>{step.title}</h3>
              <p><RichText text={step.text} /></p>
            </div>
            <FlowShot step={step} />
          </li>
        ))}
      </ol>
      <p className="flow-note">Recortes de telas reais da Auttra, com dados de exemplo.</p>
    </section>
  );
}

function SectionBody({ section }: { section: Section }) {
  const List = section.ordered ? "ol" : "ul";
  return (
    <>
      {section.paragraphs?.map((text) => <p key={text}><RichText text={text} /></p>)}
      {section.figure === "os-anatomy" && <OsAnatomy />}
      {section.items && <List>{section.items.map((item) => <li key={item}><RichText text={item} /></li>)}</List>}
      {section.groups && (
        <div className="prose-groups">
          {section.groups.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {section.closing?.map((text) => <p key={text}><RichText text={text} /></p>)}
      {section.aside && (
        <aside className="prose-aside">
          <p>{section.aside.text}</p>
          <a href={section.aside.link.href}>{section.aside.link.label} <Icon name="arrow" size={16} /></a>
        </aside>
      )}
    </>
  );
}

// Modelo de O.S. preenchido, com os mesmos dados de exemplo das telas do site.
function OsAnatomy() {
  return (
    <figure className="os-doc">
      <div className="os-doc-head">
        <div><strong>Oficina Central</strong><span>Ordem de serviço nº 9431</span></div>
        <em>Exemplo</em>
      </div>
      <div className="os-block">
        <span className="os-mark" aria-hidden="true">1</span>
        <h3>Quem</h3>
        <dl>
          <div><dt>Cliente</dt><dd>Rodrigo Almeida · (11) 99999-9999</dd></div>
        </dl>
      </div>
      <div className="os-block">
        <span className="os-mark" aria-hidden="true">2</span>
        <h3>O carro</h3>
        <dl>
          <div><dt>Veículo</dt><dd>VW Polo 2021 · RTA4F21 · 48.210 km</dd></div>
          <div><dt>Relato</dt><dd>“Barulho ao frear e o pedal está baixo.”</dd></div>
          <div><dt>Diagnóstico</dt><dd>Pastilhas e discos dianteiros no limite.</dd></div>
        </dl>
      </div>
      <div className="os-block">
        <span className="os-mark" aria-hidden="true">3</span>
        <h3>O serviço</h3>
        <table>
          <tbody>
            <tr><td>Troca de pastilhas e discos dianteiros</td><td>mão de obra</td><td>R$ 280,00</td></tr>
            <tr><td>Pastilha dianteira (jogo) · nova</td><td>1 un.</td><td>R$ 245,00</td></tr>
            <tr><td>Disco de freio dianteiro · novo</td><td>2 un.</td><td>R$ 340,00</td></tr>
            <tr><td>Fluido de freio DOT4</td><td>3 un.</td><td>R$ 96,00</td></tr>
          </tbody>
        </table>
        <dl>
          <div><dt>Responsável</dt><dd>Carlos Souza · entrada 03/11 · entrega prevista 05/11</dd></div>
        </dl>
      </div>
      <div className="os-block">
        <span className="os-mark" aria-hidden="true">4</span>
        <h3>O acordo</h3>
        <dl>
          <div><dt>Total</dt><dd><strong>R$ 961,00</strong> · PIX na entrega</dd></div>
          <div><dt>Garantia</dt><dd>90 dias para o serviço</dd></div>
          <div><dt>Autorização</dt><dd>Aprovado pelo cliente no WhatsApp em 03/11, às 10h12</dd></div>
        </dl>
      </div>
      <figcaption>Modelo de ordem de serviço com dados de exemplo. Os números ligam cada bloco à lista abaixo.</figcaption>
    </figure>
  );
}

function PageFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="page-faq" id="duvidas" aria-labelledby="page-faq-title">
      <h2 id="page-faq-title">Perguntas frequentes</h2>
      <div>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}<b aria-hidden="true" /></summary>
            <p><RichText text={faq.answer} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

function RelatedLinks({ paths }: { paths: string[] }) {
  const pages = paths.map((path) => contentPages.find((page) => page.path === path)).filter((page): page is Page => Boolean(page));
  if (!pages.length) return null;
  return (
    <section className="page-related shell" aria-labelledby="page-related-title">
      <h2 id="page-related-title">Veja também</h2>
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

// Fechamento com o formulário na própria página: quem chegou pela busca não é mandado para outra.
function LeadSection({ source }: { source: string }) {
  return (
    <section id="demonstracao" className="final-cta lead-section page-lead-section shell">
      <div className="lead-copy">
        <h2>Veja a Auttra com a rotina da sua oficina.</h2>
        <p>Conte um pouco sobre a oficina. Ao enviar, o WhatsApp abre com tudo preenchido para combinar a demonstração.</p>
        <ul>
          <li><Icon name="check" size={17} /> A demonstração segue o caminho do carro na sua oficina</li>
          <li><Icon name="check" size={17} /> O valor é apresentado na demonstração, com implantação e treinamento</li>
          <li><Icon name="check" size={17} /> Sem compromisso de contratação</li>
        </ul>
        <WhatsappLink className="lead-whatsapp"><Icon name="message" size={17} /> Prefere conversar agora? Chamar no WhatsApp</WhatsappLink>
      </div>
      <DemoForm source={source} compact />
    </section>
  );
}

function Sources({ sources }: { sources: NonNullable<Page["sources"]> }) {
  return (
    <p className="page-sources">
      Fonte{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((source, index) => (
        <span key={source.href}>{index > 0 && " · "}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>
      ))}
    </p>
  );
}

function FeaturePage({ page }: { page: Page }) {
  return (
    <main id="inicio" tabIndex={-1} className="content-page content-recurso">
      <header className="page-hero">
        <div className="direction-trails" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell page-hero-grid">
          <div className="page-hero-copy">
            <Breadcrumb items={[{ name: "Início", path: "/" }, { name: page.name }]} />
            <h1>{page.h1}</h1>
            <p className="page-lead">{page.lead}</p>
            <div className="page-actions">
              <DemoLink>Solicitar demonstração <Icon name="arrow" size={18} /></DemoLink>
              <WhatsappLink><Icon name="message" size={18} /> Chamar no WhatsApp</WhatsappLink>
            </div>
          </div>
          {page.alert && (
            <div className="page-hero-alert">
              <AlertPanel row={page.alert.row} />
              <div className="alert-copy">
                <h2>{page.alert.title}</h2>
                <p>{page.alert.text}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {page.flow && <Flow flow={page.flow} />}

      {page.extras && (
        <section className="page-extras shell" aria-labelledby="page-extras-title">
          <h2 id="page-extras-title">{page.extras.heading}</h2>
          <ul>
            {page.extras.items.map((item) => (
              <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>
            ))}
          </ul>
        </section>
      )}

      <div className="page-prose shell">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <div className="prose"><SectionBody section={section} /></div>
          </section>
        ))}
        {page.sources && <Sources sources={page.sources} />}
        <PageFaq faqs={page.faqs} />
      </div>

      <RelatedLinks paths={page.related} />
      <LeadSection source={page.name} />
    </main>
  );
}

function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        bar.current?.style.setProperty("--page-progress", `${available > 0 ? Math.min(1, window.scrollY / available) : 0}`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}

function GuideArticle({ page }: { page: Page }) {
  const toc = [...page.sections.map((section) => ({ id: sectionId(section.heading), label: section.heading })), { id: "duvidas", label: "Perguntas frequentes" }];
  const tocLinks = toc.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>);

  return (
    <main id="inicio" tabIndex={-1} className="content-page content-guia">
      <ReadingProgress />
      <header className="page-hero guide-hero">
        <div className="shell">
          <Breadcrumb items={[{ name: "Início", path: "/" }, { name: guidesHub.name, path: guidesHub.path }, { name: page.name }]} />
          <h1>{page.h1}</h1>
          <p className="page-lead">{page.lead}</p>
          <p className="page-meta">
            Equipe Auttra · Atualizado em <time dateTime={page.updated}>{formatDate(page.updated)}</time>
          </p>
        </div>
      </header>

      <div className="guide-layout shell">
        <aside className="guide-toc" aria-label="Neste guia">
          <details className="guide-toc-mobile">
            <summary>Neste guia<b aria-hidden="true" /></summary>
            <ol>{tocLinks}</ol>
          </details>
          <div className="guide-toc-rail">
            <strong>Neste guia</strong>
            <ol>{tocLinks}</ol>
          </div>
        </aside>
        <article className="guide-article prose">
          {page.sections.map((section) => (
            <section key={section.heading} id={sectionId(section.heading)}>
              <h2>{section.heading}</h2>
              <SectionBody section={section} />
            </section>
          ))}
          {page.sources && <Sources sources={page.sources} />}
          <PageFaq faqs={page.faqs} />
        </article>
      </div>

      <RelatedLinks paths={page.related} />
      <LeadSection source={page.name} />
    </main>
  );
}

export function ContentPage({ page }: { page: Page }) {
  return page.kind === "guia" ? <GuideArticle page={page} /> : <FeaturePage page={page} />;
}

export function GuidesPage() {
  const features = featureLinks.map((link) => contentPages.find((page) => page.path === link.path)).filter((page): page is Page => Boolean(page));
  return (
    <main id="inicio" tabIndex={-1} className="content-page">
      <header className="page-hero guide-hero">
        <div className="shell">
          <Breadcrumb items={[{ name: "Início", path: "/" }, { name: guidesHub.name }]} />
          <h1>{guidesHub.h1}</h1>
          <p className="page-lead">{guidesHub.lead}</p>
        </div>
      </header>
      <section className="page-related page-guides shell" aria-label="Lista de guias">
        <ul>
          {guidePages.map((page) => (
            <li key={page.path}>
              <a href={page.path}>
                <span>Guia</span>
                <strong>{page.h1.replace(/\.$/, "")}</strong>
                <small>{page.description}</small>
                <Icon name="arrow" size={18} />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="page-extras hub-features shell" aria-labelledby="hub-features-title">
        <h2 id="hub-features-title">Como a Auttra resolve cada parte</h2>
        <ul>
          {features.map((page) => (
            <li key={page.path}>
              <h3><a href={page.path}>{page.name}</a></h3>
              <p>{page.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <LeadSection source={guidesHub.name} />
    </main>
  );
}

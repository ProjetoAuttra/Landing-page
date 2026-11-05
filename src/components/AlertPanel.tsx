import type { CSSProperties } from "react";
import atencaoScreen from "../assets/screens/atencao.webp";

// Ordem das linhas no quadro "Precisa de atenção" (a mesma da tela inicial do sistema).
export const alertRows = [
  "O.S. paradas há mais de 5 dias",
  "contas vencidas a receber",
  "orçamentos sem resposta",
  "estoque crítico",
  "conta a pagar amanhã",
];

/** O quadro "Precisa de atenção" da tela inicial, com uma linha em destaque. */
export function AlertPanel({ row, label = "Tela inicial" }: { row: number; label?: string }) {
  return (
    <figure className="alert-panel">
      <div className="window-top" aria-hidden="true"><i /><i /><i /><small>{label}</small></div>
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

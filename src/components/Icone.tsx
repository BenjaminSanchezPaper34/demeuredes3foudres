import traces from "./icones/traces.json";

/**
 * Icônes maison — cf. DESIGN.md §5 : « aucune icône en aplat de couleur »,
 * trait hérité de la couleur du texte. Grille 24, trait 1,5 px, bouts ronds.
 *
 * Les tracés vivent dans `icones/traces.json`, partagé avec le script qui
 * génère la planche de validation : une seule source, jamais deux dessins
 * divergents de la même icône.
 */
type Trace = { p?: string[]; c?: number[][]; f?: string[]; fc?: number[][] };
const TRACES = traces as unknown as Record<string, Trace | string>;

export type NomIcone = Exclude<keyof typeof traces, "_doc">;

export function Icone({
  nom,
  taille = 20,
  trait = 1.5,
  titre,
  className = "",
}: {
  nom: NomIcone;
  /** Côté en px. 20 par défaut ; 16 en ligne dans un texte, 24 dans un bouton d'action. */
  taille?: number;
  trait?: number;
  /** Libellé accessible. Sans titre, l'icône est purement décorative. */
  titre?: string;
  className?: string;
}) {
  const t = TRACES[nom] as Trace;
  return (
    <svg
      viewBox="0 0 24 24"
      width={taille}
      height={taille}
      fill="none"
      stroke="currentColor"
      strokeWidth={trait}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={titre ? undefined : true}
      role={titre ? "img" : undefined}
      className={`shrink-0 ${className}`}
    >
      {titre && <title>{titre}</title>}
      {t.p?.map((d, i) => <path key={`p${i}`} d={d} />)}
      {t.c?.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={r} />)}
      {t.f?.map((d, i) => <path key={`f${i}`} d={d} fill="currentColor" stroke="none" />)}
      {t.fc?.map(([cx, cy, r], i) => (
        <circle key={`fc${i}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

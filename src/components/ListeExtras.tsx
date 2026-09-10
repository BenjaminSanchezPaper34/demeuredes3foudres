import type { NomIcone } from "./Icone";
import { Icone } from "./Icone";

/**
 * Liste des « petits + » : une icône maison en Sauge, un libellé, un filet.
 * Partagée par l'accueil et la page de la demeure — un motif vu deux fois
 * devient un composant.
 */
export default function ListeExtras({ items, icones }: { items: string[]; icones: NomIcone[] }) {
  return (
    <ul className="mt-8" data-reveal="stagger">
      {items.map((e, i) => (
        <li
          key={i}
          className="flex min-h-14 items-center gap-4 border-b border-sauge/40 py-3.5 text-base leading-relaxed text-taupe"
        >
          <Icone nom={icones[i] ?? "trois-foudres"} taille={22} className="text-sauge" />
          {e}
        </li>
      ))}
    </ul>
  );
}

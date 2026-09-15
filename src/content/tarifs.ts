import type { Lang } from "@/lib/site";
import type { LogementId } from "@/lib/routes";

type T = Record<Lang, string>;

/**
 * Grille tarifaire de référence — source : Jérôme et Claudie, 15/09/2026.
 *
 * ⚠ CE FICHIER N'EST PAS LA SOURCE DE VÉRITÉ DE L'AFFICHAGE.
 * Le channel manager l'est (ARCHITECTURE.md §4). Cette grille a deux usages,
 * et deux seulement :
 *
 *   1. AFFICHAGE DE REPLI tant que le compte Smoobu n'est pas branché — un
 *      prix juste et daté vaut mieux qu'un « sur demande », qui fait fuir.
 *   2. ATTENDUS pour /controle : ce que Smoobu DOIT appliquer. Dès que l'API
 *      répond, c'est elle qui s'affiche, et tout écart avec cette grille est
 *      signalé — c'est ainsi qu'on repère un paramétrage manqué.
 *
 * Une fois l'API branchée, ne jamais modifier un prix ici pour changer le
 * site : on le change dans Smoobu, et on reporte ici la nouvelle décision.
 */
export type Saison = {
  id: "basse" | "moyenne" | "haute";
  libelle: T;
  /** Mois couverts (1 = janvier), pour situer une date dans une saison. */
  mois: number[];
  prix: Record<LogementId, number>;
};

export const TARIFS = {
  source: { auteur: "Jérôme et Claudie", date: "2026-09-15" },
  devise: "EUR",
  saisons: [
    {
      id: "basse",
      libelle: { fr: "Septembre à avril", en: "September to April" },
      mois: [9, 10, 11, 12, 1, 2, 3, 4],
      prix: { grenier: 165, ecurie: 105, lingerie: 90 },
    },
    {
      id: "moyenne",
      libelle: { fr: "Mai et juin", en: "May and June" },
      mois: [5, 6],
      prix: { grenier: 215, ecurie: 125, lingerie: 105 },
    },
    {
      id: "haute",
      libelle: { fr: "Juillet et août", en: "July and August" },
      mois: [7, 8],
      prix: { grenier: 230, ecurie: 135, lingerie: 115 },
    },
  ] satisfies Saison[],

  /** En option, en supplément du prix de la nuit. */
  petitDejeuner: {
    prix: 12,
    texte: {
      fr: "Petit-déjeuner en option, 12 € par personne et par jour.",
      en: "Breakfast optional, €12 per person per day.",
    } as T,
  },
} as const;

/** Prix le plus bas d'un logement, toutes saisons confondues — le « à partir de ». */
export const prixMini = (id: LogementId) =>
  Math.min(...TARIFS.saisons.map((s) => s.prix[id]));

/** Prix le plus bas et le plus haut de la maison — `priceRange` du JSON-LD. */
export const amplitude = () => {
  const tous = TARIFS.saisons.flatMap((s) => Object.values(s.prix));
  return { min: Math.min(...tous), max: Math.max(...tous) };
};

export const formatePrix = (v: number, lang: Lang) =>
  v.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: TARIFS.devise,
    maximumFractionDigits: 0,
  });

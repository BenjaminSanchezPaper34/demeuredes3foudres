import type { Lang } from "@/lib/site";
import type { LogementId } from "@/lib/routes";

type T = Record<Lang, string>;

export type Option = {
  id: string;
  libelle: T;
  /** Points attribués à chaque logement par cette réponse. */
  points: Partial<Record<LogementId, number>>;
  /** La raison, reprise dans la suggestion quand l'option a compté. */
  raison: T;
};

export type Question = { id: string; intitule: T; options: Option[] };

/**
 * Configurateur « Quel logement pour vous ? ».
 * Trois questions, un score par logement, le meilleur est suggéré.
 * Les règles sont ici, en clair, pas dans le composant : c'est du contenu.
 */
export const QUESTIONS: Question[] = [
  {
    id: "voyageurs",
    intitule: { fr: "Vous êtes", en: "You are" },
    options: [
      {
        id: "deux",
        libelle: { fr: "1 ou 2 personnes", en: "1 or 2 people" },
        points: { ecurie: 2, lingerie: 2 },
        raison: { fr: "deux personnes", en: "two guests" },
      },
      {
        id: "quatre",
        libelle: { fr: "3 ou 4 personnes", en: "3 or 4 people" },
        // Seul logement pour plus de deux : la question tranche à elle seule.
        points: { grenier: 10 },
        raison: { fr: "le seul logement pour quatre, avec ses deux chambres", en: "the only place for four, with its two bedrooms" },
      },
    ],
  },
  {
    id: "envie",
    intitule: { fr: "Vous préférez", en: "You'd rather have" },
    options: [
      {
        id: "baignoire",
        libelle: { fr: "Une baignoire et une terrasse à vous", en: "A bathtub and a terrace of your own" },
        points: { ecurie: 3 },
        raison: { fr: "sa baignoire en îlot et sa terrasse sous l'auvent", en: "its freestanding bathtub and its terrace under the eaves" },
      },
      {
        id: "cocon",
        libelle: { fr: "Un cocon à deux pas de la piscine", en: "A cocoon steps from the pool" },
        points: { lingerie: 3 },
        raison: { fr: "son ambiance 1900 et le couloir de nage à deux pas", en: "its 1900s feel and the swimming lane a few steps away" },
      },
      {
        id: "cuisine",
        libelle: { fr: "Une cuisine, pour être indépendants", en: "A kitchen, to be independent" },
        points: { grenier: 3 },
        raison: { fr: "sa cuisine équipée et ses 70 m² sous les toits", en: "its fitted kitchen and 70 m² under the roof" },
      },
    ],
  },
  {
    id: "duree",
    intitule: { fr: "Pour", en: "For" },
    options: [
      {
        id: "court",
        libelle: { fr: "Une ou deux nuits", en: "A night or two" },
        points: { ecurie: 1, lingerie: 1 },
        raison: { fr: "", en: "" },
      },
      {
        id: "long",
        libelle: { fr: "Une semaine ou plus", en: "A week or more" },
        points: { grenier: 2 },
        raison: { fr: "l'espace pour un long séjour", en: "the space for a longer stay" },
      },
    ],
  },
];

export const TEXTES = {
  kicker: { fr: "Quel logement pour vous ?", en: "Which one is for you?" },
  titre: { fr: "Dites-nous, on vous suggère", en: "Tell us, we'll suggest" },
  attente: {
    fr: "Répondez aux deux premières questions : la suggestion apparaît ici.",
    en: "Answer the first two questions and the suggestion appears here.",
  },
  suggestion: { fr: "Nous vous suggérons", en: "We'd suggest" },
  pour: { fr: "pour", en: "for" },
  et: { fr: "et", en: "and" },
  aussi: { fr: "Sinon, regardez aussi", en: "Otherwise, also look at" },
} as const;

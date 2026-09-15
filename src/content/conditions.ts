import type { Lang } from "@/lib/site";
import type { LogementId } from "@/lib/routes";

type T = Record<Lang, string>;

/**
 * Conditions de séjour — source : Claudie (conciergerie), écrit du 15/09/2026.
 *
 * Ce sont des CONDITIONS (acompte, annulation, taxe, capacités), pas des
 * tarifs : elles se publient. Les prix et la durée minimum par date, eux,
 * viennent exclusivement de l'API Smoobu (ARCHITECTURE.md §4).
 *
 * `attendus` sert à /controle : ce que Smoobu doit appliquer, comparé à ce
 * qu'il renvoie réellement. Rien ici n'est jamais affiché comme état réel.
 */
export const CONDITIONS = {
  source: { auteur: "Claudie, conciergerie", date: "2026-09-15" },

  sejourMinimumNuits: 2,
  /** Réservation possible le jour même jusqu'à cette heure (heure de Paris). */
  reservationJourMemeJusqua: "11:00",
  arrivee: { de: "16:00", a: "17:00" },
  depart: "11:00",

  capacites: {
    ecurie: { adultes: 2, bebes: 1 },
    lingerie: { adultes: 2, bebes: 1 },
    grenier: { adultes: 4, bebes: 1 },
  } satisfies Record<LogementId, { adultes: number; bebes: number }>,
  /** Un bébé = moins de 2 ans, gratuit. */
  bebeAgeMax: 2,

  acomptePourcent: 30,
  soldeALArrivee: true,

  annulation: { gratuiteJusquaJoursAvant: 5, retenueApresPourcent: 100 },

  taxeSejour: {
    montant: 1.15,
    /** Exonération LÉGALE des moins de 18 ans (CGCT, art. L2333-31) — pas
     *  « moins de 2 ans » comme dans l'écrit initial : signalé au client. */
    exonerationAgeMax: 18,
  },
} as const;

/** Textes affichés sur /tarifs. Reformulés, mais chaque chiffre vient de la source. */
export const CONDITIONS_TEXTES: { icone: "calendrier" | "personnes" | "coche" | "adresse"; titre: T; texte: T }[] = [
  {
    icone: "calendrier",
    titre: { fr: "Durée et horaires", en: "Length of stay and times" },
    texte: {
      fr: "Deux nuits minimum pour tous les logements. Arrivée entre 16 h et 17 h, départ à 11 h. Réservation possible le jour même jusqu'à 11 h, selon disponibilité.",
      en: "Two nights minimum for every place to stay. Check-in between 4 pm and 5 pm, check-out at 11 am. Same-day booking possible until 11 am, subject to availability.",
    },
  },
  {
    icone: "personnes",
    titre: { fr: "Capacité", en: "Capacity" },
    texte: {
      fr: "L'Écurie et La Lingerie accueillent 2 adultes, Le Grenier 4 adultes. Chaque logement peut recevoir en plus un bébé de moins de 2 ans, gratuitement.",
      en: "The Stable and the Linen Room sleep 2 adults, the Attic 4 adults. Each place can also take one infant under 2, free of charge.",
    },
  },
  {
    icone: "coche",
    titre: { fr: "Paiement et annulation", en: "Payment and cancellation" },
    texte: {
      fr: "Acompte de 30 % à la réservation, solde de 70 % à l'arrivée. Annulation sans frais jusqu'à 5 jours avant l'arrivée ; passé ce délai, le séjour est dû en totalité.",
      en: "30% deposit at booking, the remaining 70% on arrival. Free cancellation up to 5 days before arrival; after that, the full stay is due.",
    },
  },
  {
    icone: "adresse",
    titre: { fr: "Taxe de séjour", en: "Tourist tax" },
    texte: {
      fr: "1,15 € par personne et par nuit, en plus du prix du séjour, reversée à la commune. Les personnes de moins de 18 ans en sont exonérées.",
      en: "€1.15 per person per night, on top of the price of the stay, passed on to the town. Under-18s are exempt.",
    },
  },
];

/** Questions ajoutées à la FAQ de /tarifs (et à son JSON-LD FAQPage). */
export const CONDITIONS_FAQ: { q: T; r: T }[] = [
  {
    q: { fr: "Quelles sont les conditions d'annulation ?", en: "What is the cancellation policy?" },
    r: {
      fr: "Annulation sans frais jusqu'à 5 jours avant l'arrivée. Passé ce délai, le séjour est dû en totalité.",
      en: "Free cancellation up to 5 days before arrival. After that, the full stay is due.",
    },
  },
  {
    q: { fr: "Faut-il payer un acompte ?", en: "Is a deposit required?" },
    r: {
      fr: "Oui, 30 % du séjour à la réservation. Le solde se règle à l'arrivée.",
      en: "Yes, 30% of the stay at booking. The balance is paid on arrival.",
    },
  },
  {
    q: { fr: "Peut-on venir avec un bébé ?", en: "Can we bring a baby?" },
    r: {
      fr: "Oui : chaque logement accueille un bébé de moins de 2 ans en plus des adultes, gratuitement et sans taxe de séjour.",
      en: "Yes: each place takes one infant under 2 in addition to the adults, free of charge and without tourist tax.",
    },
  },
  {
    q: { fr: "Combien coûte la taxe de séjour ?", en: "How much is the tourist tax?" },
    r: {
      fr: "1,15 € par personne et par nuit, en plus du prix du séjour. Les moins de 18 ans en sont exonérés.",
      en: "€1.15 per person per night, on top of the price of the stay. Under-18s are exempt.",
    },
  },
];

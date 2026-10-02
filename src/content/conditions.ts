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
  arrivee: { de: "17:00", a: "20:00" }, // Claudie 02/10/2026 : à partir de 17 h, repère 20 h, plus tard sur demande
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

  /**
   * Pas de caution, pas d'empreinte bancaire — décision de Claudie du
   * 15/09/2026 : « Nous n'avons jamais eu recours à la caution donc ce n'est
   * pas nécessaire. » Arbitrage tranché, à ne pas rouvrir sans elle. Une
   * empreinte ne tient que 7 jours et exigerait un service tiers (Swikly) ;
   * elle ajouterait un frein au moment de l'engagement, pour un risque qui
   * ne s'est jamais matérialisé en trois ans.
   */
  caution: null,

  /** Réponses de Claudie du 01/10/2026. */
  animaux: { admis: true, supplement: 0 },
  /** Fumer : autorisé à l'extérieur uniquement. */
  fumeur: "exterieur" as const,
  /** Le prix est celui du logement, quel que soit le nombre d'occupants. */
  prixParLogement: true,
  /** Petit-déjeuner jamais inclus : en option, 12 € / pers. / jour (content/tarifs.ts). */
  petitDejeunerInclus: false,

  taxeSejour: {
    montant: 1.15,
    /** Exonération LÉGALE des moins de 18 ans (CGCT, art. L2333-31).
     *  L'écrit du 15/09 disait « moins de 2 ans » ; Claudie a confirmé le
     *  jour même que c'était une maladresse de rédaction — les moins de
     *  2 ans concernent la gratuité de la NUITÉE, pas la taxe. */
    exonerationAgeMax: 18,
  },
} as const;

/** Textes affichés sur /tarifs. Reformulés, mais chaque chiffre vient de la source. */
export const CONDITIONS_TEXTES: { icone: "calendrier" | "personnes" | "coche" | "adresse"; titre: T; texte: T }[] = [
  {
    icone: "calendrier",
    titre: { fr: "Durée et horaires", en: "Length of stay and times" },
    texte: {
      fr: "Deux nuits minimum pour tous les logements. Arrivée à partir de 17 h, jusqu'à 20 h (plus tard sur demande), départ à 11 h. Réservation possible le jour même jusqu'à 11 h, selon disponibilité.",
      en: "Two nights minimum for every place to stay. Check-in from 5 pm until 8 pm (later on request), check-out at 11 am. Same-day booking possible until 11 am, subject to availability.",
    },
  },
  {
    icone: "personnes",
    titre: { fr: "Capacité", en: "Capacity" },
    texte: {
      fr: "L'Écurie et La Lingerie accueillent 2 adultes, Le Grenier 4 adultes. Chaque logement peut recevoir en plus un bébé de moins de 2 ans, gratuitement. Le prix est celui du logement : le même pour une personne ou pour deux.",
      en: "The Stable and the Linen Room sleep 2 adults, the Attic 4 adults. Each place can also take one infant under 2, free of charge. The price is per place to stay: the same for one guest or two.",
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
  {
    icone: "coche",
    titre: { fr: "Animaux et tabac", en: "Pets and smoking" },
    texte: {
      fr: "Les animaux sont les bienvenus, sans supplément. On fume à l'extérieur uniquement : les logements sont non-fumeurs.",
      en: "Pets are welcome at no extra charge. Smoking outdoors only: the rooms are non-smoking.",
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
  {
    q: { fr: "Les animaux sont-ils acceptés ?", en: "Are pets allowed?" },
    r: {
      fr: "Oui, les animaux sont les bienvenus, sans supplément.",
      en: "Yes, pets are welcome at no extra charge.",
    },
  },
  {
    q: { fr: "Peut-on fumer ?", en: "Is smoking allowed?" },
    r: {
      fr: "À l'extérieur uniquement : les logements sont non-fumeurs.",
      en: "Outdoors only: the rooms are non-smoking.",
    },
  },
  {
    q: { fr: "Le tarif est-il le même pour une personne seule ?", en: "Is the price the same for one guest?" },
    r: {
      fr: "Oui, le prix est celui du logement : le même pour une ou deux personnes.",
      en: "Yes, the price is per place to stay: the same for one guest or two.",
    },
  },
];

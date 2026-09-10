import type { Lang } from "@/lib/site";
import type { RouteKey } from "@/lib/routes";

type T = Record<Lang, string>;

/** Libellés de navigation, indexés par clé de route. */
export const LIBELLES: Record<RouteKey, T> = {
  accueil: { fr: "Accueil", en: "Home" },
  laDemeure: { fr: "La demeure", en: "The house" },
  chambres: { fr: "Les chambres", en: "Rooms" },
  bainsJaponais: { fr: "Bains japonais", en: "Japanese baths" },
  leChai: { fr: "Le chai", en: "The wine hall" },
  tarifs: { fr: "Tarifs", en: "Rates" },
  reserver: { fr: "Réserver", en: "Book" },
  acces: { fr: "Accès", en: "Getting here" },
  environs: { fr: "Caux et ses environs", en: "Caux and around" },
  contact: { fr: "Contact", en: "Contact" },
  mentionsLegales: { fr: "Mentions légales", en: "Legal notice" },
  confidentialite: { fr: "Confidentialité", en: "Privacy" },
};

export const UI = {
  reserver: { fr: "Réserver en direct", en: "Book direct" },
  voirDisponibilites: { fr: "Voir les disponibilités", en: "Check availability" },
  decouvrir: { fr: "Découvrir", en: "Discover" },
  enSavoirPlus: { fr: "En savoir plus", en: "Find out more" },
  appeler: { fr: "Appeler", en: "Call us" },
  ecrire: { fr: "Écrire", en: "Email us" },
  itineraire: { fr: "Itinéraire", en: "Directions" },
  personnes: { fr: "personnes", en: "guests" },
  personne: { fr: "personne", en: "guest" },
  chambre: { fr: "chambre", en: "bedroom" },
  chambresPluriel: { fr: "chambres", en: "bedrooms" },
  equipements: { fr: "Équipements", en: "Amenities" },
  lEssentiel: { fr: "L'essentiel", en: "In brief" },
  photos: { fr: "Photos", en: "Photos" },
  fermer: { fr: "Fermer", en: "Close" },
  precedent: { fr: "Précédent", en: "Previous" },
  suivant: { fr: "Suivant", en: "Next" },
  menu: { fr: "Menu", en: "Menu" },
  langue: { fr: "English", en: "Français" },
  avisGoogle: { fr: "sur Google", en: "on Google" },
  avis: { fr: "avis", en: "reviews" },
  tousLesLogements: { fr: "Les trois logements", en: "All three places to stay" },
  retourChambres: { fr: "Tous les logements", en: "All places to stay" },
  prixDirectTitre: {
    fr: "Le meilleur tarif est ici",
    en: "The best rate is here",
  },
  prixDirectTexte: {
    fr: "En réservant en direct, il n'y a pas de commission d'intermédiaire à payer. Le prix que vous voyez est celui que perçoit la maison.",
    en: "Booking direct means there is no platform commission to pay. The price you see is the price the house receives.",
  },
} as const;

export const t = (clef: T, lang: Lang) => clef[lang];

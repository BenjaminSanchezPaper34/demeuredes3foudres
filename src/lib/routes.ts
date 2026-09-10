import type { Lang } from "./site";

/**
 * Table des routes, source unique pour la nav, le sélecteur de langue,
 * les hreflang et le sitemap.
 *
 * Les slugs anglais sont de VRAIS mots anglais (/en/rooms/the-stable, pas
 * /en/chambres/l-ecurie) : les mots de la requête doivent être dans l'URL.
 */
export type RouteKey =
  | "accueil"
  | "laDemeure"
  | "chambres"
  | "bainsJaponais"
  | "leChai"
  | "tarifs"
  | "reserver"
  | "acces"
  | "environs"
  | "contact"
  | "mentionsLegales"
  | "confidentialite";

export const ROUTES: Record<RouteKey, Record<Lang, string>> = {
  accueil: { fr: "/", en: "/en" },
  laDemeure: { fr: "/la-demeure", en: "/en/the-house" },
  chambres: { fr: "/chambres", en: "/en/rooms" },
  bainsJaponais: { fr: "/bains-japonais", en: "/en/japanese-baths" },
  leChai: { fr: "/le-chai", en: "/en/the-wine-hall" },
  tarifs: { fr: "/tarifs", en: "/en/rates" },
  reserver: { fr: "/reserver", en: "/en/book" },
  acces: { fr: "/acces", en: "/en/getting-here" },
  environs: { fr: "/caux-et-ses-environs", en: "/en/caux-and-around" },
  contact: { fr: "/contact", en: "/en/contact" },
  mentionsLegales: { fr: "/mentions-legales", en: "/en/legal-notice" },
  confidentialite: { fr: "/confidentialite", en: "/en/privacy" },
};

/** Slugs des logements, par langue. */
export const LOGEMENT_SLUGS = {
  ecurie: { fr: "l-ecurie", en: "the-stable" },
  lingerie: { fr: "la-lingerie", en: "the-linen-room" },
  grenier: { fr: "le-grenier", en: "the-attic" },
} as const;

export type LogementId = keyof typeof LOGEMENT_SLUGS;

export function urlLogement(id: LogementId, lang: Lang): string {
  return `${ROUTES.chambres[lang]}/${LOGEMENT_SLUGS[id][lang]}`;
}

export function route(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

/** Navigation principale — volontairement courte : 5 entrées + le CTA. */
export const NAV: RouteKey[] = [
  "laDemeure",
  "chambres",
  "bainsJaponais",
  "leChai",
  "tarifs",
];

/** Liens du pied de page, en deux colonnes. */
export const NAV_PIED: RouteKey[] = ["acces", "environs", "contact"];

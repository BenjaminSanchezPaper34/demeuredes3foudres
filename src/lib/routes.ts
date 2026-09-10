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

/**
 * Chemin équivalent dans l'autre langue.
 *
 * Changer de langue depuis /chambres doit mener à /en/rooms, pas à l'accueil :
 * sinon le visiteur perd sa page, et le lien contredit les hreflang qu'on
 * déclare par ailleurs. Repli sur l'accueil si le chemin est inconnu.
 */
export function equivalent(chemin: string, cible: Lang): string {
  const source: Lang = cible === "fr" ? "en" : "fr";
  const propre = chemin.replace(/\/+$/, "") || "/";

  const cle = (Object.keys(ROUTES) as RouteKey[]).find(
    (k) => ROUTES[k][source] === propre,
  );
  if (cle) return ROUTES[cle][cible];

  const prefixe = `${ROUTES.chambres[source]}/`;
  if (propre.startsWith(prefixe)) {
    const slug = propre.slice(prefixe.length);
    const entree = Object.values(LOGEMENT_SLUGS).find((s) => s[source] === slug);
    if (entree) return `${ROUTES.chambres[cible]}/${entree[cible]}`;
  }

  return ROUTES.accueil[cible];
}

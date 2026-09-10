import type { Metadata } from "next";
import { SITE, type Lang } from "./site";
import { ROUTES, LOGEMENT_SLUGS, type RouteKey, type LogementId } from "./routes";

const abs = (chemin: string) => `${SITE.url}${chemin === "/" ? "" : chemin}`;

/**
 * Construit les métadonnées d'une page : title, description, canonical et
 * hreflang réciproques. `x-default` pointe le français.
 */
export function metaPage(opts: {
  lang: Lang;
  cheminFr: string;
  cheminEn: string;
  titre: string;
  description: string;
  image?: string;
  noindex?: boolean;
  /** Titre autoportant : ne reçoit pas le suffixe du template. */
  titreAbsolu?: boolean;
}): Metadata {
  const { lang, cheminFr, cheminEn, titre, description, image, noindex, titreAbsolu } = opts;
  const chemin = lang === "fr" ? cheminFr : cheminEn;
  const ogImage = image ?? "/images/facade-demeure-caux.jpg";

  return {
    title: titreAbsolu ? { absolute: titre } : titre,
    description,
    alternates: {
      canonical: abs(chemin),
      languages: {
        fr: abs(cheminFr),
        en: abs(cheminEn),
        "x-default": abs(cheminFr),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.nom,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      url: abs(chemin),
      title: titre,
      description,
      images: [{ url: abs(ogImage), width: 1200, height: 630, alt: SITE.nom }],
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: [abs(ogImage)],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Raccourci pour une page identifiée par sa clé de route. */
export function metaRoute(
  cle: RouteKey,
  lang: Lang,
  titre: string,
  description: string,
  image?: string,
  titreAbsolu?: boolean,
): Metadata {
  return metaPage({
    lang,
    cheminFr: ROUTES[cle].fr,
    cheminEn: ROUTES[cle].en,
    titre,
    description,
    image,
    titreAbsolu,
  });
}

export function metaLogement(
  id: LogementId,
  lang: Lang,
  titre: string,
  description: string,
  image?: string,
): Metadata {
  return metaPage({
    lang,
    cheminFr: `${ROUTES.chambres.fr}/${LOGEMENT_SLUGS[id].fr}`,
    cheminEn: `${ROUTES.chambres.en}/${LOGEMENT_SLUGS[id].en}`,
    titre,
    description,
    image,
  });
}

export { abs };

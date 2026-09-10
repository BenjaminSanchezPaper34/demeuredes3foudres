import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ROUTES, LOGEMENT_SLUGS, type RouteKey } from "@/lib/routes";

/**
 * Sitemap avec alternances de langue. Généré depuis la table des routes :
 * une page ajoutée à ROUTES y apparaît sans intervention.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (c: string) => `${SITE.url}${c === "/" ? "" : c}`;
  const maj = new Date();

  const priorites: Partial<Record<RouteKey, number>> = {
    accueil: 1,
    chambres: 0.9,
    tarifs: 0.9,
    bainsJaponais: 0.8,
    leChai: 0.8,
    laDemeure: 0.7,
    acces: 0.7,
    environs: 0.6,
    reserver: 0.6,
    contact: 0.6,
    mentionsLegales: 0.2,
    confidentialite: 0.2,
  };

  const pages = (Object.keys(ROUTES) as RouteKey[]).flatMap((cle) =>
    (["fr", "en"] as const).map((lang) => ({
      url: abs(ROUTES[cle][lang]),
      lastModified: maj,
      priority: priorites[cle] ?? 0.5,
      alternates: {
        languages: { fr: abs(ROUTES[cle].fr), en: abs(ROUTES[cle].en) },
      },
    })),
  );

  const logements = Object.values(LOGEMENT_SLUGS).flatMap((slugs) =>
    (["fr", "en"] as const).map((lang) => ({
      url: abs(`${ROUTES.chambres[lang]}/${slugs[lang]}`),
      lastModified: maj,
      priority: 0.85,
      alternates: {
        languages: {
          fr: abs(`${ROUTES.chambres.fr}/${slugs.fr}`),
          en: abs(`${ROUTES.chambres.en}/${slugs.en}`),
        },
      },
    })),
  );

  return [...pages, ...logements];
}

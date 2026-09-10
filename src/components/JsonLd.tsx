import { SITE, adresseUneLigne, type Lang } from "@/lib/site";
import { ROUTES, urlLogement, type LogementId } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { abs } from "@/lib/seo";

/** Rend un bloc JSON-LD. Un seul composant, pour ne pas éparpiller la sérialisation. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu vient de nos propres constantes, jamais d'une saisie utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const adressePostale = {
  "@type": "PostalAddress",
  streetAddress: SITE.adresse.rue,
  addressLocality: SITE.adresse.ville,
  postalCode: SITE.adresse.codePostal,
  addressRegion: SITE.adresse.region,
  addressCountry: SITE.adresse.pays,
};

/**
 * Fiche établissement — posée sur l'accueil.
 * `BedAndBreakfast` est le type le plus précis pour une maison d'hôtes ;
 * il hérite de LodgingBusiness et de LocalBusiness.
 */
export function ficheEtablissement(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    "@id": `${SITE.url}/#etablissement`,
    name: SITE.nom,
    alternateName: SITE.nomAlt,
    description: SITE.baseline[lang],
    url: abs(ROUTES.accueil[lang]),
    telephone: SITE.telephone,
    email: SITE.email,
    address: adressePostale,
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresseUneLigne)}`,
    image: [abs("/images/facade-demeure-caux.jpg"), abs("/images/bains-japonais-onsen.jpg")],
    numberOfRooms: LOGEMENTS.length,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.avis.note,
      reviewCount: SITE.avis.nombre,
      bestRating: 5,
    },
    amenityFeature: [
      "Couloir de nage",
      "Bains japonais",
      "Salle de réception",
      "Billard",
      "Wi-Fi",
      "Climatisation",
      "Borne de recharge pour véhicule électrique",
      "Vélos à disposition",
      "Terrain de pétanque",
    ].map((nom) => ({ "@type": "LocationFeatureSpecification", name: nom, value: true })),
    sameAs: [SITE.reseaux.instagram, SITE.reseaux.facebook, ...SITE.citations],
  };
}

/** Fiche d'un logement — posée sur sa page. */
export function ficheLogement(id: LogementId, lang: Lang) {
  const l = LOGEMENTS.find((x) => x.id === id)!;
  return {
    "@context": "https://schema.org",
    "@type": l.chambres > 1 ? "Apartment" : "HotelRoom",
    "@id": `${abs(urlLogement(id, lang))}#logement`,
    name: l.nom[lang],
    description: l.accroche[lang],
    url: abs(urlLogement(id, lang)),
    image: l.photos.slice(0, 4).map((p) => abs(p.src)),
    occupancy: { "@type": "QuantitativeValue", maxValue: l.capacite, unitText: "person" },
    floorSize: { "@type": "QuantitativeValue", value: l.surface, unitCode: "MTK" },
    numberOfRooms: l.chambres,
    amenityFeature: l.equipements.map((e) => ({
      "@type": "LocationFeatureSpecification",
      name: e[lang],
      value: true,
    })),
    containedInPlace: { "@id": `${SITE.url}/#etablissement` },
  };
}

/** Fil d'Ariane. `elements` : [libellé, chemin] du plus général au plus précis. */
export function filAriane(elements: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map(([nom, chemin], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: nom,
      item: abs(chemin),
    })),
  };
}

/** Listing des logements — posé sur /chambres. */
export function listeLogements(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: lang === "fr" ? "Les chambres et l'appartement" : "Rooms and apartment",
    url: abs(ROUTES.chambres[lang]),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: LOGEMENTS.length,
      itemListElement: LOGEMENTS.map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: l.nom[lang],
        url: abs(urlLogement(l.id, lang)),
      })),
    },
  };
}

/** Questions fréquentes. */
export function faq(items: { q: string; r: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, r }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: r },
    })),
  };
}

/** Le chai comme lieu d'événement. */
export function ficheChai(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${abs(ROUTES.leChai[lang])}#lieu`,
    name: lang === "fr" ? "Le chai de la Demeure des Trois Foudres" : "The wine hall at Demeure des Trois Foudres",
    url: abs(ROUTES.leChai[lang]),
    address: adressePostale,
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    image: [abs("/images/chai-foudre-centenaire.jpg")],
    containedInPlace: { "@id": `${SITE.url}/#etablissement` },
  };
}

import { SITE, adresseUneLigne } from "@/lib/site";
import { ROUTES, urlLogement } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { abs } from "@/lib/seo";

/**
 * llms.txt — la fiche d'identité de la maison, lisible par un agent
 * conversationnel. Générée depuis les mêmes constantes que le site : elle ne
 * peut pas diverger du contenu réel.
 */
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const logements = LOGEMENTS.map(
    (l) =>
      `- **${l.nom.fr}** (${l.surface} m², ${l.capacite} personnes, ${l.chambres} chambre${
        l.chambres > 1 ? "s" : ""
      }) — ${l.accroche.fr}\n  ${abs(urlLogement(l.id, "fr"))}`,
  ).join("\n");

  const texte = `# ${SITE.nom}

> ${SITE.baseline.fr}. Maison d'hôtes dans une demeure vigneronne du XIXᵉ siècle au centre du village de Caux (Hérault), à 7 km de Pézenas. Deux chambres et un appartement indépendants, un couloir de nage, deux bains japonais creusés dans d'anciennes cuves à vin, et un chai transformé en salle de réception.

## Coordonnées

- Nom : ${SITE.nom} (aussi écrit « ${SITE.nomAlt} »)
- Adresse : ${adresseUneLigne}, France
- Téléphone : ${SITE.telephoneAffiche} (+33 7 77 23 46 80)
- Email : ${SITE.email}
- Site : ${SITE.url}
- Coordonnées GPS : ${SITE.geo.lat}, ${SITE.geo.lng}
- Avis : ${SITE.avis.note}/5 sur ${SITE.avis.nombre} avis Google

## Les logements

${logements}

## Ce qu'il y a sur place

- Couloir de nage en pierre de Pompignan, au milieu d'oliviers centenaires
- Deux bains japonais (onsen) aménagés dans d'anciennes cuves à vin en béton — ouverts toute l'année
- Un chai avec trois foudres centenaires en chêne de Russie, transformé en salle de réception
- Un cabinet de curiosités avec bibliothèque et billard français d'époque Napoléon III
- Terrain de pétanque, trois vélos de balade, borne de recharge pour voiture électrique
- Salle des petits-déjeuners

## Situation

- Pézenas : 7 km
- Cap d'Agde et ses plages : 25 km
- Lac du Salagou : 30 km
- Béziers : 30 km
- Sète et le bassin de Thau : 45 km
- Montpellier : 55 km
- Gares les plus proches : Agde et Béziers. Aéroports : Béziers-Cap d'Agde, Montpellier-Méditerranée.

## Réserver

La réservation se fait en direct sur le site, sans commission d'intermédiaire : ${abs(ROUTES.reserver.fr)}
Les tarifs et la durée minimum de séjour sont publiés sur ${abs(ROUTES.tarifs.fr)}

## Pages

- [Accueil](${abs(ROUTES.accueil.fr)}) — présentation de la maison d'hôtes, des logements et des prestations.
- [La demeure](${abs(ROUTES.laDemeure.fr)}) — histoire du lieu et rénovation menée avec l'architecte des Bâtiments de France.
- [Les chambres](${abs(ROUTES.chambres.fr)}) — les trois logements, leurs surfaces, capacités et équipements.
- [Bains japonais](${abs(ROUTES.bainsJaponais.fr)}) — les deux onsen creusés dans les anciennes cuves à vin.
- [Le chai](${abs(ROUTES.leChai.fr)}) — la salle de réception pour repas de famille, anniversaires et séminaires.
- [Tarifs](${abs(ROUTES.tarifs.fr)}) — les prix par logement et la durée minimum de séjour.
- [Accès](${abs(ROUTES.acces.fr)}) — comment venir, parking, borne de recharge, distances.
- [Caux et ses environs](${abs(ROUTES.environs.fr)}) — le village, Pézenas, le Salagou, Sète, les plages.
- [Contact](${abs(ROUTES.contact.fr)}) — formulaire, téléphone et adresse.

Version anglaise : ${abs(ROUTES.accueil.en)}

## Questions fréquentes

**Où se trouve la Demeure des Trois Foudres ?**
Au ${adresseUneLigne}, au centre du village de Caux dans l'Hérault, à 7 km de Pézenas.

**Combien de personnes peut-on accueillir ?**
Jusqu'à 8 personnes au total : deux chambres de 2 personnes et un appartement de 4 personnes.

**Est-ce moins cher de réserver en direct ?**
Oui. En direct, il n'y a pas de commission d'intermédiaire à payer : le prix affiché est celui que perçoit la maison.

**Y a-t-il une piscine ?**
Un couloir de nage en pierre, ouvert en saison. En hiver, ce sont les bains japonais qui prennent le relais.

Dernière mise à jour : ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(texte, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

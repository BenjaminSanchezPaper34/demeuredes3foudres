import type { Lang } from "@/lib/site";
import type { LogementId } from "@/lib/routes";
import type { NomIcone } from "@/components/Icone";

export type Texte = Record<Lang, string>;
/** Un équipement = un libellé bilingue + son icône maison (tuiles des fiches logement). */
export type Equipement = Texte & { icone: NomIcone };
export type Photo = { src: string; alt: Texte };

export type Logement = {
  id: LogementId;
  nom: Texte;
  /** Phrase courte : listing, cartes, OG description. */
  accroche: Texte;
  surface: number;
  capacite: number;
  chambres: number;
  /** Corps de texte, un paragraphe par entrée. Écrits par les propriétaires. */
  texte: Record<Lang, string[]>;
  equipements: Equipement[];
  photos: Photo[];
  /** Identifiant du logement dans Smoobu — renseigné à réception des accès. */
  smoobuId: number | null;
};

/** Équipements communs aux trois logements, pour éviter la divergence. */
const climatisation: Equipement = { fr: "Climatisation réversible", en: "Reversible air conditioning", icone: "clim" };
const wifi: Equipement = { fr: "Wi-Fi", en: "Wi-Fi", icone: "wifi" };
const wc: Equipement = { fr: "WC séparé", en: "Separate toilet", icone: "wc" };
const coffre: Equipement = { fr: "Coffre-fort", en: "Safe", icone: "coffre" };
const mursChauffants: Equipement = {
  fr: "Murs chauffants dans la salle d'eau",
  en: "Heated walls in the bathroom",
  icone: "murs-chauffants",
};

export const LOGEMENTS: Logement[] = [
  {
    id: "ecurie",
    nom: { fr: "L'Écurie", en: "The Stable" },
    accroche: {
      fr: "35 m² de plain-pied dans une ancienne écurie, avec baignoire et terrasse privative sous l'auvent.",
      en: "35 m² on the ground floor in a former stable, with a bathtub and a private terrace under the eaves.",
    },
    surface: 35,
    capacite: 2,
    chambres: 1,
    texte: {
      fr: [
        "La chambre Écurie se situe en rez-de-chaussée. Elle est vaste et agréable avec ses 35 m².",
        "Installée dans l'une des deux anciennes écuries, elle a gardé le charme de l'ancien et cet esprit hippique : poutres en bois, murs enduits, robinetterie d'origine, vasques posées dans les anciennes mangeoires. Une expérience unique.",
        "Sans oublier un petit extérieur sous l'auvent, devant la chambre, pour bouquiner et se relaxer au calme.",
      ],
      en: [
        "The Stable is a ground-floor room, generous and easy to live in with its 35 m².",
        "Set in one of the property's two former stables, it has kept the character of the old building and its equestrian spirit: timber beams, lime-plastered walls, original taps, and basins set into the old mangers. Something you won't find elsewhere.",
        "There is also a small private terrace under the eaves, right outside the room, for reading and unwinding in peace.",
      ],
    },
    equipements: [
      { fr: "Douche à l'italienne", en: "Walk-in shower", icone: "douche" },
      { fr: "Baignoire", en: "Bathtub", icone: "baignoire" },
      { fr: "Literie 160 premium pour 2 personnes", en: "Premium 160 cm bed for 2", icone: "lit" },
      mursChauffants,
      wc,
      climatisation,
      wifi,
      { fr: "Terrasse privative", en: "Private terrace", icone: "terrasse" },
      coffre,
    ],
    photos: [
      { src: "/images/ecurie-01.jpg", alt: { fr: "La chambre Écurie : lit sous les poutres, baignoire en îlot et fauteuil club en cuir", en: "The Stable: bed beneath the beams, freestanding bathtub and leather club chair" } },
      { src: "/images/ecurie-02.jpg", alt: { fr: "Détail de la chambre Écurie", en: "Detail of the Stable room" } },
      { src: "/images/ecurie-03.jpg", alt: { fr: "Vasque posée dans une ancienne mangeoire, chambre Écurie", en: "Basin set into a former manger, the Stable" } },
      { src: "/images/ecurie-04.jpg", alt: { fr: "Salle de bain de la chambre Écurie", en: "Bathroom of the Stable" } },
      { src: "/images/ecurie-05.jpg", alt: { fr: "Coin lecture de la chambre Écurie", en: "Reading corner of the Stable" } },
      { src: "/images/ecurie-06.jpg", alt: { fr: "Poutres et murs enduits de la chambre Écurie", en: "Beams and lime-plastered walls of the Stable" } },
      { src: "/images/ecurie-07.jpg", alt: { fr: "Robinetterie d'origine, chambre Écurie", en: "Original taps in the Stable" } },
      { src: "/images/ecurie-08.jpg", alt: { fr: "Terrasse privative sous l'auvent de la chambre Écurie", en: "Private terrace under the eaves of the Stable" } },
      { src: "/images/ecurie-09.jpg", alt: { fr: "Vue d'ensemble de la chambre Écurie", en: "Overall view of the Stable" } },
      { src: "/images/ecurie-10.jpg", alt: { fr: "Décoration chinée de la chambre Écurie", en: "Antique-market decor in the Stable" } },
      { src: "/images/ecurie-11.jpg", alt: { fr: "Détail de décoration, chambre Écurie", en: "Decorative detail, the Stable" } },
      { src: "/images/ecurie-12.jpg", alt: { fr: "Chambre Écurie de la Demeure des Trois Foudres à Caux", en: "The Stable at Demeure des Trois Foudres in Caux" } },
    ],
    smoobuId: null,
  },
  {
    id: "lingerie",
    nom: { fr: "La Lingerie", en: "The Linen Room" },
    accroche: {
      fr: "24 m² dans l'ancienne lingerie de la propriété, une ambiance 1900 et un cocon à deux pas du couloir de nage.",
      en: "24 m² in the property's former linen room — a 1900s cocoon, steps from the swimming lane.",
    },
    surface: 24,
    capacite: 2,
    chambres: 1,
    texte: {
      fr: [
        "Aménagée dans la pièce autrefois dédiée au traitement du linge de la propriété, qui hébergeait aussi les ouvriers agricoles pendant la saison estivale, cette chambre de 24 m² séduit par son côté réconfortant.",
        "Tout y est réuni pour s'y sentir comme dans un cocon, dans une ambiance 1900. Une petite salle de douche originale vous surprendra par son agencement.",
        "Vous aurez tout loisir d'aller bouquiner près du couloir de nage, à l'ombre des oliviers ou des lauriers.",
      ],
      en: [
        "Set in the room once used for the estate's laundry — and which housed the farm workers through the summer season — this 24 m² room wins people over with its comforting feel.",
        "Everything here is arranged to make it a cocoon, in a turn-of-the-century atmosphere. The small shower room will surprise you with the way it has been laid out.",
        "And you are free to take a book down to the swimming lane, in the shade of the olive trees and the laurels.",
      ],
    },
    equipements: [
      { fr: "Douche extra-plate", en: "Low-profile shower", icone: "douche" },
      { fr: "Literie 160 premium pour 2 personnes", en: "Premium 160 cm bed for 2", icone: "lit" },
      mursChauffants,
      wc,
      climatisation,
      wifi,
      coffre,
    ],
    photos: [
      { src: "/images/lingerie-01.jpg", alt: { fr: "La chambre Lingerie, ambiance 1900", en: "The Linen Room, turn-of-the-century atmosphere" } },
      { src: "/images/lingerie-02.jpg", alt: { fr: "Lit de la chambre Lingerie", en: "Bed in the Linen Room" } },
      { src: "/images/lingerie-03.jpg", alt: { fr: "Salle de douche de la chambre Lingerie", en: "Shower room of the Linen Room" } },
      { src: "/images/lingerie-04.jpg", alt: { fr: "Détail de décoration, chambre Lingerie", en: "Decorative detail, the Linen Room" } },
      { src: "/images/lingerie-05.jpg", alt: { fr: "Coin bureau de la chambre Lingerie", en: "Desk corner of the Linen Room" } },
      { src: "/images/lingerie-06.jpg", alt: { fr: "Vue d'ensemble de la chambre Lingerie", en: "Overall view of the Linen Room" } },
      { src: "/images/lingerie-07.jpg", alt: { fr: "Mobilier chiné de la chambre Lingerie", en: "Antique furniture in the Linen Room" } },
      { src: "/images/lingerie-08.jpg", alt: { fr: "Chambre Lingerie de la Demeure des Trois Foudres à Caux", en: "The Linen Room at Demeure des Trois Foudres in Caux" } },
    ],
    smoobuId: null,
  },
  {
    id: "grenier",
    nom: { fr: "Le Grenier", en: "The Attic" },
    accroche: {
      fr: "70 m² sous les toits, deux chambres et une cuisine équipée : l'appartement pour quatre, en toute indépendance.",
      en: "70 m² under the roof, two bedrooms and a fitted kitchen: the apartment for four, entirely independent.",
    },
    surface: 70,
    capacite: 4,
    chambres: 2,
    texte: {
      fr: [
        "Ce vaste grenier à grain de 70 m² a été revisité intégralement et transformé en appartement d'hôtes, pour un week-end comme pour un séjour plus long. Il accueille jusqu'à quatre personnes avec ses deux chambres indépendantes de 14 m² chacune.",
        "Une salle de douche est partagée par les occupants des deux chambres. La cuisine aménagée vous permet de prendre vos repas sur place — rien ne vous empêche pour autant de prendre le petit-déjeuner avec les autres hôtes dans notre salle dédiée, avec supplément.",
        "L'appartement séduit par sa décoration vintage, qui balaie les années 50, 60, 70 et 80 et donne libre cours à notre passion pour la brocante et les antiquités.",
      ],
      en: [
        "This vast 70 m² grain attic has been entirely reworked into a guest apartment, for a weekend or a longer stay. It sleeps up to four across two independent 14 m² bedrooms.",
        "One shower room is shared between the two bedrooms. The fitted kitchen means you can eat in — though nothing stops you from joining the other guests for breakfast in our dedicated room, for a supplement.",
        "The apartment is defined by its vintage decor, sweeping across the fifties, sixties, seventies and eighties, and giving free rein to our passion for flea markets and antiques.",
      ],
    },
    equipements: [
      { fr: "Douche à l'italienne", en: "Walk-in shower", icone: "douche" },
      { fr: "Cuisine équipée", en: "Fitted kitchen", icone: "cuisine" },
      { fr: "Literie 160 premium pour 2 × 2 personnes", en: "Premium 160 cm beds for 2 × 2", icone: "lit" },
      mursChauffants,
      wc,
      climatisation,
      wifi,
      { fr: "Espace extérieur", en: "Outdoor space", icone: "jardin" },
      coffre,
    ],
    photos: [
      { src: "/images/grenier-01.jpg", alt: { fr: "L'appartement Le Grenier, décoration vintage", en: "The Attic apartment, vintage decor" } },
      { src: "/images/grenier-02.jpg", alt: { fr: "Chambre de l'appartement Le Grenier", en: "Bedroom in the Attic apartment" } },
      { src: "/images/grenier-03.jpg", alt: { fr: "Seconde chambre de l'appartement Le Grenier", en: "Second bedroom in the Attic apartment" } },
      { src: "/images/grenier-04.jpg", alt: { fr: "Salle de douche de l'appartement Le Grenier", en: "Shower room of the Attic apartment" } },
      { src: "/images/grenier-05.jpg", alt: { fr: "Cuisine équipée de l'appartement Le Grenier", en: "Fitted kitchen of the Attic apartment" } },
      { src: "/images/grenier-06.jpg", alt: { fr: "Coin repas de l'appartement Le Grenier", en: "Dining corner of the Attic apartment" } },
      { src: "/images/grenier-07.jpg", alt: { fr: "Salon vintage de l'appartement Le Grenier", en: "Vintage living room of the Attic apartment" } },
      { src: "/images/grenier-08.jpg", alt: { fr: "Mobilier des années 70, appartement Le Grenier", en: "Seventies furniture in the Attic apartment" } },
      { src: "/images/grenier-09.jpg", alt: { fr: "Détail de décoration, appartement Le Grenier", en: "Decorative detail, the Attic apartment" } },
      { src: "/images/grenier-10.jpg", alt: { fr: "Charpente de l'appartement Le Grenier", en: "Roof timbers of the Attic apartment" } },
      { src: "/images/grenier-11.jpg", alt: { fr: "Espace de vie de l'appartement Le Grenier", en: "Living space of the Attic apartment" } },
      { src: "/images/grenier-12.jpg", alt: { fr: "Appartement Le Grenier de la Demeure des Trois Foudres", en: "The Attic apartment at Demeure des Trois Foudres" } },
      { src: "/images/grenier-13.jpg", alt: { fr: "Espace extérieur de l'appartement Le Grenier", en: "Outdoor space of the Attic apartment" } },
      { src: "/images/grenier-14.jpg", alt: { fr: "Appartement Le Grenier à Caux, près de Pézenas", en: "The Attic apartment in Caux, near Pézenas" } },
    ],
    smoobuId: null,
  },
];

export const parId = (id: LogementId) => LOGEMENTS.find((l) => l.id === id)!;

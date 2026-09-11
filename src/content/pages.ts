import type { Lang } from "@/lib/site";

type T = Record<Lang, string>;
type TL = Record<Lang, string[]>;

/* ------------------------------------------------------------------ ACCUEIL */

export const ACCUEIL = {
  kicker: {
    fr: "Chambres d'hôtes · Caux, Hérault",
    en: "Bed & breakfast · Caux, Hérault",
  } as T,
  titre: {
    fr: "Une maison vigneronne du XIXᵉ, à 7 km de Pézenas",
    en: "A 19th-century wine-grower's house, 7 km from Pézenas",
  } as T,
  sousTitre: {
    fr: "Deux chambres et un appartement indépendants, un couloir de nage sous les oliviers, et deux bains japonais creusés dans les anciennes cuves à vin.",
    en: "Two rooms and an apartment, all independent, a swimming lane beneath the olive trees, and two Japanese baths carved into the old wine vats.",
  } as T,
  /** Encadré « L'essentiel » — c'est ce passage que citent les moteurs IA. */
  essentiel: {
    fr: [
      "Maison d'hôtes au centre du village de Caux (Hérault), à 7 km de Pézenas et 25 km des plages du Cap d'Agde.",
      "Trois logements indépendants : deux chambres de 2 personnes (24 et 35 m²) et un appartement de 70 m² pour 4 personnes.",
      "Couloir de nage, deux bains japonais dans d'anciennes cuves à vin, chai transformé en salle de réception, billard Napoléon III, vélos et borne de recharge électrique.",
    ],
    en: [
      "Guest house in the centre of the village of Caux (Hérault), 7 km from Pézenas and 25 km from the beaches of Cap d'Agde.",
      "Three independent places to stay: two rooms for 2 people (24 and 35 m²) and a 70 m² apartment for 4.",
      "Swimming lane, two Japanese baths set in former wine vats, a wine hall turned reception room, a Napoleon III billiard table, bicycles and an EV charging point.",
    ],
  } as TL,
  /** Le texte de l'ancien accueil, sous la vidéo — leurs mots, pas les nôtres. */
  motDesHotes: {
    fr: "Une belle Demeure, un chai viticole comportant Trois Foudres magnifiques, un coup de foudre pour le lieu. Un jardin, une cour majestueuse, une piscine pour l'été et des bains japonais pour l'hiver, des chambres confortables et originales… N'hésitez pas à venir à notre rencontre… Nous vous y attendons.",
    en: "A beautiful house, a wine hall holding three magnificent tuns — love at first sight. A garden, a stately courtyard, a pool for summer and Japanese baths for winter, comfortable, original rooms… Come and meet us. We'll be waiting for you.",
  } as T,
  hotes: {
    kicker: { fr: "Vos hôtes", en: "Your hosts" },
    nom: { fr: "Agnès et Jérôme", en: "Agnès and Jérôme" },
    texte: {
      fr: "Nous avons restauré cette demeure pendant plus d'un an, et nous y vivons. C'est nous qui vous accueillons — et elles aussi.",
      en: "We spent more than a year restoring this house, and we live here. We are the ones who welcome you — and so are they.",
    },
    mascottes: { fr: "Les mascottes de la maison", en: "The house mascots" },
    altCouple: { fr: "Agnès et Jérôme, vos hôtes", en: "Agnès and Jérôme, your hosts" },
    altMascottes: { fr: "Les deux chiens de la maison", en: "The house's two dogs" },
  },
  introTitre: {
    fr: "Une demeure, un chai, trois foudres",
    en: "A house, a wine hall, three tuns",
  } as T,
  intro: {
    fr: [
      "Une belle demeure, un chai viticole abritant trois foudres magnifiques, un coup de foudre pour le lieu. Une cour majestueuse, un jardin potager, une piscine pour l'été et des bains japonais pour l'hiver.",
      "Nos chambres d'hôtes vous accueillent dans un cadre typiquement languedocien : une cour pavée de pierre des Grands Causses, un couloir de nage en pierre de Pompignan au milieu d'oliviers centenaires et d'agrumes, et un chai dont les cuves en béton ont été réaménagées, avec ses foudres centenaires construits en chêne de Russie.",
    ],
    en: [
      "A fine old house, a wine hall sheltering three magnificent oak tuns, and a place we fell for on the spot. A stately courtyard, a kitchen garden, a pool for the summer and Japanese baths for the winter.",
      "Our guest rooms sit in a setting that could only be Languedoc: a courtyard paved in Grands Causses stone, a swimming lane in Pompignan stone among century-old olive trees and citrus, and a wine hall whose concrete vats have been reworked, with its century-old tuns built from Russian oak.",
    ],
  } as TL,
  renovationTitre: {
    fr: "Une année de chantier, avec l'architecte des Bâtiments de France",
    en: "A year of restoration, with the Architecte des Bâtiments de France",
  } as T,
  renovation: {
    fr: [
      "Pendant plus d'une année, nous avons rénové cette demeure et ses dépendances dans les règles de l'art, en collaboration avec l'architecte des Bâtiments de France : coloris historiques conservés, matériaux d'origine préservés — carreaux de ciment, parquets, enduits, menuiseries bois et serrurerie à l'ancienne.",
      "Avec, en dessous, tout le confort d'aujourd'hui : isolation thermique, climatisation gainable réversible, domotique et borne de chargement pour voiture électrique.",
      "Notre savoir-faire commun dans le bâtiment et notre passion pour la brocante, l'art et les souvenirs rapportés de nos voyages ont fait le reste : les deux chambres, l'appartement, et les deux pièces communes — la salle des petits-déjeuners et le cabinet de curiosités.",
    ],
    en: [
      "For more than a year we restored the house and its outbuildings properly, working with the Architecte des Bâtiments de France: historic colours kept, original materials preserved — cement tiles, timber floors, lime renders, wooden joinery and traditional ironwork.",
      "And underneath it all, the comfort you expect today: thermal insulation, ducted reversible air conditioning, home automation and an EV charging point.",
      "Our shared background in building work and our passion for flea markets, art and the things we bring back from our travels did the rest: the two rooms, the apartment, and the two shared spaces — the breakfast room and the cabinet of curiosities.",
    ],
  } as TL,
  extras: {
    fr: [
      "Un couloir de nage au milieu d'un jardin potager et d'un verger",
      "Des espaces de détente ombragés, au jardin et autour de la piscine",
      "Un terrain de pétanque",
      "Un cabinet de curiosités et sa bibliothèque, avec un billard français d'époque Napoléon III",
      "Trois vélos de balade mis à disposition",
      "Une borne de chargement pour voiture électrique",
    ],
    en: [
      "A swimming lane set between a kitchen garden and an orchard",
      "Shaded places to sit, in the garden and around the pool",
      "A pétanque court",
      "A cabinet of curiosities and its library, with a Napoleon III French billiard table",
      "Three bicycles at your disposal",
      "An EV charging point",
    ],
  } as TL,
  accueilToute: {
    fr: "Nous vous accueillons toute l'année : pour une nuit, un week-end, une ou plusieurs semaines.",
    en: "We welcome guests all year round: for a night, a weekend, a week or more.",
  } as T,
};

/* ------------------------------------------------------------- BAINS JAPONAIS */

export const BAINS = {
  titre: { fr: "Les bains japonais", en: "The Japanese baths" },
  sousTitre: {
    fr: "Deux onsen creusés dans les anciennes cuves à vin de la demeure.",
    en: "Two onsen carved into the property's former wine vats.",
  },
  essentiel: {
    fr: [
      "Deux bains japonais chauds, aménagés dans deux des anciennes cuves en béton du chai.",
      "Accessibles aux hôtes de la maison, toute l'année — c'est l'équipement d'hiver de la demeure, quand la piscine est fermée.",
      "Un espace bien-être unique dans le secteur de Pézenas et de l'Hérault.",
    ],
    en: [
      "Two heated Japanese baths, built inside two of the wine hall's former concrete vats.",
      "Open to guests of the house all year round — this is the winter counterpart to the pool.",
      "A wellness space with no equivalent in the Pézenas area.",
    ],
  },
  corps: {
    fr: [
      "Une cuve à vin, c'est une pièce close, épaisse, sans fenêtre, où la température ne bouge pas. Nous avons mis longtemps à comprendre ce qu'il fallait en faire — puis l'évidence est venue : un bain.",
      "Nous les avons créés de toutes pièces dans deux des anciennes cuves de la demeure. Mosaïque au fond, banquette de bois sur le pourtour, une seule lumière chaude, et la petite trappe ronde de la cuve laissée en place, devenue niche. Le silence y est total.",
      "C'est l'endroit où l'on descend en fin de journée, en hiver, quand le couloir de nage est fermé et que le soir tombe à cinq heures.",
    ],
    en: [
      "A wine vat is a closed, thick-walled, windowless room where the temperature never moves. It took us a long time to work out what to do with them — and then it became obvious: a bath.",
      "We built them from scratch inside two of the property's former vats. Mosaic underfoot, a wooden bench running round the edge, a single warm light, and the vat's small round hatch left where it was, now a niche. The silence is total.",
      "This is where you go at the end of the day in winter, when the swimming lane is closed and night falls at five.",
    ],
  },
};

/* -------------------------------------------------------------------- LE CHAI */

export const CHAI = {
  titre: { fr: "Le chai", en: "The wine hall" },
  sousTitre: {
    fr: "Une salle de réception sous les foudres centenaires, pour vos événements familiaux, amicaux ou professionnels.",
    en: "A reception room beneath century-old oak tuns, for family, private or corporate events.",
  },
  essentiel: {
    fr: [
      "Ancien chai viticole réaménagé en salle de réception, à Caux, à 7 km de Pézenas.",
      "Sous charpente apparente, avec les trois foudres d'origine en chêne de Russie et un bar.",
      "Pour les petits événements : repas de famille, anniversaires, séminaires et journées d'entreprise.",
    ],
    en: [
      "A former wine hall turned reception room, in Caux, 7 km from Pézenas.",
      "Exposed roof timbers, the three original Russian-oak tuns, and a bar.",
      "For smaller events: family meals, birthdays, seminars and company days.",
    ],
  },
  corps: {
    fr: [
      "Le chai est la pièce qui a donné son nom à la maison. Trois foudres en chêne de Russie, construits sur place il y a plus d'un siècle, trop grands pour être sortis un jour. Ils sont toujours là, contre le mur, sous la charpente.",
      "Nous en avons fait une salle de réception : le bar, le brasero, la longue table, et les foudres en toile de fond. On y fait des repas de famille, des anniversaires, des séminaires — et rien de ce qui s'y passe ne ressemble à une salle des fêtes.",
      "L'hébergement sur place permet aux invités de rester dormir. Nous étudions chaque demande au cas par cas, selon la date, le nombre de personnes et la formule souhaitée.",
    ],
    en: [
      "The wine hall is the room that gave the house its name. Three Russian-oak tuns, built on site more than a century ago, far too big ever to be taken out. They are still there, against the wall, under the roof timbers.",
      "We turned it into a reception room: the bar, the brazier, the long table, and the tuns as a backdrop. Family meals, birthdays, seminars — and nothing that happens here feels like a village hall.",
      "With rooms on site, your guests can stay the night. We look at each enquiry case by case, depending on the date, the number of people and what you have in mind.",
    ],
  },
};

/* --------------------------------------------------------------------- ACCÈS */

export const ACCES = {
  titre: { fr: "Venir à la demeure", en: "Getting here" },
  sousTitre: {
    fr: "Caux est au centre du triangle Pézenas – Béziers – Montpellier, à vingt minutes de la mer.",
    en: "Caux sits inside the Pézenas – Béziers – Montpellier triangle, twenty minutes from the sea.",
  },
  essentiel: {
    fr: [
      "10 avenue de Fontes, 34720 Caux — au centre du village, stationnement dans la cour.",
      "Pézenas 7 km · Béziers 30 km · Cap d'Agde 25 km · Montpellier 55 km · Lac du Salagou 30 km.",
      "Gares les plus proches : Agde et Béziers. Aéroports : Béziers-Cap d'Agde et Montpellier.",
    ],
    en: [
      "10 avenue de Fontes, 34720 Caux — in the centre of the village, parking in the courtyard.",
      "Pézenas 7 km · Béziers 30 km · Cap d'Agde 25 km · Montpellier 55 km · Lake Salagou 30 km.",
      "Nearest stations: Agde and Béziers. Airports: Béziers-Cap d'Agde and Montpellier.",
    ],
  },
  moyens: [
    {
      titre: { fr: "En voiture", en: "By car" },
      texte: {
        fr: "Caux est à quelques minutes des sorties de l'A75 et à vingt minutes de l'A9. Le stationnement se fait dans la cour de la demeure, et une borne de chargement pour voiture électrique est à disposition des hôtes.",
        en: "Caux is a few minutes from the A75 exits and twenty minutes from the A9. Parking is in the courtyard of the house, and an EV charging point is available to guests.",
      },
    },
    {
      titre: { fr: "En train", en: "By train" },
      texte: {
        fr: "Les gares d'Agde et de Béziers sont desservies par les TGV et les TER. Comptez une trentaine de minutes de route depuis l'une comme depuis l'autre. Prévenez-nous de votre horaire d'arrivée, nous vous indiquerons la solution la plus simple.",
        en: "Agde and Béziers stations are served by high-speed and regional trains, both around thirty minutes' drive away. Let us know your arrival time and we will point you to the easiest option.",
      },
    },
    {
      titre: { fr: "En avion", en: "By air" },
      texte: {
        fr: "L'aéroport de Béziers-Cap d'Agde est à trente minutes, celui de Montpellier-Méditerranée à cinquante. Les deux disposent de loueurs de voitures.",
        en: "Béziers-Cap d'Agde airport is thirty minutes away, Montpellier-Méditerranée fifty. Both have car rental desks.",
      },
    },
  ],
};

/* ------------------------------------------------------------------- ENVIRONS */

export type Lieu = {
  id: string;
  titre: T;
  distance: T;
  /** Photo de l'ancien site quand elle existe et que ses droits sont clairs ; sinon pas d'image. */
  image?: string;
  alt?: T;
  texte: T;
  /** Adresses recommandées par les propriétaires — c'est la valeur de cette page. */
  liens?: { t: string; u: string }[];
  /** Logos récupérés de l'ancien site, liés quand un site existe. */
  logos?: { src: string; alt: string; href?: string; sombre?: boolean }[];
};

export const ENVIRONS = {
  titre: { fr: "Caux et ses environs", en: "Caux and around" },
  sousTitre: {
    fr: "Un village en circulade au milieu des vignes, et tout l'Hérault à moins d'une heure.",
    en: "A circular village set among the vines, with all of the Hérault within an hour.",
  },
  essentiel: {
    fr: [
      "Caux : village en circulade au cœur des vignes, trois restaurants (Les Valseuses, Le Rex, Tête d'Anchois), commerces de proximité sur la circulade.",
      "Une vingtaine de domaines viticoles autour du village pour une balade œnotouristique.",
      "À moins d'une heure : Pézenas (7 km), le lac du Salagou (30 km), Béziers (30 km), les plages du Cap d'Agde et de Marseillan (25 km), Sète et le bassin de Thau (45 km), les Hauts Cantons.",
    ],
    en: [
      "Caux: a circular village in the heart of the vineyards, three restaurants (Les Valseuses, Le Rex, Tête d'Anchois), everyday shops around the circulade.",
      "Around twenty wine estates within reach of the village for a day of wine touring.",
      "Under an hour away: Pézenas (7 km), Lake Salagou (30 km), Béziers (30 km), the beaches of Cap d'Agde and Marseillan (25 km), Sète and the Thau lagoon (45 km), the Hauts Cantons.",
    ],
  },
  villageImage: "/images/village-de-caux.jpg",
  villageAlt: {
    fr: "Le village de Caux vu du ciel, sa circulade et son clocher au milieu des vignes",
    en: "The village of Caux from the air, its circular streets and bell tower among the vines",
  },
  village: {
    fr: [
      "Caux est un village languedocien en circulade, niché au cœur des vignes, à 7 km de Pézenas et à quelques minutes des trois sorties de l'A75. Le clocher et les ruelles concentriques en sont les deux traits marquants.",
      "Trois restaurants se partagent les styles et les budgets — Les Valseuses, bistro atypique ; Le Rex, restaurant traditionnel ; Tête d'Anchois, pizzeria fine — et l'on trouve sur la circulade tout ce qu'il faut au quotidien : boulangerie, boucher-traiteur, épicerie, pharmacie, tabac-presse et coiffeur. Une vingtaine de domaines viticoles entourent le village.",
    ],
    en: [
      "Caux is a Languedoc circulade — a village of concentric streets — set among the vines, 7 km from Pézenas and minutes from the three A75 exits. The bell tower and those ring-shaped lanes are what you notice first.",
      "Three restaurants between them cover the range of styles and budgets — Les Valseuses, an offbeat bistro; Le Rex, traditional cooking; Tête d'Anchois, fine pizza — and the circulade has everything you need day to day: bakery, butcher and deli, grocer, pharmacy, newsagent and hairdresser. Some twenty wine estates surround the village.",
    ],
  },
  villageLogos: [
    { src: "/images/logos/les-valseuses.jpg", alt: "Les Valseuses, bistro à Caux", href: "https://www.facebook.com/Les-valseuses-2515782651789476/" },
    { src: "/images/logos/mdl-matthieu-delauzun.jpg", alt: "MDL, Matthieu Delauzun, le bistrot", href: "https://www.facebook.com/profile.php?id=100087969219959" },
    { src: "/images/logos/tete-d-anchois.png", alt: "Tête d'Anchois, pizzeria-restaurant à Caux", href: "https://tetedanchois.fr" },
    { src: "/images/logos/ville-de-caux.jpg", alt: "Site officiel de la ville de Caux", href: "https://www.caux.fr" },
  ],
  lieux: [
    {
      id: "pezenas",
      titre: { fr: "Pézenas", en: "Pézenas" },
      distance: { fr: "7 km · 10 minutes", en: "7 km · 10 minutes" },
      image: "/images/pezenas-moliere.jpg",
      alt: { fr: "Statue de Molière à Pézenas", en: "Statue of Molière in Pézenas" },
      texte: {
        fr: "Ville de Molière, qui y fit ses armes avec l'Illustre Théâtre à partir de 1647 et y puisa Dom Juan, Tartuffe ou Monsieur de Pourceaugnac. Son centre est un secteur sauvegardé : hôtels particuliers des XVIIᵉ et XVIIIᵉ siècles, cours intérieures, rues pavées, et une tradition théâtrale bien vivante — visites théâtralisées, compagnies en résidence. L'avenue de Verdun aligne les antiquaires et les brocanteurs ; nos deux adresses pour chiner : Bistro Canaille et Rétro Tendance.",
        en: "Molière's town, where he learned his trade with the Illustre Théâtre from 1647 and found Dom Juan, Tartuffe and Monsieur de Pourceaugnac. The centre is a protected quarter: seventeenth- and eighteenth-century mansions, inner courtyards, cobbled streets, and a theatre tradition very much alive — dramatised tours, resident companies. Avenue de Verdun is lined with antique dealers and brocante shops; our two addresses for a hunt: Bistro Canaille and Rétro Tendance.",
      },
      logos: [
        { src: "/images/logos/antiquites-en-france.jpg", alt: "Antiquités en France", href: "https://www.antiquites-en-france.com" },
        { src: "/images/logos/retro-tendance.jpg", alt: "Rétro Tendance, mobilier et décoration vintage à Pézenas", href: "https://www.antiquites-en-france.com" },
      ],
    },
    {
      id: "salagou",
      titre: { fr: "Le lac du Salagou", en: "Lake Salagou" },
      distance: { fr: "30 km · 35 minutes", en: "30 km · 35 minutes" },
      image: "/images/lac-du-salagou.jpg",
      alt: { fr: "Le lac du Salagou et ses rives de ruffe rouge", en: "Lake Salagou and its red ruffe shores" },
      texte: {
        fr: "De l'eau au milieu d'une terre rouge : la ruffe, une roche ocre qui donne au lac ses couleurs improbables, et une richesse géologique presque unique. Vingt-huit kilomètres de rives à parcourir à pied ou en VTT, des criques pour se baigner, des loisirs nautiques, et une lumière qui ne ressemble à aucune autre dans l'Hérault.",
        en: "Water in the middle of red earth: ruffe, an ochre stone that gives the lake its improbable colours, and a geology almost without equal. Twenty-eight kilometres of shoreline to walk or ride, coves to swim from, water sports, and a light unlike anywhere else in the Hérault.",
      },
    },
    {
      id: "beziers",
      titre: { fr: "Béziers", en: "Béziers" },
      distance: { fr: "30 km · 35 minutes", en: "30 km · 35 minutes" },
      image: "/images/beziers.jpg",
      alt: { fr: "Béziers, le Pont Vieux et la cathédrale Saint-Nazaire au-dessus de l'Orb", en: "Béziers, the Pont Vieux and Saint-Nazaire cathedral above the Orb" },
      logos: [{ src: "/images/logos/beziers.png", alt: "Ville de Béziers" }],
      texte: {
        fr: "La plus ancienne ville de France avec Marseille, disent les fouilles. On y va pour le Pont Vieux et la cathédrale Saint-Nazaire qui dominent l'Orb, pour les neuf écluses de Fonseranes sur le canal du Midi — vingt et un mètres de dénivelé franchis en enfilade — et, à la mi-août, pour la féria.",
        en: "The oldest town in France alongside Marseille, the digs say. You go for the Pont Vieux and the Saint-Nazaire cathedral above the Orb, for the nine Fonseranes locks on the Canal du Midi — twenty-one metres of drop taken in one staircase — and, in mid-August, for the feria.",
      },
    },
    {
      id: "plages",
      titre: { fr: "Les plages du Cap d'Agde et de Marseillan", en: "The beaches of Cap d'Agde and Marseillan" },
      distance: { fr: "25 km · 30 minutes", en: "25 km · 30 minutes" },
      image: "/images/cap-d-agde-vue-aerienne.jpg",
      alt: { fr: "Le Cap d'Agde et son port vus du ciel", en: "Cap d'Agde and its marina from the air" },
      texte: {
        fr: "Rochelongue, la Tamarissière, le Môle, la Roquille, le Grau d'Agde, la baie de l'Amitié, Richelieu, la Plagette : les plages d'Agde vont de la sauvage à l'animée. Notre préférée, et de loin : la Grande Conque, une crique creusée dans la falaise volcanique, avec sa plage de sable noir et les rochers des Deux Frères. Pour du sable fin et de la place, Marseillan-Plage et ses six kilomètres, vingt minutes plus loin.",
        en: "Rochelongue, La Tamarissière, Le Môle, La Roquille, Le Grau d'Agde, the Baie de l'Amitié, Richelieu, La Plagette: Agde's beaches run from wild to lively. Our favourite by some distance: the Grande Conque, a cove cut into the volcanic cliff, with its black sand beach and the Deux Frères rocks. For fine sand and room to spread out, Marseillan-Plage and its six kilometres, twenty minutes further on.",
      },
    },
    {
      id: "thau",
      titre: { fr: "Le bassin de Thau", en: "The Thau lagoon" },
      distance: { fr: "40 km · 45 minutes", en: "40 km · 45 minutes" },
      image: "/images/bassin-de-thau-tables-ostreicoles.jpg",
      alt: { fr: "Les tables ostréicoles sur l'étang de Thau", en: "Oyster tables on the Thau lagoon" },
      texte: {
        fr: "Le plus grand plan d'eau d'Occitanie, une mer intérieure bordée de petits ports — Marseillan, Mèze, Loupian, Bouzigues, Balaruc. Les tables ostréicoles y dessinent l'horizon comme un land art. On y va pour déguster des huîtres au bord de l'eau, dans les deux mas que nous aimons : les Demoiselles Dupuy à Bouzigues et l'Atelier & Co à Loupian.",
        en: "The largest body of water in Occitanie, an inland sea ringed with small ports — Marseillan, Mèze, Loupian, Bouzigues, Balaruc. The oyster tables draw the horizon like land art. You come here to eat oysters at the water's edge, at the two farms we love: Les Demoiselles Dupuy in Bouzigues and Atelier & Co in Loupian.",
      },
      logos: [
        { src: "/images/logos/les-demoiselles-dupuy.jpg", alt: "Les Demoiselles Dupuy, dégustation de coquillages à Bouzigues", href: "https://lesdemoisellesdupuy.com" },
        { src: "/images/logos/atelier-and-co.svg", alt: "Atelier & Co, dégustation d'huîtres à Loupian", href: "https://ateliernco.com", sombre: true },
      ],
    },
    {
      id: "sete",
      titre: { fr: "Sète", en: "Sète" },
      distance: { fr: "45 km · 50 minutes", en: "45 km · 50 minutes" },
      image: "/images/sete.jpg",
      alt: { fr: "Sète, ses canaux et son port", en: "Sète, its canals and its port" },
      logos: [{ src: "/images/logos/sete.png", alt: "Ville de Sète" }],
      texte: {
        fr: "L'île singulière, comme l'appelait Valéry, qui y est né — Brassens, Manitas de Plata et Jean Vilar aussi. La Venise du Languedoc pour ses canaux, un port de pêche en activité, le mont Saint-Clair au-dessus, et les joutes nautiques en été. On y monte pour la vue et on y redescend pour manger.",
        en: "The singular island, as Valéry called it — he was born here, and so were Brassens, Manitas de Plata and Jean Vilar. The Venice of Languedoc for its canals, a working fishing port, Mont Saint-Clair above it all, and water jousting in summer. You climb up for the view and come back down to eat.",
      },
    },
    {
      id: "hauts-cantons",
      titre: { fr: "Les Hauts Cantons", en: "The Hauts Cantons" },
      distance: { fr: "40 km · 45 minutes", en: "40 km · 45 minutes" },
      image: "/images/hauts-cantons.jpg",
      alt: { fr: "Village perché des Hauts Cantons de l'Hérault", en: "Hilltop village in the Hérault's Hauts Cantons" },
      texte: {
        fr: "L'arrière-pays, en moyenne montagne : le Caroux et l'Espinouse, l'Escandorgue, la Séranne, le sud du Larzac. Bédarieux en est la capitale officieuse ; Lodève, Olargues, Le Caylar, Saint-Pons-de-Thomières en sont les étapes. C'est le contrepoint de la plaine viticole — de la fraîcheur, des gorges, et des villages où il ne se passe rien.",
        en: "The back country, in the low mountains: the Caroux and Espinouse, the Escandorgue, the Séranne, the southern Larzac. Bédarieux is its unofficial capital; Lodève, Olargues, Le Caylar and Saint-Pons-de-Thomières the stops along the way. It is the counterpoint to the vineyard plain — cool air, gorges, and villages where nothing happens.",
      },
    },
  ] as Lieu[],
};

/* ------------------------------------------------------------------- CONTACT */

export const CONTACT = {
  titre: { fr: "Nous écrire", en: "Get in touch" },
  sousTitre: {
    fr: "Pour une question sur un séjour, une demande particulière ou la location du chai.",
    en: "For a question about a stay, a special request, or hiring the wine hall.",
  },
  champs: {
    nom: { fr: "Votre nom", en: "Your name" },
    email: { fr: "Votre email", en: "Your email" },
    telephone: { fr: "Votre téléphone (facultatif)", en: "Your phone (optional)" },
    sujet: { fr: "Sujet", en: "Subject" },
    message: { fr: "Votre message", en: "Your message" },
    envoyer: { fr: "Envoyer", en: "Send" },
    envoi: { fr: "Envoi…", en: "Sending…" },
    succes: {
      fr: "Merci, votre message est parti. Nous vous répondons rapidement.",
      en: "Thank you, your message has been sent. We will get back to you shortly.",
    },
    erreur: {
      fr: "L'envoi a échoué. Écrivez-nous directement à contact@demeuredestroisfoudres.fr ou appelez le 07 77 23 46 80.",
      en: "Sending failed. Please email contact@demeuredestroisfoudres.fr or call +33 7 77 23 46 80.",
    },
  },
  sujets: {
    sejour: { fr: "Un séjour", en: "A stay" },
    chai: { fr: "La location du chai", en: "Hiring the wine hall" },
    autre: { fr: "Autre chose", en: "Something else" },
  },
};

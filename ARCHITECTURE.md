# Demeure des Trois Foudres — arborescence & stack
Document de cadrage · 10/09/2026 · révisé après l'appel avec Claudie (conciergerie) · à valider avant DESIGN.md et avant tout code.

## 1. Constat sur l'existant

Site Muse 2018, 4 pages desktop + 4 pages `/phone/` en doublon.

| Point | État |
|---|---|
| Poids | 670 Ko de HTML sur l'accueil seule (tout inline) |
| Meta description | absente sur les 4 pages |
| Open Graph / Twitter card | absents |
| JSON-LD | absent |
| robots.txt | 404 |
| Sitemap | présent mais liste des images et des .mp4 comme des pages |
| URLs | `.html` + duplication `/phone/*` (contenu dupliqué) |
| Images | 123 fichiers, 10 Mo, **1000 px de large maximum** — inexploitables en rétina |
| Contenu `/activites` | passages recopiés mot pour mot de Wikipédia (Béziers, Sète, Hauts Cantons) |
| Réservation | lien sortant vers Booking, avec le `label=` d'affiliation Booking |
| Hébergement | Apache mutualisé, `last-modified` juillet 2025 |

Deux conséquences directes : **les photos sont à refaire ou à récupérer en original**, et **la page activités est à réécrire** (le copié-collé Wikipédia n'apporte rien en SEO et expose au duplicate content).

Ce qui est bon et se garde : les textes de présentation de la demeure et des 3 logements, écrits par les propriétaires, justes de ton et riches en détails concrets (carreaux ciment, foudres en chêne de Russie, mangeoires transformées en vasques). C'est la matière première du site.

## 2. Stack

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript sur Vercel | Pages statiques + trois route handlers serveur (formulaire, proxy Smoobu signé, contrôle). L'export statique pur est écarté : la clé Smoobu ne doit jamais partir dans le navigateur |
| Contenu | fichiers de données typés `content/*.ts` | Textes, logements, prestations, FAQ dans un seul endroit. **Les tarifs et les règles n'y sont pas** : ils viennent de l'API Smoobu (§4). Pas de CMS : pas de compte à maintenir, pas d'abonnement, pas de base à sauvegarder. Le client ne modifie rien — le CMS n'aurait aucun utilisateur |
| Styling | Tailwind + tokens du DESIGN.md | |
| Animations | GSAP + ScrollTrigger, Lenis, sobre | Maison d'hôtes : l'animation sert la photo, elle ne se montre pas |
| Polices | auto-hébergées (Fontshare ou `next/font`) | Aucun CDN de polices tiers (CNIL) |
| Images | `next/image`, AVIF + WebP, srcset | Nécessite les originaux |
| Hébergement | Vercel, domaine du client rattaché | |
| Réservation | iframe Smoobu **pour l'acte d'achat** + API Smoobu **pour tout ce qui s'affiche** | Voir §4 |
| Formulaire | route handler Next + Resend → `contact@demeuredestroisfoudres.fr` | Une clé API, pas de service externe à administrer |
| Mesure | Vercel Web Analytics + événements maison | Sans cookie, exempté de consentement |

Écarté : CMS headless (Sanity, Strapi), Wordpress, base de données. Aucun n'a d'utilisateur ici et chacun ajoute un compte, un coût et une surface de panne sur un forfait de maintenance à 250 €/mois.

## 3. Arborescence

```
/                             Accueil                        /en/
/la-demeure                   Histoire, rénovation, petit-déj /en/the-house
/chambres                     Les 3 hébergements (hub)        /en/rooms
  /chambres/l-ecurie          Chambre 35 m², 2 pers.          /en/rooms/the-stable
  /chambres/la-lingerie       Chambre 24 m², 2 pers.          /en/rooms/the-linen-room
  /chambres/le-grenier        Appartement 70 m², 4 pers.      /en/rooms/the-attic
/bains-japonais               Onsen dans les anciennes cuves  /en/japanese-baths
/le-chai                      Salle de réception (vente)      /en/the-wine-hall
/tarifs                       Grille complète par saison      /en/rates
/reserver                     Moteur Smoobu en pleine page    /en/book
/acces                        Comment venir, carte, recharge  /en/getting-here
/caux-et-ses-environs         Le village, Pézenas, coups de cœur /en/caux-and-around
/contact                                                      /en/contact
/mentions-legales
/confidentialite
```


**Pourquoi `/bains-japonais` en page à part** : c'est le seul élément du lieu qui n'existe nulle part ailleurs dans un rayon de 50 km. Deux onsen creusés dans d'anciennes cuves à vin, c'est une raison de venir, pas une ligne dans une liste d'équipements. Requête sans concurrence dans l'Hérault, et c'est l'argument qui fait choisir la Demeure plutôt que la maison d'hôtes d'à côté.

**Pourquoi `/le-chai` en page à part** : marché distinct (« salle de réception Pézenas », « lieu de séminaire Hérault », « location salle Caux »), acheteur distinct, saisonnalité distincte. Perdu dans une page prestations, il ne se vend pas.

**Phase 2, si le référencement prend** : guides de longue traîne (`/guides/week-end-salagou`, `/guides/visiter-pezenas`), qui captent la recherche d'inspiration en amont de la recherche d'hébergement.

### Arbitrages validés (10/09/2026)

**Bilingue FR + EN dès la v1.** Slugs anglais (`/en/rooms/the-stable`, pas `/en/chambres/l-ecurie`) : les mots de la requête doivent être dans l'URL. `hreflang` réciproque sur chaque paire, `x-default` sur le français, sitemap avec les alternances, JSON-LD par langue, moteur Smoobu passé en `locale=en`. Sélecteur de langue dans la nav, pas de redirection automatique par IP.
À assumer : chaque correction de contenu se fait deux fois. Les textes anglais sont à produire — traduction rédigée, pas automatique, sur des textes qui valent surtout par leur ton.

**Grille tarifaire complète affichée.** Prix par logement et par saison, ce qui est inclus, taxe de séjour, conditions d'annulation. Balisage `Offer` / `priceSpecification` dans le JSON-LD des logements : c'est ce que les moteurs IA citent quand on leur demande « combien coûte une chambre d'hôtes près de Pézenas ». Argument direct assumé sur la page : le même prix qu'ailleurs, sans commission. Devient bloquant — la grille est nécessaire avant la mise en ligne de `/tarifs`.

**`/le-chai` en page complète orientée vente.** Capacité, configurations (repas assis, cocktail, réunion), équipements, tarifs de location, disponibilité, formulaire de demande dédié distinct du formulaire de contact général. Schéma `EventVenue`. Cible « salle de réception Pézenas », « lieu de séminaire Hérault », « location salle Caux ». Nécessite les tarifs et conditions du chai.

## 4. Réservation : l'iframe vend, l'API affiche

### Le problème de l'iframe

Smoobu fournit un iframe (`BookingToolIframe.js`), paramétrable par logement (`?apartmentGroups[]=<id>`), avec une personnalisation CSS limitée. Il a deux défauts qui interdisent d'en faire la colonne vertébrale du site :

- **Il est invisible pour les moteurs.** Ni Google ni ChatGPT ni Perplexity ne lisent le contenu d'un iframe tiers. Un tarif qui n'existe que dans le moteur Smoobu n'existe pour personne d'autre que le visiteur qui a déjà cliqué. Or la moitié du plan de bataille consiste précisément à être cité par un agent conversationnel sur « combien coûte une chambre d'hôtes près de Pézenas ».
- **Il est lent et non maîtrisé graphiquement.**

### Le parti pris

**L'iframe sert à payer. L'API sert à afficher.** Smoobu expose une API en lecture (`GET /api/apartments`, `GET /api/rates` — qui renvoie prix *et durée minimum de séjour par date et par logement*, `POST /booking/checkApartmentAvailability`).

Conséquence directe : **aucune règle de réservation, aucun tarif n'est écrit en dur dans le site.** Le channel manager est la source de vérité, le site est un miroir. C'est exactement la garantie que demande Claudie, et c'est aussi ce qui rend les prix lisibles par Google et par les IA.

1. **`/tarifs` est généré depuis l'API**, rendu côté serveur, revalidé toutes les heures. Les prix sont du vrai HTML : indexables, citables, lisibles sans JavaScript.
2. **Les règles affichées viennent de l'API** — minimum de nuits, horaires d'arrivée et de départ, fenêtre de réservation. Si le paramétrage Smoobu change, le site change. Il ne peut pas mentir.
3. **CTA maison partout**, aux tokens du site. L'iframe n'apparaît qu'au clic (tiroir) ou sur `/reserver`, pré-filtré sur le bon logement.
4. **Chargement à la demande** — le script Smoobu ne pèse jamais sur le LCP de l'accueil.
5. **Repli** — si le script tombe, téléphone et email restent visibles. On ne perd pas le visiteur sur un cadre blanc.

Authentification : **HMAC** (`X-API-Key` / `X-Timestamp` / `X-Nonce` / `X-Signature`). L'ancienne authentification par simple `Api-Key` est dépréciée **fin septembre 2026**, c'est-à-dire ce mois-ci — on part directement en HMAC, jamais en legacy. La clé vit dans les variables d'environnement Vercel et ne quitte jamais le serveur.

### `/controle` — la page pour Claudie

Une page protégée et `noindex`, qui lit l'API et affiche, en clair :

- les règles réellement appliquées par Smoobu aujourd'hui, logement par logement ;
- **la comparaison avec les règles convenues** (2 nuits minimum, départ 11 h, arrivée 16 h – 17 h, réservation jusqu'à ~4 h avant l'arrivée, pas de délai entre deux séjours), avec un signalement visible dès qu'un écart apparaît ;
- les blocages en cours et les réservations à venir sur 30 jours.

Claudie n'est pas contre les channel managers, elle est échaudée par des paramétrages non respectés et des doubles réservations. On ne la convaincra pas par un argumentaire : on lui donne un écran où elle vérifie en dix secondes que l'outil fait ce qu'on lui a dit de faire. Coût : une page qui lit une API. Bénéfice : la personne qui tient les réservations cesse de travailler à l'aveugle.

Un contrôle mensuel automatisé peut ensuite reprendre cette même comparaison dans le rapport de maintenance.

### Le point de friction à nommer

Réservation possible jusqu'à ~4 h avant l'arrivée **et** blocage manuel le matin même en haute saison : c'est précisément le scénario qui produit un chevauchement. Un client peut réserver à 12 h pour 16 h alors que la chambre vient d'être bloquée.

Le risque n'existe que si le blocage se fait ailleurs que dans Smoobu. S'il est fait dans Smoobu, il se propage immédiatement et aucune réservation ne peut passer. D'où une règle d'exploitation à acter avec Claudie, indépendante du site : **tout blocage passe par Smoobu, jamais par un planning parallèle.** La page `/controle` affiche les blocages du jour, ce qui rend la règle vérifiable au lieu d'être déclarative.

### Prix direct : ce qu'on peut afficher et ce qu'on ne peut pas

Le prix direct sera inférieur au prix plateforme (≈ 17 % de commission économisée) et légèrement supérieur au net encaissé aujourd'hui. Il faut rendre l'avantage visible — mais il y a deux garde-fous :

- **Pas de faux prix barré.** Afficher un « prix plateforme » barré qu'on ne contrôle pas est une pratique commerciale trompeuse, et une comparaison avec un concurrent non nommé mais identifiable tombe sous le régime de la publicité comparative (elle doit être vérifiable). On affiche donc le **mécanisme**, pas un chiffre inventé : « Le meilleur tarif est ici. En direct, il n'y a pas de commission d'intermédiaire à payer. »
- **Éviter « garanti ».** « Meilleur prix garanti » est un engagement contractuel opposable. « Le meilleur prix est ici, en direct » dit la même chose sans créer l'obligation.
- **Le badge Booking** (Traveller Review Awards 2023, 9,7/10) est repris **en texte**, à côté de la note Google, jamais avec le logo (décision Benjamin, 10/09/2026). Ce n'est pas une comparaison de prix : c'est une preuve d'avis, et elle est vraie.

À vérifier avant la remise en route de Booking : la **clause de parité tarifaire** du contrat. Elle est aujourd'hui largement caduque en Europe, mais elle se lit dans le contrat, pas dans un article de presse. Point signalé une fois, arbitrage au client.

## 5. SEO

**Cibles principales** — `chambre d'hôtes Caux`, `maison d'hôtes Pézenas`, `chambre d'hôtes Hérault`, `chambre d'hôtes près de Pézenas`.
**Cibles secondaires** — `bains japonais Hérault`, `onsen France`, `salle de réception Pézenas`, `maison d'hôtes avec piscine Hérault`, `où dormir près du Salagou`.

- JSON-LD : `BedAndBreakfast` sur l'accueil (adresse, geo, téléphone, `hasMap`, `sameAs`, `amenityFeature`), `Accommodation` par logement, `BreadcrumbList`, `FAQPage` sur `/tarifs` et `/acces`.
- Redirections 301 depuis les anciennes URLs, **y compris `/phone/*`** — c'est la moitié de l'historique d'indexation.
- `llms.txt`, `robots.txt` autorisant explicitement GPTBot, ClaudeBot, PerplexityBot et consorts.
- NAP identique partout : Demeure des Trois Foudres · 10 avenue de Fontes, 34720 Caux · 07 77 23 46 80.
- Search Console + Bing Webmaster + IndexNow à la mise en ligne.

**Recherche de marque et agents conversationnels.** Le parcours réel décrit par Claudie : le visiteur découvre le lieu sur une plateforme, puis cherche le site en direct pour comparer — de plus en plus souvent en passant par une IA. Deux conséquences opérationnelles :

- **Le SERP de marque doit être tenu.** Le nom circule sous deux formes, « Demeure des Trois Foudres » et « Demeure des 3 Foudres ». Les deux dans le JSON-LD (`name` + `alternateName`), une seule dans les titres, et `sameAs` vers Google, Instagram, Facebook et les annuaires où la maison est déjà listée (bedandbreakfast.eu, chambres-hotes.fr, cybevasion, mappy).
- **Les tarifs doivent être en clair dans le HTML.** C'est la raison technique de l'architecture du §4 : un agent conversationnel ne peut pas répondre « à partir de X € » s'il n'y a qu'un iframe. `llms.txt` reprend les tarifs, les règles de séjour et l'adresse.

**Contenu orienté périodes creuses.** Le tableau de fréquentation de Claudie sur deux ans sert à deux choses : hiérarchiser les logements sur `/chambres` selon leur performance réelle plutôt que selon leur surface, et cibler l'éditorial sur les mois qui se remplissent mal (vendanges, hors-saison, ponts de printemps) plutôt que sur juillet-août qui se vend seul.

**À dire à Jérôme, franchement** : le site ne remplacera pas Booking à lui seul, et il faut cesser de compter sur les plateformes à court terme. Airbnb n'a produit qu'une à deux réservations, Booking est bloqué en vérification sans date. Il ne reste que deux canaux : **le site et la fiche Google Business Profile**. C'est la fiche qui répond à « chambre d'hôtes Pézenas » dans le pack local ; c'est le site qui convertit et qui ne prend pas de commission. Les deux se travaillent ensemble, la fiche mérite d'être dans le lot livré.

**L'actif de réassurance existe déjà** : 4,9 / 5 sur 19 avis Google, 9,8 / 10 sur bedandbreakfast.eu. Les avis Booking ne se récupèrent pas, mais 19 avis Google est un socle mince pour une page d'accueil qui doit convaincre seule — une relance des clients des deux dernières saisons pour monter vers 40 est l'action la moins chère et la plus rentable du projet.

## 6. L'accueil doit convertir seule

Sans notoriété de plateforme en amont, la page d'accueil ne bénéficie d'aucune confiance héritée. Le visiteur arrive par le nom ou par une recherche locale, et décide sur cette page. Ce qui doit y être, dans cet ordre :

1. **Où, quoi, combien** — Caux, près de Pézenas ; deux chambres et un appartement ; à partir de X € la nuit. Visible sans défiler.
2. **La preuve** — la note Google et le nombre d'avis, extraits d'avis réels, remontés haut et non enterrés en pied de page.
3. **La photo** — c'est le premier argument d'une maison d'hôtes, ce qui rend les originaux haute résolution bloquants et non négociables.
4. **Ce que personne d'autre n'a** — les bains japonais, le chai, le billard Napoléon III, le couloir de nage. Pas une liste d'équipements : trois raisons de venir ici plutôt qu'ailleurs.
5. **Un humain joignable** — téléphone en clair, cliquable, présent en permanence. Une maison d'hôtes se réserve encore beaucoup par téléphone, et c'est un signal de confiance que n'a aucune plateforme.
6. **Le prix direct expliqué** — pas de commission d'intermédiaire, dans les termes du §4.

## 7. Ce qu'il faut obtenir avant de commencer

Bloquants :
1. **Photos originales en pleine résolution.** Celles du site font 1000 px. Les fichiers `ben000xx-dxo_deepprime` indiquent un shooting pro avec des RAW quelque part — les récupérer.
2. **Tarifs** par logement et par saison, taxe de séjour, conditions d'annulation, horaires d'arrivée et de départ, supplément petit-déjeuner pour Le Grenier.
3. **Accès Smoobu** : clé API en HMAC (Configuration → API), IDs des 3 logements, code d'intégration du moteur. Sans la clé, ni `/tarifs`, ni `/controle`, ni les règles affichées.
4. **Données société** pour les mentions légales : raison sociale, forme juridique, SIRET, directeur de la publication. Rien ne s'invente.
5. **Accès domaine et DNS** (registrar actuel) et accès à l'hébergement Apache existant.
6. **Tarifs et conditions de location du chai** (devenu bloquant : page orientée vente).
7. **Traduction anglaise** des textes de présentation — à rédiger, pas à passer dans un traducteur.

Non bloquants mais à cadrer :
8. Qui reçoit les demandes du formulaire — Jérôme ou Claudie ? Et les demandes chai, même destinataire ?
9. La vidéo `video-3froudres2025.mp4` : la récupérer en source.
10. Les avis Booking ne se récupèrent pas. Relance des clients des deux dernières saisons vers la fiche Google — objectif 40 avis.
11. Le tableau de fréquentation de Claudie sur 2 ans (récupération en cours) : hiérarchie des logements et calendrier éditorial hors saison.
12. Accord de Claudie sur la règle d'exploitation « tout blocage passe par Smoobu » (§4).

## 8. Étapes

1. Validation de ce document.
2. ~~Arbitrages~~ — tranchés le 10/09/2026 (bilingue, grille complète, chai en page de vente).
3. `DESIGN.md` — direction artistique, à valider avant la première ligne de code.
4. Build section par section.
5. Vérification (checklist studio) puis bascule DNS.

# DESIGN.md — Demeure des Trois Foudres · Caux (Hérault)

**Secteur** : maison d'hôtes / hébergement de charme
**Personnalité en 3 mots** : chinée, matiérée, sans façon
**Source de vérité marque** : AUCUNE charte existante. Un seul actif : le logo (`logo-3foudres.svg`, dessin au trait, noir `#1D1D1B`). Ce DESIGN.md est donc la première pierre d'une mini-charte Paper34 — livrable facturable à part si Jérôme veut l'étendre à l'imprimé.
**Références validées au kick-off** : ⚠️ **SEUL CHAMP NON REMPLI** — moodboard à monter avec Benjamin (recent.design + godly.design par fragment). Grammaire recherchée, pour cadrer la recherche : sites de maisons d'hôtes *éditoriaux* — photo pleine largeur en rapport 3:2 non recadrée, texte courant en colonne étroite décalée, filets fins plutôt que cartes ombrées, aucun aplat de couleur vive. Chercher du côté du print (catalogues de maisons de vente, brochures d'hôtels indépendants) plutôt que des templates hôteliers. **Ne pas coder le hero avant cette validation.**

---

## 0. Message — Pain · Person · Promise

**Person** — le couple ou la petite famille qui cherche où dormir entre Pézenas et le Salagou. Il a très souvent vu la maison sur une plateforme d'abord, et arrive ici **pour comparer**. Parfois il n'arrive même pas par Google mais par une IA à qui il a demandé où loger près de Pézenas.

**Pain** — il ne sait pas ce que ça vaut vraiment ni ce que ça coûte sans ouvrir un compte ailleurs ; et il redoute la chambre chez l'habitant, où l'on prend le petit-déjeuner en famille avec des inconnus.

**Promise** — *Une maison vigneronne du XIXᵉ à sept kilomètres de Pézenas : trois logements indépendants, un couloir de nage sous les oliviers, deux bains japonais creusés dans les anciennes cuves à vin.*

Déclinaisons de la Promise :
- **H1 accueil** : kicker « Chambres d'hôtes · Caux, Hérault » + titre « Une maison vigneronne du XIXᵉ, à 7 km de Pézenas »
- **Meta description** : « Chambres d'hôtes à Caux, près de Pézenas. Deux chambres et un appartement dans une demeure vigneronne : couloir de nage, bains japonais, réservation en direct. »
- **Encadré « L'essentiel » (GEO)** : les trois puces que citera un agent conversationnel — situation et distance à Pézenas, les 3 logements avec capacité et prix d'appel, les règles de séjour. Prix et règles **lus depuis l'API Smoobu**, jamais écrits à la main (cf. ARCHITECTURE.md §4).

Le mot **indépendants** fait beaucoup de travail : c'est la réponse directe au Pain, et c'est vrai (trois entrées séparées, un appartement avec cuisine).

---

## 1. Tokens couleurs

La palette est relevée sur les photos du lieu, pas choisie sur une roue chromatique. C'est ce qui empêchera le site de ressembler à une autre maison d'hôtes du Sud.

| Nom | Hex | Variable | Rôle (argumenté) |
|-----|-----|----------|------------------|
| Pierre | `#EFE9DE` | `--color-stone` | Fond de page. L'enduit à la chaux de la façade, pas un blanc. Un blanc pur rendrait les photos froides et la maison plus neuve qu'elle n'est. |
| Chaux | `#F8F4ED` | `--color-lime-wash` | Fond alterné. L'écart avec Pierre est volontairement ténu : les ruptures de section se font par la **photo pleine largeur** et par les sections Ardoise, pas par un damier de deux beiges. |
| Ardoise | `#2A2926` | `--color-slate` | Fond sombre : hero, `/le-chai`, `/bains-japonais`, footer. Le sol en lauze et les poutres noircies de l'Écurie. C'est la vraie rupture du système. |
| Chêne brûlé | `#241C15` | `--color-oak` | Texte principal. Brun très sombre, jamais `#000` : le noir pur sur de la chaux fait tache d'encre. |
| Taupe | `#5F584D` | `--color-taupe` | Texte secondaire, légendes de photo. |
| Sauge | `#8A9179` | `--color-sage` | Les volets de la façade. **Lavis d'ambiance : filets, séparateurs, icônes décoratives, survols. Jamais du texte, jamais un fond de section, jamais un CTA.** Son contraste sur Pierre est de 2,7 — il est structurellement incapable de porter de l'information, et c'est exactement pour ça qu'on le cantonne à la matière. |
| Lie de vin | `#6E2B2B` | `--color-lees` | **L'unique décision chromatique du système.** CTA, lien actif, prix, indicateur de nav. Nulle part ailleurs. C'est la couleur de la trappe ronde des cuves et de ce qui s'y faisait — la seule couleur saturée de tout le corpus photo qui ne soit ni le ciel ni le feuillage. |

**Règle d'inversion** : Lie de vin sur Ardoise est illisible (contraste < 2). Sur les sections sombres, le CTA s'inverse — fond Pierre, texte Chêne brûlé. **L'accent n'apparaît jamais sur fond sombre.** Une seule couleur de décision, deux traitements selon le fond.

Contrastes vérifiés : Chêne/Pierre 15:1 · Taupe/Pierre 6,3:1 · Lie/Pierre 7,9:1 · blanc/Lie 8,9:1 · Pierre/Ardoise 12:1.

---

## 2. Typographie

- **Fonctionnelle — Switzer** (Fontshare, kit offline auto-hébergé). Grotesque neutre mais tiède, sans la froideur d'Inter. Corps, nav, UI, tableaux de tarifs. Poids 400 / 500 / 600.
  **Licence vérifiée le 10/09/2026** : ITF Free Font License, usage commercial libre et illimité, auto-hébergement explicitement autorisé et recommandé (« Self-hosting by end users is permitted and recommended »). Fichier `Switzer-Variable.woff2` versionné dans `src/app/fonts/`.
- **Display — Fraunces** (Google, SIL Open Font License, auto-hébergée par `next/font` — aucun appel à fonts.googleapis.com au runtime). Droit d'apparaître **uniquement** : H1 du hero, titres de section, nom des trois logements, chiffres des tarifs. Jamais dans un paragraphe, jamais dans la nav, jamais dans un bouton.
  L'axe `WONK` est poussé légèrement (12 sur 100) sur les seuls H1 : c'est ce qui traduit « décoration soignée et **atypique** » sans tomber dans le serif d'hôtel générique. Le reste du site tient l'axe à 0.
- Tailles : corps `text-base` (16px) minimum, `text-lg` sur les textes de présentation des logements — ce sont des textes qu'on lit vraiment, ils méritent de l'air. `text-sm` plancher pour les légendes. `text-xs` réservé au copyright.
- Grands titres en `clamp()`. Interlignage large sur le courant (1.7) : le ton des textes des propriétaires est celui d'une lettre, pas d'une fiche produit.
- **Auto-hébergement obligatoire, aucun CDN de polices tiers (CNIL).**

---

## 3. Matière

- **Rayons** : 2px sur les boutons et les champs, 3px sur les encadrés. **0 sur les images.** Les photos sont des rectangles nets, comme des tirages posés sur la page — un coin arrondi sur une photo d'architecture, c'est la signature du template.
- **Ombres** : **teintées chêne brûlé**, jamais grises. `0 1px 2px rgba(36,28,21,.06)`, `0 12px 32px rgba(36,28,21,.10)` au survol des cartes. Une ombre grise neutre sur un fond beige vire au bleu sale.
- **Filets** : 1px Sauge à 40% — c'est le séparateur par défaut du site, avant toute carte et toute ombre.
- **Espacements** : sections `py-20` mobile / `py-32` desktop. Colonne de texte courant plafonnée à 62ch. Grilles `gap-6` / `gap-10`.
- **Grain** : oui, mais **uniquement sur les sections Ardoise** — un grain fin en overlay à 3-4% d'opacité, qui donne à l'aplat sombre la matière d'un enduit. Aucun grain sur les fonds clairs.

---

## 4. Animation

- **Tempo lent et feutré.** Reveals 0,8 à 1,1 s, `power2.out`. Une maison d'hôtes vend du calme : une animation vive ici est un contresens.
- **Au scroll (GSAP + ScrollTrigger)** : fade + `translateY(32px)`, stagger 0,12 s sur les grilles. Parallaxe légère (8% maximum) sur les photos pleine largeur, jamais sur le texte.
- **Ne bouge jamais** — et c'est une règle de fond, pas de confort : **les tarifs, les règles de séjour, le numéro de téléphone et la page `/controle`.** Tout ce que le visiteur doit croire reste immobile. Un prix qui apparaît en fondu est un prix qu'on regarde apparaître au lieu de le lire, et la moitié du projet consiste à rendre les prix crédibles sans intermédiaire.
- **Effet signature — l'ouverture des volets.** Au chargement de l'accueil, la photo du hero est déjà peinte ; deux panneaux Ardoise couvrant la moitié gauche et la moitié droite se retirent vers les bords en 1,1 s, comme les volets sauge de la façade qu'on pousse le matin. **Une seule fois, au chargement, sur l'accueil uniquement.** L'image étant peinte en dessous, le LCP n'est pas retardé. Coupé net en `prefers-reduced-motion`.
- **Scroll lock** : **un seul sur tout le site**, sur `/bains-japonais` — image fixe de l'onsen dans la cuve, le texte change au scroll (ScrollTrigger `pin + scrub`). Pas sur l'accueil : l'accueil doit convertir vite, pas retenir. Fallback empilé sur mobile, coupé en reduced-motion.
- **UI d'état (Motion)** : oui — tiroir de réservation Smoobu, lightbox photo, sélecteur de langue, menu mobile. Motion pour les sorties uniquement ; GSAP ne touche jamais ces éléments.
- **WebGL** : aucun sur le site, **à la seule exception de la signature Paper34** du footer (kit officiel, harnais standard : IntersectionObserver, coupé en pointer coarse et reduced-motion). Fumée à décliner sur les bleus Paper34 par défaut ; à tester en sauge sur l'Ardoise du footer, arbitrage Benjamin sur rendu.

---

## 5. Interdits de ce projet

- **Aucun dégradé**, sauf le fade de la nav mobile pour la safe area. Couleurs pleines uniquement.
- **Pas de glassmorphism**, pas de flou d'arrière-plan.
- **L'accent Lie de vin n'est jamais un fond de section**, et n'apparaît jamais sur fond sombre.
- **Sauge ne porte jamais de texte** ni de CTA.
- **Pas de boutons pill.** Le rayon 9999px est la signature visuelle du SaaS ; cette maison a 150 ans.
- **Pas de coins arrondis sur les photos.**
- **Aucune photo en noir et blanc.** Tout l'argument du lieu tient dans la couleur de ses matières : la chaux ocre, le vert des volets, le cuir fauve, le vert olive du canapé du Grenier. Les désaturer, c'est supprimer le produit.
- **Pas de carrousel automatique.** Les galeries défilent au geste ou au clic. Une photo qui part toute seule est une photo que le visiteur n'a pas choisi de regarder.
- **Aucun faux badge de réassurance** — pas de « meilleur prix garanti », pas de prix barré fabriqué (cf. ARCHITECTURE.md §4). La réassurance passe par la note Google réelle, les avis réels et le téléphone.
- **Aucune icône en aplat de couleur.** Lucide en trait, héritant de la couleur du texte.
- Toujours : esthétique template gratuit, presets ReactBits d'origine, deux moteurs d'animation sur un même élément.

---

## 6. Rappels de build

- Mobile d'abord : c'est là que se décide une réservation d'hébergement. Cibles ≥ 44px, `svh`/`dvh`, safe areas, téléphone cliquable en permanence.
- Un motif vu deux fois devient un composant. Aucun hex dans un composant : tout vient des tokens ci-dessus.
- Bilingue FR/EN : la typo doit tenir sur des titres anglais plus courts — vérifier les `clamp()` dans les deux langues avant validation.

---

## 6. Interface — décisions du 10/09/2026 (validées)

- **Icônes maison** (`src/components/Icone.tsx`, tracés dans `icones/traces.json`) : géométriques et sobres, grille 24, trait 1,5 px, bouts ronds, couleur héritée du texte. 43 icônes en six familles (navigation, contact, preuve, équipements, lieu, réseaux). **Plus aucune icône de bibliothèque sur le site.** Le lien au logo passe par le motif des trois foudres — bouton menu mobile, ornement devant chaque kicker de section, puce du hero — jamais par une imitation du trait à main levée.
- **Pictogramme** (`Marque.tsx`) : les trois foudres extraits du logo, seuls, en logo mobile. Le nom en toutes lettres est illisible sous 40 px de haut.
- **CTA** : 52 px de haut et pleine largeur au doigt, 44 px et largeur au contenu à partir de `sm`. Quatre variantes et pas une de plus : `plein` (lie-de-vin, fonds clairs), `ligne`, `clair` (Pierre sur Ardoise et sur photo), `voile` (filet Pierre sur photo). Flèche qui avance sur les actions qui mènent quelque part ; contraction à 0,98 à l'appui.
- **Barre de réservation fixe, mobile** : disponibilités + téléphone, apparaît une fois 60 % de la hauteur d'écran défilés, s'efface quand le tiroir Smoobu est ouvert. Fond Ardoise, donc CTA inversé en Pierre. Safe area respectée, réserve de 6,5 rem sous le pied de page.
- **Équipements** en tuiles icône + libellé, deux colonnes au doigt.
- **Formulaire** : champs 48 px, corps 16 px — pas de zoom iOS.

---
*Validé par Benjamin le : ____________*

# Audit de complétude — ancien site → nouveau site
10/09/2026 · diff systématique des 8 pages Muse (desktop + `/phone/`) contre les 15 pages du nouveau site : textes par recouvrement de fragments, liens externes, médias, coordonnées.

## Deux erreurs que j'avais introduites — corrigées

| Erreur | Où | Correction |
|---|---|---|
| **« Animaux non acceptés »** affirmé sans source (`petsAllowed: false` dans le JSON-LD, FAQ du `llms.txt`) | accueil, llms.txt | Retiré. La réponse est à demander à Jérôme **avant publication** : c'est une question fréquente. |
| **Photos de la demeure étiquetées comme des lieux** (la piscine en « lac du Salagou », le couloir du chai en « Sète »…) avec des `alt` faux | `/caux-et-ses-environs` | Remplacées par les photos de lieux de l'ancien site, `alt` descriptifs réels. Sète et Béziers restent **sans photo** (voir droits ci-dessous). |

## Manques comblés (faits de l'ancien site, sans arbitrage nécessaire)

- **Béziers** : entrée absente du nouveau site — ajoutée, en mots à nous (Pont Vieux, cathédrale Saint-Nazaire, écluses de Fonseranes, féria de la mi-août). L'ancien texte était du Wikipédia recopié : non repris.
- **Les trois restaurants de Caux nommés** : Les Valseuses (lien Facebook), Le Rex, Tête d'Anchois (lien). Ils étaient devenus « trois restaurants ».
- **Mairie de Caux** (caux.fr) : lien rétabli.
- **Pézenas** : les deux adresses pour chiner, **Bistro Canaille** et **Rétro Tendance** (lien Antiquités en France) ; Molière complété (Dom Juan, Tartuffe, Pourceaugnac), visites théâtralisées.
- **Bassin de Thau** : liens vers **Les Demoiselles Dupuy** et **Atelier & Co** rétablis ; Balaruc ajouté aux ports.
- **Plages d'Agde nommées** : Rochelongue, la Tamarissière, le Môle, la Roquille, le Grau d'Agde, baie de l'Amitié, Richelieu, la Plagette.
- **Hauts Cantons** : Lodève, Olargues, Le Caylar, Saint-Pons-de-Thomières, l'Espinouse ; Bédarieux en capitale officieuse.
- **Sète** : Manitas de Plata et Jean Vilar, « Venise du Languedoc ».
- **Salagou** : la richesse géologique, les loisirs nautiques.

## À arbitrer avant publication (Benjamin / Jérôme)

1. **Animaux acceptés ou non** — à répondre, puis à afficher dans la FAQ tarifs, le JSON-LD et le llms.txt.
2. **Les mascottes** — l'ancien accueil avait un bloc « Les mascottes » avec la photo des deux chiens (`les-mascottes.jpg`, récupérée, 236 × 270 px). Une maison d'hôtes avec ses chiens, ça se dit — et ça répond d'avance à la question 1. Bloc à créer sur `/la-demeure` si Jérôme le souhaite, avec une meilleure photo.
3. **« Avec notre partenaire, La conciergerie de Claudie »** — mention + logo (`claudie.jpg`) sur l'ancien accueil. Utile en confiance, mais peut brouiller le message « en direct ». Proposition : une ligne discrète sur `/contact` (« Les réservations sont gérées avec la conciergerie de Claudie »), pas sur l'accueil.
4. **Badge Booking.com Traveller Review Awards 2023 — 9,7/10** — c'est une vraie preuve, mais c'est la marque Booking sur un site dont tout l'argument est de s'en passer. Deux options : l'omettre, ou le reprendre en texte (« 9,7/10 · 200 avis Booking ») à côté de la note Google, sans logo. **Mon avis : le chiffre en texte, sans le logo.**
5. **La vidéo** — « La demeure en vidéo » a disparu. Deux sources locales : `video-3foudres.mp4` (2024, 7,7 Mo) et `video-3froudres2025.mp4` (2025, 115 Mo, à compresser à ~12 Mo en 1080p). Proposition : section sur `/la-demeure`, poster + lecture au clic, jamais en autoplay avec son.
6. **Le flux Instagram** — embarqué sur l'ancien accueil. C'est un script tiers : modèle opt-out Paper34 (actif par défaut, panneau de préférences). Les liens Instagram sont déjà dans le pied de page ; le flux est un plus, pas un manque.
7. **Le piano** — l'ancien texte annonçait « un piano viendra compléter » le cabinet de curiosités. Est-il arrivé ? Si oui, une ligne à ajouter.
8. **Photos de Sète et de Béziers** — celles de l'ancien site (`les-incontournables-de-sete-9221969.jpg`, `villedebeziers-compressed.jpg`) ont des noms de fichiers de blog ou de site municipal : droits non établis, **non réutilisées**. Il faut des photos à nous, ou un stock licencié.
9. **Résolution des photos de lieux** — les AdobeStock de 2018 récupérées font 919 × 334 px (bandeaux). Elles servent en bandeau 2:1, mais elles sont molles sur grand écran. À remplacer si le client fournit mieux ou si on relicencie en HD.
10. **Second lien Facebook** de la page activités (`profile.php?id=100087969219959`) : page non identifiée (Le Rex ? Tête d'Anchois ?). À demander.
11. **Logo « mdl »** (`316539785_…_n.jpg`) et `delauzun.webp` : marque non identifiée liée à la conciergerie ? À demander.

## Volontairement abandonné

- Lien **Booking** « Réserver votre séjour » (avec label d'affiliation) — remplacé par la réservation directe.
- **Apple Maps** → itinéraire Google Maps (événement `itineraire` tracé).
- **Textes Wikipédia** recopiés (Béziers, Sète, Hauts Cantons) — réécrits.
- Site **`/phone/`** en doublon — redirigé en 301 ; aucun contenu propre à la version mobile, vérifié.
- Compteurs de galerie, « GOODIES » → « La boutique » (lien Le Fagoteur conservé dans le pied de page).

## Vérifié conforme

Textes des trois logements et de la demeure (reformulés, tous les faits conservés : mangeoires, ouvriers agricoles, 2 × 14 m², petit-déjeuner avec supplément, chêne de Russie, Bâtiments de France, domotique, borne…), équipements, coordonnées (téléphone, email, adresse identiques), liens Instagram, Facebook de la demeure, Le Fagoteur, Paper34.

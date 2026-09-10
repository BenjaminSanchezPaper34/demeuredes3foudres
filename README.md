# Demeure des Trois Foudres — site

Maison d'hôtes à Caux (Hérault). Next.js 15, Tailwind 4, déployé sur Vercel.

Documents de référence, à lire avant toute modification :
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — arborescence, stack, doctrine de réservation
- [`DESIGN.md`](./DESIGN.md) — direction artistique, tokens, interdits

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis remplir
npm run dev
```

## Où se trouve quoi

| Besoin | Fichier |
|---|---|
| Adresse, téléphone, avis, réseaux (NAP) | `src/lib/site.ts` |
| Routes et slugs FR/EN | `src/lib/routes.ts` |
| Textes des logements | `src/content/logements.ts` |
| Textes des pages | `src/content/pages.ts` |
| Libellés d'interface | `src/content/ui.ts` |
| Couleurs, typo, matière | `src/app/globals.css` (`@theme`) |
| Redirections de l'ancien site Muse | `next.config.ts` |

## Deux règles à ne pas casser

**1. Les tarifs et les règles de séjour ne s'écrivent pas dans le code.**
Ils viennent de l'API Smoobu (`src/lib/smoobu.ts`), rendus côté serveur et
revalidés toutes les heures. Le channel manager est la source de vérité, le
site est un miroir. C'est la garantie donnée à la conciergerie, et c'est aussi
ce qui rend les prix lisibles par Google et par les agents conversationnels —
un iframe ne l'est pas.

**2. Aucune valeur en dur dans un composant.**
Couleurs, rayons, ombres et durées viennent des tokens de `globals.css`.
Un hex dans un composant est un bug.

## Bilingue

Français à la racine, anglais sous `/en` avec de vrais slugs anglais
(`/en/rooms/the-stable`). Deux layouts racines — `src/app/(fr)` et
`src/app/(en)` — pour que l'attribut `lang` du document soit juste ; tout le
reste est partagé dans `src/components/Coque.tsx`.

Ajouter une page = l'ajouter à `ROUTES` puis créer les deux fichiers de page.
Le sitemap et les `hreflang` suivent tout seuls.

## Ce qui attend le client

- Photos originales pleine résolution (celles en place font 1000 px)
- Clé API Smoobu et identifiants des logements (`smoobuId` dans `logements.ts`)
- Grille tarifaire, tarifs du chai
- Données société pour les mentions légales (marquées « à compléter »)

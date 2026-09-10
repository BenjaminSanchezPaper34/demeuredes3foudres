/**
 * Constantes de l'établissement.
 * NAP (nom, adresse, téléphone) : source unique, utilisée par les pages, le footer
 * et le JSON-LD. Doit rester STRICTEMENT identique aux fiches Google et Bing.
 */
export const SITE = {
  nom: "Demeure des Trois Foudres",
  nomAlt: "Demeure des 3 Foudres",
  baseline: {
    fr: "Chambres d'hôtes à Caux, près de Pézenas",
    en: "Bed & breakfast in Caux, near Pézenas",
  },
  url: "https://demeuredestroisfoudres.fr",
  adresse: {
    rue: "10 avenue de Fontes",
    codePostal: "34720",
    ville: "Caux",
    region: "Hérault",
    pays: "FR",
    paysNom: "France",
  },
  geo: { lat: 43.4869, lng: 3.3486 },
  telephone: "+33777234680",
  telephoneAffiche: "07 77 23 46 80",
  email: "contact@demeuredestroisfoudres.fr",
  reseaux: {
    instagram: "https://www.instagram.com/demeuredestroisfoudres/",
    facebook: "https://www.facebook.com/profile.php?id=100086142445640",
  },
  /** Annuaires où la maison est déjà référencée — alimente `sameAs` du JSON-LD. */
  citations: [
    "https://www.bedandbreakfast.eu/fr/a/8242930/demeure-des-trois-foudres/",
    "https://www.chambres-hotes.fr/chambres-hotes_demeure-des-trois-foudres_caux_h5338394.htm",
  ],
  /** Avis réels au 10/09/2026. À réactualiser à chaque revue mensuelle. */
  avis: { note: 4.9, nombre: 19, source: "Google" },
  boutique: "https://www.lefagoteur.com/collections/demeure-des-trois-foudres",
} as const;

export const adresseUneLigne = `${SITE.adresse.rue}, ${SITE.adresse.codePostal} ${SITE.adresse.ville}`;

export type Lang = "fr" | "en";

/**
 * Le site est-il en production sur son domaine définitif ?
 *
 * Tant que `SITE_EN_LIGNE` n'est pas posé à "1" dans les variables Vercel,
 * le site est en pré-production : `noindex` partout et robots.txt fermé.
 * Sinon l'URL technique .vercel.app se fait indexer et se met à concurrencer
 * le domaine du client.
 *
 * À basculer au moment de la mise en ligne, après le rattachement du domaine.
 */
export const EN_LIGNE = process.env.SITE_EN_LIGNE === "1";

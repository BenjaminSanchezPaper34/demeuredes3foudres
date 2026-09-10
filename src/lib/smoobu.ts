import { createHash, createHmac, randomUUID } from "node:crypto";

/**
 * Client de lecture de l'API Smoobu.
 *
 * Règle du projet (ARCHITECTURE.md §4) : le channel manager est la SOURCE DE
 * VÉRITÉ. Aucun tarif, aucune règle de séjour n'est écrit en dur dans le site.
 * Ce module est le seul endroit d'où ils peuvent venir.
 *
 * Authentification HMAC. L'ancienne authentification par simple `Api-Key` est
 * dépréciée depuis fin septembre 2026 : on ne l'utilise pas.
 *
 * Ce module est exclusivement serveur — la clé ne doit jamais atteindre le
 * navigateur.
 */
const BASE = "https://login.smoobu.com";
const CLE = process.env.SMOOBU_API_KEY;
const SECRET = process.env.SMOOBU_API_SECRET;

export const smoobuConfigure = () => Boolean(CLE && SECRET);

/** Chaîne canonique : METHOD\nPATH\nQUERY\nTIMESTAMP\nNONCE\nBODY_HASH\nAPI_KEY */
function signer(methode: string, chemin: string, query: string, horodatage: string, nonce: string) {
  const hashCorps = createHash("sha256").update("").digest("hex");
  const canonique = [methode, chemin, query, horodatage, nonce, hashCorps, CLE].join("\n");
  return createHmac("sha256", SECRET!).update(canonique).digest("base64");
}

async function lire<T>(chemin: string, params: Record<string, string | string[]> = {}, revalider = 3600): Promise<T | null> {
  if (!smoobuConfigure()) return null;

  // Les paramètres doivent être triés alphabétiquement dans la chaîne signée.
  const recherche = new URLSearchParams();
  for (const clef of Object.keys(params).sort()) {
    const valeur = params[clef];
    if (Array.isArray(valeur)) valeur.forEach((v) => recherche.append(clef, v));
    else recherche.append(clef, valeur);
  }
  const query = recherche.toString();
  const horodatage = new Date().toISOString();
  const nonce = randomUUID();

  try {
    const reponse = await fetch(`${BASE}${chemin}${query ? `?${query}` : ""}`, {
      headers: {
        "X-API-Key": CLE!,
        "X-Timestamp": horodatage,
        "X-Nonce": nonce,
        "X-Signature": signer("GET", chemin, query, horodatage, nonce),
        "Content-Type": "application/json",
      },
      next: { revalidate: revalider },
    });
    if (!reponse.ok) return null;
    return (await reponse.json()) as T;
  } catch {
    // Une API tierce indisponible ne doit jamais casser la page :
    // l'appelant affiche un repli honnête.
    return null;
  }
}

export type ApartmentSmoobu = {
  id: number;
  name: string;
  rooms?: { maxOccupancy?: number; bedrooms?: number };
  price?: { minimal?: number; maximal?: number; currency?: string };
  timeZone?: string;
};

/** Prix et durée minimum de séjour, par date et par logement. */
export type TarifsSmoobu = {
  data: Record<string, Record<string, { price: number | null; min_length_of_stay: number | null; available: number }>>;
};

export const listerLogements = () => lire<{ apartments: ApartmentSmoobu[] }>("/api/apartments");

export const detailLogement = (id: number) => lire<ApartmentSmoobu>(`/api/apartments/${id}`);

export function lireTarifs(ids: number[], debut: string, fin: string) {
  return lire<TarifsSmoobu>("/api/rates", {
    "apartments[]": ids.map(String),
    start_date: debut,
    end_date: fin,
  });
}

/** Date au format attendu par l'API (AAAA-MM-JJ). */
export const jour = (decalageJours = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + decalageJours);
  return d.toISOString().slice(0, 10);
};

/**
 * Synthèse par logement sur une fenêtre donnée : prix le plus bas constaté et
 * durée minimum de séjour appliquée. Rien n'est déduit ni arrondi — on ne
 * publie que ce que le channel manager renvoie.
 */
export type SyntheseTarif = {
  id: number;
  prixMini: number | null;
  nuitsMini: number | null;
  devise: string;
};

export function synthetiser(tarifs: TarifsSmoobu | null, ids: number[]): SyntheseTarif[] {
  if (!tarifs?.data) return [];
  return ids.map((id) => {
    const jours = Object.values(tarifs.data[String(id)] ?? {});
    const prix = jours.map((j) => j.price).filter((p): p is number => typeof p === "number" && p > 0);
    const nuits = jours
      .map((j) => j.min_length_of_stay)
      .filter((n): n is number => typeof n === "number" && n > 0);
    return {
      id,
      prixMini: prix.length ? Math.min(...prix) : null,
      nuitsMini: nuits.length ? Math.max(...nuits) : null,
      devise: "EUR",
    };
  });
}

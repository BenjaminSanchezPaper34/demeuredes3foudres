import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

/**
 * Réception du formulaire de contact.
 * Envoi via l'API REST de Resend, en fetch : pas de dépendance supplémentaire
 * à maintenir pour trois lignes d'appel HTTP.
 */
const CLE = process.env.RESEND_API_KEY;
const EXPEDITEUR = process.env.CONTACT_FROM ?? "site@demeuredestroisfoudres.fr";
const DESTINATAIRE = process.env.CONTACT_TO ?? SITE.email;

const echappe = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(requete: Request) {
  if (!CLE) {
    // Sans clé, on refuse proprement : le formulaire affiche le repli
    // (téléphone et email en clair) plutôt qu'un faux succès.
    return NextResponse.json({ erreur: "non configuré" }, { status: 503 });
  }

  let corps: Record<string, string>;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreur: "requête invalide" }, { status: 400 });
  }

  // Piège à robots : un humain ne remplit jamais ce champ.
  if (corps.site) return NextResponse.json({ ok: true });

  const { nom, email, telephone = "", sujet = "sejour", message } = corps;
  if (!nom || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ erreur: "champs manquants" }, { status: 400 });
  }

  const objets: Record<string, string> = {
    sejour: "Demande de séjour",
    chai: "Demande — location du chai",
    autre: "Message depuis le site",
  };

  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${CLE}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${SITE.nom} <${EXPEDITEUR}>`,
      to: [DESTINATAIRE],
      reply_to: email,
      subject: `${objets[sujet] ?? objets.autre} — ${nom}`,
      html: `
        <p><strong>${echappe(nom)}</strong> &lt;${echappe(email)}&gt;${
          telephone ? ` — ${echappe(telephone)}` : ""
        }</p>
        <p><em>${echappe(objets[sujet] ?? objets.autre)}</em></p>
        <hr>
        <p>${echappe(message).replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!reponse.ok) {
    return NextResponse.json({ erreur: "envoi impossible" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

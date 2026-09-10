"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import type { Lang } from "@/lib/site";
import { CONTACT } from "@/content/pages";
import { BoutonAction } from "./Bouton";

type Etat = "repos" | "envoi" | "ok" | "erreur";

const champ =
  "min-h-12 w-full rounded-fin border border-chene/25 bg-pierre px-4 py-3 text-base text-chene transition-colors placeholder:text-taupe/60 focus:border-lie focus:outline-none";

export default function Formulaire({ lang }: { lang: Lang }) {
  const params = useSearchParams();
  const [etat, setEtat] = useState<Etat>("repos");
  const c = CONTACT.champs;

  // Le lien « Demander une proposition » du chai arrive avec ?sujet=chai.
  const sujetInitial = params.get("sujet") === "chai" ? "chai" : "sejour";

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEtat("envoi");
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!reponse.ok) throw new Error();
      setEtat("ok");
      track("formulaire_envoye");
      form.reset();
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "ok") {
    return (
      <p className="border-l-2 border-lie bg-chaux px-6 py-6 text-lg leading-relaxed text-chene">
        {c.succes[lang]}
      </p>
    );
  }

  return (
    <form onSubmit={envoyer} className="space-y-4">
      {/* Piège à robots : invisible pour l'humain, rempli par les scripts. */}
      <input
        type="text"
        name="site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-taupe">{c.nom[lang]}</span>
          <input name="nom" required autoComplete="name" className={champ} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-taupe">{c.email[lang]}</span>
          <input type="email" name="email" required autoComplete="email" className={champ} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-taupe">{c.telephone[lang]}</span>
          <input type="tel" name="telephone" autoComplete="tel" className={champ} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-taupe">{c.sujet[lang]}</span>
          <select name="sujet" defaultValue={sujetInitial} className={champ}>
            <option value="sejour">{CONTACT.sujets.sejour[lang]}</option>
            <option value="chai">{CONTACT.sujets.chai[lang]}</option>
            <option value="autre">{CONTACT.sujets.autre[lang]}</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-taupe">{c.message[lang]}</span>
        <textarea name="message" required rows={6} className={champ} />
      </label>

      {etat === "erreur" && (
        <p className="border-l-2 border-lie bg-chaux px-5 py-4 text-base leading-relaxed text-chene">
          {c.erreur[lang]}
        </p>
      )}

      <BoutonAction type="submit" disabled={etat === "envoi"} fleche className="disabled:opacity-60">
        {etat === "envoi" ? c.envoi[lang] : c.envoyer[lang]}
      </BoutonAction>

      <p className="text-sm leading-relaxed text-taupe">
        {lang === "fr"
          ? "Vos données servent uniquement à répondre à votre demande. Elles ne sont ni revendues ni utilisées à des fins publicitaires."
          : "Your details are used only to answer your enquiry. They are never sold or used for advertising."}
      </p>
    </form>
  );
}

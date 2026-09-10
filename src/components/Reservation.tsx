"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icone } from "./Icone";
import { track } from "@vercel/analytics";
import { SITE, type Lang } from "@/lib/site";
import { UI } from "@/content/ui";
import { verrouScroll } from "@/lib/verrou";
import { Bouton } from "./Bouton";
import { route } from "@/lib/routes";

/**
 * Moteur de réservation Smoobu.
 *
 * Principe (ARCHITECTURE.md §4) : l'iframe sert à payer, jamais à afficher.
 * Il n'est donc PAS dans le flux de la page — il vit dans un tiroir, et son
 * script n'est chargé qu'au premier clic. Il ne pèse jamais sur le LCP.
 *
 * Les identifiants viennent des variables d'environnement : rien en dur.
 */
const ID_IFRAME = process.env.NEXT_PUBLIC_SMOOBU_IFRAME_ID;
const BASE_SMOOBU = "https://login.smoobu.com";

declare global {
  interface Window {
    BookingToolIframe?: {
      initialize: (o: { url: string; baseUrl: string; target: string }) => void;
    };
  }
}

type Contexte = { ouvrir: (smoobuId?: number | null) => void; ouvert: boolean };
const CtxReservation = createContext<Contexte | null>(null);

export function useReservation() {
  const ctx = useContext(CtxReservation);
  if (!ctx) throw new Error("useReservation hors de FournisseurReservation");
  return ctx;
}

export function FournisseurReservation({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [logement, setLogement] = useState<number | null>(null);

  const ouvrir = useCallback((smoobuId?: number | null) => {
    setLogement(smoobuId ?? null);
    setOuvert(true);
    track("reservation_ouverte", { logement: smoobuId ?? "tous" });
  }, []);

  // Un clic sur un CTA avant l'hydratation a mené à /reserver?ouvrir=… :
  // on tient la promesse en ouvrant le tiroir dès qu'on a la main.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (!q.has("ouvrir")) return;
    const id = Number(q.get("ouvrir"));
    ouvrir(Number.isFinite(id) && id > 0 ? id : null);
    window.history.replaceState(null, "", window.location.pathname);
  }, [ouvrir]);

  useEffect(() => {
    verrouScroll(ouvert);
    if (!ouvert) return;
    const auClavier = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", auClavier);
    return () => window.removeEventListener("keydown", auClavier);
  }, [ouvert]);

  return (
    <CtxReservation.Provider value={{ ouvrir, ouvert }}>
      {children}
      <AnimatePresence>
        {ouvert && (
          <Tiroir lang={lang} logement={logement} fermer={() => setOuvert(false)} />
        )}
      </AnimatePresence>
    </CtxReservation.Provider>
  );
}

function Tiroir({
  lang,
  logement,
  fermer,
}: {
  lang: Lang;
  logement: number | null;
  fermer: () => void;
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-chene/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={fermer}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={UI.reserver[lang]}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[560px] flex-col bg-pierre shadow-leve"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <header className="flex items-center justify-between border-b border-sauge/40 px-5 py-4">
          <h2 className="font-display text-xl">{UI.voirDisponibilites[lang]}</h2>
          <button
            onClick={fermer}
            aria-label={UI.fermer[lang]}
            className="flex h-11 w-11 items-center justify-center text-taupe transition-colors hover:text-lie"
          >
            <Icone nom="fermer" taille={22} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <MoteurSmoobu lang={lang} logement={logement} />
        </div>
        <Repli lang={lang} />
      </motion.aside>
    </>
  );
}

/** Charge le script Smoobu à la demande, et seulement une fois. */
function MoteurSmoobu({ lang, logement }: { lang: Lang; logement: number | null }) {
  const cible = useRef<HTMLDivElement>(null);
  const [etat, setEtat] = useState<"chargement" | "pret" | "absent" | "erreur">(
    ID_IFRAME ? "chargement" : "absent",
  );

  useEffect(() => {
    if (!ID_IFRAME || !cible.current) return;

    const url =
      `${BASE_SMOOBU}/${lang}/booking-tool/iframe/${ID_IFRAME}` +
      (logement ? `?apartmentGroups[]=${logement}` : "");

    const demarrer = () => {
      try {
        window.BookingToolIframe?.initialize({
          url,
          baseUrl: BASE_SMOOBU,
          target: "#moteur-smoobu",
        });
        setEtat("pret");
      } catch {
        setEtat("erreur");
      }
    };

    if (window.BookingToolIframe) {
      demarrer();
      return;
    }

    const script = document.createElement("script");
    script.src = `${BASE_SMOOBU}/js/Integration/BookingToolIframe.js`;
    script.async = true;
    script.onload = demarrer;
    script.onerror = () => setEtat("erreur");
    document.body.appendChild(script);
  }, [lang, logement]);

  return (
    <div>
      <div id="moteur-smoobu" ref={cible} className="min-h-[420px]" />
      {etat === "chargement" && (
        <p className="py-8 text-center text-sm text-taupe">
          {lang === "fr" ? "Chargement du calendrier…" : "Loading the calendar…"}
        </p>
      )}
      {(etat === "absent" || etat === "erreur") && (
        <p className="mesure py-6 text-base leading-relaxed text-taupe">
          {lang === "fr"
            ? "Le calendrier en ligne n'est pas disponible pour le moment. Appelez-nous ou écrivez-nous, nous vous répondons dans la journée."
            : "The online calendar is unavailable right now. Call or email us and we will reply the same day."}
        </p>
      )}
    </div>
  );
}

/**
 * Repli permanent : quoi qu'il arrive au script tiers, le visiteur a de quoi
 * joindre un humain. On ne le perd jamais sur un cadre blanc.
 */
function Repli({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-sauge/40 bg-chaux px-5 py-4">
      <p className="mb-3 text-sm text-taupe">
        {lang === "fr"
          ? "Une question avant de réserver ? Nous répondons directement."
          : "A question before booking? We answer in person."}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${SITE.telephone}`}
          onClick={() => track("tel", { depuis: "tiroir" })}
          className="inline-flex min-h-11 items-center gap-2 rounded-fin border border-chene/25 px-4 text-base transition-colors hover:border-lie hover:text-lie"
        >
          <Icone nom="telephone" taille={18} /> {SITE.telephoneAffiche}
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-fin border border-chene/25 px-4 text-base transition-colors hover:border-lie hover:text-lie"
        >
          <Icone nom="mail" taille={18} /> {UI.ecrire[lang]}
        </a>
      </div>
    </footer>
  );
}

/** CTA de réservation. Ouvre le tiroir, pré-filtré sur un logement si fourni. */
export function BoutonReserver({
  lang,
  smoobuId,
  variante = "plein",
  className,
  libelle,
  fleche,
  pleineLargeur,
}: {
  lang: Lang;
  smoobuId?: number | null;
  variante?: "plein" | "ligne" | "clair" | "voile";
  className?: string;
  libelle?: string;
  fleche?: boolean;
  pleineLargeur?: boolean;
}) {
  const { ouvrir } = useReservation();
  // Vrai lien : avant l'hydratation (ou sans JavaScript), il mène à la page
  // de réservation. Une fois React en place, le clic ouvre le tiroir.
  return (
    <Bouton
      href={`${route("reserver", lang)}?ouvrir=${smoobuId ?? 1}`}
      variante={variante}
      className={className}
      fleche={fleche}
      pleineLargeur={pleineLargeur}
      onClick={(e) => {
        e.preventDefault();
        ouvrir(smoobuId);
      }}
    >
      {libelle ?? UI.voirDisponibilites[lang]}
    </Bouton>
  );
}

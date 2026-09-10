"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { SITE, type Lang } from "@/lib/site";
import { NAV, route } from "@/lib/routes";
import { LIBELLES, UI } from "@/content/ui";
import { verrouScroll } from "@/lib/verrou";
import { BoutonReserver } from "./Reservation";
import { Icone } from "./Icone";
import Marque from "./Marque";
import SelecteurLangue from "./SelecteurLangue";

/**
 * Navigation fixe.
 * — Mobile : le pictogramme seul (le nom en toutes lettres y est illisible),
 *   téléphone et menu à portée de pouce, 44 px minimum.
 * — Desktop : logo complet, cinq entrées, langue, CTA.
 * Fond en dégradé plutôt qu'en aplat tant qu'on n'a pas défilé : respecte la
 * safe area sans barre opaque sur la photo.
 */
export default function Nav({ lang }: { lang: Lang }) {
  const [defile, setDefile] = useState(false);
  const [menu, setMenu] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const auScroll = () => setDefile(window.scrollY > 24);
    auScroll();
    window.addEventListener("scroll", auScroll, { passive: true });
    return () => window.removeEventListener("scroll", auScroll);
  }, []);

  useEffect(() => setMenu(false), [chemin]);
  useEffect(() => verrouScroll(menu), [menu]);

  const actif = (href: string) => chemin === href || chemin.startsWith(href + "/");
  const encre = defile ? "text-chene" : "text-pierre";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
          defile ? "bg-pierre/95" : "bg-gradient-to-b from-chene/50 to-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 md:px-8 md:py-3">
          <Link
            href={route("accueil", lang)}
            aria-label={SITE.nom}
            className={`flex min-h-11 shrink-0 items-center transition-opacity hover:opacity-70 ${encre}`}
          >
            <Marque className="h-9 w-auto lg:hidden" />
            <Image
              src="/images/logo.svg"
              alt={SITE.nom}
              width={92}
              height={53}
              priority
              className={`hidden h-12 w-auto lg:block ${defile ? "" : "brightness-0 invert"}`}
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {NAV.map((cle) => {
              const href = route(cle, lang);
              return (
                <Link
                  key={cle}
                  href={href}
                  className={`lien text-base transition-colors ${encre} ${
                    actif(href) ? "!text-lie" : "hover:text-lie"
                  }`}
                >
                  {LIBELLES[cle][lang]}
                </Link>
              );
            })}
            <SelecteurLangue lang={lang} sombre={!defile} />
            <BoutonReserver lang={lang} variante={defile ? "plein" : "clair"} />
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <a
              href={`tel:${SITE.telephone}`}
              onClick={() => track("tel", { depuis: "nav" })}
              aria-label={UI.appeler[lang]}
              className={`flex h-11 w-11 items-center justify-center rounded-fin ${encre}`}
            >
              <Icone nom="telephone" taille={22} />
            </a>
            <button
              onClick={() => setMenu(true)}
              aria-label={UI.menu[lang]}
              aria-expanded={menu}
              className={`flex h-11 items-center gap-2 rounded-fin px-2 ${encre}`}
            >
              <Icone nom="trois-foudres" taille={26} />
              <span className="text-sm font-medium uppercase tracking-[0.14em]">{UI.menu[lang]}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ardoise text-pierre grain sur-ardoise lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="relative z-10 flex items-center justify-between px-4 py-2.5">
              <Marque className="h-9 w-auto text-pierre" />
              <button
                onClick={() => setMenu(false)}
                aria-label={UI.fermer[lang]}
                className="flex h-11 w-11 items-center justify-center rounded-fin"
              >
                <Icone nom="fermer" taille={24} />
              </button>
            </div>

            <nav className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-8">
              {NAV.concat("acces", "environs", "contact").map((cle, i) => {
                const href = route(cle, lang);
                return (
                  <Link
                    key={cle}
                    href={href}
                    className={`flex min-h-14 items-center justify-between border-b border-pierre/15 font-display text-2xl active:text-sauge ${
                      actif(href) ? "text-sauge" : ""
                    }`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {LIBELLES[cle][lang]}
                    <Icone nom="chevron-droite" taille={18} className="text-pierre/40" />
                  </Link>
                );
              })}

              <div className="mt-5 flex items-center justify-between">
                <SelecteurLangue lang={lang} sombre />
                <a
                  href={`tel:${SITE.telephone}`}
                  onClick={() => track("tel", { depuis: "menu" })}
                  className="flex min-h-11 items-center gap-2 text-base text-pierre/85"
                >
                  <Icone nom="telephone" taille={18} className="text-sauge" />
                  {SITE.telephoneAffiche}
                </a>
              </div>

              <div className="mt-5">
                <BoutonReserver lang={lang} variante="clair" pleineLargeur fleche />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { track } from "@vercel/analytics";
import { SITE, type Lang } from "@/lib/site";
import { NAV, ROUTES, route } from "@/lib/routes";
import { LIBELLES, UI } from "@/content/ui";
import { verrouScroll } from "./SmoothScroll";
import { BoutonReserver } from "./Reservation";

/**
 * Navigation fixe. Sur mobile, fond en dégradé plutôt qu'en aplat pour
 * respecter la safe area (notch, dynamic island) sans barre opaque.
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
  const autreLangue = lang === "fr" ? "en" : "fr";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
          defile ? "bg-pierre/95 backdrop-blur-sm" : "bg-gradient-to-b from-chene/45 to-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 md:px-8">
          <Link
            href={route("accueil", lang)}
            aria-label={SITE.nom}
            className="shrink-0 transition-opacity hover:opacity-70"
          >
            <Image
              src="/images/logo.svg"
              alt={SITE.nom}
              width={92}
              height={53}
              priority
              className={`h-10 w-auto md:h-12 ${defile ? "" : "brightness-0 invert"}`}
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {NAV.map((cle) => {
              const href = route(cle, lang);
              return (
                <Link
                  key={cle}
                  href={href}
                  className={`lien text-base transition-colors ${
                    defile ? "text-chene" : "text-pierre"
                  } ${actif(href) ? "!text-lie" : "hover:text-lie"}`}
                >
                  {LIBELLES[cle][lang]}
                </Link>
              );
            })}
            <Link
              href={ROUTES.accueil[autreLangue] === "/" ? "/" : ROUTES.accueil[autreLangue]}
              hrefLang={autreLangue}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-lie ${
                defile ? "text-taupe" : "text-pierre/80"
              }`}
            >
              {UI.langue[lang]}
            </Link>
            <BoutonReserver lang={lang} variante={defile ? "plein" : "clair"} />
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE.telephone}`}
              onClick={() => track("tel", { depuis: "nav" })}
              aria-label={UI.appeler[lang]}
              className={`flex h-11 w-11 items-center justify-center rounded-fin ${
                defile ? "text-chene" : "text-pierre"
              }`}
            >
              <Phone size={20} />
            </a>
            <button
              onClick={() => setMenu(true)}
              aria-label={UI.menu[lang]}
              className={`flex h-11 w-11 items-center justify-center rounded-fin ${
                defile ? "text-chene" : "text-pierre"
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ardoise text-pierre sur-ardoise lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <div className="flex justify-end px-5 py-3">
              <button
                onClick={() => setMenu(false)}
                aria-label={UI.fermer[lang]}
                className="flex h-11 w-11 items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8 pb-16">
              {NAV.concat("acces", "environs", "contact").map((cle) => (
                <Link
                  key={cle}
                  href={route(cle, lang)}
                  className="border-b border-pierre/15 py-4 font-display text-2xl"
                >
                  {LIBELLES[cle][lang]}
                </Link>
              ))}
              <Link
                href={ROUTES.accueil[autreLangue]}
                hrefLang={autreLangue}
                className="py-4 text-sm uppercase tracking-widest text-sauge"
              >
                {UI.langue[lang]}
              </Link>
              <div className="mt-6">
                <BoutonReserver lang={lang} variante="clair" className="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

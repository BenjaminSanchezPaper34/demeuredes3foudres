import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { SITE, adresseUneLigne, type Lang } from "@/lib/site";
import { NAV, NAV_PIED, route } from "@/lib/routes";
import { LIBELLES } from "@/content/ui";
import PaperSignature from "./PaperSignature";
import { LienTelephone, LienItineraire } from "./Traces";

/**
 * Pied de page. `relative` obligatoire : la signature Paper34 y cale
 * son voile fluide en absolute inset-0 (cf. PAPER34-SIGNATURE-KIT).
 */
export default function Pied({ lang }: { lang: Lang }) {
  return (
    <footer className="relative bg-ardoise text-pierre grain sur-ardoise">
      <div className="relative z-20 mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">{SITE.nom}</p>
            <p className="mt-3 text-base leading-relaxed text-pierre/70">{SITE.baseline[lang]}</p>

            <address className="mt-6 space-y-3 not-italic">
              <LienItineraire className="flex items-start gap-3 text-base text-pierre/85 transition-colors hover:text-white">
                <MapPin size={18} className="mt-0.5 shrink-0 text-sauge" />
                <span>
                  {SITE.adresse.rue}
                  <br />
                  {SITE.adresse.codePostal} {SITE.adresse.ville}
                </span>
              </LienItineraire>
              <LienTelephone
                depuis="pied"
                className="flex items-center gap-3 text-base text-pierre/85 transition-colors hover:text-white"
              >
                <Phone size={18} className="shrink-0 text-sauge" />
                {SITE.telephoneAffiche}
              </LienTelephone>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-base text-pierre/85 transition-colors hover:text-white"
              >
                <Mail size={18} className="shrink-0 text-sauge" />
                {SITE.email}
              </a>
            </address>
          </div>

          <nav aria-label={lang === "fr" ? "Le séjour" : "Your stay"}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-sauge">
              {lang === "fr" ? "Le séjour" : "Your stay"}
            </p>
            <ul className="space-y-2.5">
              {NAV.map((cle) => (
                <li key={cle}>
                  <Link
                    href={route(cle, lang)}
                    className="text-base text-pierre/75 transition-colors hover:text-white"
                  >
                    {LIBELLES[cle][lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={lang === "fr" ? "Informations" : "Information"}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-sauge">
              {lang === "fr" ? "Informations" : "Information"}
            </p>
            <ul className="space-y-2.5">
              {NAV_PIED.map((cle) => (
                <li key={cle}>
                  <Link
                    href={route(cle, lang)}
                    className="text-base text-pierre/75 transition-colors hover:text-white"
                  >
                    {LIBELLES[cle][lang]}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE.boutique}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-pierre/75 transition-colors hover:text-white"
                >
                  {lang === "fr" ? "La boutique" : "The shop"}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={SITE.reseaux.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-fin border border-pierre/20 text-pierre/75 transition-colors hover:border-pierre hover:text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE.reseaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-fin border border-pierre/20 text-pierre/75 transition-colors hover:border-pierre hover:text-white"
              >
                <Facebook size={18} />
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-pierre/15 pt-6 text-sm text-pierre/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.nom}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={route("mentionsLegales", lang)} className="transition-colors hover:text-pierre">
              {LIBELLES.mentionsLegales[lang]}
            </Link>
            <Link href={route("confidentialite", lang)} className="transition-colors hover:text-pierre">
              {LIBELLES.confidentialite[lang]}
            </Link>
            <PaperSignature />
          </div>
        </div>
      </div>
    </footer>
  );
}

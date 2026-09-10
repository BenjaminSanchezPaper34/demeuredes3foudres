import type { ReactNode } from "react";
import type { Lang } from "@/lib/site";
import { UI } from "@/content/ui";

type Fond = "pierre" | "chaux" | "ardoise";

const FONDS: Record<Fond, string> = {
  pierre: "bg-pierre text-chene",
  chaux: "bg-chaux text-chene",
  // `sur-ardoise` inverse le focus : l'accent lie-de-vin y est illisible.
  ardoise: "bg-ardoise text-pierre grain sur-ardoise relative",
};

/** Section de page. Le fond est le seul levier de rupture entre deux sections. */
export function Section({
  fond = "pierre",
  children,
  id,
  classe = "",
}: {
  fond?: Fond;
  children: ReactNode;
  id?: string;
  classe?: string;
}) {
  return (
    <section id={id} className={`${FONDS[fond]} py-20 md:py-32 ${classe}`}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

/** Sur-titre. Toujours en Switzer, jamais en display. */
export function Kicker({ children, sombre }: { children: ReactNode; sombre?: boolean }) {
  return (
    <p
      className={`mb-4 text-sm font-medium uppercase tracking-[0.16em] ${
        sombre ? "text-sauge" : "text-taupe"
      }`}
    >
      {children}
    </p>
  );
}

export function Titre({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.1] ${className}`}>{children}</h2>
  );
}

/** Corps de texte. 62ch de mesure, interlignage large : ces textes se lisent. */
export function Prose({ paragraphes, sombre }: { paragraphes: string[]; sombre?: boolean }) {
  return (
    <div className="mesure space-y-5" data-reveal="stagger">
      {paragraphes.map((p, i) => (
        <p key={i} className={`text-lg leading-[1.7] ${sombre ? "text-pierre/85" : "text-taupe"}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

/**
 * Encadré « L'essentiel » — la réponse à la question de la page en trois puces.
 * C'est le passage que citent les moteurs IA : il reste sobre et factuel.
 */
export function Essentiel({ items, lang }: { items: string[]; lang: Lang }) {
  return (
    <aside className="border-l-2 border-lie bg-chaux px-6 py-6 md:px-8" data-reveal>
      <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-lie">
        {UI.lEssentiel[lang]}
      </h2>
      <ul className="mesure space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-base leading-relaxed text-chene">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sauge" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Filet de séparation — le séparateur par défaut, avant toute carte. */
export function Filet({ sombre }: { sombre?: boolean }) {
  return <hr className={`border-0 border-t ${sombre ? "border-pierre/20" : "border-sauge/40"}`} />;
}

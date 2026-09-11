import Link from "next/link";
import type { ReactNode } from "react";
import { Icone } from "./Icone";

type Variante = "plein" | "ligne" | "clair" | "voile";

/**
 * Boutons. Rayon 2px, jamais de pill (DESIGN.md §5).
 * — `plein`  : l'accent lie-de-vin, sur fonds clairs uniquement.
 * — `ligne`  : secondaire sur fond clair.
 * — `clair`  : primaire des fonds Ardoise et des photos — l'accent y étant
 *              illisible, le CTA s'inverse en fond Pierre.
 * — `voile`  : secondaire sur photo ou fond sombre, filet Pierre.
 *
 * Mobile d'abord : pleine largeur et 52 px de haut au doigt, largeur au
 * contenu et 44 px à partir de `sm`. `pleineLargeur` force le bloc partout.
 * Retour tactile : légère contraction à l'appui, ombre coupée.
 */
const STYLES: Record<Variante, string> = {
  plein: "bg-lie text-pierre hover:bg-lie-clair",
  ligne: "border border-chene/25 text-chene hover:border-lie hover:text-lie",
  clair: "bg-pierre text-chene hover:bg-white",
  voile: "border border-pierre/60 text-pierre hover:bg-pierre/10",
};

const BASE =
  "group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-bouton px-6 py-3 text-base font-medium transition-all duration-300 hover:shadow-leve active:scale-[0.98] active:shadow-none sm:min-h-11";

type Commun = {
  children: ReactNode;
  variante?: Variante;
  className?: string;
  /** Flèche qui avance au survol — pour les actions qui mènent quelque part. */
  fleche?: boolean;
  pleineLargeur?: boolean;
};

const classes = ({ variante = "plein", className = "", pleineLargeur }: Commun) =>
  `${BASE} ${STYLES[variante]} ${pleineLargeur ? "w-full" : "w-full sm:w-auto"} ${className}`;

const Fleche = () => (
  <Icone
    nom="fleche-droite"
    taille={18}
    className="transition-transform duration-300 group-hover:translate-x-0.5"
  />
);

export function Bouton({
  href,
  children,
  fleche,
  ...opts
}: Commun & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const { variante, className, pleineLargeur, ...rest } = opts as Commun & Record<string, unknown>;
  const cls = classes({ children, variante, className, pleineLargeur });
  const externe = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const contenu = (
    <>
      {children}
      {fleche && <Fleche />}
    </>
  );
  if (externe) {
    return (
      <a href={href} className={cls} {...(rest as React.ComponentProps<"a">)}>
        {contenu}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...(rest as Omit<React.ComponentProps<typeof Link>, "href">)}>
      {contenu}
    </Link>
  );
}

export function BoutonAction({
  children,
  fleche,
  variante,
  className,
  pleineLargeur,
  ...rest
}: Commun & Omit<React.ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={classes({ children, variante, className, pleineLargeur })} {...rest}>
      {children}
      {fleche && <Fleche />}
    </button>
  );
}

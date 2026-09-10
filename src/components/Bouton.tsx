import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "plein" | "ligne" | "clair";

/**
 * Boutons. Rayon 2px, jamais de pill (cf. DESIGN.md §5).
 * `clair` est la variante des fonds Ardoise : l'accent lie-de-vin y étant
 * illisible, le CTA s'inverse en fond Pierre.
 */
const STYLES: Record<Variante, string> = {
  plein: "bg-lie text-pierre hover:bg-lie-clair",
  ligne: "border border-chene/25 text-chene hover:border-lie hover:text-lie",
  clair: "bg-pierre text-chene hover:bg-white",
};

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-fin px-6 py-3 text-base font-medium transition-all duration-300 hover:shadow-leve";

export function Bouton({
  href,
  children,
  variante = "plein",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const externe = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = `${BASE} ${STYLES[variante]} ${className}`;

  if (externe) {
    return (
      <a href={href} className={classes} {...(rest as React.ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function BoutonAction({
  children,
  variante = "plein",
  className = "",
  ...rest
}: {
  children: ReactNode;
  variante?: Variante;
  className?: string;
} & React.ComponentProps<"button">) {
  return (
    <button className={`${BASE} ${STYLES[variante]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

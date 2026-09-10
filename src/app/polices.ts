import { Fraunces } from "next/font/google";

/**
 * Fraunces — police display, auto-hébergée par next/font (aucun appel à
 * fonts.googleapis.com au runtime : conformité CNIL).
 *
 * L'axe WONK est poussé légèrement sur les seuls H1 (cf. DESIGN.md §2) :
 * c'est ce qui traduit « atypique » sans tomber dans le serif d'hôtel.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--police-display",
});

/**
 * Logos des adresses recommandées : petits, liés, sur une tuile filet.
 * `sombre` pour les logos blancs (Atelier & Co) qui n'existent que sur fond
 * sombre. Balises <img> volontaires : fichiers minuscules, pas d'optimisation.
 */
export type Logo = { src: string; alt: string; href?: string; sombre?: boolean };

export default function Logos({ logos, className = "" }: { logos?: Logo[]; className?: string }) {
  if (!logos?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {logos.map((l) => {
        const tuile = `flex h-16 min-w-[4.5rem] items-center justify-center rounded-bloc border px-4 transition-colors ${
          l.sombre ? "border-ardoise bg-ardoise" : "border-sauge/40 bg-chaux hover:border-lie"
        }`;
        // eslint-disable-next-line @next/next/no-img-element
        const img = <img src={l.src} alt={l.alt} className="max-h-10 w-auto max-w-[9rem]" loading="lazy" />;
        return (
          <li key={l.src}>
            {l.href ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={tuile} title={l.alt}>
                {img}
              </a>
            ) : (
              <span className={tuile}>{img}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logement from "@/views/Logement";
import { metaLogement } from "@/lib/seo";
import { LOGEMENT_SLUGS, type LogementId } from "@/lib/routes";
import { parId } from "@/content/logements";

const LANG = "en" as const;

/** Retrouve le logement depuis le slug de la langue courante. */
function depuisSlug(slug: string): LogementId | null {
  const entree = Object.entries(LOGEMENT_SLUGS).find(([, s]) => s[LANG] === slug);
  return entree ? (entree[0] as LogementId) : null;
}

export function generateStaticParams() {
  return Object.values(LOGEMENT_SLUGS).map((s) => ({ slug: s[LANG] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const id = depuisSlug(slug);
  if (!id) return {};
  const l = parId(id);
  return metaLogement(
    id,
    LANG,
    `${l.nom[LANG]} — ${l.surface} m²`,
    l.accroche[LANG],
    l.photos[0].src,
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = depuisSlug(slug);
  if (!id) notFound();
  return <Logement id={id} lang={LANG} />;
}

"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";
import { SITE, adresseUneLigne } from "@/lib/site";

/**
 * Liens tracés. Ce sont ces événements qui relient une visite à un appel :
 * sans eux, l'analytics ne mesure que du trafic.
 * Vercel Web Analytics — sans cookie, exempté de consentement.
 */
export function LienTelephone({
  children,
  className,
  depuis,
}: {
  children: ReactNode;
  className?: string;
  depuis: string;
}) {
  return (
    <a
      href={`tel:${SITE.telephone}`}
      className={className}
      onClick={() => track("tel", { depuis })}
    >
      {children}
    </a>
  );
}

const URL_ITINERAIRE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${adresseUneLigne}, France`,
)}`;

export function LienItineraire({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={URL_ITINERAIRE}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("itineraire")}
    >
      {children}
    </a>
  );
}

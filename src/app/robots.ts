import type { MetadataRoute } from "next";
import { SITE, EN_LIGNE } from "@/lib/site";

/**
 * Les robots d'IA sont autorisés explicitement : c'est par eux que passe
 * désormais une part de la recherche d'hébergement.
 */
const ROBOTS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  // Pré-production : rien ne s'indexe tant que le domaine n'est pas basculé.
  if (!EN_LIGNE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...ROBOTS_IA.map((agent) => ({ userAgent: agent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

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
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...ROBOTS_IA.map((agent) => ({ userAgent: agent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

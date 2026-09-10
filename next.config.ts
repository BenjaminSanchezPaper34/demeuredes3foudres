import type { NextConfig } from "next";

/**
 * Redirections depuis l'ancien site Adobe Muse.
 * Le site desktop ET le site /phone/ étaient indexés : les deux sont repris,
 * sinon on perd la moitié de l'historique d'indexation.
 */
const ancienSite = [
  ["/index.html", "/"],
  ["/les-chambres.html", "/chambres"],
  ["/activites.html", "/caux-et-ses-environs"],
  ["/contact.html", "/contact"],
  ["/phone", "/"],
  ["/phone/index.html", "/"],
  ["/phone/les-chambres.html", "/chambres"],
  ["/phone/activites.html", "/caux-et-ses-environs"],
  ["/phone/contact.html", "/contact"],
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return ancienSite.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

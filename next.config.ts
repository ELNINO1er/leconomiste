import type { NextConfig } from "next";

/**
 * En-têtes de sécurité.
 *
 * Le choix est délibérément conservateur : pas de `script-src` ni de
 * `connect-src`, qui casseraient les scripts en ligne de Next et l'appel de
 * mesure d'audience vers le sous-domaine de l'API, et qui demanderaient un
 * `nonce` posé par un middleware. Les directives retenues ne touchent ni au
 * chargement des scripts ni aux requêtes réseau : elles ferment le détournement
 * par cadre, l'injection de `<base>` et le renvoi de formulaire vers un tiers.
 * Protection réelle, risque de casse nul.
 */
const enTetes = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  // Retire `X-Powered-By: Next.js` : annoncer la pile et sa version à chaque
  // réponse ne sert qu'à celui qui cherche une faille connue.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:chemin*", headers: enTetes }];
  },

  images: {
    // Voir `image-loader.ts` : les déclinaisons sont produites à l'envoi par
    // l'API, pas à la demande par Next.
    loader: "custom",
    loaderFile: "./image-loader.ts",
    // Les largeurs que le navigateur peut demander : calées sur les trois
    // déclinaisons existantes, pour que `srcset` n'annonce rien d'introuvable.
    deviceSizes: [400, 800, 1600],
    imageSizes: [400],
    remotePatterns: [
      // Visuels de la maquette, encore utilisés par les pages non branchées.
      { protocol: "https", hostname: "images.unsplash.com" },
      // Visuels déposés par la rédaction : l'API les sert depuis son propre
      // sous-domaine. Sans cette entrée, `next/image` refuse de les charger et
      // aucune illustration d'article n'apparaît.
      { protocol: "https", hostname: "admin.leconomistedelacotedivoire.com", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";

/**
 * Manifeste d'application.
 *
 * Ce qu'il change concrètement : « Ajouter à l'écran d'accueil » sur Android
 * ouvre le journal en plein écran, avec son nom et ses couleurs, au lieu d'un
 * onglet de navigateur intitulé par l'URL. Sur un lectorat très majoritairement
 * mobile, cela vaut le fichier.
 *
 * Les icônes pointent sur le SVG du site : il se met à l'échelle sans perte, ce
 * qu'aucun PNG ne fait. Android préfère toutefois un PNG carré `maskable` de
 * 512 px pour découper l'icône selon la forme du lanceur — à fournir par la
 * rédaction quand le logo définitif sera arrêté ; d'ici là le SVG suffit.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "L’Économiste de la Côte d’Ivoire",
    short_name: "L’Économiste",
    description:
      "Le quotidien ivoirien de l’économie, des entreprises, de la finance et des politiques publiques.",
    lang: "fr-CI",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#c4001d",
    categories: ["news", "business", "finance"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
    ],
    shortcuts: [
      { name: "En direct", url: "/en-direct" },
      { name: "BRVM & éco data", url: "/brvm" },
      { name: "Explorer", url: "/explorer" },
    ],
  };
}

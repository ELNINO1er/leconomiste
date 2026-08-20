"use client";

import { useEffect } from "react";

/**
 * Balise de mesure d'audience.
 *
 * Trois décisions techniques, chacune pour une raison précise :
 *
 * 1. **Elle vise l'API en direct**, et non une route du site. Le site est
 *    derrière un CDN : un appel qui le traverserait présenterait l'adresse du
 *    CDN, et tous les lecteurs se confondraient en un seul visiteur.
 * 2. **`text/plain` alors que le contenu est du JSON.** C'est ce qui en fait une
 *    requête « simple », que le navigateur envoie sans autorisation préalable —
 *    un `application/json` inter-origines déclencherait un contrôle que
 *    `sendBeacon` ne sait pas mener, et la mesure serait perdue.
 * 3. **`visibilitychange` et non `beforeunload`** pour la durée de lecture : le
 *    second n'est pas déclenché de façon fiable sur mobile, où l'on quitte une
 *    page en changeant d'application.
 *
 * Aucun cookie n'est posé, ici comme côté serveur : le visiteur est reconnu par
 * une empreinte du jour, jamais par un identifiant qu'on lui laisserait.
 */
export function Audience({ slug }: { slug: string }) {
  useEffect(() => {
    const cible = `${
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://admin.leconomistedelacotedivoire.com"
    }/api/public/hit`;

    const envoyer = (charge: Record<string, unknown>) => {
      if (typeof navigator.sendBeacon !== "function") return;

      navigator.sendBeacon(cible, new Blob([JSON.stringify(charge)], { type: "text/plain" }));
    };

    envoyer({ slug });

    const debut = Date.now();

    const auDepart = () => {
      if (document.visibilityState !== "hidden") return;

      document.removeEventListener("visibilitychange", auDepart);
      envoyer({ slug, duree: Math.round((Date.now() - debut) / 1000) });
    };

    document.addEventListener("visibilitychange", auDepart);

    return () => document.removeEventListener("visibilitychange", auDepart);
  }, [slug]);

  return null;
}

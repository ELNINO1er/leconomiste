"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Page affichée quand une page du site échoue à se rendre.
 *
 * Le cas réel n'est pas un bug de code mais une **API qui ne répond pas** : la
 * base tousse, le serveur redémarre, une migration est en cours. Sans ce
 * fichier, Next affiche un écran d'erreur brut, sans en-tête ni navigation —
 * autrement dit, le journal disparaît.
 *
 * Ici, le lecteur garde de quoi repartir, et un bouton pour réessayer : la
 * plupart de ces pannes durent quelques secondes.
 */
export default function Erreur({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Les journaux du serveur Hostinger gardent la trace : sans ça, une panne
    // passagère ne laisserait aucune empreinte.
    console.error("Rendu impossible :", error);
  }, [error]);

  return (
    <main className="interior">
      <header className="interior-header">
        <div className="shell interior-nav">
          <Link href="/">L’Économiste de la Côte d’Ivoire</Link>
        </div>
      </header>

      <section className="page-hero">
        <div className="shell">
          <span className="page-hero__kicker">INDISPONIBLE</span>
          <h1>Cette page n’a pas pu être affichée</h1>
          <p>
            Nos serveurs ne répondent pas pour le moment. L’interruption est le plus souvent brève :
            réessayez dans quelques instants.
          </p>
          <div className="live-foot">
            <button onClick={reset} className="newsletter-hub__cta">
              Réessayer
            </button>
            <Link href="/">Retour à l’accueil →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Heure de dernière actualisation.
 *
 * Isolée dans son propre composant client : c'est la seule partie de la page
 * qui ait besoin du navigateur, et la laisser dans la page entière obligerait à
 * rendre tout le fil côté client — donc à le charger après coup, au lieu de le
 * servir déjà écrit.
 */
export function Horloge() {
  const [maintenant, setMaintenant] = useState("");

  useEffect(() => {
    const battement = () => setMaintenant(new Date().toLocaleTimeString("fr-FR"));

    battement();
    const minuteur = window.setInterval(battement, 1000);

    return () => window.clearInterval(minuteur);
  }, []);

  return (
    <small className="live-updated">
      Actualisé en continu{maintenant && ` · dernière mise à jour à ${maintenant}`}
    </small>
  );
}

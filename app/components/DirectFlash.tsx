"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Depeche = { time: string; label: string; text: string };

/**
 * Emplacement commercial glissé dans le fil. Ce n'est pas une dépêche : il
 * porte sa propre couleur et son propre lien, et le lecteur doit pouvoir faire
 * la différence.
 */
const SPONSOR: Depeche = {
  time: "OFFRE",
  label: "PUBLICITÉ",
  text: "Votre marque en direct auprès des décideurs, entrepreneurs et institutions de Côte d’Ivoire.",
};

/** Un peu moins de cinq secondes : le temps de lire une ligne sans s'impatienter. */
const DUREE_MS = 4800;

/**
 * Bandeau « DIRECT » affiché sous le menu, sur toutes les pages sauf l'accueil.
 *
 * Il servait jusqu'ici les quatre dépêches inventées de `lib/mock-data` —
 * « Le compartiment actions termine la séance dans le vert », heure figée à
 * 15:42, sous une pastille clignotante. Rien ne permettait à un lecteur de les
 * distinguer de vraies dépêches, et le fil que la rédaction écrit réellement
 * n'apparaissait que sur `/en-direct`.
 *
 * Les dépêches viennent maintenant de l'API, via `/fil-direct` (voir cette
 * route pour la raison du détour). Sans dépêche publiée, le bandeau disparaît :
 * il n'est pas question de le laisser retomber sur la maquette, ni de n'y
 * laisser que l'encart publicitaire.
 */
export function DirectFlash() {
  const pathname = usePathname();
  const [depeches, setDepeches] = useState<Depeche[]>([]);
  const [index, setIndex] = useState(0);

  const surAccueil = pathname === "/";

  useEffect(() => {
    if (surAccueil) return;

    // `AbortController` : une navigation rapide ne doit pas laisser une réponse
    // arriver dans un composant démonté.
    const controleur = new AbortController();

    fetch("/fil-direct", { signal: controleur.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((liste: Depeche[]) => setDepeches(liste))
      .catch(() => {
        /* Bandeau absent : rien à signaler au lecteur. */
      });

    return () => controleur.abort();
  }, [surAccueil]);

  // L'encart commercial prend la cinquième place, comme auparavant — assez loin
  // pour que le fil s'établisse d'abord.
  const entrees =
    depeches.length === 0
      ? []
      : [...depeches.slice(0, 4), SPONSOR, ...depeches.slice(4)];

  useEffect(() => {
    if (entrees.length === 0) return;

    const minuteur = window.setInterval(
      () => setIndex((courant) => (courant + 1) % entrees.length),
      DUREE_MS,
    );

    return () => window.clearInterval(minuteur);
  }, [entrees.length]);

  if (surAccueil || entrees.length === 0) return null;

  const active = entrees[index % entrees.length];
  const publicite = active.label === "PUBLICITÉ";

  const section = pathname.startsWith("/categorie/")
    ? decodeURIComponent(pathname.split("/").pop() || "").replaceAll("-", " ")
    : "Côte d’Ivoire";

  return (
    <section
      className={`direct-flash ${publicite ? "direct-flash--ad" : ""}`}
      aria-label="Flash direct"
      aria-live="polite"
    >
      <div className="shell direct-flash__inner">
        <strong>
          <i /> DIRECT
        </strong>
        <span className="direct-flash__section">{section}</span>
        <time>{active.time}</time>
        <b>{active.label}</b>
        <p>{active.text}</p>
        <div className="direct-flash__progress">
          <i key={index} />
        </div>
        <Link href={publicite ? "/informations" : "/en-direct"}>
          {publicite ? "Annonceurs ↗" : "Tout le direct →"}
        </Link>
      </div>
    </section>
  );
}

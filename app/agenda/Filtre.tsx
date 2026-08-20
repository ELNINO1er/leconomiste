"use client";

import Link from "next/link";
import { useState } from "react";
import type { Evenement } from "../../lib/api";

/**
 * Onglets de l'agenda.
 *
 * Le filtrage se fait en mémoire, contrairement à l'explorateur : l'agenda tient
 * en quelques dizaines de rendez-vous, la liste complète est déjà là, et un
 * aller-retour serveur par onglet serait du gaspillage.
 *
 * Les thèmes sont déduits des événements publiés plutôt que codés en dur : un
 * onglet qui ne mène à rien n'a pas lieu d'exister.
 */
export function Filtre({ evenements }: { evenements: Evenement[] }) {
  const themes = ["Tous", ...Array.from(new Set(evenements.map((e) => e.type))).sort()];
  const [theme, setTheme] = useState("Tous");

  const liste = theme === "Tous" ? evenements : evenements.filter((e) => e.type === theme);

  return (
    <>
      <div className="agenda-tabs" role="tablist">
        {themes.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={c === theme}
            className={c === theme ? "is-on" : ""}
            onClick={() => setTheme(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ol className="agenda-list">
        {liste.map((e) => {
          const jour = new Date(`${e.date}T00:00:00`);

          return (
            <li key={`${e.date}-${e.titre}`} className="agenda-item">
              <div className="agenda-item__date">
                <strong>{jour.getDate()}</strong>
                <span>{jour.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase()}</span>
              </div>
              <div className="agenda-item__body">
                {/* Pas d'horaire : l'agenda du back-office retient le jour, pas
                    l'heure. L'afficher supposerait une donnée qui n'existe pas. */}
                <span className="agenda-item__meta">
                  {e.type} · {e.region.name}
                </span>
                <h3>{e.titre}</h3>
              </div>
              <Link href="/informations" className="agenda-item__cta">
                Détails →
              </Link>
            </li>
          );
        })}
        {liste.length === 0 && <p className="agenda-empty">Aucun événement pour ce thème.</p>}
      </ol>
    </>
  );
}

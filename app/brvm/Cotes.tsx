"use client";

import { useEffect, useState } from "react";
import type { Cotation } from "../../lib/api";
import { formatValeur, formatVariation } from "../../lib/adapt";

/**
 * Table des cours, avec la liste de suivi du lecteur.
 *
 * Seule cette partie a besoin du navigateur : la liste de suivi vit dans le
 * stockage local, elle n'est ni envoyée ni conservée par le journal. Le reste de
 * la page est rendu côté serveur.
 */
export function Cotes({ cotations }: { cotations: Cotation[] }) {
  const [watch, setWatch] = useState<string[]>([]);

  useEffect(() => {
    try {
      const enregistrees=JSON.parse(localStorage.getItem("brvm-watch") || "[]");
      const minuteur=window.setTimeout(()=>setWatch(enregistrees),0);
      return ()=>window.clearTimeout(minuteur);
    } catch {}
  }, []);

  function toggle(sym: string) {
    const next = watch.includes(sym) ? watch.filter((s) => s !== sym) : [...watch, sym];
    setWatch(next);
    localStorage.setItem("brvm-watch", JSON.stringify(next));
  }

  return (
    <section className="shell brvm-quotes">
      <div className="brvm-quotes__head">
        <h2>Cotes du jour</h2>
        <span>
          {watch.length} valeur{watch.length > 1 ? "s" : ""} suivie
          {watch.length > 1 ? "s" : ""} · enregistré localement
        </span>
      </div>
      <table className="brvm-table">
        <thead>
          <tr>
            <th></th>
            <th>Symbole</th>
            <th>Société</th>
            <th>Cours</th>
            <th>Var.</th>
          </tr>
        </thead>
        <tbody>
          {cotations.map((q) => {
            const symbole = q.symbole ?? q.nom;
            const on = watch.includes(symbole);

            return (
              <tr key={symbole} className={on ? "is-watched" : ""}>
                <td>
                  <button
                    className={`watch-star ${on ? "is-on" : ""}`}
                    onClick={() => toggle(symbole)}
                    aria-pressed={on}
                    aria-label={on ? "Retirer du suivi" : "Suivre"}
                  >
                    {on ? "★" : "☆"}
                  </button>
                </td>
                <td>
                  <b>{q.symbole}</b>
                </td>
                <td>{q.nom}</td>
                <td>{formatValeur(q.valeur, q.unite)}</td>
                <td>
                  <em className={`quote-${q.tendance ?? "flat"}`}>{formatVariation(q.variationPct)}</em>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

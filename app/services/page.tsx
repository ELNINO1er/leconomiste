"use client";
import {useState} from "react";
import {Header} from "../components/Header";
import {weather,fxRates,fuelPrices,commodities,tvSchedule} from "../../lib/mock-data";

function Converter(){
  const [amount,setAmount]=useState("100");
  const [code,setCode]=useState("EUR");
  const rate=fxRates.find(r=>r.code===code)?.value??1;
  const n=parseFloat(amount.replace(",","."))||0;
  const xof=Math.round(n*rate).toLocaleString("fr-FR");
  return (
    <div className="tool-convert">
      <div className="tool-convert__row">
        <input inputMode="decimal" value={amount} onChange={e=>setAmount(e.target.value)} aria-label="Montant"/>
        <select value={code} onChange={e=>setCode(e.target.value)} aria-label="Devise">{fxRates.map(r=><option key={r.code} value={r.code}>{r.code}</option>)}</select>
      </div>
      <strong className="tool-convert__out">= {xof} FCFA</strong>
      {/* L'euro est le seul taux exact : la parité FCFA/euro est fixe (655,957).
          Les autres devises flottent et ne sont pas rafraîchies en direct — le
          dire évite qu'un lecteur les prenne pour le cours du jour. */}
      <small>1 {code} = {rate.toLocaleString("fr-FR")} FCFA · {code==="EUR"?"parité fixe":"taux indicatif, non actualisé en direct"}</small>
    </div>
  );
}

/**
 * Résultats d'examens — annoncé, pas encore raccordé.
 *
 * La version précédente calculait un verdict ADMIS / SECOND TOUR / AJOURNÉ à
 * partir de la **somme des chiffres du numéro de table**. Un candidat au BAC
 * pouvait donc lire « AJOURNÉ » sur son vrai numéro, sans le moindre
 * avertissement contredisant l'affichage. Aucune donnée d'examen n'étant
 * raccordée, la seule forme acceptable est de ne rien afficher du tout et de
 * dire quand le service ouvrira.
 */
function ExamCheck(){
  return (
    <div className="tool-exam">
      <div className="tool-exam__row"><input placeholder="N° de table (BAC/BEPC)" aria-label="Numéro de table" disabled/><button disabled>Vérifier</button></div>
      <p className="tool-exam__res">Service en préparation avec la DECO. La consultation des résultats du BAC et du BEPC ouvrira pour la prochaine session.</p>
    </div>
  );
}

export default function Services(){
  return (
    <main className="services-page"><Header/>
      <section className="page-hero"><div className="shell"><span className="page-hero__kicker">SERVICES</span><h1>Vos outils du quotidien</h1><p>Météo, change FCFA, carburant, examens, programme TV et matières premières.</p></div></section>
      <section className="shell tools-grid">
        <article className="tool-card"><h2>Météo</h2><ul className="tool-weather">{weather.map(w=><li key={w.city}><span className="tool-weather__ico">{w.icon}</span><strong>{w.temp}</strong><small>{w.city} · {w.cond}</small></li>)}</ul></article>
        <article className="tool-card"><h2>Convertisseur FCFA</h2><Converter/></article>
        <article className="tool-card"><h2>Prix du carburant</h2><ul className="tool-list">{fuelPrices.map(f=><li key={f.name}><span>{f.name}</span><strong>{f.price}</strong></li>)}</ul></article>
        <article className="tool-card"><h2>Résultats d’examens</h2><ExamCheck/></article>
        <article className="tool-card"><h2>Programme TV</h2><ul className="tool-list tool-tv">{tvSchedule.slice(0,6).map(s=><li key={s.time}><time>{s.time}</time><span>{s.title}</span><small>{s.type}</small></li>)}</ul></article>
        <article className="tool-card"><h2>Matières premières</h2><ul className="tool-list">{commodities.map(c=><li key={c.name}><span>{c.name}</span><strong>{c.price}<small>{c.unit}</small></strong><em className={`quote-${c.trend}`}>{c.change}</em></li>)}</ul></article>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import {useState} from "react";
import {Header} from "../components/Header";

const PARITE_EURO=655.957;

function Converter(){
  const [amount,setAmount]=useState("100");
  const valeur=Number.parseFloat(amount.replace(",","."))||0;
  const xof=Math.round(valeur*PARITE_EURO).toLocaleString("fr-FR");
  return <div className="tool-convert"><div className="tool-convert__row"><input inputMode="decimal" value={amount} onChange={e=>setAmount(e.target.value)} aria-label="Montant en euros"/><strong>EUR</strong></div><strong className="tool-convert__out">= {xof} FCFA</strong><small>1 EUR = 655,957 FCFA · parité fixe officielle.</small></div>;
}

export default function Services(){return <main className="services-page"><Header/>
  <section className="page-hero"><div className="shell"><span className="page-hero__kicker">SERVICES</span><h1>Des outils fiables, sans chiffres simulés</h1><p>Seuls les services raccordés à une source vérifiable sont proposés.</p></div></section>
  <section className="shell tools-grid">
    <article className="tool-card"><h2>Convertisseur euro / FCFA</h2><Converter/></article>
    <article className="tool-card"><h2>BRVM</h2><p>Consultez les cotations publiées par la source financière du journal.</p><Link className="hero-slider__cta" href="/brvm">Voir les cours →</Link></article>
    <article className="tool-card"><h2>Agenda</h2><p>Retrouvez les événements réellement enregistrés par la rédaction.</p><Link className="hero-slider__cta" href="/agenda">Consulter l’agenda →</Link></article>
    <article className="tool-card"><h2>Résultats d’examens</h2><p>Ce service n’est pas encore raccordé à la DECO. Aucun résultat ne sera simulé.</p></article>
    <article className="tool-card"><h2>Météo, carburant et matières premières</h2><p>Ces données seront affichées après raccordement à des sources officielles et datées.</p></article>
    <article className="tool-card"><h2>Besoin d’une information ?</h2><p>Contactez la rédaction pour signaler une source ou proposer un service utile.</p><Link className="hero-slider__cta" href="/informations">Contacter la rédaction →</Link></article>
  </section>
</main>}

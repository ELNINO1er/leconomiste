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
      <small>1 {code} = {rate.toLocaleString("fr-FR")} FCFA · taux maquette</small>
    </div>
  );
}

function ExamCheck(){
  const [num,setNum]=useState("");
  const [res,setRes]=useState<string|null>(null);
  function check(e:React.FormEvent){
    e.preventDefault();
    const digits=num.replace(/\D/g,"");
    if(digits.length<4){setRes("Numéro invalide (min. 4 chiffres).");return}
    const sum=[...digits].reduce((a,d)=>a+Number(d),0);
    const verdict=sum%10<6?"ADMIS":sum%10<8?"SECOND TOUR":"AJOURNÉ";
    setRes(`Candidat n°${digits} · ${verdict}`);
  }
  return (
    <form className="tool-exam" onSubmit={check}>
      <div className="tool-exam__row"><input value={num} onChange={e=>setNum(e.target.value)} placeholder="N° de table (BAC/BEPC)" aria-label="Numéro de table"/><button>Vérifier</button></div>
      {res&&<p className={`tool-exam__res ${res.includes("ADMIS")?"is-ok":res.includes("invalide")?"is-err":""}`}>{res}</p>}
      <small>Simulation locale · résultat déterministe de démonstration.</small>
    </form>
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

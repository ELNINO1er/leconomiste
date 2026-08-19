"use client";
import Link from "next/link";
import {useState} from "react";
import {Header} from "../components/Header";
import {agendaEvents,agendaCategories} from "../../lib/mock-data";

export default function Agenda(){
  const [cat,setCat]=useState("Tous");
  const list=cat==="Tous"?agendaEvents:agendaEvents.filter(e=>e.category===cat);
  return (
    <main className="agenda-page"><Header/>
      <section className="page-hero"><div className="shell"><span className="page-hero__kicker">AGENDA</span><h1>Les rendez-vous à ne pas manquer</h1><p>Économie, politique, sport, culture, institutions — filtrez par thème.</p></div></section>
      <section className="shell agenda-body">
        <div className="agenda-tabs" role="tablist">
          {agendaCategories.map(c=><button key={c} role="tab" aria-selected={c===cat} className={c===cat?"is-on":""} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <ol className="agenda-list">
          {list.map((e,i)=>(
            <li key={i} className="agenda-item">
              <div className="agenda-item__date"><strong>{e.day}</strong><span>{e.month}</span></div>
              <div className="agenda-item__body"><span className="agenda-item__meta">{e.time} · {e.category} · {e.city}</span><h3>{e.title}</h3></div>
              <Link href="/informations" className="agenda-item__cta">Détails →</Link>
            </li>
          ))}
          {list.length===0&&<p className="agenda-empty">Aucun événement pour ce thème.</p>}
        </ol>
      </section>
    </main>
  );
}

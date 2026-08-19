"use client";
import Link from "next/link";
import {useState} from "react";
import {Header} from "../components/Header";
import {ligue1Standings,sportResults,sportFixtures,elephants,canGroup} from "../../lib/mock-data";

const TABS=["Résultats","Ligue 1","Éléphants","CAN"] as const;

function MatchRow({m}:{m:{comp:string;home:string;away:string;score:string;when:string;live?:boolean}}){
  return (
    <div className={`match-row ${m.live?"is-live":""}`}>
      <span className="match-row__comp">{m.comp}</span>
      <span className="match-row__team">{m.home}</span>
      <strong className="match-row__score">{m.score}</strong>
      <span className="match-row__team match-row__team--away">{m.away}</span>
      <span className="match-row__when">{m.live?<em><i/> {m.when}</em>:m.when}</span>
    </div>
  );
}

export default function Sport(){
  const [tab,setTab]=useState<typeof TABS[number]>("Résultats");
  return (
    <main className="sport-page"><Header/>
      <section className="page-hero"><div className="shell"><span className="page-hero__kicker">SPORT</span><h1>Scores & résultats en direct</h1><p>Ligue 1 ivoirienne, Éléphants et Coupe d’Afrique des Nations.</p></div></section>
      <section className="shell sport-body">
        <div className="sport-tabs" role="tablist">{TABS.map(t=><button key={t} role="tab" aria-selected={t===tab} className={t===tab?"is-on":""} onClick={()=>setTab(t)}>{t}</button>)}</div>

        {tab==="Résultats"&&<div className="sport-block">
          <h2>En direct & derniers résultats</h2>
          <div className="match-list">{sportResults.map((m,i)=><MatchRow key={i} m={m}/>)}</div>
          <h2>À venir</h2>
          <div className="match-list">{sportFixtures.map((m,i)=><MatchRow key={i} m={m}/>)}</div>
        </div>}

        {tab==="Ligue 1"&&<div className="sport-block">
          <h2>Classement · Ligue 1</h2>
          <table className="standings"><thead><tr><th>#</th><th>Équipe</th><th>J</th><th>Diff</th><th>Pts</th></tr></thead>
            <tbody>{ligue1Standings.map(r=><tr key={r.rank} className={r.rank<=3?"is-top":""}><td>{r.rank}</td><td>{r.team}</td><td>{r.pj}</td><td>{r.diff}</td><td><strong>{r.pts}</strong></td></tr>)}</tbody></table>
        </div>}

        {tab==="Éléphants"&&<div className="sport-block">
          <h2>Les Éléphants</h2>
          <div className="elephants-form"><span>Forme :</span>{elephants.form.map((f,i)=><b key={i} className={`form-${f}`}>{f}</b>)}</div>
          <article className="next-match">
            <span className="next-match__tag">PROCHAIN MATCH</span>
            <h3>Côte d’Ivoire – {elephants.next.opponent}</h3>
            <p>{elephants.next.comp} · {elephants.next.date}</p>
            <p className="next-match__venue">{elephants.next.venue}</p>
            <Link href="/live/eliminatoires-elephants" className="next-match__cta">Suivre le direct →</Link>
          </article>
        </div>}

        {tab==="CAN"&&<div className="sport-block">
          <h2>CAN · Groupe de la Côte d’Ivoire</h2>
          <table className="standings"><thead><tr><th>Équipe</th><th>J</th><th>Pts</th></tr></thead>
            <tbody>{canGroup.map((r,i)=><tr key={i} className={r.team.includes("Ivoire")?"is-top":""}><td>{r.team}</td><td>{r.pj}</td><td><strong>{r.pts}</strong></td></tr>)}</tbody></table>
        </div>}
      </section>
    </main>
  );
}

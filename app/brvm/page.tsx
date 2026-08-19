"use client";
import {useEffect,useState} from "react";
import {Header} from "../components/Header";
import {brvmIndices,brvmMovers,brvmQuotes} from "../../lib/mock-data";

export default function Brvm(){
  const [watch,setWatch]=useState<string[]>([]);
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture d'un état persisté après montage
    try{setWatch(JSON.parse(localStorage.getItem("brvm-watch")||"[]"))}catch{}
  },[]);
  function toggle(sym:string){
    const next=watch.includes(sym)?watch.filter(s=>s!==sym):[...watch,sym];
    setWatch(next);localStorage.setItem("brvm-watch",JSON.stringify(next));
  }
  return (
    <main className="brvm-page"><Header/>
      <section className="page-hero"><div className="shell"><span className="page-hero__kicker">BRVM · ABIDJAN</span><h1>La Bourse régionale en un coup d’œil</h1><p>Indices, mouvements du jour et votre liste de suivi. Clôture 15:30 · maquette.</p></div></section>

      <section className="shell brvm-indices">
        {brvmIndices.map(x=><article key={x.name} className="brvm-index"><span>{x.name}</span><strong>{x.value}</strong><em className={`quote-${x.trend}`}>{x.change}</em></article>)}
      </section>

      <section className="shell brvm-movers">
        <div className="brvm-movers__col"><h2>Plus fortes hausses</h2>{brvmMovers.up.map(m=><div key={m.symbol} className="mover-row"><b>{m.symbol}</b><em className="quote-up">{m.change}</em></div>)}</div>
        <div className="brvm-movers__col"><h2>Plus fortes baisses</h2>{brvmMovers.down.map(m=><div key={m.symbol} className="mover-row"><b>{m.symbol}</b><em className="quote-down">{m.change}</em></div>)}</div>
      </section>

      <section className="shell brvm-quotes">
        <div className="brvm-quotes__head"><h2>Cotes du jour</h2><span>{watch.length} valeur{watch.length>1?"s":""} suivie{watch.length>1?"s":""} · enregistré localement</span></div>
        <table className="brvm-table"><thead><tr><th></th><th>Symbole</th><th>Société</th><th>Cours</th><th>Var.</th></tr></thead>
          <tbody>{brvmQuotes.map(q=>{const on=watch.includes(q.symbol);return (
            <tr key={q.symbol} className={on?"is-watched":""}>
              <td><button className={`watch-star ${on?"is-on":""}`} onClick={()=>toggle(q.symbol)} aria-pressed={on} aria-label={on?"Retirer du suivi":"Suivre"}>{on?"★":"☆"}</button></td>
              <td><b>{q.symbol}</b></td><td>{q.name}</td><td>{q.value}</td><td><em className={`quote-${q.trend}`}>{q.change}</em></td>
            </tr>);})}</tbody></table>
      </section>
    </main>
  );
}

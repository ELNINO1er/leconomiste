"use client";
import {useEffect,useState} from "react";

// Base de voix simulée pour un rendu crédible (maquette)
const SEED=[128,74,53,41];

export function Poll({id,question,options}:{id:string;question:string;options:string[]}){
  const [choice,setChoice]=useState<number|null>(null);
  const key=`poll:${id}`;

  useEffect(()=>{
    const saved=localStorage.getItem(key);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture d'un état persisté après montage
    if(saved!==null)setChoice(Number(saved));
  },[key]);

  const base=options.map((_,i)=>SEED[i]??30);
  const counts=base.map((n,i)=>n+(choice===i?1:0));
  const total=counts.reduce((a,b)=>a+b,0);

  function vote(i:number){
    if(choice!==null)return;
    setChoice(i);
    localStorage.setItem(key,String(i));
  }

  return (
    <section className="poll" aria-label="Sondage">
      <span className="poll__kicker">SONDAGE · VOTE MAQUETTE</span>
      <h3>{question}</h3>
      <div className="poll__options">
        {options.map((opt,i)=>{
          const pct=Math.round((counts[i]/total)*100);
          return (
            <button key={opt} className={`poll__option ${choice===i?"is-chosen":""}`} onClick={()=>vote(i)} disabled={choice!==null}>
              {choice!==null&&<span className="poll__bar" style={{width:`${pct}%`}}/>}
              <span className="poll__label">{opt}</span>
              {choice!==null&&<span className="poll__pct">{pct} %</span>}
            </button>
          );
        })}
      </div>
      <small>{choice!==null?`Merci ! ${total.toLocaleString("fr-FR")} votes · résultat enregistré sur cet appareil.`:"Cliquez pour voter."}</small>
    </section>
  );
}

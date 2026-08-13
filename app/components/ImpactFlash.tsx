"use client";
import Link from "next/link";
import {useEffect,useState} from "react";

export function ImpactFlash(){
  const[open,setOpen]=useState(false);
  useEffect(()=>{const first=window.setTimeout(()=>setOpen(true),2200);const repeat=window.setInterval(()=>setOpen(true),60000);return()=>{window.clearTimeout(first);window.clearInterval(repeat)}},[]);
  const close=()=>setOpen(false);
  useEffect(()=>{if(!open)return;const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")close()};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[open]);
  if(!open)return null;
  return <div className="impact-flash" role="dialog" aria-modal="true" aria-labelledby="impact-flash-title" onMouseDown={event=>{if(event.target===event.currentTarget)close()}}>
    <article className="impact-flash__panel">
      <button className="impact-flash__close" onClick={close} aria-label="Fermer le flash">×</button>
      <div className="impact-flash__number">FLASH <span>01</span></div>
      <div className="impact-flash__body"><span className="impact-flash__label"><i/> INFORMATION IMPORTANTE</span><h2 id="impact-flash-title">La Matinale ivoirienne,<br/><em>avant que la journée commence.</em></h2><p>Recevez à 7 h les décisions, marchés et tendances qui comptent pour l’économie de la Côte d’Ivoire.</p><div><Link href="/espace" onClick={close}>Découvrir la Matinale ↗</Link><button onClick={close}>Continuer ma lecture</button></div></div>
      <aside><small>ESPACE DISPONIBLE</small><strong>Ce flash peut également accueillir une campagne publicitaire premium.</strong><Link href="/informations" onClick={close}>Voir l’offre annonceurs →</Link></aside>
    </article>
  </div>
}

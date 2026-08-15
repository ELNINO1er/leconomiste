"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect,useState} from "react";
const editions=[
 {label:"BRVM",value:"335,18",change:"+0,42 %"},
 {label:"CACAO",value:"7 842 $",change:"+1,16 %"},
 {label:"PME",value:"FINANCEMENT",change:"À LA UNE"},
];
export function ImpactFlash(){
 const[open,setOpen]=useState(false);const[active,setActive]=useState(0);
 useEffect(()=>{const first=window.setTimeout(()=>setOpen(true),2200);const repeat=window.setInterval(()=>setOpen(true),60000);return()=>{window.clearTimeout(first);window.clearInterval(repeat)}},[]);
 useEffect(()=>{if(!open)return;const rotation=window.setInterval(()=>setActive(v=>(v+1)%editions.length),3200);const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",onKey);return()=>{window.clearInterval(rotation);window.removeEventListener("keydown",onKey)}},[open]);
 if(!open)return null;const stat=editions[active];
 return <div className="impact-flash" role="dialog" aria-modal="true" aria-labelledby="impact-flash-title" onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false)}}><article className="impact-flash__panel decision-flash decision-flash--premium"><button className="impact-flash__close" onClick={()=>setOpen(false)} aria-label="Fermer le flash">×</button>
  <div className="decision-flash__visual"><Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88" alt="Réunion de décideurs" width={1200} height={850}/><div className="decision-flash__brand"><b>É.</b><span>L’ÉCONOMISTE<small>DE LA CÔTE D’IVOIRE</small></span></div><div className="decision-flash__market" key={stat.label}><small>{stat.label}</small><strong>{stat.value}</strong><em>{stat.change}</em></div></div>
  <div className="impact-flash__body"><span className="impact-flash__label"><i/> ÉDITION EXÉCUTIVE · 07H00</span><h2 id="impact-flash-title">Le Journal<br/><em>des décideurs.</em></h2><p>Une lecture rapide, exigeante et ivoirienne des décisions qui font l’économie.</p><ol><li><b>01</b> La BRVM ouvre dans le vert à Abidjan</li><li><b>02</b> Les PME accélèrent leurs investissements</li><li><b>03</b> Le cacao transforme davantage en Côte d’Ivoire</li></ol><div><Link href="/explorer" onClick={()=>setOpen(false)}>Ouvrir le journal ↗</Link><button onClick={()=>setOpen(false)}>Plus tard</button></div></div>
  <aside><small>PARTENAIRE DE L’ÉDITION</small><strong>Une présence premium auprès de celles et ceux qui décident.</strong><div><span>FORMAT</span><b>DISPLAY + NATIVE</b><span>AUDIENCE</span><b>DÉCIDEURS IVOIRIENS</b></div><Link href="/informations" onClick={()=>setOpen(false)}>Découvrir l’offre annonceurs →</Link></aside>
 </article></div>
}

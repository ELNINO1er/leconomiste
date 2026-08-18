"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useState} from "react";
import {flashNews} from "../../lib/mock-data";
const sponsor={time:"OFFRE",label:"PUBLICITÉ",text:"Votre marque en direct auprès des décideurs, entrepreneurs et institutions de Côte d’Ivoire."};
export function DirectFlash(){const pathname=usePathname();const[index,setIndex]=useState(0);const items=[...flashNews.slice(0,4),sponsor,...flashNews.slice(4)];const active=items[index%items.length];const section=pathname.startsWith("/categorie/")?decodeURIComponent(pathname.split("/").pop()||"").replaceAll("-"," "):"Côte d’Ivoire";useEffect(()=>{const timer=window.setInterval(()=>setIndex(current=>(current+1)%items.length),4800);return()=>window.clearInterval(timer)},[items.length]);if(pathname==="/")return null;return <section className={`direct-flash ${active.label==="PUBLICITÉ"?"direct-flash--ad":""}`} aria-label="Flash direct" aria-live="polite"><div className="shell direct-flash__inner"><strong><i/> DIRECT</strong><span className="direct-flash__section">{section}</span><time>{active.time}</time><b>{active.label}</b><p>{active.text}</p><div className="direct-flash__progress"><i key={index}/></div><Link href={active.label==="PUBLICITÉ"?"/informations":"/en-direct"}>{active.label==="PUBLICITÉ"?"Annonceurs ↗":"Tout le direct →"}</Link></div></section>}

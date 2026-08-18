"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect,useState} from "react";
import {Header} from "../components/Header";
import {liveFeed,liveHref,liveImage} from "../../lib/mock-data";

export default function EnDirect(){
  const [now,setNow]=useState("");
  useEffect(()=>{
    const tick=()=>setNow(new Date().toLocaleTimeString("fr-FR"));
    tick();
    const t=window.setInterval(tick,1000);
    return ()=>window.clearInterval(t);
  },[]);

  return (
    <main className="live-page">
      <Header/>
      <section className="live-hero"><div className="shell">
        <span className="live-badge"><i/> EN DIRECT</span>
        <h1>Le fil de l’actualité</h1>
        <p>Toute l’info ivoirienne minute par minute — politique, sport, société, économie, culture.</p>
        <small className="live-updated">Actualisé en continu{now&&` · dernière mise à jour à ${now}`}</small>
      </div></section>

      <section className="shell live-feed">
        <ol>
          {liveFeed.map((e,i)=>(
            <li key={i} className={`live-item ${e.urgent?"live-item--urgent":""}`}>
              <div className="live-item__time"><time>{e.time}</time>{e.urgent&&<b>URGENT</b>}</div>
              <div className="live-item__body">
                <span className="live-item__label">{e.label}{e.region?` · ${e.region}`:""}</span>
                <h2><Link href={liveHref(e)}>{e.title}</Link></h2>
                <p>{e.text}</p>
              </div>
              <Link href={liveHref(e)} className="live-item__thumb" aria-hidden tabIndex={-1}><Image src={liveImage(e)} alt="" width={320} height={200} unoptimized/></Link>
            </li>
          ))}
        </ol>
        <div className="live-foot">
          <span>Vous suivez un événement précis ?</span>
          <Link href="/explorer">Rechercher un sujet →</Link>
        </div>
      </section>
    </main>
  );
}

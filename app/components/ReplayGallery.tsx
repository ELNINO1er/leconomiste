"use client";
import Image from "next/image";
import {useState} from "react";
import {tvReplays,tvThemes} from "../../lib/mock-data";

export function ReplayGallery(){
  const [theme,setTheme]=useState("Tous");
  const list=theme==="Tous"?tvReplays:tvReplays.filter(r=>r.theme===theme);
  return (
    <div className="replay">
      <div className="replay__tabs" role="tablist">
        {tvThemes.map(t=><button key={t} role="tab" aria-selected={t===theme} className={t===theme?"is-on":""} onClick={()=>setTheme(t)}>{t}</button>)}
      </div>
      <div className="replay__grid">
        {list.map((r,i)=>(
          <article key={i} className="replay-card">
            <span className="replay-card__thumb">
              <Image src={r.image} alt="" width={420} height={250} />
              <b aria-hidden>▶</b><em>{r.duration}</em>
            </span>
            <small>{r.theme}</small>
            <h3>{r.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}

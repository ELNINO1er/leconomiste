"use client";
import Image from "next/image";
import {useEffect,useMemo,useState} from "react";
import {podcastSeries} from "../../lib/mock-data";

const DEMO_MS=18000; // durée simulée d'un épisode (maquette)

export function PodcastPlayer(){
  const flat=useMemo(()=>podcastSeries.flatMap(s=>s.episodes.map(e=>({series:s.name,image:s.image,...e}))),[]);
  const [idx,setIdx]=useState<number|null>(null);
  const [playing,setPlaying]=useState(false);
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    if(idx===null||!playing)return;
    const step=window.setInterval(()=>{
      setProgress(p=>{
        if(p<100)return p+100*(120/DEMO_MS);
        // épisode terminé → lecture continue
        setIdx(cur=>cur!==null&&cur+1<flat.length?cur+1:cur);
        return 0;
      });
    },120);
    return ()=>window.clearInterval(step);
  },[idx,playing,flat.length]);

  function play(i:number){setIdx(i);setProgress(0);setPlaying(true)}
  const cur=idx!==null?flat[idx]:null;
  let counter=-1;

  return (
    <div className="podcasts">
      {podcastSeries.map(s=>(
        <section key={s.id} className="podseries">
          <div className="podseries__head">
            <span className="podseries__cover"><Image src={s.image} alt="" width={120} height={120} unoptimized/></span>
            <div><span className="podseries__tag">SÉRIE</span><h3>{s.name}</h3><p>{s.desc}</p></div>
          </div>
          <ol className="podseries__eps">
            {s.episodes.map(ep=>{
              counter++;const i=counter;const active=idx===i;
              return (
                <li key={ep.title} className={active?"is-active":""}>
                  <button className="podep__play" onClick={()=>active?setPlaying(p=>!p):play(i)} aria-label={active&&playing?"Pause":"Lecture"}>{active&&playing?"❚❚":"▶"}</button>
                  <span className="podep__title">{ep.title}</span>
                  <time>{ep.duration}</time>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {cur&&(
        <div className="podbar" role="region" aria-label="Lecteur podcast">
          <span className="podbar__cover"><Image src={cur.image} alt="" width={96} height={96} unoptimized/></span>
          <div className="podbar__info">
            <small>{cur.series} · lecture continue</small>
            <strong>{cur.title}</strong>
            <span className="podbar__track"><i style={{width:`${progress}%`}}/></span>
          </div>
          <div className="podbar__controls">
            <button onClick={()=>{setIdx(i=>i!==null&&i>0?i-1:i);setProgress(0)}} aria-label="Précédent">⏮</button>
            <button className="podbar__pp" onClick={()=>setPlaying(p=>!p)} aria-label={playing?"Pause":"Lecture"}>{playing?"❚❚":"▶"}</button>
            <button onClick={()=>{setIdx(i=>i!==null&&i+1<flat.length?i+1:i);setProgress(0)}} aria-label="Suivant">⏭</button>
          </div>
          <button className="podbar__close" onClick={()=>{setIdx(null);setPlaying(false)}} aria-label="Fermer">×</button>
        </div>
      )}
    </div>
  );
}

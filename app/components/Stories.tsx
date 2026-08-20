"use client";
import Image from "next/image";
import {useCallback,useEffect,useState} from "react";
import type {Story} from "../../lib/adapt";

const SLIDE_MS=4200;

/**
 * Bulles « stories » de l'accueil.
 *
 * Le contenu vient des brèves illustrées de la rédaction (voir
 * `brevesVersStories`). Sans brève illustrée, la section ne s'affiche pas :
 * mieux vaut un accueil plus court qu'un bandeau rempli d'images sans rapport.
 */
export function Stories({stories}:{stories:Story[]}){
  const [open,setOpen]=useState<number|null>(null);
  const [slide,setSlide]=useState(0);

  const close=useCallback(()=>setOpen(null),[]);

  const next=useCallback(()=>{
    setOpen(o=>{
      if(o===null)return o;
      const st=stories[o];
      setSlide(s=>{
        if(s+1<st.slides.length)return s+1;
        // passer à la story suivante
        if(o+1<stories.length){setOpen(o+1);return 0}
        setOpen(null);return 0;
      });
      return o;
    });
    // `stories` est désormais une propriété : sans elle dans les dépendances, la
    // fonction resterait figée sur la première liste reçue.
  },[stories]);

  const prev=useCallback(()=>{
    setSlide(s=>{
      if(s>0)return s-1;
      setOpen(o=>o!==null&&o>0?o-1:o);
      return 0;
    });
  },[]);

  useEffect(()=>{
    if(open===null)return;
    const t=window.setTimeout(next,SLIDE_MS);
    return ()=>window.clearTimeout(t);
  },[open,slide,next]);

  useEffect(()=>{
    if(open===null)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")close();if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev()};
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[open,close,next,prev]);

  const st=open!==null?stories[open]:null;

  // Après les hooks, jamais avant : un retour anticipé placé plus haut
  // changerait le nombre de hooks appelés d'un rendu à l'autre.
  if(!stories.length)return null;

  return (
    <section className="stories" aria-label="Stories">
      <div className="shell stories__row">
        {stories.map((s,i)=>(
          <button key={s.id} className="story-bubble" onClick={()=>{setOpen(i);setSlide(0)}}>
            <span className="story-bubble__ring"><Image src={s.cover} alt="" width={120} height={120} /></span>
            <small>{s.title}</small>
          </button>
        ))}
      </div>

      {st&&(
        <div className="story-viewer" role="dialog" aria-modal="true" onClick={close}>
          <div className="story-viewer__panel" onClick={e=>e.stopPropagation()}>
            <div className="story-viewer__bars">
              {st.slides.map((_,i)=>(
                <span key={i} className="story-viewer__bar">
                  <i className={i<slide?"done":i===slide?"active":""} style={i===slide?{animationDuration:`${SLIDE_MS}ms`}:undefined}/>
                </span>
              ))}
            </div>
            <div className="story-viewer__head">
              <span className="story-viewer__label">{st.label}</span>
              <strong>{st.title}</strong>
              <button onClick={close} aria-label="Fermer">×</button>
            </div>
            <figure className="story-viewer__media">
              <Image src={st.slides[slide].image} alt="" fill  sizes="460px"/>
              <figcaption><small>{st.slides[slide].region}</small>{st.slides[slide].caption}</figcaption>
            </figure>
            <button className="story-viewer__nav story-viewer__nav--prev" onClick={prev} aria-label="Précédent"/>
            <button className="story-viewer__nav story-viewer__nav--next" onClick={next} aria-label="Suivant"/>
          </div>
        </div>
      )}
    </section>
  );
}

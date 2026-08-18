"use client";
import {useEffect,useRef,useState} from "react";
import {pushThemes,liveFeed} from "../lib/mock-data";

export function SiteTools(){
  const [dark,setDark]=useState(false);
  const [open,setOpen]=useState(false);
  const [enabled,setEnabled]=useState(false);
  const [themes,setThemes]=useState<string[]>([]);
  const [toast,setToast]=useState("");
  const [push,setPush]=useState<{label:string;title:string}|null>(null);
  const timers=useRef<{t?:number;p?:number}>({});

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture d'un état persisté après montage
    try{setEnabled(localStorage.getItem("push-enabled")==="on");setThemes(JSON.parse(localStorage.getItem("push-themes")||"[]"))}catch{}
  },[]);

  const flash=(msg:string)=>{setToast(msg);window.clearTimeout(timers.current.t);timers.current.t=window.setTimeout(()=>setToast(""),2200)};

  function toggleTheme(theme:string){
    const next=themes.includes(theme)?themes.filter(t=>t!==theme):[...themes,theme];
    setThemes(next);localStorage.setItem("push-themes",JSON.stringify(next));
  }

  function toggleEnabled(){
    const next=!enabled;setEnabled(next);localStorage.setItem("push-enabled",next?"on":"off");
    if(next){flash("Notifications activées");simulate()}
    else{flash("Notifications désactivées")}
  }

  function simulate(){
    const pool=themes.length?liveFeed.filter(e=>themes.some(t=>t.toUpperCase().startsWith(e.label))):liveFeed;
    const entry=(pool[0]||liveFeed[0]);
    const payload={label:entry.label,title:entry.title};
    setPush(payload);
    window.clearTimeout(timers.current.p);timers.current.p=window.setTimeout(()=>setPush(null),5000);
    try{if("Notification"in window&&Notification.permission==="granted")new Notification("L’Économiste · "+entry.label,{body:entry.title})}catch{}
  }

  return <>
    <div className="site-tools" aria-label="Préférences">
      <button onClick={()=>{const n=!dark;setDark(n);document.documentElement.classList.toggle("dark-mode",n)}} aria-label="Changer le thème">{dark?"☀":"☾"}</button>
      <button className={enabled?"active":""} onClick={()=>setOpen(o=>!o)} aria-expanded={open} aria-label="Notifications">🔔</button>
    </div>

    {open&&<div className="notif-panel" role="dialog" aria-label="Notifications">
      <div className="notif-panel__head"><strong>Notifications</strong><button onClick={()=>setOpen(false)} aria-label="Fermer">×</button></div>
      <label className="notif-panel__switch"><input type="checkbox" checked={enabled} onChange={toggleEnabled}/><span>Recevoir les alertes en direct</span></label>
      <p className="notif-panel__hint">Choisissez vos thèmes prioritaires :</p>
      <div className="notif-panel__themes">
        {pushThemes.map(t=><label key={t} className={themes.includes(t)?"is-on":""}><input type="checkbox" checked={themes.includes(t)} onChange={()=>toggleTheme(t)}/>{t}</label>)}
      </div>
      <button className="notif-panel__test" onClick={simulate} disabled={!enabled}>Tester une notification</button>
      <small>Maquette locale · aucune donnée transmise.</small>
    </div>}

    {toast&&<div className="site-toast" role="status">{toast}</div>}

    {push&&<div className="push-toast" role="alert" onClick={()=>setPush(null)}>
      <span className="push-toast__brand">É.</span>
      <div><span className="push-toast__label">🔴 EN DIRECT · {push.label}</span><strong>{push.title}</strong><small>L’Économiste de la Côte d’Ivoire · maintenant</small></div>
    </div>}
  </>;
}

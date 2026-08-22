"use client";

import {useEffect,useState} from "react";

export function SiteTools(){
  const [dark,setDark]=useState(false);

  useEffect(()=>{
    const actif=localStorage.getItem("theme")==="dark";
    document.documentElement.classList.toggle("dark-mode",actif);
    window.setTimeout(()=>setDark(actif),0);
  },[]);

  function basculer(){
    const suivant=!dark;
    setDark(suivant);
    document.documentElement.classList.toggle("dark-mode",suivant);
    localStorage.setItem("theme",suivant?"dark":"light");
  }

  return <div className="site-tools" aria-label="Préférences d’affichage">
    <button onClick={basculer} aria-label={dark?"Activer le thème clair":"Activer le thème sombre"}>{dark?"☀":"☾"}</button>
  </div>;
}

"use client";

import {useEffect,useState} from "react";

export function ArticleActions({slug}:{slug:string}){
  const [saved,setSaved]=useState(false);
  const cle=`saved:${slug}`;

  useEffect(()=>{
    const minuteur=window.setTimeout(()=>setSaved(localStorage.getItem(cle)==="true"),0);
    return()=>window.clearTimeout(minuteur);
  },[cle]);

  function basculer(){
    const suivant=!saved;
    setSaved(suivant);
    localStorage.setItem(cle,String(suivant));
  }

  return <button className="save-button" onClick={basculer}>{saved?"★ Enregistré sur cet appareil":"☆ Enregistrer sur cet appareil"}</button>;
}

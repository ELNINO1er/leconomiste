"use client";
import {useEffect,useRef,useState} from "react";

export function ListenButton({text}:{text:string}){
  const [state,setState]=useState<"idle"|"playing"|"paused">("idle");
  const [supported,setSupported]=useState(true);
  const utterRef=useRef<SpeechSynthesisUtterance|null>(null);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect -- détection de capacité après montage
    setSupported(typeof window!=="undefined"&&"speechSynthesis"in window);
    return ()=>{if(typeof window!=="undefined"&&"speechSynthesis"in window)window.speechSynthesis.cancel()};
  },[]);

  if(!supported)return null;

  function play(){
    const synth=window.speechSynthesis;
    if(state==="paused"){synth.resume();setState("playing");return}
    synth.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="fr-FR";u.rate=1;
    u.onend=()=>setState("idle");
    u.onerror=()=>setState("idle");
    utterRef.current=u;
    synth.speak(u);
    setState("playing");
  }
  function pause(){window.speechSynthesis.pause();setState("paused")}
  function stop(){window.speechSynthesis.cancel();setState("idle")}

  return (
    <div className="listen" aria-label="Écouter l’article">
      {state==="playing"
        ? <button className="listen__btn is-playing" onClick={pause} aria-label="Mettre en pause"><span className="listen__ico" aria-hidden>❚❚</span> Pause</button>
        : <button className="listen__btn" onClick={play} aria-label="Écouter l’article"><span className="listen__ico" aria-hidden>▶</span> Écouter l’article</button>}
      {state!=="idle"&&<button className="listen__stop" onClick={stop} aria-label="Arrêter la lecture"><span aria-hidden>◼</span></button>}
    </div>
  );
}

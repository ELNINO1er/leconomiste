"use client";
import {useEffect,useRef,useState} from "react";
import {newsletters} from "../../lib/mock-data";

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterHub(){
  const [email,setEmail]=useState("");
  const [selected,setSelected]=useState<string[]>(["matinale"]);
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");
  const [envoi,setEnvoi]=useState(false);
  const inputRef=useRef<HTMLInputElement|null>(null);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture d'un état persisté après montage
    try{const s=JSON.parse(localStorage.getItem("newsletter-subs")||"[]");if(s.length)setSelected(s);if(localStorage.getItem("newsletter-email"))setDone(true)}catch{}
  },[]);

  function toggle(id:string){
    setDone(false);
    setSelected(sel=>sel.includes(id)?sel.filter(s=>s!==id):[...sel,id]);
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    if(!EMAIL_RE.test(email)){setError("Entrez une adresse e-mail valide.");inputRef.current?.focus();return}
    if(selected.length===0){setError("Choisissez au moins une édition.");return}
    setError("");
    setEnvoi(true);

    try{
      const reponse=await fetch("/api/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email})});

      if(!reponse.ok){
        const corps=await reponse.json().catch(()=>({}));
        setError(corps.erreur??"L’inscription n’a pas pu être enregistrée.");
        return;
      }
    }catch{
      setError("L’inscription n’a pas pu être enregistrée. Vérifiez votre connexion.");
      return;
    }finally{
      setEnvoi(false);
    }

    // Le choix des éditions reste local : le journal enregistre l'adresse, il ne
    // gère pas encore d'éditions distinctes. Le dire ici évite d'oublier que
    // cette préférence ne quitte pas l'appareil.
    localStorage.setItem("newsletter-email",email);
    localStorage.setItem("newsletter-subs",JSON.stringify(selected));
    setDone(true);
  }

  const names=newsletters.filter(n=>selected.includes(n.id)).map(n=>n.name).join(", ");

  return (
    <section className="newsletter-hub" id="newsletters">
      <div className="shell newsletter-hub__inner">
        <div className="newsletter-hub__intro">
          <span className="newsletter-hub__kicker">NEWSLETTERS</span>
          <h2>Recevez l’info qui vous intéresse</h2>
          <p>Choisissez vos éditions, entrez votre adresse — une seule inscription, désabonnement en un clic.</p>
        </div>
        <div className="newsletter-hub__form">
          <div className="nl-chips" role="group" aria-label="Choisir les éditions">
            {newsletters.map(n=>{
              const on=selected.includes(n.id);
              return <button type="button" key={n.id} className={`nl-chip ${on?"is-on":""}`} aria-pressed={on} onClick={()=>toggle(n.id)}>
                <span>{n.name}</span><small>{n.cadence}</small>
              </button>;
            })}
          </div>
          <form className="nl-signup" onSubmit={submit} noValidate>
            <input ref={inputRef} type="email" value={email} onChange={e=>{setEmail(e.target.value);setDone(false);setError("")}} placeholder="vous@email.com" aria-label="Votre adresse e-mail"/>
            <button type="submit" disabled={envoi}>{envoi?"Envoi…":"S’abonner"}</button>
          </form>
          {error&&<p className="nl-msg nl-msg--error">{error}</p>}
          {done&&!error&&<p className="nl-msg nl-msg--ok">✓ Inscription enregistrée · {selected.length} édition{selected.length>1?"s":""} : {names}.</p>}
          {!done&&!error&&<p className="nl-msg">{selected.length} édition{selected.length>1?"s":""} sélectionnée{selected.length>1?"s":""} · désinscription possible à tout moment.</p>}
        </div>
      </div>
    </section>
  );
}

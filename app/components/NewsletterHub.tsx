"use client";

import {useRef,useState} from "react";

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterHub(){
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");
  const [envoi,setEnvoi]=useState(false);
  const inputRef=useRef<HTMLInputElement|null>(null);

  async function submit(e:React.FormEvent){
    e.preventDefault();
    if(!EMAIL_RE.test(email)){setError("Entrez une adresse e-mail valide.");inputRef.current?.focus();return}
    setError("");setEnvoi(true);setDone(false);

    try{
      const reponse=await fetch("/lettre-information",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email})});
      if(!reponse.ok){const corps=await reponse.json().catch(()=>({}));setError(corps.erreur??"L’inscription n’a pas pu être enregistrée.");return}
      setDone(true);setEmail("");
    }catch{
      setError("L’inscription n’a pas pu être enregistrée. Vérifiez votre connexion.");
    }finally{setEnvoi(false)}
  }

  return <section className="newsletter-hub" id="newsletters"><div className="shell newsletter-hub__inner">
    <div className="newsletter-hub__intro"><span className="newsletter-hub__kicker">LETTRE D’INFORMATION</span><h2>Recevez l’essentiel de l’actualité</h2><p>Une seule édition, envoyée par la rédaction. Pour vous désinscrire, répondez au message reçu ou contactez la rédaction.</p></div>
    <div className="newsletter-hub__form"><form className="nl-signup" onSubmit={submit} noValidate><input ref={inputRef} type="email" value={email} onChange={e=>{setEmail(e.target.value);setDone(false);setError("")}} placeholder="vous@email.com" aria-label="Votre adresse e-mail"/><button type="submit" disabled={envoi}>{envoi?"Envoi…":"S’abonner"}</button></form>{error&&<p className="nl-msg nl-msg--error">{error}</p>}{done&&<p className="nl-msg nl-msg--ok">✓ Votre inscription a bien été enregistrée.</p>}{!done&&!error&&<p className="nl-msg">Votre adresse est utilisée uniquement pour la lettre d’information.</p>}</div>
  </div></section>;
}

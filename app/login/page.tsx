"use client";
import { useState } from "react";
export default function Login() {
  const [done,setDone]=useState(false);
  return <main className="auth-page"><a href="/" className="mini-brand">L’Économiste<span>b</span></a><section className="auth-card">{done?<div className="auth-success"><strong>✓</strong><h1>Bienvenue</h1><p>Votre espace lecteur est prêt. Vos favoris et préférences seront disponibles sur cet appareil.</p><a href="/">Accéder à l’accueil</a></div>:<><span className="section-kicker">ESPACE LECTEUR</span><h1>Connectez-vous</h1><p>Retrouvez vos favoris, votre historique et une sélection adaptée à vos centres d’intérêt.</p><button className="google-button" onClick={()=>setDone(true)}>G&nbsp;&nbsp; Continuer avec Google</button><div className="or"><span>ou</span></div><form onSubmit={(e)=>{e.preventDefault();setDone(true)}}><label>Adresse e-mail<input type="email" required placeholder="vous@email.com"/></label><label>Mot de passe<input type="password" required placeholder="••••••••"/></label><button>Se connecter</button></form><small>Pas encore de compte ? <a href="#">Créer un compte</a></small></>}</section></main>;
}

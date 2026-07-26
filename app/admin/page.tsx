"use client";
import { useState } from "react";

const menu=["Vue d’ensemble","Articles","Catégories","Journalistes","Pays & langues","Publicités","Commentaires","Newsletter","Utilisateurs","SEO"];
const moduleData:Record<string,string[][]>={
  Articles:[["Abidjan accélère sa transformation…","Finance","Publié"],["La BCEAO face au défi…","Économie","Brouillon"],["Cacao : le nouveau rapport de force","Agriculture","Publié"]],
  Catégories:[["Économie","128 articles","Active"],["Finance","94 articles","Active"],["Technologie","67 articles","Active"]],
  Journalistes:[["Aïssata Koné","Rédactrice en chef","284 articles"],["Idriss Diallo","Grand reporter","198 articles"],["Sarah Mensah","Journaliste tech","142 articles"]],
  "Pays & langues":[["Côte d’Ivoire","Français","Publié"],["Sénégal","Français","Publié"],["Canada","Français / English","Brouillon"]],
  Publicités:[["Africa Future Energy","Native","Active"],["Banque Atlantique","Display","Planifiée"],["Telco Africa","Vidéo","Terminée"]],
  Commentaires:[["K. Mensah","Analyse très claire","Approuvé"],["M. Traoré","Merci pour ce dossier","En attente"],["A. Barry","Sources utiles","Approuvé"]],
  Newsletter:[["La Matinale","48 204 abonnés","42 % ouverture"],["Brief Marchés","12 480 abonnés","38 % ouverture"],["Tech Afrique","9 820 abonnés","46 % ouverture"]],
  Utilisateurs:[["Bleu Innocent","Lecteur premium","Actif"],["Aminata Mbaye","Éditrice","Actif"],["Koffi Kouamé","Journaliste","Actif"]],
  SEO:[["Page d’accueil","98 / 100","Optimisée"],["Rubrique Économie","94 / 100","Optimisée"],["Article Abidjan","91 / 100","À améliorer"]],
};

export default function Admin(){
  const[active,setActive]=useState("Vue d’ensemble");
  const[query,setQuery]=useState("");
  const[added,setAdded]=useState(false);
  const rows=(moduleData[active]||[]).filter(row=>row.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <main className="admin-shell">
    <aside className="admin-sidebar"><a href="/" className="mini-brand">L’Économiste<span>b</span></a><span>ADMINISTRATION</span><nav>{menu.map((x,i)=><button key={x} className={active===x?"active":""} onClick={()=>{setActive(x);setAdded(false)}}><i>{["⌂","▤","◫","♙","◎","▣","◌","✉","♧","↗"][i]}</i>{x}</button>)}</nav><a href="/" className="admin-exit">← Voir le site</a></aside>
    <section className="admin-main"><header><div><small>DIMANCHE 26 JUILLET</small><h1>{active}</h1></div><div className="admin-user"><span>AK</span><div><strong>Aïssata Koné</strong><small>Rédactrice en chef</small></div></div></header>
      {active==="Vue d’ensemble"?<>
        <div className="admin-stats">{[["284","Articles publiés","+12 %"],["1,8 M","Lectures ce mois","+24 %"],["48,2 k","Abonnés newsletter","+8 %"],["68 %","Taux d’engagement","+5 %"]].map(x=><article key={x[1]}><span>{x[1]}</span><strong>{x[0]}</strong><small>{x[2]} ce mois</small></article>)}</div>
        <div className="admin-grid"><section><div className="admin-section-head"><h2>Performance éditoriale</h2><select><option>30 derniers jours</option></select></div><div className="chart-bars">{[42,58,48,72,67,85,79,93,76,88,96,82].map((x,i)=><i key={i} style={{height:`${x}%`}}></i>)}</div><div className="chart-labels"><span>1 juil.</span><span>15 juil.</span><span>26 juil.</span></div></section><section className="quick-actions"><h2>Actions rapides</h2>{["＋ Nouvel article","♙ Ajouter un journaliste","▣ Créer une campagne","✉ Envoyer une newsletter"].map(x=><button key={x} onClick={()=>setActive(x.includes("article")?"Articles":x.includes("journaliste")?"Journalistes":x.includes("campagne")?"Publicités":"Newsletter")}>{x}</button>)}</section></div>
        <section className="admin-table"><div className="admin-section-head"><h2>Articles récents</h2><button onClick={()=>setActive("Articles")}>Voir tout</button></div><table><thead><tr><th>Article</th><th>Rubrique</th><th>Statut</th><th>Lectures</th></tr></thead><tbody>{[["Abidjan accélère sa transformation…","Finance","Publié","9 840"],["La BCEAO face au défi…","Économie","Brouillon","—"],["Cacao : le nouveau rapport de force","Agriculture","Publié","7 240"]].map(x=><tr key={x[0]}><td>{x[0]}</td><td>{x[1]}</td><td><span className={x[2]==="Publié"?"status live":"status"}>{x[2]}</span></td><td>{x[3]}</td></tr>)}</tbody></table></section>
      </>:<section className="admin-module"><div className="module-toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Rechercher dans ${active.toLowerCase()}…`}/><button onClick={()=>setAdded(true)}>＋ Ajouter</button></div>{added&&<div className="module-notice">✓ Nouvel élément simulé. Le formulaire est prêt pour le raccordement backend.</div>}<table><thead><tr><th>Nom / contenu</th><th>Type / rôle</th><th>Statut / résultat</th><th>Actions</th></tr></thead><tbody>{rows.map((row,i)=><tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td><span className="status live">{row[2]}</span></td><td><button aria-label="Modifier">✎</button><button aria-label="Plus d’options">•••</button></td></tr>)}</tbody></table><div className="module-footer"><span>{rows.length} éléments affichés</span><div><button>←</button><button>1</button><button>→</button></div></div></section>}
    </section>
  </main>
}

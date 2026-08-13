"use client";
import {Fragment,useEffect,useMemo,useState} from "react";
import {AdSlot} from "../components/AdSlot";
import {ArticleCard} from "../components/ArticleCard";
import {Header} from "../components/Header";
import {articles,categories,regions} from "../../lib/mock-data";

export default function Explorer(){
  const[q,setQ]=useState("");const[cat,setCat]=useState("Toutes");const[region,setRegion]=useState("Toutes");const[sort,setSort]=useState("Récent");
  useEffect(()=>{setTimeout(()=>setQ(new URLSearchParams(window.location.search).get("recherche")||""),0)},[]);
  const list=useMemo(()=>{const filtered=articles.filter(a=>(cat==="Toutes"||a.category===cat)&&(region==="Toutes"||a.region===region)&&`${a.title} ${a.excerpt} ${a.author} ${a.region}`.toLowerCase().includes(q.toLowerCase()));return sort==="Populaire"?[...filtered].sort((a,b)=>b.views-a.views):filtered},[q,cat,region,sort]);
  return <main className="explorer-page"><Header/>
    <section className="explorer-hero"><div className="shell explorer-hero__grid"><div><span className="section-kicker">LE KIOSQUE NUMÉRIQUE IVOIRIEN</span><h1>Explorer<br/><em>l’actualité.</em></h1><p>Économie, entreprises, territoires et décisions publiques : retrouvez toutes nos publications dans une expérience de recherche plus directe.</p><div className="explorer-stats"><span><strong>{articles.length}</strong> publications</span><span><strong>{categories.length}</strong> rubriques</span><span><strong>{regions.length}</strong> territoires</span></div></div><AdSlot format="Billboard éditorial · 620 × 280" title="Votre campagne rencontre la Côte d’Ivoire qui décide." variant="dark"/></div></section>
    <section className="shell explorer-layout"><aside className="filter-panel"><div className="filter-title"><strong>Affiner le fil</strong><button onClick={()=>{setQ("");setCat("Toutes");setRegion("Toutes")}}>Tout effacer</button></div><label>Recherche<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Entreprise, cacao, ville…"/></label><label>Rubrique<select value={cat} onChange={e=>setCat(e.target.value)}><option>Toutes</option>{categories.map(x=><option key={x}>{x}</option>)}</select></label><label>Région<select value={region} onChange={e=>setRegion(e.target.value)}><option>Toutes</option>{regions.map(x=><option key={x}>{x}</option>)}</select></label><AdSlot format="Pavé · 300 × 250" title="Soyez visible dans le fil." variant="dark"/></aside>
      <div className="results-panel"><div className="results-toolbar"><div><small>LA SÉLECTION</small><strong>{list.length} résultat{list.length!==1?"s":""}</strong></div><select value={sort} onChange={e=>setSort(e.target.value)}><option>Récent</option><option>Populaire</option></select></div><div className="results-grid">{list.map((a,i)=><Fragment key={a.slug}><ArticleCard article={a}/>{i===5&&<AdSlot className="results-ad" format="Native premium" title="Une prise de parole qui compte." variant="dark"/>}</Fragment>)}</div>{!list.length&&<div className="empty-state">Aucun article ivoirien ne correspond à ces critères.</div>}</div>
    </section>
  </main>
}

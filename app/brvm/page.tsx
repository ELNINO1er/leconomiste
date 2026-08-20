import {Header} from "../components/Header";
import {getCotations} from "../../lib/api";
import {estIndice,formatValeur,formatVariation} from "../../lib/adapt";
import {Cotes} from "./Cotes";

export const revalidate = 120;

export default async function Brvm(){
  const cotations=await getCotations("brvm");

  const indices=cotations.filter(q=>estIndice(q.symbole));
  const valeurs=cotations.filter(q=>!estIndice(q.symbole));

  // Les plus fortes variations sont calculées, pas saisies : c'est un classement
  // des cours du jour, et le tenir à la main serait une source d'erreur de plus.
  const variation=(q:{variationPct:number|null})=>q.variationPct??0;
  const hausses=[...valeurs].filter(q=>variation(q)>0).sort((a,b)=>variation(b)-variation(a)).slice(0,4);
  const baisses=[...valeurs].filter(q=>variation(q)<0).sort((a,b)=>variation(a)-variation(b)).slice(0,4);

  return (
    <main className="brvm-page"><Header/>
      <section className="page-hero"><div className="shell"><span className="page-hero__kicker">BRVM · ABIDJAN</span><h1>La Bourse régionale en un coup d’œil</h1><p>Indices, mouvements du jour et votre liste de suivi. Clôture 15:30.</p></div></section>

      {indices.length>0&&<section className="shell brvm-indices">
        {indices.map(x=><article key={x.symbole??x.nom} className="brvm-index"><span>{x.nom}</span><strong>{formatValeur(x.valeur,x.unite)}</strong><em className={`quote-${x.tendance??"flat"}`}>{formatVariation(x.variationPct)}</em></article>)}
      </section>}

      {(hausses.length>0||baisses.length>0)&&<section className="shell brvm-movers">
        <div className="brvm-movers__col"><h2>Plus fortes hausses</h2>{hausses.map(m=><div key={m.symbole??m.nom} className="mover-row"><b>{m.symbole}</b><em className="quote-up">{formatVariation(m.variationPct)}</em></div>)}</div>
        <div className="brvm-movers__col"><h2>Plus fortes baisses</h2>{baisses.map(m=><div key={m.symbole??m.nom} className="mover-row"><b>{m.symbole}</b><em className="quote-down">{formatVariation(m.variationPct)}</em></div>)}</div>
      </section>}

      {cotations.length===0
        ?<section className="shell"><p className="agenda-empty">Les cours du jour ne sont pas encore publiés.</p></section>
        :<Cotes cotations={valeurs.length>0?valeurs:cotations}/>}
    </main>
  );
}

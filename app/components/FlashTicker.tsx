import {getCotations} from "../../lib/api";
import {formatValeur,formatVariation} from "../../lib/adapt";

/**
 * Bandeau des cours, présent en tête de chaque page.
 *
 * Les valeurs sont doublées pour que le défilement en boucle n'ait pas de
 * couture visible : c'est une astuce d'animation, pas une duplication de données.
 */
export async function FlashTicker(){
  const cotations=await getCotations("brvm");

  if(cotations.length===0)return null;

  const items=[...cotations,...cotations];

  return <section className="flash-ticker brvm-live" aria-label="Cours du jour de la BRVM"><strong className="flash-ticker__label"><i/> BRVM · ABIDJAN</strong><div className="flash-ticker__viewport"><div className="flash-ticker__track">{items.map((item,i)=><span key={`${item.symbole}-${i}`}><b>{item.symbole}</b>{formatValeur(item.valeur,item.unite)}<em className={`quote-${item.tendance??"flat"}`}>{formatVariation(item.variationPct)}</em></span>)}</div></div><span className="brvm-close">CLÔTURE 15:30</span></section>;
}

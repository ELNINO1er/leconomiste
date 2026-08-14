import Link from "next/link";
import {AdSlot} from "../components/AdSlot";
import {ArticleCard} from "../components/ArticleCard";
import {Header} from "../components/Header";
import {LiveTVPlayer} from "../components/LiveTVPlayer";
import {articles} from "../../lib/mock-data";

const schedule=[{time:"18:30",title:"Le Journal de l’économie",type:"EN DIRECT"},{time:"19:00",title:"Face aux décideurs",type:"DÉBAT"},{time:"19:45",title:"BRVM : la séance décryptée",type:"MARCHÉS"},{time:"20:10",title:"Territoires en mouvement",type:"MAGAZINE"},{time:"21:00",title:"La grande interview",type:"ENTRETIEN"}];
export default function TV(){return <main className="tv-page"><Header/><section className="tv-hero"><div className="shell"><div><span><i/> L’ÉCONOMISTE TV</span><h1>La Côte d’Ivoire<br/><em>en direct.</em></h1><p>Une chaîne économique pour suivre, comprendre et anticiper les transformations du pays.</p></div><AdSlot format="Sponsoring antenne · Premium" title="Associez votre marque à nos grands rendez-vous." variant="dark"/></div></section>
  <section className="shell tv-live-layout"><div><LiveTVPlayer/><p className="tv-disclaimer">Lecteur en mode démonstration. Le flux HLS de la chaîne sera connecté lors de l’intégration du backend vidéo.</p></div><aside className="tv-schedule"><div><span>PROGRAMME</span><strong>Aujourd’hui</strong></div>{schedule.map((show,i)=><article className={i===0?"active":""} key={show.time}><time>{show.time}</time><div><small>{show.type}</small><h3>{show.title}</h3></div>{i===0&&<i/>}</article>)}<Link href="/formats">Voir toute la grille →</Link></aside></section>
  <section className="tv-ad shell"><AdSlot format="Billboard vidéo · 970 × 180" title="Votre campagne entre deux rendez-vous forts." copy="Pré-roll, sponsoring d’émission et habillage d’antenne en mode démonstration." variant="light"/></section>
  <section className="section shell tv-replay"><div className="editorial-heading"><span>▶</span><div><small>REPLAY & REPORTAGES</small><h2>À revoir maintenant</h2></div><Link href="/explorer">Toutes les vidéos →</Link></div><div className="latest-grid">{articles.slice(8,12).map(a=><ArticleCard article={a} key={a.slug}/>)}</div></section>
  </main>}

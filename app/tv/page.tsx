import Link from "next/link";
import {AdSlot} from "../components/AdSlot";
import {Header} from "../components/Header";
import {LiveTVPlayer} from "../components/LiveTVPlayer";
import {ReplayGallery} from "../components/ReplayGallery";
import {tvSchedule} from "../../lib/mock-data";

const schedule=tvSchedule;
export default function TV(){return <main className="tv-page"><Header/><section className="tv-hero"><div className="shell"><div><span><i/> L’ÉCONOMISTE TV</span><h1>La Côte d’Ivoire<br/><em>en direct.</em></h1><p>Une chaîne économique pour suivre, comprendre et anticiper les transformations du pays.</p></div><AdSlot format="Sponsoring antenne · Premium" title="Associez votre marque à nos grands rendez-vous." variant="dark"/></div></section>
  <section className="shell tv-live-layout"><div><LiveTVPlayer/><p className="tv-disclaimer">L’antenne de L’Économiste TV n’émet pas encore. La date de lancement sera annoncée dans nos colonnes.</p></div><aside className="tv-schedule"><div><span>PROGRAMME</span><strong>Aujourd’hui</strong></div>{schedule.map((show,i)=><article className={i===0?"active":""} key={show.time}><time>{show.time}</time><div><small>{show.type}</small><h3>{show.title}</h3></div>{i===0&&<i/>}</article>)}<Link href="/formats">Voir toute la grille →</Link></aside></section>
  <section className="tv-ad shell"><AdSlot format="Billboard vidéo · 970 × 180" title="Votre campagne entre deux rendez-vous forts." copy="Pré-roll, sponsoring d’émission et habillage d’antenne." variant="light"/></section>
  <section className="section shell tv-replay"><div className="editorial-heading"><span>▶</span><div><small>REPLAY & REPORTAGES</small><h2>À revoir par thème</h2></div><Link href="/explorer">Toutes les vidéos →</Link></div><ReplayGallery/></section>
  </main>}

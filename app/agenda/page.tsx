import {Header} from "../components/Header";
import {getAgenda} from "../../lib/api";
import {Filtre} from "./Filtre";

export const revalidate = 900;

export default async function Agenda(){
  const evenements=await getAgenda(40);

  return (
    <main className="agenda-page"><Header/>
      <section className="page-hero"><div className="shell"><span className="page-hero__kicker">AGENDA</span><h1>Les rendez-vous à ne pas manquer</h1><p>Économie, politique, sport, culture, institutions — filtrez par thème.</p></div></section>
      <section className="shell agenda-body">
        {evenements.length===0
          ?<p className="agenda-empty">Aucun rendez-vous inscrit à l’agenda pour le moment.</p>
          :<Filtre evenements={evenements}/>}
      </section>
    </main>
  );
}

import type {Metadata} from "next";

export const metadata:Metadata={
  title:"Sport ivoirien : résultats, Ligue 1 et Éléphants",
  description:"Scores, résultats et actualités de la Ligue 1 ivoirienne, des Éléphants et de la Coupe d’Afrique des Nations.",
  alternates:{canonical:"/sport"},
};

export default function SportLayout({children}:{children:React.ReactNode}){
  return children;
}

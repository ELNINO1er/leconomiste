import type {Metadata} from "next";

export const metadata:Metadata={
  title:"Services pratiques en Côte d’Ivoire",
  description:"Météo, conversion en francs CFA et informations pratiques pour les lecteurs en Côte d’Ivoire.",
  alternates:{canonical:"/services"},
};

export default function ServicesLayout({children}:{children:React.ReactNode}){
  return children;
}

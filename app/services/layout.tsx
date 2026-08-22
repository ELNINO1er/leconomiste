import type {Metadata} from "next";

export const metadata:Metadata={
  title:"Services pratiques en Côte d’Ivoire",
  description:"Conversion euro/FCFA et accès aux services vérifiés de L’Économiste de la Côte d’Ivoire.",
  alternates:{canonical:"/services"},
};

export default function ServicesLayout({children}:{children:React.ReactNode}){
  return children;
}

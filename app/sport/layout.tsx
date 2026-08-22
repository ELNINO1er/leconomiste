import type {Metadata} from "next";

export const metadata:Metadata={
  title:"Actualité sportive ivoirienne",
  description:"Les articles de la rédaction consacrés au sport ivoirien, aux clubs, aux compétitions et aux Éléphants.",
  alternates:{canonical:"/sport"},
};

export default function SportLayout({children}:{children:React.ReactNode}){
  return children;
}

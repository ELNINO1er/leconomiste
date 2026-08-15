import type {Metadata} from "next";
import "./globals.css";
import "./daily.css";
import {ImpactFlash} from "./components/ImpactFlash";
import {SiteFooter} from "./components/SiteFooter";
import {SiteTools} from "./SiteTools";

export const dynamic="force-dynamic";
export const revalidate=0;
const base="https://leconomistedelacotedivoire.com";
export const metadata:Metadata={
 metadataBase:new URL(base),
 title:{default:"L’Économiste de la Côte d’Ivoire — Le quotidien des décideurs",template:"%s | L’Économiste de la Côte d’Ivoire"},
 description:"Le quotidien ivoirien de référence pour comprendre l’économie, les entreprises, les politiques publiques et les transformations de la Côte d’Ivoire.",
 keywords:["quotidien ivoirien","actualité Côte d’Ivoire","économie ivoirienne","Abidjan","BRVM","cacao Côte d’Ivoire","entreprises ivoiriennes","événements Côte d’Ivoire"],
 authors:[{name:"La rédaction de L’Économiste de la Côte d’Ivoire"}],creator:"L’Économiste de la Côte d’Ivoire",publisher:"L’Économiste de la Côte d’Ivoire",
 alternates:{canonical:base},
 openGraph:{type:"website",locale:"fr_CI",url:base,siteName:"L’Économiste de la Côte d’Ivoire",title:"L’Économiste — Le quotidien des décideurs",description:"L’actualité économique et financière qui éclaire les décisions en Côte d’Ivoire.",images:[{url:"/og-daily.png",width:1536,height:1024,alt:"L’Économiste — Le quotidien des décideurs"}]},
 twitter:{card:"summary_large_image",title:"L’Économiste — Le quotidien des décideurs",description:"L’information ivoirienne qui éclaire vos décisions.",images:["/og-daily.png"]},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},icons:{icon:"/favicon.svg"},category:"Actualités"
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr-CI"><body suppressHydrationWarning>{children}<SiteFooter/><ImpactFlash/><SiteTools/></body></html>}

import Image from "next/image";
import Link from "next/link";
type Props={format:string;title:string;copy?:string;variant?:"light"|"dark"|"native";className?:string};
const visuals=[
 "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=82",
 "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=82",
 "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=82",
 "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=82",
];
export function AdSlot({format,title,copy="Un emplacement premium pour toucher les décideurs et entrepreneurs ivoiriens.",variant="light",className=""}:Props){const image=visuals[(format.length+title.length)%visuals.length];return <aside className={`premium-ad premium-ad--${variant} premium-ad--visual ${className}`} aria-label={`Publicité — ${title}`}><Image className="premium-ad__image" src={image} alt="Visuel de démonstration publicitaire" width={1400} height={800}/><div className="premium-ad__veil"/><div className="premium-ad__top"><span>PUBLICITÉ</span><small>{format}</small></div><div className="premium-ad__content"><span className="premium-ad__monogram">É.</span><div><strong>{title}</strong><p>{copy}</p></div></div><Link href="/informations">Découvrir l’offre annonceurs <span>↗</span></Link></aside>}

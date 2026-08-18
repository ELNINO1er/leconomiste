"use client";
import {useEffect,useState} from "react";

export function FollowTopic({topic}:{topic:string}){
  const [following,setFollowing]=useState(false);
  const key="followed-topics";

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture d'un état persisté après montage
    try{const list=JSON.parse(localStorage.getItem(key)||"[]");setFollowing(list.includes(topic))}catch{}
  },[topic]);

  function toggle(){
    let list:string[]=[];
    try{list=JSON.parse(localStorage.getItem(key)||"[]")}catch{}
    const next=list.includes(topic)?list.filter(t=>t!==topic):[...list,topic];
    localStorage.setItem(key,JSON.stringify(next));
    setFollowing(next.includes(topic));
  }

  return (
    <button className={`follow-topic ${following?"is-following":""}`} onClick={toggle} aria-pressed={following}>
      {following?`✓ Sujet suivi`:`+ Suivre « ${topic} »`}
    </button>
  );
}

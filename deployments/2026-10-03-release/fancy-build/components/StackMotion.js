"use client";
import { useEffect } from "react";
export default function StackMotion() {
  useEffect(()=>{
    const update=()=>{document.documentElement.dataset.scrolled=window.scrollY>40?"1":"0";};
    update(); window.addEventListener("scroll",update,{passive:true});
    return ()=>window.removeEventListener("scroll",update);
  },[]);
  return null;
}

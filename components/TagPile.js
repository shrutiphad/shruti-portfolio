"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function TagPile({ groups }) {
  const [round, setRound] = useState(0);
  const reduce = useReducedMotion();
  return <div className="toolkit">
    <div className="toolkit-header mono"><span>Three disciplines. One connected toolkit.</span><button onClick={()=>setRound(r=>r+1)}>Drop again ↻</button></div>
    <div className="toolkit-bins">{Object.entries(groups).map(([group,items],g)=><section className="toolkit-bin" key={group} style={{"--bin-color":["#c5a4ed","#98cba4","#edbd72"][g]}} aria-label={group}>
      <header><span className="mono">0{g+1} / {items.length} tools</span><h3>{group}</h3></header>
      <div className="toolkit-floor" key={round}>{items.map((label,i)=><motion.span className="tool-chip" key={label} initial={reduce?false:{y:-190,opacity:0,scale:.96}} whileInView={{y:0,opacity:1,scale:1}} viewport={{once:true,amount:.1}} transition={{type:"spring",stiffness:180,damping:17,mass:.8,delay:reduce?0:(items.length-1-i)*.045+g*.1}}>{label}</motion.span>)}</div>
      <div className="bin-baseline" aria-hidden="true" />
    </section>)}</div>
  </div>;
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function TagPile({ groups }) {
  const [round, setRound] = useState(0);
  const reduce = useReducedMotion();
  return <div className="toolkit">
    <div className="toolkit-header mono"><span>Three disciplines. One connected toolkit.</span><button onClick={() => setRound(r => r + 1)}>Drop again ↻</button></div>
    <div className="toolkit-bins">{Object.entries(groups).map(([group, items], g) => <ToolBin key={group} {...{group, items, g, round, reduce}} />)}</div>
  </div>;
}

function ToolBin({ group, items, g, round, reduce }) {
  const host = useRef(null);
  const entered = useInView(host, { amount: .1, once: true });
  const visible = useInView(host, { amount: .1 });
  return <section ref={host} className="toolkit-bin" style={{ "--bin-color": ["#c5a4ed", "#98cba4", "#edbd72"][g] }} aria-label={group}>
      <header><span className="mono">0{g + 1} / {items.length} tools</span><h3>{group}</h3></header>
      <div className="toolkit-floor" key={round}>{items.map((label, i) => {
        const delay = (items.length - 1 - i) * .045 + g * .1;
        return <motion.span className="tool-chip-drop" key={label}
          initial={reduce ? false : { y: -190, opacity: 0, scale: .96 }}
          animate={reduce || entered ? { y: 0, opacity: 1, scale: 1 } : { y: -190, opacity: 0, scale: .96 }}
          transition={{ type: "spring", stiffness: 180, damping: 17, mass: .8, delay: reduce ? 0 : delay }}>
          <motion.span className="tool-chip"
            animate={!reduce && visible ? { y: [0, -2.5, 0, -1, 0], rotate: [0, .65, 0, -.65, 0] } : { y: 0, rotate: 0 }}
            transition={!reduce && visible ? { duration: 3.8 + i % 3 * .4, repeat: Infinity, ease: "easeInOut", delay: delay + .8 } : { duration: 0 }}>
            {label}
          </motion.span>
        </motion.span>;
      })}</div>
      <div className="bin-baseline" aria-hidden="true" />
    </section>;
}

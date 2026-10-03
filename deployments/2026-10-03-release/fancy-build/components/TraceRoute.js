"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * The About section, as a trace rather than four paragraphs.
 *
 * Four stations on one line. A pulse runs the line on a loop; the active
 * station squares up and goes blue, and the fragment underneath swaps.
 * It walks itself until you touch it, then it is yours.
 */
export default function TraceRoute({ stations = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [active, setActive] = useState(stations.length - 1);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || !inView || !stations.length) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % stations.length), 3200);
    return () => clearInterval(id);
  }, [held, inView, stations.length]);

  if (!stations.length) return null;
  const current = stations[active];

  return (
    <div className="trace" ref={ref} onMouseLeave={() => setHeld(false)}>
      <div className="trace__line" data-in={inView ? "1" : "0"}>
        {stations.map((s, i) => (
          <button
            type="button"
            key={s.key}
            className="trace__stop"
            data-on={i === active ? "1" : "0"}
            data-cursor="link"
            onMouseEnter={() => {
              setHeld(true);
              setActive(i);
            }}
            onFocus={() => {
              setHeld(true);
              setActive(i);
            }}
            onClick={() => {
              setHeld(true);
              setActive(i);
            }}
            aria-label={`${s.label} — ${s.note}`}
          >
            <span className="trace__mark" aria-hidden="true">
              <i />
            </span>
            <span className="trace__year mono">{s.year}</span>
            <span className="trace__label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="trace__panel">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="trace__note">{current.note}</div>
          <div className="tags">
            {current.chips.map((c) => (
              <span className="tag" key={c}>
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PipelineDiagram from "./PipelineDiagram";
import { disciplineTones } from "@/lib/design";



/**
 * About and "what I do" are the same section now. Pick a skill on the left
 * and its schematic draws on the right, with one colored label group.
 */
export default function CapabilityDeck({ items = [] }) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;
  const cap = items[active];
  const tint = disciplineTones[cap.key] || "var(--blue)";

  return (
    <div className="capability-explorer">
      <p id="capability-hint" className="deck__hint mono"><span className="deck__hint-desktop">Click a discipline to explore its demonstration, workflow and tools.</span><span className="deck__hint-mobile">Tap a discipline. Its demonstration, workflow and tools appear below.</span></p>
    <div className="deck">
      <div className="deck__menu">
        {items.map((item, i) => (
          <button
            type="button"
            key={item.key}
            className="deck__tab"
            aria-pressed={i === active}
            aria-controls="capability-content"
            aria-describedby="capability-hint"
            data-next={i === (active + 1) % items.length ? "1" : "0"}
            data-on={i === active ? "1" : "0"}
            data-cursor="link"
            onClick={() => setActive(i)}
            style={{ "--tint": disciplineTones[item.key] || "var(--blue)" }}
          >
            <span className="deck__idx mono">{item.index}</span>
            <span className="deck__name">{item.title}</span>
            <span className="deck__bar" aria-hidden="true" />
          </button>
        ))}
      </div>

      <motion.div
        id="capability-content"
        className="deck__stage"
        key={cap.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ "--tint": tint }}
      >
        <p className="deck__demo-label mono">{cap.title} · Demonstration</p>
        <motion.div
          className="deck__claim"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {cap.claim}
        </motion.div>

        {cap.diagram ? (
          <div className="deck__fig">
            <PipelineDiagram key={`${cap.key}-fig`} variant={cap.diagram}
              stops={cap.flow.map(label => ({ label: label.toUpperCase() }))}
              labelItems={cap.diagramLabels} tint={tint} />
          </div>
        ) : null}

        <div className="flow">
          {cap.flow.map((step, i) => (
            <motion.div
              className="flow__node"
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              data-last={i === cap.flow.length - 1 ? "1" : "0"}
            >
              <span className="flow__dot" aria-hidden="true" />
              <span className="flow__text mono">{step}</span>
            </motion.div>
          ))}
        </div>

        {cap.note ? <span className="deck__note">{cap.note}</span> : null}
      </motion.div>
    </div>
    </div>
  );
}

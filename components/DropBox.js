"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * The contact box falls in, bounces once and settles slightly off-square.
 * Whatever gets typed into it is handed to the mail client addressed to
 * Shruti — no server, no form endpoint, nothing to leak.
 */
export default function DropBox({ to, placeholder }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const [body, setBody] = useState("");
  const [from, setFrom] = useState("");
  const [sent, setSent] = useState(false);

  const send = () => {
    const subject = from ? `Portfolio — ${from}` : "Portfolio — a funnel I do not trust";
    const lines = [body.trim() || "(no message)", "", from ? `Reply to: ${from}` : ""].join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    setSent(true);
  };

  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") send();
  };

  return (
    <div ref={ref} className="drop__wrap">
      <motion.div
        className="drop"
        initial={{ y: -260, rotate: -6, opacity: 0 }}
        animate={inView ? { y: 0, rotate: -0.6, opacity: 1 } : { y: -260, rotate: -6, opacity: 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 11, mass: 1.1, delay: 0.12 }}
      >
        <div className="drop__head mono">
          <span>Drop it here</span>
          <span className="drop__to">{to}</span>
        </div>

        <textarea
          className="drop__text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder}
          rows={4}
          spellCheck="false"
        />

        <div className="drop__foot">
          <input
            className="drop__from mono"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onKeyDown={onKey}
            placeholder="YOUR EMAIL"
            inputMode="email"
            spellCheck="false"
          />
          <button type="button" className="drop__send mono" onClick={send} data-cursor="link">
            {sent ? "Opened ↗" : "Send →"}
          </button>
        </div>

        <div className="drop__hint mono">⌘ + Return</div>
      </motion.div>
    </div>
  );
}

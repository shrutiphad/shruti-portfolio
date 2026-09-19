"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Headline reveal: the text rises out of a clipped box instead of fading in.
 *
 * The observer watches the *box*, not the text. The text starts translated
 * fully below it, so it is clipped out of existence — an observer on the text
 * itself would never see it intersect and the line would stay hidden forever.
 */
export default function MaskUp({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()}>
      <motion.span
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
        style={{ display: "block", willChange: "transform" }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

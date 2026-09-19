"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const COLS = 14;
const ROWS = 9;

function labelFor(path) {
  if (!path || path === "/") return "Shruti Phad";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "projects" && parts[1]) return parts[1].replace(/-/g, " ");
  if (parts[0] === "projects") return "Projects";
  return parts.join(" / ");
}

/* deterministic jitter — Math.random() here would differ between the server
   render and the client one and break hydration */
function jitter() {
  let seed = 991733;
  const out = [];
  for (let i = 0; i < COLS * ROWS; i += 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    out.push(seed / 4294967296);
  }
  return out;
}

const NOISE = jitter();

/**
 * Route changes do not slide any more.
 *
 * The cover breaks into a grid of grains. Each one tips on its own axis,
 * twists and shrinks out, on a diagonal sweep with enough jitter that the
 * leading edge is ragged rather than a clean line. The page behind it comes
 * up out of the floor — that half is a CSS keyframe on the page itself, so
 * nothing is left holding a transform once it lands.
 */
export default function RouteWipe({ children }) {
  const pathname = usePathname();

  return (
    <>
      <motion.div key={`wipe-${pathname}`} className="wipe" aria-hidden="true">
        <div className="wipe__grid">
          {NOISE.map((n, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const delay = 0.08 + ((col + row) / (COLS + ROWS)) * 0.4 + n * 0.18;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 1, rotateX: 0, rotateZ: 0 }}
                animate={{
                  opacity: 0,
                  scale: 0.1,
                  rotateX: 70 + n * 60,
                  rotateZ: n > 0.5 ? 28 : -28,
                }}
                transition={{ duration: 0.42 + n * 0.22, delay, ease: [0.76, 0, 0.24, 1] }}
              />
            );
          })}
        </div>

        <motion.span
          className="wipe__label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [10, 0, -8] }}
          transition={{ duration: 0.68, times: [0, 0.4, 1], ease: "easeOut" }}
        >
          {labelFor(pathname)}
        </motion.span>
      </motion.div>

      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}

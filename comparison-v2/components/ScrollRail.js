"use client";

import { useEffect, useRef, useState } from "react";

const PANELS = [
  { id: "top", label: "Intro" },
  { id: "machine", label: "Run it" },
  { id: "about", label: "About" },
  { id: "experience", label: "Built" },
  { id: "leadership", label: "Beyond" },
  { id: "toolkit", label: "Toolkit" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** A hairline progress bar and, on wide screens, the panel index down the right edge. */
export default function ScrollRail({ rail = true }) {
  const [active, setActive] = useState(0);
  const spine = useRef(null);

  useEffect(() => {
    const bar = document.createElement("div");
    bar.className = "progress";
    document.body.appendChild(bar);

    let frame = 0;
    const read = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.setProperty("--p", String(p));
      if (spine.current) spine.current.style.setProperty("--p", String(p));

      // which deck panel is under the fold line
      let index = 0;
      PANELS.forEach((panel, n) => {
        const el = document.getElementById(panel.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) index = n;
      });
      setActive(index);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bar.remove();
    };
  }, []);

  if (!rail) return null;

  return (
    <div className="rail">
      <span className="rail__spine" ref={spine} aria-hidden="true" />
      {PANELS.map((panel, n) => (
        <div className="rail__item" key={panel.id} data-on={n === active ? "1" : "0"}>
          <span>{String(n).padStart(2, "0")}</span>
          <i />
        </div>
      ))}
    </div>
  );
}

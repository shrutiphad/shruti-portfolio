"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Links lean a few pixels toward the pointer. Small enough to feel, not to notice. */
function Magnetic({ children }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${
      (e.clientY - (r.top + r.height / 2)) * 0.3
    }px)`;
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "";
  };
  return (
    <span onMouseMove={onMove} onMouseLeave={onLeave} className="mag">
      {children}
    </span>
  );
}

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setSolid(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="nav mono" data-solid={solid ? "1" : "0"}>
      <Link href="/" className="nav__mark" data-cursor="link" aria-label="Shruti Phad — home">
        Shruti <span>Phad</span>
      </Link>

      <div className="nav__right">
        <div className="nav__links">
          <Magnetic>
            <Link href="/#about" data-cursor="link">
              About
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/#experience" data-cursor="link">
              Built
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/projects" data-cursor="link">
              Work
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/#contact" data-cursor="link">
              Contact
            </Link>
          </Magnetic>
        </div>

        <div className="nav__tools">
          <button
            type="button"
            className="chip mono chip--kbd"
            data-cursor="link"
            onClick={() => window.dispatchEvent(new Event("sp:palette"))}
            aria-label="Open command palette"
          >
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>
    </nav>
  );
}

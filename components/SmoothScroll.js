"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling. It is the single biggest reason a site "feels designed"
 * — the deck panels slide past each other on an eased curve instead of the
 * browser's stepped scroll. Anchor links are routed through it too.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchor = (e) => {
      const link = e.target.closest?.('a[href*="#"]');
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    };

    document.addEventListener("click", onAnchor);
    return () => {
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

/**
 * The whole page is a deck. Every panel is sticky, so the next one
 * slides up over the one before it. This adds the second half of that
 * effect: the panel being covered settles back a little instead of
 * sitting flat under the incoming one.
 */
export default function StackMotion() {
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll(".slide"));
    if (panels.length < 2) return;

    // A panel taller than the window has to finish scrolling before it pins,
    // otherwise its lower half is unreachable. Negative sticky offset does that.
    const measure = () => {
      const vh = window.innerHeight;
      panels.forEach((panel) => {
        const h = panel.offsetHeight;
        panel.style.top = h > vh ? `${Math.round(vh - h)}px` : "0px";
      });
    };

    measure();
    window.addEventListener("resize", measure);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      return () => window.removeEventListener("resize", measure);
    }

    let frame = 0;
    let lastY = window.scrollY;
    let skew = 0;

    // which panel is pinned at the top; when that changes, the incoming
    // one stamps its number and sweeps a rule across itself
    let current = -1;
    let stampTimer = 0;
    const markArrival = (index) => {
      if (index === current) return;
      current = index;
      const panel = panels[index];
      if (!panel) return;
      panel.removeAttribute("data-arrive");
      // force a reflow so the animation restarts even on a fast re-entry
      void panel.offsetWidth;
      panel.setAttribute("data-arrive", "1");
      clearTimeout(stampTimer);
      stampTimer = setTimeout(() => panel.removeAttribute("data-arrive"), 1300);
    };

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.documentElement.dataset.scrolled = window.scrollY > 40 ? "1" : "0";

      // scroll velocity, eased — the deck leans into the direction of travel
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      const targetSkew = Math.max(-2.4, Math.min(2.4, dy * 0.045));
      skew += (targetSkew - skew) * 0.12;
      if (Math.abs(skew) < 0.01) skew = 0;
      for (let i = 0; i < panels.length; i += 1) {
        const inner = panels[i].querySelector(".slide__inner");
        if (!inner) continue;
        const next = panels[i + 1];
        const clear = () => {
          inner.style.transform = `skewY(${skew.toFixed(3)}deg)`;
          inner.style.opacity = "";
          inner.style.filter = "";
          panels[i].style.setProperty("--cover", "0");
        };
        if (!next) {
          clear();
          continue;
        }
        const top = next.getBoundingClientRect().top;
        // 0 while the next panel is still below the fold, 1 once it covers this one
        const p = Math.min(Math.max(1 - top / vh, 0), 1);
        if (p <= 0) {
          clear();
          continue;
        }
        const eased = p * p;
        // The outgoing section does not slide away — it goes out of focus,
        // loses its colour and is gone well before the next one lands. No
        // upward shift: that would push its own text under the fixed nav.
        inner.style.transform = `perspective(1400px) rotateX(${(eased * 12).toFixed(
          2
        )}deg) scale(${(1 - 0.13 * eased).toFixed(4)}) translateY(${(eased * 2.2).toFixed(
          2
        )}%) skewY(${skew.toFixed(3)}deg)`;
        // fully invisible at ~65% covered, so the last third is pure glass
        inner.style.opacity = Math.max(0, 1 - 1.55 * eased).toFixed(3);
        inner.style.filter =
          eased > 0.015
            ? `blur(${(eased * 13).toFixed(2)}px) saturate(${(1 - eased * 0.9).toFixed(3)})`
            : "";
        panels[i].style.setProperty("--cover", eased.toFixed(3));
      }

      // the topmost panel whose box still covers the fold line owns the screen
      let top = 0;
      for (let i = 0; i < panels.length; i += 1) {
        const r = panels[i].getBoundingClientRect();
        if (r.top <= 40 && r.bottom > 60) top = i;
      }
      markArrival(top);

      // scroll events stop before the lean has settled, so keep the loop
      // alive until it reaches zero — otherwise the page freezes mid-skew
      if (skew !== 0 && !frame) frame = requestAnimationFrame(paint);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(stampTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return null;
}

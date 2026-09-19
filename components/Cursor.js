"use client";

import { useEffect } from "react";

/**
 * Pointer, second attempt.
 *
 * The dot stays — it tracks exactly, and it is the thing you actually aim
 * with. Behind it, four corner brackets lag on a spring, turn to face the
 * direction of travel and stretch along it, so fast movement reads as a
 * streak and stopping snaps them square again. No arrow, no ring.
 *
 * On a link the brackets pull in tight and go blue. On a project row they
 * open into a slab with a word in it. Difference blending keeps all of it
 * readable on the black panels and the white ones.
 */
export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;

    const dot = document.createElement("div");
    dot.className = "cur-dot";

    const box = document.createElement("div");
    box.className = "cur-box";
    const inner = document.createElement("div");
    inner.className = "cur-box__in";
    for (let i = 0; i < 4; i += 1) {
      const corner = document.createElement("i");
      inner.appendChild(corner);
    }
    const label = document.createElement("span");
    label.className = "cur-box__label";
    inner.appendChild(label);
    box.appendChild(inner);

    document.body.append(dot, box);
    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let bx = x;
    let by = y;
    let angle = 0;
    let stretch = 1;
    let raf = 0;
    let live = false;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;

      if (!live) {
        live = true;
        bx = x;
        by = y;
        dot.style.opacity = "1";
        box.style.opacity = "1";
      }

      const panel = e.target.closest?.(".slide, .page");
      if (panel) {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty("--px", `${((x - r.left) / r.width) * 100}%`);
        panel.style.setProperty("--py", `${((y - r.top) / r.height) * 100}%`);
      }
    };

    const onOver = (e) => {
      const hit = e.target.closest?.("[data-cursor]");
      const state = hit ? hit.getAttribute("data-cursor") || "" : "";
      box.setAttribute("data-state", state);
      const text = hit ? hit.getAttribute("data-cursor-label") || "" : "";
      label.textContent = text;
      box.setAttribute("data-labelled", text ? "1" : "0");
    };

    const onDown = () => box.setAttribute("data-down", "1");
    const onUp = () => box.setAttribute("data-down", "0");

    const onLeave = () => {
      dot.style.opacity = "0";
      box.style.opacity = "0";
      live = false;
    };

    const loop = () => {
      const k = reduce.matches ? 1 : 0.17;
      const dx = x - bx;
      const dy = y - by;
      bx += dx * k;
      by += dy * k;

      const speed = Math.hypot(dx, dy);
      // only re-aim when the pointer is genuinely moving, or the brackets
      // spin on every stray pixel
      if (speed > 1.4) {
        const target = (Math.atan2(dy, dx) * 180) / Math.PI;
        let delta = ((target - angle + 540) % 360) - 180;
        angle += delta * 0.22;
      }
      const targetStretch = 1 + Math.min(speed / 26, 0.85);
      stretch += (targetStretch - stretch) * 0.16;

      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      box.style.transform = `translate3d(${bx}px, ${by}px, 0) rotate(${angle.toFixed(2)}deg) scaleX(${stretch.toFixed(
        3
      )}) scaleY(${(2 - stretch * 0.72).toFixed(3)})`;
      // keep the word upright while the frame around it turns
      label.style.transform = `rotate(${(-angle).toFixed(2)}deg)`;

      raf = requestAnimationFrame(loop);
    };

    dot.style.opacity = "0";
    box.style.opacity = "0";
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
      dot.remove();
      box.remove();
    };
  }, []);

  return null;
}

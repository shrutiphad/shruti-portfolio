"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

// Keep the full-quality source. Only tiles near the mouse move; the face is
// never downsampled. The canvas uses the same above-the-hands crop as the image.
export default function Portrait() {
  const host = useRef(null);
  const canvas = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const wrap = host.current, el = canvas.current;
    const ctx = el.getContext("2d");
    const source = new window.Image();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let tiles = [], width = 0, height = 0, frame = 0, loaded = false, visible = true, disposed = false;
    const pointer = { x: 0, y: 0, active: false };
    const gap = 6;
    function paint() {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(source, 0, 0, 1131, 1040, 0, 0, width, height);
      const moved = tiles.filter(t => Math.abs(t.dx) + Math.abs(t.dy) > .1);
      // Clear the original positions before drawing any displaced tiles.
      for (const t of moved) ctx.clearRect(t.x, t.y, t.w, t.h);
      for (const t of moved) ctx.drawImage(source, t.x * 1131 / width, t.y * 1040 / height,
        t.w * 1131 / width, t.h * 1040 / height,
        t.x + t.dx, t.y + t.dy, t.w - .35, t.h - .35);
    }
    function tick() {
      frame = 0;
      if (!loaded || !visible || disposed) return;
      let moving = false;
      const radius = Math.min(90, width * .2);
      for (const t of tiles) {
        t.vx += -t.dx * .065; t.vy += -t.dy * .065;
        if (pointer.active && !reduce.matches) {
          const dx = t.x + t.w / 2 + t.dx - pointer.x;
          const dy = t.y + t.h / 2 + t.dy - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < radius) {
            const force = (1 - d / radius) * 2.5;
            t.vx += dx / (d || 1) * force;
            t.vy += dy / (d || 1) * force;
          }
        }
        t.vx *= .8; t.vy *= .8; t.dx += t.vx; t.dy += t.vy;
        if (Math.abs(t.dx) + Math.abs(t.dy) + Math.abs(t.vx) + Math.abs(t.vy) > .12) moving = true;
        else { t.dx = 0; t.dy = 0; t.vx = 0; t.vy = 0; }
      }
      paint();
      if (moving || pointer.active) frame = requestAnimationFrame(tick);
    }
    function wake() { if (!frame && loaded && visible && !disposed) frame = requestAnimationFrame(tick); }
    function resize() {
      if (!loaded || disposed) return;
      width = wrap.clientWidth; height = wrap.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tiles = [];
      for (let y = 0; y < height; y += gap) for (let x = 0; x < width; x += gap)
        tiles.push({ x, y, w: Math.min(gap, width - x), h: Math.min(gap, height - y), dx: 0, dy: 0, vx: 0, vy: 0 });
      paint(); setReady(true);
    }
    function move(e) {
      if (e.pointerType === "touch" || !fine.matches || reduce.matches) return;
      const r = wrap.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true; wake();
    }
    function leave() { pointer.active = false; wake(); }
    function preference() { leave(); resize(); }
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake(); else { pointer.active = false; cancelAnimationFrame(frame); frame = 0; }
    });
    ro.observe(wrap); io.observe(wrap);
    wrap.addEventListener("pointermove", move); wrap.addEventListener("pointerleave", leave);
    reduce.addEventListener("change", preference);
    source.onload = () => { if (!disposed) { loaded = true; resize(); } };
    source.src = "/shruti-portrait-cutout.png";
    return () => {
      disposed = true; cancelAnimationFrame(frame); ro.disconnect(); io.disconnect();
      wrap.removeEventListener("pointermove", move); wrap.removeEventListener("pointerleave", leave);
      reduce.removeEventListener("change", preference); source.onload = null;
    };
  }, []);

  return <span ref={host} className="portrait-render" data-ready={ready}>
    <NextImage src="/shruti-portrait-cutout.png" width={1131} height={1391} quality={95}
      sizes="(max-width: 600px) 90vw, (max-width: 900px) 560px, 45vw"
      alt="Shruti Phad" priority className="portrait-image" />
    <canvas ref={canvas} className="portrait-reactive" aria-hidden="true" />
  </span>;
}

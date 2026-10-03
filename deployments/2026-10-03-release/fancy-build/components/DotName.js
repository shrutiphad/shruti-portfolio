"use client";

import { useEffect, useRef } from "react";

/**
 * The name is not type — it is a field of dots that holds the shape of the
 * type. They fly in from scatter on load, and the pointer pushes them out of
 * the way like iron filings, then they spring back.
 *
 * Everything is drawn in the panel's own foreground colour, so it inverts
 * with the rest of the page. Roughly one dot in forty is blue.
 */
export default function DotName({ text = "Shruti Phad", className = "" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let visible = true;
    let disposed = false;
    let dots = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let started = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const colours = () => {
      const cs = getComputedStyle(wrap);
      return {
        fg: cs.getPropertyValue("--fg").trim() || "#edebe7",
        blue: cs.getPropertyValue("--blue").trim() || "#6f9df5",
      };
    };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(rect.width, 1);
      // the field is as tall as the type it holds
      h = Math.max(Math.round(w * (text.length > 12 ? 0.22 : 0.26)), 90);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // draw the word offscreen, then read where the ink is
      const off = document.createElement("canvas");
      off.width = Math.round(w);
      off.height = Math.round(h);
      const octx = off.getContext("2d", { willReadFrequently: true });

      let size = Math.round(h * 0.92);
      const font = (px) => `300 ${px}px "Inter Variable", Inter, "Helvetica Neue", Arial, sans-serif`;
      octx.font = font(size);
      const target = w * 0.985;
      const measured = octx.measureText(text).width;
      size = Math.floor(size * (target / measured));
      octx.font = font(size);
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(text, 0, h / 2 + size * 0.02);

      const gap = w < 520 ? 4 : 5;
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const next = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          const alpha = data[(y * off.width + x) * 4 + 3];
          if (alpha > 128) {
            next.push({
              tx: x,
              ty: y,
              x: x + (Math.random() - 0.5) * w * 0.7,
              y: y + (Math.random() - 0.5) * h * 3,
              vx: 0,
              vy: 0,
              r: gap * 0.29,
              blue: next.length % 41 === 0,
              delay: (x / off.width) * 380,
            });
          }
        }
      }
      dots = next;
      started = performance.now();
      if (!raf && visible && !disposed) raf = requestAnimationFrame(frame);
    };

    const frame = (now) => {
      raf = 0;
      if (disposed || !visible) return;
      let moving = false;
      const { fg, blue } = colours();
      // Clear every backing pixel, including fractional CSS-size edges.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const t = now - started;
      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];

        if (reduce.matches) {
          d.x = d.tx;
          d.y = d.ty;
        } else {
          const live = t > d.delay;
          // spring home
          const k = live ? 0.055 : 0;
          d.vx += (d.tx - d.x) * k;
          d.vy += (d.ty - d.y) * k;

          // pointer pushes the field apart
          if (pointer.active) {
            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist2 = dx * dx + dy * dy;
            const radius = 118;
            if (dist2 < radius * radius && dist2 > 0.01) {
              const dist = Math.sqrt(dist2);
              const force = (1 - dist / radius) * 5.2;
              d.vx += (dx / dist) * force;
              d.vy += (dy / dist) * force;
            }
          }

          d.vx *= 0.84;
          d.vy *= 0.84;
          d.x += d.vx;
          d.y += d.vy;
        }

        const speed = Math.min(Math.abs(d.vx) + Math.abs(d.vy), 6);
        if (speed > .02) moving = true;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r + speed * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = d.blue ? blue : fg;
        ctx.globalAlpha = d.blue ? 1 : 0.92;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce.matches && (t < 1800 || pointer.active || moving)) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x > -140 && pointer.x < w + 140 && pointer.y > -140 && pointer.y < h + 140;
      if (!raf && visible && !reduce.matches && pointer.active) raf = requestAnimationFrame(frame);
    };

    const onOut = () => {
      pointer.active = false;
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => {
      if (!disposed) build();
    });

    const ro = new ResizeObserver(() => build());
    ro.observe(wrap);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onOut);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
      if (!visible) { cancelAnimationFrame(raf); raf = 0; }
    });
    visibility.observe(wrap);

    return () => {
      disposed = true;
      visibility.disconnect();
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className={`dotname ${className}`.trim()}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <h1 className="sr-only">{text}</h1>
    </div>
  );
}

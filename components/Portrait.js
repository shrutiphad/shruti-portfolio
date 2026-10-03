"use client";
import { useEffect, useRef } from "react";
import portrait from "@/lib/portrait.json";

// A single high-DPI drawing. CSS handles the reveal; no perpetual canvas loop.
export default function Portrait() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width <= 32 || height <= 18) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min((width - 32) / portrait.w, (height - 18) / portrait.h);
      const x0 = (width - portrait.w * scale) / 2;
      const y0 = height - portrait.h * scale;
      for (let y = 0; y < portrait.h; y++) {
        for (let x = 0; x < portrait.w; x++) {
          const value = parseInt(portrait.map[y * portrait.w + x], 16);
          if (!value) continue;
          const light = value / 15;
          ctx.fillStyle = `rgb(${Math.round(42 + light * 191)}, ${Math.round(65 + light * 177)}, ${Math.round(104 + light * 147)})`;
          ctx.beginPath();
          ctx.arc(x0 + (x + .5) * scale, y0 + (y + .5) * scale, scale * .43, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, []);
  return <canvas ref={ref} className="portrait-canvas" role="img" aria-label="Shruti Phad, blue dot portrait" />;
}

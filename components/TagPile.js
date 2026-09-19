"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The toolkit, dropped. Every skill is a real rigid body — they fall in,
 * collide, stack, and settle into a heap. The pointer is a body too, so
 * you can shove the pile around; the button throws it back up.
 *
 * Bodies are invisible: matter.js does the maths, real DOM chips are
 * positioned from it, so the type stays type and inherits the panel colours.
 */
export default function TagPile({ groups }) {
  const sceneRef = useRef(null);
  const chipsRef = useRef([]);
  const apiRef = useRef(null);
  const [ready, setReady] = useState(false);

  const items = Object.entries(groups).flatMap(([group, list]) =>
    list.map((label) => ({ label, group }))
  );

  useEffect(() => {
    let cancelled = false;
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return undefined;

    import("matter-js").then((M) => {
      if (cancelled || !sceneRef.current) return;
      const { Engine, Runner, World, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = M;

      const width = scene.clientWidth;
      const height = scene.clientHeight;

      const engine = Engine.create();
      engine.gravity.y = 1.1;
      const runner = Runner.create();

      const wallOpts = { isStatic: true, restitution: 0.2, friction: 0.6 };
      const walls = [
        Bodies.rectangle(width / 2, height + 40, width * 2, 80, wallOpts),
        Bodies.rectangle(-40, height / 2, 80, height * 3, wallOpts),
        Bodies.rectangle(width + 40, height / 2, 80, height * 3, wallOpts),
      ];
      World.add(engine.world, walls);

      const bodies = chipsRef.current.filter(Boolean).map((el, i) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const body = Bodies.rectangle(
          40 + Math.random() * Math.max(width - 80, 40),
          -80 - i * 55,
          w,
          h,
          { restitution: 0.18, friction: 0.72, frictionAir: 0.014, chamfer: { radius: 2 } }
        );
        // infinite inertia = the chip cannot spin, so every label stays
        // upright and readable once the heap settles
        Body.setInertia(body, Infinity);
        Body.setAngle(body, 0);
        return { body, el, w, h };
      });
      World.add(engine.world, bodies.map((b) => b.body));

      const mouse = Mouse.create(scene);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.14, render: { visible: false } },
      });
      // let the page keep scrolling over the pile
      mouse.element.removeEventListener("wheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
      World.add(engine.world, mc);

      Events.on(engine, "afterUpdate", () => {
        for (const { body, el, w, h } of bodies) {
          el.style.transform = `translate3d(${Math.round(body.position.x - w / 2)}px, ${Math.round(
            body.position.y - h / 2
          )}px, 0)`;
        }
      });

      Runner.run(runner, engine);
      setReady(true);

      const toss = () => {
        for (const { body } of bodies) {
          Body.setPosition(body, {
            x: 40 + Math.random() * Math.max(width - 80, 40),
            y: -60 - Math.random() * 300,
          });
          Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 0 });
          Body.setAngularVelocity(body, 0);
        }
      };

      apiRef.current = { toss };

      const onResize = () => {
        const nw = scene.clientWidth;
        Body.setPosition(walls[0], { x: nw / 2, y: scene.clientHeight + 40 });
        Body.setPosition(walls[2], { x: nw + 40, y: scene.clientHeight / 2 });
      };
      window.addEventListener("resize", onResize);

      apiRef.current.cleanup = () => {
        window.removeEventListener("resize", onResize);
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
        Composite.clear(engine.world, false);
      };
    });

    return () => {
      cancelled = true;
      apiRef.current?.cleanup?.();
    };
  }, []);

  return (
    <div className="pile">
      <div className="pile__head mono">
        <span>{items.length} pieces · drag them · they stay the right way up</span>
        <button type="button" data-cursor="link" onClick={() => apiRef.current?.toss?.()}>
          Drop them again ↻
        </button>
      </div>
      <div className="pile__scene" ref={sceneRef} data-ready={ready ? "1" : "0"}>
        {items.map((item, i) => (
          <span
            key={`${item.group}-${item.label}`}
            className="pile__chip mono"
            ref={(el) => {
              chipsRef.current[i] = el;
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="pile__legend mono">
        {Object.entries(groups).map(([group, list]) => (
          <span key={group}>
            <b>{group}</b> — {list.length}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useId, useEffect, useState, createContext, useContext } from "react";
import { motion, useInView } from "framer-motion";

/**
 * The schematics. Every line draws itself when the diagram comes into view,
 * then packets run the route on a loop — the page showing the system rather
 * than describing it. Strokes inherit the panel's foreground colour; only the
 * packets and the one node that matters are blue.
 */

const DiagramScope = createContext("");

function ScopedPath(props) {
  const scope = useContext(DiagramScope);
  return <motion.path {...props} id={props.id ? `${scope}-${props.id}` : undefined} />;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.12 },
      opacity: { duration: 0.2, delay: 0.15 + i * 0.12 },
    },
  }),
};

const pop = {
  hidden: { scale: 0, opacity: 0 },
  show: (i = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.1 },
  }),
};

/* scaleX only — animating opacity here would write an inline value and
   override the weight the .dg__bar class gives each bar */
const grow = {
  hidden: { scaleX: 0 },
  show: (i = 0) => ({
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.09 },
  }),
};

function Label({ x, y, children, anchor = "start", dim = true }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="dg__label" style={{ opacity: dim ? 0.9 : 1 }}>
      {children}
    </text>
  );
}

function Packet({ id, dur = 3.4, begin = "0s", r = 3.2 }) {
  const scope = useContext(DiagramScope);
  return (
    <circle r={r} className="dg__packet">
      <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" rotate="auto">
        <mpath href={`#${scope}-${id}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.08;0.9;1"
        dur={`${dur}s`}
        begin={begin}
        repeatCount="indefinite"
      />
    </circle>
  );
}

/* ---------------------------------------------------------------- wide
   Hugg: three channels in, one attributed order out.
------------------------------------------------------------------- */

function Attribution() {
  return (
    <>
      {[70, 150, 230].map((y, i) => (
        <ScopedPath
          key={y}
          id={`atr-${i}`}
          d={`M 58 ${y} C 150 ${y}, 200 150, 292 150`}
          className="dg__line"
          variants={draw}
          custom={i}
        />
      ))}
      <ScopedPath id="atr-spine" d="M 292 150 L 566 150" className="dg__line dg__line--key" variants={draw} custom={3} />
      <ScopedPath id="atr-out-1" d="M 566 150 C 640 150, 660 78, 742 78" className="dg__line" variants={draw} custom={4} />
      <ScopedPath id="atr-out-2" d="M 566 150 C 640 150, 660 222, 742 222" className="dg__line" variants={draw} custom={4.4} />

      {[70, 150, 230].map((y, i) => (
        <motion.rect key={y} x="44" y={y - 7} width="14" height="14" className="dg__node" variants={pop} custom={i} />
      ))}
      <motion.circle cx="430" cy="150" r="9" className="dg__node" variants={pop} custom={3} />
      <motion.rect x="556" y="140" width="20" height="20" className="dg__node dg__node--key" variants={pop} custom={4} />
      <motion.rect x="742" y="68" width="14" height="14" className="dg__node" variants={pop} custom={5} />
      <motion.rect x="742" y="212" width="14" height="14" className="dg__node" variants={pop} custom={5.3} />

      <Label x="44" y="48">WHATSAPP</Label>
      <Label x="44" y="128">INSTAGRAM</Label>
      <Label x="44" y="208">MESSENGER</Label>
      <Label x="430" y="128" anchor="middle">N8N → SUPABASE</Label>
      <Label x="430" y="184" anchor="middle">SAGEPILOT</Label>
      <Label x="566" y="122" anchor="middle" dim={false}>ATTRIBUTED</Label>
      <Label x="762" y="80">RAZORPAY</Label>
      <Label x="762" y="100">WEBHOOKS</Label>
      <Label x="762" y="224">DAILY REPORT</Label>

      <Packet id="atr-0" begin="0s" />
      <Packet id="atr-1" begin="0.9s" />
      <Packet id="atr-2" begin="1.8s" />
      <Packet id="atr-spine" dur={2.2} begin="1.2s" />
      <Packet id="atr-out-1" dur={2} begin="2.4s" />
      <Packet id="atr-out-2" dur={2} begin="3s" />
    </>
  );
}

/* --------------------------------------------------------------- engine
   The hero schematic, built off the banner: leads enter, the agent
   handles them, automation carries them, the curve goes up.
------------------------------------------------------------------- */

function Engine() {
  const rungs = [
    { y: 44, label: "LEADS" },
    { y: 128, label: "AI AGENT" },
    { y: 212, label: "AUTOMATE" },
    { y: 292, label: "GROW", key: true },
  ];

  return (
    <>
      {rungs.slice(0, 3).map((r, i) => (
        <ScopedPath
          key={r.label}
          id={`en-${i}`}
          d={`M 62 ${r.y + 14} L 62 ${rungs[i + 1].y - 14}`}
          className={i === 2 ? "dg__line dg__line--key" : "dg__line"}
          variants={draw}
          custom={i * 0.5}
        />
      ))}
      {rungs.map((r, i) => (
        <motion.rect
          key={`n${r.label}`}
          x="48"
          y={r.y - 14}
          width="28"
          height="28"
          className={r.key ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={i * 0.35}
        />
      ))}
      {rungs.map((r) => (
        <Label key={`l${r.label}`} x="92" y={r.y + 4} dim={!r.key}>
          {r.label}
        </Label>
      ))}

      {/* the curve — enrich, score, route */}
      <ScopedPath
        id="en-base"
        d="M 250 292 L 492 292"
        className="dg__line"
        variants={draw}
        custom={1.4}
      />
      <ScopedPath
        id="en-curve"
        d="M 250 274 C 320 272, 352 238, 384 178 C 412 126, 440 76, 492 60"
        className="dg__line dg__line--key"
        variants={draw}
        custom={1.8}
      />
      {[
        { x: 250, y: 274 },
        { x: 384, y: 178 },
        { x: 492, y: 60 },
      ].map((p, i) => (
        <motion.circle
          key={`c${i}`}
          cx={p.x}
          cy={p.y}
          r="4.5"
          className={i === 2 ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={2.2 + i * 0.2}
        />
      ))}
      {[250, 316, 382, 448].map((x) => (
        <ScopedPath
          key={`t${x}`}
          d={`M ${x} 292 L ${x} 300`}
          className="dg__line"
          variants={draw}
          custom={1.5}
        />
      ))}

      <Label x="250" y="36">ENRICH</Label>
      <Label x="336" y="36">SCORE</Label>
      <Label x="416" y="36">ROUTE</Label>

      <Packet id="en-0" dur={2.2} begin="0s" r={2.8} />
      <Packet id="en-1" dur={2.2} begin="0.8s" r={2.8} />
      <Packet id="en-2" dur={2.2} begin="1.6s" r={2.8} />
      <Packet id="en-curve" dur={3.4} begin="0.4s" />
      <Packet id="en-curve" dur={3.4} begin="2.1s" />
    </>
  );
}

/* -------------------------------------------------------------- circuit
   The origin strip. A board trace that draws itself from electronics
   to GTM engineering, with a pad at each stop.
------------------------------------------------------------------- */

function Circuit({ stops = [] }) {
  const xs = [70, 300, 530, 770];
  const d =
    "M 24 74 L 70 74 L 70 42 L 180 42 L 180 74 L 300 74 L 300 100 L 410 100 " +
    "L 410 46 L 530 46 L 530 74 L 660 74 L 660 100 L 770 100 L 836 100";
  return (
    <>
      <ScopedPath id="ck-trace" d={d} className="dg__line dg__line--key" variants={draw} custom={0} />
      {[
        [24, 110, 210, 110],
        [24, 26, 120, 26],
        [600, 26, 836, 26],
      ].map((seg, i) => (
        <ScopedPath
          key={`s${i}`}
          d={`M ${seg[0]} ${seg[1]} L ${seg[2]} ${seg[3]}`}
          className="dg__line"
          variants={draw}
          custom={0.6 + i * 0.2}
        />
      ))}
      {xs.map((x, i) => (
        <motion.rect
          key={x}
          x={x - 7}
          y={(i === 0 || i === 2 ? 74 : i === 1 ? 74 : 100) - 7}
          width="14"
          height="14"
          className={i === 3 ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={1 + i * 0.25}
        />
      ))}
      {stops.map((s, i) => (
        <g key={s.label}>
          <Label x={xs[i] - 7} y={i === 3 ? 134 : 108} dim={i !== 3}>
            {s.label}
          </Label>
          <Label x={xs[i] - 7} y={i === 3 ? 148 : 122}>
            {s.year}
          </Label>
        </g>
      ))}
      <Packet id="ck-trace" dur={4.6} begin="0s" r={3} />
      <Packet id="ck-trace" dur={4.6} begin="2.3s" r={3} />
    </>
  );
}

/* ------------------------------------------------------------- gtmtools
   Enrich, score, route — with the tools that feed it.
------------------------------------------------------------------- */

function GtmTools() {
  const tools = ["CLAY", "APOLLO", "N8N", "SMARTLEAD", "HUBSPOT"];
  const ys = [50, 100, 150, 200, 250];
  const spine = [
    { x: 300, label: "ENRICH" },
    { x: 450, label: "SCORE" },
    { x: 600, label: "ROUTE" },
  ];

  return (
    <>
      {ys.map((y, i) => (
        <ScopedPath
          key={y}
          id={`gt-${i}`}
          d={`M 132 ${y} C 210 ${y}, 230 150, 288 150`}
          className="dg__line"
          variants={draw}
          custom={i * 0.1}
        />
      ))}
      {ys.map((y, i) => (
        <motion.rect key={`n${y}`} x="118" y={y - 6} width="12" height="12" className="dg__node" variants={pop} custom={i * 0.1} />
      ))}
      {tools.map((t, i) => (
        <Label key={t} x="40" y={ys[i] + 4}>
          {t}
        </Label>
      ))}

      <ScopedPath id="gt-a" d="M 312 150 L 438 150" className="dg__line dg__line--key" variants={draw} custom={1} />
      <ScopedPath id="gt-b" d="M 462 150 L 588 150" className="dg__line dg__line--key" variants={draw} custom={1.3} />
      <ScopedPath id="gt-c" d="M 612 150 L 748 150" className="dg__line dg__line--key" variants={draw} custom={1.6} />
      {spine.map((s, i) => (
        <motion.rect
          key={s.label}
          x={s.x - 12}
          y="138"
          width="24"
          height="24"
          className={i === 1 ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={1.2 + i * 0.2}
        />
      ))}
      {spine.map((s, i) => (
        <Label key={`l${s.label}`} x={s.x} y="122" anchor="middle" dim={i !== 1}>
          {s.label}
        </Label>
      ))}
      <Label x="450" y="190" anchor="middle">STRENGTH × RECENCY × RELEVANCE</Label>

      <motion.rect x="748" y="136" width="28" height="28" className="dg__node" variants={pop} custom={2.2} />
      <Label x="786" y="154" dim={false}>CRM</Label>

      {/* compound — the stage everyone skips */}
      <ScopedPath
        id="gt-loop"
        d="M 762 164 C 762 250, 520 268, 300 268 C 240 268, 200 220, 200 180"
        className="dg__line"
        variants={draw}
        custom={2.4}
      />
      <Label x="470" y="284" anchor="middle">COMPOUND — OUTCOMES BACK IN</Label>

      <Packet id="gt-0" dur={2.4} begin="0s" r={2.8} />
      <Packet id="gt-2" dur={2.4} begin="0.7s" r={2.8} />
      <Packet id="gt-4" dur={2.4} begin="1.4s" r={2.8} />
      <Packet id="gt-a" dur={1.5} begin="1.1s" />
      <Packet id="gt-b" dur={1.5} begin="1.7s" />
      <Packet id="gt-c" dur={1.5} begin="2.3s" />
      <Packet id="gt-loop" dur={4} begin="2.8s" r={2.6} />
    </>
  );
}

/* ---------------------------------------------------------------- stack
   Interface, service, store — a request down and an answer back.
------------------------------------------------------------------- */

function Stack() {
  const layers = [
    { y: 54, t: "INTERFACE", s: "NEXT.JS · REACT" },
    { y: 128, t: "SERVICE", s: "FASTAPI · NODE", key: true },
    { y: 202, t: "STORE", s: "POSTGRES · SUPABASE" },
  ];

  return (
    <>
      {layers.map((l, i) => (
        <motion.rect
          key={l.t}
          x="240"
          y={l.y}
          width="380"
          height="48"
          rx="2"
          className={l.key ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={i * 0.25}
        />
      ))}
      {layers.map((l) => (
        <g key={`g${l.t}`}>
          <Label x="256" y={l.y + 22} dim={false}>
            {l.t}
          </Label>
          <Label x="256" y={l.y + 38}>
            {l.s}
          </Label>
        </g>
      ))}

      <ScopedPath id="st-down" d="M 150 78 L 150 226 L 236 226" className="dg__line dg__line--key" variants={draw} custom={1} />
      <ScopedPath id="st-up" d="M 624 226 L 710 226 L 710 78" className="dg__line dg__line--key" variants={draw} custom={1.4} />
      <ScopedPath d="M 150 78 L 236 78" className="dg__line" variants={draw} custom={1.1} />
      <ScopedPath d="M 624 78 L 710 78" className="dg__line" variants={draw} custom={1.5} />

      <Label x="40" y="82">REQUEST</Label>
      <Label x="726" y="82" dim={false}>ANSWER</Label>
      <Label x="240" y="276">SCHEMA FIRST · ROW-LEVEL SECURITY · IT STILL WORKS IN MONTH TWO</Label>

      <Packet id="st-down" dur={2.2} begin="0s" />
      <Packet id="st-up" dur={2.2} begin="1.3s" />
    </>
  );
}

/* ------------------------------------------------------------ agentflow
   Free text in, validated rows out, with the retry that makes it safe.
------------------------------------------------------------------- */

function AgentFlow() {
  return (
    <>
      <ScopedPath id="af-a" d="M 108 150 L 232 150" className="dg__line" variants={draw} custom={0} />
      <ScopedPath id="af-b" d="M 296 150 L 402 150" className="dg__line dg__line--key" variants={draw} custom={0.5} />
      <ScopedPath id="af-c" d="M 466 150 L 600 150" className="dg__line dg__line--key" variants={draw} custom={1} />
      <ScopedPath
        id="af-retry"
        d="M 434 118 C 434 66, 300 66, 264 96"
        className="dg__line"
        variants={draw}
        custom={1.4}
      />

      <motion.rect x="80" y="138" width="24" height="24" className="dg__node" variants={pop} custom={0} />
      <motion.rect x="232" y="126" width="64" height="48" rx="2" className="dg__node" variants={pop} custom={0.5} />
      <motion.circle cx="434" cy="150" r="12" className="dg__node"
        style={{ stroke: "var(--tint,var(--green))" }} variants={pop} custom={1} />
      <motion.rect x="600" y="136" width="28" height="28" className="dg__node dg__node--key" variants={pop} custom={1.4} />

      <Label x="40" y="120">FREE TEXT</Label>
      <Label x="238" y="196">EXTRACT</Label>
      <Label x="434" y="212" anchor="middle" dim={false}>VALIDATE</Label>
      <Label x="300" y="56">SCHEMA FAILS — RUN IT AGAIN</Label>
      <Label x="640" y="154" dim={false}>WRITTEN BACK</Label>
      <Label x="640" y="170">WITH AN AUDIT TRAIL</Label>

      <Packet id="af-a" dur={1.8} begin="0s" />
      <Packet id="af-b" dur={1.4} begin="0.9s" />
      <Packet id="af-c" dur={1.6} begin="1.6s" />
      <Packet id="af-retry" dur={2} begin="2.6s" r={2.6} />
    </>
  );
}

/* ------------------------------------------------------------ loopcheck
   Problem, hypothesis, smallest build, did the number move.
------------------------------------------------------------------- */

function LoopCheck() {
  const stops = [
    { x: 130, label: "PROBLEM" },
    { x: 330, label: "HYPOTHESIS" },
    { x: 530, label: "SMALLEST BUILD" },
    { x: 720, label: "DID IT MOVE", key: true },
  ];
  return (
    <>
      {stops.slice(0, 3).map((s, i) => (
        <ScopedPath
          key={s.label}
          id={`lc-${i}`}
          d={`M ${s.x + 14} 120 L ${stops[i + 1].x - 14} 120`}
          className="dg__line dg__line--key"
          variants={draw}
          custom={i * 0.4}
        />
      ))}
      <ScopedPath
        id="lc-back"
        d="M 720 140 C 720 230, 400 246, 200 246 C 150 246, 130 190, 130 142"
        className="dg__line"
        variants={draw}
        custom={1.6}
      />
      {stops.map((s, i) => (
        <motion.rect
          key={`n${s.label}`}
          x={s.x - 13}
          y="107"
          width="26"
          height="26"
          className={s.key ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={i * 0.3}
        />
      ))}
      {stops.map((s) => (
        <Label key={`l${s.label}`} x={s.x} y="92" anchor="middle" dim={!s.key}>
          {s.label}
        </Label>
      ))}
      <Label x="430" y="268" anchor="middle">NO — THEN THE HYPOTHESIS WAS WRONG, NOT THE BUILD</Label>
      <Packet id="lc-0" dur={1.6} begin="0s" />
      <Packet id="lc-1" dur={1.6} begin="0.6s" />
      <Packet id="lc-2" dur={1.6} begin="1.2s" />
      <Packet id="lc-back" dur={3.4} begin="2s" r={2.6} />
    </>
  );
}

/* ---------------------------------------------------------------- hotel
   Rules first, model second, and two tenants that cannot see each other.
------------------------------------------------------------------- */

function Hotel() {
  return (
    <>
      <ScopedPath id="ht-in" d="M 96 150 L 208 150" className="dg__line" variants={draw} custom={0} />
      <ScopedPath id="ht-yes" d="M 272 150 L 396 150" className="dg__line dg__line--key" variants={draw} custom={0.6} />
      <ScopedPath id="ht-no" d="M 240 182 C 240 240, 300 248, 340 248 L 396 248" className="dg__line" variants={draw} custom={0.9} />
      <ScopedPath id="ht-back" d="M 460 248 C 520 248, 520 176, 560 168" className="dg__line" variants={draw} custom={1.2} />
      <ScopedPath id="ht-q" d="M 460 150 L 560 150" className="dg__line dg__line--key" variants={draw} custom={1.4} />
      <ScopedPath id="ht-a" d="M 624 140 L 742 84" className="dg__line dg__line--key" variants={draw} custom={1.8} />
      <ScopedPath id="ht-b" d="M 624 162 L 742 218" className="dg__line" variants={draw} custom={2} />

      <motion.rect x="68" y="138" width="24" height="24" className="dg__node" variants={pop} custom={0} />
      <motion.rect x="220" y="130" width="40" height="40" transform="rotate(45 240 150)" className="dg__node dg__node--key" variants={pop} custom={0.6} />
      <motion.rect x="396" y="136" width="60" height="28" rx="2" className="dg__node" variants={pop} custom={1} />
      <motion.rect x="396" y="234" width="60" height="28" rx="2" className="dg__node" variants={pop} custom={1.2} />
      <motion.rect x="560" y="132" width="64" height="36" rx="2" className="dg__node dg__node--key" variants={pop} custom={1.6} />
      <motion.rect x="742" y="72" width="24" height="24" className="dg__node" variants={pop} custom={2} />
      <motion.rect x="742" y="206" width="24" height="24" className="dg__node" variants={pop} custom={2.2} />

      <Label x="34" y="122">MESSAGE</Label>
      <Label x="240" y="214" anchor="middle" dim={false}>RULES · &lt;1MS</Label>
      <Label x="404" y="154">QUEUE</Label>
      <Label x="404" y="252">CLAUDE</Label>
      <Label x="566" y="154" dim={false}>POSTGRES</Label>
      <Label x="566" y="190">ROW-LEVEL SECURITY</Label>
      <Label x="776" y="88">TENANT A</Label>
      <Label x="776" y="222">TENANT B</Label>
      <Label x="34" y="284">ONLY THE MESSAGES THE CHEAP PATH CANNOT ANSWER REACH THE MODEL</Label>

      <Packet id="ht-in" dur={1.6} begin="0s" />
      <Packet id="ht-yes" dur={1.4} begin="0.8s" />
      <Packet id="ht-no" dur={2.2} begin="1.4s" r={2.6} />
      <Packet id="ht-q" dur={1.2} begin="2s" />
      <Packet id="ht-a" dur={1.4} begin="2.6s" />
      <Packet id="ht-b" dur={1.4} begin="3.1s" />
    </>
  );
}

/* ------------------------------------------------------------ autodraft
   Plan, execute against tools, validate, render.
------------------------------------------------------------------- */

function AutoDraft() {
  const tools = ["TEMPLATE", "CLIENT PROFILE", "BENCHMARK", "DATE"];
  return (
    <>
      <ScopedPath id="ad-a" d="M 92 150 L 186 150" className="dg__line" variants={draw} custom={0} />
      <ScopedPath id="ad-b" d="M 258 150 L 348 150" className="dg__line dg__line--key" variants={draw} custom={0.5} />
      {tools.map((t, i) => (
        <ScopedPath
          key={t}
          id={`ad-t-${i}`}
          d={`M 400 122 C 430 ${40 + i * 14}, 470 ${44 + i * 12}, 512 ${44 + i * 12}`}
          className="dg__line"
          variants={draw}
          custom={0.9 + i * 0.12}
        />
      ))}
      <ScopedPath id="ad-c" d="M 452 150 L 556 150" className="dg__line dg__line--key" variants={draw} custom={1.5} />
      <ScopedPath id="ad-d" d="M 620 150 L 742 150" className="dg__line dg__line--key" variants={draw} custom={1.9} />
      <ScopedPath id="ad-rej" d="M 588 182 C 588 240, 420 246, 400 200" className="dg__line" variants={draw} custom={2.1} />

      <motion.rect x="68" y="138" width="24" height="24" className="dg__node" variants={pop} custom={0} />
      <motion.rect x="186" y="128" width="72" height="44" rx="2" className="dg__node" variants={pop} custom={0.5} />
      <motion.rect x="348" y="122" width="104" height="56" rx="2" className="dg__node dg__node--key" variants={pop} custom={0.9} />
      {tools.map((t, i) => (
        <motion.rect key={`n${t}`} x="512" y={38 + i * 12} width="10" height="10" className="dg__node" variants={pop} custom={1.2 + i * 0.1} />
      ))}
      <motion.rect x="568" y="130" width="40" height="40" transform="rotate(45 588 150)" className="dg__node dg__node--key" variants={pop} custom={1.7} />
      <motion.rect x="742" y="134" width="30" height="32" rx="2" className="dg__node dg__node--key" variants={pop} custom={2.1} />

      <Label x="34" y="122">REQUEST</Label>
      <Label x="192" y="194">PLANNER</Label>
      <Label x="400" y="194" anchor="middle" dim={false}>EXECUTOR</Label>
      {tools.map((t, i) => (
        <Label key={`l${t}`} x="530" y={47 + i * 12}>
          {t}
        </Label>
      ))}
      <Label x="588" y="212" anchor="middle" dim={false}>PYDANTIC</Label>
      <Label x="782" y="154" dim={false}>.DOCX</Label>
      <Label x="400" y="272" anchor="middle">A SCHEMA FAILS LOUDLY — A PROMPT FAILS QUIETLY</Label>

      <Packet id="ad-a" dur={1.5} begin="0s" />
      <Packet id="ad-b" dur={1.3} begin="0.7s" />
      <Packet id="ad-t-0" dur={1.6} begin="1.2s" r={2.4} />
      <Packet id="ad-t-2" dur={1.6} begin="1.6s" r={2.4} />
      <Packet id="ad-c" dur={1.3} begin="2s" />
      <Packet id="ad-d" dur={1.5} begin="2.6s" />
      <Packet id="ad-rej" dur={2.6} begin="3.2s" r={2.4} />
    </>
  );
}

/* -------------------------------------------------------------- agent */

function Agent() {
  const tools = [
    { x: 560, y: 52, label: "HCP SENTIMENT" },
    { x: 560, y: 110, label: "PRODUCTS" },
    { x: 560, y: 168, label: "FOLLOW-UPS" },
    { x: 560, y: 226, label: "AUDIT TRAIL" },
  ];

  return (
    <>
      <ScopedPath id="ag-in" d="M 58 150 L 236 150" className="dg__line" variants={draw} custom={0} />
      <ScopedPath id="ag-router" d="M 276 150 L 366 150" className="dg__line dg__line--key" variants={draw} custom={1} />
      {tools.map((t, i) => (
        <ScopedPath
          key={t.label}
          id={`ag-t-${i}`}
          d={`M 366 150 C 440 150, 470 ${t.y + 6}, ${t.x - 12} ${t.y + 6}`}
          className="dg__line"
          variants={draw}
          custom={1.4 + i * 0.15}
        />
      ))}
      <ScopedPath id="ag-out" d="M 700 150 L 790 150" className="dg__line dg__line--key" variants={draw} custom={2.4} />

      <motion.rect x="44" y="143" width="14" height="14" className="dg__node" variants={pop} custom={0} />
      <motion.rect
        x="240"
        y="136"
        width="28"
        height="28"
        transform="rotate(45 254 150)"
        className="dg__node dg__node--key"
        variants={pop}
        custom={1}
      />
      {tools.map((t, i) => (
        <motion.rect key={t.label} x={t.x - 12} y={t.y} width="12" height="12" className="dg__node" variants={pop} custom={2 + i * 0.12} />
      ))}
      <motion.rect x="790" y="143" width="14" height="14" className="dg__node" variants={pop} custom={3} />

      <Label x="44" y="132">NARRATION</Label>
      <Label x="254" y="196" anchor="middle" dim={false}>STATEGRAPH</Label>
      {tools.map((t) => (
        <Label key={t.label} x={t.x + 6} y={t.y + 10}>
          {t.label}
        </Label>
      ))}
      <Label x="790" y="132">ONE SCHEMA</Label>

      <Packet id="ag-in" dur={2} begin="0s" />
      <Packet id="ag-router" dur={1.4} begin="1.1s" />
      <Packet id="ag-t-0" dur={2} begin="1.8s" />
      <Packet id="ag-t-2" dur={2} begin="2.4s" />
      <Packet id="ag-out" dur={1.6} begin="3.2s" />
    </>
  );
}

/* ------------------------------------------------------------- vision
   InLighnX: hand in front of a webcam, text out.
------------------------------------------------------------------- */

function Vision() {
  // a hand skeleton, drawn as landmark points and the bones between them
  const pts = [
    [150, 236], [150, 196], [150, 160], [150, 128],
    [124, 200], [110, 168], [102, 142], [96, 120],
    [150, 190], [150, 150], [150, 122], [150, 100],
    [176, 196], [186, 162], [192, 136], [196, 114],
    [200, 208], [214, 180], [222, 158], [228, 140],
  ];
  const bones = [
    [0, 1], [1, 2], [2, 3],
    [0, 4], [4, 5], [5, 6], [6, 7],
    [0, 8], [8, 9], [9, 10], [10, 11],
    [0, 12], [12, 13], [13, 14], [14, 15],
    [0, 16], [16, 17], [17, 18], [18, 19],
  ];
  const bars = [
    { y: 76, w: 92 },
    { y: 108, w: 138 },
    { y: 140, w: 64 },
    { y: 172, w: 110 },
    { y: 204, w: 48 },
  ];

  return (
    <>
      <motion.rect x="40" y="70" width="230" height="180" className="dg__node" variants={pop} custom={0} rx="2" />
      {bones.map(([a, b], i) => (
        <ScopedPath
          key={`b${i}`}
          d={`M ${pts[a][0]} ${pts[a][1]} L ${pts[b][0]} ${pts[b][1]}`}
          className="dg__line"
          variants={draw}
          custom={0.4 + i * 0.035}
        />
      ))}
      {pts.map((p, i) => (
        <motion.circle key={`p${i}`} cx={p[0]} cy={p[1]} r="2.6" className="dg__dot" variants={pop} custom={1.2 + i * 0.02} />
      ))}

      <ScopedPath id="vs-a" d="M 270 160 L 396 160" className="dg__line dg__line--key" variants={draw} custom={2} />
      <motion.rect x="396" y="70" width="120" height="180" className="dg__node" variants={pop} custom={2.2} rx="2" />
      {bars.map((b, i) => (
        <motion.rect
          key={b.y}
          x="412"
          y={b.y}
          width={b.w}
          height="8"
          className={i === 1 ? "dg__bar dg__bar--key" : "dg__bar"}
          style={{ transformOrigin: "left center" }}
          variants={grow}
          custom={i}
        />
      ))}
      <ScopedPath id="vs-b" d="M 516 160 L 660 160" className="dg__line dg__line--key" variants={draw} custom={3} />
      <motion.rect x="660" y="148" width="24" height="24" className="dg__node dg__node--key" variants={pop} custom={3.4} />

      <Label x="40" y="58">WEBCAM — LIVE FRAMES</Label>
      <Label x="96" y="272">MEDIAPIPE LANDMARKS</Label>
      <Label x="396" y="34" anchor="start">AUGMENTED TRAINING SET</Label>
      <Label x="396" y="58" anchor="start">CNN PIPELINE</Label>
      <Label x="412" y="272">OPENCV PRE-PROCESSING</Label>
      <Label x="694" y="166" dim={false}>TEXT, 90% ACCURATE</Label>

      <Packet id="vs-a" dur={1.8} begin="0s" />
      <Packet id="vs-b" dur={1.8} begin="1.1s" />
    </>
  );
}

/* -------------------------------------------------------------- match
   UniPlacement: students on the left, job descriptions on the right,
   one match lighting up and a gap list falling out of it.
------------------------------------------------------------------- */

function Match() {
  const students = [60, 100, 140, 180, 220, 260];
  const roles = [80, 140, 200];
  const edges = [
    [0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2], [5, 2],
  ];
  const gaps = [
    { y: 92, w: 112, key: true },
    { y: 122, w: 82 },
    { y: 152, w: 138 },
    { y: 182, w: 66 },
  ];

  return (
    <>
      {students.map((y, i) => (
        <motion.circle key={y} cx="70" cy={y} r="5" className="dg__node" variants={pop} custom={i * 0.1} />
      ))}
      {edges.map(([s, r], i) => (
        <ScopedPath
          key={`e${i}`}
          id={`mt-${i}`}
          d={`M 76 ${students[s]} C 160 ${students[s]}, 200 ${roles[r]}, 286 ${roles[r]}`}
          className={i === 3 ? "dg__line dg__line--key" : "dg__line"}
          variants={draw}
          custom={0.6 + i * 0.08}
        />
      ))}
      {roles.map((y, i) => (
        <motion.rect
          key={y}
          x="286"
          y={y - 11}
          width="22"
          height="22"
          className={i === 1 ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={1.6 + i * 0.12}
        />
      ))}

      <ScopedPath id="mt-out" d="M 308 140 L 452 140" className="dg__line dg__line--key" variants={draw} custom={2.4} />
      <motion.rect x="452" y="62" width="300" height="158" className="dg__node" variants={pop} custom={2.6} rx="2" />
      {gaps.map((g, i) => (
        <motion.rect
          key={g.y}
          x="472"
          y={g.y}
          width={g.w}
          height="9"
          className={g.key ? "dg__bar dg__bar--key" : "dg__bar"}
          style={{ transformOrigin: "left center" }}
          variants={grow}
          custom={i + 2}
        />
      ))}

      <Label x="52" y="38">STUDENTS</Label>
      <Label x="280" y="38">JOB DESCRIPTIONS</Label>
      <Label x="452" y="50" dim={false}>WHAT IS MISSING, NAMED</Label>
      <Label x="472" y="244">FIT SCORE · GAP LIST · PREP PLAN</Label>

      <Packet id="mt-3" dur={2.2} begin="0s" r={2.8} />
      <Packet id="mt-5" dur={2.2} begin="1.1s" r={2.8} />
      <Packet id="mt-out" dur={1.6} begin="1.6s" />
    </>
  );
}

/* -------------------------------------------------------------- sleep
   SleepCare: five leads off the body, an ECG trace that draws itself,
   the ESP32 buffering it, four clinical modes on the far side.
------------------------------------------------------------------- */

const ECG_BEAT = "l 18 0 l 5 -9 l 6 18 l 6 -46 l 7 58 l 6 -21 l 6 0 l 10 0 l 6 -8 l 8 8 l 16 0";

function Sleep() {
  const ecg = `M 300 150 ${ECG_BEAT} ${ECG_BEAT} ${ECG_BEAT}`;
  const leads = [
    { y: 52, label: "ECG" },
    { y: 101, label: "EEG" },
    { y: 150, label: "SPO2" },
    { y: 199, label: "TEMP" },
    { y: 248, label: "MOTION" },
  ];
  const modes = ["DIAGNOSTIC", "OVERNIGHT", "NAP", "CLINICAL"];

  return (
    <>
      {leads.map((l, i) => (
        <ScopedPath
          key={l.label}
          id={`sl-${i}`}
          d={`M 106 ${l.y} C 168 ${l.y}, 190 150, 248 150`}
          className="dg__line"
          variants={draw}
          custom={i * 0.1}
        />
      ))}
      {leads.map((l, i) => (
        <motion.circle key={`n${l.label}`} cx="100" cy={l.y} r="5" className="dg__node" variants={pop} custom={i * 0.1} />
      ))}
      {leads.map((l) => (
        <Label key={`t${l.label}`} x="40" y={l.y + 4}>
          {l.label}
        </Label>
      ))}

      <motion.rect x="248" y="132" width="36" height="36" className="dg__node dg__node--key" variants={pop} custom={1} />
      <Label x="266" y="190" anchor="middle" dim={false}>ESP32-S3</Label>

      <ScopedPath id="sl-ecg" d={ecg} className="dg__line dg__line--key" variants={draw} custom={1.4} />
      <Label x="300" y="104">10-SECOND BUFFERED WINDOW</Label>

      <ScopedPath id="sl-out" d="M 596 150 L 668 150" className="dg__line dg__line--key" variants={draw} custom={2.4} />
      {modes.map((m, i) => (
        <motion.rect
          key={m}
          x="668"
          y={52 + i * 49}
          width="13"
          height="13"
          className="dg__node"
          variants={pop}
          custom={2.6 + i * 0.12}
        />
      ))}
      {modes.map((m, i) => (
        <Label key={`l${m}`} x="690" y={63 + i * 49}>
          {m}
        </Label>
      ))}
      <ScopedPath
        id="sl-fan"
        d="M 668 150 L 668 52 M 668 150 L 668 248"
        className="dg__line"
        variants={draw}
        custom={2.8}
      />

      <Label x="40" y="282">FIVE PHYSIOLOGICAL SENSORS</Label>
      <Label x="668" y="282">SOCKET.IO — LIVE, NOT BATCHED</Label>

      <Packet id="sl-0" dur={2.4} begin="0s" r={2.8} />
      <Packet id="sl-2" dur={2.4} begin="0.8s" r={2.8} />
      <Packet id="sl-4" dur={2.4} begin="1.6s" r={2.8} />
      <Packet id="sl-ecg" dur={3.2} begin="1.2s" />
      <Packet id="sl-out" dur={1.4} begin="2.6s" />
    </>
  );
}

/* -------------------------------------------------------------- funnel
   Capture: the ladder, with an event on every rung.
------------------------------------------------------------------- */

const FUNNEL = [
  { label: "ENTRY", w: 548, note: "100%" },
  { label: "IDENTIFIED", w: 430, note: "− 22%" },
  { label: "QUALIFIED", w: 296, note: "− 32%" },
  { label: "OPPORTUNITY", w: 182, note: "− 38%" },
];

const SOURCES = ["FORM", "LIVE CHAT", "AD CLICK", "INBOUND CALL"];

function Funnel() {
  return (
    <>
      {SOURCES.map((s, i) => (
        <ScopedPath
          key={s}
          id={`fn-s-${i}`}
          d={`M 150 ${46 + i * 52} L 196 ${46 + i * 52} L 220 63`}
          className="dg__line"
          variants={draw}
          custom={i}
          pathLength="1"
        />
      ))}
      {SOURCES.map((s, i) => (
        <motion.rect
          key={s}
          x="138"
          y={40 + i * 52}
          width="12"
          height="12"
          className="dg__node"
          variants={pop}
          custom={i}
        />
      ))}
      {SOURCES.map((s, i) => (
        <Label key={s} x="128" y={50 + i * 52} anchor="end">
          {s}
        </Label>
      ))}

      {/* the instrumentation spine every rung taps */}
      <ScopedPath
        d="M 228 40 L 228 268"
        className="dg__line dg__line--key"
        variants={draw}
        custom={1}
        pathLength="1"
      />

      {FUNNEL.map((f, i) => (
        <motion.rect
          key={f.label}
          x="240"
          y={46 + i * 58}
          width={f.w}
          height="34"
          className={i === 3 ? "dg__bar dg__bar--key" : "dg__bar"}
          style={{ transformOrigin: "240px 0", transformBox: "view-box" }}
          variants={grow}
          custom={i}
        />
      ))}
      {FUNNEL.map((f, i) => (
        <Label key={f.label} x="252" y={68 + i * 58} dim={i === 3 ? false : true}>
          {f.label}
        </Label>
      ))}
      {FUNNEL.map((f, i) => (
        <Label key={f.note} x={252 + f.w} y={68 + i * 58}>
          {f.note}
        </Label>
      ))}
      {FUNNEL.map((f, i) => (
        <motion.circle
          key={f.label}
          cx="228"
          cy={63 + i * 58}
          r="4"
          className="dg__node dg__node--key"
          variants={pop}
          custom={i + 2}
        />
      ))}

      <Label x="240" y="292">
        A DROP YOU CAN SEE IS A DROP YOU CAN FIX
      </Label>
      {SOURCES.map((s, i) => (
        <Packet key={s} id={`fn-s-${i}`} dur={2.6} begin={`${i * 0.55}s`} r={2.8} />
      ))}
    </>
  );
}

/* ----------------------------------------------------------- waterfall
   Enrich: cheapest provider first, paid credits only for the gaps.
------------------------------------------------------------------- */

const FIELDS = [
  { label: "DOMAIN", col: 0 },
  { label: "HEADCOUNT", col: 1 },
  { label: "TECH STACK", col: 1 },
  { label: "WORK EMAIL", col: 2 },
];

const COLX = [300, 470, 640];
const PROVIDERS = ["FREE / PUBLIC", "CLAYGENT", "PAID CREDIT"];

function Waterfall() {
  return (
    <>
      {PROVIDERS.map((p, i) => (
        <Label key={p} x={COLX[i]} y="38" anchor="middle">
          {p}
        </Label>
      ))}
      {COLX.map((x, i) => (
        <ScopedPath
          key={x}
          id={`wf-col-${i}`}
          d={`M ${x} 50 L ${x} 252`}
          className="dg__line"
          variants={draw}
          custom={i}
          pathLength="1"
        />
      ))}

      {FIELDS.map((f, i) => (
        <Label key={f.label} x="250" y={78 + i * 52} anchor="end">
          {f.label}
        </Label>
      ))}
      {FIELDS.map((f, i) => (
        <ScopedPath
          key={f.label}
          d={`M 262 ${73 + i * 52} L ${COLX[f.col]} ${73 + i * 52}`}
          className="dg__line"
          variants={draw}
          custom={i}
          pathLength="1"
        />
      ))}
      {FIELDS.map((f, i) => (
        <motion.circle
          key={f.label}
          cx={COLX[f.col]}
          cy={73 + i * 52}
          r="6"
          className="dg__node dg__node--key"
          variants={pop}
          custom={i}
        />
      ))}

      {/* the cascade: each miss steps right, never left */}
      <ScopedPath
        id="wf-fall"
        d="M 300 73 L 300 125 L 470 125 L 470 177 L 470 229 L 640 229"
        className="dg__line dg__line--key"
        variants={draw}
        custom={3}
        pathLength="1"
      />

      <ScopedPath
        d="M 646 229 L 716 229 L 716 73 L 760 73"
        className="dg__line"
        variants={draw}
        custom={4}
        pathLength="1"
      />
      <motion.rect
        x="760"
        y="56"
        width="34"
        height="34"
        className="dg__node dg__node--key"
        variants={pop}
        custom={5}
      />
      <Label x="777" y="112" anchor="middle" dim={false}>
        ONE ROW
      </Label>
      <Label x="777" y="130" anchor="middle">
        FULLY FILLED
      </Label>

      <Label x="250" y="282" anchor="end">
        CREDITS SPENT
      </Label>
      {[
        { w: 0, i: 0 },
        { w: 92, i: 1 },
        { w: 58, i: 2 },
      ].map((b) => (
        <motion.rect
          key={b.i}
          x={COLX[b.i] - 46}
          y="268"
          width={b.w || 4}
          height="8"
          className={b.i === 2 ? "dg__bar dg__bar--key" : "dg__bar"}
          style={{ transformOrigin: `${COLX[b.i] - 46}px 0`, transformBox: "view-box" }}
          variants={grow}
          custom={b.i + 3}
        />
      ))}

      <Packet id="wf-fall" dur={4.2} />
    </>
  );
}

/* ------------------------------------------------------------ taxonomy
   Score: what the objection actually was, counted rather than guessed.
------------------------------------------------------------------- */

const OBJECTIONS = [
  "PRICE",
  "TIMING",
  "TRUST",
  "FIT",
  "BUDGET",
  "INCUMBENT",
  "EFFORT",
  "RISK",
];

const CX = 430;
const CY = 152;

const SPOKES = OBJECTIONS.map((label, i) => {
  const a = (i / OBJECTIONS.length) * Math.PI * 2 - Math.PI / 2;
  const weight = 3.5 + ((i * 5) % 7);
  return {
    label,
    weight,
    x: CX + Math.cos(a) * 96,
    y: CY + Math.sin(a) * 96,
    lx: CX + Math.cos(a) * 124,
    ly: CY + Math.sin(a) * 124 + 4,
    anchor: Math.abs(Math.cos(a)) < 0.25 ? "middle" : Math.cos(a) > 0 ? "start" : "end",
  };
});

function Taxonomy() {
  return (
    <>
      <motion.circle
        cx={CX}
        cy={CY}
        r="96"
        className="dg__line"
        fill="none"
        variants={draw}
        custom={0}
        pathLength="1"
      />
      <motion.circle
        cx={CX}
        cy={CY}
        r="54"
        className="dg__line"
        fill="none"
        variants={draw}
        custom={1}
        pathLength="1"
      />

      {SPOKES.map((s, i) => (
        <ScopedPath
          key={s.label}
          d={`M ${CX} ${CY} L ${s.x.toFixed(1)} ${s.y.toFixed(1)}`}
          className="dg__line"
          variants={draw}
          custom={i * 0.4}
          pathLength="1"
        />
      ))}
      {SPOKES.map((s, i) => (
        <motion.circle
          key={s.label}
          cx={s.x.toFixed(1)}
          cy={s.y.toFixed(1)}
          r={s.weight}
          className={s.weight > 7 ? "dg__node dg__node--key" : "dg__node"}
          variants={pop}
          custom={i * 0.4}
        />
      ))}
      {SPOKES.map((s) => (
        <Label key={s.label} x={s.lx.toFixed(1)} y={s.ly.toFixed(1)} anchor={s.anchor}>
          {s.label}
        </Label>
      ))}

      {/* the read head — one sweep, continuously */}
      <g>
        <line
          x1={CX}
          y1={CY}
          x2={CX}
          y2={CY - 96}
          className="dg__line dg__line--key"
          opacity="0.75"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${CX} ${CY}`}
          to={`360 ${CX} ${CY}`}
          dur="11s"
          repeatCount="indefinite"
        />
      </g>

      <motion.circle
        cx={CX}
        cy={CY}
        r="9"
        className="dg__node dg__node--key"
        variants={pop}
        custom={2}
      />
      <Label x={CX} y={CY + 34} anchor="middle" dim={false}>
        INTENT
      </Label>

      <Label x="40" y="44">
        EVERY CONVERSATION LANDS IN ONE BUCKET
      </Label>
      <Label x="820" y="44" anchor="end">
        COUNTED, NOT GUESSED
      </Label>
      <Label x="40" y="282">
        BUCKET SIZE = HOW OFTEN IT DECIDED THE DEAL
      </Label>
    </>
  );
}

const VARIANTS = {
  attribution: { render: Attribution, box: "0 0 860 300" },
  engine: { render: Engine, box: "0 0 520 320" },
  circuit: { render: Circuit, box: "0 0 860 160" },
  gtmtools: { render: GtmTools, box: "0 0 860 300" },
  stack: { render: Stack, box: "0 0 860 300" },
  agentflow: { render: AgentFlow, box: "0 0 860 240" },
  loopcheck: { render: LoopCheck, box: "0 0 860 290" },
  hotel: { render: Hotel, box: "0 0 860 300" },
  autodraft: { render: AutoDraft, box: "0 0 860 290" },
  agent: { render: Agent, box: "0 0 860 300" },
  vision: { render: Vision, box: "0 0 860 300" },
  match: { render: Match, box: "0 0 800 270" },
  sleep: { render: Sleep, box: "0 0 860 300" },
  funnel: { render: Funnel, box: "0 0 860 300" },
  waterfall: { render: Waterfall, box: "0 0 860 300" },
  taxonomy: { render: Taxonomy, box: "0 0 860 300" },
};

export default function PipelineDiagram({ variant = "attribution", caption, stops, tint, labelItems }) {
  const ref = useRef(null);
  const [autoLabels, setAutoLabels] = useState([]);
  const labels = labelItems || autoLabels;
  useEffect(() => {
    // Explicit labels render on the server, so these panels never grow on hydration.
    if (labelItems) return;
    setAutoLabels([...new Set(Array.from(ref.current.querySelectorAll("svg text"), node => node.textContent).filter(Boolean))]);
  }, [variant, labelItems]);
  const scope = useId().replaceAll(":", "");
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const conf = VARIANTS[variant] || VARIANTS.attribution;
  const Shape = conf.render;

  return (
    <figure className="dg" ref={ref} style={tint ? {"--tint":tint} : undefined}>
      <motion.svg
        viewBox={conf.box}
        className="dg__svg"
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        role="img"
        aria-label={caption || "System schematic"}
      >
        <DiagramScope.Provider value={scope}><Shape stops={stops} /></DiagramScope.Provider>
      </motion.svg>
      <div className={`dg__mobile-labels${labelItems ? " dg__labels--visible" : ""}`} aria-label="Schematic labels">{labels.map(label => <span key={label}>{label}</span>)}</div>
      {caption ? <figcaption className="dg__cap mono">{caption}</figcaption> : null}
    </figure>
  );
}

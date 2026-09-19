"use client";

import { useEffect, useRef, useState } from "react";
import PipelineDiagram from "@/components/PipelineDiagram";

/**
 * The pipeline, playable. Clicking a stage in order walks one lead through it;
 * the record below fills in field by field and the schematic under the board
 * swaps to whatever runs inside the stage you are standing on. Click out of
 * order and the stage refuses — which is the whole point of routing rules.
 */

const STAGES = [
  {
    key: "capture",
    label: "Capture",
    sub: "form · chat · ad click",
    tint: "var(--blue)",
    diagram: "funnel",
    caption: "Every entry point instrumented where it happens, not where it lands.",
    field: "lead",
    value: "ops@northwind.co — paid social",
  },
  {
    key: "enrich",
    label: "Enrich",
    sub: "domain · headcount · stack",
    tint: "var(--blue-soft)",
    diagram: "waterfall",
    caption: "Free sources first. Paid credits only for the fields still missing.",
    field: "firmographics",
    value: "northwind.co · 180 people · runs HubSpot",
  },
  {
    key: "score",
    label: "Score",
    sub: "intent · fit · decay",
    tint: "var(--amber)",
    diagram: "taxonomy",
    caption: "Intent read off what they said — objections counted, not guessed.",
    field: "score",
    value: "intent 0.72 · fit 0.81 → 74 / 100",
  },
  {
    key: "route",
    label: "Route",
    sub: "owner · SLA · queue",
    tint: "var(--green)",
    diagram: "agentflow",
    caption: "Routed by rule, chased by agent, escalated on the clock.",
    field: "owner",
    value: "AE queue · SLA 9 min · follow-up armed",
  },
  {
    key: "report",
    label: "Report",
    sub: "source → revenue",
    tint: "var(--red)",
    diagram: "attribution",
    caption: "The channel that opened it keeps the credit at the order line.",
    field: "attribution",
    value: "paid social → closed won, logged at the order line",
  },
];

export default function PipelineGame() {
  const [done, setDone] = useState(0);
  const [view, setView] = useState(0);
  const [wrong, setWrong] = useState(null);
  const [runs, setRuns] = useState(0);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const tap = (n) => {
    if (n < done) {
      setView(n);
      return;
    }
    if (n === done) {
      setView(n);
      setDone(n + 1);
      if (n + 1 === STAGES.length) setRuns((r) => r + 1);
      return;
    }
    setWrong(STAGES[n].key);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setWrong(null), 520);
  };

  const reset = () => {
    setDone(0);
    setView(0);
  };

  const complete = done === STAGES.length;
  const stage = STAGES[view];

  return (
    <div className="game" data-done={complete ? "1" : "0"}>
      <div className="game__bar mono">
        <span className="game__meter">
          <i style={{ "--p": done / STAGES.length }} />
        </span>
        <span className="game__count">
          {done}/{STAGES.length} stages live
        </span>
        <span className="game__sep" />
        <span className="game__count">
          {runs} lead{runs === 1 ? "" : "s"} routed
        </span>
        {complete ? (
          <button type="button" className="game__again" onClick={reset} data-cursor="link">
            Run another ↻
          </button>
        ) : null}
      </div>

      <div className="game__board">
        {STAGES.map((s, n) => (
          <button
            type="button"
            key={s.key}
            className="node"
            style={{ "--tint": s.tint }}
            data-on={n < done ? "1" : "0"}
            data-next={n === done ? "1" : "0"}
            data-shake={wrong === s.key ? "1" : "0"}
            data-view={view === n ? "1" : "0"}
            onClick={() => tap(n)}
            data-cursor="link"
            aria-label={`${s.label} — stage ${n + 1} of ${STAGES.length}`}
          >
            <span className="node__n mono">{String(n + 1).padStart(2, "0")}</span>
            <span className="node__label">{s.label}</span>
            <span className="node__sub mono">{s.sub}</span>
            <span className="node__pin" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="game__grid">
        <div className="game__record" aria-live="polite">
          {done === 0 ? (
            <div className="rec rec--empty mono">click 01 — drop a lead in</div>
          ) : null}
          {STAGES.slice(0, done).map((s) => (
            <div className="rec" key={s.key} style={{ "--tint": s.tint }}>
              <span className="rec__k mono">{s.field}</span>
              <span className="rec__v">{s.value}</span>
            </div>
          ))}
          {complete ? (
            <div className="rec rec--won" style={{ "--tint": "var(--green)" }}>
              <span className="rec__k mono">result</span>
              <span className="rec__v">closed won — and the report already knows why</span>
            </div>
          ) : null}
        </div>

        <div className="game__fig">
          <div className="game__figtag mono">
            inside <b style={{ color: stage.tint }}>{stage.label.toLowerCase()}</b>
          </div>
          <PipelineDiagram key={stage.key} variant={stage.diagram} caption={stage.caption} />
        </div>
      </div>
    </div>
  );
}

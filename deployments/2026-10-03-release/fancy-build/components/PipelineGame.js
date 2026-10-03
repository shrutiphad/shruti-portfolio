"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO_LEADS, STAGES, evaluatePipeline, money } from "@/lib/pipeline-demo";

const statusLabel = { passed: 'Passed', skipped: 'Bypassed', blocked: 'Blocked', warning: 'Unlinked' };

function StageIcon({ stage }) {
  const paths = [
    <><path d="M4 5h24v7l-9 8v8h-6v-8l-9-8z"/><path d="M10 9h12"/></>,
    <><rect x="4" y="5" width="24" height="22" rx="3"/><path d="M10 11h12M10 16h7M10 21h12"/></>,
    <><path d="M5 25V15M12 25V10M19 25V6M26 25V17M3 28h26"/></>,
    <><path d="M5 16h9m0 0V7h11m-11 9v9h11"/><path d="m22 4 3 3-3 3m0 12 3 3-3 3"/></>,
    <><rect x="5" y="3" width="22" height="26" rx="2"/><path d="M10 9h12M10 14h8m-8 8 4 3 8-7"/></>,
  ];
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">{paths[stage]}</svg>;
}

export default function PipelineGame() {
  const [leadIndex, setLeadIndex] = useState(0);
  const [skip, setSkip] = useState('none');
  const [phase, setPhase] = useState('idle');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState([]);
  const [view, setView] = useState(0);
  const [events, setEvents] = useState([]);
  const start = useRef(0);
  const lead = DEMO_LEADS[leadIndex];
  const result = evaluatePipeline(lead, skip);
  const running = phase === 'running';
  const complete = phase === 'done';
  const stage = result.stages[view];
  const inspected = done.includes(view);

  useEffect(() => {
    if (phase !== 'running') return;
    const timer = setTimeout(() => {
      const current = evaluatePipeline(DEMO_LEADS[leadIndex], skip).stages[step];
      setDone((items) => [...items, step]);
      setEvents((items) => [...items, { index: step, time: ((Date.now() - start.current) / 1000).toFixed(1), ...current }]);
      if (step === STAGES.length - 1) setPhase('done');
      else { setStep(step + 1); setView(step + 1); }
    }, STAGES[step].key === skip ? 450 : 950);
    return () => clearTimeout(timer);
  }, [phase, step, leadIndex, skip]);

  const clear = () => { setPhase('idle'); setStep(0); setDone([]); setEvents([]); setView(0); };
  const run = () => { clear(); start.current = Date.now(); setPhase('running'); };
  const ready = (index) => done.includes(index) && result.stages[index].status === 'passed';
  const reported = done.includes(4);
  const fields = [
    ['source', ready(0) ? lead.channel + ' · LEAD-042' : 'Awaiting capture'],
    ['company', ready(1) ? `${lead.name} · ${lead.people} people · ${lead.crm}` : 'Not verified'],
    ['score', ready(2) ? `${result.score}/100 · ${result.score >= 65 ? 'sales-ready' : 'nurture'}` : 'Not computed'],
    ['owner', ready(3) ? result.owner : 'Unassigned'],
    ['credit', reported ? money(result.attribution) + (result.trusted ? ' · source linked' : ' · trace incomplete') : 'Awaiting payment join'],
  ];

  return <div className="pipeline-lab" data-phase={phase} data-trusted={complete && result.trusted ? 'true' : 'false'}>
    <div className="lab-topline mono"><span><i/> Revenue pipeline / sandbox</span><span>Demo data · ~5 seconds</span></div>
    <div className="lab-controls">
      <div className="lab-samples" role="group" aria-label="Sample lead">
        <span className="lab-label mono">01 / Choose a lead</span>
        <div className="lab-options">{DEMO_LEADS.map((item, index) => <button type="button" key={item.key} aria-pressed={index === leadIndex} disabled={running} data-cursor="link" onClick={() => { clear(); setLeadIndex(index); }}><b>{item.name}</b><small>{index === 0 ? 'High fit · paid social' : 'Low fit · organic search'}</small></button>)}</div>
      </div>
      <div className="lab-bypass" role="group" aria-label="Stage to bypass">
        <span className="lab-label mono">02 / Keep it intact — or break a step</span>
        <div className="lab-chips">{[{ key: 'none', label: 'No bypass' }, ...STAGES].map((item) => <button type="button" key={item.key} aria-pressed={skip === item.key} disabled={running} data-cursor="link" onClick={() => { clear(); setSkip(item.key); }}>{item.label}</button>)}</div>
      </div>
      <button type="button" className="lab-run" disabled={running} onClick={run} data-cursor="link"><span aria-hidden="true">{running ? '◌' : '▶'}</span>{running ? 'Running…' : complete ? 'Run again' : 'Run demo'}</button>
    </div>

    <div className="lab-track" style={{ '--hop': step }}>
      <div className="lab-wire" aria-hidden="true"><i/></div>
      {STAGES.map((item, index) => {
        const status = done.includes(index) ? statusLabel[result.stages[index].status] : running && step === index ? 'Running' : 'Queued';
        return <button type="button" className="lab-stage" key={item.key} data-state={done.includes(index) ? result.stages[index].status : running && step === index ? 'active' : 'queued'} aria-pressed={view === index} aria-label={`Inspect ${item.label}`} data-cursor="link" onClick={() => setView(index)}>
          <span className="lab-stage-id mono">{String(index + 1).padStart(2, '0')}<span aria-hidden="true">{done.includes(index) ? result.stages[index].status === 'passed' ? '✓' : '!' : '·'}</span></span>
          <StageIcon stage={index}/><b>{item.label}</b><small>{item.sub}</small><span className="lab-stage-status mono">{status}</span>
        </button>;
      })}
    </div>

    <div className="lab-workspace">
      <div className="lab-inspector">
        <div className="lab-panel-head"><span className="lab-label mono">Inside / {stage.label}</span><span className="lab-state mono" data-warn={inspected && stage.status !== 'passed'}>{inspected ? statusLabel[stage.status] : running && step === view ? 'Processing' : 'Preview'}</span></div>
        <div className="lab-operation" key={`${lead.key}-${skip}-${view}-${inspected}`}>
          <div className="lab-operation-input"><span className="lab-label mono">Input</span><b>{view === 0 || inspected ? stage.input : 'Waiting for the previous stage'}</b></div>
          <div className="lab-operation-rule"><StageIcon stage={view}/><span>{stage.rule}</span></div>
          <div className="lab-operation-output" data-warn={inspected && stage.status !== 'passed'}><span className="lab-label mono">Output</span><b>{inspected ? stage.output : 'Run the demo to resolve this step'}</b></div>
        </div>
      </div>
      <div className="lab-record">
        <div className="lab-panel-head"><span className="lab-label mono">Live lead record</span><span className="mono">{done.length}/5 checked</span></div>
        <div className="lab-record-title"><span className="lab-avatar" aria-hidden="true">{lead.name[0]}</span><div><b>{lead.name}</b><small>{lead.email}</small></div></div>
        <dl>{fields.map(([label, value]) => <div key={label}><dt className="mono">{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
    </div>

    <div className="lab-result" aria-live="polite" aria-atomic="true">
      <div><span className="lab-label mono">Demo payment</span><b>{reported ? money(result.observed) : '—'}</b></div>
      <div><span className="lab-label mono">Attributed revenue</span><b className="lab-credit">{reported ? money(result.attribution) : '—'}</b></div>
      <p>{complete ? !result.trusted ? `${STAGES.find(item => item.key === skip).label} was bypassed. ${result.observed ? 'The payment exists, but the missing trace means it cannot be credited to a source.' : 'The revenue report cannot be reconciled with this incomplete trace.'}` : lead.order ? `${lead.channel} → ${lead.name} → ${money(lead.order)}. The payment and its source agree.` : `Score ${result.score}: this lead belongs in nurture. No payment, no invented revenue.` : running ? `${STAGES[step].label} is processing. Watch the record build as each check completes.` : 'Run a complete pipeline, then bypass a stage and compare the result.'}</p>
    </div>

    <details className="lab-audit" open>
      <summary className="mono">Execution trace <span>{events.length} events</span></summary>
      <ol>{events.length ? events.map((event) => <li key={event.key} data-warn={event.status !== 'passed'}><time className="mono">+{event.time}s</time><b>{event.label}</b><span>{event.detail}</span><i aria-hidden="true">{event.status === 'passed' ? '✓' : '!'}</i></li>) : <li className="lab-audit-empty">The run will log every decision here, including blocked dependencies.</li>}</ol>
    </details>
  </div>;
}

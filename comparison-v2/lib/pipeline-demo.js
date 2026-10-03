export const STAGES = [
  { key: 'capture', label: 'Capture', sub: 'Source + identity', rule: 'Save the lead and its original source together.' },
  { key: 'enrich', label: 'Enrich', sub: 'Company + fit', rule: 'Resolve company size and CRM before assigning fit.' },
  { key: 'score', label: 'Score', sub: 'Fit × intent', rule: '60% company fit + 40% intent. Sales threshold: 65.' },
  { key: 'route', label: 'Route', sub: 'Owner + next action', rule: 'Score ≥ 65 goes to sales; otherwise, nurture. Never route an unverified score.' },
  { key: 'report', label: 'Report', sub: 'Order → source', rule: 'Credit revenue only when the payment joins to a complete lead trace.' },
];

export const DEMO_LEADS = [
  { key: 'qualified', name: 'Northwind', email: 'maya@northwind.example', channel: 'Paid social', people: 180, crm: 'HubSpot', fit: 81, intent: 72, order: 12000 },
  { key: 'nurture', name: 'Lumen', email: 'alex@lumen.example', channel: 'Organic search', people: 8, crm: 'Spreadsheet', fit: 32, intent: 28, order: 0 },
];

export const money = (amount) => '$' + amount.toLocaleString('en-US');

// Local, deterministic demo. No provider calls, messages or actual payments.
export function evaluatePipeline(lead, skip = 'none') {
  const captured = skip !== 'capture';
  const enriched = captured && skip !== 'enrich';
  const scored = enriched && skip !== 'score';
  const score = scored ? Math.round(lead.fit * .6 + lead.intent * .4) : null;
  const routed = scored && skip !== 'route';
  const reported = skip !== 'report';
  const sales = score !== null && score >= 65;
  const owner = routed ? (sales ? 'Sales queue · 9 min SLA' : 'Nurture queue · education sequence') : null;
  const trusted = captured && enriched && scored && routed && reported;
  const attribution = trusted ? lead.order : 0;
  const outputs = [
    { ready: captured, input: `${lead.email} · ${lead.channel}`, output: 'LEAD-042 · source preserved', detail: 'Lead ID and original source saved in one record.' },
    { ready: enriched, input: captured ? lead.name + ' · company domain' : 'Missing lead identity', output: `${lead.people} people · ${lead.crm} · fit ${lead.fit}/100`, detail: enriched ? 'Company resolved; fit is backed by firmographics.' : 'No lead identity to enrich.' },
    { ready: scored, input: enriched ? `Fit ${lead.fit} · intent ${lead.intent}` : 'Missing verified company fit', output: `${score}/100 · ${sales ? 'sales-ready' : 'nurture'}`, detail: scored ? `Score ${score} computed from verified fit and intent.` : 'Scoring held: company fit has not been verified.' },
    { ready: routed, input: scored ? `Verified score ${score}/100` : 'No verified score', output: owner, detail: routed ? (sales ? 'Assigned to sales with a follow-up clock.' : 'Below threshold; sent to nurture instead of sales.') : 'Routing held: there is no verified score.' },
    { ready: reported, input: `${money(lead.order)} demo payment · LEAD-042`, output: trusted ? `${money(attribution)} credited to ${lead.channel}` : `${money(lead.order)} observed · $0 attributable`, detail: !reported ? 'Payment is absent from the report.' : !trusted ? 'Payment observed, but the incomplete lead trace prevents attribution.' : lead.order ? 'Payment joined to the lead, owner and original source.' : 'No payment in this sample. Revenue remains $0.' },
  ];
  const stages = STAGES.map((stage, i) => {
    const bypassed = stage.key === skip;
    const warning = i === 4 && reported && !trusted;
    const status = bypassed ? 'skipped' : !outputs[i].ready ? 'blocked' : warning ? 'warning' : 'passed';
    return { ...stage, ...outputs[i], status, output: bypassed ? 'Stage bypassed' : !outputs[i].ready ? 'Waiting on a missing dependency' : outputs[i].output,
      detail: bypassed ? `${stage.label} bypassed for this run.` : outputs[i].detail };
  });
  return { stages, score, owner, trusted, attribution, observed: reported ? lead.order : 0 };
}

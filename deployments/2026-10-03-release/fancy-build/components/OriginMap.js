import Reveal from "./Reveal";
const branches = [
  ["01", "Started at the hardware", "Electronics · AI/ML honours · ECG · EEG · ESP32", "#edbd72"],
  ["02", "Ships the software", "Next.js · FastAPI · Postgres · Multi-tenant", "#c5a4ed"],
  ["03", "Teaches machines to decide", "RAG · NL-to-SQL · Agents with an audit trail", "#98cba4"],
  ["04", "Automates what repeats", "n8n · Supabase · Clay · HubSpot", "#ed9c86"],
  ["05", "Counts what actually happened", "Attribution · Objection taxonomy · Funnel instrumentation", "#a6c8e8"],
  ["06", "Runs the room", "IEEE General Secretary · WDC Chairperson · why, shruti", "#e6a3c6"],
];
export default function OriginMap() {
  return <div className="origin-map"><div className="origin-center"><span>All one</span><em>person.</em><small>Hardware to revenue.</small></div><div className="origin-branches">{branches.map(([n,title,tools,color],i)=><Reveal key={n} delay={i*65} className="origin-branch" style={{"--accent":color}}><span className="mono">{n}</span><div><h3>{title}</h3><p>{tools}</p></div></Reveal>)}</div></div>;
}

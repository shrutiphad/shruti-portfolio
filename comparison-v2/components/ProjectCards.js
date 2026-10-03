import Link from "next/link";
import Reveal from "./Reveal";
import PipelineDiagram from "./PipelineDiagram";



/**
 * Work is not a list of titles any more. Each project is a card holding
 * its own live schematic, the one number that matters, its stack and its
 * links. The whole card opens the case study; the Live and GitHub buttons
 * sit above that hit area and go straight out.
 */
export default function ProjectCards({ items = [] }) {
  return (
    <div className="cards">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={i * 60} className="card" style={{"--tint":"var(--blue)"}}>
          <Link
            href={`/projects/${p.slug}`}
            className="card__hit"
            data-cursor="view"
            data-cursor-label="Open"
            aria-label={`${p.title} — case study`}
          />

          <div className="card__top mono">
            <span className="card__status">
              <span className="dot" style={{ background: "var(--blue)" }} />
              {p.status}
            </span>
            <span>
              {String(i + 1).padStart(2, "0")} / {p.year}
            </span>
          </div>

          <div className="card__fig">
            <PipelineDiagram variant={p.diagram} />
          </div>

          <h3 className="card__title">
            {p.title} <span className="card__arrow">↗</span>
          </h3>
          <p className="card__tag">{p.tagline}</p>

          {p.metric ? (
            <div className="card__metric">
              <b>{p.metric.value}</b>
              <span>{p.metric.label}</span>
            </div>
          ) : null}

          <div className="card__stack mono">{p.stack.join(" · ")}</div>

          <div className="card__links mono">
            {p.links?.live ? (
              <a href={p.links.live} target="_blank" rel="noreferrer" data-cursor="link" data-primary="1">
                Live ↗
              </a>
            ) : null}
            {p.links?.github ? (
              <a href={p.links.github} target="_blank" rel="noreferrer" data-cursor="link">
                Code ↗
              </a>
            ) : null}
            <Link href={`/projects/${p.slug}`} data-cursor="link">
              Case study →
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

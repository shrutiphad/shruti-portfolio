import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PipelineDiagram from "@/components/PipelineDiagram";
import { projects, profile } from "@/lib/content";

const toneVar = {
  blue: "var(--blue)",
  "blue-soft": "var(--blue-soft)",
  amber: "var(--amber)",
  green: "var(--green)",
  red: "var(--red)",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Shruti Phad`,
    description: project.tagline,
  };
}

export default function CaseStudy({ params }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const accent = toneVar[project.accent] || "var(--blue)";

  return (
    <main data-surface="ink" className="page">
      <div className="slide__pointer" aria-hidden="true" />
      <div className="shell" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Reveal>
          <Link href="/projects" className="back mono" data-cursor="link" style={{ marginBottom: "2.5rem", display: "inline-flex" }}>
            <span>←</span>
            <span>Projects</span>
          </Link>
        </Reveal>

        <Reveal delay={60} className="page__head">
          <div>
            <div
              className="mono"
              style={{ color: "var(--faint)", marginBottom: "1.1rem", display: "flex", gap: "0.9rem", alignItems: "center" }}
            >
              <span className="dot" style={{ background: toneVar[project.statusTone] }} />
              {project.status} · {project.year} · {project.context}
            </div>
            <h1 className="display" style={{ maxWidth: "16ch" }}>
              {project.title}
            </h1>
          </div>
          <p style={{ maxWidth: "38ch", color: "var(--fg)" }}>{project.summary}</p>
        </Reveal>

        {project.diagram ? (
          <Reveal delay={90} style={{ margin: "0 0 clamp(2rem, 5vh, 3.4rem)" }}>
            <PipelineDiagram variant={project.diagram} caption={project.tagline} />
          </Reveal>
        ) : null}

        <div className="case__grid">
          <Reveal delay={100} className="case__meta">
            <div className="case__meta-row">
              <span className="k mono">Role</span>
              <span className="v">Design, build and instrumentation</span>
            </div>
            <div className="case__meta-row">
              <span className="k mono">Stack</span>
              <span className="v">{project.stack.join(" · ")}</span>
            </div>
            <div className="case__meta-row">
              <span className="k mono">One line</span>
              <span className="v" style={{ color: accent, fontStyle: "italic" }}>
                {project.tagline}
              </span>
            </div>
            {project.links?.github ? (
              <div className="case__meta-row">
                <span className="k mono">Code</span>
                <a className="v" href={project.links.github} target="_blank" rel="noreferrer" data-cursor="link">
                  GitHub ↗
                </a>
              </div>
            ) : null}
          </Reveal>

          <div>
            <Reveal className="case__block">
              <h3>The problem</h3>
              <p>{project.problem}</p>
            </Reveal>

            <Reveal delay={70} className="case__block">
              <h3>What I built</h3>
              <ol className="case__list" style={{ "--accent": accent }}>
                {project.build.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={140} className="case__block">
              <h3>What changed</h3>
              <ol className="case__list" style={{ "--accent": accent }}>
                {project.outcome.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <Reveal delay={80} className="case__nav mono">
          <a href={`mailto:${profile.email}`} data-cursor="link">Ask me about this build →</a>
          <Link href={`/projects/${next.slug}`} data-cursor="view" data-cursor-label="Next">Next: {next.title} →</Link>
        </Reveal>

        <div className="footer mono">
          <Link href="/" className="back" data-cursor="link">
            <span>←</span>
            <span>Home</span>
          </Link>
          <span>{project.context}</span>
          <span>Shruti Phad</span>
        </div>
      </div>
    </main>
  );
}

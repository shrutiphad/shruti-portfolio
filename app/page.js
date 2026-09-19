import Link from "next/link";
import Panel from "@/components/Panel";
import DotName from "@/components/DotName";
import PipelineDiagram from "@/components/PipelineDiagram";
import Reveal from "@/components/Reveal";
import MaskUp from "@/components/MaskUp";
import ProjectCards from "@/components/ProjectCards";
import StackMotion from "@/components/StackMotion";
import Shatter from "@/components/Shatter";
import PipelineGame from "@/components/PipelineGame";
import ScrollRail from "@/components/ScrollRail";
import CapabilityDeck from "@/components/CapabilityDeck";
import TagPile from "@/components/TagPile";
import DropBox from "@/components/DropBox";
import {
  profile,
  about,
  capabilities,
  experience,
  leadership,
  projects,
  skills,
} from "@/lib/content";

const toneVar = {
  blue: "var(--blue)",
  "blue-soft": "var(--blue-soft)",
  amber: "var(--amber)",
  green: "var(--green)",
  red: "var(--red)",
};

const chipCount = Object.values(skills).reduce((n, g) => n + g.length, 0);

export default function Home() {
  return (
    <main className="stack">
      <StackMotion />
      <ScrollRail />

      {/* ------------------------------------------------------- 00 intro */}
      <section id="top" data-surface="ink" className="slide">
        <div className="slide__pointer" aria-hidden="true" />
        <div className="slide__inner">
          <div className="shell">
            <Reveal className="hero__status mono">
              <span className="dot dot--pulse" />
              GTM Engineer
            </Reveal>

            <div className="hero__grid">
              <div>
                <DotName text="Shruti Phad" />

                <Reveal delay={140} className="hero__role mono">
                  <span>{profile.location}</span>
                  <span className="rule" />
                  <span>2026</span>
                </Reveal>

                <Reveal delay={200}>
                  <p className="hero__line">
                    I build the layer <em>no-code stops at</em>.
                  </p>
                </Reveal>

                <Reveal delay={260}>
                  <p className="hero__lede">
                    The pipelines, agents and attribution behind revenue — and the software
                    underneath them.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={320} className="hero__fig">
                <PipelineDiagram variant="engine" />
              </Reveal>
            </div>
          </div>
        </div>
        <div className="scroll-cue mono">
          <span>Scroll</span>
          <span className="line" />
        </div>
        <div className="slide__grain" aria-hidden="true" />
        <Shatter />
      </section>

      {/* ------------------------------------------------------- 01 about */}
      <Panel id="about" index="01" label="About">
        <Reveal className="mono kicker">{about.kicker}</Reveal>

        <h2 className="headline about__head">
          <MaskUp>
            Nobody is short of <em className="hl hl-amber">tools</em>.
          </MaskUp>
          <MaskUp delay={0.08}>They are short of a system</MaskUp>
          <MaskUp delay={0.16}>
            that <em className="hl hl-blue">agrees with itself</em>.
          </MaskUp>
        </h2>

        <Reveal delay={80} className="origin">
          <PipelineDiagram variant="circuit" stops={about.origin} />
        </Reveal>

        <CapabilityDeck items={capabilities} />

        <Reveal delay={120} className="facts">
          {about.facts.map((f) => (
            <div className="facts__row" key={f.k}>
              <span className="mono">{f.k}</span>
              <span className="facts__v">
                {f.link ? (
                  <a href={f.link} target="_blank" rel="noreferrer" data-cursor="link" className="ul">
                    {f.v} ↗
                  </a>
                ) : (
                  <b style={f.accent ? { color: toneVar[f.accent] } : undefined}>{f.v}</b>
                )}
              </span>
            </div>
          ))}
        </Reveal>
      </Panel>

      {/* -------------------------------------------------- 02 experience */}
      <Panel id="experience" index="02" label="Where I've built">
        {experience.map((job, i) => (
          <div className="job" key={job.company}>
            <Reveal delay={i * 60} className="job__head">
              <div>
                <h3 className="job__role">{job.role}</h3>
                <div className="job__company" style={{ color: toneVar[job.accent] }}>
                  {job.company}
                </div>
              </div>
              <div className="job__when mono">
                <span>{job.period}</span>
                <span>{job.place}</span>
              </div>
            </Reveal>

            <Reveal delay={60 + i * 60} className="job__metrics">
              {job.metrics.map((m) => (
                <div className="metric" key={m.label}>
                  <div className="metric__v">{m.value}</div>
                  <div className="metric__l mono">{m.label}</div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={100 + i * 60} className="job__fig">
              <PipelineDiagram variant={job.diagram} caption={job.caption} />
            </Reveal>

            <Reveal delay={140 + i * 60} className="tags job__chips">
              {job.chips.map((c) => (
                <span className="tag" key={c}>
                  {c}
                </span>
              ))}
            </Reveal>
          </div>
        ))}
      </Panel>

      {/* ----------------------------------------------------- 03 machine */}
      <Panel id="machine" index="03" label="Run it yourself">
        <div className="work__head">
          <h2 className="headline" style={{ maxWidth: "26ch" }}>
            <MaskUp>Five stages.</MaskUp>
            <MaskUp delay={0.08}>
              Skip one and the <em className="hl hl-amber">number lies</em>.
            </MaskUp>
          </h2>
          <Reveal delay={120} className="mono kicker">
            Click through it — the schematic follows you
          </Reveal>
        </div>

        <PipelineGame />
      </Panel>

      {/* ------------------------------------------------- 04 leadership */}
      <Panel id="leadership" index="04" label="Beyond the stack">
        <div className="work__head">
          <h2 className="headline" style={{ maxWidth: "16ch" }}>
            <MaskUp>The part that</MaskUp>
            <MaskUp delay={0.08}>
              isn&apos;t <em className="hl hl-red">code</em>.
            </MaskUp>
          </h2>
        </div>

        <Reveal delay={60} className="job__metrics">
          {leadership.metrics.map((m) => (
            <div className="metric" key={m.label}>
              <div className="metric__v">{m.value}</div>
              <div className="metric__l mono">{m.label}</div>
            </div>
          ))}
        </Reveal>

        <div className="lead__grid" style={{ marginTop: "clamp(1.4rem, 3.4vh, 2.2rem)" }}>
          <div>
            <Reveal className="lead__note">{leadership.note}</Reveal>
            <Reveal delay={80} className="tags">
              {leadership.skills.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </Reveal>
          </div>

          <div>
            {leadership.roles.map((r, i) => (
              <Reveal
                key={r.org}
                delay={i * 70}
                className="lead__role"
                style={{ "--tint": toneVar[r.accent] }}
              >
                <div className="lead__head">
                  <div>
                    <div className="lead__title">{r.role}</div>
                    <div className="lead__org">{r.org}</div>
                  </div>
                  <span className="lead__when mono">{r.period}</span>
                </div>
                <div className="tags">
                  {r.chips.map((c) => (
                    <span className="tag" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Panel>

      {/* ----------------------------------------------------- 05 toolkit */}
      <Panel id="toolkit" index="05" label="Toolkit">
        <div className="work__head">
          <h2 className="headline" style={{ maxWidth: "18ch" }}>
            <MaskUp>
              {chipCount} <em className="hl hl-blue">pieces</em>,
            </MaskUp>
            <MaskUp delay={0.08}>none of them decorative.</MaskUp>
          </h2>
        </div>
        <TagPile groups={skills} />
      </Panel>

      {/* -------------------------------------------------------- 06 work */}
      <Panel id="work" index="06" label="Selected work">
        <div className="work__head">
          <h2 className="headline" style={{ maxWidth: "22ch" }}>
            <MaskUp>Systems that moved a</MaskUp>
            <MaskUp delay={0.08}>
              <em className="hl hl-blue">number</em> someone cared about.
            </MaskUp>
          </h2>
          <Reveal delay={120}>
            <Link href="/projects" className="cta mono" data-cursor="view" data-cursor-label="Open">
              <span>All {projects.length} case studies</span>
              <span className="cta__arrow">→</span>
            </Link>
          </Reveal>
        </div>

        <ProjectCards items={projects} />
      </Panel>

      {/* ----------------------------------------------------- 07 contact */}
      <Panel id="contact" index="07" label="Contact">
        <div className="contact__grid">
          <div>
            <Reveal className="mono kicker">
              Hiring a GTM engineer, or working out whether you need one
            </Reveal>
            <MaskUp delay={0.06}>
              <a
                href={`mailto:${profile.email}`}
                className="contact__mail"
                data-cursor="view"
                data-cursor-label="Write"
              >
                {profile.email}
              </a>
            </MaskUp>
            <Reveal delay={200} className="contact__links mono">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="link">
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="link">
                GitHub ↗
              </a>
              <a href={profile.substack} target="_blank" rel="noreferrer" data-cursor="link">
                Substack ↗
              </a>
              <a href="/shruti-phad-resume.pdf" target="_blank" rel="noreferrer" data-cursor="link">
                Résumé ↗
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} data-cursor="link">
                {profile.phone}
              </a>
            </Reveal>
          </div>

          <DropBox
            to={profile.email}
            placeholder="A funnel you don't trust. A report someone rebuilds by hand every week. A product line whose objections nobody has counted."
          />
        </div>

        <div className="footer mono">
          <span>© 2026 Shruti Phad</span>
          <span>Built, not templated</span>
          <span>Press ⌘K</span>
        </div>
      </Panel>
    </main>
  );
}

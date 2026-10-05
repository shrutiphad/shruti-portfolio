import Link from "next/link";
import HeroPortrait from "@/components/HeroPortrait";
import SocialLinks from "@/components/SocialLinks";
import OriginMap from "@/components/OriginMap";
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
  purple: "#c5a4ed",
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
            <div className="hero__grid">
              <div className="hero-intro">
                <Reveal className="hero__status mono"><span className="dot dot--pulse" />GTM engineer · Mumbai, India</Reveal>
                <DotName text="Shruti Phad" />

                <Reveal delay={140} className="hero-disciplines"><span>GTM engineering</span><i aria-hidden="true"/><span>Software</span><i aria-hidden="true"/><span>Applied AI</span></Reveal>

                <Reveal delay={200} className="hero-title">
                  <p className="hero__line">
                    I build the layer <span className="hero-ending"><em>no-code stops at</em>.</span>
                  </p>
                </Reveal>

                <Reveal delay={260} className="hero-description">
                  <p className="hero__lede">
                    The pipelines, agents and attribution behind revenue and the software
                    underneath them.
                  </p>

                </Reveal>
                <Reveal delay={340} className="hero-social"><SocialLinks /></Reveal>
              </div>

              <Reveal className="hero__fig">
                <HeroPortrait />
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

      {/* ----------------------------------------------------- 03 machine */}
      <Panel id="machine" index="01" label="Run a revenue pipeline">
        <div className="work__head">
          <h2 className="headline" style={{ maxWidth: "26ch" }}>
            <MaskUp>Five stages.</MaskUp>
            <MaskUp delay={0.08}>
              Skip one and the <em className="hl hl-amber">number lies</em>.
            </MaskUp>
          </h2>
          <Reveal delay={120} className="mono kicker">
            Choose a lead. Run all five stages. Bypass one and see what breaks.
          </Reveal>
        </div>

        <PipelineGame />
      </Panel>

      {/* ------------------------------------------------------- 01 about */}
      <Panel id="about" index="02" label="About">
        <div className="about-overview"><Reveal className="mono kicker">{about.kicker}</Reveal>

        <h2 className="headline about__head">
          <MaskUp>
            Nobody is short of <em className="hl hl-amber">tools</em>.
          </MaskUp>
          <MaskUp delay={0.08}>They are short of a system</MaskUp>
          <MaskUp delay={0.16}>
            that <em className="hl hl-blue">agrees with itself</em>.
          </MaskUp>
        </h2>

        <OriginMap />
        </div>

        <CapabilityDeck items={capabilities} />

      </Panel>

      {/* -------------------------------------------------- 02 experience */}
      <Panel id="experience" index="03" label="Where I've built">
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
              <PipelineDiagram variant={job.diagram} caption={job.caption}
                labelItems={job.diagramLabels} tint={toneVar[job.accent]} />
            </Reveal>
          </div>
        ))}
      </Panel>

      {/* ------------------------------------------------- 04 leadership */}
      <Panel id="leadership" index="04" label="Beyond the stack">
        <div className="work__head">
          <h2 className="headline" style={{ maxWidth: "16ch" }}>
            <MaskUp>The part that</MaskUp>
            <MaskUp delay={0.08}>
              isn&apos;t <em className="hl hl-amber">code</em>.
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
              <a href={profile.x} target="_blank" rel="noreferrer" data-cursor="link">X ↗</a>
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
          <span>From first signal to useful systems.</span>
          <a href="#top">Back to top ↑</a>
          <span className="footer__credit">Crafted by Shruti Phad.</span>
        </div>
      </Panel>
    </main>
  );
}

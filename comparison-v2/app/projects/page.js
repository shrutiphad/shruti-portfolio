import Link from "next/link";
import ProjectCards from "@/components/ProjectCards";
import Reveal from "@/components/Reveal";
import MaskUp from "@/components/MaskUp";
import { projects, profile } from "@/lib/content";

export const metadata = {
  title: "Projects — Shruti Phad",
  description:
    "Revenue attribution pipelines, agentic CRMs, AI SaaS platforms and real-time IoT systems, written up as case studies.",
};

const facts = [
  "One runs in production at a beverage company",
  "The rest exist because the problem annoyed me",
  "All of them start from a number that was wrong",
];

export default function ProjectsPage() {
  return (
    <main data-surface="ink" className="page">
      <div className="slide__pointer" aria-hidden="true" />
      <div className="shell" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="page__head">
          <div>
            <div className="mono" style={{ color: "var(--faint)", marginBottom: "1rem" }}>
              Case studies — {projects.length}
            </div>
            <MaskUp as="h1">
              <span className="display" style={{ display: "block", maxWidth: "14ch" }}>
                The <em className="hl hl-blue">receipts</em>
              </span>
            </MaskUp>
          </div>
          <Reveal delay={120} className="facts facts--tight">
            {facts.map((f, i) => (
              <div className="facts__row" key={f}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="facts__v">
                  <b>{f}</b>
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <ProjectCards items={projects} />

        <div className="footer mono">
          <Link href="/" className="back" data-cursor="link">
            <span>←</span>
            <span>Home</span>
          </Link>
          <a href={`mailto:${profile.email}`} data-cursor="link">
            {profile.email}
          </a>
        </div>
      </div>
    </main>
  );
}

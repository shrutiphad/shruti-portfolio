import Portrait from "./Portrait";

export default function HeroPortrait() {
  return <div className="hero-profile">
    <div className="portrait-frame">
      <Portrait />
      <a className="beyond-link" href="#leadership" data-cursor="link"><span className="dot" aria-hidden="true" /> Away from my laptop <span aria-hidden="true">↗</span><small>Teams, talks & the rooms I run</small></a>
    </div>
  </div>;
}

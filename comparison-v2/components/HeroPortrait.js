import Portrait from "./Portrait";

export default function HeroPortrait() {
  return <div className="hero-profile">
    <div className="portrait-frame">
      <Portrait />
      <a className="beyond-link" href="#leadership" data-cursor="link"><span className="dot" aria-hidden="true" /> Away from my laptop <svg className="beyond-link__arrow" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 16 16 4M5 4h11v11" /></svg><small>Teams, talks & the rooms I run</small></a>
    </div>
  </div>;
}

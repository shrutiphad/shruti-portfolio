import Portrait from "./Portrait";
import SocialLinks from "./SocialLinks";
export default function HeroPortrait() {
  return <div className="hero-profile">
    <div className="profile-facts">
      <div className="profile-fact" style={{"--accent":"#edbd72"}}><span>Works in</span><strong>GTM & software engineering</strong></div>
      <div className="profile-fact" style={{"--accent":"#c5a4ed"}}><span>Thinks in</span><strong>Products, people & systems</strong></div>
    </div>
    <div className="portrait-frame"><Portrait /><a className="beyond-link" href="#leadership"><span className="dot" /> Away from my laptop <span>↗</span><small>Teams, talks & the rooms I run</small></a></div>
    <div className="profile-facts">
      <div className="profile-fact" style={{"--accent":"#98cba4"}}><span>Studied</span><strong>Electronics · AI/ML honours</strong></div>
      <div className="profile-fact" style={{"--accent":"#ed9c86"}}><span>Argues in</span><strong>Funnels, not adjectives</strong></div>
    </div>
    <SocialLinks />
  </div>;
}

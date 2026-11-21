import { Link } from 'react-router';
import { landingCopy } from '../../content/landing';
import { useLanguage } from '../../hooks/useLanguage';

export function LandingStatement() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  return <section id="idea" className="landing-statement landing-section">
    <p className="landing-micro landing-reveal">{c.ideaLabel}</p>
    <div className="statement-body landing-reveal"><span className="statement-symbol" aria-hidden="true">[↳]</span><div><h2>{c.idea}</h2><p>{c.ideaBody}</p></div></div>
    <div className="statement-steps">{c.steps.map(([title,body],i) => <div className="landing-reveal" key={i}><span className="landing-micro">0{i+1} /</span><h3>{title}</h3><p>{body}</p></div>)}</div>
  </section>;
}

export function PracticePreview() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  return <section className="landing-practice landing-section">
    <p className="landing-micro landing-reveal">{c.practiceLabel}</p>
    <div className="practice-layout">
      <div className="landing-reveal"><h2>{c.practiceTitle}</h2><p>{c.practiceBody}</p><Link to="/practice" className="landing-text-link">{c.practiceCTA}<span aria-hidden="true">↗</span></Link></div>
      <div className="practice-sheet landing-reveal"><div className="landing-micro">{c.sampleLabel}<span aria-hidden="true">[ ? ]</span></div><h3>{c.sampleQuestion}</h3><div className="practice-answer"><span aria-hidden="true">↳</span>{c.sampleAnswer}</div><p>{c.sampleNote}</p><div className="practice-stamp landing-micro">{c.practiceStatus}</div></div>
    </div>
  </section>;
}

export function LandingManifesto() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  return <section id="about" className="landing-manifesto landing-section">
    <p className="landing-micro landing-reveal">{c.aboutLabel}</p>
    <h2 className="landing-reveal">{c.aboutTitle}</h2>
    <div className="manifesto-bottom landing-reveal"><span className="manifesto-sign" aria-hidden="true">ta↗</span><div><p>{c.aboutBody}</p><ul>{c.principles.map(item => <li key={item}>{item}</li>)}</ul></div></div>
  </section>;
}

export function LandingCTA() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  return <section className="landing-cta landing-section">
    <div className="cta-core" aria-hidden="true"><span /><span /><span /><span /></div>
    <p className="landing-micro landing-reveal">{c.endLabel}</p><h2 className="landing-reveal">{c.endTitle}</h2>
    <Link to="/learn" className="landing-button landing-reveal">{c.endCTA}<span aria-hidden="true">↗</span></Link>
    <div className="cta-baseline landing-micro"><span>TECH ACADEMY</span><span>{c.footer}</span><a href="#landing-title" aria-label={lang === 'es' ? 'Volver arriba' : 'Back to top'}>↑</a></div>
  </section>;
}

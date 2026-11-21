import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';
import { landingCopy } from '../content/landing';
import ComputationalCore from './landing/ComputationalCore';

export default function Hero() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="hero-meta landing-micro"><span>{c.atlas}</span><span>TECH ACADEMY / 2026</span></div>
      <div className="hero-composition">
        <h1 id="landing-title" className="hero-title">
          {c.title.map((line, i) => <span className={`hero-line hero-line-${i}`} key={i}><span>{line}</span></span>)}
        </h1>
        <ComputationalCore expanded={expanded} />
        <div className="hero-annotation landing-micro"><span className="annotation-cross">+</span><span>{c.artifact}</span></div>
      </div>
      <div className="hero-bottom">
        <div className="hero-intro"><p>{c.intro}</p><Link className="landing-button" to="/learn">{c.start}<span aria-hidden="true">↗</span></Link></div>
        <div className="hero-core-control">
          <button type="button" onClick={() => setExpanded(!expanded)} aria-pressed={expanded} aria-describedby="core-description"><span aria-hidden="true">{expanded ? '−' : '+'}</span>{expanded ? c.close : c.open}</button>
          <p id="core-description" aria-live="polite">{expanded ? c.coreOpen : c.coreClosed}</p>
        </div>
      </div>
      <div className="hero-baseline landing-micro"><a href="#idea">↓ <span>{c.scroll}</span></a><a href="#modules">{c.modules}<span aria-hidden="true"> ↗</span></a></div>
    </section>
  );
}

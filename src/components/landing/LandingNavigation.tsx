import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useLanguage } from '../../hooks/useLanguage';
import { landingCopy } from '../../content/landing';

export default function LandingNavigation() {
  const { lang, setLang, t } = useLanguage();
  const c = landingCopy[lang];
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', escape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => { document.removeEventListener('keydown', escape); desktop.removeEventListener('change', closeOnDesktop); };
  }, [open]);
  const languages = <div className="landing-language" role="group" aria-label={t('langSwitch')}>
    {(['es','en'] as const).map(code => <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}
  </div>;
  const links = <><NavLink to="/learn" onClick={() => setOpen(false)}>{c.learn}</NavLink><NavLink to="/practice" onClick={() => setOpen(false)}>{c.practice}</NavLink><Link to="/#about" onClick={() => setOpen(false)}>{c.about}</Link></>;
  return <header className="landing-nav">
    <nav aria-label={t('navMain')} className="landing-nav-inner">
      <Link className="landing-brand" to="/" onClick={() => setOpen(false)}><span className="landing-brand-symbol" aria-hidden="true">↗</span>TECH ACADEMY</Link>
      <div className="landing-nav-links">{links}{languages}</div>
      <button ref={toggle} type="button" className="landing-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="landing-mobile-nav">{c.menu}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    </nav>
    {open && <nav id="landing-mobile-nav" aria-label={c.menu} className="landing-mobile-menu">{links}{languages}</nav>}
  </header>;
}

export function LandingFooter() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  return <footer className="landing-footer landing-micro"><span>© 2026 TECH ACADEMY</span><div><Link to="/learn">{c.learn}</Link><Link to="/practice">{c.practice}</Link><Link to="/settings">{c.settings}</Link></div></footer>;
}

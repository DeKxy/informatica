import { Link } from 'react-router';
import { landingCopy } from '../../content/landing';
import { useLanguage } from '../../hooks/useLanguage';

export function TerritoryArt({ history = false }: { history?: boolean }) {
  return <svg viewBox="0 0 500 320" aria-hidden="true" className="territory-art">
    {history ? <>
      {[0,1,2,3,4].map(i => <g key={i} transform={`translate(${i*44} ${-i*18})`}>
        <path d="M80 140 200 80 320 140 200 200Z M80 140V200L200 260 320 200V140M200 200V260" fill="#0f172a" stroke="currentColor" strokeWidth="1" />
        <path d="M110 140 200 95 290 140 200 185Z" fill="none" stroke="currentColor" opacity=".5" />
        {Array.from({length: 5}, (_,n) => <path key={n} d={`M${140+n*15} ${125-n*7.5}l60 30M${140+n*15} ${155+n*7.5}l60 -30`} stroke="currentColor" opacity=".5" />)}
      </g>)}
    </> : <>
      {[65,105,145].map(r => <circle key={r} cx="250" cy="160" r={r} fill="none" stroke="currentColor" opacity=".2" />)}
      <path d="M30 160H470M250 5V315" stroke="currentColor" opacity=".2" />
      <path d="M100 210 180 80 350 65 407 190 280 270ZM100 210 250 160 180 80M250 160 350 65M250 160 407 190M250 160 280 270" fill="none" stroke="currentColor" />
      {[[100,210],[180,80],[350,65],[407,190],[280,270],[250,160]].map(([x,y],i) => <g key={x}><circle cx={x} cy={y} r="15" fill="#0f172a" stroke="currentColor" /><circle cx={x} cy={y} r="4" fill="currentColor" /><text x={x+22} y={y-17} fill="currentColor" fontSize="9" fontFamily="monospace">0{i+1}</text></g>)}
      <circle className="territory-signal" cx="250" cy="160" r="30" fill="none" stroke="currentColor" />
    </>}
  </svg>;
}

export default function ModuleShowcase() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  return <section id="modules" className="landing-modules landing-section">
    <div className="landing-section-heading landing-reveal"><p className="landing-micro">{c.modulesLabel}</p><h2>{c.modulesTitle}</h2><span className="section-marker" aria-hidden="true">↙</span></div>
    {[
      { slug: 'cybersecurity', title: c.cyberTitle, text: c.cyberText, tags: c.cyberTags },
      { slug: 'history-ai', title: c.historyTitle, text: c.historyText, tags: c.historyTags },
    ].map((module, i) => <Link key={module.slug} className={`territory territory-${i} landing-reveal`} to={`/learn/${module.slug}`} aria-label={`${c.enter}: ${module.title.replace('\n', ' ')}`}>
      <div className="territory-top landing-micro"><span>MODULE_0{i+1}</span><span>{module.tags}</span></div>
      <div className="territory-content"><div><h3>{module.title}</h3><p>{module.text}</p></div><TerritoryArt history={i===1} /></div>
      <div className="territory-bottom"><span className="territory-number" aria-hidden="true">0{i+1}</span><span className="territory-link">{c.enter}<span className="round-arrow" aria-hidden="true">↗</span></span></div>
    </Link>)}
  </section>;
}

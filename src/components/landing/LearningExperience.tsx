import { useState } from 'react';
import { landingCopy } from '../../content/landing';
import { useLanguage } from '../../hooks/useLanguage';

export default function LearningExperience() {
  const { lang } = useLanguage();
  const c = landingCopy[lang];
  const [mode, setMode] = useState(0);
  const [disconnected, setDisconnected] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [perspective, setPerspective] = useState(0);
  return <section className="landing-lab landing-section" id="experience">
    <p className="landing-micro landing-reveal">{c.labLabel}</p>
    <div className="lab-layout">
      <div className="lab-copy landing-reveal"><h2>{c.labTitle}</h2><p>{c.labDesc}</p>
        <div className="lab-modes" role="group" aria-label={lang === 'es' ? 'Elegir demostración' : 'Choose a demo'}>
          {c.modes.map((label,i) => <button type="button" key={label} aria-pressed={mode===i} aria-controls="learning-demo" onClick={() => setMode(i)}><span className="landing-micro">0{i+1}</span>{label}<span aria-hidden="true">↗</span></button>)}
        </div>
      </div>
      <div className="lab-preview landing-reveal" id="learning-demo">
        <div className="lab-preview-top landing-micro"><span className="status-dot" />{c.demo}<span>0{mode+1}</span></div>
        <div className="lab-demo" key={mode}>
          <h3>{[c.simulationTitle,c.classifyTitle,c.debateTitle][mode]}</h3>
          <p>{[c.simulationText,c.classifyText,c.debateText][mode]}</p>
          {mode === 0 && <>
            <svg className={`signal-demo ${disconnected ? 'is-rerouted' : ''}`} viewBox="0 0 420 200" role="img" aria-label={disconnected ? c.alternate : c.direct}>
              <path className="signal-alternate" d="M60 60 210 160 360 60" /><path className="signal-direct" d="M60 60H360" />
              <path className="signal-active" d={disconnected ? 'M60 60 210 160 360 60' : 'M60 60H360'} />
              {[[60,60,'A'],[360,60,'B'],[210,160,'C']].map(([x,y,label]) => <g key={label}><circle cx={x} cy={y} r="25" /><text x={x} y={Number(y)+5} textAnchor="middle">{label}</text></g>)}
              {disconnected && <text x="210" y="67" textAnchor="middle" className="signal-break">×</text>}
            </svg>
            <button type="button" className="demo-button" onClick={() => setDisconnected(!disconnected)} aria-pressed={disconnected}>{disconnected ? c.reconnect : c.disconnect}<span aria-hidden="true">↗</span></button>
            <p className="demo-feedback" role="status">{disconnected ? c.alternate : c.direct}</p>
          </>}
          {mode === 1 && <>
            <div className="classification-mark" aria-hidden="true">A = B<span>?</span></div>
            <div className="demo-choices">{[c.evidence,c.assumption].map((label,i) => <button type="button" key={i} className="demo-button" aria-pressed={answer===i} onClick={() => setAnswer(i)}>{label}<span aria-hidden="true">↗</span></button>)}</div>
            <p className="demo-feedback" role="status">{answer !== null && (answer === 1 ? c.correct : c.incorrect)}</p>
          </>}
          {mode === 2 && <>
            <div className="debate-mark" aria-hidden="true">↔</div>
            <div className="demo-choices">{c.perspectives.map((label,i) => <button type="button" key={i} className="demo-button" aria-pressed={perspective===i} onClick={() => setPerspective(i)}>{label}</button>)}</div>
            <p className="demo-feedback" role="status">{c.arguments[perspective]}</p>
          </>}
        </div>
      </div>
    </div>
  </section>;
}

import { useRef } from 'react';
import { Link } from 'react-router';
import { learningModules, localize, moduleDuration } from '../content/learningModules';
import { useCompletedTopics } from '../features/learning/progress';
import { useLanguage } from '../hooks/useLanguage';
import { milestones } from '../content/cyberCourse';
import { historyActivityIds } from '../content/historyCourse';
import { landingCopy } from '../content/landing';
import { TerritoryArt } from '../components/landing/ModuleShowcase';
import { useLandingMotion } from '../components/landing/useLandingMotion';

export default function Learn() {
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  const root = useRef<HTMLDivElement>(null);
  useLandingMotion(root);
  const c = landingCopy[lang];
  const es = lang === 'es';

  return (
    <div className="landing learn-hub" ref={root}>
      <header className="learn-cover">
        <div className="learn-cover-meta landing-micro">
          <nav aria-label={es ? 'Ubicación' : 'Breadcrumb'}><Link to="/">Tech Academy</Link><span aria-hidden="true"> / </span><span>{c.learn}</span></nav>
          <span>{es ? 'TU MAPA DE APRENDIZAJE' : 'YOUR LEARNING MAP'}</span>
        </div>
        <div className="learn-cover-composition">
          <h1><span className="learn-title-line">{es ? 'El conocimiento' : 'Knowledge'}</span><span className="learn-title-line learn-title-accent">{es ? 'empieza aquí.' : 'starts here.'}</span></h1>
          <span className="learn-cover-symbol" aria-hidden="true">↙</span>
        </div>
        <div className="learn-cover-bottom">
          <p>{es ? 'Explora los módulos disponibles y aprende a tu ritmo. Sigue las conexiones entre tecnología, seguridad y sociedad.' : 'Explore the available modules at your own pace. Follow the connections between technology, security and society.'}</p>
          <div className="landing-micro"><span>{es ? 'SIN CUENTAS / A TU RITMO' : 'NO ACCOUNTS / YOUR OWN PACE'}</span><span>{es ? 'Tu progreso se guarda en este dispositivo.' : 'Your progress is saved on this device.'}</span></div>
        </div>
        <a href="#learn-modules" className="landing-text-link learn-explore-link">{es ? 'Explora los módulos' : 'Explore the modules'}<span aria-hidden="true">↓</span></a>
      </header>

      <section id="learn-modules" className="learn-territories" aria-labelledby="learn-modules-title">
        <div className="learn-index-line landing-micro"><h2 id="learn-modules-title">{es ? 'TERRITORIOS DE APRENDIZAJE' : 'LEARNING TERRITORIES'}</h2><span>02 {es ? 'MÓDULOS' : 'MODULES'} / 04 {es ? 'SALAS' : 'ROOMS'}</span></div>
        {learningModules.map((module, index) => {
          const progressIds = module.slug === 'cybersecurity' ? milestones : [...module.topics.map((topic) => topic.id), ...historyActivityIds, 'history-timeline-computing', 'history-timeline-ai', 'history-misconceptions', 'history-final-project'];
          const count = progressIds.filter((id) => completed.includes(id)).length;
          const percent = Math.round(count / progressIds.length * 100);
          return (
            <Link key={module.slug} to={`/learn/${module.slug}`} className={`territory territory-${index} learn-territory landing-reveal`} aria-label={`${c.enter}: ${localize(module.title, lang)}`}>
              <div className="territory-top landing-micro"><span>MODULE_0{index + 1}</span><span>{index === 0 ? c.cyberTags : c.historyTags}</span></div>
              <div className="territory-content">
                <div><h3>{index === 0 ? c.cyberTitle : c.historyTitle}</h3><p>{localize(module.description, lang)}</p></div>
                <TerritoryArt history={index === 1} />
              </div>
              <div className="learn-module-details">
                <div className="learn-module-facts landing-micro"><span>2 {es ? 'salas' : 'rooms'}</span><span>~{module.slug === 'cybersecurity' ? 90 : moduleDuration(module)} min</span><span>{count}/{progressIds.length} {es ? 'hitos' : 'milestones'}</span></div>
                <div className="learn-progress">
                  <div className="learn-progress-label landing-micro"><span>{es ? 'TU PROGRESO' : 'YOUR PROGRESS'}</span><span>{percent}%</span></div>
                  <div className="learn-progress-track" role="progressbar" aria-label={`${es ? 'Progreso de' : 'Progress in'} ${localize(module.title, lang)}`} aria-valuenow={count} aria-valuemin={0} aria-valuemax={progressIds.length} aria-valuetext={`${percent}% ${es ? 'completado' : 'complete'}`}><span style={{ width: `${percent}%` }} /></div>
                </div>
              </div>
              <div className="territory-bottom"><span className="territory-number" aria-hidden="true">0{index + 1}</span><span className="territory-link">{c.enter}<span className="round-arrow" aria-hidden="true">↗</span></span></div>
            </Link>
          );
        })}
      </section>
      <aside className="learn-closing"><span className="landing-micro">{es ? 'EXPLORA / COMPRENDE / EXPERIMENTA' : 'EXPLORE / UNDERSTAND / EXPERIMENT'}</span><p>{es ? 'Cada conexión abre una nueva pregunta.' : 'Every connection opens up a new question.'}</p><Link to="/#about" className="landing-text-link">{c.about}<span aria-hidden="true">↗</span></Link></aside>
    </div>
  );
}

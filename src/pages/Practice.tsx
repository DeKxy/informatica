import { Link } from 'react-router';
import { TerritoryArt } from '../components/landing/ModuleShowcase';
import { learningModules, localize } from '../content/learningModules';
import { useLanguage } from '../hooks/useLanguage';
import { practiceCourses } from '../content/practiceCourse';
import { useCompletedTopics } from '../features/learning/progress';

export default function Practice() {
  const { lang } = useLanguage();
  const es = lang === 'es';
  const completed = useCompletedTopics();
  return (
    <div className="landing practice-hub">
      <header className="practice-cover">
        <p className="landing-micro">TECH ACADEMY / {es ? 'APRENDER HACIENDO' : 'LEARNING BY DOING'}</p>
        <h1>{es ? 'Práctica' : 'Practice'}<span aria-hidden="true">↙</span></h1>
        <p>{es ? 'Elige un módulo para resolver sus retos y actividades.' : 'Choose a module to work through its challenges and activities.'}</p>
      </header>
      <section className="practice-modules" aria-label={es ? 'Módulos de práctica' : 'Practice modules'}>
        {learningModules.map((module, i) => <Link key={module.slug} to={`/practice/${module.slug}`} className={`territory territory-${i} practice-module`} aria-label={`${es ? 'Practicar' : 'Practice'}: ${localize(module.title, lang)}`}>
          <div className="territory-top landing-micro"><span>MODULE_0{i + 1}</span><span>{es ? 'RETOS Y ACTIVIDADES' : 'CHALLENGES & ACTIVITIES'}</span></div>
          <TerritoryArt history={i === 1} />
          <h2>{localize(module.title, lang)}</h2>
          <p className="landing-micro">{practiceCourses[module.slug].filter(exercise => completed.includes(exercise.id)).length}/6 {es ? 'RETOS SUPERADOS · ~20 MIN' : 'CHALLENGES PASSED · ~20 MIN'}</p>
          <p>{i === 0 ? (es ? 'Reconoce el phishing, construye búsquedas y analiza metadatos y exposición digital.' : 'Recognise phishing, build searches, and analyse metadata and digital exposure.') : (es ? 'Ordena hitos, prueba simulaciones y contrasta tus ideas sobre informática e IA.' : 'Order milestones, try simulations, and test your ideas about computing and AI.')}</p>
          <div className="territory-bottom"><span className="territory-link">{es ? 'Abrir actividades del módulo' : 'Open module activities'}<span className="round-arrow" aria-hidden="true">↗</span></span></div>
        </Link>)}
      </section>
    </div>
  );
}

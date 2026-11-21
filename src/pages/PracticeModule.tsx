import { useLayoutEffect, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import PracticeExercise from '../components/learning/PracticeExercise';
import { practiceCourses } from '../content/practiceCourse';
import { learningModules, localize } from '../content/learningModules';
import { useCompletedTopics } from '../features/learning/progress';
import { useLanguage } from '../hooks/useLanguage';

export default function PracticeModule() {
  const { moduleSlug } = useParams();
  const [params, setParams] = useSearchParams();
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  const es = lang === 'es';
  const panel = useRef<HTMLDivElement>(null);
  const module = learningModules.find(item => item.slug === moduleSlug);
  const exercises = module ? practiceCourses[module.slug] : [];
  const id = params.get('exercise');
  const selected = Math.max(0, exercises.findIndex(exercise => exercise.id === id));
  const summary = id === 'summary';
  const done = exercises.filter(exercise => completed.includes(exercise.id)).length;
  useLayoutEffect(() => {
    if (id) { panel.current?.scrollIntoView({ behavior: 'instant', block: 'start' }); panel.current?.focus({ preventScroll: true }); }
  }, [id, moduleSlug]);
  if (!module) return <div className="landing practice-hub"><h1>{es ? 'Módulo no encontrado' : 'Module not found'}</h1><Link className="landing-text-link" to="/practice">← {es ? 'Volver a práctica' : 'Back to practice'}</Link></div>;
  const select = (value: string) => setParams({ exercise: value });
  return <div className="landing practice-hub practice-course">
    <header className="practice-cover"><Link className="landing-text-link" to="/practice">← {es ? 'Módulos de práctica' : 'Practice modules'}</Link><p className="landing-micro">{es ? 'LABORATORIO / SIN LÍMITE DE TIEMPO' : 'LAB / NO TIME LIMIT'}</p><h1>{localize(module.title, lang)}</h1><p>{es ? 'Resuelve, contrasta y vuelve a intentarlo. Los retos se guardan al superarlos; tus intentos se conservan en este navegador.' : 'Solve, review and try again. Challenges are saved when passed; your attempts are kept in this browser.'}</p>
      <div className="practice-course-progress"><span className="landing-micro">{done}/{exercises.length} {es ? 'RETOS SUPERADOS' : 'CHALLENGES PASSED'}</span><div role="progressbar" aria-label={es ? 'Progreso de práctica' : 'Practice progress'} aria-valuenow={done} aria-valuemin={0} aria-valuemax={exercises.length}><span style={{ width: `${done / exercises.length * 100}%` }} /></div><Link to={`/learn/${module.slug}`}>{es ? 'Consultar teoría y fuentes ↗' : 'Review theory and sources ↗'}</Link></div>
    </header>
    <div className="practice-workspace"><nav className="practice-course-nav" aria-label={es ? 'Retos del módulo' : 'Module challenges'}>{exercises.map((exercise, i) => <button type="button" key={exercise.id} aria-current={!summary && selected === i ? 'step' : undefined} onClick={() => select(exercise.id)}><span className="landing-micro">{completed.includes(exercise.id) ? '✓' : `0${i + 1}`}</span><span>{localize(exercise.title, lang)}</span></button>)}<button type="button" aria-current={summary ? 'step' : undefined} onClick={() => select('summary')}>{es ? 'Resumen del recorrido' : 'Course summary'}</button></nav>
      <div ref={panel} className="practice-panel" tabIndex={-1}>{summary ? <section className="practice-exercise"><p className="landing-micro">{es ? 'TU RECORRIDO' : 'YOUR JOURNEY'}</p><h2>{done === exercises.length ? (es ? 'Módulo superado.' : 'Module passed.') : (es ? 'Sigue conectando ideas.' : 'Keep connecting ideas.')}</h2><p className="practice-brief">{es ? `Has superado ${done} de ${exercises.length} retos. Puedes repasar cualquiera sin perder tus logros.` : `You have passed ${done} of ${exercises.length} challenges. You can revisit any of them without losing your achievements.`}</p><button type="button" className="landing-button" onClick={() => select((exercises.find(exercise => !completed.includes(exercise.id)) ?? exercises[0]).id)}>{done === exercises.length ? (es ? 'Volver a practicar' : 'Practise again') : (es ? 'Continuar con un reto pendiente' : 'Continue a pending challenge')}<span aria-hidden="true">↗</span></button></section> : <PracticeExercise key={exercises[selected].id} exercise={exercises[selected]} last={selected === exercises.length - 1} onNext={() => select(selected === exercises.length - 1 ? 'summary' : exercises[selected + 1].id)} />}</div>
    </div>
  </div>;
}

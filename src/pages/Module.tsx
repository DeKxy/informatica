import { Link, useParams } from 'react-router';
import ModuleArtwork from '../components/learning/ModuleArtwork';
import { learningModules, localize, moduleDuration } from '../content/learningModules';
import { useCompletedTopics } from '../features/learning/progress';
import { useLanguage } from '../hooks/useLanguage';
import CyberCourse from '../components/learning/CyberCourse';
import HistoryAiCourse from '../components/learning/HistoryAiCourse';

export default function ModulePage() {
  const { moduleSlug } = useParams();
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  const module = learningModules.find((item) => item.slug === moduleSlug);
  if (!module) {
    return <section className="max-w-5xl mx-auto px-6 py-20"><h1 className="text-4xl font-bold">{lang === 'es' ? 'Módulo no encontrado' : 'Module not found'}</h1><Link to="/learn" className="text-cyan-300 underline">{lang === 'es' ? 'Volver a Learn' : 'Back to Learn'}</Link></section>;
  }
  if (module.slug === 'cybersecurity') return <CyberCourse />;
  if (module.slug === 'history-ai') return <HistoryAiCourse />;
  const cyan = module.accent === 'cyan';
  const count = module.topics.filter((topic) => completed.includes(topic.id)).length;
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <Link to="/learn" className="text-cyan-300 font-bold hover:underline">← Learn</Link>
      <header className="mt-8 mb-10">
        <p className={`font-mono text-sm uppercase tracking-widest font-bold mb-3 ${cyan ? 'text-cyan-300' : 'text-purple-300'}`}>{lang === 'es' ? 'Módulo' : 'Module'} / {module.topics.length} {lang === 'es' ? 'temas' : 'topics'}</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">{localize(module.title, lang)}</h1>
        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">{localize(module.description, lang)}</p>
      </header>
      <div className={`neo-card ${cyan ? 'border-cyan-500 bg-cyan-950/30' : 'border-purple-500 bg-purple-950/30'} p-5 flex flex-wrap items-center gap-6 mb-10`}>
        <ModuleArtwork kind={module.slug} />
        <div className="grow">
          <p className="font-mono font-bold mb-3">{count}/{module.topics.length} {lang === 'es' ? 'temas completados' : 'topics completed'} · ~{moduleDuration(module)} min</p>
          <div className="h-3 bg-slate-950 rounded-full overflow-hidden" role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={module.topics.length} aria-label={lang === 'es' ? 'Progreso del módulo' : 'Module progress'}>
            <div className={`h-full ${cyan ? 'bg-cyan-400' : 'bg-purple-400'}`} style={{ width: `${count / module.topics.length * 100}%` }} />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-5">{lang === 'es' ? 'Temas' : 'Topics'}</h2>
      <ol className="grid gap-4">
        {module.topics.map((topic, index) => (
          <li key={topic.id}>
            <Link to={`/learn/${module.slug}/${topic.id}`} className={`neo-card flex items-start gap-4 p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 transition-transform ${cyan ? 'hover:border-cyan-400' : 'hover:border-purple-400'}`}>
              <span className={`font-mono text-lg font-bold shrink-0 ${cyan ? 'text-cyan-300' : 'text-purple-300'}`}>{String(index + 1).padStart(2, '0')}</span>
              <span className="grow min-w-0">
                <strong className="block text-lg mb-1">{localize(topic.title, lang)}</strong>
                <span className="block text-slate-300 text-sm leading-relaxed">{localize(topic.description, lang)}</span>
                <span className="block font-mono text-xs text-slate-400 mt-3">{topic.minutes} min · {completed.includes(topic.id) ? (lang === 'es' ? 'Completado' : 'Completed') : (lang === 'es' ? 'Pendiente' : 'Not completed')}</span>
              </span>
              <span aria-hidden="true" className={cyan ? 'text-cyan-300' : 'text-purple-300'}>→</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

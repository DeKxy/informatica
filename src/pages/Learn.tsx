import { Link } from 'react-router';
import { learningModules, localize, moduleDuration } from '../content/learningModules';
import ModuleArtwork from '../components/learning/ModuleArtwork';
import { useCompletedTopics } from '../features/learning/progress';
import { useLanguage } from '../hooks/useLanguage';
import { milestones } from '../content/cyberCourse';
import { historyActivityIds } from '../content/historyCourse';

const styles = {
  cybersecurity: { border: 'border-cyan-500', text: 'text-cyan-300', surface: 'bg-cyan-950/40', bar: 'bg-cyan-400' },
  'history-ai': { border: 'border-purple-500', text: 'text-purple-300', surface: 'bg-purple-950/40', bar: 'bg-purple-400' },
};

export default function Learn() {
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  return (
    <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
      <header className="mb-10 md:mb-12 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold mb-4">Tech Academy / Learn</p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">Learn</h1>
        <p className="text-lg text-slate-300">{lang === 'es' ? 'Explora los módulos disponibles y aprende a tu ritmo.' : 'Explore the available modules and learn at your own pace.'}</p>
      </header>

      <div className="grid gap-7 md:grid-cols-2">
        {learningModules.map((module) => {
          const style = styles[module.slug];
          const progressIds = module.slug === 'cybersecurity' ? milestones : [...module.topics.map((topic) => topic.id), ...historyActivityIds, 'history-timeline-computing', 'history-timeline-ai', 'history-misconceptions', 'history-final-project'];
          const count = progressIds.filter((id) => completed.includes(id)).length;
          const percent = Math.round(count / progressIds.length * 100);
          return (
            <Link
              key={module.slug}
              to={`/learn/${module.slug}`}
              className={`neo-card ${style.border} group flex flex-col overflow-hidden transition-transform duration-150 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_#000] active:translate-y-0 active:shadow-none focus-visible:outline-cyan-300`}
            >
              <div className={`${style.surface} border-b-2 ${style.border} flex items-center justify-center h-40 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-size-[32px_32px]" aria-hidden="true" />
                <ModuleArtwork kind={module.slug} />
              </div>
              <div className="p-6 md:p-8 flex flex-col grow">
                <p className={`font-mono text-xs uppercase tracking-widest font-bold mb-3 ${style.text}`}>{lang === 'es' ? 'Módulo' : 'Module'} 0{learningModules.indexOf(module) + 1}</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:underline underline-offset-4">{localize(module.title, lang)}</h2>
                <p className="text-slate-300 leading-relaxed mb-7 grow">{localize(module.description, lang)}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-slate-200 mb-5">
                  <span>2 {lang === 'es' ? 'salas' : 'rooms'}</span>
                  <span>~{module.slug === 'cybersecurity' ? 90 : moduleDuration(module)} min</span>
                  <span>{percent}% {lang === 'es' ? 'completado' : 'complete'}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-950 overflow-hidden mb-5" role="progressbar" aria-label={lang === 'es' ? `Progreso de ${localize(module.title, lang)}` : `Progress in ${localize(module.title, lang)}`} aria-valuenow={count} aria-valuemin={0} aria-valuemax={progressIds.length}>
                  <div className={`h-full ${style.bar}`} style={{ width: `${percent}%` }} />
                </div>
                <span className={`font-bold ${style.text}`}>{lang === 'es' ? 'Explorar módulo' : 'Explore module'} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

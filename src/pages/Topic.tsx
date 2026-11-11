import { Link, Navigate, useParams } from 'react-router';
import { historyLessonIds } from '../content/historyCourse';
import { learningModules, localize } from '../content/learningModules';
import { setTopicCompleted, useCompletedTopics } from '../features/learning/progress';
import { useLanguage } from '../hooks/useLanguage';

const formerHistoryTopics: Record<string, string> = {
  'history-origins': 'hci-01', 'history-computers': 'hci-03',
  'history-evolution': 'hci-04', 'history-internet': 'hci-06',
  'history-ai-intro': 'ai-01', 'history-ai-future': 'ai-06',
};

export default function TopicPage() {
  const { moduleSlug, topicId } = useParams();
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  if (moduleSlug === 'history-ai' && topicId && (historyLessonIds.includes(topicId) || formerHistoryTopics[topicId])) return <Navigate to={`/learn/history-ai?lesson=${formerHistoryTopics[topicId] ?? topicId}`} replace />;
  const module = learningModules.find((item) => item.slug === moduleSlug);
  const index = module?.topics.findIndex((item) => item.id === topicId) ?? -1;
  const topic = module?.topics[index];
  if (!module || !topic) {
    return <section className="max-w-4xl mx-auto px-6 py-20"><h1 className="text-4xl font-bold">{lang === 'es' ? 'Tema no encontrado' : 'Topic not found'}</h1><Link to="/learn" className="text-cyan-300 underline">Learn</Link></section>;
  }
  const done = completed.includes(topic.id);
  const cyan = module.accent === 'cyan';
  const previous = module.topics[index - 1];
  const next = module.topics[index + 1];
  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <Link to={`/learn/${module.slug}`} className="text-cyan-300 font-bold hover:underline">← {localize(module.title, lang)}</Link>
      <header className="mt-8 mb-10">
        <p className={`font-mono text-sm uppercase tracking-widest font-bold mb-3 ${cyan ? 'text-cyan-300' : 'text-purple-300'}`}>{lang === 'es' ? 'Tema' : 'Topic'} {index + 1}/{module.topics.length} · {topic.minutes} min</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">{localize(topic.title, lang)}</h1>
        <p className="text-lg text-slate-300 leading-relaxed">{localize(topic.description, lang)}</p>
      </header>
      <div className={`neo-card p-6 md:p-8 mb-8 ${cyan ? 'border-cyan-500' : 'border-purple-500'}`}>
        <h2 className="text-2xl font-bold mb-3">{lang === 'es' ? 'Descripción del tema' : 'Topic overview'}</h2>
        <p className="text-slate-300 leading-relaxed">{localize(topic.description, lang)}</p>
      </div>
      <button type="button" aria-pressed={done} onClick={() => setTopicCompleted(topic.id, !done)} className={`neo-button px-6 py-3 border-black text-black ${done ? 'bg-green-500' : 'bg-white'}`}>
        {done ? (lang === 'es' ? '✓ Tema completado' : '✓ Topic completed') : (lang === 'es' ? 'Marcar tema como completado' : 'Mark topic as completed')}
      </button>
      <nav aria-label={lang === 'es' ? 'Navegación de temas' : 'Topic navigation'} className="flex flex-wrap justify-between gap-4 mt-12 border-t-2 border-slate-700 pt-6">
        {previous ? <Link to={`/learn/${module.slug}/${previous.id}`} className="text-cyan-300 font-bold hover:underline">← {localize(previous.title, lang)}</Link> : <span />}
        {next && <Link to={`/learn/${module.slug}/${next.id}`} className="text-cyan-300 font-bold hover:underline">{localize(next.title, lang)} →</Link>}
      </nav>
    </article>
  );
}

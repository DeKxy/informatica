import { useEffect, useRef, useState } from 'react';
import { intelligenceCycle, osintTools, pillars, stravaCases, threats, type Profile, type ToolCategory } from '../../content/cyberCourse';
import { localize } from '../../content/learningModules';
import { useLanguage } from '../../hooks/useLanguage';

export function Section({ id, eyebrow, title, challenge = false, children }: { id?: string; eyebrow: string; title: string; challenge?: boolean; children: React.ReactNode }) {
  return <section id={id} className={`scroll-mt-28 space-y-5 md:space-y-6 ${challenge ? 'rounded-2xl border-2 border-cyan-500/70 bg-slate-900/50 p-5 md:p-8 shadow-[4px_4px_0_0_#000]' : 'border-t-2 border-slate-700 pt-8'}`}><header className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-widest font-bold text-cyan-300 mb-2">{eyebrow}</p><h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{title}</h2></header>{children}</section>;
}

export function CiaCards() {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState(pillars[0].id);
  const selected = pillars.find((item) => item.id === selectedId) ?? pillars[0];
  const icons = ['▣', '◇', '◷'];
  return <div>
    <div className="grid md:grid-cols-3 gap-4">{pillars.map((item, index) => <button key={item.id} type="button" aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)} className={`neo-card p-5 text-left transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 ${selectedId === item.id ? 'border-cyan-400' : 'hover:border-cyan-500'}`}>
      <span aria-hidden="true" className="text-3xl text-cyan-300">{icons[index]}</span>
      <strong className="block text-xl mt-2 mb-2">{localize(item.name, lang)}</strong>
      <span className="block text-sm leading-relaxed text-slate-300 mb-3">{localize(item.description, lang)}</span>
      <span className="block text-sm border-t border-slate-600 pt-3">{localize(item.example, lang)}</span>
    </button>)}</div>
    <div className="mt-4 rounded-xl border-l-4 border-green-500 bg-green-950/20 p-4" aria-live="polite"><strong className="text-green-300">{lang === 'es' ? 'Cómo protegerlo' : 'How to protect it'} · {localize(selected.name, lang)}</strong><p className="text-slate-200 mt-1">{localize(selected.defence, lang)}</p></div>
  </div>;
}

export function ProfileExplorer({ kind }: { kind: 'threats' }) {
  const { lang } = useLanguage();
  const items = kind === 'threats' ? threats : pillars;
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-5">
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, index) => <button key={item.id} type="button" aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)} className={`neo-card text-left p-4 min-h-20 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 ${selectedId === item.id ? 'border-cyan-400 bg-cyan-950/40' : 'hover:border-cyan-500'}`}>
          <span aria-hidden="true" className="font-mono text-xs text-cyan-300 mr-3">{String(index + 1).padStart(2, '0')}</span><strong>{localize(item.name, lang)}</strong>
        </button>)}
      </div>
      <ProfileDetail profile={selected} />
    </div>
  );
}

export function OsintFlow() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const steps = lang === 'es' ? ['Datos', 'Información', 'Conocimiento útil'] : ['Data', 'Information', 'Intelligence'];
  return <div ref={ref} className="flex flex-col sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2" aria-label={steps.join(' → ')}>
    {steps.map((step, index) => <div key={step} className="contents"><div className={`neo-card w-full border-cyan-500 p-3 sm:p-5 text-center font-bold text-sm sm:text-base ${visible ? 'course-flow-enter' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>{step}</div>{index < 2 && <span aria-hidden="true" className="font-bold text-cyan-300"><span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span></span>}</div>)}
  </div>;
}

function ProfileDetail({ profile }: { profile: Profile }) {
  const { lang } = useLanguage();
  const fields = [
    [lang === 'es' ? 'Qué es' : 'What it is', profile.description],
    [lang === 'es' ? 'Cómo funciona' : 'How it works', profile.mechanism],
    [lang === 'es' ? 'Ejemplo' : 'Example', profile.example],
    [lang === 'es' ? 'Defensa' : 'Defence', profile.defence],
  ] as const;
  return <div className="neo-card border-cyan-500 p-5 md:p-7" aria-live="polite">
    <h3 className="text-2xl font-bold mb-5">{localize(profile.name, lang)}</h3>
    <dl className="space-y-4">{fields.map(([label, value]) => <div key={label}><dt className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold mb-1">{label}</dt><dd className="text-slate-200 leading-relaxed">{localize(value, lang)}</dd></div>)}</dl>
  </div>;
}

export function IntelligenceCycle() {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState(intelligenceCycle[0].id);
  const selected = intelligenceCycle.find((phase) => phase.id === selectedId) ?? intelligenceCycle[0];
  return <div className="neo-card p-5 md:p-7">
    <p className="text-slate-300 mb-5">{lang === 'es' ? 'Selecciona una fase.' : 'Select a phase.'}</p>
    <ol className="grid gap-2 sm:grid-cols-5 mb-6">{intelligenceCycle.map((phase, index) => <li key={phase.id} className="relative"><button type="button" aria-pressed={selectedId === phase.id} onClick={() => setSelectedId(phase.id)} className={`w-full min-h-20 rounded-xl border-2 p-3 text-left transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 ${selectedId === phase.id ? 'border-cyan-400 bg-cyan-950/60' : 'border-slate-600 bg-slate-900'}`}><span className="block font-mono text-xs text-cyan-300 mb-1">0{index + 1} →</span><strong className="text-sm">{localize(phase.name, lang)}</strong></button></li>)}</ol>
    <div className="border-l-4 border-cyan-400 pl-5 min-h-20" aria-live="polite"><h3 className="font-bold text-xl">{localize(selected.name, lang)}</h3><p className="text-slate-200 mt-2 max-w-2xl leading-relaxed">{localize(selected.detail, lang)}</p></div>
  </div>;
}

export function StravaCaseStudy() {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState(stravaCases[0].id);
  const selected = stravaCases.find((item) => item.id === selectedId) ?? stravaCases[0];
  return <div className="neo-card border-cyan-500 overflow-hidden">
    <div className="grid grid-cols-3 gap-2 p-4 border-b-2 border-black" role="group" aria-label={lang === 'es' ? 'Casos Strava' : 'Strava cases'}>
      {stravaCases.map((item) => <button key={item.id} type="button" aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)} className={`relative rounded-xl border-2 p-3 text-left transition-colors ${selectedId === item.id ? 'border-cyan-400 bg-cyan-950/50' : 'border-slate-600 bg-slate-900 hover:border-cyan-500'}`}><span className="block font-mono text-xs text-cyan-300 font-bold mb-1">{item.id}</span><span className="block text-xs sm:text-sm font-bold leading-snug">{localize(item.title, lang).split(' · ')[1]}</span></button>)}
    </div>
    <div className="grid md:grid-cols-2 gap-7 p-5 md:p-7" aria-live="polite">
      <div><h3 className="text-2xl font-bold mb-4">{localize(selected.title, lang)}</h3><p className="text-slate-200 leading-relaxed mb-5 max-w-prose">{localize(selected.body, lang)}</p><p className="border-l-4 border-cyan-400 pl-4 text-cyan-100 font-medium">{localize(selected.lesson, lang)}</p><a className="inline-block mt-5 text-cyan-300 underline" href={selected.source} target="_blank" rel="noreferrer">{lang === 'es' ? 'Leer investigación' : 'Read investigation'} ↗</a></div>
      <figure className="bg-slate-950 rounded-xl border-2 border-slate-700 p-5 flex flex-col justify-center">
        <svg viewBox="0 0 240 130" className="w-full h-40" aria-hidden="true"><path d="M15 22h210M15 55h210M15 88h210M40 10v110M100 10v110M160 10v110M220 10v110" stroke="#334155" strokeWidth="1" /><path d="M45 105Q75 50 105 72T170 32Q198 50 216 23" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" /><circle cx="45" cy="105" r="5" fill="#22c55e" /><circle cx="216" cy="23" r="5" fill="#a855f7" /></svg>
        <figcaption className="font-mono text-xs text-slate-400 text-center">{lang === 'es' ? 'Ilustración esquemática — no es una captura real' : 'Schematic illustration — not a real screenshot'}</figcaption>
      </figure>
    </div>
  </div>;
}

const filters: Array<'all' | 'important' | ToolCategory> = ['all', 'important', 'people', 'infrastructure', 'image', 'data'];
const filterLabel = {
  es: { all: 'Todos', important: 'Importantes', people: 'Personas', infrastructure: 'Infraestructura', image: 'Imagen', data: 'Datos' },
  en: { all: 'All', important: 'Important', people: 'People', infrastructure: 'Infrastructure', image: 'Image', data: 'Data' },
};
export function ToolsExplorer() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const visible = osintTools.filter((tool) =>
    (filter === 'all' || (filter === 'important' ? tool.important : tool.category === filter)) &&
    `${localize(tool.name, lang)} ${localize(tool.description, lang)}`.toLocaleLowerCase(lang).includes(search.toLocaleLowerCase(lang).trim()),
  );
  const selected = osintTools.find((tool) => tool.id === selectedId);
  return <div className="space-y-5">
    <p className="text-slate-300">{lang === 'es' ? 'Selecciona una herramienta para conocer su utilidad y sus límites.' : 'Select a tool to learn what it does and where its boundaries lie.'}</p>
    <label className="block max-w-lg font-bold">{lang === 'es' ? 'Buscar herramienta' : 'Search tools'}<input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setSelectedId(null); }} placeholder={lang === 'es' ? 'Nombre o descripción' : 'Name or description'} className="block w-full mt-2 rounded-xl border-2 border-slate-500 bg-slate-900 px-4 py-3" /></label>
    <div className="flex flex-wrap gap-2" role="group" aria-label={lang === 'es' ? 'Filtrar herramientas' : 'Filter tools'}>{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setSelectedId(null); }} className={`neo-button px-3 py-2 text-sm ${filter === item ? 'bg-cyan-400 text-black' : 'bg-slate-700 text-white'}`}>{filterLabel[lang][item]}</button>)}</div>
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">{visible.map((tool) => <button key={tool.id} type="button" aria-pressed={selectedId === tool.id} onClick={() => setSelectedId(tool.id)} className={`neo-card p-4 text-left hover:border-cyan-400 ${selectedId === tool.id ? 'border-cyan-400' : ''}`}>
      <span aria-hidden="true" className="block text-xl text-cyan-300 mb-2">{tool.category === 'image' ? '▧' : tool.category === 'infrastructure' ? '⌁' : tool.category === 'data' ? '◈' : '◎'}</span>
      <span className="block font-bold mb-2">{localize(tool.name, lang)} {tool.important && <span className="text-yellow-300" aria-label={lang === 'es' ? 'Importante' : 'Important'}>★</span>}</span>
      <span className="block font-mono text-xs text-cyan-300 mb-2">{filterLabel[lang][tool.category]}</span>
      <span className="text-sm text-slate-300">{localize(tool.description, lang)}</span>
    </button>)}</div>
    {visible.length === 0 && <p role="status" className="text-slate-300">{lang === 'es' ? 'No hay herramientas que coincidan.' : 'No tools match.'}</p>}
    {selected && <div className="neo-card border-cyan-500 p-5 md:p-7" aria-live="polite">
      <h3 className="text-2xl font-bold mb-5">{localize(selected.name, lang)}</h3>
      <dl className="space-y-4">{([
        [lang === 'es' ? 'Qué hace' : 'What it does', selected.mechanism],
        [lang === 'es' ? 'Posible uso indebido' : 'Possible misuse', selected.misuse],
        [lang === 'es' ? 'Protección o investigación legítima' : 'Protection or legitimate research', selected.defence],
        [lang === 'es' ? 'Ejemplo' : 'Example', selected.example],
      ] as const).map(([label, value]) => value && <div key={label}><dt className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold mb-1">{label}</dt><dd className="text-slate-200">{localize(value, lang)}</dd></div>)}</dl>
    </div>}
  </div>;
}

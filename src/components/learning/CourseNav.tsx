import { useEffect, useRef, useState } from 'react';
import { useCompletedTopics } from '../../features/learning/progress';
import { useLanguage } from '../../hooks/useLanguage';

const sections = [
  { id: 'room-cyber', es: 'Ciberseguridad', en: 'Cybersecurity', milestone: 'room-cyber' },
  { id: 'cia-triad', es: 'Tríada CIA', en: 'CIA triad' },
  { id: 'threats', es: 'Amenazas', en: 'Threats' },
  { id: 'phishing-challenge', es: 'Reto phishing', en: 'Phishing challenge', milestone: 'challenge-phishing' },
  { id: 'room-osint', es: 'OSINT', en: 'OSINT', milestone: 'room-osint' },
  { id: 'intelligence-cycle', es: 'Ciclo de inteligencia', en: 'Intelligence cycle' },
  { id: 'strava-case', es: 'Caso Strava', en: 'Strava case study' },
  { id: 'osint-tools', es: 'Herramientas', en: 'Tools' },
  { id: 'search-challenge', es: 'Sintaxis de búsqueda', en: 'Search syntax', milestone: 'challenge-search' },
  { id: 'metadata-challenge', es: 'Metadatos', en: 'Metadata', milestone: 'challenge-metadata' },
  { id: 'exposure-activity', es: 'Exposición', en: 'Exposure', milestone: 'activity-exposure' },
  { id: 'privacy-shield', es: 'Escudo de privacidad', en: 'Privacy shield', milestone: 'activity-shield' },
  { id: 'sources', es: 'Fuentes', en: 'Sources' },
];

export default function CourseNav() {
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  const [active, setActive] = useState('room-cyber');
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-110px 0px -68% 0px' });
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const links = sections.map((section, index) => {
    const isActive = active === section.id;
    const done = section.milestone && completed.includes(section.milestone);
    return <a key={section.id} href={`#${section.id}`} aria-current={isActive ? 'location' : undefined} onClick={() => mobileMenu.current?.removeAttribute('open')} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${isActive ? 'bg-cyan-400 text-black font-bold' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
      <span className="font-mono text-xs shrink-0">{String(index + 1).padStart(2, '0')}</span>
      <span className="grow">{section[lang]}</span>
      {done && <span aria-label={lang === 'es' ? 'Completado' : 'Completed'} className={isActive ? 'text-black' : 'text-green-300'}>✓</span>}
    </a>;
  });
  return <>
    <aside className="hidden lg:block lg:self-stretch"><nav aria-label={lang === 'es' ? 'Contenido del módulo' : 'Module contents'} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto neo-card p-3">
      <p className="font-mono text-xs uppercase tracking-widest font-bold text-cyan-300 px-3 pt-2 pb-3">{lang === 'es' ? 'Tu recorrido' : 'Your journey'}</p>{links}
    </nav></aside>
    <details ref={mobileMenu} className="lg:hidden sticky top-20 z-40 neo-card border-cyan-500 mb-8 bg-slate-800">
      <summary className="cursor-pointer px-4 py-3 font-bold text-cyan-200">{lang === 'es' ? 'Ir a una sección' : 'Go to a section'} · {sections.find((section) => section.id === active)?.[lang]}</summary>
      <nav aria-label={lang === 'es' ? 'Contenido del módulo' : 'Module contents'} className="max-h-[60vh] overflow-y-auto p-2 border-t-2 border-slate-600">{links}</nav>
    </details>
  </>;
}

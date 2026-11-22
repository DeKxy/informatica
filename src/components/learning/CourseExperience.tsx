import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useLanguage } from '../../hooks/useLanguage';

export default function CourseExperience({ slug, children }: { slug: string; children: ReactNode }) {
  const { lang } = useLanguage();
  const [params] = useSearchParams();
  const [comfortable, setComfortable] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLSpanElement>(null);
  const presenting = params.get('presentation') === 'true';
  useEffect(() => {
    const node = root.current;
    if (!node || presenting) return;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const length = Math.max(1, box.height - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, -box.top / length));
      if (track.current) track.current.style.transform = `scaleX(${ratio})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [presenting]);
  return <div ref={root} className={`learning-surface ${comfortable ? 'reading-comfortable' : ''}`}>
    {!presenting && <div className="course-utilities">
      <span className="course-utility-label">{lang === 'es' ? 'ESPACIO DE APRENDIZAJE' : 'LEARNING SPACE'}</span>
      <button type="button" aria-pressed={comfortable} onClick={() => setComfortable(!comfortable)}><span aria-hidden="true">Aa</span> {lang === 'es' ? 'Lectura cómoda' : 'Comfort reading'}</button>
      <Link to={`/practice/${slug}`}>{lang === 'es' ? 'Practicar este módulo' : 'Practise this module'} <span aria-hidden="true">↗</span></Link>
      <div className="course-reading-track" aria-hidden="true" title={lang === 'es' ? 'Posición de lectura; no modifica el progreso' : 'Reading position; does not change completion'}><span ref={track} /></div>
    </div>}
    {children}
    {!presenting && <div className="course-end-actions"><Link to={`/practice/${slug}`}>{lang === 'es' ? 'Pon a prueba lo aprendido' : 'Put your learning to the test'} <span aria-hidden="true">↗</span></Link><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>{lang === 'es' ? 'Volver arriba ↑' : 'Back to top ↑'}</button></div>}
  </div>;
}

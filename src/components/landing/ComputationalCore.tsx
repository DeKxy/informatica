import { useEffect, useRef, type CSSProperties } from 'react';

function CircuitPlane({ network = false }: { network?: boolean }) {
  return (
    <svg viewBox="0 0 320 320" aria-hidden="true">
      <path className="core-rim" d="M24 8H296L312 24V296L296 312H24L8 296V24Z" />
      <path d="M24 68V24H68M252 24H296V68M296 252V296H252M68 296H24V252" fill="none" stroke="currentColor" strokeWidth="2" />
      {network ? <>
        <path d="M48 56H148L264 128V264H160L48 184ZM48 56L160 160 264 128M160 160V264M48 184L160 160M148 56L160 160" fill="none" stroke="currentColor" />
        {[[48,56],[148,56],[264,128],[264,264],[160,264],[48,184],[160,160]].map(([x,y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="9" fill="#0f172a" stroke="currentColor" /><circle cx={x} cy={y} r="3" fill="currentColor" /></g>)}
      </> : <>
        {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45} 160 160)`}>
          <path d={`M${134 + i % 2 * 8} 112V${62 + i % 3 * 12}L${112 + i % 2 * 8} ${40 + i % 3 * 12}V22`} fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M152 110V48M168 110V76L192 52V24" fill="none" stroke="currentColor" opacity=".45" />
          <circle cx="152" cy="48" r="3" fill="currentColor" /><rect x="108" y="83" width="16" height="8" fill="currentColor" opacity=".6" />
        </g>)}
        <rect x="111" y="111" width="98" height="98" rx="4" fill="#020617" stroke="currentColor" />
        <rect x="123" y="123" width="74" height="74" fill="none" stroke="currentColor" opacity=".5" />
        {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${134 + i * 13} 132V188M132 ${134+i*13}H188`} stroke="currentColor" strokeWidth=".6" opacity=".5" />)}
        {[[38,38],[270,38],[38,270],[270,270]].map(([x,y]) => <rect key={`${x}-${y}`} x={x} y={y} width="12" height="12" fill="none" stroke="currentColor" />)}
      </>}
    </svg>
  );
}

export default function ComputationalCore({ expanded }: { expanded: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    const hero = node?.closest('section');
    if (!node || !hero) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    let frame = 0;
    let visible = true;
    let px = 0;
    let py = 0;
    const paint = () => {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) return;
      const bounds = hero.getBoundingClientRect();
      node.style.setProperty('--unfold', String(Math.min(1, Math.max(0, -bounds.top / bounds.height))));
      node.style.setProperty('--pointer-x', `${px * 5}deg`);
      node.style.setProperty('--pointer-y', `${py * 4}deg`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const pointer = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches) return;
      const bounds = hero.getBoundingClientRect();
      px = (event.clientX - bounds.left) / bounds.width - .5;
      py = (event.clientY - bounds.top) / bounds.height - .5;
      schedule();
    };
    const reset = () => { px = 0; py = 0; schedule(); };
    const sync = () => {
      node.classList.toggle('core-paused', !visible || document.hidden || reduced.matches);
      if (reduced.matches) {
        node.style.setProperty('--unfold', '0');
        node.style.setProperty('--pointer-x', '0deg');
        node.style.setProperty('--pointer-y', '0deg');
      } else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(hero);
    window.addEventListener('scroll', schedule, { passive: true });
    hero.addEventListener('pointermove', pointer, { passive: true });
    hero.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', schedule);
      hero.removeEventListener('pointermove', pointer);
      hero.removeEventListener('pointerleave', reset);
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  return (
    <div ref={root} className={`computational-core ${expanded ? 'is-expanded' : ''}`} aria-hidden="true">
      <div className="core-ground" />
      <div className="core-orientation"><div className="core-assembly">
        <div className="core-plane core-base"><CircuitPlane /></div>
        <div className="core-plane core-compute"><CircuitPlane /></div>
        <div className="core-plane core-algorithm"><CircuitPlane /></div>
        <div className="core-plane core-network"><CircuitPlane network /></div>
        <div className="core-heart"><span /><span /><span /></div>
        {[0,1,2,3].map(i => <span key={i} className="core-column" style={{ '--column': i } as CSSProperties} />)}
      </div></div>
    </div>
  );
}

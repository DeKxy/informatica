import { useLayoutEffect, type RefObject } from 'react';

/** Progressive enhancement: content stays visible without observers or motion. */
export function useLandingMotion(root: RefObject<HTMLDivElement | null>) {
  // Set the initial reveal state before paint, avoiding visible → hidden → visible.
  useLayoutEffect(() => {
    const node = root.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    node.querySelectorAll('.landing-reveal').forEach((element) => observer.observe(element));
    const sync = () => node.classList.toggle('motion-ready', !preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', sync);
      node.classList.remove('motion-ready');
    };
  }, [root]);
}

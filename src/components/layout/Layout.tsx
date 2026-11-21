import { Suspense, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useLanguage } from '../../hooks/useLanguage';
import LandingNavigation, { LandingFooter } from '../landing/LandingNavigation';

export default function Layout() {
  const { t, lang } = useLanguage();
  const { pathname, hash, search } = useLocation();
  const presenting = pathname === '/learn/history-ai' && new URLSearchParams(search).get('presentation') === 'true';

  useLayoutEffect(() => {
    const anchor = hash && document.getElementById(hash.slice(1));
    if (anchor) {
      anchor.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-green-500 focus:text-black focus:font-bold focus:px-4 focus:py-2 focus:rounded-xl focus:border-2 focus:border-black"
      >
        {t('skipToContent')}
      </a>
      {!presenting && <LandingNavigation />}
      <main id="main" tabIndex={-1} className="scroll-mt-20 outline-none">
        <Suspense fallback={<p role="status" className="px-6 py-24 text-center text-slate-300">{lang === 'es' ? 'Cargando el espacio de aprendizaje…' : 'Loading the learning space…'}</p>}>
          <Outlet />
        </Suspense>
      </main>
      {!presenting && <LandingFooter />}
    </>
  );
}

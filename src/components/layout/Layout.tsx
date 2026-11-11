import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useLanguage } from '../../hooks/useLanguage';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout() {
  const { t } = useLanguage();
  const { pathname, hash, search } = useLocation();
  const presenting = pathname === '/learn/history-ai' && new URLSearchParams(search).get('presentation') === 'true';

  useEffect(() => {
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
      {!presenting && <Navbar />}
      <main id="main" tabIndex={-1} className="scroll-mt-20 outline-none">
        <Outlet />
      </main>
      {!presenting && <Footer />}
    </>
  );
}

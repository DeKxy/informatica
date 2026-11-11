import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../i18n/translations';

const NAV_LINKS = [
  { to: '/', labelKey: 'navHome' },
  { to: '/learn', labelKey: 'navLearn' },
  { to: '/practice', labelKey: 'navPractice' },
] as const;

const LANGUAGES: Language[] = ['es', 'en'];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-medium transition-colors ${isActive ? 'text-white underline decoration-2 underline-offset-8 decoration-green-500' : 'text-slate-300 hover:text-white'}`;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="border-b-2 border-black bg-slate-900 sticky top-0 z-50">
      <nav aria-label={t('navMain')} className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" onClick={close} className="text-2xl font-bold text-white tracking-tighter">
          TECH ACADEMY
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, labelKey }) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
              {t(labelKey)}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={t('langSwitch')}
            className="neo-button px-4 py-2 bg-slate-800 text-white border-black"
          >
            {lang.toUpperCase()}
          </button>
        </div>

        <button
          type="button"
          className="md:hidden neo-button px-3 py-2 bg-slate-800"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{t('menu')}</span>
          <span aria-hidden="true" className="block w-6 h-0.5 bg-white mb-1" />
          <span aria-hidden="true" className="block w-6 h-0.5 bg-white" />
        </button>
      </nav>
      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t-2 border-black p-6 flex flex-col gap-4 bg-slate-900">
          {NAV_LINKS.map(({ to, labelKey }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={close} className={linkClass}>
              {t(labelKey)}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-2" role="group" aria-label={t('langSwitch')}>
            {LANGUAGES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`neo-button px-3 py-1 text-xs ${lang === code ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'}`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

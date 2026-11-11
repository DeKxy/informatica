import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t, lang, setLang } = useLanguage();
  return (
    <footer className="border-t-4 border-black bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-xl font-bold mb-6 tracking-tighter text-white">TECH ACADEMY</div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              {t('footerDesc')}
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 mb-6 font-bold">{t('footerNav')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">{t('navHome')}</Link></li>
              <li><Link to="/learn" className="text-slate-400 hover:text-white transition-colors">{t('navLearn')}</Link></li>
              <li><Link to="/practice" className="text-slate-400 hover:text-white transition-colors">{t('navPractice')}</Link></li>
              <li><Link to="/settings" className="text-slate-400 hover:text-white transition-colors">{t('navSettings')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-purple-400 mb-6 font-bold">{t('footerLang')}</h4>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
                className={`neo-button px-3 py-1 text-xs ${lang === 'es' ? 'bg-purple-600 text-white border-black' : 'bg-slate-800 text-slate-400 border-black'}`}
              >
                ES
              </button>
              <button 
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`neo-button px-3 py-1 text-xs ${lang === 'en' ? 'bg-purple-600 text-white border-black' : 'bg-slate-800 text-slate-400 border-black'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
          <div>{t('footerCredits')}</div>
        </div>
      </div>
    </footer>
  );
}


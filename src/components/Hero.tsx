import { Link } from 'react-router';
import { useLanguage } from '../hooks/useLanguage';
import TechIllustration from './TechIllustration';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-6 block font-bold">
          {t('heroKicker')}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
          {t('heroTitle')}
        </h1>
        <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
          {t('heroDesc')}
        </p>
        <div className="flex flex-wrap gap-6">
          <Link to="/learn" className="neo-button inline-block bg-green-500 text-black px-8 py-4 border-black hover:bg-green-400">
            {t('heroCTA')}
          </Link>
          <a href="#methodology" className="neo-button inline-block bg-white text-black px-8 py-4 border-black hover:bg-slate-100">
            {t('heroSecondaryCTA')}
          </a>
        </div>
      </div>
      <div className="relative">
        <TechIllustration />
      </div>
    </section>
  );
}

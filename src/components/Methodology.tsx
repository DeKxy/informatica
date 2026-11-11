import { useLanguage } from '../hooks/useLanguage';

export default function Methodology() {
  const { t } = useLanguage();
  const pillars = [
    { title: t('method1') },
    { title: t('method2') },
    { title: t('method3') },
    { title: t('method4') },
  ];
  return (
    <section id="methodology" className="scroll-mt-20 py-24 px-6 border-y-2 border-black bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-400 font-bold">{t('methodTitle')}</span>
          <h2 className="text-3xl font-bold mt-2 text-white tracking-tighter">{t('methodHeading')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {pillars.map((pillar, i) => (
            <div key={i} className="group">
              <div className="text-4xl font-mono text-white/10 group-hover:text-cyan-400 transition-colors mb-4 font-bold">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{pillar.title}</h3>
              <div className="h-1 w-8 bg-black group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


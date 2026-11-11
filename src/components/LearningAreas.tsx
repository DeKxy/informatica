import { useLanguage } from '../hooks/useLanguage';

export default function LearningAreas() {
  const { t } = useLanguage();
  const areas = [
    { title: t('learnArea1Title'), desc: t('learnArea1Desc') },
    { title: t('learnArea2Title'), desc: t('learnArea2Desc') },
    { title: t('learnArea3Title'), desc: t('learnArea3Desc') },
  ];
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-white tracking-tighter">{t('learnTitle')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {areas.map((a, i) => (
          <div key={i} className="neo-card p-8 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <h3 className="text-xl font-bold mb-4 text-white">{a.title}</h3>
            <p className="text-slate-300 leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useLanguage } from '../hooks/useLanguage';

export default function NewsSection() {
  const { t } = useLanguage();
  const news = [
    { title: t('news1Title'), date: t('news1Date') },
    { title: t('news2Title'), date: t('news2Date') },
    { title: t('news3Title'), date: t('news3Date') },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tighter">{t('newsTitle')}</h2>
            <span className="text-[10px] font-mono border-2 border-black px-2 py-0.5 rounded-full uppercase bg-slate-800 text-slate-300 font-bold">
              {t('newsPlaceholder')}
            </span>
          </div>
          <div className="space-y-6">
            {news.map((item, i) => (
              <article key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <time className="text-sm font-mono text-slate-400 ml-4 shrink-0 font-bold">{item.date}</time>
                </div>
                <div className="h-0.5 bg-black"></div>
              </article>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="neo-card p-8 bg-purple-600 relative overflow-hidden h-full flex flex-col justify-center border-black">
             <div className="absolute top-0 right-0 p-2">
               <div className="w-3 h-3 rounded-full bg-black animate-pulse"></div>
             </div>
            <span className="text-[10px] font-mono uppercase tracking-tighter text-black mb-4 block font-black">{t('newsFeaturedLabel')}</span>
            <h3 className="text-xl font-bold mb-4 leading-snug text-white">{t('newsFeatured')}</h3>
            <p className="text-sm text-purple-100 mb-6 font-medium">{t('newsFeaturedDesc')}</p>
            <button type="button" disabled className="neo-button bg-white text-black px-4 py-2 border-black mt-auto text-sm disabled:pointer-events-none">
              {t('newsReadMore')} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


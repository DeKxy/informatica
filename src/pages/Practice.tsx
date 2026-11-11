import PageStub from '../components/layout/PageStub';
import { useLanguage } from '../hooks/useLanguage';

// Temporary shell: the practice area is built in Phase 4.
export default function Practice() {
  const { t } = useLanguage();
  return (
    <PageStub title={t('practicePageTitle')}>
      <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">{t('comingSoon')}</span>
    </PageStub>
  );
}

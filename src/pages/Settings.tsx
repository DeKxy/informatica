import PageStub from '../components/layout/PageStub';
import { useLanguage } from '../hooks/useLanguage';

// Temporary shell: settings (language, progress management) are built in Phase 4.
export default function Settings() {
  const { t } = useLanguage();
  return (
    <PageStub title={t('settingsPageTitle')}>
      <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">{t('comingSoon')}</span>
    </PageStub>
  );
}

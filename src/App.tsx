import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import LanguageProvider from './i18n/LanguageProvider';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
const ModulePage = lazy(() => import('./pages/Module'));
const TopicPage = lazy(() => import('./pages/Topic'));
import Practice from './pages/Practice';
import PracticeModule from './pages/PracticeModule';
import Settings from './pages/Settings';

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:moduleSlug" element={<ModulePage />} />
          <Route path="learn/:moduleSlug/:topicId" element={<TopicPage />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/:moduleSlug" element={<PracticeModule />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

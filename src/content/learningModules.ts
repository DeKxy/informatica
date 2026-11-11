import type { Language } from '../i18n/translations';
import { historyLessons } from './historyCourse';

export type Localized = Record<Language, string>;
export type Topic = {
  id: string;
  title: Localized;
  description: Localized;
  minutes: number;
};
export type LearningModule = {
  slug: 'cybersecurity' | 'history-ai';
  title: Localized;
  description: Localized;
  topics: Topic[];
  accent: 'cyan' | 'purple';
};
export const localize = (value: Localized, lang: Language) => value[lang];

export const learningModules: LearningModule[] = [
  {
    slug: 'cybersecurity',
    title: { es: 'Ciberseguridad y OSINT', en: 'Cybersecurity and OSINT' },
    description: {
      es: 'Aprende los fundamentos de la ciberseguridad, comprende las amenazas digitales y descubre cómo utilizar información pública de forma responsable mediante técnicas de OSINT.',
      en: 'Learn the foundations of cybersecurity, understand digital threats, and discover how to use public information responsibly through OSINT techniques.',
    },
    accent: 'cyan',
    topics: [
      { id: 'cyber-introduction', title: { es: 'Introducción a la ciberseguridad', en: 'Introduction to Cybersecurity' }, description: { es: 'Qué se protege y por qué importa la seguridad digital.', en: 'What we protect and why digital security matters.' }, minutes: 10 },
      { id: 'cyber-threats', title: { es: 'Amenazas y vulnerabilidades', en: 'Threats and Vulnerabilities' }, description: { es: 'Distingue amenazas, vulnerabilidades y riesgos con ejemplos defensivos.', en: 'Distinguish threats, vulnerabilities and risks using defensive examples.' }, minutes: 12 },
      { id: 'cyber-protection', title: { es: 'Protección y buenas prácticas', en: 'Protection and Good Practices' }, description: { es: 'Contraseñas, autenticación, actualizaciones y copias de seguridad.', en: 'Passwords, authentication, updates and backups.' }, minutes: 12 },
      { id: 'cyber-networks', title: { es: 'Redes y seguridad', en: 'Networks and Security' }, description: { es: 'Conceptos de red y medidas para proteger las comunicaciones.', en: 'Network concepts and ways to protect communications.' }, minutes: 12 },
      { id: 'cyber-osint', title: { es: 'Introducción al OSINT', en: 'Introduction to OSINT' }, description: { es: 'Investigación con fuentes públicas, verificación y límites éticos.', en: 'Research with public sources, verification and ethical boundaries.' }, minutes: 10 },
      { id: 'cyber-privacy', title: { es: 'Privacidad y huella digital', en: 'Privacy and Digital Footprints' }, description: { es: 'Comprende la exposición pública y protege la información personal.', en: 'Understand public exposure and protect personal information.' }, minutes: 10 },
    ],
  },
  {
    slug: 'history-ai',
    title: { es: 'Historia de la Informática e IA', en: 'History of Computing and AI' },
    description: {
      es: 'Descubre cómo ha evolucionado la informática desde las primeras máquinas de cálculo hasta los sistemas modernos de inteligencia artificial.',
      en: 'Discover how computing evolved from the earliest calculating machines to modern artificial intelligence systems.',
    },
    accent: 'purple',
    topics: historyLessons.map(({ id, title, lead, minutes }) => ({ id, title, description: lead, minutes })),
  },
];

export const moduleDuration = (module: LearningModule) =>
  module.topics.reduce((total, topic) => total + topic.minutes, 0);

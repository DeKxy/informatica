export type Language = 'es' | 'en';

const es = {
  // Navigation
  navHome: 'Inicio',
  navLearn: 'Aprender',
  navPractice: 'Practicar',
  navSettings: 'Ajustes',
  navMain: 'Navegación principal',
  menu: 'Menú',
  langSwitch: 'Cambiar idioma',
  skipToContent: 'Saltar al contenido',

  // Hero
  heroKicker: 'Plataforma educativa · Ingeniería',
  heroTitle: 'Academia de Ciencias de la Computación y Tecnología',
  heroDesc: 'Una plataforma educativa rigurosa y minimalista dedicada al estudio profundo de la arquitectura de computadores, la ciberseguridad y la inteligencia artificial.',
  heroCTA: 'Explorar itinerarios',
  heroSecondaryCTA: 'Metodología',

  // Learning areas
  learnTitle: 'Áreas de aprendizaje',
  learnArea1Title: 'Historia de la informática y las telecomunicaciones',
  learnArea1Desc: 'De los pioneros de la computación y la teoría de la información a los protocolos de red que sostienen el mundo digital.',
  learnArea2Title: 'Ciberseguridad',
  learnArea2Desc: 'Principios de seguridad defensiva, criptografía aplicada y análisis de vulnerabilidades con un enfoque académico.',
  learnArea3Title: 'Inteligencia artificial',
  learnArea3Desc: 'Fundamentos matemáticos, redes neuronales y sistemas autónomos, de la teoría a la implementación práctica.',

  // Methodology
  methodTitle: 'Metodología',
  methodHeading: 'Fundamentos de nuestra enseñanza',
  method1: 'Teoría rigurosa',
  method2: 'Ejemplos documentados',
  method3: 'Actividades prácticas',
  method4: 'Evaluaciones académicas',

  // News
  newsTitle: 'Novedades',
  newsFeatured: 'Nuevo itinerario: Fundamentos de Arquitectura RISC-V',
  newsFeaturedLabel: 'Destacado',
  newsFeaturedDesc: 'Explora la arquitectura de procesadores abierta y su impacto en la computación moderna.',
  newsReadMore: 'Leer más',
  newsPlaceholder: 'Contenido de ejemplo',
  news1Title: 'Publicado el temario de la primera cohorte',
  news1Date: '28 Oct 2026',
  news2Title: 'Guía de instalación de herramientas de laboratorio',
  news2Date: '15 Oct 2026',
  news3Title: 'Revisión del plan de estudios de Ciberseguridad',
  news3Date: '02 Oct 2026',

  // Footer
  footerDesc: 'Una plataforma educativa rigurosa y minimalista dedicada al estudio profundo de la tecnología.',
  footerNav: 'Navegación',
  footerCredits: 'Tech Academy © 2026 — Plataforma educativa de desarrollo libre.',
  footerLang: 'Idioma',

  // Learn page (temporary until the roadmap is built)
  learnPageTitle: 'Itinerarios de Aprendizaje',
  learnPageSubtitle: 'Ruta interactiva de conocimiento tecnológico. Explora libremente cualquier área, módulo y lección.',
  lessonsTitle: 'Lecciones del módulo',
  duration: 'Duración',
  completed: 'Completado',
  startLearning: 'Iniciar lección',
  comingSoon: 'Próximamente',
  close: 'Cerrar',

  roadmapLabel: 'Hoja de ruta de aprendizaje',
  stageLabel: 'Etapa',
  moduleLabel: 'Módulo',
  stageCommonPath: 'Camino común',
  branchLabel: 'Rama',
  branchNote: 'Tras la Etapa 1 el camino se bifurca en dos ramas independientes: puedes seguir una, la otra o ambas.',
  freeExploration: 'Sin requisitos previos: abre cualquier módulo en cualquier momento.',
  selectModuleHint: 'Selecciona un módulo para ver sus lecciones.',
  specialization: 'Especialización',
  lessonsCount: 'lecciones',
  minutesShort: 'min',
  roadmapStartLabel: 'Inicio del recorrido',

  // Practice and settings pages (temporary)
  practicePageTitle: 'Práctica',
  settingsPageTitle: 'Ajustes',
} as const satisfies Record<string, string>;

export type TranslationKey = keyof typeof es;

// `en` must define exactly the same keys as `es`: a missing key is a compile error.
const en: Record<TranslationKey, string> = {
  navHome: 'Home',
  navLearn: 'Learn',
  navPractice: 'Practice',
  navSettings: 'Settings',
  navMain: 'Main navigation',
  menu: 'Menu',
  langSwitch: 'Change language',
  skipToContent: 'Skip to content',

  heroKicker: 'Educational platform · Engineering',
  heroTitle: 'Computer Science and Technology Academy',
  heroDesc: 'A rigorous, minimalist educational platform dedicated to the deep study of computer architecture, cybersecurity and artificial intelligence.',
  heroCTA: 'Explore pathways',
  heroSecondaryCTA: 'Methodology',

  learnTitle: 'Learning areas',
  learnArea1Title: 'History of computing and telecommunications',
  learnArea1Desc: 'From computing pioneers and information theory to the networking protocols that underpin the digital world.',
  learnArea2Title: 'Cybersecurity',
  learnArea2Desc: 'Principles of defensive security, applied cryptography and vulnerability analysis with an academic focus.',
  learnArea3Title: 'Artificial intelligence',
  learnArea3Desc: 'Mathematical foundations, neural networks and autonomous systems, from theory to practical implementation.',

  methodTitle: 'Methodology',
  methodHeading: 'The foundations of our teaching',
  method1: 'Rigorous theory',
  method2: 'Documented examples',
  method3: 'Practical activities',
  method4: 'Academic assessments',

  newsTitle: 'News',
  newsFeatured: 'New pathway: RISC-V Architecture Fundamentals',
  newsFeaturedLabel: 'Featured',
  newsFeaturedDesc: 'Explore open processor architecture and its impact on modern computing.',
  newsReadMore: 'Read more',
  newsPlaceholder: 'Sample content',
  news1Title: 'Syllabus of the first cohort published',
  news1Date: '28 Oct 2026',
  news2Title: 'Lab tooling installation guide',
  news2Date: '15 Oct 2026',
  news3Title: 'Review of the Cybersecurity curriculum',
  news3Date: '02 Oct 2026',

  footerDesc: 'A rigorous, minimalist educational platform dedicated to the deep study of technology.',
  footerNav: 'Navigation',
  footerCredits: 'Tech Academy © 2026 — Open-source educational platform.',
  footerLang: 'Language',

  learnPageTitle: 'Learning Roadmaps',
  learnPageSubtitle: 'Interactive technological knowledge path. Freely explore any area, module, and lesson.',
  lessonsTitle: 'Module Lessons',
  duration: 'Duration',
  completed: 'Completed',
  startLearning: 'Start lesson',
  comingSoon: 'Coming soon',
  close: 'Close',

  roadmapLabel: 'Learning roadmap',
  stageLabel: 'Stage',
  moduleLabel: 'Module',
  stageCommonPath: 'Common path',
  branchLabel: 'Branch',
  branchNote: 'After Stage 1 the path splits into two independent branches: follow one, the other, or both.',
  freeExploration: 'No prerequisites: open any module at any time.',
  selectModuleHint: 'Select a module to see its lessons.',
  specialization: 'Specialization',
  lessonsCount: 'lessons',
  minutesShort: 'min',
  roadmapStartLabel: 'Start of the journey',

  practicePageTitle: 'Practice',
  settingsPageTitle: 'Settings',
};

export const translations: Record<Language, Record<TranslationKey, string>> = { es, en };

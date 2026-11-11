import { Link } from 'react-router';
import { milestones } from '../../content/cyberCourse';
import { setTopicCompleted, useCompletedTopics } from '../../features/learning/progress';
import { useLanguage } from '../../hooks/useLanguage';
import { ExposureActivity, MetadataChallenge, PhishingChallenge, PrivacyShield, SearchBuilder } from './Challenges';
import { IntelligenceCycle, ProfileExplorer, Section, StravaCaseStudy, ToolsExplorer } from './Explorers';
import CourseNav from './CourseNav';
import { CiaCards, OsintFlow } from './Explorers';

function RoomComplete({ id }: { id: 'room-cyber' | 'room-osint' }) {
  const { lang } = useLanguage();
  const done = useCompletedTopics().includes(id);
  return <button type="button" aria-pressed={done} onClick={() => setTopicCompleted(id, !done)} className={`neo-button px-5 py-3 text-black ${done ? 'bg-green-500' : 'bg-white'}`}>
    {done ? (lang === 'es' ? '✓ Sala completada' : '✓ Room completed') : (lang === 'es' ? 'Marcar sala como completada' : 'Mark room complete')}
  </button>;
}

const sources = [
  { title: 'INCIBE · Phishing', url: 'https://www.incibe.es/aprendeciberseguridad/phishing' },
  { title: 'INCIBE · Copias 3-2-1', url: 'https://www.incibe.es/sites/default/files/contenidos/guias/guia-copias-de-seguridad.pdf' },
  { title: 'Bellingcat · Investigation Toolkit', url: 'https://bellingcat.gitbook.io/toolkit' },
  { title: 'OSINT Framework', url: 'https://osintframework.com/' },
  { title: 'Have I Been Pwned · About', url: 'https://haveibeenpwned.com/About' },
  { title: 'Le Monde · StravaLeaks 2024', url: 'https://www.lemonde.fr/en/france/article/2024/10/27/how-emmanuel-macron-can-be-tracked-watch-the-first-episode-of-stravaleaks_6730708_7.html' },
  { title: 'Le Monde · Charles de Gaulle 2026', url: 'https://www.lemonde.fr/en/international/article/2026/03/20/stravaleaks-france-s-aircraft-carrier-located-in-real-time-by-le-monde-through-fitness-app_6751640_4.html' },
];

export default function CyberCourse() {
  const { lang } = useLanguage();
  const completed = useCompletedTopics();
  const count = milestones.filter((id) => completed.includes(id)).length;
  return <article className="course-page-enter max-w-7xl mx-auto px-6 py-12 md:py-16">
    <Link to="/learn" className="text-cyan-300 font-bold hover:underline">← Learn</Link>
    <header className="mt-8 mb-10">
      <p className="font-mono text-sm uppercase tracking-widest text-cyan-300 font-bold mb-3">{lang === 'es' ? 'Módulo · 2 salas' : 'Module · 2 rooms'}</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">{lang === 'es' ? 'Ciberseguridad y OSINT' : 'Cybersecurity and OSINT'}</h1>
      <p className="text-lg text-slate-300 max-w-3xl">{lang === 'es' ? 'Aprende a reconocer riesgos digitales, investigar información pública de forma responsable y proteger tu privacidad.' : 'Learn to recognise digital risks, research public information responsibly and protect your privacy.'}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 font-mono text-xs font-bold text-slate-300"><span>◷ ~90 min</span><span>02 {lang === 'es' ? 'salas' : 'rooms'}</span><span>07 {lang === 'es' ? 'hitos de progreso' : 'progress milestones'}</span></div>
      <div className="neo-card border-cyan-500 p-5 mt-6 max-w-3xl">
        <div className="flex justify-between gap-4 font-mono font-bold mb-3"><span>{lang === 'es' ? 'Progreso del módulo' : 'Module progress'}</span><span>{count}/{milestones.length}</span></div>
        <div className="h-3 rounded-full bg-slate-950 overflow-hidden" role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={milestones.length} aria-label={lang === 'es' ? 'Progreso del módulo' : 'Module progress'}><div className="h-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${count / milestones.length * 100}%` }} /></div>
        <p className="text-sm text-slate-300 mt-3">{lang === 'es' ? 'Dos salas y cinco actividades. Puedes explorar todo libremente.' : 'Two rooms and five activities. Explore everything freely.'}</p>
      </div>
    </header>
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 items-start">
    <CourseNav />
    <div className="min-w-0 space-y-14 md:space-y-16">
      <Section id="room-cyber" eyebrow={lang === 'es' ? 'Sala 01 / Fundamentos' : 'Room 01 / Foundations'} title={lang === 'es' ? 'Introducción a la ciberseguridad' : 'Introduction to Cybersecurity'}>
        <p className="text-lg text-slate-200 max-w-4xl leading-relaxed">{lang === 'es' ? 'La ciberseguridad reúne técnicas y buenas prácticas para proteger sistemas, redes, dispositivos y datos frente al acceso no autorizado, el robo, los daños o la interrupción.' : 'Cybersecurity is the set of techniques and good practices used to protect systems, networks, devices and data from unauthorised access, theft, damage or disruption.'}</p>
        <p className="text-slate-300">{lang === 'es' ? 'La tríada CIA resume tres objetivos. Selecciona una tarjeta para ver un ejemplo y una defensa.' : 'The CIA triad summarises three goals. Select a card for an example and a defence.'}</p>
        <div id="cia-triad" className="scroll-mt-24"><CiaCards /></div>
      </Section>

      <Section id="threats" eyebrow={lang === 'es' ? 'Sala 01 / Riesgos' : 'Room 01 / Risks'} title={lang === 'es' ? 'Amenazas habituales' : 'Common Threats'}>
        <p className="text-slate-300">{lang === 'es' ? 'Elige una amenaza para ver su perfil completo.' : 'Choose a threat to view its complete profile.'}</p>
        <ProfileExplorer kind="threats" />
      </Section>

      <Section id="phishing-challenge" challenge eyebrow={lang === 'es' ? 'Reto 01 / Reconocer señales' : 'Challenge 01 / Spot the signs'} title={lang === 'es' ? '¿Phishing o legítimo?' : 'Phishing or Legitimate?'}>
        <p className="text-slate-300">{lang === 'es' ? 'Analiza cinco mensajes simulados. La ausencia de señales sospechosas no demuestra por sí sola que un correo real sea auténtico.' : 'Analyse five simulated messages. The absence of warning signs alone does not prove a real email is authentic.'}</p>
        <PhishingChallenge />
      </Section>

      <div className="neo-card border-cyan-500 p-6 md:p-8 bg-cyan-950/30">
        <p className="font-mono text-cyan-300 text-xs font-bold tracking-widest mb-3">{lang === 'es' ? 'SIGUIENTE ETAPA' : 'NEXT STAGE'}</p>
        <p className="text-2xl md:text-3xl font-bold max-w-xl mb-5">{lang === 'es' ? 'Ya conoces la amenaza. Ahora descubre cómo se encuentra la información.' : 'You know the threat. Now learn how information is found.'}</p>
        <RoomComplete id="room-cyber" />
        <h2 className="text-2xl font-bold mt-7 mb-3">{lang === 'es' ? 'De la seguridad a la información pública' : 'From security to public information'}</h2>
        <p className="text-slate-200 leading-relaxed mb-6">{lang === 'es' ? 'Antes de intentar engañar a alguien, un delincuente puede recopilar información publicada sobre esa persona o su organización. Comprender ese riesgo nos ayuda a reducir exposición y verificar mejor las solicitudes. Esa es la conexión con OSINT.' : 'Before deceiving someone, a criminal may gather published information about a person or organisation. Understanding that risk helps us reduce exposure and verify requests. That is where OSINT becomes relevant.'}</p>
        <a href="#room-osint" className="neo-button inline-block bg-cyan-400 text-black px-6 py-3">{lang === 'es' ? 'Continuar a la sala 2' : 'Continue to Room 2'} →</a>
      </div>

      <Section id="room-osint" eyebrow={lang === 'es' ? 'Sala 02 / Investigación responsable' : 'Room 02 / Responsible research'} title={lang === 'es' ? 'OSINT · Inteligencia de fuentes abiertas' : 'OSINT · Open Source Intelligence'}>
        <p className="text-lg text-slate-200 leading-relaxed max-w-3xl">{lang === 'es' ? 'OSINT consiste en recopilar, filtrar y analizar información accesible públicamente para convertir datos sin elaborar en conocimiento útil.' : 'OSINT is the collection, filtering and analysis of publicly accessible information to turn raw data into useful intelligence.'}</p>
        <p className="text-slate-300 leading-relaxed max-w-3xl">{lang === 'es' ? 'Lo emplean periodistas, equipos de seguridad, fuerzas del orden e investigadores. Los mismos datos también pueden usarse indebidamente.' : 'Journalists, security teams, law enforcement and researchers use it. The same information can also be misused.'}</p>
        <p className="font-mono text-cyan-200 font-bold">{lang === 'es' ? 'OSINT ≠ vulnerar sistemas' : 'OSINT ≠ hacking systems'}</p>
        <OsintFlow />
        <p className="border-l-4 border-green-500 pl-5 text-green-200 font-bold">{lang === 'es' ? 'Que algo sea público no significa que su uso sea ético o legalmente ilimitado. Respeta la privacidad, minimiza datos y trabaja con autorización.' : 'Publicly available does not mean ethically or legally unrestricted. Respect privacy, minimise data and work with authorisation.'}</p>
      </Section>

      <Section id="intelligence-cycle" eyebrow={lang === 'es' ? 'Sala 02 / Método' : 'Room 02 / Method'} title={lang === 'es' ? 'Ciclo de inteligencia' : 'Intelligence Cycle'}><IntelligenceCycle /></Section>
      <Section id="strava-case" eyebrow={lang === 'es' ? 'Sala 02 / Caso de estudio' : 'Room 02 / Case study'} title={lang === 'es' ? 'Strava y la exposición de ubicaciones' : 'Strava and Location Exposure'}>
        <p className="text-slate-300">{lang === 'es' ? 'Una aplicación de actividad física puede publicar rutas GPS. Estos casos muestran que la información visible bastó para inferir patrones sensibles, sin necesidad de vulnerar el servicio.' : 'A fitness app can publish GPS routes. These cases show that visible information was enough to infer sensitive patterns without breaching the service.'}</p><StravaCaseStudy />
      </Section>
      <Section id="osint-tools" eyebrow={lang === 'es' ? 'Sala 02 / Herramientas' : 'Room 02 / Tools'} title={lang === 'es' ? 'Herramientas OSINT' : 'OSINT Tools'}><ToolsExplorer /></Section>
      <Section id="search-challenge" challenge eyebrow={lang === 'es' ? 'Reto 02 / Sintaxis segura' : 'Challenge 02 / Safe syntax'} title={lang === 'es' ? 'Constructor de operadores' : 'Search Operator Builder'}><SearchBuilder /></Section>
      <Section id="metadata-challenge" challenge eyebrow={lang === 'es' ? 'Reto 03 / Datos ocultos' : 'Challenge 03 / Hidden data'} title={lang === 'es' ? 'Metadatos' : 'Metadata'}><MetadataChallenge /></Section>
      <Section eyebrow={lang === 'es' ? 'Sala 02 / Riesgo combinado' : 'Room 02 / Combined risk'} title={lang === 'es' ? 'Cómo se combinan los datos públicos' : 'How Public Data Can Be Combined'}>
        <ol className="grid md:grid-cols-5 gap-3">{[
          lang === 'es' ? 'Información pública de una organización' : 'Public organisation information',
          lang === 'es' ? 'Patrones visibles de correo' : 'Visible email patterns',
          lang === 'es' ? 'Ofertas de empleo y tecnologías' : 'Job listings and technologies',
          lang === 'es' ? 'Exposición previa en filtraciones' : 'Past breach exposure',
          lang === 'es' ? 'Engaños más creíbles' : 'More credible deception',
        ].map((step, index) => <li key={step} className="neo-card p-4"><span className="font-mono text-cyan-300 text-xs font-bold">0{index + 1}</span><p className="mt-2 font-medium">{step}</p></li>)}</ol>
        <p className="text-slate-300">{lang === 'es' ? 'Objetivo defensivo: comprender que datos aislados aparentemente inocuos pueden formar un perfil más revelador. Evita publicar detalles innecesarios y confirma las solicitudes por canales conocidos.' : 'Defensive goal: understand that seemingly harmless isolated facts can form a revealing profile. Avoid unnecessary publication and confirm requests through known channels.'}</p>
      </Section>
      <Section id="exposure-activity" challenge eyebrow={lang === 'es' ? 'Reto 04 / Autoconocimiento' : 'Challenge 04 / Self-awareness'} title={lang === 'es' ? 'Mide tu exposición' : 'Measure Your Exposure'}><ExposureActivity /></Section>
      <Section id="privacy-shield" eyebrow={lang === 'es' ? 'Sala 02 / Acción protectora' : 'Room 02 / Protective action'} title={lang === 'es' ? 'Activa tu escudo' : 'Activate Your Shield'}><PrivacyShield /></Section>
      <div className="neo-card border-green-500 p-6 md:p-8"><h2 className="text-2xl font-bold mb-3">{lang === 'es' ? 'Cierre del módulo' : 'Module wrap-up'}</h2><p className="text-slate-300 mb-5">{lang === 'es' ? 'Reconoce amenazas, verifica mensajes, examina información pública con criterio y reduce la exposición innecesaria.' : 'Recognise threats, verify messages, assess public information carefully and reduce unnecessary exposure.'}</p><RoomComplete id="room-osint" /></div>
      <Section id="sources" eyebrow={lang === 'es' ? 'Referencias' : 'References'} title={lang === 'es' ? 'Fuentes y lecturas adicionales' : 'Sources and Further Reading'}>
        <ul className="grid sm:grid-cols-2 gap-3">{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="neo-card block p-4 hover:border-cyan-400 font-medium">{source.title} <span aria-hidden="true" className="text-cyan-300">↗</span></a></li>)}</ul>
      </Section>
    </div>
    </div>
  </article>;
}

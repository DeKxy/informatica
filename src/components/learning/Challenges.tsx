import { useState } from 'react';
import { exposureHabits, metadataFields, phishingScenarios, shieldMeasures } from '../../content/cyberCourse';
import { localize } from '../../content/learningModules';
import { setTopicCompleted, useCompletedTopics } from '../../features/learning/progress';
import { useLanguage } from '../../hooks/useLanguage';

export function PhishingChallenge() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scenario = phishingScenarios[index];
  const choose = (value: boolean) => {
    if (answer !== null) return;
    setAnswer(value);
    if (value === scenario.phishing) setScore((current) => current + 1);
  };
  const next = () => {
    if (index === phishingScenarios.length - 1) {
      setFinished(true);
      setTopicCompleted('challenge-phishing', true);
    } else {
      setIndex((current) => current + 1);
      setAnswer(null);
    }
  };
  const retry = () => { setIndex(0); setAnswer(null); setScore(0); setFinished(false); };
  return <div className="neo-card p-5 md:p-7">
    {finished ? <div aria-live="polite"><p className="text-3xl font-bold mb-3">{lang === 'es' ? 'Puntuación' : 'Score'}: {score}/5</p><p className="text-slate-300 mb-5">{lang === 'es' ? 'Comprueba siempre el contexto y la dirección real del remitente.' : 'Always check context and the sender’s real address.'}</p><button type="button" onClick={retry} className="neo-button bg-cyan-400 text-black px-5 py-3">{lang === 'es' ? 'Reintentar' : 'Retry'}</button></div> : <>
      <div className="flex justify-between gap-3 font-mono text-xs text-cyan-300 mb-3"><span>{index + 1} / {phishingScenarios.length}</span><span>{lang === 'es' ? 'Mensaje simulado' : 'Simulated message'}</span></div>
      <div className="h-2 rounded-full bg-slate-950 overflow-hidden mb-5" aria-hidden="true"><div className="h-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${(index + 1) / phishingScenarios.length * 100}%` }} /></div>
      <div className="rounded-xl border-2 border-slate-600 bg-slate-950 p-5 space-y-2 mb-5 break-words max-w-2xl"><p><strong>{lang === 'es' ? 'De' : 'From'}:</strong> {scenario.from}</p><p><strong>{lang === 'es' ? 'Asunto' : 'Subject'}:</strong> {scenario.subject}</p><p className="pt-3 border-t border-slate-700">{scenario.body}</p></div>
      <p className="text-slate-300 my-4">{lang === 'es' ? '¿Qué indicios encuentras en el mensaje?' : 'What clues do you find in this message?'}</p>
      <div className="flex flex-wrap gap-3 mb-4"><button type="button" disabled={answer !== null} onClick={() => choose(true)} className={`neo-button px-4 py-2 disabled:opacity-75 ${answer === true ? 'bg-cyan-400 text-black' : 'bg-slate-700 text-white'}`}>{lang === 'es' ? 'Es phishing' : 'It is phishing'}</button><button type="button" disabled={answer !== null} onClick={() => choose(false)} className={`neo-button px-4 py-2 disabled:opacity-75 ${answer === false ? 'bg-cyan-400 text-black' : 'bg-slate-700 text-white'}`}>{lang === 'es' ? 'Es legítimo' : 'It is legitimate'}</button></div>
      {answer !== null && <div role="status" className="course-feedback border-l-4 border-cyan-400 bg-cyan-950/30 p-4 mb-4"><strong>{answer === scenario.phishing ? (lang === 'es' ? '✓ Correcto.' : '✓ Correct.') : (lang === 'es' ? '↺ Incorrecto.' : '↺ Incorrect.')}</strong> {localize(scenario.explanation, lang)}</div>}
      {answer !== null && <button type="button" onClick={next} className="neo-button bg-green-500 text-black px-5 py-2">{lang === 'es' ? 'Siguiente' : 'Next'} →</button>}
    </>}
  </div>;
}

export function SearchBuilder() {
  const { lang } = useLanguage();
  const [domain, setDomain] = useState('example.com');
  const [fileType, setFileType] = useState('pdf');
  const [keyword, setKeyword] = useState('public-report');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const validDomain = /^(?:[a-z0-9-]+\.)*example\.com$/i.test(domain.trim());
  const validKeyword = keyword.trim().length > 0 && keyword.length <= 60;
  const query = validDomain && validKeyword
    ? `site:${domain.trim().toLowerCase()}${fileType === 'any' ? '' : ` filetype:${fileType}`} "${keyword.trim().replace(/"/g, '')}"`
    : null;
  return <form className="neo-card p-5 md:p-7" onSubmit={(event) => { event.preventDefault(); if (query) { setGenerated(true); setTopicCompleted('challenge-search', true); } }}>
    <p className="text-slate-300 mb-5">{lang === 'es' ? 'Construye una consulta de ejemplo. El dominio debe ser example.com o un subdominio ficticio suyo. La consulta no ejecuta ninguna búsqueda.' : 'Build an example query. Use example.com or a fictional subdomain. The query does not run a search.'}</p>
    <div className="grid sm:grid-cols-3 gap-4">
      <label className="font-bold">{lang === 'es' ? 'Dominio' : 'Domain'}<input value={domain} onChange={(event) => { setDomain(event.target.value); setGenerated(false); setCopied(false); }} className="block w-full mt-2 rounded-lg border-2 border-slate-500 bg-slate-950 p-3" aria-invalid={!validDomain} /></label>
      <label className="font-bold">{lang === 'es' ? 'Tipo de archivo' : 'File type'}<select value={fileType} onChange={(event) => { setFileType(event.target.value); setGenerated(false); setCopied(false); }} className="block w-full mt-2 rounded-lg border-2 border-slate-500 bg-slate-950 p-3">{['any', 'pdf', 'xlsx', 'docx', 'txt'].map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
      <label className="font-bold">{lang === 'es' ? 'Palabra clave' : 'Keyword'}<input value={keyword} maxLength={60} onChange={(event) => { setKeyword(event.target.value); setGenerated(false); setCopied(false); }} className="block w-full mt-2 rounded-lg border-2 border-slate-500 bg-slate-950 p-3" aria-invalid={!validKeyword} /></label>
    </div>
    <div className="mt-5 rounded-xl border-2 border-cyan-500 bg-slate-950 p-4"><p className="font-mono text-xs text-cyan-300 mb-2">{lang === 'es' ? 'SALIDA · CONSULTA DE EJEMPLO' : 'OUTPUT · EXAMPLE QUERY'}</p><code className="block text-sm text-white break-all" aria-live="polite">{query ?? (lang === 'es' ? 'Usa un dominio de ejemplo y una palabra clave.' : 'Use an example domain and a keyword.')}</code></div>
    <div className="flex flex-wrap gap-3 mt-5"><button type="submit" disabled={!query} className="neo-button bg-cyan-400 text-black px-5 py-3 disabled:opacity-50">{lang === 'es' ? 'Generar consulta' : 'Generate query'}</button><button type="button" disabled={!query} onClick={async () => { if (!query) return; try { await navigator.clipboard.writeText(query); setCopied(true); } catch { setCopied(false); } }} className="neo-button bg-white text-black px-5 py-3 disabled:opacity-50">{lang === 'es' ? 'Copiar' : 'Copy'}</button><button type="button" onClick={() => { setDomain('example.com'); setFileType('pdf'); setKeyword('public-report'); setGenerated(false); setCopied(false); }} className="neo-button bg-slate-700 text-white px-5 py-3">{lang === 'es' ? 'Restablecer' : 'Reset'}</button></div>
    {generated && <p role="status" className="text-green-300 font-bold mt-4">{lang === 'es' ? 'Sintaxis generada. Actividad completada.' : 'Syntax generated. Activity completed.'}</p>}
    {copied && <p role="status" className="text-green-300 font-bold mt-3">{lang === 'es' ? 'Consulta copiada.' : 'Query copied.'}</p>}
    <dl className="grid sm:grid-cols-3 gap-3 mt-6 text-sm">{[['site:', lang === 'es' ? 'Limita la búsqueda a un dominio.' : 'Limits results to a domain.'], ['filetype:', lang === 'es' ? 'Filtra por formato de archivo.' : 'Filters by file format.'], ['"…"', lang === 'es' ? 'Busca la frase exacta.' : 'Searches the exact phrase.']].map(([operator, description]) => <div key={operator} className="border-t-2 border-slate-600 pt-3"><dt className="font-mono text-cyan-300 font-bold">{operator}</dt><dd className="text-slate-300 mt-1">{description}</dd></div>)}</dl>
    <p className="text-sm text-slate-400 mt-5">{lang === 'es' ? 'Usa operadores avanzados solo para investigación legítima y datos que estés autorizado a examinar.' : 'Use advanced operators only for legitimate research and information you are authorised to examine.'}</p>
  </form>;
}

export function MetadataChallenge() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const toggle = (id: string) => { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); setFeedback(''); };
  const check = () => {
    if (selected.length === 0) { setFeedback(lang === 'es' ? 'Ningún campo seleccionado. Busca datos que revelen dónde, cuándo o quién.' : 'No fields selected. Look for where, when or who.'); return; }
    const correct = metadataFields.every((field) => selected.includes(field.id) === field.sensitive);
    setFeedback(correct
      ? (lang === 'es' ? 'Correcto. Fecha y hora pueden revelar hábitos, GPS ubicación y autor identidad.' : 'Correct. Date and time may reveal habits, GPS location and author identity.')
      : (lang === 'es' ? 'Algunas selecciones son incorrectas. Inténtalo de nuevo.' : 'Some selections are incorrect. Try again.'));
    if (correct) setTopicCompleted('challenge-metadata', true);
  };
  return <div className="neo-card p-5 md:p-7"><p className="text-slate-300 mb-5">{lang === 'es' ? 'Una foto publicada contiene estos metadatos. Selecciona todos los campos que puedan revelar información personal.' : 'A published photo contains this metadata. Select every field that may reveal personal information.'}</p>
    <p className="font-mono text-xs uppercase tracking-widest text-cyan-300 mb-3">{lang === 'es' ? 'Inspector de metadatos · fotografía simulada' : 'Metadata inspector · simulated photograph'}</p>
    <div className="grid sm:grid-cols-2 gap-3">{metadataFields.map((field) => <label key={field.id} className={`flex items-center gap-3 rounded-xl border-2 p-3 cursor-pointer transition-colors ${selected.includes(field.id) ? 'border-cyan-400 bg-cyan-950/30' : 'border-slate-600 hover:border-cyan-400'}`}><input type="checkbox" checked={selected.includes(field.id)} onChange={() => toggle(field.id)} className="size-5 accent-cyan-400" /><span><strong>{localize(field.name, lang)}</strong><span className="block text-sm text-slate-300">{field.value}</span>{feedback.startsWith(lang === 'es' ? 'Correcto.' : 'Correct.') && field.sensitive && <span className="block text-xs text-green-300 mt-1">{field.id === 'date' ? (lang === 'es' ? 'Puede revelar hábitos.' : 'May reveal habits.') : field.id === 'gps' ? (lang === 'es' ? 'Puede revelar ubicación.' : 'May reveal location.') : (lang === 'es' ? 'Puede revelar identidad.' : 'May reveal identity.')}</span>}</span></label>)}</div>
    <p className="font-mono text-sm text-cyan-300 mt-4">{selected.length} {lang === 'es' ? 'seleccionados' : 'selected'}</p>
    <div className="flex flex-wrap gap-3 mt-4"><button type="button" onClick={check} className="neo-button bg-cyan-400 text-black px-5 py-2">{lang === 'es' ? 'Comprobar' : 'Check'}</button><button type="button" onClick={() => { setSelected([]); setFeedback(''); }} className="neo-button bg-slate-700 text-white px-5 py-2">{lang === 'es' ? 'Reintentar' : 'Retry'}</button></div>
    {feedback && <p role="status" className="mt-4 font-medium">{feedback}</p>}
  </div>;
}

export function ExposureActivity() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  const level = selected.length <= 2 ? (lang === 'es' ? 'Exposición baja' : 'Low exposure') : selected.length <= 5 ? (lang === 'es' ? 'Exposición media' : 'Medium exposure') : (lang === 'es' ? 'Exposición alta' : 'High exposure');
  return <div className="neo-card p-5 md:p-7"><p className="text-slate-300 mb-5">{lang === 'es' ? 'Marca los hábitos que se aplican a ti. Esta selección solo vive en esta pantalla.' : 'Select habits that apply to you. These choices stay on this screen only.'}</p>
    <div className="grid sm:grid-cols-2 gap-3">{exposureHabits.map((item, index) => <label key={index} className={`flex gap-3 border-2 rounded-xl p-3 cursor-pointer transition-colors ${selected.includes(index) ? 'border-cyan-400 bg-cyan-950/30' : 'border-slate-600 hover:border-cyan-400'}`}><input type="checkbox" checked={selected.includes(index)} onChange={() => { setSelected((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index]); setSaved(false); }} className="size-5 shrink-0 accent-cyan-400" />{localize(item, lang)}</label>)}</div>
    <div className="mt-5" role="status"><p className="font-bold mb-2">{level} · {selected.length}/{exposureHabits.length}</p><div className="h-3 bg-slate-950 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${selected.length / exposureHabits.length * 100}%` }} /></div><p className="text-sm text-slate-300 mt-3">{lang === 'es' ? 'Es una reflexión orientativa, no una evaluación personal ni un diagnóstico.' : 'This is a reflection prompt, not a personal assessment or diagnosis.'}</p></div>
    <div className="flex flex-wrap gap-3 mt-5"><button type="button" onClick={() => { setSaved(true); setTopicCompleted('activity-exposure', true); }} className="neo-button bg-cyan-400 text-black px-5 py-2">{lang === 'es' ? 'Finalizar reflexión' : 'Finish reflection'}</button><button type="button" onClick={() => { setSelected([]); setSaved(false); }} className="neo-button bg-slate-700 text-white px-5 py-2">{lang === 'es' ? 'Reiniciar' : 'Reset'}</button></div>{saved && <p className="text-green-300 mt-3" role="status">{lang === 'es' ? 'Actividad completada. Tus respuestas no se han guardado.' : 'Activity completed. Your answers were not saved.'}</p>}
  </div>;
}

export function PrivacyShield() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<number[]>([]);
  const completed = useCompletedTopics().includes('activity-shield');
  return <div className="neo-card border-green-500 p-5 md:p-7"><p className="text-slate-300 mb-5">{lang === 'es' ? 'Elige medidas que quieres aplicar. Marca solo las que tengan sentido para tu situación.' : 'Choose measures you want to apply. Mark those relevant to your situation.'}</p>
    <div className="flex items-center gap-5 mb-5"><svg viewBox="0 0 80 96" className="size-20 shrink-0" aria-hidden="true"><defs><clipPath id="privacy-shield-clip"><path d="M40 4 72 16v28c0 23-11 36-32 48C19 80 8 67 8 44V16z" /></clipPath></defs><path d="M40 4 72 16v28c0 23-11 36-32 48C19 80 8 67 8 44V16z" fill="#0f172a" stroke="#22c55e" strokeWidth="4" /><rect x="0" y={96 - selected.length / shieldMeasures.length * 96} width="80" height={selected.length / shieldMeasures.length * 96} fill="#22c55e" clipPath="url(#privacy-shield-clip)" className="transition-all duration-300" /></svg><div className="grow"><p className="font-bold text-green-300 mb-2" role="status">{selected.length}/{shieldMeasures.length} {lang === 'es' ? 'medidas elegidas' : 'measures chosen'}</p><div className="h-3 bg-slate-950 rounded-full overflow-hidden"><div className="h-full bg-green-500 transition-[width] duration-300" style={{ width: `${selected.length / shieldMeasures.length * 100}%` }} /></div></div></div>
    <div className="grid sm:grid-cols-2 gap-3">{shieldMeasures.map((item, index) => <label key={index} className={`flex gap-3 border-2 rounded-xl p-3 cursor-pointer transition-colors ${selected.includes(index) ? 'border-green-400 bg-green-950/20' : 'border-slate-600 hover:border-green-400'}`}><input type="checkbox" checked={selected.includes(index)} onChange={() => setSelected((current) => current.includes(index) ? current.filter((value) => value !== index) : [...current, index])} className="size-5 shrink-0 accent-green-500" />{localize(item, lang)}</label>)}</div>
    {selected.length === shieldMeasures.length && <p className="text-green-300 font-bold mt-4" role="status">{lang === 'es' ? 'Escudo completo.' : 'Shield complete.'}</p>}
    <button type="button" disabled={selected.length === 0} onClick={() => setTopicCompleted('activity-shield', true)} className="neo-button bg-green-500 text-black px-5 py-3 mt-5 disabled:opacity-50">{completed ? (lang === 'es' ? '✓ Actividad completada' : '✓ Activity completed') : (lang === 'es' ? 'Guardar mi plan' : 'Save my plan')}</button>
    <p className="text-sm text-slate-400 mt-3">{lang === 'es' ? 'Solo se guarda que completaste la actividad, no las medidas elegidas.' : 'Only activity completion is saved, not your selections.'}</p>
  </div>;
}

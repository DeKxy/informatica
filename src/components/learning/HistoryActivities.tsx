import { useState } from 'react';
import type { HistoryActivity } from '../../content/historyCourse';
import { localize, type Localized } from '../../content/learningModules';
import { setTopicCompleted } from '../../features/learning/progress';
import { useLanguage } from '../../hooks/useLanguage';

const t = (es: string, en: string): Localized => ({ es, en });
const inputClass = 'w-full rounded-lg border-2 border-slate-500 bg-slate-950 px-3 py-2 text-white';
const actionClass = 'neo-button bg-purple-400 text-black px-5 py-2';

type Pair = { prompt: Localized; answer: string; explanation: Localized };
function MatchingChallenge({ lessonId, pairs, options, hintOnly = false, onComplete }: { lessonId: string; pairs: Pair[]; options: { id: string; label: Localized }[]; hintOnly?: boolean; onComplete?: () => void }) {
  const { lang } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const correct = pairs.every((pair, index) => answers[index] === pair.answer);
  const check = () => { setChecked(true); setAttempts((n) => n + 1); if (correct) { if (onComplete) onComplete(); else setTopicCompleted(`activity-${lessonId}`, true); } };
  return <div className="space-y-4"><div className="grid sm:grid-cols-2 gap-3">{pairs.map((pair, index) => <label key={index} className={`rounded-xl border-2 p-4 ${checked ? answers[index] === pair.answer ? 'border-green-500' : 'border-amber-400' : 'border-slate-600'}`}><strong className="block mb-2">{localize(pair.prompt, lang)}</strong><select className={inputClass} value={answers[index] ?? ''} onChange={(e) => { setAnswers({ ...answers, [index]: e.target.value }); setChecked(false); }}><option value="">{lang === 'es' ? 'Selecciona una opción' : 'Choose an option'}</option>{options.map((option) => <option key={option.id} value={option.id}>{localize(option.label, lang)}</option>)}</select>{checked && <p className="mt-2 text-sm">{answers[index] === pair.answer ? '✓ ' : '↺ '}{answers[index] === pair.answer || !hintOnly ? localize(pair.explanation, lang) : (lang === 'es' ? 'Pista: piensa en la funcion de esta pieza.' : 'Hint: think about this part’s function.')}{answers[index] !== pair.answer && attempts >= 2 && <span className="block text-amber-300">{lang === 'es' ? 'Pista: revisa la función principal, no solo el nombre.' : 'Hint: review the main function, not just the name.'}</span>}</p>}</label>)}</div><button type="button" className={actionClass} onClick={check}>{lang === 'es' ? 'Comprobar respuestas' : 'Check answers'}</button>{checked && <p role="status" className={correct ? 'text-green-300' : 'text-amber-300'}>{correct ? (lang === 'es' ? 'Actividad completada.' : 'Activity complete.') : (lang === 'es' ? 'Revisa las pistas e inténtalo de nuevo.' : 'Review the hints and try again.')}</p>}</div>;
}

type QuizQuestion = { prompt: Localized; options: Localized[]; accepted: number[]; explanation: Localized };
function ChoiceQuiz({ lessonId, questions, allowPartial = false, onComplete }: { lessonId: string; questions: QuizQuestion[]; allowPartial?: boolean; onComplete?: () => void }) {
  const { lang } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const complete = questions.every((q, i) => answers[i] !== undefined && (allowPartial || q.accepted.includes(answers[i])));
  const check = () => { setChecked(true); if (complete) { if (onComplete) onComplete(); else setTopicCompleted(`activity-${lessonId}`, true); } };
  return <div className="space-y-4">{questions.map((q, i) => <fieldset key={i} className="rounded-xl border-2 border-slate-600 p-4"><legend className="font-bold px-2">{i + 1}. {localize(q.prompt, lang)}</legend><div className="grid sm:grid-cols-2 gap-2">{q.options.map((option, j) => <label key={j} className={`flex items-center gap-2 rounded-lg border-2 p-3 cursor-pointer ${answers[i] === j ? 'border-purple-400 bg-purple-950/30' : 'border-slate-700'}`}><input type="radio" name={`${lessonId}-${i}`} checked={answers[i] === j} onChange={() => { setAnswers({ ...answers, [i]: j }); setChecked(false); }} className="accent-purple-400" />{localize(option, lang)}</label>)}</div>{checked && answers[i] !== undefined && <p className={`mt-3 text-sm ${q.accepted.includes(answers[i]) ? 'text-green-300' : 'text-amber-300'}`}>{q.accepted.includes(answers[i]) ? '✓' : '↺'} {localize(q.explanation, lang)}</p>}</fieldset>)}<button type="button" className={actionClass} onClick={check}>{lang === 'es' ? 'Revisar decisiones' : 'Review decisions'}</button>{checked && <p role="status" className={complete ? 'text-green-300' : 'text-amber-300'}>{complete ? (lang === 'es' ? 'Actividad completada.' : 'Activity complete.') : (lang === 'es' ? 'Completa o corrige las respuestas con ayuda de las explicaciones.' : 'Complete or correct answers using the explanations.')}</p>}</div>;
}

type OrderItem = { id: string; label: Localized; hint: Localized };
export function TimelineOrderChallenge({ title, items, progressId, onComplete }: { title: Localized; items: OrderItem[]; progressId?: string; onComplete?: () => void }) {
  const { lang } = useLanguage();
  const [order, setOrder] = useState(() => [...items].reverse());
  const [checked, setChecked] = useState(false);
  const correct = order.every((item, index) => item.id === items[index].id);
  const move = (index: number, direction: -1 | 1) => { const next = [...order]; [next[index], next[index + direction]] = [next[index + direction], next[index]]; setOrder(next); setChecked(false); };
  return <div className="neo-card p-5"><h3 className="text-xl font-bold mb-3">{localize(title, lang)}</h3><ol className="space-y-2">{order.map((item, index) => <li key={item.id} className={`flex items-center gap-3 rounded-xl border-2 p-3 ${checked && item.id !== items[index].id ? 'border-amber-400' : 'border-slate-600'}`}><span className="font-mono text-purple-300">{index + 1}</span><span className="grow">{localize(item.label, lang)}</span><button type="button" disabled={index === 0} aria-label={`${lang === 'es' ? 'Subir' : 'Move up'} ${localize(item.label, lang)}`} className="neo-button bg-slate-700 px-3 py-1 disabled:opacity-40" onClick={() => move(index, -1)}>↑</button><button type="button" disabled={index === order.length - 1} aria-label={`${lang === 'es' ? 'Bajar' : 'Move down'} ${localize(item.label, lang)}`} className="neo-button bg-slate-700 px-3 py-1 disabled:opacity-40" onClick={() => move(index, 1)}>↓</button></li>)}</ol><button type="button" className={`${actionClass} mt-4`} onClick={() => { setChecked(true); if (correct) { if (onComplete) onComplete(); if (progressId) setTopicCompleted(progressId, true); } }}>{lang === 'es' ? 'Comprobar orden' : 'Check order'}</button>{checked && <p role="status" className={`mt-3 ${correct ? 'text-green-300' : 'text-amber-300'}`}>{correct ? (lang === 'es' ? 'Cronología correcta.' : 'Chronology correct.') : (lang === 'es' ? 'Revisa los elementos marcados. Pista: ' : 'Review the marked items. Hint: ') + localize(order.find((item, i) => item.id !== items[i].id)?.hint ?? items[0].hint, lang)}</p>}</div>;
}

const enginePairs: Pair[] = [
  { prompt: t('Store / almacén', 'Store'), answer: 'memory', explanation: t('Conserva valores para operaciones posteriores.', 'It keeps values for later operations.') },
  { prompt: t('Mill / molino', 'Mill'), answer: 'cpu', explanation: t('Realiza operaciones sobre los valores.', 'It performs operations on values.') },
  { prompt: t('Tarjetas perforadas', 'Punched cards'), answer: 'input', explanation: t('Transportan instrucciones y entrada.', 'They carry instructions and input.') },
  { prompt: t('Impresora', 'Printer'), answer: 'output', explanation: t('Comunica resultados.', 'It communicates results.') },
];
const engineOptions = [{ id: 'memory', label: t('Memoria', 'Memory') }, { id: 'cpu', label: t('Procesador', 'Processor') }, { id: 'input', label: t('Entrada / programa', 'Input / program') }, { id: 'output', label: t('Salida', 'Output') }];
const protocolPairs: Pair[] = [
  { prompt: t('IP', 'IP'), answer: 'address', explanation: t('Direcciona paquetes en la red.', 'It addresses packets on the network.') },
  { prompt: t('DNS', 'DNS'), answer: 'names', explanation: t('Relaciona nombres y direcciones.', 'It maps names to addresses.') },
  { prompt: t('TCP', 'TCP'), answer: 'delivery', explanation: t('Coordina entrega fiable.', 'It coordinates reliable delivery.') },
  { prompt: t('HTTP', 'HTTP'), answer: 'web', explanation: t('Intercambia recursos Web.', 'It exchanges Web resources.') },
  { prompt: t('URL', 'URL'), answer: 'resource', explanation: t('Identifica un recurso.', 'It identifies a resource.') },
  { prompt: t('Web', 'Web'), answer: 'links', explanation: t('Conecta documentos y recursos.', 'It links documents and resources.') },
];
const protocolOptions = [{ id: 'address', label: t('Dirección de paquetes', 'Packet addressing') }, { id: 'names', label: t('Nombres a direcciones', 'Names to addresses') }, { id: 'delivery', label: t('Entrega fiable', 'Reliable delivery') }, { id: 'web', label: t('Intercambio de recursos', 'Resource exchange') }, { id: 'resource', label: t('Identificador de recurso', 'Resource identifier') }, { id: 'links', label: t('Sistema de recursos enlazados', 'Linked-resource system') }];
const neuralPairs: Pair[] = [
  { prompt: t('Datos', 'Data'), answer: 'examples', explanation: t('Ejemplos usados para aprender o evaluar.', 'Examples used for learning or evaluation.') },
  { prompt: t('Etiqueta', 'Label'), answer: 'target', explanation: t('Objetivo asociado a un ejemplo.', 'A target attached to an example.') },
  { prompt: t('Peso', 'Weight'), answer: 'parameter', explanation: t('Parámetro ajustable del modelo.', 'An adjustable model parameter.') },
  { prompt: t('Capa', 'Layer'), answer: 'transform', explanation: t('Etapa de transformación.', 'A transformation stage.') },
  { prompt: t('Entrenamiento', 'Training'), answer: 'adjust', explanation: t('Ajuste de parámetros.', 'Parameter adjustment.') },
  { prompt: t('Inferencia', 'Inference'), answer: 'predict', explanation: t('Uso del modelo en una entrada nueva.', 'Using the model for new input.') },
];
const neuralOptions = [{ id: 'examples', label: t('Ejemplos', 'Examples') }, { id: 'target', label: t('Objetivo', 'Target') }, { id: 'parameter', label: t('Parámetro', 'Parameter') }, { id: 'transform', label: t('Transformación', 'Transformation') }, { id: 'adjust', label: t('Ajustar', 'Adjust') }, { id: 'predict', label: t('Predecir', 'Predict') }];

function TuringRun({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const initial = ['1', '1', '0', '1', '0', '1', '0'];
  const [tape, setTape] = useState(initial);
  const [head, setHead] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState('');
  const finished = head === initial.length;
  const step = (write: string) => { if (finished) return; const expected = tape[head] === '1' ? '0' : '1'; if (write !== expected) { setMistakes(mistakes + 1); setFeedback(lang === 'es' ? 'Revisa el símbolo leído y aplica la regla de inversión.' : 'Read the current symbol and apply the flip rule.'); return; } const next = [...tape]; next[head] = write; setTape(next); setHead(head + 1); setFeedback(''); if (head + 1 === initial.length) setTopicCompleted(`activity-${lessonId}`, true); };
  return <div className="neo-card p-5"><p className="text-slate-300 mb-4">{lang === 'es' ? 'Regla didáctica: si lees 1, escribe 0; si lees 0, escribe 1. Después mueve el cabezal a la derecha. Estado q0 durante los pasos; qFin al terminar.' : 'Teaching rule: read 1 → write 0; read 0 → write 1. Then move right. State q0 during steps; qFinal when finished.'}</p><div className="flex flex-wrap gap-1 mb-4">{tape.map((symbol, i) => <span key={i} className={`size-10 flex items-center justify-center border-2 font-mono ${i === head ? 'border-amber-400' : 'border-slate-600'}`}>{symbol}</span>)}</div><p className="font-mono text-purple-300 mb-3">{lang === 'es' ? 'Paso' : 'Step'} {head}/{initial.length} · {finished ? 'qFin' : 'q0'} · {lang === 'es' ? 'símbolo' : 'symbol'}: {finished ? '—' : tape[head]}</p><div className="flex gap-2"><button type="button" disabled={finished} className={actionClass} onClick={() => step('0')}>{lang === 'es' ? 'Escribir 0 →' : 'Write 0 →'}</button><button type="button" disabled={finished} className={actionClass} onClick={() => step('1')}>{lang === 'es' ? 'Escribir 1 →' : 'Write 1 →'}</button></div>{feedback && <p role="status" className="text-amber-300 mt-3">{feedback}{mistakes >= 2 && <span className="block">{lang === 'es' ? 'Pista: 1 → 0; 0 → 1.' : 'Hint: 1 → 0; 0 → 1.'}</span>}</p>}{finished && <p role="status" className="text-green-300 mt-3">{lang === 'es' ? 'Cinta final: 0010101 · qFin. Actividad completada.' : 'Final tape: 0010101 · qFinal. Activity complete.'}</p>}<button type="button" className="text-purple-300 underline mt-4" onClick={() => { setTape(initial); setHead(0); setFeedback(''); }}>{lang === 'es' ? 'Reiniciar simulación' : 'Reset simulation'}</button></div>;
}

function NextToken({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<number[]>([]);
  const words = [['datos', 'data', 55], ['ejemplos', 'examples', 30], ['piedras', 'stones', 15]] as const;
  return <div className="neo-card p-5"><p className="font-mono text-purple-300 mb-4">{lang === 'es' ? 'La máquina aprende de …' : 'The machine learns from …'}</p><p className="text-slate-300 mb-4">{lang === 'es' ? 'Probabilidades inventadas para enseñar una distribución, no una predicción real. Explora todas las opciones.' : 'Fictitious probabilities illustrate a distribution, not a real prediction. Explore every option.'}</p><div className="grid sm:grid-cols-3 gap-3">{words.map((word, i) => <button type="button" key={i} onClick={() => { const next = [...new Set([...selected, i])]; setSelected(next); if (next.length === words.length) setTopicCompleted(`activity-${lessonId}`, true); }} className={`rounded-xl border-2 p-4 text-left ${selected.includes(i) ? 'border-purple-400 bg-purple-950/30' : 'border-slate-600'}`}><strong>{word[lang === 'es' ? 0 : 1]}</strong><span className="block mt-2 font-mono text-purple-300">{word[2]}%</span></button>)}</div><p className="mt-4 text-slate-300" role="status">{selected.length === 3 ? (lang === 'es' ? 'Actividad completada: varias continuaciones tienen probabilidad; la mayor no es una verdad garantizada.' : 'Activity complete: several continuations have probability; the highest is not guaranteed truth.') : (lang === 'es' ? `Opciones exploradas: ${selected.length}/3.` : `Options explored: ${selected.length}/3.`)}</p></div>;
}

function AnswerAudit({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const [classified, setClassified] = useState(false);
  const [source, setSource] = useState('');
  const [checked, setChecked] = useState(false);
  const claims = [
    { text: t('La Web se propuso en CERN en 1989.', 'The Web was proposed at CERN in 1989.'), status: 'supported', why: t('CERN documenta la propuesta.', 'CERN documents the proposal.') },
    { text: t('ARPANET adoptó TCP/IP en 1983.', 'ARPANET adopted TCP/IP in 1983.'), status: 'supported', why: t('La transición está documentada en historia de Internet.', 'The transition is documented in Internet history.') },
    { text: t('El Transformer se presentó en 2017.', 'The Transformer was introduced in 2017.'), status: 'supported', why: t('Puede verificarse en el artículo original.', 'This can be checked in the original paper.') },
    { text: t('El perfil NIST más reciente para IA generativa es de 2023.', 'The latest NIST generative-AI profile is from 2023.'), status: 'outdated', why: t('El perfil de IA generativa se publicó en 2024; “más reciente” requiere revisar la fecha.', 'The generative-AI profile was published in 2024; “latest” needs a date check.') },
    { text: t('UNESCO certificó que todos los modelos de IA son seguros en 2021.', 'UNESCO certified all AI models as safe in 2021.'), status: 'invented', why: t('La recomendación ética no certifica modelos individuales.', 'The ethics recommendation does not certify individual models.') },
  ];
  const options = [{ id: 'supported', label: t('Respaldada', 'Supported') }, { id: 'outdated', label: t('Desactualizada', 'Outdated') }, { id: 'invented', label: t('Inventada', 'Invented') }];
  return <div className="space-y-5"><MatchingChallenge lessonId={lessonId} pairs={claims.map((claim) => ({ prompt: claim.text, answer: claim.status, explanation: claim.why }))} options={options} onComplete={() => { setClassified(true); if (source === 'unesco') setTopicCompleted(`activity-${lessonId}`, true); }} /><label className="block font-bold">{lang === 'es' ? '¿Qué fuente consultarías para comprobar la afirmación sobre UNESCO?' : 'Which source would you consult to check the UNESCO claim?'}<select className={`${inputClass} block mt-2`} value={source} onChange={(e) => { setSource(e.target.value); setChecked(false); }}><option value="">{lang === 'es' ? 'Elige una fuente' : 'Choose a source'}</option><option value="forum">{lang === 'es' ? 'Un comentario anónimo' : 'An anonymous comment'}</option><option value="unesco">{lang === 'es' ? 'La recomendación oficial de UNESCO' : 'UNESCO’s official recommendation'}</option><option value="model">{lang === 'es' ? 'Otra respuesta del mismo modelo' : 'Another answer from the same model'}</option></select></label><button type="button" className={actionClass} onClick={() => { setChecked(true); if (classified && source === 'unesco') setTopicCompleted(`activity-${lessonId}`, true); }}>{lang === 'es' ? 'Comprobar fuente' : 'Check source'}</button>{checked && <p role="status" className={source === 'unesco' && classified ? 'text-green-300' : 'text-amber-300'}>{source === 'unesco' && classified ? (lang === 'es' ? 'Auditoría completa: contrasta siempre el texto original y su fecha.' : 'Audit complete: always inspect the original text and date.') : (lang === 'es' ? 'Clasifica las cinco afirmaciones y elige la fuente primaria pertinente.' : 'Classify all five claims and choose the relevant primary source.')}</p>}</div>;
}

function Deployment({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const dimensions = [t('Propósito y necesidad', 'Purpose and necessity'), t('Datos y privacidad', 'Data and privacy'), t('Sesgo y equidad', 'Bias and fairness'), t('Explicabilidad', 'Explainability'), t('Supervisión humana', 'Human oversight'), t('Apelación', 'Appeal mechanism'), t('Seguridad', 'Security')];
  const [selected, setSelected] = useState<number[]>([]);
  const [decision, setDecision] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const pass = selected.length >= 5 && decision !== '' && reason.trim().length >= 60;
  return <div className="neo-card p-5 space-y-4"><p>{lang === 'es' ? 'Una universidad propone IA para priorizar solicitudes de beca. Identifica dimensiones que revisarías y justifica tu decisión. No existe una postura única obligatoria.' : 'A university proposes AI to prioritise scholarship applications. Identify dimensions to review and justify your decision. No single position is required.'}</p><fieldset><legend className="font-bold mb-2">{lang === 'es' ? 'Dimensiones examinadas' : 'Dimensions examined'}</legend><div className="grid sm:grid-cols-2 gap-2">{dimensions.map((item, i) => <label key={i} className={`flex gap-2 rounded-lg border-2 p-3 ${selected.includes(i) ? 'border-purple-400' : 'border-slate-600'}`}><input type="checkbox" checked={selected.includes(i)} onChange={() => setSelected(selected.includes(i) ? selected.filter((v) => v !== i) : [...selected, i])} />{localize(item, lang)}</label>)}</div></fieldset><label className="block font-bold">{lang === 'es' ? 'Decisión provisional' : 'Provisional decision'}<select className={`${inputClass} mt-2`} value={decision} onChange={(e) => setDecision(e.target.value)}><option value="">{lang === 'es' ? 'Elige' : 'Choose'}</option><option value="yes">{lang === 'es' ? 'Desplegar con condiciones' : 'Deploy with conditions'}</option><option value="no">{lang === 'es' ? 'No desplegar todavía' : 'Do not deploy yet'}</option></select></label><label className="block font-bold">{lang === 'es' ? 'Justificación basada en riesgos, evidencia y revisión humana' : 'Reasoning based on risks, evidence and human review'}<textarea className={`${inputClass} mt-2 min-h-28`} value={reason} onChange={(e) => setReason(e.target.value)} /></label><button type="button" className={actionClass} onClick={() => { setSubmitted(true); if (pass) setTopicCompleted(`activity-${lessonId}`, true); }}>{lang === 'es' ? 'Evaluar argumento' : 'Evaluate argument'}</button>{submitted && <p role="status" className={pass ? 'text-green-300' : 'text-amber-300'}>{pass ? (lang === 'es' ? 'Argumento completo. Revisa también la calidad de la evidencia antes de una decisión real.' : 'Reasoning complete. Check evidence quality before a real decision.') : (lang === 'es' ? 'Incluye al menos cinco dimensiones, una decisión y una justificación de 60 caracteres. La evaluación verifica estructura, no la calidad factual.' : 'Include at least five dimensions, a decision and 60 characters of reasoning. This checks structure, not factual quality.')}</p>}</div>;
}

const cpuQuestions: QuizQuestion[] = [
  { prompt: t('¿Qué ocurre primero en un ciclo de instrucción?', 'What happens first in an instruction cycle?'), options: [t('Buscar en memoria', 'Fetch from memory'), t('Ejecutar', 'Execute'), t('Mostrar salida', 'Show output')], accepted: [0], explanation: t('La CPU recupera la instrucción antes de interpretarla.', 'The CPU fetches the instruction before decoding it.') },
  { prompt: t('¿Dónde reside la instrucción en un programa almacenado?', 'Where is the instruction in a stored program?'), options: [t('Memoria', 'Memory'), t('Solo cableado físico', 'Only physical wiring'), t('Pantalla', 'Screen')], accepted: [0], explanation: t('Datos e instrucciones pueden residir en memoria.', 'Data and instructions can reside in memory.') },
  { prompt: t('Después de decodificar, la CPU…', 'After decoding, the CPU…'), options: [t('ejecuta la operación', 'executes the operation'), t('apaga la memoria', 'turns off memory'), t('inventa una instrucción', 'invents an instruction')], accepted: [0], explanation: t('La ejecución aplica la operación; puede interactuar con entrada/salida.', 'Execution applies the operation and may involve input/output.') },
  { prompt: t('¿Qué función cumple entrada/salida?', 'What is the role of input/output?'), options: [t('Intercambiar información con el exterior', 'Exchange information with the outside'), t('Guardar todas las instrucciones', 'Store all instructions'), t('Decodificar dentro de la CPU', 'Decode inside the CPU')], accepted: [0], explanation: t('Los dispositivos de entrada/salida conectan la máquina con datos y resultados externos.', 'Input/output devices connect the machine to external data and results.') },
];
const innovationTypes = [t('Innovación técnica', 'Technical innovation'), t('Innovación de interfaz', 'Interface innovation'), t('Mercado y ecosistema', 'Market and ecosystem')];
const innovationQuestions: QuizQuestion[] = [
  { prompt: t('Altair 8800: ¿qué dimensión destacó?', 'Altair 8800: which dimension stood out?'), options: innovationTypes, accepted: [0, 2], explanation: t('Fue una máquina concreta y catalizó una comunidad de aficionados; ambas categorías son defendibles.', 'It was a machine and catalysed a hobbyist community; both categories are defensible.') },
  { prompt: t('Xerox Alto: ¿qué dimensión destacó?', 'Xerox Alto: which dimension stood out?'), options: innovationTypes, accepted: [0, 1], explanation: t('Combinó hardware, GUI, ratón y red; fue investigación de interfaz y técnica, no un producto masivo.', 'It combined hardware, GUI, mouse and network; it was interface and technical research, not a mass-market product.') },
  { prompt: t('Apple II: ¿qué dimensión destacó?', 'Apple II: which dimension stood out?'), options: innovationTypes, accepted: [0, 2], explanation: t('Gráficos, expansión y alcance comercial conectaron técnica y mercado.', 'Graphics, expansion and commercial reach connected technology and market.') },
  { prompt: t('IBM PC: ¿qué dimensión destacó?', 'IBM PC: which dimension stood out?'), options: innovationTypes, accepted: [2], explanation: t('Su adopción empresarial y compatibles transformaron el ecosistema.', 'Business adoption and compatibles reshaped the ecosystem.') },
  { prompt: t('Lisa: ¿qué dimensión destacó?', 'Lisa: which dimension stood out?'), options: innovationTypes, accepted: [0, 1], explanation: t('Llevó conceptos GUI a un producto comercial con decisiones técnicas y de interfaz.', 'It brought GUI ideas to a commercial product with technical and interface decisions.') },
  { prompt: t('Macintosh: ¿qué dimensión destacó?', 'Macintosh: which dimension stood out?'), options: innovationTypes, accepted: [1, 2], explanation: t('Difundió la GUI mediante un producto y una estrategia de mercado; no inventó todos sus elementos.', 'It spread the GUI through a product and market strategy; it did not invent every element.') },
];
const symbolicQuestions: QuizQuestion[] = [
  { prompt: t('ELIZA genera una pregunta a partir de un patrón.', 'ELIZA generates a question from a pattern.'), options: [t('Reglas', 'Rules'), t('Aprendizaje profundo', 'Deep learning'), t('Evidencia insuficiente', 'Insufficient evidence')], accepted: [0], explanation: t('ELIZA aplicaba reglas de sustitución.', 'ELIZA applied substitution rules.') },
  { prompt: t('Un programa explora miles de jugadas de ajedrez.', 'A program explores thousands of chess moves.'), options: [t('Búsqueda', 'Search'), t('Entrenamiento supervisado', 'Supervised training'), t('Comprensión humana', 'Human understanding')], accepted: [0], explanation: t('Explorar alternativas es búsqueda; puede combinarse con otros métodos.', 'Exploring alternatives is search; it can be combined with other methods.') },
  { prompt: t('Un clasificador ajusta parámetros con ejemplos etiquetados.', 'A classifier adjusts parameters from labelled examples.'), options: [t('Aprendizaje', 'Learning'), t('Solo reglas fijas', 'Only fixed rules'), t('Prueba de conciencia', 'Proof of consciousness')], accepted: [0], explanation: t('Ajustar parámetros desde datos caracteriza el aprendizaje.', 'Adjusting parameters from data characterises learning.') },
  { prompt: t('Un sistema responde con soltura, pero no conocemos su mecanismo.', 'A system responds fluently, but we do not know its mechanism.'), options: [t('Reglas con certeza', 'Definitely rules'), t('Aprendizaje con certeza', 'Definitely learning'), t('Evidencia insuficiente', 'Insufficient evidence')], accepted: [2], explanation: t('El comportamiento visible no permite inferir con seguridad el método interno.', 'Visible behaviour alone does not identify its internal method.') },
];
const learningQuestions: QuizQuestion[] = [
  { prompt: t('Calculadora de impuestos con fórmula fija', 'Tax calculator with a fixed formula'), options: [t('Reglas', 'Rules'), t('Aprendizaje', 'Learning')], accepted: [0], explanation: t('La fórmula se programa explícitamente.', 'The formula is explicitly programmed.') },
  { prompt: t('Filtro de spam entrenado con correos etiquetados', 'Spam filter trained on labelled emails'), options: [t('Reglas', 'Rules'), t('Aprendizaje', 'Learning')], accepted: [1], explanation: t('Ajusta parámetros desde ejemplos.', 'It adjusts parameters from examples.') },
  { prompt: t('Agrupación de clientes sin etiquetas objetivo', 'Customer clustering without target labels'), options: [t('Reglas', 'Rules'), t('Aprendizaje no supervisado', 'Unsupervised learning')], accepted: [1], explanation: t('Busca estructura sin etiquetas objetivo.', 'It seeks structure without target labels.') },
  { prompt: t('Horario fijo de semáforo', 'Fixed traffic light schedule'), options: [t('Reglas', 'Rules'), t('Aprendizaje', 'Learning')], accepted: [0], explanation: t('Se sigue una secuencia prescrita.', 'It follows a prescribed sequence.') },
  { prompt: t('Clasificador de imágenes entrenado', 'Trained image classifier'), options: [t('Reglas', 'Rules'), t('Aprendizaje', 'Learning')], accepted: [1], explanation: t('Aprende patrones de datos.', 'It learns patterns from data.') },
  { prompt: t('Conversión de unidades mediante fórmula', 'Unit conversion by formula'), options: [t('Reglas', 'Rules'), t('Aprendizaje', 'Learning')], accepted: [0], explanation: t('No se requiere entrenamiento.', 'No training is required.') },
];
const siliconItems: OrderItem[] = [
  { id: 'tube', label: t('Tubo de vacío', 'Vacuum tube'), hint: t('Dominaba ordenadores electrónicos anteriores al transistor.', 'It dominated electronic computers before the transistor.') },
  { id: 'transistor', label: t('Transistor', 'Transistor'), hint: t('Bell Labs, 1947.', 'Bell Labs, 1947.') },
  { id: 'ic', label: t('Circuito integrado', 'Integrated circuit'), hint: t('Demostración de Kilby, 1958.', 'Kilby’s demonstration, 1958.') },
  { id: 'cpu', label: t('Microprocesador', 'Microprocessor'), hint: t('Intel 4004, 1971.', 'Intel 4004, 1971.') },
];
const siliconPairs: Pair[] = [
  { prompt: t('Tubo de vacío', 'Vacuum tube'), answer: 'electronic', explanation: t('Permitió conmutación electrónica temprana, con gran tamaño y calor.', 'Enabled early electronic switching, with substantial size and heat.') },
  { prompt: t('Transistor', 'Transistor'), answer: 'solid', explanation: t('Abrió una vía de estado sólido más pequeña y eficiente.', 'Opened a smaller, more efficient solid-state route.') },
  { prompt: t('Circuito integrado', 'Integrated circuit'), answer: 'integrate', explanation: t('Reunió varios componentes en un soporte.', 'Put several components on one substrate.') },
  { prompt: t('Microprocesador', 'Microprocessor'), answer: 'cpu', explanation: t('Integró funciones de CPU en un chip.', 'Integrated CPU functions on a chip.') },
];
const siliconOptions = [
  { id: 'electronic', label: t('Conmutación electrónica temprana', 'Early electronic switching') },
  { id: 'solid', label: t('Estado sólido más compacto', 'More compact solid state') },
  { id: 'integrate', label: t('Componentes juntos', 'Components together') },
  { id: 'cpu', label: t('CPU en un chip', 'CPU on a chip') },
];
const cycleItems: OrderItem[] = [
  { id: 'fetch', label: t('Buscar instrucción en memoria', 'Fetch instruction from memory'), hint: t('La CPU necesita primero obtener la instrucción.', 'The CPU first needs an instruction.') },
  { id: 'decode', label: t('Decodificar', 'Decode'), hint: t('Interpreta la instrucción recuperada.', 'Interpret the fetched instruction.') },
  { id: 'execute', label: t('Ejecutar', 'Execute'), hint: t('Aplica la operación indicada.', 'Apply the requested operation.') },
  { id: 'repeat', label: t('Repetir', 'Repeat'), hint: t('Después comienza otro ciclo.', 'Then another cycle begins.') },
];
const alexnetQuestion: QuizQuestion[] = [{ prompt: t('¿Por qué fue importante AlexNet en 2012?', 'Why was AlexNet important in 2012?'), options: [t('Convergieron red profunda, datos etiquetados y GPU.', 'Deep network, labelled data and GPUs converged.'), t('Inventó todas las redes neuronales.', 'It invented all neural networks.'), t('Demostró inteligencia general.', 'It demonstrated general intelligence.')], accepted: [0], explanation: t('Fue un avance de rendimiento, no el origen de todo el campo.', 'It was a performance breakthrough, not the origin of the field.') }];

function SiliconChallenge({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const [ordered, setOrdered] = useState(false);
  const [matched, setMatched] = useState(false);
  const completeOrder = () => { setOrdered(true); if (matched) setTopicCompleted(`activity-${lessonId}`, true); };
  const completeMatch = () => { setMatched(true); if (ordered) setTopicCompleted(`activity-${lessonId}`, true); };
  return <div className="space-y-5"><TimelineOrderChallenge title={t('1 · Orden cronológico', '1 · Chronological order')} items={siliconItems} onComplete={completeOrder} /><div><h4 className="font-bold text-lg mb-3">{t('2 · Ventaja principal', '2 · Main advantage')[lang]}</h4><MatchingChallenge lessonId={lessonId} pairs={siliconPairs} options={siliconOptions} onComplete={completeMatch} /></div></div>;
}

function CycleChallenge({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const [ordered, setOrdered] = useState(false);
  const [mapped, setMapped] = useState(false);
  const completeOrder = () => { setOrdered(true); if (mapped) setTopicCompleted(`activity-${lessonId}`, true); };
  const completeMap = () => { setMapped(true); if (ordered) setTopicCompleted(`activity-${lessonId}`, true); };
  return <div className="space-y-5"><TimelineOrderChallenge title={t('1 · Ordena las fases', '1 · Order the phases')} items={cycleItems} onComplete={completeOrder} /><div><h4 className="text-lg font-bold mb-3">2 · CPU / {lang === 'es' ? 'memoria / entrada-salida' : 'memory / input-output'}</h4><ChoiceQuiz lessonId={lessonId} questions={cpuQuestions} onComplete={completeMap} /></div></div>;
}

function NeuralChallenge({ lessonId }: { lessonId: string }) {
  const { lang } = useLanguage();
  const [matched, setMatched] = useState(false);
  const [explained, setExplained] = useState(false);
  const completeMatch = () => { setMatched(true); if (explained) setTopicCompleted(`activity-${lessonId}`, true); };
  const completeQuestion = () => { setExplained(true); if (matched) setTopicCompleted(`activity-${lessonId}`, true); };
  return <div className="space-y-5"><MatchingChallenge lessonId={lessonId} pairs={neuralPairs} options={neuralOptions} onComplete={completeMatch} /><div><h4 className="text-lg font-bold mb-3">{lang === 'es' ? 'Pregunta histórica' : 'Historical question'}</h4><ChoiceQuiz lessonId={lessonId} questions={alexnetQuestion} onComplete={completeQuestion} /></div></div>;
}

export default function HistoryActivityPanel({ lessonId, activity }: { lessonId: string; activity: HistoryActivity }) {
  const { lang } = useLanguage();
  return <section className="neo-card border-purple-500 bg-purple-950/10 p-5 md:p-7"><p className="font-mono text-xs uppercase tracking-widest text-purple-300 font-bold mb-2">{lang === 'es' ? 'Actividad práctica' : 'Hands-on activity'} · {lessonId.toUpperCase()}</p><h3 className="text-2xl font-bold mb-4">{({
    matching: t('Construye el ordenador conceptual', 'Build the conceptual computer'), machine: t('Ejecuta la máquina', 'Run the machine'), cycle: t('Sigue el ciclo de instrucción', 'Follow the instruction cycle'), 'silicon-order': t('Ordena la revolución del silicio', 'Order the silicon revolution'), innovation: t('¿Qué tipo de innovación?', 'What kind of innovation?'), protocols: t('Relaciona protocolos y funciones', 'Match protocols and functions'), symbolic: t('Reglas, búsqueda o aprendizaje', 'Rules, search or learning'), 'rules-learning': t('¿Regla o aprendizaje?', 'Rule or learning?'), 'neural-terms': t('Conceptos de redes neuronales', 'Neural-network concepts'), 'next-token': t('Predice el siguiente token', 'Predict the next token'), 'answer-audit': t('Inspector de respuestas de IA', 'AI answer inspector'), deployment: t('¿Debe desplegarse este sistema?', 'Should this system be deployed?'),
  } as Record<HistoryActivity, Localized>)[activity][lang]}</h3>
    {activity === 'matching' && <MatchingChallenge lessonId={lessonId} pairs={enginePairs} options={engineOptions} hintOnly />}
    {activity === 'machine' && <TuringRun lessonId={lessonId} />}
    {activity === 'cycle' && <CycleChallenge lessonId={lessonId} />}
    {activity === 'silicon-order' && <SiliconChallenge lessonId={lessonId} />}
    {activity === 'innovation' && <ChoiceQuiz lessonId={lessonId} questions={innovationQuestions} />}
    {activity === 'protocols' && <MatchingChallenge lessonId={lessonId} pairs={protocolPairs} options={protocolOptions} />}
    {activity === 'symbolic' && <ChoiceQuiz lessonId={lessonId} questions={symbolicQuestions} />}
    {activity === 'rules-learning' && <ChoiceQuiz lessonId={lessonId} questions={learningQuestions} />}
    {activity === 'neural-terms' && <NeuralChallenge lessonId={lessonId} />}
    {activity === 'next-token' && <NextToken lessonId={lessonId} />}
    {activity === 'answer-audit' && <AnswerAudit lessonId={lessonId} />}
    {activity === 'deployment' && <Deployment lessonId={lessonId} />}
  </section>;
}

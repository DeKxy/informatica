import { useState } from 'react';
import type { HistoryVisual } from '../../content/historyCourse';
import { useLanguage } from '../../hooks/useLanguage';

const card = 'rounded-xl border-2 border-slate-600 bg-slate-950/60 p-4';
const selected = 'border-purple-400 bg-purple-950/40';
const button = 'rounded-xl border-2 p-3 text-left transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-cyan-300';

function EngineDiagram() {
  const { lang } = useLanguage();
  const parts = [
    ['Store', 'Memoria', 'Memory', 'Conserva valores intermedios.', 'Keeps intermediate values.'],
    ['Mill', 'Procesador', 'Processor', 'Realiza operaciones.', 'Performs operations.'],
    ['Punched cards', 'Entrada / programa', 'Input / program', 'Transportan instrucciones y datos.', 'Carry instructions and data.'],
    ['Printer', 'Salida', 'Output', 'Comunica los resultados.', 'Communicates results.'],
  ];
  const [active, setActive] = useState(0);
  return <div><div className="grid sm:grid-cols-4 gap-3">{parts.map((part, index) => <button key={part[0]} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`${button} ${active === index ? selected : 'border-slate-600 bg-slate-950'}`}><span className="block font-mono text-xs text-amber-300 mb-2">0{index + 1} / 1840s</span><strong>{part[0]}</strong><span className="block mt-2 text-purple-300">↓ {part[lang === 'es' ? 1 : 2]}</span></button>)}</div><p className="mt-4 border-l-4 border-amber-400 pl-4 text-slate-200" aria-live="polite">{parts[active][lang === 'es' ? 3 : 4]} {lang === 'es' ? 'Correspondencia conceptual, no equivalencia física.' : 'Conceptual mapping, not physical equivalence.'}</p></div>;
}

function TuringDiagram() {
  const { lang } = useLanguage();
  return <div className={card}><p className="font-mono text-xs text-amber-300 mb-3">{lang === 'es' ? 'MODELO ABSTRACTO' : 'ABSTRACT MODEL'}</p><div className="flex justify-center gap-2 mb-3" aria-label={lang === 'es' ? 'Cinta con símbolos 1, 1, 0, 1, 0' : 'Tape with symbols 1, 1, 0, 1, 0'}>{['1', '1', '0', '1', '0'].map((symbol, index) => <span key={index} className={`size-12 flex items-center justify-center border-2 font-mono text-xl ${index === 0 ? 'border-amber-400 bg-amber-950' : 'border-slate-600'}`}>{symbol}</span>)}</div><p className="text-center text-amber-300">↑ {lang === 'es' ? 'cabezal: lee, escribe y se mueve' : 'head: reads, writes and moves'}</p></div>;
}

function CpuCycle() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const phases = lang === 'es' ? [['BUSCAR', 'La CPU recupera una instrucción de memoria.'], ['DECODIFICAR', 'La unidad de control interpreta qué operación se pide.'], ['EJECUTAR', 'La CPU realiza la operación y puede usar entrada/salida.'], ['REPETIR', 'La siguiente instrucción inicia otro ciclo.']] : [['FETCH', 'The CPU retrieves an instruction from memory.'], ['DECODE', 'The control unit interprets the operation.'], ['EXECUTE', 'The CPU performs it and may use input/output.'], ['REPEAT', 'The next instruction begins another cycle.']];
  return <div><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{phases.map(([label], index) => <button key={label} type="button" onClick={() => setStep(index)} aria-pressed={step === index} className={`${button} text-center font-mono text-sm ${step === index ? selected : 'border-slate-600 bg-slate-950'}`}>0{index + 1}<span className="block mt-1 font-bold">{label}</span></button>)}</div><p className="mt-4 text-slate-200" aria-live="polite">{phases[step][1]}</p><button type="button" className="neo-button bg-purple-400 text-black px-4 py-2 mt-3" onClick={() => setStep((step + 1) % 4)}>{lang === 'es' ? 'Siguiente fase' : 'Next phase'} →</button></div>;
}

function SiliconZoom() {
  const { lang } = useLanguage();
  const stages = [
    ['1940s', 'Vacuum tube', 'Tubo de vacío', 'Grande, caliente y con alto consumo.', 'Large, hot and power hungry.'],
    ['1947', 'Transistor', 'Transistor', 'Menor tamaño y consumo; sustitución gradual.', 'Smaller and more efficient; gradual replacement.'],
    ['1958', 'Integrated circuit', 'Circuito integrado', 'Varios componentes en un soporte.', 'Several components on one substrate.'],
    ['1971', 'Microprocessor', 'Microprocesador', 'Funciones de CPU integradas en un chip.', 'CPU functions integrated on a chip.'],
  ];
  const [active, setActive] = useState(0);
  return <div><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{stages.map((stage, index) => <button key={stage[0]} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`${button} ${active === index ? 'border-amber-400 bg-amber-950/40' : 'border-slate-600 bg-slate-950'}`}><span className="font-mono text-xs text-amber-300">{stage[0]}</span><strong className="block mt-2">{stage[lang === 'es' ? 2 : 1]}</strong></button>)}</div><div className={`${card} mt-4 flex items-center gap-5`} aria-live="polite"><div aria-hidden="true" className="flex size-20 shrink-0 items-center justify-center rounded-xl border-2 border-amber-400 bg-amber-950/40 font-mono text-3xl">{['◯', '◇', '▦', '▣'][active]}</div><p>{stages[active][lang === 'es' ? 3 : 4]}</p></div><p className="text-xs text-slate-400 mt-2">{lang === 'es' ? 'Comparación cualitativa. Los tamaños y consumos variaron entre diseños.' : 'Qualitative comparison. Size and power varied between designs.'}</p></div>;
}

function InterfaceDemo() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState<'cli' | 'gui'>('cli');
  const [opened, setOpened] = useState(false);
  return <div><div role="tablist" aria-label={lang === 'es' ? 'Tipo de interfaz' : 'Interface type'} className="flex gap-2 mb-3"><button role="tab" aria-selected={mode === 'cli'} className={`neo-button px-5 py-2 ${mode === 'cli' ? 'bg-amber-400 text-black' : 'bg-slate-700'}`} onClick={() => setMode('cli')}>CLI</button><button role="tab" aria-selected={mode === 'gui'} className={`neo-button px-5 py-2 ${mode === 'gui' ? 'bg-amber-400 text-black' : 'bg-slate-700'}`} onClick={() => setMode('gui')}>GUI</button></div><div role="tabpanel" className="rounded-xl border-2 border-slate-600 bg-slate-950 p-5 min-h-36">{mode === 'cli' ? <div className="font-mono text-green-300"><p>$ ls</p><button type="button" className="text-left underline mt-3" onClick={() => setOpened(!opened)}>$ {opened ? 'cat notes.txt' : 'cat notes.txt'} ↵</button>{opened && <p className="text-white mt-2">{lang === 'es' ? 'Archivo abierto mediante comando.' : 'File opened through a command.'}</p>}</div> : <div><div className="border-b border-slate-600 pb-2 mb-3 text-sm">{lang === 'es' ? 'Archivo   Editar   Ver' : 'File   Edit   View'}</div><button type="button" onClick={() => setOpened(!opened)} className="rounded-lg border border-amber-300 p-3 text-center hover:bg-slate-800">▣<span className="block text-xs">notes.txt</span></button>{opened && <div className="mt-3 rounded border border-slate-500 p-3">{lang === 'es' ? 'Ventana: archivo abierto con puntero e icono.' : 'Window: file opened with pointer and icon.'}</div>}</div>}</div><p className="text-sm text-slate-400 mt-2">{lang === 'es' ? 'Ambos paradigmas siguen siendo útiles; cambia la forma de acceder a la acción.' : 'Both paradigms remain useful; how the action is reached changes.'}</p></div>;
}

function NetworkRoute() {
  const { lang } = useLanguage();
  const labels = lang === 'es' ? ['Navegador', 'DNS', 'Enrutador', 'Servidor', 'Navegador'] : ['Browser', 'DNS', 'Router', 'Server', 'Browser'];
  const explanations = lang === 'es' ? ['Introduces una URL.', 'El nombre se relaciona con una dirección.', 'Los paquetes recorren la red.', 'El servidor responde mediante HTTP.', 'Se presenta el recurso Web.'] : ['You enter a URL.', 'The name maps to an address.', 'Packets travel across the network.', 'The server responds over HTTP.', 'The Web resource is shown.'];
  const [step, setStep] = useState(0);
  return <div><div className="grid grid-cols-2 sm:grid-cols-5 gap-2">{labels.map((label, index) => <button key={index} type="button" onClick={() => setStep(index)} aria-pressed={step === index} className={`${button} text-center text-sm ${step === index ? selected : 'border-slate-600 bg-slate-950'}`}><span className="font-mono text-xs text-purple-300">0{index + 1}</span><strong className="block">{label}</strong></button>)}</div><p className="text-slate-200 mt-4" aria-live="polite">{explanations[step]}</p><button type="button" className="neo-button bg-purple-400 text-black px-4 py-2 mt-3" onClick={() => setStep((step + 1) % 5)}>{lang === 'es' ? 'Enviar siguiente paquete' : 'Send next packet'} →</button></div>;
}

function ElizaDemo() {
  const { lang } = useLanguage();
  const [input, setInput] = useState('I feel uncertain');
  const [reply, setReply] = useState('');
  const [rule, setRule] = useState(false);
  const run = () => { setReply(input.toLowerCase().includes('feel') || input.toLowerCase().includes('siento') ? (lang === 'es' ? '¿Por qué te sientes así?' : 'Why do you feel that way?') : (lang === 'es' ? 'Cuéntame más.' : 'Tell me more.')); setRule(false); };
  return <div className={card}><label className="block font-bold">{lang === 'es' ? 'Escribe una frase de prueba' : 'Type a test phrase'}<input value={input} onChange={(e) => setInput(e.target.value)} maxLength={80} className="mt-2 w-full rounded-lg border-2 border-slate-600 bg-slate-900 p-3" /></label><button type="button" onClick={run} className="neo-button bg-purple-400 text-black px-4 py-2 mt-3">{lang === 'es' ? 'Responder' : 'Respond'}</button>{reply && <div className="mt-4" aria-live="polite"><p className="border-l-4 border-purple-400 pl-4">{reply}</p><button type="button" className="text-purple-300 underline mt-3" onClick={() => setRule(!rule)}>{lang === 'es' ? '¿Qué regla produjo esta respuesta?' : 'Which rule produced this response?'}</button>{rule && <p className="text-sm text-slate-300 mt-2">{input.toLowerCase().includes('feel') || input.toLowerCase().includes('siento') ? (lang === 'es' ? 'Patrón “feel/siento” → pregunta reflejada. No interpreta la emoción.' : 'Pattern “feel/siento” → reflective question. It does not interpret emotion.') : (lang === 'es' ? 'Regla de reserva cuando no se reconoce un patrón.' : 'Fallback rule when no pattern is recognised.')}</p>}</div>}</div>;
}

function LearningPipeline() {
  const { lang } = useLanguage();
  const words = lang === 'es' ? ['Datos', 'Entrenamiento', 'Modelo', 'Inferencia', 'Predicción'] : ['Data', 'Training', 'Model', 'Inference', 'Prediction'];
  return <div><div className="rounded-xl border-2 border-purple-400 p-5 bg-purple-950/25"><strong>AI / IA</strong><div className="mt-3 rounded-xl border-2 border-cyan-400 p-4"><strong>ML / {lang === 'es' ? 'Aprendizaje automático' : 'Machine learning'}</strong><div className="mt-3 rounded-xl border-2 border-amber-400 p-3"><strong>Deep learning / {lang === 'es' ? 'Aprendizaje profundo' : 'Deep learning'}</strong></div></div></div><ol className="flex flex-wrap items-center gap-2 mt-4">{words.map((word, i) => <li key={word} className="flex items-center gap-2"><span className="rounded-lg border-2 border-slate-600 bg-slate-950 px-3 py-2 text-sm">{word}</span>{i < words.length - 1 && <span aria-hidden="true">→</span>}</li>)}</ol><p className="text-xs text-slate-400 mt-3">{lang === 'es' ? 'Conjuntos anidados: simplificación educativa, no definición universal.' : 'Nested areas: teaching simplification, not a universal definition.'}</p></div>;
}

function NeuralNetwork() {
  const { lang } = useLanguage();
  const [weightA, setWeightA] = useState(0.6);
  const [weightB, setWeightB] = useState(0.4);
  const score = Math.round((weightA * 0.7 + weightB * 0.3) * 100);
  return <div className={card}><p className="font-mono text-xs text-purple-300 mb-4">{lang === 'es' ? 'SIMULACIÓN DIDÁCTICA · NO ES UN MODELO ENTRENADO' : 'TEACHING SIMULATION · NOT A TRAINED MODEL'}</p><div className="flex items-center justify-around gap-2 text-center font-bold mb-5"><div className="rounded-full border-2 border-purple-400 p-3">{lang === 'es' ? 'Entrada' : 'Input'}</div><span>→</span><div className="rounded-full border-2 border-cyan-400 p-3">{lang === 'es' ? 'Capa' : 'Layer'}</div><span>→</span><div className="rounded-full border-2 border-amber-400 p-3">{score}%</div></div><div className="grid sm:grid-cols-2 gap-4">{[[weightA, setWeightA, 'A'], [weightB, setWeightB, 'B']].map(([value, setter, name]) => <label key={name as string} className="block">Weight / {lang === 'es' ? 'peso' : 'weight'} {String(name)}: {(value as number).toFixed(1)}<input type="range" min="0" max="1" step="0.1" value={value as number} onChange={(e) => (setter as (n: number) => void)(Number(e.target.value))} className="block w-full mt-2 accent-purple-400" /></label>)}</div><p className="text-sm text-slate-300 mt-3" role="status">{lang === 'es' ? 'Puntuación ficticia de clasificación' : 'Fictitious classification score'}: {score}%</p></div>;
}

function TokenAttention() {
  const { lang } = useLanguage();
  const tokens = lang === 'es' ? ['La', 'máquina', 'aprende', 'de', 'datos'] : ['The', 'machine', 'learns', 'from', 'data'];
  const [active, setActive] = useState(2);
  return <div><p className="text-slate-300 mb-3">{lang === 'es' ? 'Selecciona un token para ver relaciones conceptuales de contexto.' : 'Select a token to see conceptual context relationships.'}</p><div className="flex flex-wrap gap-2">{tokens.map((token, i) => <button key={i} type="button" aria-pressed={active === i} onClick={() => setActive(i)} className={`${button} px-4 font-mono ${active === i ? selected : 'border-slate-600 bg-slate-950'}`}>{token}</button>)}</div><div className={`${card} mt-4`} aria-live="polite"><p className="font-mono text-purple-300">{tokens[active]} → {tokens.filter((_, i) => i !== active).slice(0, 2).join(' · ')}</p><p className="text-sm text-slate-300 mt-2">{lang === 'es' ? 'Relaciones inventadas para explicar atención; no son salidas ni pesos de un modelo real.' : 'Illustrative relationships only; not outputs or weights from a real model.'}</p></div></div>;
}

function AuditFlow() {
  const { lang } = useLanguage();
  const steps = lang === 'es' ? ['Afirmación', 'Fuente primaria', 'Contraste', 'Fecha', 'Incertidumbre'] : ['Claim', 'Primary source', 'Cross-check', 'Date', 'Uncertainty'];
  return <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2">{steps.map((step, i) => <li key={step} className={card}><span className="font-mono text-xs text-purple-300">0{i + 1}</span><strong className="block mt-2">{step}</strong></li>)}</ol>;
}

function TrustAxes() {
  const { lang } = useLanguage();
  const axes = [
    ['Validez y fiabilidad', 'Validity and reliability', '¿Funciona en el contexto real?', 'Does it work in the actual context?'],
    ['Seguridad', 'Safety', '¿Qué daños puede causar?', 'What harms could it cause?'],
    ['Resiliencia', 'Resilience', '¿Resiste fallos y ataques?', 'Does it withstand failures and attacks?'],
    ['Rendición de cuentas', 'Accountability', '¿Quién responde por el resultado?', 'Who is answerable for the outcome?'],
    ['Transparencia', 'Transparency', '¿Se comunica cuándo se usa?', 'Is its use disclosed?'],
    ['Explicabilidad', 'Explainability', '¿Puede justificarse una decisión?', 'Can a decision be explained?'],
    ['Privacidad', 'Privacy', '¿Se minimizan datos personales?', 'Are personal data minimised?'],
    ['Equidad', 'Fairness', '¿Se evalúan efectos desiguales?', 'Are unequal effects assessed?'],
  ];
  const [active, setActive] = useState(0);
  return <div><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{axes.map((axis, i) => <button key={i} type="button" aria-pressed={active === i} onClick={() => setActive(i)} className={`${button} text-sm ${active === i ? selected : 'border-slate-600 bg-slate-950'}`}><span className="font-mono text-xs text-purple-300">0{i + 1}</span><strong className="block mt-1">{axis[lang === 'es' ? 0 : 1]}</strong></button>)}</div><p className="mt-4 border-l-4 border-purple-400 pl-4 text-slate-200" aria-live="polite">{axes[active][lang === 'es' ? 2 : 3]}</p></div>;
}

export default function HistoryVisual({ kind }: { kind: HistoryVisual }) {
  switch (kind) {
    case 'engine': return <EngineDiagram />;
    case 'turing': return <TuringDiagram />;
    case 'cpu': return <CpuCycle />;
    case 'silicon': return <SiliconZoom />;
    case 'interface': return <InterfaceDemo />;
    case 'network': return <NetworkRoute />;
    case 'eliza': return <ElizaDemo />;
    case 'learning': return <LearningPipeline />;
    case 'neural': return <NeuralNetwork />;
    case 'tokens': return <TokenAttention />;
    case 'audit': return <AuditFlow />;
    case 'trust': return <TrustAxes />;
  }
}


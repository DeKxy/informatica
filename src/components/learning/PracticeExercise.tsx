import { useRef, useState } from 'react';
import type { PracticeExercise as Exercise } from '../../content/practiceCourse';
import { localize } from '../../content/learningModules';
import { setTopicCompleted, useCompletedTopics } from '../../features/learning/progress';
import { useLanguage } from '../../hooks/useLanguage';

type Draft = { answers: Record<string, string>; order: string[]; attempts: number };
const keyFor = (id: string) => `tech-academy:practice-draft:v1:${id}`;
function fresh(exercise: Exercise): Draft {
  const ids = exercise.options.map(option => option.id);
  return { answers: {}, order: [ids[2], ids[0], ids[3], ids[1]].filter(Boolean), attempts: 0 };
}
function readDraft(exercise: Exercise): Draft {
  const fallback = fresh(exercise);
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(keyFor(exercise.id)) ?? 'null');
    if (!raw || typeof raw !== 'object') return fallback;
    const draft = raw as Partial<Draft>;
    const ids = new Set(exercise.options.map(option => option.id));
    const answers = Object.fromEntries(Object.entries(draft.answers && typeof draft.answers === 'object' ? draft.answers : {}).filter(([key, value]) => exercise.prompts.some(prompt => prompt.id === key) && typeof value === 'string' && ids.has(value)));
    const validOrder = Array.isArray(draft.order) && draft.order.length === ids.size && new Set(draft.order).size === ids.size && draft.order.every(id => ids.has(id));
    return { answers, order: validOrder ? draft.order! : fallback.order, attempts: typeof draft.attempts === 'number' && Number.isSafeInteger(draft.attempts) && draft.attempts >= 0 ? draft.attempts : 0 };
  } catch { return fallback; }
}

export default function PracticeExercise({ exercise, onNext, last }: { exercise: Exercise; onNext: () => void; last: boolean }) {
  const { lang } = useLanguage();
  const es = lang === 'es';
  const completed = useCompletedTopics();
  const [draft, setDraft] = useState(() => readDraft(exercise));
  const [checked, setChecked] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);
  const orderCorrect = draft.order.every((id, i) => id === exercise.options[i].id);
  const correct = exercise.kind === 'order' ? orderCorrect : exercise.prompts.every(prompt => draft.answers[prompt.id] === prompt.answer);
  const answered = exercise.kind === 'order' || exercise.prompts.every(prompt => !!draft.answers[prompt.id]);
  const update = (next: Draft) => {
    setDraft(next);
    try { localStorage.setItem(keyFor(exercise.id), JSON.stringify(next)); setStorageFailed(false); }
    catch { setStorageFailed(true); }
  };
  const choose = (id: string, value: string) => { update({ ...draft, answers: { ...draft.answers, [id]: value } }); setChecked(false); };
  const move = (index: number, direction: number) => {
    const order = [...draft.order];
    [order[index], order[index + direction]] = [order[index + direction], order[index]];
    update({ ...draft, order }); setChecked(false);
  };
  const check = () => {
    update({ ...draft, attempts: draft.attempts + 1 });
    setChecked(true);
    if (correct) setTopicCompleted(exercise.id, true);
    requestAnimationFrame(() => feedback.current?.focus());
  };
  return <article className="practice-exercise">
    <div className="practice-exercise-meta landing-micro"><span>{exercise.kind === 'order' ? (es ? 'ORDENA' : 'ORDER') : exercise.kind === 'match' ? (es ? 'ASOCIA Y CLASIFICA' : 'MATCH & CLASSIFY') : (es ? 'RESUELVE EL CASO' : 'SOLVE THE CASE')}</span><span>{es ? 'Comprobaciones' : 'Checks'}: {draft.attempts}</span></div>
    <h2>{localize(exercise.title, lang)}</h2>
    <p className="practice-brief">{localize(exercise.brief, lang)}</p>
    <details className="practice-hint"><summary>{es ? 'Ver una pista' : 'Show a hint'}</summary><p>{localize(exercise.hint, lang)}</p></details>
    {exercise.kind === 'order' ? <>
      <p className="practice-instruction">{es ? 'Usa las flechas para cambiar el orden. También funcionan con teclado.' : 'Use the arrow buttons to change the order. They also work with a keyboard.'}</p>
      <ol className="practice-order">{draft.order.map((id, i) => {
        const item = exercise.options.find(option => option.id === id)!;
        return <li key={id}><span className="landing-micro">0{i + 1}</span><span>{localize(item.label, lang)}</span><div><button type="button" disabled={i === 0} aria-label={`${es ? 'Subir' : 'Move up'} ${localize(item.label, lang)}`} onClick={() => move(i, -1)}>↑</button><button type="button" disabled={i === draft.order.length - 1} aria-label={`${es ? 'Bajar' : 'Move down'} ${localize(item.label, lang)}`} onClick={() => move(i, 1)}>↓</button></div></li>;
      })}</ol>
    </> : <div className="practice-questions">{exercise.prompts.map(prompt => <fieldset key={prompt.id}>
      <legend>{localize(prompt.label, lang)}</legend>
      {exercise.kind === 'choice' ? <div className="practice-options">{exercise.options.map(option => <label key={option.id}><input type="radio" name={`${exercise.id}-${prompt.id}`} value={option.id} checked={draft.answers[prompt.id] === option.id} onChange={() => choose(prompt.id, option.id)} /><span>{localize(option.label, lang)}</span></label>)}</div> : <select aria-label={localize(prompt.label, lang)} value={draft.answers[prompt.id] ?? ''} onChange={event => choose(prompt.id, event.target.value)}><option value="">{es ? 'Selecciona una respuesta' : 'Choose an answer'}</option>{exercise.options.map(option => <option key={option.id} value={option.id}>{localize(option.label, lang)}</option>)}</select>}
      {checked && draft.answers[prompt.id] && <p className="practice-item-feedback"><strong>{draft.answers[prompt.id] === prompt.answer ? (es ? '✓ Correcto. ' : '✓ Correct. ') : (es ? '↺ Revisa esta respuesta. ' : '↺ Review this answer. ')}</strong>{localize(prompt.explanation, lang)}</p>}
    </fieldset>)}</div>}
    <div className="practice-actions"><button type="button" className="landing-button" onClick={check}>{es ? 'Comprobar' : 'Check answers'}<span aria-hidden="true">↗</span></button><button type="button" className="practice-secondary" onClick={() => { update(fresh(exercise)); setChecked(false); }}>{es ? 'Reintentar desde cero' : 'Start a new attempt'}</button></div>
    <div ref={feedback} className="practice-result" tabIndex={-1} role="status">
      {checked && <><strong>{correct ? (es ? '✓ Reto superado' : '✓ Challenge passed') : !answered ? (es ? 'Completa todas las respuestas antes de continuar.' : 'Complete all answers before continuing.') : (es ? 'Todavía no. Revisa las explicaciones y vuelve a intentarlo.' : 'Not yet. Review the explanations and try again.')}</strong>{correct ? <><p>{localize(exercise.takeaway, lang)}</p><button type="button" className="practice-secondary" onClick={onNext}>{last ? (es ? 'Ver resumen' : 'View summary') : (es ? 'Siguiente reto →' : 'Next challenge →')}</button></> : checked && exercise.kind === 'order' && <p>{localize(exercise.hint, lang)}</p>}</>}
    </div>
    {completed.includes(exercise.id) && <p className="practice-saved">{es ? '✓ Este reto ya consta como superado. Reintentar no elimina ese logro.' : '✓ This challenge is recorded as passed. A new attempt does not remove that achievement.'}</p>}
    {storageFailed && <p role="alert">{es ? 'No se ha podido guardar este intento en el navegador. Puedes continuar en esta sesión.' : 'This attempt could not be saved in the browser. You can continue in this session.'}</p>}
  </article>;
}

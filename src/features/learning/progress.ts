import { useSyncExternalStore } from 'react';
import { learningModules } from '../../content/learningModules';
import { milestones } from '../../content/cyberCourse';
import { historyActivityIds } from '../../content/historyCourse';

// The former roadmap used a different curriculum. Keep its saved data intact.
const KEY = 'tech-academy:completed-topics';
const EVENT = 'tech-academy:topic-progress';
const validIds = new Set<string>([
  ...learningModules.flatMap((module) => module.topics.map((topic) => topic.id)),
  ...milestones,
  ...historyActivityIds,
  'history-timeline-computing',
  'history-timeline-ai',
  'history-misconceptions',
  'history-final-project',
  // Preserve progress from the six-topic preview when a new milestone is saved.
  'history-origins', 'history-computers', 'history-evolution',
  'history-internet', 'history-ai-intro', 'history-ai-future',
]);
let cachedRaw: string | null = null;
let cachedIds: string[] = [];
let fallbackIds: string[] = [];

function readCompleted(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedIds;
    const parsed: unknown = JSON.parse(raw ?? '[]');
    cachedIds = Array.isArray(parsed)
      ? [...new Set(parsed.filter((id): id is string => typeof id === 'string' && validIds.has(id)))]
      : [];
    cachedRaw = raw;
    return cachedIds;
  } catch {
    return fallbackIds;
  }
}

function subscribe(listener: () => void) {
  window.addEventListener(EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

export const useCompletedTopics = () => useSyncExternalStore(subscribe, readCompleted, () => []);

export function setTopicCompleted(id: string, completed: boolean) {
  if (!validIds.has(id)) return;
  const next = new Set(readCompleted());
  if (completed) next.add(id);
  else next.delete(id);
  fallbackIds = [...next];
  cachedIds = fallbackIds;
  try {
    cachedRaw = JSON.stringify(fallbackIds);
    localStorage.setItem(KEY, cachedRaw);
  } catch {
    cachedRaw = null;
  }
  window.dispatchEvent(new Event(EVENT));
}

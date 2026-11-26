import type { Lesson } from '../types/course.ts';

export interface Progress {
  done: number;
  total: number;
  /** 0–1 */
  ratio: number;
}

export function courseProgress(lessons: Lesson[], completedIds: ReadonlySet<string>): Progress {
  const total = lessons.length;
  const done = lessons.filter((l) => completedIds.has(l.id)).length;
  return { done, total, ratio: total === 0 ? 0 : done / total };
}

/** The first unlocked lesson the member hasn't finished, else the last unlocked one. */
export function nextLesson(lessons: Lesson[], completedIds: ReadonlySet<string>, maxWeek: number): Lesson | null {
  const open = [...lessons]
    .filter((l) => l.week <= maxWeek)
    .sort((a, b) => a.week - b.week || a.order - b.order);
  return open.find((l) => !completedIds.has(l.id)) ?? open[open.length - 1] ?? null;
}

export function sortLessons(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort((a, b) => a.week - b.week || a.order - b.order);
}

import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { Lesson } from '../src/types/course.ts';
import { courseProgress, nextLesson } from '../src/utils/progress.ts';

const lesson = (id: string, week: number, order: number): Lesson => ({
  id, courseId: 'c', week, order, title: { es: id, en: id }, summary: { es: '', en: '' },
  durationMin: 5, videoKey: '', resources: [], isFreeSample: false, published: true,
});
const lessons = [lesson('w2', 2, 2), lesson('w1a', 1, 0), lesson('w1b', 1, 1), lesson('w3', 3, 3)];

test('progress counts completed lessons', () => {
  assert.deepEqual(courseProgress(lessons, new Set(['w1a'])), { done: 1, total: 4, ratio: 0.25 });
  assert.equal(courseProgress([], new Set()).ratio, 0);
});

test('next lesson is the first unfinished one that is unlocked', () => {
  assert.equal(nextLesson(lessons, new Set(['w1a']), 2)?.id, 'w1b');
  assert.equal(nextLesson(lessons, new Set(['w1a', 'w1b']), 2)?.id, 'w2');
});

test('when everything unlocked is done, stay on the last unlocked lesson', () => {
  assert.equal(nextLesson(lessons, new Set(['w1a', 'w1b', 'w2']), 2)?.id, 'w2');
});

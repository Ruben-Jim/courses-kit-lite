import { demoDb } from '../store/demoStore';
import type { Course, Lesson, LiveSession } from '../types/course';

/**
 * MOCK — replace with your backend. Courses and lessons are public metadata (titles, summaries,
 * file keys); the video files themselves come from mediaService. Live sessions hold the Zoom/Meet
 * link, so in production only active members should be able to read them.
 */
const pause = () => new Promise((r) => setTimeout(r, 120));
const uid = (prefix: string) => `${prefix}${Date.now().toString(36)}`;

export async function listCourses(): Promise<Course[]> {
  await pause();
  return demoDb.get().courses.filter((c) => c.published).sort((a, b) => a.order - b.order);
}

export async function getCourse(id: string): Promise<Course | null> {
  await pause();
  return demoDb.get().courses.find((c) => c.id === id && c.published) ?? null;
}

/** Published lessons of one course (or every course), for the public curriculum and members. */
export async function listLessons(courseId?: string): Promise<Lesson[]> {
  await pause();
  return demoDb.get().lessons.filter((l) => l.published && (!courseId || l.courseId === courseId));
}

/** Owner: every lesson, drafts included. */
export async function listAllLessons(): Promise<Lesson[]> {
  await pause();
  return demoDb.get().lessons;
}

export async function saveLesson(lesson: Lesson): Promise<void> {
  const { lessons } = demoDb.get();
  const exists = lessons.some((l) => l.id === lesson.id);
  demoDb.set({ lessons: exists ? lessons.map((l) => (l.id === lesson.id ? lesson : l)) : [...lessons, lesson] });
}

export async function deleteLesson(id: string): Promise<void> {
  demoDb.set({ lessons: demoDb.get().lessons.filter((l) => l.id !== id) });
}

export function newLessonId(): string {
  return uid('l');
}

export async function listSessions(): Promise<LiveSession[]> {
  await pause();
  return demoDb.get().sessions;
}

export async function saveSession(session: LiveSession): Promise<void> {
  const { sessions } = demoDb.get();
  const exists = sessions.some((s) => s.id === session.id);
  demoDb.set({ sessions: exists ? sessions.map((s) => (s.id === session.id ? session : s)) : [...sessions, session] });
}

export async function deleteSession(id: string): Promise<void> {
  demoDb.set({ sessions: demoDb.get().sessions.filter((s) => s.id !== id) });
}

export function newSessionId(): string {
  return uid('s');
}

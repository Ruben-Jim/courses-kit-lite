import { create } from 'zustand';
import {
  DEMO_COMPLETED,
  DEMO_COURSES,
  DEMO_LESSONS,
  DEMO_MEMBERS,
  DEMO_SESSIONS,
  DEMO_WAITLIST,
} from '../constants/demoData';
import type { Course, Lesson, LiveSession } from '../types/course';
import type { Member, WaitlistEntry } from '../types/member';

/**
 * Demo mode's "database": in memory, reset on reload. Only the services read or write it,
 * so screens can’t tell the mock data from a real backend.
 */
interface DemoState {
  courses: Course[];
  lessons: Lesson[];
  sessions: LiveSession[];
  members: Member[];
  waitlist: WaitlistEntry[];
  completed: string[];
  set: (patch: Partial<Omit<DemoState, 'set'>>) => void;
}

export const useDemoStore = create<DemoState>()((set) => ({
  courses: DEMO_COURSES,
  lessons: DEMO_LESSONS,
  sessions: DEMO_SESSIONS,
  members: DEMO_MEMBERS,
  waitlist: DEMO_WAITLIST,
  completed: DEMO_COMPLETED,
  set: (patch) => set(patch),
}));

/** Read/write outside React (services). */
export const demoDb = {
  get: () => useDemoStore.getState(),
  set: (patch: Partial<Omit<DemoState, 'set'>>) => useDemoStore.getState().set(patch),
};

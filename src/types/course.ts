import type { Localized } from './i18n';

/** A program a member works through, e.g. "Cocina Real en 8 Semanas". */
export interface Course {
  id: string;
  title: Localized;
  summary: Localized;
  /** Number of weekly modules. */
  weeks: number;
  /** Shown on the public catalog. */
  level: Localized;
  order: number;
  published: boolean;
}

/** A downloadable file attached to a lesson (grocery list, workout plan, worksheet, sheet music). */
export interface LessonResource {
  id: string;
  label: Localized;
  /** Object key in the private R2 bucket. Members get a short-lived link from the server. */
  fileKey: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  week: number;
  order: number;
  title: Localized;
  summary: Localized;
  durationMin: number;
  /** Object key of the video in the private R2 bucket. Empty until the owner uploads it. */
  videoKey: string;
  resources: LessonResource[];
  /** Free sample: anyone can watch it on the public course page. */
  isFreeSample: boolean;
  published: boolean;
}

/** A live group Q&A on Zoom or Google Meet. The join link is members-only. */
export interface LiveSession {
  id: string;
  title: Localized;
  /** ISO date-time. */
  startsAt: string;
  durationMin: number;
  joinUrl: string;
}

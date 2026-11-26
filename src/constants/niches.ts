import type { Localized } from '../types/i18n';

/**
 * The niche switch. One template, many course businesses: the words, icons and sample copy change;
 * the screens and data model stay the same. Pick one in config.ts (`NICHE`).
 * Adding a niche = one entry here + seed content in demoData.ts. See docs/NICHES.md.
 */
export type NicheId = 'cooking' | 'fitness' | 'tutoring' | 'music';

export interface Niche {
  id: NicheId;
  /** What the owner teaches, for headings like "A cooking program you can follow at home". */
  subject: Localized;
  /** What one lesson's download is called. */
  resource: Localized;
  resourcePlural: Localized;
  /** Ionicons names. */
  resourceIcon: 'cart-outline' | 'barbell-outline' | 'document-text-outline' | 'musical-notes-outline';
  lessonIcon: 'restaurant-outline' | 'fitness-outline' | 'school-outline' | 'musical-note-outline';
  /** Three short "what you'll get" points for the home page. */
  benefits: [Localized, Localized, Localized];
}

export const NICHES: Record<NicheId, Niche> = {
  cooking: {
    id: 'cooking',
    subject: { es: 'cocina', en: 'cooking' },
    resource: { es: 'Lista del súper', en: 'Grocery list' },
    resourcePlural: { es: 'Listas del súper', en: 'Grocery lists' },
    resourceIcon: 'cart-outline',
    lessonIcon: 'restaurant-outline',
    benefits: [
      { es: 'Videos cortos que sigues paso a paso en tu cocina', en: 'Short videos you follow step by step in your kitchen' },
      { es: 'Una lista del súper lista para cada semana', en: 'A ready-made grocery list for every week' },
      { es: 'Preguntas en vivo cada semana con tu instructora', en: 'Live Q&A with your instructor every week' },
    ],
  },
  fitness: {
    id: 'fitness',
    subject: { es: 'entrenamiento', en: 'fitness' },
    resource: { es: 'Plan de entrenamiento', en: 'Workout plan' },
    resourcePlural: { es: 'Planes de entrenamiento', en: 'Workout plans' },
    resourceIcon: 'barbell-outline',
    lessonIcon: 'fitness-outline',
    benefits: [
      { es: 'Rutinas guiadas en video para hacer en casa o en el gym', en: 'Guided video workouts for home or the gym' },
      { es: 'Un plan descargable para cada semana', en: 'A downloadable plan for every week' },
      { es: 'Sesiones en vivo para resolver tus dudas', en: 'Live sessions to answer your questions' },
    ],
  },
  tutoring: {
    id: 'tutoring',
    subject: { es: 'aprendizaje', en: 'learning' },
    resource: { es: 'Hoja de trabajo', en: 'Worksheet' },
    resourcePlural: { es: 'Hojas de trabajo', en: 'Worksheets' },
    resourceIcon: 'document-text-outline',
    lessonIcon: 'school-outline',
    benefits: [
      { es: 'Clases en video que puedes repetir cuando quieras', en: 'Video lessons you can replay any time' },
      { es: 'Hojas de práctica para cada tema', en: 'Practice worksheets for every topic' },
      { es: 'Horas de dudas en vivo cada semana', en: 'Live office hours every week' },
    ],
  },
  music: {
    id: 'music',
    subject: { es: 'música', en: 'music' },
    resource: { es: 'Partitura', en: 'Sheet music' },
    resourcePlural: { es: 'Partituras', en: 'Sheet music' },
    resourceIcon: 'musical-notes-outline',
    lessonIcon: 'musical-note-outline',
    benefits: [
      { es: 'Lecciones en video a tu ritmo', en: 'Video lessons at your own pace' },
      { es: 'Partituras y ejercicios descargables', en: 'Downloadable sheet music and exercises' },
      { es: 'Clases grupales en vivo para practicar', en: 'Live group classes to practice together' },
    ],
  },
};

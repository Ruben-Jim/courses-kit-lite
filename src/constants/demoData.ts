import type { Course, Lesson, LiveSession } from '../types/course';
import type { Member, WaitlistEntry } from '../types/member';

/**
 * Sample content for demo mode and the package demos (fictional brand, fictional people).
 * In a client build this file is only used for seeding the emulator; real content lives in Firestore.
 */
const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;
const iso = (ms: number) => new Date(ms).toISOString();

/** Next Thursday 6 pm local, so the demo schedule always looks current. */
function nextThursdayAt18(offsetWeeks: number): string {
  const d = new Date();
  d.setHours(18, 0, 0, 0);
  const add = (4 - d.getDay() + 7) % 7 || (Date.now() > d.getTime() ? 7 : 0);
  d.setDate(d.getDate() + add + offsetWeeks * 7);
  return d.toISOString();
}

export const DEMO_COURSES: Course[] = [
  {
    id: 'cocina-real',
    title: { es: 'Cocina Real en 8 Semanas', en: 'Real Cooking in 8 Weeks' },
    summary: {
      es: 'De la despensa básica a menús completos de la semana. Una lección nueva cada semana, con su video y su lista del súper.',
      en: 'From a basic pantry to full weekly menus. A new lesson every week, with its video and grocery list.',
    },
    weeks: 8,
    level: { es: 'Principiante', en: 'Beginner' },
    order: 1,
    published: true,
  },
  {
    id: 'meal-prep',
    title: { es: 'Meal Prep para la Semana', en: 'Meal Prep for the Week' },
    summary: {
      es: 'Dos horas el domingo, comida lista toda la semana. Solo para miembros: sin clase gratis.',
      en: 'Two hours on Sunday, food ready all week. Members only: no free class.',
    },
    weeks: 4,
    level: { es: 'Intermedio', en: 'Intermediate' },
    order: 2,
    published: true,
  },
];

type LessonSeed = [week: number, es: string, en: string, esSum: string, enSum: string, min: number];

const SEEDS: LessonSeed[] = [
  [1, 'Tu despensa básica', 'Your basic pantry', 'Qué tener siempre en casa y cómo organizarlo.', 'What to always keep at home and how to organize it.', 9],
  [1, 'Cuchillo y tabla sin miedo', 'Knife and board without fear', 'Cortes básicos para picar rápido y seguro.', 'Basic cuts to chop fast and safely.', 7],
  [2, 'Arroz y frijoles perfectos', 'Perfect rice and beans', 'La base de mil comidas, bien hecha.', 'The base of a thousand meals, done right.', 11],
  [3, 'Salsas de la semana', 'Salsas for the week', 'Tres salsas que duran toda la semana.', 'Three salsas that last all week.', 8],
  [4, 'Pollo jugoso en una sartén', 'Juicy one-pan chicken', 'Técnica para que nunca quede seco.', 'Technique so it never comes out dry.', 12],
  [5, 'Verduras que sí se comen', 'Vegetables people actually eat', 'Asadas, salteadas y en sopa.', 'Roasted, sautéed and in soup.', 10],
  [6, 'Desayunos para llevar', 'Grab-and-go breakfasts', 'Preparados el domingo, listos toda la semana.', 'Prepped on Sunday, ready all week.', 9],
  [7, 'Cocina para la familia', 'Cooking for the family', 'Porciones grandes sin gastar de más.', 'Big portions without overspending.', 13],
  [8, 'Tu menú de la semana', 'Your weekly menu', 'Junta todo: un plan semanal que repites.', 'Put it all together: a weekly plan you can repeat.', 14],
];

function seedLessons(courseId: string, prefix: string, seeds: LessonSeed[], freeFirst: boolean): Lesson[] {
  return seeds.map(([week, es, en, esSum, enSum, min], i) => ({
    id: `${prefix}${i + 1}`,
    courseId,
    week,
    order: i,
    title: { es, en },
    summary: { es: esSum, en: enSum },
    durationMin: min,
    videoKey: '',
    resources: [
      {
        id: `${prefix}r${i + 1}`,
        label: { es: `Lista del súper · Semana ${week}`, en: `Grocery list · Week ${week}` },
        fileKey: '',
      },
    ],
    isFreeSample: freeFirst && i === 0,
    published: true,
  }));
}

/** Second program: members only (no free class), so the catalog and lesson pages show the paywall. */
const MEAL_PREP_SEEDS: LessonSeed[] = [
  [1, 'Planea tu semana en 15 minutos', 'Plan your week in 15 minutes', 'Menú, lista y horario del domingo.', 'Menu, list and your Sunday schedule.', 10],
  [1, 'Recipientes y almacenamiento', 'Containers and storage', 'Qué dura 3 días y qué dura 5.', 'What lasts 3 days and what lasts 5.', 8],
  [2, 'Proteínas en lote', 'Batch proteins', 'Pollo, carne y frijoles para toda la semana.', 'Chicken, beef and beans for the whole week.', 13],
  [3, 'Bases que se combinan', 'Mix-and-match bases', 'Arroz, verduras y salsas que se arman distinto cada día.', 'Rice, vegetables and salsas you combine differently each day.', 11],
  [4, 'Tu domingo de meal prep', 'Your meal prep Sunday', 'Todo junto, de principio a fin, en dos horas.', 'Everything together, start to finish, in two hours.', 16],
];

export const DEMO_LESSONS: Lesson[] = [
  ...seedLessons('cocina-real', 'l', SEEDS, true),
  ...seedLessons('meal-prep', 'mp', MEAL_PREP_SEEDS, false),
];

export const DEMO_SESSIONS: LiveSession[] = [0, 1, 2].map((w) => ({
  id: `s${w + 1}`,
  title: { es: 'Preguntas en vivo con Lupita', en: 'Live Q&A with Lupita' },
  startsAt: nextThursdayAt18(w),
  durationMin: 45,
  joinUrl: 'https://zoom.us/j/0000000000',
}));

/** The demo member joined 17 days ago, so weeks 1–3 are open. */
export const DEMO_MEMBER: Member = {
  uid: 'demo-member',
  name: 'Ana',
  email: 'ana@example.com',
  plan: 'yearly',
  status: 'active',
  currentPeriodEnd: iso(now + 348 * DAY),
  joinedAt: iso(now - 17 * DAY),
  lang: 'es',
};

export const DEMO_MEMBERS: Member[] = [
  DEMO_MEMBER,
  { uid: 'm2', name: 'Carlos Méndez', email: 'carlos@example.com', plan: 'monthly', status: 'active', currentPeriodEnd: iso(now + 12 * DAY), joinedAt: iso(now - 48 * DAY), lang: 'es' },
  { uid: 'm3', name: 'Jessica Lee', email: 'jessica@example.com', plan: 'monthly', status: 'past_due', currentPeriodEnd: iso(now - 2 * DAY), joinedAt: iso(now - 70 * DAY), lang: 'en' },
  { uid: 'm4', name: 'Rosa Gutiérrez', email: 'rosa@example.com', plan: 'yearly', status: 'active', currentPeriodEnd: iso(now + 200 * DAY), joinedAt: iso(now - 165 * DAY), lang: 'es' },
  { uid: 'm5', name: 'Mike Torres', email: 'mike@example.com', plan: 'monthly', status: 'canceled', currentPeriodEnd: iso(now - 20 * DAY), joinedAt: iso(now - 95 * DAY), lang: 'en' },
];

export const DEMO_COMPLETED: string[] = ['l1', 'l2'];

export const DEMO_WAITLIST: WaitlistEntry[] = [
  { id: 'w1', name: 'Paola Ruiz', email: 'paola@example.com', phone: '', message: 'Quiero aprender a cocinar para mis hijos.', lang: 'es', createdAt: iso(now - 1 * DAY) },
  { id: 'w2', name: 'Daniel Kim', email: 'daniel@example.com', phone: '', message: 'Meal prep for the week.', lang: 'en', createdAt: iso(now - 3 * DAY) },
  { id: 'w3', name: 'Lucía Morales', email: 'lucia@example.com', phone: '(559) 555-0142', message: '', lang: 'es', createdAt: iso(now - 6 * DAY) },
];

/**
 * Feature tiers: one codebase, features switched on or off here. Useful if you sell the same
 * course platform at different price points to your own clients.
 *
 *   starter       One page (program, instructor, reviews, FAQ) + waitlist + owner inbox.
 *   multi-page    Adds the course catalog, curriculum pages and a free sample lesson.
 *   website-app   Adds the owner app (iOS/Android) with push alerts on new waitlist sign-ups.
 *   growth        Paid memberships, members area (lessons, videos, downloads, live Q&A),
 *                 lesson/member/session management. (Default: everything on.)
 *
 * Below growth every "Join" button becomes "Join the waitlist".
 * Try a tier locally: EXPO_PUBLIC_PLAN=multi-page npx expo start --web --clear
 */
export type CwrPlan = 'starter' | 'multi-page' | 'website-app' | 'growth';

const PLAN_DEFAULT: CwrPlan = 'growth';

export const PLAN_ORDER: CwrPlan[] = ['starter', 'multi-page', 'website-app', 'growth'];

export function parsePlan(raw: string | undefined): CwrPlan {
  const value = (raw ?? '').trim().toLowerCase();
  return (PLAN_ORDER as string[]).includes(value) ? (value as CwrPlan) : PLAN_DEFAULT;
}

/** Lite: fixed at multi-page (public site only). Memberships, members area and owner tools are in Courses Kit Pro. */
export const PLAN: CwrPlan = 'multi-page';

/** Lowest plan that includes each feature. */
const FEATURE_MIN_PLAN = {
  /** Course catalog and per-course curriculum pages. */
  coursePages: 'multi-page',
  /** A free sample lesson anyone can watch on the course page. */
  freeSample: 'growth',
  /** Owner app on iOS/Android + push alerts on new waitlist sign-ups (delivery-level; see docs). */
  ownerApp: 'website-app',
  /** Paid memberships: checkout, billing portal, members area, member apps. */
  memberships: 'growth',
  /** Owner tools: lessons and uploads, members, live Q&A sessions. */
  operations: 'growth',
} as const satisfies Record<string, CwrPlan>;

export type PlanFeature = keyof typeof FEATURE_MIN_PLAN;

export function planAtLeast(min: CwrPlan, plan: CwrPlan = PLAN): boolean {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf(min);
}

export function planHas(feature: PlanFeature, plan: CwrPlan = PLAN): boolean {
  return planAtLeast(FEATURE_MIN_PLAN[feature], plan);
}

/** Routes (first path segment) and the feature each needs. Unlisted routes are always on (/login stays: the owner signs in on every package). */
const ROUTE_FEATURE: Record<string, PlanFeature> = {
  courses: 'coursePages',
  join: 'memberships',
  welcome: 'memberships',
  members: 'memberships',
};

export function isRouteEnabled(href: string, plan: CwrPlan = PLAN): boolean {
  const seg = href.replace(/^\/+/, '').split(/[/?#]/)[0];
  const feature = ROUTE_FEATURE[seg];
  return feature ? planHas(feature, plan) : true;
}

/** Admin tabs kept below Growth: the overview and the waitlist inbox. */
const BASIC_ADMIN_TABS = ['overview', 'waitlist'];

export function isAdminTabEnabled(id: string, plan: CwrPlan = PLAN): boolean {
  return planHas('operations', plan) || BASIC_ADMIN_TABS.includes(id);
}

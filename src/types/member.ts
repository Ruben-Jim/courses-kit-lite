import type { Lang } from './i18n';

/** Written by the server only (payment webhook). The client never sets it. */
export type MembershipStatus = 'active' | 'past_due' | 'canceled' | 'none';

export type MembershipPlanId = 'monthly' | 'yearly';

export interface Member {
  uid: string;
  name: string;
  email: string;
  plan: MembershipPlanId | null;
  status: MembershipStatus;
  /** ISO date the current paid period ends. */
  currentPeriodEnd: string | null;
  joinedAt: string;
  lang: Lang;
}

/** Someone who asked to hear about the next cohort (every package below Growth, and Growth's pre-launch). */
export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  lang: Lang;
  createdAt: string;
}

/** Who is signed in, as far as the UI is concerned. Rules enforce the real boundary. */
export type SessionRole = 'guest' | 'member' | 'admin';

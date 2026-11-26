import { demoDb } from '../store/demoStore';
import type { WaitlistEntry } from '../types/member';
import type { WaitlistInput } from '../utils/validation';

/** MOCK — replace with your backend. Public: anyone can join (no login). */
export async function joinWaitlist(input: WaitlistInput): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
  const entry: WaitlistEntry = { ...input, id: `w${Date.now()}`, createdAt: new Date().toISOString() };
  demoDb.set({ waitlist: [entry, ...demoDb.get().waitlist] });
}

/** MOCK — owner only in a real backend. */
export async function listWaitlist(): Promise<WaitlistEntry[]> {
  return demoDb.get().waitlist;
}

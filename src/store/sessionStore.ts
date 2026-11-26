import { create } from 'zustand';
import type { Member, SessionRole } from '../types/member';

export type SessionStatus = 'loading' | 'ready';

interface SessionState {
  status: SessionStatus;
  role: SessionRole;
  /** Signed in but no active membership (show "no access"). */
  signedInWithoutAccess: boolean;
  email: string | null;
  member: Member | null;
  set: (patch: Partial<Omit<SessionState, 'set'>>) => void;
}

/**
 * Who is signed in, for the UI only. Firestore/Storage rules and the Functions check custom claims;
 * nothing here grants access to data.
 */
export const useSessionStore = create<SessionState>()((set) => ({
  status: 'loading',
  role: 'guest',
  signedInWithoutAccess: false,
  email: null,
  member: null,
  set: (patch) => set(patch),
}));

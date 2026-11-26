import { useEffect } from 'react';
import { useSessionStore } from '../store/sessionStore';

/**
 * Mounted once in the root layout. Turns your auth state into the UI session.
 * Kit: starts signed out; the login screen lets you look around as a member or the owner.
 * With a real backend, subscribe to your auth provider here and call set({ role, member, email }).
 */
export function useSessionBootstrap(): void {
  const set = useSessionStore((s) => s.set);
  useEffect(() => {
    set({ status: 'ready' });
  }, [set]);
}

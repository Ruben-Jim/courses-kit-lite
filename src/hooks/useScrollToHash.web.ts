import { useEffect } from 'react';

/**
 * `/#waitlist` and `/courses/x#sample` links: scroll there once the section has rendered
 * (sections that need data appear after mount, so the browser's own jump misses them).
 */
export function useScrollToHash(ready: boolean): void {
  useEffect(() => {
    if (!ready) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [ready]);
}

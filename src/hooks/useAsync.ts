import { useCallback, useEffect, useRef, useState } from 'react';

export interface AsyncState<T> {
  data: T | null;
  error: boolean;
  loading: boolean;
  reload: () => void;
}

/**
 * Runs a service call after mount (never during static render) and re-runs when `key` changes.
 * Pass `enabled: false` to wait (e.g. until the session is known).
 */
export function useAsync<T>(load: () => Promise<T>, key: string, enabled = true): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(enabled);
  const [tick, setTick] = useState(0);
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    setLoading(true);
    setError(false);
    loadRef
      .current()
      .then((value) => {
        if (alive) setData(value);
      })
      .catch(() => {
        if (alive) setError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [key, enabled, tick]);

  const reload = useCallback(() => setTick((n) => n + 1), []);
  return { data, error, loading, reload };
}

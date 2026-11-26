import { useEffect } from 'react';
import { useLangStore } from '../store/langStore';

/** Keeps <html lang> in step with the toggle (screen readers, translation prompts). */
export function useHtmlLang(): void {
  const lang = useLangStore((s) => s.lang);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}

import { useCallback } from 'react';
import { STRINGS, type StringKey } from '../constants/strings';
import { useLangStore } from '../store/langStore';
import type { Lang, Localized } from '../types/i18n';
import { interpolate } from '../utils/interpolate';

export interface Translator {
  lang: Lang;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  pick: (text: Localized) => string;
}

export function useT(): Translator {
  const lang = useLangStore((s) => s.lang);
  const t = useCallback(
    (key: StringKey, vars?: Record<string, string | number>) => interpolate(STRINGS[lang][key], vars),
    [lang]
  );
  const pick = useCallback((text: Localized) => text[lang] || text.es || text.en, [lang]);
  return { lang, t, pick };
}

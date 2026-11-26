import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Lang } from '../types/i18n';

/** Default language for the static HTML and first visit. A client build can flip it to 'es'. */
export const DEFAULT_LANG: Lang = 'en';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

/** A saved choice applies after hydration; the static HTML always renders DEFAULT_LANG. */
export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: DEFAULT_LANG,
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'cwr-courses-lang-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ lang: s.lang }),
      merge: (saved, current) => {
        const lang = typeof saved === 'object' && saved !== null && 'lang' in saved ? saved.lang : undefined;
        return { ...current, lang: lang === 'en' || lang === 'es' ? lang : DEFAULT_LANG };
      },
    }
  )
);

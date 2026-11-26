import { Pressable, Text, View } from 'react-native';
import { useT } from '../../hooks/useT';
import { useLangStore } from '../../store/langStore';
import type { Lang } from '../../types/i18n';

const OPTIONS: { lang: Lang; label: string; name: string }[] = [
  { lang: 'es', label: 'ES', name: 'Español' },
  { lang: 'en', label: 'EN', name: 'English' },
];

/** Two 44px segments. Owner content and UI both switch. */
export function LangToggle() {
  const { t } = useT();
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={t('language')} className="flex-row rounded-full border-2 border-ink overflow-hidden">
      {OPTIONS.map((o) => {
        const on = o.lang === lang;
        return (
          <Pressable
            key={o.lang}
            onPress={() => setLang(o.lang)}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            accessibilityLabel={o.name}
            className={`min-w-[44px] min-h-[40px] px-3 items-center justify-center ${on ? 'bg-ink' : 'bg-surface'}`}
          >
            <Text className={`font-body-bold text-sm ${on ? 'text-cream' : 'text-ink'}`}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import { Text, View } from 'react-native';
import { SHOW_DEMO_BANNER } from '../../constants/config';
import { useT } from '../../hooks/useT';

/** Makes it obvious the demo's people, prices and content are samples. */
export function DemoBanner() {
  const { t } = useT();
  if (!SHOW_DEMO_BANNER) return null;
  return (
    <View className="bg-saffron px-4 py-1.5 items-center">
      <Text className="font-body-bold text-ink text-xs">{t('demoBanner')}</Text>
    </View>
  );
}

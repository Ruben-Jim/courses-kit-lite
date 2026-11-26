import { Text, View } from 'react-native';
import { useT } from '../../../hooks/useT';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';

export function HowItWorks() {
  const { t } = useT();
  const steps = [t('howStep1'), t('howStep2'), t('howStep3')];
  return (
    <View className="py-14 md:py-20 bg-surface border-y border-border">
      <Container className="gap-10">
        <Eyebrow index="03" label={t('eyebrowHow')} />
        <View className="flex-col md:flex-row gap-8 md:gap-6">
          {steps.map((step, i) => (
            <View key={i} className="flex-1 gap-4">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-ink items-center justify-center">
                  <Text className="font-display text-cream text-xl">{i + 1}</Text>
                </View>
                {i < steps.length - 1 ? <View className="hidden md:flex flex-1 h-px bg-border" /> : null}
              </View>
              <Text className="font-display text-ink text-[22px] leading-8 pr-6">{step}</Text>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}

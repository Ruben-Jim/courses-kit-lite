import { Text, View } from 'react-native';
import { BRAND } from '../../../constants/config';
import { useT } from '../../../hooks/useT';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';

/** Split layout: a big monogram block (until the client sends a real portrait — no AI people) and the bio. */
export function AboutInstructor() {
  const { t, pick } = useT();
  return (
    <View className="py-14 md:py-20">
      <Container>
        <View className="flex-col md:flex-row gap-8 md:gap-16 md:items-center">
          <View className="md:w-[42%] aspect-square rounded-[32px] bg-saffron items-center justify-center overflow-hidden" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Text className="font-display text-ink text-[140px] md:text-[200px] leading-[160px] md:leading-[220px] tracking-tighter">{BRAND.instructorInitials}</Text>
            <Text className="absolute bottom-5 left-6 font-body-bold text-ink/70 text-xs uppercase tracking-[2px]">{BRAND.name}</Text>
          </View>
          <View className="flex-1 gap-6">
            <Eyebrow index="04" label={t('eyebrowInstructor')} />
            <Text className="font-display text-ink text-[34px] leading-[40px] md:text-[48px] md:leading-[52px]">{BRAND.instructor}</Text>
            <Text className="font-body text-ink text-lg leading-8 max-w-[560px]">{pick(BRAND.about)}</Text>
          </View>
        </View>
      </Container>
    </View>
  );
}

import { Text, View } from 'react-native';
import { TESTIMONIALS } from '../../../constants/config';
import { useT } from '../../../hooks/useT';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';

export function Testimonials() {
  const { t, pick } = useT();
  if (!TESTIMONIALS.length) return null;
  return (
    <View className="py-14 md:py-20 bg-herb">
      <Container className="gap-10">
        <Eyebrow index="05" label={t('eyebrowReviews')} onDark />
        <View className="flex-col md:flex-row gap-10 md:gap-16">
          {TESTIMONIALS.map((item) => (
            <View key={item.name} className="flex-1 gap-5">
              <Text className="font-display text-saffron text-[72px] leading-[56px]">“</Text>
              <Text className="font-display text-cream text-[24px] leading-[34px] md:text-[30px] md:leading-[40px]">{pick(item.quote)}</Text>
              <Text className="font-body-bold text-cream/70 text-sm uppercase tracking-[2px]">{item.name}</Text>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}

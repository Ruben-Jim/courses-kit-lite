import { Text, View } from 'react-native';
import { HOME_COPY } from '../../../constants/config';
import { useT } from '../../../hooks/useT';
import { planHas } from '../../../lib/plan';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';

/** Closing call to action before the footer. */
export function CtaBand() {
  const { t, pick } = useT();
  const memberships = planHas('memberships');
  return (
    <View className="px-2 md:px-4">
      <View className="grain rounded-[28px] md:rounded-[36px] bg-ink py-16 md:py-24">
        <Container className="gap-6 items-start">
          <Text className="font-display text-cream text-[38px] leading-[44px] md:text-[64px] md:leading-[68px] tracking-tight max-w-[900px]">{pick(HOME_COPY.ctaBandTitle)}</Text>
          <Text className="font-body text-cream/75 text-lg max-w-[520px]">{memberships ? t('ctaBandBody') : t('ctaBandBodyWaitlist')}</Text>
          <Button size="lg" label={t('heroCtaWaitlist')} href="/#waitlist" />
        </Container>
      </View>
    </View>
  );
}

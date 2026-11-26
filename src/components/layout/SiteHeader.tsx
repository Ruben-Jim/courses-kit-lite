import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BRAND } from '../../constants/config';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useT } from '../../hooks/useT';
import { planHas } from '../../lib/plan';
import { DemoBanner } from '../features/DemoBanner';
import { Button } from '../ui/Button';
import { BrandMark } from '../ui/BrandMark';
import { LangToggle } from '../ui/LangToggle';

/** Public header. Sticky on web (.site-header), solid cream so iOS 26 samples the right tint. */
export function SiteHeader() {
  const { t } = useT();
  const bp = useBreakpoint();
  const phone = bp === 'phone';
  const insets = useSafeAreaInsets();

  return (
    <View role="banner" className="site-header bg-cream border-b border-border" style={{ paddingTop: insets.top }}>
      <DemoBanner />
      <View className="w-full max-w-content self-center flex-row items-center gap-3 px-4 md:px-6 min-h-[64px]">
        <Link href="/" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel={BRAND.name} className="flex-1 min-h-[44px] flex-row items-center gap-2.5 active:opacity-80">
            <BrandMark size={phone ? 32 : 36} />
            <Text className="shrink font-display text-ink text-[22px] md:text-[26px]" numberOfLines={1}>
              {phone ? BRAND.shortName : BRAND.name}
            </Text>
          </Pressable>
        </Link>

        {!phone && planHas('coursePages') ? (
          <Link href="/courses" asChild>
            <Pressable accessibilityRole="link" className="min-h-[44px] px-3 justify-center active:opacity-70">
              <Text className="font-body-bold text-ink text-base">{t('navCourses')}</Text>
            </Pressable>
          </Link>
        ) : null}


        <LangToggle />

        {!phone ? (
          <Button
            align="center"
            label={t('heroCtaWaitlist')}
            href="/#waitlist"
          />
        ) : null}
      </View>
    </View>
  );
}

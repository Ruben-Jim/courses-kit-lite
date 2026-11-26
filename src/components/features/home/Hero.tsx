import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Platform, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { palette } from '../../../constants/colors';
import { BRAND, LIVE_QA_SUMMARY } from '../../../constants/config';
import { MEDIA } from '../../../constants/media';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { useT } from '../../../hooks/useT';
import { planHas } from '../../../lib/plan';
import type { Course, Lesson } from '../../../types/course';
import { BackgroundVideo } from '../../ui/BackgroundVideo';
import { Button } from '../../ui/Button';
import { Eyebrow } from '../../ui/Eyebrow';

interface HeroProps {
  course: Course | null;
  lessons: Lesson[];
}

/**
 * Framed full-bleed video hero (vertical clip on phones, landscape from 768px). Headline bottom-left,
 * magazine style; the free class sits as a frosted chip bottom-right on wide screens.
 */
export function Hero({ course, lessons }: HeroProps) {
  const { t, pick } = useT();
  const bp = useBreakpoint();
  const phone = bp === 'phone';
  const { height } = useWindowDimensions();
  // Web sizes the stage with svh in CSS (.hero-stage); native has no CSS, so it gets a height here.
  const nativeHeight = Platform.OS === 'web' ? undefined : { height: Math.max(520, height * 0.78) };
  const memberships = planHas('memberships');
  const sample = planHas('freeSample') ? lessons.find((l) => l.isFreeSample) : undefined;

  return (
    <View className="px-2 pt-2 md:px-4 md:pt-4">
      <View className="hero-stage rounded-[28px] md:rounded-[36px] bg-ink overflow-hidden" style={nativeHeight}>
        <BackgroundVideo
          src={phone ? MEDIA.heroPortrait : MEDIA.heroLandscape}
          poster={phone ? MEDIA.heroPortraitPoster : MEDIA.heroLandscapePoster}
        />
        <View className="hero-scrim" />

        <View className="absolute inset-0 justify-end">
          <View className="w-full max-w-content self-center px-5 pb-7 md:px-10 md:pb-12">
            <View className={phone ? 'gap-5' : 'flex-row items-end gap-10'}>
              <View className="flex-1 gap-5">
                <Eyebrow onDark label={course ? `${pick(course.level)} · ${t('weeksCount', { count: course.weeks })}` : t('eyebrowProgram')} />
                <Text
                  accessibilityRole="header"
                  aria-level={1}
                  className="font-display text-cream text-[44px] leading-[46px] md:text-[76px] md:leading-[76px] tracking-tight max-w-[880px]"
                >
                  {pick(BRAND.tagline)}
                </Text>
                <View className="flex-row flex-wrap items-center gap-3 pt-1">
                  <Button size="lg" align="center" label={t('heroCtaWaitlist')} href="/#waitlist" />
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="videocam" size={16} color={palette.saffron} />
                    <Text className="font-body-bold text-cream/85 text-sm">{pick(LIVE_QA_SUMMARY)}</Text>
                  </View>
                </View>
              </View>

              {sample && course && !phone ? (
                <Link href={`/courses/${course.id}#sample`} asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={t('heroCtaSample')}
                    className="glass flex-row items-center gap-3 self-end rounded-full py-2 pl-2 pr-5 active:opacity-80 border border-cream/20"
                  >
                    <View className="w-11 h-11 rounded-full bg-cream items-center justify-center">
                      <Ionicons name="play" size={18} color={palette.ink} />
                    </View>
                    <View>
                      <Text className="font-body-bold text-cream text-sm">{t('heroCtaSample')}</Text>
                      <Text className="font-body text-cream/70 text-xs">{t('freeClassChip', { min: sample.durationMin })}</Text>
                    </View>
                  </Pressable>
                </Link>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

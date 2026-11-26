import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { palette } from '../../../constants/colors';
import { HOME_COPY, LIVE_QA_SUMMARY, NICHE } from '../../../constants/config';
import { MEDIA } from '../../../constants/media';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { useT } from '../../../hooks/useT';
import { BackgroundVideo } from '../../ui/BackgroundVideo';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';

/**
 * "What's included" as an asymmetric bento grid instead of three equal cards:
 * a wide video tile, a tall checklist tile (the niche's download), and three small tiles.
 */
export function Bento() {
  const { t, pick, lang } = useT();
  const wide = useBreakpoint() !== 'phone';
  const list = HOME_COPY.listPreview[lang];

  const videoTile = (
    <View className="rounded-[28px] overflow-hidden bg-ink" style={{ minHeight: wide ? 340 : 300, flex: wide ? 2 : undefined }}>
      <BackgroundVideo src={MEDIA.sampleLesson} poster={MEDIA.sampleLessonPoster} />
      <View className="hero-scrim" />
      <View className="absolute inset-0 justify-between p-6">
        <View className="glass self-start flex-row items-center gap-2 rounded-full px-3 py-1.5 border border-cream/20">
          <Ionicons name={NICHE.lessonIcon} size={14} color={palette.cream} />
          <Text className="font-body-bold text-cream text-xs">{t('sampleVideoNote')}</Text>
        </View>
        <View className="gap-1">
          <Text className="font-display text-cream text-[28px] leading-8 md:text-[34px] md:leading-[38px] max-w-[420px]">{t('tileVideoTitle')}</Text>
          <Text className="font-body text-cream/80 text-base">{t('tileVideoBody')}</Text>
        </View>
      </View>
    </View>
  );

  const listTile = (
    <View className="rounded-[28px] bg-saffron-soft p-6 gap-4" style={{ flex: wide ? 1 : undefined }}>
      <View className="flex-row items-center justify-between">
        <Text className="font-display text-ink text-[26px] leading-8">{t('tileListTitle')}</Text>
        <Ionicons name={NICHE.resourceIcon} size={24} color={palette.ink} />
      </View>
      <View className="rounded-2xl bg-surface p-4 gap-3" style={{ transform: [{ rotate: '-1.5deg' }], boxShadow: '0 10px 24px rgba(34,32,28,0.08)' }}>
        <Text className="font-body-bold text-muted text-xs uppercase tracking-[2px]">{pick(NICHE.resource)} · {t('weekLabel', { week: 2 })}</Text>
        {list.map((item, i) => (
          <View key={item} className="flex-row items-center gap-3">
            <View className={`w-5 h-5 rounded-md items-center justify-center ${i < 3 ? 'bg-herb' : 'border-2 border-border'}`}>
              {i < 3 ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
            </View>
            <Text className={`font-body text-base ${i < 3 ? 'text-muted line-through' : 'text-ink'}`}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const small = (bg: string, icon: 'videocam' | 'language' | 'phone-portrait-outline', title: string, body: string, color: string, textClass: string) => (
    <View className={`rounded-[28px] p-6 gap-6 justify-between ${bg}`} style={{ flex: wide ? 1 : undefined, minHeight: 190 }}>
      <Ionicons name={icon} size={26} color={color} />
      <View className="gap-1">
        <Text className={`font-display text-[24px] leading-7 ${textClass}`}>{title}</Text>
        <Text className={`font-body text-sm leading-5 ${textClass} opacity-80`}>{body}</Text>
      </View>
    </View>
  );

  return (
    <View className="py-14 md:py-20 anchor-section" nativeID="included">
      <Container className="gap-8">
        <Eyebrow index="01" label={t('eyebrowIncluded')} />
        <View className={wide ? 'flex-row gap-4' : 'gap-4'}>
          {videoTile}
          {listTile}
        </View>
        <View className={wide ? 'flex-row gap-4' : 'gap-4'}>
          {small('bg-herb', 'videocam', t('tileLiveTitle'), pick(LIVE_QA_SUMMARY), palette.cream, 'text-cream')}
          {small('bg-surface border border-border', 'language', t('tileLangTitle'), t('tileLangBody'), palette.tomato, 'text-ink')}
          {small('bg-tomato-soft', 'phone-portrait-outline', t('tileDeviceTitle'), t('planIncludes3'), palette.tomato, 'text-ink')}
        </View>
      </Container>
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Head from 'expo-router/head';
import { Pressable, Text, View } from 'react-native';
import { PageShell } from '../../src/components/layout/PageShell';
import { Container } from '../../src/components/ui/Container';
import { Eyebrow } from '../../src/components/ui/Eyebrow';
import { ErrorState, LoadingState } from '../../src/components/ui/StateViews';
import { palette } from '../../src/constants/colors';
import { BRAND } from '../../src/constants/config';
import { useAsync } from '../../src/hooks/useAsync';
import { useT } from '../../src/hooks/useT';
import { planHas } from '../../src/lib/plan';
import { Badge } from '../../src/components/ui/Badge';
import { listCourses, listLessons } from '../../src/services/contentService';

/** Catalog (Multi-Page and up). Most clients have one program; the list scales to several. */
export default function CoursesIndex() {
  const { t, pick } = useT();
  const data = useAsync(async () => {
    const [courses, lessons] = await Promise.all([listCourses(), listLessons()]);
    return courses.map((c) => {
      const own = lessons.filter((l) => l.courseId === c.id);
      return { course: c, count: own.length, hasSample: own.some((l) => l.isFreeSample) };
    });
  }, 'catalog');

  return (
    <PageShell>
      <Head>
        <title>{`${t('coursesTitle')} · ${BRAND.name}`}</title>
        <meta name="description" content={t('coursesSubtitle')} />
      </Head>
      <Container className="pt-12 md:pt-20 pb-10 gap-10">
        <View className="gap-5">
          <Eyebrow label={t('eyebrowProgram')} />
          <Text accessibilityRole="header" aria-level={1} className="font-display text-ink text-[44px] leading-[48px] md:text-[80px] md:leading-[80px] tracking-tight">
            {t('coursesTitle')}
          </Text>
          <Text className="font-body text-muted text-lg md:text-xl leading-8 max-w-[600px]">{t('coursesSubtitle')}</Text>
        </View>
        {data.loading ? (
          <LoadingState label={t('loading')} variant="list" />
        ) : data.error ? (
          <ErrorState message={t('waitlistError')} retryLabel={t('retry')} onRetry={data.reload} />
        ) : (
          <View className="border-t border-ink">
            {(data.data ?? []).map(({ course, count, hasSample }, i) => {
              const free = hasSample && planHas('freeSample');
              return (
                <Link key={course.id} href={`/courses/${course.id}`} asChild>
                  <Pressable accessibilityRole="link" className="flex-row gap-5 md:gap-12 py-8 md:py-10 border-b border-border active:bg-surface">
                    <Text className="w-12 md:w-24 font-display text-tomato text-[36px] leading-10 md:text-[64px] md:leading-[64px]">
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    <View className="flex-1 gap-3">
                      <View className="flex-row flex-wrap items-center gap-2">
                        {free ? (
                          <Badge label={t('freeSampleBadge')} tone="tomato" />
                        ) : (
                          <View className="flex-row items-center gap-1.5 rounded-full bg-ink px-3 py-1">
                            <Ionicons name="lock-closed" size={12} color={palette.cream} />
                            <Text className="font-body-bold text-cream text-xs">{t('catalogMembersOnly')}</Text>
                          </View>
                        )}
                        <Text className="font-body-bold text-muted text-sm">
                          {pick(course.level)} · {t('weeksCount', { count: course.weeks })} · {t('lessonsCount', { count })}
                        </Text>
                      </View>
                      <Text className="font-display text-ink text-[30px] leading-9 md:text-[48px] md:leading-[52px] tracking-tight">{pick(course.title)}</Text>
                      <Text className="font-body text-muted text-base md:text-lg leading-7 max-w-[640px]">{pick(course.summary)}</Text>
                      <View className="flex-row items-center gap-1.5 pt-1">
                        <Text className="font-body-bold text-ink text-base">{t('catalogOpen')}</Text>
                        <Ionicons name="arrow-forward" size={18} color={palette.ink} />
                      </View>
                    </View>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        )}
      </Container>
    </PageShell>
  );
}

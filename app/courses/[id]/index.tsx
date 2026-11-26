import { useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Linking, Platform, Text, View } from 'react-native';
import { ProgramList } from '../../../src/components/features/home/ProgramList';
import { PageShell } from '../../../src/components/layout/PageShell';
import { Button } from '../../../src/components/ui/Button';
import { Container } from '../../../src/components/ui/Container';
import { Eyebrow } from '../../../src/components/ui/Eyebrow';
import { LoadingState } from '../../../src/components/ui/StateViews';
import { SELLS_MEMBERSHIPS } from '../../../src/constants/commerce';
import { BRAND, LIVE_QA_SUMMARY, PRO_KIT_URL } from '../../../src/constants/config';
import { DEMO_COURSES } from '../../../src/constants/demoData';
import { useProgram } from '../../../src/hooks/useProgram';
import { useScrollToHash } from '../../../src/hooks/useScrollToHash';
import { useT } from '../../../src/hooks/useT';
import { planHas } from '../../../src/lib/plan';

/**
 * Static export pre-renders one page per course id. A client build lists its own ids here
 * (or reads them from a seed file) — see docs/SETUP.md.
 */
export function generateStaticParams(): { id: string }[] {
  return DEMO_COURSES.map((c) => ({ id: c.id }));
}

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, pick } = useT();
  const program = useProgram(id);
  const course = program.data?.course ?? null;
  const lessons = program.data?.lessons ?? [];
  const memberships = planHas('memberships');
  const showCta = Platform.OS === 'web' || SELLS_MEMBERSHIPS || !memberships;
  useScrollToHash(!program.loading);

  return (
    <PageShell>
      <Head>
        <title>{course ? `${pick(course.title)} · ${BRAND.name}` : BRAND.name}</title>
        {course ? <meta name="description" content={pick(course.summary)} /> : null}
      </Head>
      {program.loading ? (
        <LoadingState label={t('loading')} />
      ) : !course ? (
        <Container className="py-16 gap-5">
          <Text className="font-body text-ink text-lg">{t('courseNotFound')}</Text>
          <Button label={t('backToProgram')} href="/courses" variant="secondary" />
        </Container>
      ) : (
        <>
          <Container className="pt-12 md:pt-20 pb-4 gap-6">
            <Eyebrow label={`${pick(course.level)} · ${t('weeksCount', { count: course.weeks })} · ${t('lessonsCount', { count: lessons.length })}`} />
            <Text accessibilityRole="header" aria-level={1} className="font-display text-ink text-[44px] leading-[48px] md:text-[80px] md:leading-[80px] tracking-tight max-w-[1000px]">
              {pick(course.title)}
            </Text>
            <View className="flex-col md:flex-row gap-6 md:items-end md:justify-between">
              <Text className="font-body text-muted text-lg md:text-xl leading-8 max-w-[600px]">{pick(course.summary)}</Text>
              {showCta ? (
                <View>
                  <Button size="lg" label={t('heroCtaWaitlist')} href="/#waitlist" />
                </View>
              ) : null}
            </View>
            <Text className="font-body-bold text-herb text-sm">{pick(LIVE_QA_SUMMARY)}</Text>
          </Container>

          <View className="px-2 md:px-4 pt-8">
            <View className="w-full max-w-[1200px] self-center rounded-[28px] bg-ink p-8 md:p-12 gap-4">
              <Text className="font-body-bold text-saffron text-sm uppercase tracking-[2px]">Courses Kit Pro</Text>
              <Text className="font-display text-cream text-[28px] leading-[34px] md:text-[40px] md:leading-[46px] max-w-[760px]">
                Lesson player, free sample class, members area and owner dashboard are in the full kit.
              </Text>
              <View className="flex-row">
                <Button size="lg" label="Get the full kit" icon="arrow-forward" onPress={() => Linking.openURL(PRO_KIT_URL)} />
              </View>
            </View>
          </View>

          <ProgramList course={course} lessons={lessons} index="01" hideHeader />
        </>
      )}
    </PageShell>
  );
}

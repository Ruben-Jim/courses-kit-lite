import Head from 'expo-router/head';
import { Platform } from 'react-native';
import { AboutInstructor } from '../src/components/features/home/AboutInstructor';
import { Bento } from '../src/components/features/home/Bento';
import { CtaBand } from '../src/components/features/home/CtaBand';
import { Faq } from '../src/components/features/home/Faq';
import { Hero } from '../src/components/features/home/Hero';
import { HowItWorks } from '../src/components/features/home/HowItWorks';
import { LessonTicker } from '../src/components/features/home/LessonTicker';
import { Manifesto } from '../src/components/features/home/Manifesto';
import { ProgramList } from '../src/components/features/home/ProgramList';
import { Testimonials } from '../src/components/features/home/Testimonials';
import { StickyJoinBar } from '../src/components/features/StickyJoinBar';
import { WaitlistForm } from '../src/components/features/WaitlistForm';
import { PageShell } from '../src/components/layout/PageShell';
import { SELLS_MEMBERSHIPS } from '../src/constants/commerce';
import { BRAND } from '../src/constants/config';
import { useBreakpoint } from '../src/hooks/useBreakpoint';
import { useProgram } from '../src/hooks/useProgram';
import { useScrollToHash } from '../src/hooks/useScrollToHash';
import { useT } from '../src/hooks/useT';
import { planHas } from '../src/lib/plan';

/**
 * The one page of the Starter package and the landing page of every package above it. Editorial
 * layout: video hero → ticker → statement → bento → program index → how → instructor → reviews →
 * plans (Growth, web) or waitlist → FAQ → closing band.
 */
export default function Home() {
  const { pick } = useT();
  const phone = useBreakpoint() === 'phone';
  const program = useProgram();
  const course = program.data?.course ?? null;
  const lessons = program.data?.lessons ?? [];
  const memberships = planHas('memberships');
  useScrollToHash(!program.loading);

  const showStickyBar = phone && Platform.OS === 'web' && (!memberships || SELLS_MEMBERSHIPS);

  return (
    <PageShell overlay={showStickyBar ? <StickyJoinBar /> : null}>
      <Head>
        <title>{`${BRAND.name} · ${pick(BRAND.tagline)}`}</title>
        <meta name="description" content={pick(BRAND.tagline)} />
        <meta property="og:title" content={BRAND.name} />
        <meta property="og:description" content={pick(BRAND.tagline)} />
        <link rel="canonical" href={BRAND.siteUrl} />
      </Head>
      <Hero course={course} lessons={lessons} />
      <LessonTicker lessons={lessons} />
      <Manifesto course={course} lessons={lessons} />
      <Bento />
      {course ? <ProgramList course={course} lessons={lessons} limitWeeks={planHas('coursePages') ? 4 : undefined} /> : null}
      <HowItWorks />
      <AboutInstructor />
      <Testimonials />
      {!memberships ? <WaitlistForm /> : null}
      <Faq />
      <CtaBand />
    </PageShell>
  );
}

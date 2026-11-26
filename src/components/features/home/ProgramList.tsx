import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { palette } from '../../../constants/colors';
import { useT } from '../../../hooks/useT';
import { planHas } from '../../../lib/plan';
import type { Course, Lesson } from '../../../types/course';
import { sortLessons } from '../../../utils/progress';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';

interface ProgramListProps {
  course: Course;
  lessons: Lesson[];
  index?: string;
  /** Home shows the first weeks; the course page shows everything. */
  limitWeeks?: number;
  /** The course page has its own big header. */
  hideHeader?: boolean;
}

/**
 * The curriculum as an editorial index: big lesson numerals, hairlines, no boxes.
 * Lite: rows are display only (the paywall sheet and lesson pages are in Courses Kit Pro).
 */
export function ProgramList({ course, lessons, index = '02', limitWeeks, hideHeader = false }: ProgramListProps) {
  const { t, pick } = useT();
  const sample = planHas('freeSample');
  const pages = planHas('coursePages');
  const all = sortLessons(lessons);
  const rows = all.filter((l) => !limitWeeks || l.week <= limitWeeks);
  return (
    <View className="py-14 md:py-20 anchor-section" nativeID="program">
      <Container className="gap-10">
        {hideHeader ? (
          <Eyebrow index={index} label={t('curriculumTitle')} />
        ) : (
        <View className="flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <View className="flex-1 gap-4">
            <Eyebrow index={index} label={t('eyebrowProgramList')} />
            <Text accessibilityRole="header" aria-level={2} className="font-display text-ink text-[36px] leading-[42px] md:text-[52px] md:leading-[56px] tracking-tight">
              {pick(course.title)}
            </Text>
          </View>
          <Text className="md:w-[380px] font-body text-muted text-base leading-7">{pick(course.summary)}</Text>
        </View>
        )}

        <View className="border-t border-ink">
          {rows.map((l, i) => {
            const free = l.isFreeSample && sample;
            return (
            <View key={l.id} className="flex-row gap-4 md:gap-10 py-5 md:py-6 border-b border-border">
              {/* Lesson number big; its week small underneath (a week can hold several lessons). */}
              <View className="w-12 md:w-20 gap-1">
                <Text className="font-display text-tomato text-[28px] leading-8 md:text-[40px] md:leading-[44px]">{String(i + 1).padStart(2, '0')}</Text>
                <Text className="font-body-bold text-muted text-[10px] uppercase tracking-[1.5px]">{t('weekLabel', { week: l.week })}</Text>
              </View>
              <View className="flex-1 gap-1.5">
                <View className="flex-row flex-wrap items-center gap-3">
                  <Text className="font-display text-ink text-[20px] leading-7 md:text-[26px] md:leading-8">{pick(l.title)}</Text>
                  {l.isFreeSample && sample ? <Badge label={t('freeSampleBadge')} tone="tomato" /> : null}
                </View>
                <Text className="font-body text-muted text-[15px] leading-6 max-w-[620px]">{pick(l.summary)}</Text>
              </View>
              <View className="items-end gap-2 pt-1">
                <Text className="font-body-bold text-muted text-sm">{t('minutesShort', { count: l.durationMin })}</Text>
                <Ionicons name={free ? 'play-circle' : 'lock-closed-outline'} size={20} color={free ? palette.tomato : palette.muted} />
              </View>
            </View>
            );
          })}
        </View>

        {limitWeeks && pages ? <Button variant="secondary" label={t('seeFullProgram')} href={`/courses/${course.id}`} icon="arrow-forward" /> : null}
      </Container>
    </View>
  );
}

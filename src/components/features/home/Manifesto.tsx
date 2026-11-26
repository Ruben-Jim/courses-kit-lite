import { Text, View } from 'react-native';
import { HOME_COPY } from '../../../constants/config';
import { useT } from '../../../hooks/useT';
import type { Course, Lesson } from '../../../types/course';
import { Container } from '../../ui/Container';

/** The editorial opening statement + three numbers. */
export function Manifesto({ course, lessons }: { course: Course | null; lessons: Lesson[] }) {
  const { t, pick } = useT();
  const stats: [string, string][] = [
    [String(course?.weeks ?? 8), t('statWeeks')],
    [String(lessons.length || 9), t('statLessons')],
    ['45′', t('statLive')],
  ];
  return (
    <View className="py-16 md:py-28">
      <Container className="gap-12">
        <Text className="font-display text-ink text-[38px] leading-[44px] md:text-[64px] md:leading-[70px] tracking-tight max-w-[1000px]">
          {pick(HOME_COPY.manifestoLead)}{' '}
          <Text className="text-tomato" style={{ fontStyle: 'italic' }}>
            {pick(HOME_COPY.manifestoAccent)}
          </Text>
        </Text>
        <View className="flex-col md:flex-row gap-10 md:items-end">
          <Text className="flex-1 font-body text-muted text-lg md:text-xl leading-8 max-w-[520px]">{pick(HOME_COPY.manifestoBody)}</Text>
          <View className="flex-row gap-8 md:gap-12">
            {stats.map(([n, label]) => (
              <View key={label} className="gap-1">
                <Text className="font-display text-ink text-[40px] leading-[44px] md:text-[56px] md:leading-[60px]">{n}</Text>
                <Text className="font-body text-muted text-sm max-w-[110px]">{label}</Text>
              </View>
            ))}
          </View>
        </View>
      </Container>
    </View>
  );
}

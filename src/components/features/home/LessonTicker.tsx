import { Text, View } from 'react-native';
import { useT } from '../../../hooks/useT';
import type { Lesson } from '../../../types/course';
import { sortLessons } from '../../../utils/progress';

/** A slow ticker of lesson titles under the hero (web animates it; static on native and Reduce Motion). */
export function LessonTicker({ lessons }: { lessons: Lesson[] }) {
  const { pick } = useT();
  if (!lessons.length) return null;
  const items = sortLessons(lessons);
  const row = (copy: number) =>
    items.map((l) => (
      <View key={`${copy}-${l.id}`} className="flex-row items-center gap-6 pr-6">
        <Text className="font-display text-ink text-[22px] md:text-[28px]" numberOfLines={1}>
          {pick(l.title)}
        </Text>
        <Text className="text-tomato text-lg">✺</Text>
      </View>
    ));
  return (
    <View className="marquee py-6 md:py-8 border-b border-border" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View className="marquee-track flex-row">
        {row(0)}
        {row(1)}
      </View>
    </View>
  );
}

import { useEffect } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { palette } from '../../constants/colors';

interface SkeletonProps {
  width?: DimensionValue;
  height: number;
  radius?: number;
}

/** One placeholder block. A soft breathing pulse (static under Reduce Motion). */
export function Skeleton({ width = '100%', height, radius = 12 }: SkeletonProps) {
  const reduce = useReducedMotion();
  const o = useSharedValue(1);
  useEffect(() => {
    if (!reduce) o.value = withRepeat(withTiming(0.45, { duration: 850 }), -1, true);
    return () => cancelAnimation(o);
  }, [reduce, o]);
  const style = useAnimatedStyle(() => ({ opacity: o.value }));
  return <Animated.View style={[style, { width, height, borderRadius: radius, backgroundColor: palette.border }]} />;
}

/** A list of card-shaped placeholders, matching the lesson/member rows. */
export function SkeletonList({ rows = 4 }: { rows?: number }) {
  return (
    <View className="gap-3" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {Array.from({ length: rows }, (_, i) => (
        <View key={i} className="flex-row items-center gap-3 rounded-3xl border border-border bg-surface p-4">
          <Skeleton width={40} height={40} radius={20} />
          <View className="flex-1 gap-2">
            <Skeleton width={`${70 - (i % 3) * 12}%`} height={14} />
            <Skeleton width="40%" height={11} />
          </View>
        </View>
      ))}
    </View>
  );
}

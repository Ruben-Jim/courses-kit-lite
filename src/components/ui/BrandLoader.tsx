import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { palette } from '../../constants/colors';
import { BRAND } from '../../constants/config';

interface BrandLoaderProps {
  label?: string;
  size?: number;
  /** Light marks for dark backgrounds (hero, link page). */
  onDark?: boolean;
}

/**
 * The brand's loading mark: the monogram inside a ring whose tomato arc sweeps around it, with a
 * saffron dot orbiting the other way. Reduce Motion: a still ring and a gentle opacity pulse only.
 */
export function BrandLoader({ label, size = 64, onDark = false }: BrandLoaderProps) {
  const reduce = useReducedMotion();
  const spin = useSharedValue(0);
  const orbit = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (reduce) {
      pulse.value = withRepeat(withSequence(withTiming(0.55, { duration: 700 }), withTiming(1, { duration: 700 })), -1);
    } else {
      spin.value = withRepeat(withTiming(360, { duration: 1100, easing: Easing.bezier(0.6, 0.1, 0.3, 0.9) }), -1);
      orbit.value = withRepeat(withTiming(-360, { duration: 2200, easing: Easing.linear }), -1);
    }
    return () => {
      cancelAnimation(spin);
      cancelAnimation(orbit);
      cancelAnimation(pulse);
    };
  }, [reduce, spin, orbit, pulse]);

  const arc = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));
  const dot = useAnimatedStyle(() => ({ transform: [{ rotate: `${orbit.value}deg` }] }));
  const mark = useAnimatedStyle(() => ({ opacity: pulse.value }));

  const ink = onDark ? palette.cream : palette.ink;
  const track = onDark ? 'rgba(251,247,240,0.18)' : palette.border;
  const ring = Math.max(3, Math.round(size / 18));
  const initials = BRAND.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="items-center justify-center gap-4" accessibilityRole="progressbar" accessibilityLabel={label} accessibilityLiveRegion="polite">
      <View style={{ width: size, height: size }} className="items-center justify-center">
        <View style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, borderWidth: ring, borderColor: track }} />
        <Animated.View
          style={[
            arc,
            {
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: ring,
              borderColor: 'transparent',
              borderTopColor: palette.tomato,
              borderRightColor: palette.tomato,
            },
          ]}
        />
        <Animated.View style={[dot, { position: 'absolute', width: size + ring * 4, height: size + ring * 4 }]}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: (size + ring * 4) / 2 - ring,
              width: ring * 2,
              height: ring * 2,
              borderRadius: ring,
              backgroundColor: palette.saffron,
            }}
          />
        </Animated.View>
        <Animated.View style={mark}>
          <Text className="font-display" style={{ color: ink, fontSize: size * 0.32, letterSpacing: 0.5 }}>
            {initials}
          </Text>
        </Animated.View>
      </View>
      {label ? (
        <Text className="font-body-bold text-xs uppercase tracking-[2px]" style={{ color: onDark ? 'rgba(251,247,240,0.7)' : palette.muted }}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

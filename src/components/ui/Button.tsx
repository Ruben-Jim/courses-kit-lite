import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';
import type { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { palette } from '../../constants/colors';

type Variant = 'primary' | 'secondary' | 'ghost' | 'herb';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  /** Internal route. Renders a real link on web (crawlable, middle-click). onPress, if set, runs first. */
  href?: Href;
  variant?: Variant;
  icon?: ComponentProps<typeof Ionicons>['name'];
  loading?: boolean;
  disabled?: boolean;
  full?: boolean;
  size?: 'md' | 'lg';
  /** Cross-axis alignment when not `full`. 'start' (default) for stacked layouts; 'center' inside a centered row. */
  align?: 'start' | 'center';
  accessibilityHint?: string;
}

const BOX: Record<Variant, string> = {
  primary: 'bg-tomato border-tomato',
  herb: 'bg-herb border-herb',
  secondary: 'bg-surface border-ink',
  ghost: 'bg-transparent border-transparent',
};
const TEXT: Record<Variant, string> = {
  primary: 'text-white',
  herb: 'text-white',
  secondary: 'text-ink',
  ghost: 'text-tomato',
};
const ICON: Record<Variant, string> = {
  primary: '#FFFFFF',
  herb: '#FFFFFF',
  secondary: palette.ink,
  ghost: palette.tomato,
};

/** 48px+ touch target, pressed state on every platform (no hover-only affordance). */
export function Button({
  label,
  onPress,
  href,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  full = false,
  size = 'md',
  align = 'start',
  accessibilityHint,
}: ButtonProps) {
  const inactive = disabled || loading;
  const body = (
    <View className="flex-row items-center justify-center gap-2 max-w-full">
      {loading ? (
        <ActivityIndicator color={ICON[variant]} />
      ) : icon ? (
        <Ionicons name={icon} size={20} color={ICON[variant]} />
      ) : null}
      <Text className={`font-body-bold ${TEXT[variant]} ${size === 'lg' ? 'text-lg' : 'text-base'} shrink`} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
  const className = `${size === 'lg' ? 'min-h-[56px] px-7' : 'min-h-[48px] px-5'} rounded-full border-2 items-center justify-center active:opacity-80 ${
    BOX[variant]
  } ${full ? 'w-full' : align === 'center' ? 'self-center' : 'self-start'} ${inactive ? 'opacity-50' : ''}`;

  if (href && !inactive) {
    return (
      <Link href={href} asChild>
        {/* onPress still runs before navigating (e.g. to close the sheet the link sits in). */}
        <Pressable accessibilityRole="link" accessibilityHint={accessibilityHint} onPress={onPress} className={className}>
          {body}
        </Pressable>
      </Link>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      accessibilityHint={accessibilityHint}
      className={className}
    >
      {body}
    </Pressable>
  );
}

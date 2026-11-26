import { Text, View } from 'react-native';

interface EyebrowProps {
  /** "01" — sections are numbered, magazine style. */
  index?: string;
  label: string;
  onDark?: boolean;
}

export function Eyebrow({ index, label, onDark = false }: EyebrowProps) {
  const color = onDark ? 'text-cream/80' : 'text-tomato';
  return (
    <View className="flex-row items-center gap-3">
      {index ? <Text className={`font-display text-sm ${color}`}>{index}</Text> : null}
      {index ? <View className={`h-px w-8 ${onDark ? 'bg-cream/40' : 'bg-tomato/40'}`} /> : null}
      <Text className={`font-body-bold text-xs uppercase tracking-[2.5px] ${color}`}>{label}</Text>
    </View>
  );
}

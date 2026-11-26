import { Text, View } from 'react-native';

type Tone = 'tomato' | 'herb' | 'saffron' | 'muted';

const BOX: Record<Tone, string> = {
  tomato: 'bg-tomato-soft',
  herb: 'bg-herb-soft',
  saffron: 'bg-saffron-soft',
  muted: 'bg-cream border border-border',
};
const TEXT: Record<Tone, string> = {
  tomato: 'text-tomato',
  herb: 'text-herb',
  saffron: 'text-ink',
  muted: 'text-muted',
};

export function Badge({ label, tone = 'saffron' }: { label: string; tone?: Tone }) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${BOX[tone]}`}>
      <Text className={`font-body-bold text-xs ${TEXT[tone]}`}>{label}</Text>
    </View>
  );
}

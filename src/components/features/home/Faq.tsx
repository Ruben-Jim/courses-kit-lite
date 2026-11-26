import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { palette } from '../../../constants/colors';
import { FAQ } from '../../../constants/config';
import { useT } from '../../../hooks/useT';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';

export function Faq() {
  const { t, pick } = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View className="py-14 md:py-20 anchor-section" nativeID="faq">
      <Container>
        <View className="flex-col md:flex-row gap-8 md:gap-16">
          <View className="md:w-[32%] gap-4">
            <Eyebrow index="07" label={t('eyebrowFaq')} />
            <Text accessibilityRole="header" aria-level={2} className="font-display text-ink text-[36px] leading-[42px] md:text-[48px] md:leading-[52px]">
              {t('faqTitle')}
            </Text>
          </View>
          <View className="flex-1 border-t border-ink">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <View key={i} className="border-b border-border">
                  <Pressable
                    onPress={() => setOpen(isOpen ? null : i)}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpen }}
                    className="flex-row items-center gap-4 min-h-[68px] active:opacity-70"
                  >
                    <Text className="flex-1 font-display text-ink text-[19px] md:text-[22px] leading-7 py-4">{pick(item.q)}</Text>
                    <View className={`w-9 h-9 rounded-full items-center justify-center ${isOpen ? 'bg-ink' : 'border border-border'}`}>
                      <Ionicons name={isOpen ? 'remove' : 'add'} size={18} color={isOpen ? palette.cream : palette.ink} />
                    </View>
                  </Pressable>
                  {isOpen ? <Text className="font-body text-muted text-base leading-7 pb-6 pr-12">{pick(item.a)}</Text> : null}
                </View>
              );
            })}
          </View>
        </View>
      </Container>
    </View>
  );
}

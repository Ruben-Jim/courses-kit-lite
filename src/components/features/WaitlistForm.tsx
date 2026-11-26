import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { palette } from '../../constants/colors';
import { useT } from '../../hooks/useT';
import { useWaitlistForm } from '../../hooks/useWaitlistForm';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { TextField } from '../ui/TextField';

/**
 * Below Growth, "Join" lands here. No login, works inside Instagram/TikTok.
 */
export function WaitlistForm() {
  const { t, lang } = useT();
  const form = useWaitlistForm(lang);

  return (
    <View className="py-12 md:py-16 bg-herb-soft anchor-section" nativeID="waitlist">
      <Container narrow className="gap-6">
        <View className="gap-4">
          <Eyebrow index="06" label={t('eyebrowPlans')} />
          <Text accessibilityRole="header" aria-level={2} className="font-display text-ink text-[36px] leading-[42px] md:text-[52px] md:leading-[56px] tracking-tight">
            {t('waitlistTitle')}
          </Text>
          <Text className="font-body text-muted text-lg leading-7">{t('waitlistSubtitle')}</Text>
        </View>
        {form.status === 'done' ? (
          <View className="flex-row items-center gap-3 rounded-3xl bg-surface p-5" accessibilityLiveRegion="polite">
            <Ionicons name="checkmark-circle" size={28} color={palette.herb} />
            <Text className="flex-1 font-body-bold text-ink text-base">{t('waitlistDone', { name: form.fields.name.trim() })}</Text>
          </View>
        ) : (
          <View className="gap-4 rounded-3xl bg-surface p-5">
            <TextField
              label={t('fieldName')}
              value={form.fields.name}
              onChangeText={form.setName}
              autoComplete="name"
              enterKeyHint="next"
              error={form.errors.has('name') ? t('errorNameRequired') : undefined}
            />
            <TextField
              label={t('fieldEmail')}
              value={form.fields.email}
              onChangeText={form.setEmail}
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              enterKeyHint="next"
              error={form.errors.has('email') ? t('errorEmailInvalid') : undefined}
            />
            <TextField label={t('fieldPhone')} value={form.fields.phone} onChangeText={form.setPhone} inputMode="tel" autoComplete="tel" enterKeyHint="next" />
            <TextField label={t('fieldMessage')} value={form.fields.message} onChangeText={form.setMessage} multiline />
            {form.status === 'error' ? (
              <Text className="font-body-bold text-tomato text-sm" accessibilityLiveRegion="polite">
                {t('waitlistError')}
              </Text>
            ) : null}
            <Button
              full
              size="lg"
              label={form.status === 'sending' ? t('waitlistSending') : t('waitlistSubmit')}
              loading={form.status === 'sending'}
              onPress={form.submit}
            />
          </View>
        )}
      </Container>
    </View>
  );
}

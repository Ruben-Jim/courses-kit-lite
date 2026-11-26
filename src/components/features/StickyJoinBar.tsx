import { View } from 'react-native';
import { useT } from '../../hooks/useT';
import { planHas } from '../../lib/plan';
import { Button } from '../ui/Button';

/** Phone web only: the main action stays in reach (.action-bar clears the home indicator). */
export function StickyJoinBar() {
  const { t } = useT();
  const memberships = planHas('memberships');
  return (
    <View className="action-bar bg-cream border-t border-border">
      <Button
        full
        size="lg"
        label={t('heroCtaWaitlist')}
        href="/#waitlist"
      />
    </View>
  );
}

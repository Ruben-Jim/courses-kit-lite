import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useT } from '../../hooks/useT';
import { planHas } from '../../lib/plan';
import { Button } from '../ui/Button';

/**
 * Phone web: the main action stays in reach once the hero (which has its own button) has scrolled away.
 * Hidden with display:none, not opacity, so iOS 26 never samples an invisible fixed bar for its tint.
 */
export function StickyJoinBar() {
  const { t } = useT();
  const memberships = planHas('memberships');
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const check = () => setShown(window.scrollY > window.innerHeight * 0.7);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  return (
    <View className="action-bar bg-cream border-t border-border reveal" style={{ display: shown ? 'flex' : 'none' }}>
      <Button full size="lg" label={t('heroCtaWaitlist')} href="/#waitlist" />
    </View>
  );
}

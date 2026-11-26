import { Text, View } from 'react-native';
import { BrandLoader } from './BrandLoader';
import { Button } from './Button';
import { SkeletonList } from './Skeleton';

/**
 * Loading: the brand mark for whole pages, or skeleton rows (`variant="list"`) where the shape of what's
 * coming is known — lists feel faster when the layout is already there.
 */
export function LoadingState({ label, variant = 'mark' }: { label: string; variant?: 'mark' | 'list' }) {
  if (variant === 'list') {
    return (
      <View accessibilityLabel={label} accessibilityLiveRegion="polite">
        <SkeletonList />
      </View>
    );
  }
  return (
    <View className="items-center justify-center py-20">
      <BrandLoader label={label} />
    </View>
  );
}

/** Full-screen version for the app-shell gates (members, admin) while the session loads. */
export function FullScreenLoader({ label }: { label: string }) {
  return (
    <View className="app-shell flex-1 items-center justify-center bg-cream">
      <BrandLoader label={label} size={76} />
    </View>
  );
}

export function ErrorState({ message, retryLabel, onRetry }: { message: string; retryLabel: string; onRetry: () => void }) {
  return (
    <View className="items-center justify-center py-16 gap-4 px-6">
      <Text className="font-body text-ink text-base text-center">{message}</Text>
      <Button label={retryLabel} variant="secondary" onPress={onRetry} />
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View className="items-center justify-center py-12 px-6 rounded-3xl border border-dashed border-border">
      <Text className="font-body text-muted text-base text-center">{message}</Text>
    </View>
  );
}

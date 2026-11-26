import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface PageShellProps {
  children: ReactNode;
  /** Rendered outside the scroller (e.g. the sticky Join bar). */
  overlay?: ReactNode;
}

/** Native: the page scrolls inside a ScrollView. */
export function PageShell({ children, overlay }: PageShellProps) {
  return (
    <View className="flex-1 bg-cream">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <SiteHeader />
        <View className="flex-1">{children}</View>
        <SiteFooter />
      </ScrollView>
      {overlay}
    </View>
  );
}

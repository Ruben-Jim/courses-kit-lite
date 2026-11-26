import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface PageShellProps {
  children: ReactNode;
  overlay?: ReactNode;
}

/**
 * Web: plain flow, no ScrollView. The document scrolls (app/+html.tsx), so phone browsers collapse their
 * toolbars as the visitor scrolls. Header (banner) + <main> + footer.
 */
export function PageShell({ children, overlay }: PageShellProps) {
  return (
    <View className="w-full bg-cream">
      <SiteHeader />
      <View role="main" id="main">
        {children}
      </View>
      <SiteFooter />
      {/* Room so the sticky bar never covers the footer. */}
      {overlay ? <View style={{ height: 96 }} /> : null}
      {overlay}
    </View>
  );
}

// Fonts by weight subpath: importing a package root bundles every weight it ships.
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { useFonts } from 'expo-font';
import { Redirect, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../src/global.css';
import { RootNavigator } from '../src/components/layout/RootNavigator';
import { useHtmlLang } from '../src/hooks/useHtmlLang';
import { useSessionBootstrap } from '../src/hooks/useSessionBootstrap';
import { isRouteEnabled } from '../src/lib/plan';

/**
 * No loading gate: the static export must contain the real page, not a spinner.
 * Routes a package doesn't include redirect home (deep links included).
 */
export default function RootLayout() {
  useFonts({ Fraunces_600SemiBold, DMSans_400Regular, DMSans_700Bold });
  useHtmlLang();
  useSessionBootstrap();
  const pathname = usePathname();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {isRouteEnabled(pathname) ? <RootNavigator /> : <Redirect href="/" />}
    </SafeAreaProvider>
  );
}

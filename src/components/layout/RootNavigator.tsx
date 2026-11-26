import { Stack } from 'expo-router';
import { palette } from '../../constants/colors';

/** Native: a regular stack without headers. */
export function RootNavigator() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.cream } }} />;
}

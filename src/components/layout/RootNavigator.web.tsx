import { Slot } from 'expo-router';

/**
 * Web: a Slot, so each route is plain document flow. Expo Router's Stack positions screens absolutely,
 * which collapses to 0 height once the document (not a ScrollView) is the scroller.
 */
export function RootNavigator() {
  return <Slot />;
}

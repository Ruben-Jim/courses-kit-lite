import { useWindowDimensions } from 'react-native';
import { BREAKPOINTS } from '../constants/breakpoints';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  if (width >= BREAKPOINTS.desktop) return 'desktop';
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  return 'phone';
}

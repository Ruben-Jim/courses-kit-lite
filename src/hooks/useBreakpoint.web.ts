import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { BREAKPOINTS } from '../constants/breakpoints';
import type { Breakpoint } from './useBreakpoint';

/**
 * Web: the static HTML is rendered with no window (width 0 = phone). Reporting 'phone' until after
 * mount makes the first client render match it, so React hydrates instead of throwing #418 and
 * re-rendering from scratch. The real width applies one frame later.
 */
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return 'phone';
  if (width >= BREAKPOINTS.desktop) return 'desktop';
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  return 'phone';
}

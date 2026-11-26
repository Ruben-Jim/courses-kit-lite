import { Image, View } from 'react-native';
import { BRAND } from '../../constants/config';

/**
 * The brand's logo mark. A client reskin replaces assets/images/logo-mark.png (square, ≥256px; the
 * same art as the app icon works) — every header, the footer and the link page pick it up.
 */
const LOGO = require('../../../assets/images/logo-mark.png');

interface BrandMarkProps {
  size?: number;
  /** Corner radius as a share of the size: 0.25 = rounded square, 0.5 = circle. */
  roundness?: number;
  /** Thin light ring, for placing the mark on video or dark backgrounds. */
  ring?: boolean;
}

export function BrandMark({ size = 36, roundness = 0.26, ring = false }: BrandMarkProps) {
  const radius = size * roundness;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        borderWidth: ring ? Math.max(2, size / 28) : 0,
        borderColor: 'rgba(251,247,240,0.9)',
      }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      aria-hidden
    >
      <Image source={LOGO} accessibilityLabel={BRAND.name} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
    </View>
  );
}

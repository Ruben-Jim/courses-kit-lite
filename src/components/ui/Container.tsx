import type { ReactNode } from 'react';
import { View } from 'react-native';

interface ContainerProps {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}

/** Centered max-width column with the 16/24px side gutter. */
export function Container({ children, narrow = false, className = '' }: ContainerProps) {
  return (
    <View className={`w-full self-center px-4 md:px-6 ${narrow ? 'max-w-narrow' : 'max-w-content'} ${className}`}>
      {children}
    </View>
  );
}

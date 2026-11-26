import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { mediaUrl } from '../../constants/media';

interface BackgroundVideoProps {
  src: string;
  poster: string;
  label?: string;
}

/** Native: muted loop with expo-video; the poster alone under Reduce Motion. */
export function BackgroundVideo({ src, poster, label }: BackgroundVideoProps) {
  const reduce = useReducedMotion();
  const player = useVideoPlayer(reduce ? null : mediaUrl(src, true), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  return (
    <>
      <Image source={{ uri: mediaUrl(poster, true) }} style={StyleSheet.absoluteFill} contentFit="cover" accessibilityLabel={label} />
      {reduce ? null : <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} />}
    </>
  );
}

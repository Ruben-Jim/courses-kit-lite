import { useEffect, useState } from 'react';

interface BackgroundVideoProps {
  src: string;
  poster: string;
  /** Accessible description; decorative videos pass an empty string. */
  label?: string;
}

/**
 * Muted looping video that fills its parent. The poster paints first (and is all Reduce Motion users
 * see), and the video fades in once it actually plays — no black flash, no layout jump.
 * `playsInline` keeps iOS from going fullscreen; muted + autoplay works in Instagram's browser too.
 */
export function BackgroundVideo({ src, poster, label = '' }: BackgroundVideoProps) {
  const [reduce, setReduce] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const fill = { position: 'absolute' as const, inset: 0, width: '100%', height: '100%', objectFit: 'cover' as const };
  return (
    <>
      <img src={poster} alt={label} aria-hidden={label ? undefined : true} style={fill} />
      {reduce ? null : (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          style={{ ...fill, opacity: playing ? 1 : 0, transition: 'opacity 700ms ease' }}
        />
      )}
    </>
  );
}

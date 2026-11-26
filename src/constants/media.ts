/**
 * Demo videos (AI-generated sample footage). Replace with your own in public/media/.
 * Sample footage for the fictional demo brand: hands and food only, never presented as a real client
 * or a real instructor. A client build replaces these with the client's own footage.
 * Served from public/media (web). Native loads the same files from the deployed site.
 */
import { BRAND } from './config';

export const MEDIA = {
  heroLandscape: '/media/hero-16x9.mp4',
  heroLandscapePoster: '/media/hero-16x9.webp',
  heroPortrait: '/media/hero-9x16.mp4',
  heroPortraitPoster: '/media/hero-9x16.webp',
  sampleLesson: '/media/sample-lesson.mp4',
  sampleLessonPoster: '/media/sample-lesson.webp',
} as const;

/** Demo mode: lessons that play a real sample clip instead of the placeholder. */
export const DEMO_LESSON_VIDEO: Record<string, string> = {
  l1: MEDIA.sampleLesson,
};

/** Absolute URL for native (no local web server in the app). */
export function mediaUrl(path: string, absolute: boolean): string {
  return absolute ? `${BRAND.siteUrl}${path}` : path;
}

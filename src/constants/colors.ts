/**
 * Demo brand palette (Cocina Viva). Mirrored in tailwind.config.js — change both together.
 * A client reskin edits these values and `brand` in config.ts; component code never hard-codes a color.
 */
export const palette = {
  /** Page background. Also the html/body background in +html.tsx (no white flash, iOS 26 tint). */
  cream: '#FBF7F0',
  /** Text. */
  ink: '#22201C',
  /** Primary actions. */
  tomato: '#B5462A',
  /** Secondary accent: success, progress. */
  herb: '#3F6B45',
  /** Highlights, badges. */
  saffron: '#E3A23B',
  /** Cards and sheets. */
  surface: '#FFFFFF',
  border: '#E9DFCF',
  muted: '#6A6258',
  /** Soft fills behind icons and chips. */
  tomatoSoft: '#F6E3DC',
  herbSoft: '#E1EBDF',
  saffronSoft: '#FAEBD0',
} as const;

export type PaletteColor = keyof typeof palette;

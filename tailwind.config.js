/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // 'class', not the default 'media': NativeWind 4's web runtime throws "Cannot manually set color scheme"
  // when <head> changes under 'media'. The template is light-only (no dark: classes), so nothing changes visually.
  darkMode: 'class',
  theme: {
    extend: {
      // Mirrors src/constants/colors.ts
      colors: {
        cream: '#FBF7F0',
        ink: '#22201C',
        tomato: '#B5462A',
        herb: '#3F6B45',
        saffron: '#E3A23B',
        surface: '#FFFFFF',
        border: '#E9DFCF',
        muted: '#6A6258',
        'tomato-soft': '#F6E3DC',
        'herb-soft': '#E1EBDF',
        'saffron-soft': '#FAEBD0',
      },
      fontFamily: {
        display: ['Fraunces_600SemiBold', 'Georgia', 'serif'],
        body: ['DMSans_400Regular', 'system-ui', 'sans-serif'],
        'body-bold': ['DMSans_700Bold', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
        narrow: '42rem',
      },
    },
  },
  plugins: [],
};

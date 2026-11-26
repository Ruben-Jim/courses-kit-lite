import { useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';
import { palette } from '../src/constants/colors';
import { BRAND } from '../src/constants/config';
import { DEFAULT_LANG } from '../src/store/langStore';
import { buildJsonLd } from '../src/utils/seo';

/**
 * The HTML shell around every statically exported page. Runs only in Node during export.
 *
 * Deliberately NOT rendering expo-router's <ScrollViewStyleReset />: it pins `body { overflow: hidden }`,
 * and phone browsers only collapse their toolbars when the *document* scrolls.
 * PageShell.web.tsx is the matching half. No scroll-on-load tricks.
 *
 * SDK 58: a custom +html must render `headNodes` and `bodyNodes` from useServerDocumentContext().
 * They carry the CSS, the React Native Web styles and the bundle <script>s; leave them out and the
 * exported pages ship with no JavaScript at all.
 */
export default function Root({ children }: PropsWithChildren) {
  const { htmlAttributes, bodyAttributes, headNodes, bodyNodes } = useServerDocumentContext();
  return (
    <html lang={DEFAULT_LANG} {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        {/* Android / older iOS. iOS 26 samples the page; the top of every page is the cream header. */}
        <meta name="theme-color" content={palette.cream} />
        <meta name="description" content={BRAND.tagline[DEFAULT_LANG]} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="apple-mobile-web-app-title" content={BRAND.name} />
        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd() }} />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}

/**
 * Set here, not only on a React view, so the page never flashes white before the bundle parses.
 * `min-height` (not `height`) and no `overflow: hidden`, so the document is the scroller.
 */
const BASE_STYLE = `
html, body {
  min-height: 100%;
  min-height: 100dvh;
  margin: 0;
}
html {
  background-color: ${palette.cream};
  overflow-x: hidden;
  overflow-x: clip;
  overflow-y: auto;
  overscroll-behavior-x: none;
  max-width: 100%;
}
body {
  background-color: ${palette.cream};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* clip, not hidden: hidden makes body a scroll container and breaks position: sticky. */
  overflow-x: hidden;
  overflow-x: clip;
  overscroll-behavior-x: none;
  width: 100%;
  max-width: 100%;
}
#root {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-height: 100dvh;
  max-width: 100%;
}
@supports not (height: 100dvh) {
  html, body, #root {
    min-height: -webkit-fill-available;
  }
}
`;

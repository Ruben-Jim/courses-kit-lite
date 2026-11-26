import { BRAND } from '../constants/config';

/**
 * Site-wide structured data: an EducationalOrganization (Google's type for course providers) with its
 * founder. Rendered in app/+html.tsx because expo-router's <Head> drops <script> tags.
 */
export function buildJsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: BRAND.name,
    url: BRAND.siteUrl,
    description: BRAND.tagline.en,
    email: BRAND.contactEmail,
    founder: { '@type': 'Person', name: BRAND.instructor },
    // Online-only businesses leave locality empty; the address is left out then.
    ...(BRAND.locality
      ? { address: { '@type': 'PostalAddress', addressLocality: BRAND.locality, addressRegion: BRAND.region, addressCountry: 'US' } }
      : {}),
    availableLanguage: ['es', 'en'],
  };
  // `<` escaped so a value can never close the script tag.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

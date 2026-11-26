import type { Localized } from '../types/i18n';
import type { MembershipPlanId } from '../types/member';
import { NICHES, type NicheId } from './niches';

/**
 * Everything a reskin changes, in one file. Demo brand: Cocina Viva (fictional).
 * Colors live in colors.ts + tailwind.config.js.
 */
export const NICHE_ID: NicheId = 'cooking';
export const NICHE = NICHES[NICHE_ID];

export const BRAND = {
  name: 'Cocina Viva',
  /** Shown in the header on phones, where the full name may not fit. */
  shortName: 'Cocina Viva',
  instructor: 'Chef Lupita Navarro',
  /** Initials for the avatar shown in place of a photo until the client sends one. */
  instructorInitials: 'LN',
  tagline: {
    es: 'Aprende a cocinar comida real, en casa, a tu ritmo.',
    en: 'Learn to cook real food at home, at your own pace.',
  } satisfies Localized,
  about: {
    es: 'Lupita enseña cocina casera desde hace 15 años. Su programa está pensado para familias ocupadas: recetas sencillas, ingredientes del súper de siempre y nada de complicaciones.',
    en: 'Lupita has taught home cooking for 15 years. Her program is made for busy families: simple recipes, ingredients from your usual store, and nothing complicated.',
  } satisfies Localized,
  contactEmail: 'hola@cocinaviva.example',
  /** Public site URL (canonical + SEO). Native builds also load /media/* from here, so deploy the web build first. */
  siteUrl: 'https://courses.expo.app',
  locality: 'Fresno',
  region: 'CA',
  instagram: '',
} as const;

/** Editorial copy on the home page. The accent word is set in italic tomato. */
export const HOME_COPY = {
  manifestoLead: { es: 'Cocinar en casa no tiene que ser', en: 'Cooking at home doesn’t have to be' } satisfies Localized,
  manifestoAccent: { es: 'complicado.', en: 'complicated.' } satisfies Localized,
  manifestoBody: {
    es: 'Un plan claro cada semana: qué comprar, qué preparar y cómo hacerlo, con alguien que te responde en vivo.',
    en: 'A clear plan every week: what to buy, what to prep and how to make it, with someone who answers you live.',
  } satisfies Localized,
  ctaBandTitle: { es: 'Tu próxima comida empieza esta semana.', en: 'Your next meal starts this week.' } satisfies Localized,
  /** Sample items for the "your list, ready" tile (the niche's download, shown as a checklist). */
  listPreview: {
    es: ['Arroz', 'Frijoles negros', 'Cilantro', 'Jitomate', 'Cebolla', 'Limones'],
    en: ['Rice', 'Black beans', 'Cilantro', 'Tomatoes', 'Onion', 'Limes'],
  },
};

/** How often the group Q&A runs, for the public page. The real schedule (and links) is members-only. */
export const LIVE_QA_SUMMARY: Localized = {
  es: 'Preguntas en vivo cada jueves a las 6 pm',
  en: 'Live Q&A every Thursday at 6 pm',
};

export interface MembershipPlanDisplay {
  id: MembershipPlanId;
  label: Localized;
  /** Display only. The real price lives in the payment provider; the server never trusts this. */
  priceLabel: string;
  cadence: Localized;
  note: Localized;
  highlight: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlanDisplay[] = [
  {
    id: 'monthly',
    label: { es: 'Mensual', en: 'Monthly' },
    priceLabel: '$29',
    cadence: { es: 'al mes', en: 'per month' },
    note: { es: 'Cancela cuando quieras', en: 'Cancel any time' },
    highlight: false,
  },
  {
    id: 'yearly',
    label: { es: 'Anual', en: 'Yearly' },
    priceLabel: '$249',
    cadence: { es: 'al año', en: 'per year' },
    note: { es: 'Ahorras 2 meses', en: 'Save 2 months' },
    highlight: true,
  },
];

export const FAQ: { q: Localized; a: Localized }[] = [
  {
    q: { es: '¿Necesito experiencia?', en: 'Do I need any experience?' },
    a: {
      es: 'No. Empezamos desde lo básico y cada lección tiene su video y su lista del súper.',
      en: 'No. We start from the basics, and every lesson comes with its video and grocery list.',
    },
  },
  {
    q: { es: '¿Puedo verlo desde mi celular?', en: 'Can I watch on my phone?' },
    a: {
      es: 'Sí. Funciona en cualquier celular, tablet o computadora, y también hay app para iPhone y Android.',
      en: 'Yes. It works on any phone, tablet or computer, and there is an app for iPhone and Android.',
    },
  },
  {
    q: { es: '¿Cómo son las sesiones en vivo?', en: 'How do the live sessions work?' },
    a: {
      es: 'Son por Zoom. Los miembros ven el horario y el enlace en su cuenta y reciben un recordatorio.',
      en: 'They are on Zoom. Members see the schedule and link in their account and get a reminder.',
    },
  },
  {
    q: { es: '¿Puedo cancelar?', en: 'Can I cancel?' },
    a: {
      es: 'Sí, cuando quieras, desde tu cuenta. Conservas el acceso hasta el final del periodo que pagaste.',
      en: 'Yes, any time, from your account. You keep access until the end of the period you paid for.',
    },
  },
];

export const TESTIMONIALS: { quote: Localized; name: string }[] = [
  {
    quote: {
      es: 'Por fin cocino entre semana sin estrés. La lista del súper me ahorra tiempo.',
      en: 'I finally cook on weeknights without stress. The grocery list saves me so much time.',
    },
    name: 'Ana R. (demo)',
  },
  {
    quote: {
      es: 'Mis hijos ya piden las recetas de la semana. Las sesiones en vivo son lo mejor.',
      en: 'My kids now ask for the week’s recipes. The live sessions are the best part.',
    },
    name: 'Carlos M. (demo)',
  },
];

/**
 * Frontend kit: always true. All data comes from src/constants/demoData.ts through src/services/.
 * When you connect a backend, set this to false and fill in the services (see src/services/_README.md).
 */
export const DEMO_MODE = true;

/** The yellow "Demo · sample data" bar. Off by default; turn on with EXPO_PUBLIC_DEMO_BANNER=true. */
export const SHOW_DEMO_BANNER = process.env.EXPO_PUBLIC_DEMO_BANNER === 'true';

/** Small "Template by CodeWithRuben" credit in the footer. Set to false to remove it. */
export const SHOW_KIT_CREDIT = true;

/** Where the "Get the full kit" links point. */
export const PRO_KIT_URL = 'https://rubenjimenez.dev/kits/courses';

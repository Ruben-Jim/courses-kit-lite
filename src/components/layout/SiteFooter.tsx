import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';
import { Linking, Platform, Pressable, Text, View } from 'react-native';
import { palette } from '../../constants/colors';
import { SELLS_MEMBERSHIPS } from '../../constants/commerce';
import { BRAND, PRO_KIT_URL, SHOW_KIT_CREDIT } from '../../constants/config';
import { useT } from '../../hooks/useT';
import { planHas } from '../../lib/plan';
import { BrandMark } from '../ui/BrandMark';
import { Button } from '../ui/Button';

type FooterLink = { label: string; href?: Href; url?: string };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <View className="gap-1 min-w-[140px]">
      <Text className="font-body-bold text-muted text-xs uppercase tracking-[2px] pb-2">{title}</Text>
      {links.map((l) =>
        l.href ? (
          <Link key={l.label} href={l.href} asChild>
            <Pressable accessibilityRole="link" className="min-h-[40px] justify-center active:opacity-70">
              <Text className="font-body text-ink text-base">{l.label}</Text>
            </Pressable>
          </Link>
        ) : (
          <Pressable key={l.label} accessibilityRole="link" onPress={() => l.url && Linking.openURL(l.url)} className="min-h-[40px] justify-center active:opacity-70">
            <Text className="font-body text-ink text-base">{l.label}</Text>
          </Pressable>
        )
      )}
    </View>
  );
}

/**
 * Editorial footer: brand + one call to action on the left, link columns on the right, a quiet
 * bottom bar. The wordmark is sized like a masthead, not a poster.
 */
export function SiteFooter() {
  const { t, pick } = useT();
  const memberships = planHas('memberships');

  const program: FooterLink[] = [
    planHas('coursePages') ? { label: t('navCourses'), href: '/courses' } : { label: t('navCourses'), href: '/#program' },
    ...(memberships ? [{ label: t('footerPlans'), href: '/#plans' as Href }] : [{ label: t('waitlistTitle'), href: '/#waitlist' as Href }]),
    { label: t('footerFaq'), href: '/#faq' },
  ];
  const members: FooterLink[] = [];
  const contact: FooterLink[] = [
    { label: BRAND.contactEmail, url: `mailto:${BRAND.contactEmail}` },
    ...(BRAND.instagram ? [{ label: 'Instagram', url: BRAND.instagram }] : []),
    { label: 'Courses Kit Pro', url: PRO_KIT_URL },
  ];

  return (
    <View role="contentinfo" className="mt-16 safe-bottom">
      <View className="w-full max-w-content self-center px-4 md:px-6 pb-6 gap-12">
        <View className="flex-col lg:flex-row gap-12 lg:gap-20 border-t border-ink pt-10 md:pt-14">
          {/* Brand */}
          <View className="lg:w-[360px] gap-4">
            <View className="flex-row items-center gap-3">
              <BrandMark size={48} />
              <Text className="font-display text-ink tracking-tight text-[34px] leading-[38px] md:text-[44px] md:leading-[48px]" accessibilityRole="header" aria-level={2}>
                {BRAND.name}
              </Text>
            </View>
            <Text className="font-body text-muted text-base leading-7 max-w-[340px]">{pick(BRAND.tagline)}</Text>
            <View className="pt-2">
              <Button
                label={t('heroCtaWaitlist')}
                href="/#waitlist"
                icon="arrow-forward"
              />
            </View>
          </View>

          {/* Link columns */}
          <View className="flex-1 flex-row flex-wrap gap-x-10 gap-y-8 lg:justify-end">
            <FooterColumn title={t('footerProgram')} links={program} />
            {members.length ? <FooterColumn title={t('footerMembers')} links={members} /> : null}
            <FooterColumn title={t('footerContact')} links={contact} />
          </View>
        </View>

        {/* Bottom bar */}
        <View className="flex-col md:flex-row md:items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-5">
          <View className="flex-row flex-wrap items-center gap-x-5 gap-y-1 shrink">
            <Text className="font-body text-muted text-sm">{t('footerRights', { year: new Date().getFullYear(), brand: BRAND.name })}</Text>
            {BRAND.locality ? (
              <Text className="font-body text-muted text-sm">
                {BRAND.locality}, {BRAND.region}
              </Text>
            ) : null}
            {SHOW_KIT_CREDIT ? <Text className="font-body text-muted text-sm">{t('builtBy')}</Text> : null}
          </View>
          {Platform.OS === 'web' ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="self-start md:self-auto min-h-[44px] flex-row items-center gap-2 active:opacity-70"
            >
              <Text className="font-body-bold text-ink text-sm">{t('footerBackTop')}</Text>
              <View className="w-8 h-8 rounded-full border border-ink items-center justify-center">
                <Ionicons name="arrow-up" size={16} color={palette.ink} />
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

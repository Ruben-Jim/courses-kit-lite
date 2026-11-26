import { Text, View } from 'react-native';
import { PageShell } from '../src/components/layout/PageShell';
import { Button } from '../src/components/ui/Button';
import { Container } from '../src/components/ui/Container';
import { useT } from '../src/hooks/useT';

export default function NotFound() {
  const { t, lang } = useT();
  return (
    <PageShell>
      <Container narrow className="py-20 gap-6 items-start">
        <Text accessibilityRole="header" className="font-display text-ink text-4xl">
          {lang === 'es' ? 'Página no encontrada' : 'Page not found'}
        </Text>
        <Button label={t('navHome')} href="/" />
      </Container>
    </PageShell>
  );
}

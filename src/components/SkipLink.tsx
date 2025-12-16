import { useLanguage } from '@/context/LanguageContext';

export function SkipLink() {
  const { t } = useLanguage();
  
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {t('a11y.skipToMain')}
    </a>
  );
}

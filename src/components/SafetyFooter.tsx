import { Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SafetyFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/50 border-t border-border py-4 sm:py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-3 justify-center text-center">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

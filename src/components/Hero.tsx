import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
  const { t, emergencyNumber } = useLanguage();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-gentle" aria-hidden="true" />
            {t('hero.badge')}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
          {t('hero.title')}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto px-2">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Button
            onClick={onStartAssessment}
            size="lg"
            className="w-full sm:w-auto bg-emergency hover:bg-emergency/90 text-emergency-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-lg shadow-emergency/20 transition-all hover:shadow-xl hover:shadow-emergency/30 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t('hero.startAssessment')}
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl border-2 focus:ring-2 focus:ring-ring focus:ring-offset-2"
            asChild
          >
            <a href={`tel:${emergencyNumber}`}>
              <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
              {t('hero.callEmergency')}
            </a>
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground px-4"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-xs sm:text-sm">1</span>
          </div>
          <span>{t('hero.step1')}</span>
        </div>
        <div className="w-4 sm:w-8 h-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-xs sm:text-sm">2</span>
          </div>
          <span>{t('hero.step2')}</span>
        </div>
        <div className="w-4 sm:w-8 h-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-xs sm:text-sm">3</span>
          </div>
          <span>{t('hero.step3')}</span>
        </div>
      </motion.div>
    </section>
  );
}

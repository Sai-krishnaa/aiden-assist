import { motion } from 'framer-motion';
import { Phone, Heart, Hand, Headphones, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface WaitingGuidanceProps {
  onStartOver: () => void;
}

export function WaitingGuidance({ onStartOver }: WaitingGuidanceProps) {
  const { t, emergencyNumber } = useLanguage();

  const tips = [
    {
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('waiting.stayCalmTitle'),
      description: t('waiting.stayCalmDesc'),
    },
    {
      icon: <Hand className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('waiting.keepStillTitle'),
      description: t('waiting.keepStillDesc'),
    },
    {
      icon: <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: t('waiting.followTitle'),
      description: t('waiting.followDesc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto w-full"
      >
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-4">
            <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t('waiting.title')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t('waiting.subtitle')}
          </p>
        </div>

        {/* Tips */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10" role="list">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-card rounded-xl p-4 sm:p-6 border border-border flex items-start gap-3 sm:gap-4"
              role="listitem"
            >
              <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0" aria-hidden="true">
                {tip.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{tip.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-muted rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-center"
        >
          <p className="text-muted-foreground text-xs sm:text-sm">
            {t('waiting.notice')}
          </p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-emergency hover:bg-emergency/90 text-emergency-foreground py-5 sm:py-6 rounded-xl focus:ring-2 focus:ring-ring focus:ring-offset-2"
            asChild
          >
            <a href={`tel:${emergencyNumber}`}>
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              {t('hero.callEmergency')}
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onStartOver}
            className="w-full sm:w-auto py-5 sm:py-6 rounded-xl border-2 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            {t('waiting.startOver')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmergency } from '@/context/EmergencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { AccessibilityAnnouncer } from '@/components/AccessibilityAnnouncer';

interface UrgencyResultProps {
  onViewSummary: () => void;
}

export function UrgencyResult({ onViewSummary }: UrgencyResultProps) {
  const { result } = useEmergency();
  const { t, emergencyNumber } = useLanguage();
  const [announcement, setAnnouncement] = useState('');
  
  if (!result) return null;

  const urgencyLabels = {
    emergency: t('result.emergency'),
    urgent: t('result.urgent'),
    'non-emergency': t('result.nonEmergency'),
  };

  const urgencyExplanations = {
    emergency: t('result.emergencyExplanation'),
    urgent: t('result.urgentExplanation'),
    'non-emergency': t('result.nonEmergencyExplanation'),
  };

  const urgencyRecommendations = {
    emergency: t('result.emergencyRecommendation'),
    urgent: t('result.urgentRecommendation'),
    'non-emergency': t('result.nonEmergencyRecommendation'),
  };

  const ambulanceLabels = {
    basic: t('ambulance.basic'),
    cardiac: t('ambulance.cardiac'),
    trauma: t('ambulance.trauma'),
  };
  
  const urgencyConfig = {
    emergency: {
      icon: '🚨',
      className: 'bg-emergency text-emergency-foreground',
    },
    urgent: {
      icon: '⚠️',
      className: 'bg-urgent text-urgent-foreground',
    },
    'non-emergency': {
      icon: '🏠',
      className: 'bg-safe text-safe-foreground',
    },
  };

  const config = urgencyConfig[result.urgencyLevel];
  const label = urgencyLabels[result.urgencyLevel];

  // Announce urgency level to screen readers
  useEffect(() => {
    setAnnouncement(`${t('a11y.urgencyAnnouncement')} ${label}`);
  }, [result.urgencyLevel, label, t]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <AccessibilityAnnouncer message={announcement} assertive />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg mx-auto w-full text-center"
      >
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${config.className} rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-lg`}
          role="alert"
          aria-live="assertive"
        >
          <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block" aria-hidden="true">{config.icon}</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{label}</h1>
          <p className="text-base sm:text-lg opacity-90">{urgencyExplanations[result.urgencyLevel]}</p>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-border"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{t('result.recommendedAction')}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{urgencyRecommendations[result.urgencyLevel]}</p>
            </div>
          </div>
        </motion.div>

        {/* Ambulance Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-border"
        >
          <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{t('result.ambulanceType')}</h3>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm sm:text-base">
            {ambulanceLabels[result.ambulanceType]}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Button
            onClick={onViewSummary}
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t('result.viewSummary')}
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
        </motion.div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Copy, Share2, Check, User, AlertCircle, Ambulance, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmergency } from '@/context/EmergencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { LocationMap } from '@/components/LocationMap';

interface DispatchSummaryProps {
  onContinue: () => void;
}

export function DispatchSummary({ onContinue }: DispatchSummaryProps) {
  const { data, result } = useEmergency();
  const { t, emergencyNumber } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  if (!result || !data.incidentType || !data.isConscious || !data.ageGroup) return null;

  const incidentLabels = {
    accident: t('incident.accident'),
    collapse: t('incident.collapse'),
    breathing: t('incident.breathing'),
    bleeding: t('incident.bleeding'),
    other: t('incident.other'),
  };

  const consciousLabels = {
    yes: t('conscious.yes'),
    no: t('conscious.no'),
    unsure: t('conscious.unsure'),
  };

  const ageLabels = {
    child: t('age.child'),
    adult: t('age.adult'),
    elderly: t('age.elderly'),
  };

  const ambulanceLabels = {
    basic: t('ambulance.basic'),
    cardiac: t('ambulance.cardiac'),
    trauma: t('ambulance.trauma'),
  };

  const urgencyLabels = {
    emergency: t('result.emergency'),
    urgent: t('result.urgent'),
    'non-emergency': t('result.nonEmergency'),
  };
  
  const urgencyConfig = {
    emergency: {
      icon: '🚨',
      className: 'bg-emergency text-emergency-foreground',
      label: urgencyLabels.emergency,
    },
    urgent: {
      icon: '⚠️',
      className: 'bg-urgent text-urgent-foreground',
      label: urgencyLabels.urgent,
    },
    'non-emergency': {
      icon: '🏠',
      className: 'bg-safe text-safe-foreground',
      label: urgencyLabels['non-emergency'],
    },
  };

  const config = urgencyConfig[result.urgencyLevel];

  const generateSummaryText = () => {
    return `EMERGENCY DISPATCH SUMMARY
---
Urgency: ${config.label}
Incident: ${incidentLabels[data.incidentType!]}
Age Group: ${ageLabels[data.ageGroup!]}
Conscious: ${consciousLabels[data.isConscious!]}
Location: ${data.location}
Ambulance: ${ambulanceLabels[result.ambulanceType]}

Note: Patient reported ${incidentLabels[data.incidentType!].toLowerCase()}. ${data.isConscious === 'no' ? 'Patient is not conscious.' : 'Patient is conscious.'} Prepare accordingly.

---
This summary is based on user-provided information and does not constitute medical diagnosis.`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateSummaryText());
      setCopied(true);
      toast({
        title: t('summary.copied'),
        description: "Summary has been copied successfully.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('summary.title'),
          text: generateSummaryText(),
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const preArrivalNote = `Patient reported ${incidentLabels[data.incidentType].toLowerCase()}. ${
    data.isConscious === 'no' 
      ? 'Patient is not conscious - prepare for immediate intervention.' 
      : data.isConscious === 'unsure'
      ? 'Consciousness status uncertain - standby for assessment.'
      : 'Patient is conscious and responsive.'
  } ${
    data.ageGroup === 'child' ? 'Pediatric patient.' : 
    data.ageGroup === 'elderly' ? 'Elderly patient - consider age-related factors.' : ''
  }`;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto w-full"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
          {t('summary.title')}
        </h1>
        <p className="text-muted-foreground text-center mb-6 sm:mb-8 text-sm sm:text-base">
          {t('summary.subtitle')}
        </p>

        {/* Summary Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden mb-4 sm:mb-6">
          {/* Urgency Header */}
          <div className={`${config.className} p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3`}>
            <span className="text-xl sm:text-2xl" aria-hidden="true">{config.icon}</span>
            <span className="text-lg sm:text-xl font-bold">{config.label}</span>
          </div>

          {/* Details Grid */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <SummaryRow
              icon={<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
              label={t('summary.incidentType')}
              value={incidentLabels[data.incidentType]}
            />
            <SummaryRow
              icon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
              label={t('summary.ageGroup')}
              value={ageLabels[data.ageGroup]}
            />
            <SummaryRow
              icon={<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
              label={t('summary.conscious')}
              value={consciousLabels[data.isConscious]}
            />
            <SummaryRow
              icon={<Ambulance className="h-4 w-4 sm:h-5 sm:w-5" />}
              label={t('summary.ambulanceType')}
              value={ambulanceLabels[result.ambulanceType]}
              highlight
            />
          </div>

          {/* Hospital Note */}
          <div className="border-t border-border p-4 sm:p-6 bg-muted/30">
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{t('summary.preArrivalNote')}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {preArrivalNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Map */}
        <LocationMap location={data.location} className="mb-4 sm:mb-6" />

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
          <Button
            size="lg"
            className="bg-emergency hover:bg-emergency/90 text-emergency-foreground py-5 sm:py-6 rounded-xl focus:ring-2 focus:ring-ring focus:ring-offset-2"
            asChild
          >
            <a href={`tel:${emergencyNumber}`}>
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              {t('summary.call')} {emergencyNumber}
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleCopy}
            className="py-5 sm:py-6 rounded-xl border-2 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                {t('summary.copied')}
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="hidden sm:inline">{t('summary.copy')}</span>
                <span className="sm:hidden">Copy</span>
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="py-5 sm:py-6 rounded-xl border-2 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            {t('summary.share')}
          </Button>
        </div>

        {/* Continue Button */}
        <div className="text-center mb-6 sm:mb-8">
          <Button
            variant="secondary"
            size="lg"
            onClick={onContinue}
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 rounded-xl focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t('summary.viewTips')}
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center max-w-md mx-auto px-4">
          {t('summary.disclaimer')}
        </p>
      </motion.div>
    </div>
  );
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ icon, label, value, highlight }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between py-2 sm:py-3 border-b border-border last:border-0 gap-2">
      <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground min-w-0">
        <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
        <span className="text-xs sm:text-sm truncate">{label}</span>
      </div>
      <span className={`font-medium text-xs sm:text-sm text-right ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );
}

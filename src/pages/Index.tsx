import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { EmergencyForm } from '@/components/EmergencyForm';
import { UrgencyResult } from '@/components/UrgencyResult';
import { DispatchSummary } from '@/components/DispatchSummary';
import { WaitingGuidance } from '@/components/WaitingGuidance';
import { SafetyFooter } from '@/components/SafetyFooter';
import { EmergencyProvider, useEmergency } from '@/context/EmergencyContext';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SkipLink } from '@/components/SkipLink';
import { AccessibilityAnnouncer } from '@/components/AccessibilityAnnouncer';
import { AmbulanceBooking } from '@/components/AmbulanceBooking';

type View = 'hero' | 'form' | 'result' | 'booking' | 'summary' | 'waiting';

function EmergencyApp() {
  const [view, setView] = useState<View>('hero');
  const [announcement, setAnnouncement] = useState('');
  const { resetAll } = useEmergency();
  const { emergencyNumber, t } = useLanguage();

  const handleStartOver = () => {
    resetAll();
    setView('hero');
  };

  const handleViewChange = (newView: View, announcementMsg?: string) => {
    setView(newView);
    if (announcementMsg) {
      setAnnouncement(announcementMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <AccessibilityAnnouncer message={announcement} assertive />
      
      <header className="py-3 sm:py-4 px-3 sm:px-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button 
            onClick={handleStartOver}
            className="text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-1"
            aria-label="Emergency Assist - Return to home"
          >
            AIDEN <span className="text-primary">Assist</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector />
            <a 
              href={`tel:${emergencyNumber}`}
              className="text-xs sm:text-sm font-medium text-emergency hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
              aria-label={`Call emergency services at ${emergencyNumber}`}
            >
              {t('summary.call')} {emergencyNumber}
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'hero' && (
              <Hero onStartAssessment={() => handleViewChange('form')} />
            )}
            {view === 'form' && (
              <EmergencyForm 
                onComplete={() => handleViewChange('result')} 
                onBack={() => handleViewChange('hero')}
              />
            )}
            {view === 'result' && (
  <UrgencyResult
    onViewSummary={() => handleViewChange('summary')}
    onBookAmbulance={() => handleViewChange('booking')}
  />
)}
            {view === 'summary' && (
              <DispatchSummary onContinue={() => handleViewChange('waiting')} />
            )}
            {view === 'waiting' && (
              <WaitingGuidance onStartOver={handleStartOver} />
            )}
            {view === 'booking' && (
  <AmbulanceBooking
    onBack={() => handleViewChange('result')}
    onConfirm={() => handleViewChange('summary')}
  />
)}

          </motion.div>
        </AnimatePresence>
      </main>

      <SafetyFooter />
    </div>
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <EmergencyProvider>
        <EmergencyApp />
      </EmergencyProvider>
    </LanguageProvider>
  );
};

export default Index;

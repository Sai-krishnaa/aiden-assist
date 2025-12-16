import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { EmergencyForm } from '@/components/EmergencyForm';
import { UrgencyResult } from '@/components/UrgencyResult';
import { DispatchSummary } from '@/components/DispatchSummary';
import { WaitingGuidance } from '@/components/WaitingGuidance';
import { SafetyFooter } from '@/components/SafetyFooter';
import { EmergencyProvider, useEmergency } from '@/context/EmergencyContext';

type View = 'hero' | 'form' | 'result' | 'summary' | 'waiting';

function EmergencyApp() {
  const [view, setView] = useState<View>('hero');
  const { resetAll } = useEmergency();

  const handleStartOver = () => {
    resetAll();
    setView('hero');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 px-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleStartOver}
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Emergency<span className="text-primary">Assist</span>
          </button>
          <a 
            href="tel:911" 
            className="text-sm font-medium text-emergency hover:underline"
          >
            Call 911
          </a>
        </div>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'hero' && (
              <Hero onStartAssessment={() => setView('form')} />
            )}
            {view === 'form' && (
              <EmergencyForm 
                onComplete={() => setView('result')} 
                onBack={() => setView('hero')}
              />
            )}
            {view === 'result' && (
              <UrgencyResult onViewSummary={() => setView('summary')} />
            )}
            {view === 'summary' && (
              <DispatchSummary onContinue={() => setView('waiting')} />
            )}
            {view === 'waiting' && (
              <WaitingGuidance onStartOver={handleStartOver} />
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
    <EmergencyProvider>
      <EmergencyApp />
    </EmergencyProvider>
  );
};

export default Index;

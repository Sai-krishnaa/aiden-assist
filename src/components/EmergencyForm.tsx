import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  IncidentType, 
  ConsciousStatus, 
  AgeGroup,
  incidentLabels,
  consciousLabels,
  ageLabels 
} from '@/types/emergency';

interface EmergencyFormProps {
  onComplete: () => void;
  onBack: () => void;
}

type Step = 'incident' | 'conscious' | 'age' | 'location';

const steps: Step[] = ['incident', 'conscious', 'age', 'location'];

const stepTitles: Record<Step, string> = {
  incident: 'What happened?',
  conscious: 'Is the patient conscious?',
  age: 'Age group of the patient?',
  location: 'Where is the patient?',
};

export function EmergencyForm({ onComplete, onBack }: EmergencyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { data, updateData, calculateResult } = useEmergency();
  
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    switch (step) {
      case 'incident': return data.incidentType !== null;
      case 'conscious': return data.isConscious !== null;
      case 'age': return data.ageGroup !== null;
      case 'location': return data.location.trim().length > 0;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderOptions = () => {
    switch (step) {
      case 'incident':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(incidentLabels) as IncidentType[]).map((type) => (
              <OptionButton
                key={type}
                selected={data.incidentType === type}
                onClick={() => updateData({ incidentType: type })}
                label={incidentLabels[type]}
              />
            ))}
          </div>
        );
      
      case 'conscious':
        return (
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(consciousLabels) as ConsciousStatus[]).map((status) => (
              <OptionButton
                key={status}
                selected={data.isConscious === status}
                onClick={() => updateData({ isConscious: status })}
                label={consciousLabels[status]}
              />
            ))}
          </div>
        );
      
      case 'age':
        return (
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(ageLabels) as AgeGroup[]).map((age) => (
              <OptionButton
                key={age}
                selected={data.ageGroup === age}
                onClick={() => updateData({ ageGroup: age })}
                label={ageLabels[age]}
              />
            ))}
          </div>
        );
      
      case 'location':
        return (
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter address or describe location"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="pl-12 py-6 text-lg rounded-xl"
              autoFocus
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col px-4 py-8">
      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
              {stepTitles[step]}
            </h2>
            
            {renderOptions()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-primary hover:bg-primary/90 px-8"
          >
            {currentStep === steps.length - 1 ? 'Get Assessment' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

function OptionButton({ selected, onClick, label }: OptionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-4 md:p-5 rounded-xl text-left font-medium transition-all border-2
        ${selected 
          ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
          : 'bg-card text-card-foreground border-border hover:border-primary/50'
        }
      `}
    >
      {label}
    </motion.button>
  );
}
